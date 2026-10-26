import {createSession,chooseAction,continueLesson,submitAssessment,restoreSession,renderText,validateProfile,selectReviewProfile} from './engine.mjs';
import {buildAudioQueue,createRecordedNarrator} from './recorded-audio.mjs';
import {sceneArtwork,icon} from './artwork.mjs';

const $=selector=>document.querySelector(selector);
const el=(tag,className,text)=>{const item=document.createElement(tag);if(className)item.className=className;if(text!==undefined)item.textContent=text;return item;};
const append=(parent,...items)=>{parent.append(...items);return parent;};
const PROFILE_KEY='catalogic-sa01-review-profile';
let lesson,profile,state,sessionKey,sourceProfileVersion,audioManifest,voiceEnabled=true,retrying=false,currentAudioClip=null;
let notice='';
const storage={get(key){try{return JSON.parse(localStorage.getItem(key));}catch{return null;}},set(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}}};
const text=value=>renderText(value,profile);
function save(){if(!storage.set(sessionKey,state)){notice='Browser storage is unavailable. This session will not resume after you close it.';}}
function actionButton(label,handler,className='primary'){const b=el('button',className,label);b.type='button';b.addEventListener('click',handler);return b;}
function highlightSpeaker(clip){document.querySelectorAll('.speech-card').forEach(card=>{const active=clip?.dialogueIndex!==null&&clip?.dialogueIndex!==undefined&&Number(card.dataset.dialogueIndex)===clip.dialogueIndex;card.classList.toggle('speaking',active);});}
const narrator=createRecordedNarrator(path=>new Audio(path),status=>{
 const active=['loading','playing','paused'].includes(status);$('#pause-audio').hidden=!active;
 $('#listen').textContent=active?'Stop audio':'Listen to this scene';$('#pause-audio').textContent=status==='paused'?'Resume audio':'Pause audio';
 const role=currentAudioClip?.role==='narrator'?'Narrator':currentAudioClip?.role;
 const voice=currentAudioClip?.voiceName?.split(' - ')[0];
 document.querySelectorAll('.speech-card.speaking').forEach(card=>card.classList.toggle('audio-paused',status==='paused'));
 $('#audio-status').textContent=status==='unavailable'?'This recording needs an update. You can read the scene on screen.':status==='blocked'?'Your browser needs a click to start audio. Select Listen to this scene.':status==='error'?'Audio could not start. Select Listen to this scene to try again, or read along.':active?`${role??'Narrator'}${voice?' · '+voice:''} · ElevenLabs${status==='loading'?' · Loading…':status==='paused'?' · Paused':''}`:'';
},clip=>{currentAudioClip=clip;highlightSpeaker(clip);});
function stopSpeech(){narrator.stop();}
function playCurrentScene(){void narrator.play(buildAudioQueue(currentNode(),audioManifest));}
function advance(){stopSpeech();state=continueLesson(lesson,state);save();render(true);if(voiceEnabled&&state.nodeId!=='assessment')playCurrentScene();}
function currentNode(){return lesson.nodes.find(n=>n.id===state.nodeId);}
function emailCard(message){
 const card=el('section','email enterprise-mail');card.setAttribute('aria-label','Email preview');
 const top=el('div','mail-topbar');top.setAttribute('aria-hidden','true');
 append(top,append(el('span','mail-app-name'),icon('mail'),el('span','','Mail')),append(el('span','mail-search'),icon('search'),el('span','','Search mail')),el('span','mail-user','AR'));
 const shell=el('div','mail-shell');const folders=el('div','mail-folders');folders.setAttribute('aria-hidden','true');
 append(folders,el('div','mail-compose','New mail'),el('p','mail-account','Alex Rivera'),append(el('div','mail-folder active-folder'),icon('mail'),el('span','','Inbox'),el('small','','4')),append(el('div','mail-folder'),icon('forward'),el('span','','Sent')),append(el('div','mail-folder'),icon('folder'),el('span','','Drafts')),append(el('div','mail-folder'),icon('archive'),el('span','','Archive')));
 const reading=el('div','mail-reading');const toolbar=el('div','mail-toolbar');toolbar.setAttribute('aria-hidden','true');
 [['reply','Reply'],['forward','Forward'],['archive','Archive'],['trash','Delete']].forEach(([name,label])=>toolbar.append(append(el('span','mail-tool'),icon(name),el('span','',label))));toolbar.append(icon('more'));
 const content=el('div','email-content');append(content,el('p','mail-folder-label','Inbox'),el('h2','email-subject',message.subject));
 const senderRow=el('div','mail-sender-row');const avatar=el('span','mail-avatar','MC');avatar.setAttribute('aria-hidden','true');
 const sender=append(el('div','mail-sender-detail'),el('p','sender',message.from.split(' · ')[0]),el('p','mail-address',message.address??'morgan.chen@company.example'),el('p','mail-recipient','To: Alex Rivera'));
 append(senderRow,avatar,sender,el('span','mail-time',message.time??'9:42 AM'));content.append(senderRow);
 if(message.attachment){const attachment=el('div','attachment mail-attachment');const file=append(el('span','file-icon'),icon('clip'));append(attachment,file,append(el('span'),el('strong','',message.attachment),el('small','',`PDF · ${message.attachmentSize??'86 KB'}`)));content.append(attachment);}
 content.append(el('p','message-body',message.body));
 if(message.contact)content.append(el('p','contact-note',message.contact));
 const hint=el('p','mail-simulation-note','Email preview · Choose your next step below.');
 append(reading,toolbar,content,hint);append(shell,folders,reading);return append(card,top,shell);
}
function routeInfo(label,steps){const box=el('div','route-info');return append(box,el('strong','',text(label)),el('p','',text(steps)));}
function motion(node){
 if(node.kind==='recap'){
  const grid=el('div','recap-grid');
  [['pause','Pause','Take a moment when a request is unexpected or skips the usual process.'],['people','Check with the person','Use contact details you already trust before you share anything.'],['shield','Report the concern','Use the company reporting route, even if you’re not sure.']].forEach(([name,title,body])=>grid.append(append(el('div','recap-card'),icon(name),el('strong','',title),el('p','',body))));
  const outer=el('div');append(outer,grid,routeInfo('{{reporting.primary.label}}','{{reporting.primary.steps}}'),routeInfo('If unavailable: {{reporting.fallback.label}}','{{reporting.fallback.steps}}'));return outer;
 }
 return sceneArtwork(node.id==='S03.confirm'?'reported':node.id==='S02.debrief'?'verification':'request');
}
function stageFor(node){
 if(node.message)return emailCard(node.message);
 if(node.kind==='directory'){const card=el('div','directory-entry');return append(card,el('div','avatar','MC'),append(el('div'),el('h3','',node.contact.name),el('p','',node.contact.role),el('p','',text(node.contact.source))));}
 if(node.dialogue){const box=el('div','conversation');box.append(sceneArtwork('conversation'));node.dialogue.forEach((d,index)=>{const card=el('div','speech-card');card.dataset.dialogueIndex=String(index);box.append(append(card,el('strong','',d.speaker),el('p','',d.text)));});return box;}
 if(node.kind==='report'){const box=el('div');append(box,routeInfo('{{reporting.primary.label}}','{{reporting.primary.steps}}'),routeInfo('Fallback: {{reporting.fallback.label}}','{{reporting.fallback.steps}}'),el('p','report-facts',node.reportFacts),el('p','helper',text('{{reporting.evidenceInstructions}}')));return box;}
 if(node.kind==='sharing')return routeInfo('{{sharing.label}}','{{sharing.steps}}');
 if(node.kind==='decision')return emailCard(lesson.nodes.find(n=>n.id==='S01.message').message);
 if(node.kind==='route')return append(el('div','directory-entry'),el('div','avatar','↗'),append(el('div'),el('h3','','Find a contact you already trust'),el('p','','Choose the route below.')));
 return motion(node);
}
function renderProgress(node){
 const sceneIndex=node?lesson.scenes.findIndex(s=>s.id===node.scene):lesson.scenes.length;
 $('#scene-list').replaceChildren();lesson.scenes.forEach((scene,i)=>{const li=el('li',i===sceneIndex?'active':i<sceneIndex?'done':'');append(li,el('span','step-number',i<sceneIndex?'✓':String(i+1)),el('span','',scene.title));if(i===sceneIndex)li.setAttribute('aria-current','step');$('#scene-list').append(li);});
 $('#progress-label').textContent=node?`Scene ${sceneIndex+1} of 5`:'Knowledge check';
}
function render(focus=false){
 const node=currentNode();const root=$('#lesson');root.replaceChildren();renderProgress(node);$('#company-name').textContent=`${profile.organisation||'Company'} learning`;
 if(!node){renderAssessment(root);$('#listen').disabled=true;}else{
  $('#listen').disabled=false;
  append(root,el('p','scene-label',`${node.scene} / ${lesson.scenes.find(s=>s.id===node.scene).title}`));const heading=el('h1','',node.title);heading.id='scene-heading';root.append(heading);
  root.append(el('p','narration',text(node.narration)));const stage=el('div','stage');stage.append(stageFor(node));root.append(stage);
  if(node.choices){const choices=el('div','choices');node.choices.forEach((choice,i)=>{
   const button=actionButton('',()=>{stopSpeech();state=chooseAction(lesson,state,choice.id);save();render();$('#feedback')?.focus();},'choice');
   const last=state.practice.at(-1);if(last?.nodeId===node.id&&last.choiceId===choice.id)button.classList.add('selected');
   append(button,el('span','choice-letter',String.fromCharCode(65+i)),el('span','',text(choice.label)));choices.append(button);
  });root.append(choices);}
  if(state.feedback){const feedback=el('div',`feedback${state.feedbackCorrect?' correct':''}`,text(state.feedback));feedback.id='feedback';feedback.tabIndex=-1;feedback.setAttribute('role','status');root.append(feedback);}
  const row=el('div','next-row');append(row,el('span','helper',node.choices?'Practice · You can try again.':'Continue when you’re ready.'));
  if(!node.choices||state.pendingNext)row.append(actionButton(node.next==='assessment'?'Start knowledge check':'Continue →',advance));root.append(row);
 }
 if(notice)root.append(el('p','error',notice));
 if(focus){root.focus({preventScroll:true});root.scrollIntoView({block:'start',behavior:'instant'});}
}
function renderAssessment(root){
 const heading=el('h1','',state.attempts.length&&!retrying?'Your knowledge check':'Put the decisions into practice');heading.id='scene-heading';append(root,el('p','scene-label','ASSESSMENT / FIVE QUESTIONS'),heading);
 if(state.attempts.length&&!retrying){
  const attempt=state.attempts.at(-1);append(root,el('p','narration',attempt.passed?'You have completed this local review session.':'Review the feedback, then try the knowledge check again.'),el('p','result-score',`${attempt.score}%`),el('p','helper',`Attempt ${attempt.number} · Draft pass threshold ${attempt.passingPercent}% · ${attempt.passed?'Passed':'Try again'}`));
  lesson.assessment.forEach(q=>{const answer=q.options.find(o=>o.id===attempt.answers[q.id]);const box=el('div','result-item');append(box,el('strong','',`${attempt.answers[q.id]===q.correct?'✓':'Review'} · ${text(q.prompt)}`),el('span','',`Your answer: ${text(answer.label)}`),el('p','',text(q.rationale)));root.append(box);});
  const row=el('div','next-row');if(!attempt.passed)row.append(actionButton('Try again',()=>{retrying=true;render(true);}));row.append(actionButton('Download review results',()=>download('sa-01-review-results.json',{recordType:'local-review-only',...state}),'quiet'));root.append(row);
  root.append(el('p','review-note','These local results are for reviewing the lesson. Employee identity, assignments, and official completion records will be supplied by your platform.'));return;
 }
 root.append(el('p','narration',`Choose one answer for each question. Practice choices do not affect your score. The draft pass threshold is ${profile.assessment.passingPercent}%.`));
 const form=el('form','quiz');form.noValidate=true;
 lesson.assessment.forEach((q,index)=>{const field=el('fieldset');const legend=el('legend','',`${index+1}. ${text(q.prompt)}`);field.append(legend);q.options.forEach(o=>{const label=el('label');const input=el('input');input.type='radio';input.name=q.id;input.value=o.id;input.required=true;append(label,input,el('span','',text(o.label)));field.append(label);});form.append(field);});
 const err=el('p','error');err.setAttribute('role','alert');const button=el('button','primary','Submit answers');button.type='submit';append(form,err,button);
 form.addEventListener('submit',event=>{event.preventDefault();try{const answers=Object.fromEntries(new FormData(form));state=submitAssessment(lesson,state,answers,profile.assessment.passingPercent);retrying=false;save();render(true);}catch(error){err.textContent=error.message;const unanswered=[...form.querySelectorAll('fieldset')].find(f=>!f.querySelector('input:checked'));unanswered?.querySelector('input').focus();}});root.append(form);
}
const fields=[['organisation','Company name'],['directory.label','Trusted directory name'],['directory.steps','How to open the directory'],['reporting.primary.label','Primary reporting route'],['reporting.primary.steps','Primary reporting steps'],['reporting.fallback.label','Fallback reporting route'],['reporting.fallback.steps','Fallback reporting steps'],['reporting.evidenceInstructions','Safe evidence submission instructions'],['sharing.label','Approved sharing workspace'],['sharing.steps','Sharing instructions'],['assessment.passingPercent','Passing percentage']];
function getPath(obj,path){return path.split('.').reduce((v,key)=>v?.[key],obj);}
function putPath(obj,path,value){const keys=path.split('.');let target=obj;keys.slice(0,-1).forEach(k=>{target[k]??={};target=target[k];});target[keys.at(-1)]=value;}
function openSettings(){const root=$('#profile-fields');root.replaceChildren();fields.forEach(([path,title])=>{const label=el('label','',title);const input=el(path.endsWith('steps')||path.endsWith('Instructions')?'textarea':'input');input.name=path;input.value=getPath(profile,path)??'';if(path==='assessment.passingPercent'){input.type='number';input.min='1';input.max='100';input.required=true;}label.append(input);root.append(label);});const issues=validateProfile(profile);$('#profile-status').textContent=issues.length?`Production profile review pending: ${issues.join('; ')}.`:'Profile fields have recorded approval. Full release testing is still required.';$('#settings-dialog').showModal();}
function download(name,value){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=el('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function setSession(){sessionKey=`sa01-review:${lesson.version}:${profile.version}`;state=restoreSession(lesson,storage.get(sessionKey),profile.version);}
async function init(){
 try{
  const responses=await Promise.all([fetch('source/lesson.json'),fetch('company-profile.json')]);if(responses.some(r=>!r.ok))throw new Error('Lesson files could not load');
  const [content,defaults]=await Promise.all(responses.map(r=>r.json()));lesson=content;sourceProfileVersion=defaults.version;profile=selectReviewProfile(defaults,storage.get(PROFILE_KEY));
  try{const response=await fetch('media/voice/manifest.json');audioManifest=response.ok?await response.json():{clips:{}};}catch{audioManifest={clips:{}};}
  setSession();render();
  $('#listen').addEventListener('click',()=>{if(['loading','playing','paused'].includes(narrator.state)){voiceEnabled=false;stopSpeech();}else{voiceEnabled=true;playCurrentScene();}});
  $('#pause-audio').addEventListener('click',()=>narrator.togglePause());
  $('#restart').addEventListener('click',()=>{if(confirm('Restart this local review session? This will clear its practice and assessment attempts.')){stopSpeech();state=createSession(lesson,profile.version);retrying=false;notice='';save();render(true);if(voiceEnabled)playCurrentScene();}});
  $('#settings-open').addEventListener('click',openSettings);$('#settings-close').addEventListener('click',()=>$('#settings-dialog').close());
  $('#download-profile').addEventListener('click',()=>download('company-profile.json',profile));
  $('#settings-form').addEventListener('submit',event=>{event.preventDefault();const values=new FormData(event.currentTarget);const updated=structuredClone(profile);fields.forEach(([path])=>putPath(updated,path,path==='assessment.passingPercent'?Number(values.get(path)):String(values.get(path)).trim()));updated.version=`draft-${Date.now()}`;updated.review={approved:false,owner:'',reviewDate:''};profile=updated;storage.set(PROFILE_KEY,{sourceVersion:sourceProfileVersion,profile});stopSpeech();setSession();save();retrying=false;$('#settings-dialog').close();render(true);if(voiceEnabled)playCurrentScene();});
  window.addEventListener('pagehide',stopSpeech);
  if(voiceEnabled&&state.nodeId!=='assessment')playCurrentScene();
 }catch(error){$('#lesson').replaceChildren(el('h1','','The review player could not load.'),el('p','',`${error.message}. Open this folder through a local web server.`));}
}
init();
