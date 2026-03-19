/* 3D graph engine and node rendering */
/* ══ 3D GRAPH ENGINE ══ */
const NODES=[
  {id:'n1',x:0,y:0.35,z:0,lbl:'ACC-0091',sub:'Mumbai · Origin',col:C2,r:13,risk:'CRITICAL',score:94,branch:'Mumbai',type:'Current A/C',amt:'₹47.3L',cnt:18},
  {id:'n2',x:0.55,y:0.18,z:0.28,lbl:'ACC-0445',sub:'Delhi · Hop 1',col:C4,r:10,risk:'HIGH',score:78,branch:'Delhi',type:'Savings',amt:'₹47.2L',cnt:5},
  {id:'n3',x:0.65,y:-0.28,z:-0.18,lbl:'ACC-0782',sub:'Bangalore · Hop 2',col:C4,r:10,risk:'HIGH',score:74,branch:'Bangalore',type:'Current A/C',amt:'₹47.1L',cnt:4},
  {id:'n4',x:0,y:-0.48,z:0.38,lbl:'ACC-0118',sub:'Hyderabad · Hop 3',col:C4,r:9,risk:'HIGH',score:67,branch:'Hyderabad',type:'Savings',amt:'₹46.9L',cnt:3},
  {id:'n5',x:-0.62,y:-0.2,z:-0.1,lbl:'ACC-0567',sub:'Chennai · Structuring',col:C2,r:9,risk:'CRITICAL',score:82,branch:'Chennai',type:'Savings',amt:'₹5.3L',cnt:11},
  {id:'n6',x:-0.55,y:0.28,z:0.18,lbl:'ACC-0234',sub:'Pune · Dormant',col:C1,r:9,risk:'WATCH',score:87,branch:'Pune',type:'Savings',amt:'₹1.2Cr',cnt:1},
  {id:'n7',x:0.1,y:0.08,z:-0.45,lbl:'FX-GATE',sub:'SWIFT Gateway',col:C5,r:8,risk:'WATCH',score:55,branch:'Mumbai',type:'Gateway',amt:'₹23L',cnt:8},
  {id:'n8',x:-0.18,y:-0.08,z:0.42,lbl:'NEFT-HUB',sub:'Processor',col:C3,r:7,risk:'CLEAN',score:12,branch:'Mumbai',type:'Processor',amt:'₹5.3L',cnt:11},
];
const EDGES=[
  {s:'n1',t:'n2',sus:true,col:C2},{s:'n2',t:'n3',sus:true,col:C2},
  {s:'n3',t:'n4',sus:true,col:C4},{s:'n4',t:'n1',sus:true,col:C2},
  {s:'n1',t:'n6',sus:false,col:C1},{s:'n6',t:'n7',sus:false,col:C1},
  {s:'n5',t:'n8',sus:false,col:C4},{s:'n7',t:'n2',sus:false,col:C5},
];
let gRot=0,gHov=null,gSelected=null,dashOff=0,appReady=false;

function proj(x,y,z,rot,W,H){
  const c=Math.cos(rot),s=Math.sin(rot),rx=x*c-z*s,rz=x*s+z*c,sc=200/(3.2-rz);
  return{px:W/2+rx*sc*W*0.36,py:H/2-y*sc*H*0.36,s:Math.max(0.3,sc/85)};
}

