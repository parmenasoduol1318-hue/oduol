// Enhanced piano note trainer with sharps, samples, scoring, and responsive keyboard
const whiteNotes = ["C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5","B5"];
const allSemitones = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
function noteToMidi(n){
  const name = n.slice(0,-1);
  const octave = parseInt(n.slice(-1));
  const idx = allSemitones.indexOf(name);
  return (octave+1)*12 + idx;
}
const midiToFreq = m => 440 * Math.pow(2,(m-69)/12);

let audioCtx = null;
const sampleMap = {}; // note -> HTMLAudioElement
let samplesLoaded = false;

async function loadSamples(){
  const notesToTry = [];
  // try white notes and common sharps in range
  ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5'].forEach(n=>notesToTry.push(n));
  const base = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/,'') + '/samples/';
  const tries = notesToTry.map(async n=>{
    const url = `samples/${n}.mp3`;
    try{
      const resp = await fetch(url, {method:'HEAD'});
      if(resp && resp.ok){
        const a = new Audio(url);
        sampleMap[n] = a;
      }
    }catch(e){ /* ignore */ }
  });
  await Promise.all(tries);
  samplesLoaded = Object.keys(sampleMap).length>0;
}

function playTone(note, duration=1){
  // prefer sample if available
  if(samplesLoaded && sampleMap[note]){
    const a = sampleMap[note].cloneNode();
    a.play().catch(()=>{});
    return;
  }
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const freq = midiToFreq(noteToMidi(note));
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  o.connect(g);
  g.connect(audioCtx.destination);
  const now = audioCtx.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(0.8, now+0.02);
  g.gain.exponentialRampToValueAtTime(0.001, now+duration);
  o.start(now);
  o.stop(now+duration+0.02);
}

// Staff rendering (simple)
const svg = document.getElementById('staff');
function drawStaff(){
  svg.innerHTML = '';
  const w = 700;
  for(let i=0;i<5;i++){
    const y = 40 + i*12;
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',30); line.setAttribute('x2',w-30);
    line.setAttribute('y1',y); line.setAttribute('y2',y);
    line.setAttribute('stroke','#222'); line.setAttribute('stroke-width',1);
    svg.appendChild(line);
  }
}
function showNote(note){
  drawStaff();
  const x = 120 + Math.random()*420;
  const baseMidi = noteToMidi(note);
  const y = 100 - (baseMidi - noteToMidi('C4'))*3; // rough vertical mapping
  const circle = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
  circle.setAttribute('cx', x); circle.setAttribute('cy', y);
  circle.setAttribute('rx', 12); circle.setAttribute('ry', 8);
  circle.setAttribute('fill','#000');
  svg.appendChild(circle);
}

