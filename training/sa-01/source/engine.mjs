const clone=value=>structuredClone(value);
const stamp=()=>new Date().toISOString();
const nodeFor=(lesson,state)=>lesson.nodes.find(node=>node.id===state.nodeId);

export function createSession(lesson,profileVersion){
 return {lessonId:lesson.id,lessonVersion:lesson.version,variantId:lesson.variant,profileVersion,
  nodeId:lesson.nodes[0].id,visited:[],practice:[],attempts:[],feedback:null,pendingNext:null,
  coreComplete:false,completed:false,startedAt:stamp(),updatedAt:stamp()};
}
export function chooseAction(lesson,state,choiceId){
 const node=nodeFor(lesson,state);const choice=node?.choices?.find(item=>item.id===choiceId);
 if(!choice)throw new Error('Unknown practice option');
 const next=clone(state);next.feedback=choice.feedback;next.feedbackCorrect=choice.correct;
 next.pendingNext=choice.correct?(choice.next??node.next):null;
 next.practice.push({nodeId:node.id,choiceId,correct:choice.correct,at:stamp()});next.updatedAt=stamp();return next;
}
export function continueLesson(lesson,state){
 const node=nodeFor(lesson,state);if(!node)throw new Error('Unknown lesson position');
 if(node.choices&&!state.pendingNext)throw new Error('Choose a safe action before continuing');
 const nextId=node.choices?state.pendingNext:node.next;
 if(nextId!=='assessment'&&!lesson.nodes.some(item=>item.id===nextId))throw new Error('Unknown next lesson position');
 const next=clone(state);next.visited=[...new Set([...next.visited,node.id])];
 next.nodeId=nextId;next.pendingNext=null;next.feedback=null;next.feedbackCorrect=null;
 if(nextId==='assessment')next.coreComplete=true;
 next.updatedAt=stamp();return next;
}
export function submitAssessment(lesson,state,answers,passingPercent){
 if(!state.coreComplete||state.nodeId!=='assessment')throw new Error('Finish the core lesson before assessment');
 if(state.completed)throw new Error('This review session is already completed');
 if(!Number.isFinite(passingPercent)||passingPercent<=0||passingPercent>100)throw new Error('Invalid passing threshold');
 if(!answers||Object.keys(answers).length!==lesson.assessment.length||lesson.assessment.some(q=>!Object.hasOwn(answers,q.id)))throw new Error('Answer every question');
 for(const q of lesson.assessment)if(!q.options.some(o=>o.id===answers[q.id]))throw new Error('Unknown answer option');
 const correct=lesson.assessment.filter(q=>answers[q.id]===q.correct).length;
 const score=100*correct/lesson.assessment.length;
 const next=clone(state);const at=stamp();
 next.attempts.push({number:next.attempts.length+1,answers:clone(answers),correct,total:lesson.assessment.length,score,passingPercent,passed:score>=passingPercent,at});
 next.completed=score>=passingPercent;next.updatedAt=at;if(next.completed)next.completedAt=at;return next;
}
export function restoreSession(lesson,snapshot,profileVersion){
 const fresh=()=>createSession(lesson,profileVersion);
 if(!snapshot||snapshot.lessonId!==lesson.id||snapshot.lessonVersion!==lesson.version||snapshot.variantId!==lesson.variant||snapshot.profileVersion!==profileVersion)return fresh();
 const ids=new Set(lesson.nodes.map(n=>n.id));
 if((!ids.has(snapshot.nodeId)&&snapshot.nodeId!=='assessment')||!Array.isArray(snapshot.visited)||!snapshot.visited.every(id=>ids.has(id))||!Array.isArray(snapshot.practice)||!Array.isArray(snapshot.attempts))return fresh();
 const coreComplete=snapshot.nodeId==='assessment'&&lesson.nodes.every(n=>snapshot.visited.includes(n.id));
 if(snapshot.nodeId==='assessment'&&!coreComplete)return fresh();
 const current=nodeFor(lesson,snapshot);
 if(snapshot.pendingNext&&!current?.choices?.some(c=>c.correct&&(c.next??current.next)===snapshot.pendingNext))return fresh();
 let result={...clone(snapshot),coreComplete,completed:false,attempts:[]};
 try{
  for(const attempt of snapshot.attempts){
   result=submitAssessment(lesson,result,attempt.answers,attempt.passingPercent);
   result.attempts.at(-1).at=attempt.at;
  }
 }catch{return fresh();}
 result.startedAt=snapshot.startedAt;result.updatedAt=snapshot.updatedAt;
 if(result.completed)result.completedAt=snapshot.completedAt??result.attempts.at(-1).at;
 return result;
}
export function renderText(text,profile){
 const labels={'directory.label':'company directory','directory.steps':'directory opening instructions','reporting.primary.label':'primary reporting route','reporting.primary.steps':'primary reporting steps','reporting.fallback.label':'fallback reporting route','reporting.fallback.steps':'fallback reporting steps','reporting.evidenceInstructions':'evidence submission instructions','sharing.label':'approved sharing workspace','sharing.steps':'sharing instructions'};
 return String(text??'').replace(/\{\{([\w.]+)\}\}/g,(_,path)=>{
  const value=path.split('.').reduce((obj,key)=>obj?.[key],profile);
  return typeof value==='string'&&value.trim()?value:`[CONFIGURE ${labels[path]??path}]`;
 });
}
export function validateProfile(profile){
 const required=['version','organisation','review.owner','review.reviewDate','directory.label','directory.steps','reporting.primary.label','reporting.primary.steps','reporting.fallback.label','reporting.fallback.steps','reporting.evidenceInstructions','sharing.label','sharing.steps'];
 const issues=required.filter(path=>{const value=path.split('.').reduce((obj,key)=>obj?.[key],profile);return typeof value!=='string'||!value.trim();}).map(path=>`Configure ${path}`);
 if(profile.review?.approved!==true)issues.push('Security approval is required');
 if(!Array.isArray(profile.policyReferences)||!profile.policyReferences.some(ref=>typeof ref==='string'&&ref.trim()))issues.push('Add policy references');
 const threshold=profile.assessment?.passingPercent;
 if(!Number.isFinite(threshold)||threshold<=0||threshold>100)issues.push('Configure passing percentage from above 0 to 100');
 return issues;
}
export function narrationFor(node,profile){
 const copy=[node.narration];
 if(node.message)copy.push(node.message.from,node.message.subject,node.message.body,node.message.attachment?`Attachment: ${node.message.attachment}`:'');
 copy.push(...(node.dialogue??[]).map(d=>`${d.speaker}: ${d.text}`));
 if(node.kind==='directory')copy.push(node.contact?.name,node.contact?.role,node.contact?.source,'{{directory.steps}}');
 if(node.kind==='report'||node.kind==='recap')copy.push('Primary reporting: {{reporting.primary.label}}. {{reporting.primary.steps}}','If unavailable: {{reporting.fallback.label}}. {{reporting.fallback.steps}}','Evidence: {{reporting.evidenceInstructions}}',node.reportFacts);
 if(node.kind==='sharing')copy.push('{{sharing.label}}. {{sharing.steps}}');
 return copy.filter(Boolean).map(part=>renderText(part,profile)).join(' ');
}
export function selectReviewProfile(defaults,saved){
 const candidate=saved?.profile;const threshold=candidate?.assessment?.passingPercent;
 return saved?.sourceVersion===defaults.version&&typeof candidate?.version==='string'&&Number.isFinite(threshold)&&threshold>0&&threshold<=100?clone(candidate):clone(defaults);
}