function drawGraph(cv,tl){
  const W=cv.width,H=cv.height,ctx=cv.getContext('2d');
  ctx.clearRect(0,0,W,H);
  dashOff=(dashOff+0.35)%20;
  ctx.strokeStyle='rgba(0,212,255,0.04)';ctx.lineWidth=1;
  for(let i=1;i<9;i++){ctx.beginPath();ctx.arc(W/2,H/2,i*Math.min(W,H)/18,0,Math.PI*2);ctx.stroke();}
  EDGES.forEach((e,ei)=>{
    if(tl!==undefined&&ei/EDGES.length>tl)return;
    const ns=NODES.find(n=>n.id===e.s),nt=NODES.find(n=>n.id===e.t);
    if(!ns||!nt)return;
    const ps=proj(ns.x,ns.y,ns.z,gRot,W,H),pt=proj(nt.x,nt.y,nt.z,gRot,W,H);
    const mx=(ps.px+pt.px)/2-(pt.py-ps.py)*0.12,my=(ps.py+pt.py)/2+(pt.px-ps.px)*0.08;
    ctx.save();ctx.setLineDash(e.sus?[6,3]:[3,6]);ctx.lineDashOffset=-dashOff;
    ctx.strokeStyle=e.col+(e.sus?'cc':'55');ctx.lineWidth=e.sus?2:1;
    ctx.beginPath();ctx.moveTo(ps.px,ps.py);ctx.quadraticCurveTo(mx,my,pt.px,pt.py);ctx.stroke();
    ctx.setLineDash([]);
    const ang=Math.atan2(pt.py-my,pt.px-mx),ar=7;
    ctx.fillStyle=e.col+(e.sus?'cc':'55');
    ctx.beginPath();ctx.moveTo(pt.px,pt.py);ctx.lineTo(pt.px-ar*Math.cos(ang-0.35),pt.py-ar*Math.sin(ang-0.35));ctx.lineTo(pt.px-ar*Math.cos(ang+0.35),pt.py-ar*Math.sin(ang+0.35));ctx.closePath();ctx.fill();
    ctx.restore();
  });
  [...NODES].sort((a,b)=>proj(a.x,a.y,a.z,gRot,W,H).s-proj(b.x,b.y,b.z,gRot,W,H).s).forEach(n=>{
    const p=proj(n.x,n.y,n.z,gRot,W,H),isH=gHov===n.id,isS=gSelected===n.id;
    const bounce = Math.sin(Date.now()/400 + n.id.charCodeAt(n.id.length-1))*3*p.s;
    p.py += bounce;
    const r=n.r*p.s*2.4;
    ctx.save();
    ctx.beginPath();ctx.arc(p.px,p.py,r,0,Math.PI*2);ctx.fillStyle=n.col+'18';ctx.fill();
    ctx.strokeStyle=n.col;ctx.lineWidth=isH||isS?3:1.5;ctx.stroke();
    if(isS){const t=Date.now()/800%1;ctx.beginPath();ctx.arc(p.px,p.py,r+t*25,0,Math.PI*2);ctx.strokeStyle=n.col+Math.floor((1-t)*255).toString(16).padStart(2,'0');ctx.lineWidth=2*(1-t);ctx.stroke();}
    if(n.risk==='CRITICAL'&&!isS){const t=Date.now()/1000%1;ctx.beginPath();ctx.arc(p.px,p.py,r+t*18,0,Math.PI*2);ctx.strokeStyle=n.col+Math.floor((1-t)*60).toString(16).padStart(2,'0');ctx.lineWidth=1;ctx.stroke();}
    ctx.beginPath();ctx.arc(p.px,p.py,r*0.32,0,Math.PI*2);ctx.fillStyle=n.col;ctx.fill();
    ctx.fillStyle=n.col;ctx.font=`${Math.max(9,10*p.s)}px 'Share Tech Mono',monospace`;ctx.textAlign='center';
    ctx.fillText(n.lbl,p.px,p.py+r+13*p.s);
    ctx.restore();
  });
}

function showNode(n){
  document.getElementById('np-id').textContent=n.lbl;
  document.getElementById('np-sub').textContent=n.sub;
  document.getElementById('risk-score').textContent=n.score+'/100';
  document.getElementById('risk-fill').style.width=n.score+'%';
  const rc={CRITICAL:C2,HIGH:C4,WATCH:C1,CLEAN:C3};
  document.getElementById('np-rows').innerHTML=[
    ['Risk Level',`<span style="color:${rc[n.risk]||C1}">${n.risk}</span>`],
    ['ML Score',`<span style="color:${rc[n.risk]||C1};font-family:'Orbitron',monospace">${n.score}/100</span>`],
    ['Branch',n.branch],['Type',n.type],['Flagged Amt',n.amt],['TX Count (30d)',n.cnt],
  ].map(r=>`<div class="np-row"><span class="np-k">${r[0]}</span><span class="np-v">${r[1]}</span></div>`).join('');
}
function gMode(m,el){document.querySelectorAll('.g-btn').forEach(b=>b.classList.remove('active'));el.classList.add('active');}

function searchNode(v){
  v=v.trim().toUpperCase();
  const res=document.getElementById('search-res');
  if(v===''){res.style.display='none';return;}
  const n=NODES.find(x=>x.id.toUpperCase().includes(v)||x.lbl.toUpperCase().includes(v));
  if(n){gSelected=n.id;showNode(n);res.style.display='none';}
  else{res.style.display='block';}
}
