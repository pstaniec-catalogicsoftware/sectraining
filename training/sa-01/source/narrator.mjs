export function createNarrator(synthesis,makeUtterance,onState=()=>{}){
 let status=synthesis?'idle':'unavailable';let generation=0;
 function update(next){status=next;onState(next);}
 function stop(){generation++;if(synthesis){synthesis.cancel();synthesis.resume();}update(synthesis?'idle':'unavailable');}
 function speak(copy){
  stop();if(!synthesis)return;
  const token=generation;const utterance=makeUtterance(copy);utterance.lang='en-US';utterance.rate=.94;
  utterance.onend=()=>{if(token===generation)update('idle');};
  utterance.onerror=()=>{if(token===generation)update('error');};
  try{synthesis.speak(utterance);update('speaking');}catch{update('error');}
 }
 function togglePause(){
  if(!synthesis)return;
  if(status==='paused'){synthesis.resume();update('speaking');}
  else if(status==='speaking'){synthesis.pause();update('paused');}
 }
 return {speak,stop,togglePause,get state(){return status;}};
}
