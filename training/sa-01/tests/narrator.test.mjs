import test from 'node:test';
import assert from 'node:assert/strict';
import {createNarrator} from '../source/narrator.mjs';

// Characterises the browser boundary: cancelling removes utterances, but
// does not clear a paused synthesis state. This reproduces silent next scenes.
function synthesis(){return {paused:false,speaking:false,current:null,cancel(){this.current=null;this.speaking=false;},resume(){this.paused=false;if(this.current)this.current.started=true;},pause(){this.paused=true;},speak(utterance){this.current=utterance;this.speaking=true;utterance.started=!this.paused;}};}
test('speaking a new scene after a paused scene starts audible playback',()=>{
 const speech=synthesis();const states=[];const player=createNarrator(speech,text=>({text}),s=>states.push(s));
 player.speak('Scene one');player.togglePause();assert.equal(player.state,'paused');
 player.speak('Scene two');assert.equal(speech.current.started,true);assert.equal(player.state,'speaking');assert.equal(states.at(-1),'speaking');
});
test('stopping narration on entry to assessment clears playback and pause state',()=>{
 const speech=synthesis();const player=createNarrator(speech,text=>({text}));
 player.speak('Recap');player.togglePause();player.stop();assert.equal(player.state,'idle');assert.equal(speech.current,null);assert.equal(speech.paused,false);
});
test('an old cancelled utterance cannot mark a new scene as finished',()=>{
 const speech=synthesis();const player=createNarrator(speech,text=>({text}));player.speak('First');const old=speech.current;
 player.speak('Second');old.onend();assert.equal(player.state,'speaking');speech.current.onend();assert.equal(player.state,'idle');
});
test('an unavailable speech engine leaves a usable text-first lesson',()=>{
 const player=createNarrator(null,text=>({text}));player.speak('Read this scene');assert.equal(player.state,'unavailable');player.stop();assert.equal(player.state,'unavailable');
});
