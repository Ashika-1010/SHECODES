/* Timeline, flow trace, and chat interactions */
/* ══ INVESTIGATE ══ */
let invReady=false,tlP=0.65,tlPlaying=false;
const fSteps=[
  {name:'ACC-0091',det:'Mumbai · Rajesh Exports Pvt Ltd',amt:'₹47,30,000',col:C2,tag:'ORIGIN'},
  {name:'ACC-0445',det:'Delhi · Ananya Trading Co. · 12 min',amt:'₹47,22,000',col:C4,tag:'HOP 1'},
  {name:'ACC-0782',det:'Bangalore · ZM Consultants · 8 min',amt:'₹47,10,000',col:C4,tag:'HOP 2'},
  {name:'ACC-0118',det:'Hyderabad · P. Krishnan · 22 min',amt:'₹46,95,000',col:C4,tag:'HOP 3'},
  {name:'ACC-0091',det:'Mumbai · RETURN TO ORIGIN · 42 min total',amt:'₹46,80,000',col:C2,tag:'CIRCULAR'},
];
function initInvest(){
  if(invReady)return;invReady=true;
  document.getElementById('inv-flow').innerHTML=fSteps.map((s,i)=>`<div class="flow-item" id="fi-${i}" style="border-left:2px solid transparent; transition:all 0.3s;"><div class="fi-line"><div class="fi-dot" style="background:${s.col}"></div>${i<fSteps.length-1?'<div class="fi-conn"></div>':''}</div><div style="flex:1"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="fi-name">${s.name}</span><span class="fi-tag" style="background:${s.col}22;color:${s.col};border:1px solid ${s.col}44">${s.tag}</span></div><div class="fi-det">${s.det}</div><div class="fi-amt" style="color:${s.col}">${s.amt}</div></div></div>`).join('');
  
  let arcP = 0;
  const arcIt = setInterval(()=>{
    arcP += (94-arcP)/8;
    if(94-arcP<0.5){ arcP=94; clearInterval(arcIt); }
    document.getElementById('inv-risk-arc').setAttribute('stroke-dasharray', `${arcP}, 100`);
    document.getElementById('inv-risk-txt').textContent=Math.round(arcP);
  }, 30);

  const ml2=[['GRAPH',94,C2],['VELOCITY',89,C2],['STRUCTURING',76,C4],['PROFILE',31,C3]];
  document.getElementById('ml-inv').innerHTML=ml2.map(m=>`<div class="mlc"><div class="ml-lbl">${m[0]}</div><div class="ml-num" style="color:${m[2]};font-size:15px">${m[1]}%</div><div class="ml-trk"><div class="ml-fill" style="width:${m[1]}%;background:${m[2]}"></div></div></div>`).join('');
  const icv=document.getElementById('inv-cv');
  function rsz(){icv.width=icv.offsetWidth;icv.height=icv.offsetHeight;}rsz();
  (function loop(){gRot+=0.004;drawGraph(icv,tlP);requestAnimationFrame(loop);})();
  
  let isDragging=false;
  const trk=document.getElementById('tl-trk');
  trk.addEventListener('mousedown',e=>{isDragging=true;const r=trk.getBoundingClientRect();tlP=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));updateTL();});
  window.addEventListener('mousemove',e=>{if(!isDragging)return;const r=trk.getBoundingClientRect();tlP=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));updateTL();});
  window.addEventListener('mouseup',()=>{isDragging=false;});
  // Initial update
  updateTL();
}
function updateTL(){
  const p=Math.round(tlP*100);
  document.getElementById('tl-prog').style.width=p+'%';
  document.getElementById('tl-knob').style.left=p+'%';
  
  const items = document.querySelectorAll('.flow-item');
  const activeIdx = tlP===0 ? -1 : Math.min(Math.floor(tlP * items.length), items.length - 1);
  items.forEach((it, idx) => {
    if (idx <= activeIdx) {
      it.style.background = idx === activeIdx ? 'rgba(0,212,255,0.08)' : 'transparent';
      it.style.borderLeftColor = idx === activeIdx ? C1 : 'transparent';
      it.style.opacity = '1';
    } else {
      it.style.background = 'transparent';
      it.style.borderLeftColor = 'transparent';
      it.style.opacity = '0.3';
    }
  });
}
function tlToggle(){
  tlPlaying=!tlPlaying;
  document.getElementById('play-btn').textContent=tlPlaying?'PAUSE':'PLAY';
  if(tlPlaying){(function adv(){if(!tlPlaying)return;tlP=Math.min(1,tlP+0.005);updateTL();if(tlP<1)requestAnimationFrame(adv);else{tlPlaying=false;document.getElementById('play-btn').textContent='PLAY';}})();}
}
function tlReset(){tlP=0;tlPlaying=false;document.getElementById('play-btn').textContent='PLAY';updateTL();}

/* ══ AI CHAT ══ */
let chatLog=[];
const aiReplies=['Tracing fund path from ACC-0091. 5-hop circular loop confirmed. Total cycle: 42 minutes. Pattern matches round-tripping typology at 94% confidence.','ACC-0445 in Delhi has zero prior transaction history. Account was created 3 days before these transfers — classic mule account profile.','Generating FIU-IND STR evidence package for Case #2847. All 9 required fields auto-populated from graph data.','Network centrality analysis: ACC-0091 sits in the top 2% for betweenness score across the branch network.','Parallel structuring pattern from ACC-0567: 11 transactions between ₹40K–₹49.9K over 7 days. Recommending joint STR filing.'];
let aiIdx=0;
function renderChat(){
  document.getElementById('chat-area').innerHTML=chatLog.map(m=>`<div class="cm ${m.ai?'ai':'usr'}"><div class="cm-who">${m.who}</div>${m.txt}</div>`).join('');
  document.getElementById('chat-area').scrollTop=99999;
}
function sendChat(){
  const inp=document.getElementById('chat-inp'),v=inp.value.trim();if(!v)return;
  chatLog.push({ai:false,who:'INVESTIGATOR',txt:v});inp.value='';renderChat();
  const ca=document.getElementById('chat-area');
  const typing=document.createElement('div');typing.className='cm ai';typing.id='typing-ind';
  typing.innerHTML='<div class="cm-who">UNIONTRACE AI</div><div style="display:flex;align-items:center;gap:10px;"><div class="typing" style="padding:0"><span></span><span></span><span></span></div><span style="font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--t3)">ANALYSING...</span></div>';
  ca.appendChild(typing);ca.scrollTop=99999;
  setTimeout(()=>{const t=document.getElementById('typing-ind');if(t)t.remove();chatLog.push({ai:true,who:'UNIONTRACE AI',txt:aiReplies[aiIdx%aiReplies.length]});aiIdx++;renderChat();},1200);
}

function genEvidencepkg() {
  const btn = document.getElementById('ev-btn');
  if(btn.dataset.loading) return;
  btn.dataset.loading = "1";
  btn.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;"><div class="typing" style="padding:0;transform:scale(0.8);"><span></span><span></span><span></span></div> GENERATING ZIP...</div>';
  setTimeout(()=>{
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="#00ff88" stroke-width="1.8"/><polyline points="6,10 9,13 14,7" stroke="#00ff88" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg> PACKAGE READY — DOWNLOAD ZIP';
    btn.style.background = 'rgba(0,255,136,0.1)';
    btn.style.color = '#00ff88';
    btn.style.borderColor = '#00ff88';
    btn.dataset.loading = "";
  }, 2500);
}
