/* Screen switching, page routing, and app init */
const C1='#00d4ff',C2='#ff2d55',C3='#00ff88',C4='#ffb700',C5='#7c3aed';


/* ══ NAVIGATION ══ */
function go(id){
  const cur=document.querySelector('.screen.show');
  if(cur){
    cur.style.transition='opacity 0.4s ease, transform 0.4s ease';
    cur.style.opacity=0; cur.style.transform='translateY(-30px)';
    setTimeout(()=>{
      cur.classList.remove('show');
      cur.style.opacity=''; cur.style.transform='';
      const nxt=document.getElementById('s-'+id);
      nxt.style.opacity=0; nxt.style.transform='translateY(40px)';
      nxt.classList.add('show');
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          nxt.style.transition='opacity 0.6s cubic-bezier(0.1,0.9,0.2,1), transform 0.6s cubic-bezier(0.1,0.9,0.2,1)';
          nxt.style.opacity=1; nxt.style.transform='translateY(0)';
        });
      });
      setTimeout(()=>{nxt.style.transition='';nxt.style.opacity='';nxt.style.transform='';},650);
      if(id==='app')initApp();
    },400);
  }else{
    document.getElementById('s-'+id).classList.add('show');
    if(id==='app')initApp();
  }
}
function doLogin(){
  const u=document.getElementById('li-user').value.trim();
  const p=document.getElementById('li-pass').value.trim();
  const err=document.getElementById('login-err');
  if((u==='admin'||u.includes('@'))&&p==='uniontrace'){err.classList.remove('show');go('app');}
  else{err.classList.add('show');}
}
function fillDemo(){document.getElementById('li-user').value='admin';document.getElementById('li-pass').value='uniontrace';}

const PAGE_TITLES={graph:'THREAT GRAPH',dash:'DASHBOARD',invest:'INVESTIGATE',reports:'REPORTS'};
function switchPage(id,el){
  document.querySelectorAll('.app-page').forEach(p=>p.classList.remove('show'));
  document.querySelectorAll('.sbn').forEach(s=>s.classList.remove('active'));
  document.getElementById('ap-'+id).classList.add('show');
  el.classList.add('active');
  document.getElementById('tb-title').textContent=PAGE_TITLES[id];
  if(id==='invest')initInvest();
}


/* ══ APP INIT ══ */
function initApp(){
  if(appReady)return;appReady=true;
  const cv=document.getElementById('main-cv');
  function rsz(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;}rsz();addEventListener('resize',rsz);
  cv.addEventListener('mousemove',e=>{
    const r=cv.getBoundingClientRect();const mx=e.clientX-r.left,my=e.clientY-r.top;
    gHov=null;
    NODES.forEach(n=>{const p=proj(n.x,n.y,n.z,gRot,cv.width,cv.height);if(Math.hypot(mx-p.px,my-p.py)<n.r*p.s*2.4){gHov=n.id;cv.style.cursor='pointer';}});
    if(!gHov)cv.style.cursor='default';
  });
  cv.addEventListener('click',()=>{if(gHov){gSelected=gHov;const n=NODES.find(x=>x.id===gHov);if(n)showNode(n);}});
  (function loop(){gRot+=0.003;drawGraph(cv);requestAnimationFrame(loop);})();
  showNode(NODES[0]);
  buildDash();buildReports();
  chatLog=[{ai:true,who:'UNIONTRACE AI',txt:'Case #2847 active. Circular transaction detected: 5 accounts, 42-minute round-trip. Composite risk score: 94/100. Pattern matches round-tripping typology at 96% confidence.'}];
  renderChat();
  setInterval(showNotif,25000);
  setInterval(()=>{
    const btn=document.getElementById('alert-btn');
    if(!btn) return;
    const prev=btn.textContent;
    const msgs=['NEW CRITICAL ALERT','ROUND-TRIP DETECTED','LAYERING SEQUENCE'];
    btn.textContent=msgs[Math.floor(Math.random()*msgs.length)];
    btn.style.background='rgba(255,45,85,0.3)';
    btn.style.color='#fff';
    btn.style.boxShadow='0 0 15px rgba(255,45,85,0.4)';
    btn.style.transition='all 0.3s';
    setTimeout(()=>{
      btn.textContent=prev;
      btn.style.background='';
      btn.style.color='';
      btn.style.boxShadow='';
    },4000);
  },30000);
}


/* ══ NOTIFICATIONS ══ */
const notifMsgs=['Round-tripping detected — ACC-0091 · ₹47.3L','New dormant account activated — ACC-0234 · ₹1.2Cr','Structuring pattern — 11 sub-threshold txns · ACC-0567','Profile mismatch alert — ACC-0889 · ₹23L'];
let ni=0;
function showNotif(){
  const n=document.getElementById('notif');
  document.getElementById('notif-msg').textContent=notifMsgs[ni%notifMsgs.length];ni++;
  n.classList.add('show');setTimeout(()=>n.classList.remove('show'),4000);
}
