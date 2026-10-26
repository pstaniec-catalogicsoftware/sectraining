import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession, chooseAction, continueLesson, submitAssessment, restoreSession, renderText, validateProfile, narrationFor, selectReviewProfile} from '../source/engine.mjs';

// These exercise progression and scoring independently of the lesson's wording.
const lesson={id:'SA-01',version:'0.1.0',variant:'document-email-01',nodes:[
 {id:'intro',next:'route'},
 {id:'route',choices:[{id:'message-number',correct:false,feedback:'Not independent.'},{id:'directory',correct:true,feedback:'Use the trusted route.',next:'recap'}]},
 {id:'recap',next:'assessment'}
],assessment:[1,2,3,4,5].map(n=>({id:`Q0${n}`,options:[{id:'a'},{id:'b'},{id:'c'}],correct:'b'}))};
const start=()=>createSession(lesson,'profile-v1');
function ready(){let s=continueLesson(lesson,start());s=chooseAction(lesson,s,'directory');s=continueLesson(lesson,s);return continueLesson(lesson,s);}
const fourCorrect={Q01:'b',Q02:'b',Q03:'a',Q04:'b',Q05:'b'};

test('an unsafe contact route cannot advance practice or finish the lesson',()=>{
 const s=continueLesson(lesson,start()); const wrong=chooseAction(lesson,s,'message-number');
 assert.equal(wrong.nodeId,'route');assert.equal(wrong.feedback,'Not independent.');assert.equal(wrong.pendingNext,null);
 assert.throws(()=>continueLesson(lesson,wrong),/Choose/);assert.equal(wrong.completed,false);
});
test('independent verification advances only after feedback is acknowledged',()=>{
 const s=continueLesson(lesson,start());const chosen=chooseAction(lesson,s,'directory');
 assert.equal(chosen.nodeId,'route');assert.equal(chosen.pendingNext,'recap');
 const next=continueLesson(lesson,chosen);assert.equal(next.nodeId,'recap');assert.deepEqual(next.visited,['intro','route']);
});
test('assessment cannot be submitted before the core path is completed',()=>{
 assert.throws(()=>submitAssessment(lesson,start(),fourCorrect,80),/core lesson/);
});
test('four correct stable option IDs out of five pass at 80 percent',()=>{
 const s=submitAssessment(lesson,ready(),fourCorrect,80);
 assert.equal(s.attempts[0].score,80);assert.equal(s.completed,true);assert.equal(s.attempts[0].passed,true);
 assert.equal(s.profileVersion,'profile-v1');assert.equal(s.attempts[0].answers.Q03,'a');
});
test('a configured 100 percent threshold fails four correct and retains a subsequent retry',()=>{
 let s=submitAssessment(lesson,ready(),fourCorrect,100);assert.equal(s.completed,false);
 s=submitAssessment(lesson,s,{...fourCorrect,Q03:'b'},100);
 assert.equal(s.attempts.length,2);assert.equal(s.attempts[0].passed,false);assert.equal(s.attempts[1].score,100);assert.equal(s.completed,true);
});
test('missing or unknown answers and invalid thresholds cannot create an assessment result',()=>{
 assert.throws(()=>submitAssessment(lesson,ready(),{Q01:'b'},80),/every question/);
 assert.throws(()=>submitAssessment(lesson,ready(),{...fourCorrect,Q03:'unknown'},80),/option/);
 assert.throws(()=>submitAssessment(lesson,ready(),fourCorrect,0),/threshold/);
});
test('a passing attempt cannot be overwritten by another submission',()=>{
 const passed=submitAssessment(lesson,ready(),fourCorrect,80);
 assert.throws(()=>submitAssessment(lesson,passed,fourCorrect,80),/already completed/);
});
test('reload preserves pending verified action without replaying an unsafe route',()=>{
 const s=chooseAction(lesson,continueLesson(lesson,start()),'directory');
 const restored=restoreSession(lesson,JSON.parse(JSON.stringify(s)),'profile-v1');
 assert.equal(restored.nodeId,'route');assert.equal(continueLesson(lesson,restored).nodeId,'recap');
});
test('changed lesson or company policy versions restart the draft instead of reusing completion',()=>{
 const s=submitAssessment(lesson,ready(),fourCorrect,80);
 const restored=restoreSession({...lesson,version:'0.2.0'},s,'profile-v1');
 assert.equal(restored.nodeId,'intro');assert.equal(restored.completed,false);
 assert.equal(restoreSession(lesson,s,'profile-v2').attempts.length,0);
 assert.equal(restoreSession(lesson,{...s,nodeId:'missing'},'profile-v1').nodeId,'intro');
});
test('company reporting and fallback substitutions follow the active profile',()=>{
 const copy='Use {{reporting.primary.label}}. If unavailable, {{reporting.fallback.steps}}.';
 assert.equal(renderText(copy,{reporting:{primary:{label:'Security portal'},fallback:{steps:'call the approved support line'}}}),'Use Security portal. If unavailable, call the approved support line.');
 assert.equal(renderText(copy,{reporting:{primary:{label:'Incident channel'},fallback:{steps:'use the help desk'}}}),'Use Incident channel. If unavailable, use the help desk.');
 assert.match(renderText('{{directory.label}}',{}),/CONFIGURE/);
});
test('production readiness requires reviewed policy fields, not just a reporting label',()=>{
 assert.ok(validateProfile({}).length>0);
 const p={version:'v1',organisation:'Example',review:{approved:true,owner:'Security owner',reviewDate:'2026-10-26'},directory:{label:'Directory',steps:'Open from your trusted launcher'},reporting:{primary:{label:'Portal',steps:'Open your trusted portal'},fallback:{label:'Support',steps:'Call the known support number'},evidenceInstructions:'Use the approved evidence upload'},sharing:{label:'Workspace',steps:'Use reviewed permissions'},assessment:{passingPercent:80},policyReferences:['Policy 1']};
 assert.deepEqual(validateProfile(p),[]);
 assert.ok(validateProfile({...p,review:{...p.review,approved:false}}).length>0);
});
test('report narration includes the active primary, fallback, evidence instructions and fictional facts',()=>{
 const spoken=narrationFor({kind:'report',narration:'Report the concern.',reportFacts:'No document was sent.'},{reporting:{primary:{label:'Incident portal',steps:'Open your trusted launcher.'},fallback:{label:'Support line',steps:'Use the existing number.'},evidenceInstructions:'Use secure upload.'}});
 assert.match(spoken,/Incident portal/);assert.match(spoken,/Open your trusted launcher/);
 assert.match(spoken,/Support line/);assert.match(spoken,/Use the existing number/);assert.match(spoken,/Use secure upload/);assert.match(spoken,/No document was sent/);
});
test('directory and sharing instructions are available in narration as well as visually',()=>{
 assert.match(narrationFor({kind:'directory',narration:'Find Morgan.',contact:{name:'Morgan',role:'Manager',source:'Trusted entry'}},{directory:{steps:'Open the trusted launcher.'}}),/Open the trusted launcher/);
 assert.match(narrationFor({kind:'sharing',narration:'Share safely.'},{sharing:{label:'Approved workspace',steps:'Check the recipient.'}}),/Check the recipient/);
});
test('a newly published company profile supersedes older local preview overrides',()=>{
 const defaults={version:'policy-v2',assessment:{passingPercent:80}};
 const selected=selectReviewProfile(defaults,{sourceVersion:'policy-v1',profile:{version:'local-draft',reporting:{primary:{label:'Obsolete route'}},assessment:{passingPercent:80}}});
 assert.equal(selected.version,'policy-v2');
 assert.equal(selectReviewProfile(defaults,{sourceVersion:'policy-v2',profile:{version:'local-draft',assessment:{passingPercent:90}}}).assessment.passingPercent,90);
 assert.equal(selectReviewProfile(defaults,{sourceVersion:'policy-v2',profile:{version:'broken',assessment:{passingPercent:101}}}).version,'policy-v2');
});
