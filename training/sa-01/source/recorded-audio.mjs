export function buildAudioQueue(node,manifest){
 if(!node)return [];
 const expected=[{id:`${node.id}.narrator`,text:node.narration,role:'narrator',dialogueIndex:null},...(node.dialogue??[]).map((line,index)=>({id:`${node.id}.dialogue-${index}`,text:line.text,role:line.speaker,dialogueIndex:index}))];
 const queue=[];
 for(const line of expected){
  const clip=manifest?.clips?.[line.id];
  if(!clip?.path||clip.text!==line.text||clip.role!==line.role)return [];
  queue.push({...clip,dialogueIndex:line.dialogueIndex});
 }
 return queue;
}

export function createRecordedNarrator(makeAudio,onState=()=>{},onClip=()=>{}){
 let status='idle',generation=0,playRequest=0,media=null,element=null,activeClip=null,queue=[];
 function update(value){status=value;onState(value);}
 function release(){if(media){media.pause();media.currentTime=0;media.onended=null;media.onerror=null;media=null;}activeClip=null;onClip(null);}
 function stop(){generation++;playRequest++;release();queue=[];update('idle');}
 function fail(token,status='error'){if(token!==generation)return;generation++;playRequest++;release();update(status);}
 async function attemptPlay(audio,token){
  const request=++playRequest;update('loading');
  try{
   await audio.play();
   if(token!==generation||request!==playRequest||audio!==media)return;
   update('playing');
  }catch(error){if(token===generation&&request===playRequest&&audio===media)fail(token,error?.name==='NotAllowedError'?'blocked':'error');}
 }
 async function start(index,token){
  if(token!==generation)return;
  const clip=queue[index];
  if(!clip){release();update('idle');return;}
  try{
   // Keep the same user-authorised element across clips and scenes. Some
   // browsers grant autoplay permission per element rather than per page.
   element??=makeAudio(clip.path);media=element;
   media.src=clip.path;media.currentTime=0;
   activeClip=clip;onClip(clip);
   const audio=media;
   audio.onended=()=>{if(token===generation&&audio===media&&activeClip===clip){audio.onended=null;audio.onerror=null;void start(index+1,token);}};
   audio.onerror=()=>{if(activeClip===clip)fail(token);};
   await attemptPlay(audio,token);
  }catch{fail(token);}
 }
 async function play(clips){stop();if(!clips?.length){update('unavailable');return;}queue=[...clips];await start(0,generation);}
 async function togglePause(){
  if(!media)return;
  if(status==='paused'){await attemptPlay(media,generation);}
  else if(status==='playing'||status==='loading'){playRequest++;media.pause();update('paused');}
 }
 return {play,stop,togglePause,get state(){return status;},get activeClip(){return activeClip;}};
}