// Keyboard rendering (white + black overlay)
const keyboard = document.getElementById('keyboard');
const keyMap = {};
function buildKeyboard(level=1){
  keyboard.innerHTML = '';
  const whiteWrap = document.createElement('div');
  whiteWrap.className = 'white-keys';
  whiteNotes.forEach((n,i)=>{
    const k = document.createElement('div');
    k.className = 'white-key key';
    k.dataset.note = n;
    k.innerHTML = `<span>${n}</span>`;
    k.addEventListener('click', ()=>onKeyPress(n, k));
    whiteWrap.appendChild(k);
    keyMap[n] = k;
  });
  keyboard.appendChild(whiteWrap);

  // black keys
  const blackWrap = document.createElement('div');
  blackWrap.className = 'black-keys';
  const offsets = [0.62,1.62,3.62,4.62,5.62,7.62,8.62,10.62,11.62,12.62,14.62,15.62];
  const blackNames = ['C#4','D#4','F#4','G#4','A#4','C#5','D#5','F#5','G#5','A#5','C#6','D#6'];
  // place black keys roughly over white keys
  const whites = whiteWrap.children.length;
  for(let i=0;i<whites;i++){
    const noteBelow = whiteNotes[i];
  }
  // create black keys for the same octave range, but only if level >=2
  if(level>=2){
    const blackDefs = [
      {note:'C#4',leftPct: (1/14)*100 - 3}, {note:'D#4',leftPct:(2/14)*100 -3},
      {note:'F#4',leftPct:(4/14)*100 -3}, {note:'G#4',leftPct:(5/14)*100 -3}, {note:'A#4',leftPct:(6/14)*100 -3},
      {note:'C#5',leftPct:(8/14)*100 -3}, {note:'D#5',leftPct:(9/14)*100 -3},
      {note:'F#5',leftPct:(11/14)*100 -3}, {note:'G#5',leftPct:(12/14)*100 -3}, {note:'A#5',leftPct:(13/14)*100 -3}
    ];
    blackDefs.forEach(b=>{
      const bk = document.createElement('div');
      bk.className = 'black-key key';
      bk.style.left = `calc(${b.leftPct}% )`;
      bk.dataset.note = b.note;
      bk.innerHTML = `<span>${b.note}</span>`;
      bk.addEventListener('click', ()=>onKeyPress(b.note, bk));
      blackWrap.appendChild(bk);
      keyMap[b.note] = bk;
    });
    keyboard.appendChild(blackWrap);
  }
}

let currentNote = null;
let mode = 'listen';
let score = 0;
let streak = 0;
let level = 1;

function onKeyPress(note, el){
  playTone(note, 1);
  if(!currentNote) return;
  if(note === currentNote){
    el.classList.add('correct');
    streak += 1; score += 10 * level; // scoring scales with level
    setMessage('Correct!','green');
    updateScore();
    setTimeout(()=>{ el.classList.remove('correct'); nextNote(); },700);
  } else {
    el.classList.add('wrong');
    streak = 0; setMessage('Try again','red');
    updateScore();
    setTimeout(()=> el.classList.remove('wrong'),500);
  }
}

function updateScore(){
  const s = document.getElementById('score');
  s.textContent = `Score: ${score} • Streak: ${streak}`;
}

function setMessage(text, color){
  const m = document.getElementById('message');
  m.textContent = text;
  m.style.color = color || '';
}

function getAvailableNotes(){
  if(level===1) return whiteNotes;
  // level 2 adds common sharps in the range
  if(level===2) return ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','D5','E5','F5','G5','A5','B5'];
  // level 3: full semitone range (simple coverage)
  return ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5'];
}

function nextNote(){
  const pool = getAvailableNotes();
  currentNote = pool[Math.floor(Math.random()*pool.length)];
  if(mode === 'read'){
    showNote(currentNote);
    playTone(currentNote, 0.8);
  } else {
    drawStaff();
    playTone(currentNote, 1);
  }
  setMessage('Listen and pick the key');
}

// Controls
document.getElementById('newNote').addEventListener('click', ()=> nextNote());
document.getElementById('playNote').addEventListener('click', ()=>{ if(currentNote) playTone(currentNote,1); });
document.getElementById('mode').addEventListener('change', (e)=>{ mode = e.target.value; setMessage('Mode: '+mode); if(currentNote) { if(mode==='read') showNote(currentNote); else drawStaff(); } });
document.getElementById('levelSelect').addEventListener('change', (e)=>{ level = parseInt(e.target.value||'1',10); buildKeyboard(level); setMessage('Level '+level); });

// init
drawStaff(); buildKeyboard(level);
loadSamples();

// keyboard mapping (optional)
window.addEventListener('keydown', e=>{
  const mapKeys = ['a','s','d','f','g','h','j','k','l',';','\' ];
  const mapNotes = getAvailableNotes();
  const pos = mapKeys.indexOf(e.key);
  if(pos>=0 && mapNotes[pos]){
    const n = mapNotes[pos];
    const el = keyMap[n];
    if(el) onKeyPress(n, el);
  }
});
