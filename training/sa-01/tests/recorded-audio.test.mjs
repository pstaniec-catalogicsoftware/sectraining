import test from 'node:test';
import assert from 'node:assert/strict';
import {buildAudioQueue,createRecordedNarrator} from '../source/recorded-audio.mjs';

const node={id:'call',narration:'Alex calls Morgan.',dialogue:[{speaker:'Alex',text:'Did you send it?'},{speaker:'Morgan',text:'No, please report it.'}]};
const manifest={clips:{
 'call.narrator':{id:'call.narrator',role:'narrator',text:'Alex calls Morgan.',path:'narrator.mp3'},
 'call.dialogue-0':{id:'call.dialogue-0',role:'Alex',text:'Did you send it?',path:'alex.mp3'},
 'call.dialogue-1':{id:'call.dialogue-1',role:'Morgan',text:'No, please report it.',path:'morgan.mp3'}
}};
// A controlled media element reproduces the browser boundary. The player owns
// track sequencing, cancellation and handling rejected or delayed play promises.
function audioHarness(){
 const tracks=[];const states=[];const clips=[];
 const player=createRecordedNarrator(path=>{const media={path,currentTime:0,paused:true,onended:null,onerror:null,play:async function(){this.paused=false;},pause(){this.paused=true;}};tracks.push(media);return media;},state=>states.push(state),clip=>clips.push(clip?.role??null));
 return {player,tracks,states,clips};
}
const tick=()=>new Promise(resolve=>setImmediate(resolve));

test('a dialogue scene queues narrator, Alex and Morgan as distinct tracks in speaking order',()=>{
 const queue=buildAudioQueue(node,manifest);
 assert.deepEqual(queue.map(c=>c.path),['narrator.mp3','alex.mp3','morgan.mp3']);
 assert.deepEqual(queue.map(c=>c.dialogueIndex),[null,0,1]);
});
test('changed dialogue or a missing actor recording cannot silently play stale or partial audio',()=>{
 assert.deepEqual(buildAudioQueue({...node,dialogue:[{speaker:'Alex',text:'Changed line.'}]},manifest),[]);
 const partial=structuredClone(manifest);delete partial.clips['call.dialogue-1'];assert.deepEqual(buildAudioQueue(node,partial),[]);
 const swapped=structuredClone(manifest);swapped.clips['call.dialogue-0'].role='Morgan';assert.deepEqual(buildAudioQueue(node,swapped),[]);
});
test('finishing each track advances the active speaker and finishes the scene exactly once',async()=>{
 const h=audioHarness();await h.player.play(buildAudioQueue(node,manifest));
 assert.equal(h.player.state,'playing');assert.equal(h.player.activeClip.role,'narrator');
 h.tracks[0].onended();await tick();assert.equal(h.player.activeClip.role,'Alex');
 assert.equal(h.tracks[0].src,'alex.mp3');
 h.tracks[0].onended();await tick();assert.equal(h.player.activeClip.role,'Morgan');assert.equal(h.tracks[0].src,'morgan.mp3');
 h.tracks[0].onended();await tick();assert.equal(h.player.state,'idle');assert.equal(h.player.activeClip,null);assert.equal(h.tracks.length,1);
});
test('pause and resume keep the current character and do not restart their track',async()=>{
 const h=audioHarness();await h.player.play(buildAudioQueue(node,manifest));h.tracks[0].onended();await tick();h.tracks[0].currentTime=2;
 await h.player.togglePause();assert.equal(h.player.state,'paused');assert.equal(h.tracks[0].paused,true);
 await h.player.togglePause();assert.equal(h.player.state,'playing');assert.equal(h.tracks[0].currentTime,2);assert.equal(h.tracks.length,1);
});
test('stopping or navigating away prevents a cancelled scene from starting its next actor',async()=>{
 const h=audioHarness();await h.player.play(buildAudioQueue(node,manifest));const staleEnd=h.tracks[0].onended;
 h.player.stop();staleEnd();await tick();assert.equal(h.player.state,'idle');assert.equal(h.tracks.length,1);assert.equal(h.tracks[0].paused,true);
});
test('a delayed play result cannot resume audio after stop or overwrite a newer scene',async()=>{
 let resolvePlay;const player=createRecordedNarrator(()=>({currentTime:0,pause(){},play:()=>new Promise(resolve=>{resolvePlay=resolve;})}));
 const pending=player.play([{path:'slow.mp3',role:'narrator'}]);player.stop();resolvePlay();await pending;
 assert.equal(player.state,'idle');assert.equal(player.activeClip,null);
});
test('an audio load failure leaves the text lesson usable and does not skip into dialogue',async()=>{
 const h=audioHarness();await h.player.play(buildAudioQueue(node,manifest));h.tracks[0].onerror();
 assert.equal(h.player.state,'error');assert.equal(h.player.activeClip,null);assert.equal(h.tracks.length,1);
 await h.player.play([]);assert.equal(h.player.state,'unavailable');
});
test('one user-authorised media element carries narrator and both actors without fresh autoplay permission',async()=>{
 let first=true;const elements=[];
 const player=createRecordedNarrator(path=>{
  const permitted=first;first=false;
  const element={src:path,currentTime:0,paused:true,pause(){this.paused=true;},async play(){if(!permitted)throw new Error('NotAllowedError');this.paused=false;}};
  elements.push(element);return element;
 });
 await player.play(buildAudioQueue(node,manifest));elements[0].onended();await tick();
 assert.equal(player.state,'playing');assert.equal(player.activeClip.role,'Alex');
 elements[0].onended();await tick();assert.equal(player.activeClip.role,'Morgan');assert.equal(elements.length,1);
});
test('a previous clip callback cannot skip a speaker when the media element is reused',async()=>{
 const h=audioHarness();await h.player.play(buildAudioQueue(node,manifest));const oldEnd=h.tracks[0].onended;
 oldEnd();await tick();oldEnd();await tick();assert.equal(h.player.activeClip.role,'Alex');
 h.player.stop();await h.player.play(buildAudioQueue(node,manifest));assert.equal(h.tracks.length,1);
 oldEnd();await tick();assert.equal(h.player.activeClip.role,'narrator');
});
