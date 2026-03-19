/* Dashboard data, charts, and alerts */
/* ══ DASHBOARD ══ */
function buildDash(){
  const alerts=[{id:'ALT-2847',type:'Round-Tripping',col:C2,amt:'₹47.3L',t:'2m ago'},{id:'ALT-2843',type:'Rapid Layering',col:C2,amt:'₹9.8L',t:'14m ago'},{id:'ALT-2839',type:'Structuring',col:C4,amt:'₹5.3L',t:'31m ago'},{id:'ALT-2835',type:'Dormant Activated',col:C2,amt:'₹1.2Cr',t:'1h ago'},{id:'ALT-2831',type:'Profile Mismatch',col:C4,amt:'₹23L',t:'2h ago'}];
  window.dbAlerts = alerts;
  document.getElementById('af-body').innerHTML=window.dbAlerts.map(a=>`<div class="al-row"><div class="al-dot" style="background:${a.col}"></div><div style="flex:1"><div class="al-id">${a.id}</div><div class="al-type">${a.type}</div></div><div class="al-right"><div class="al-amt" style="color:${a.col}">${a.amt}</div><div class="al-time">${a.t}</div></div></div>`).join('');
  
  if(!window.alertInt) window.alertInt = setInterval(()=>{
    const nn = {id:`ALT-${Math.floor(Math.random()*9000+1000)}`,type:['Structuring','Round-Tripping','Rapid Layering','Profile Mismatch'][Math.floor(Math.random()*4)],col:Math.random()>0.5?C2:C4,amt:`₹${(Math.random()*50).toFixed(1)}L`,t:'Just now'};
    window.dbAlerts.unshift(nn);
    if(window.dbAlerts.length>5) window.dbAlerts.pop();
    const bd = document.getElementById('af-body');
    const nr = document.createElement('div');
    nr.className = 'al-row slide-in';
    nr.innerHTML = `<div class="al-dot" style="background:${nn.col}"></div><div style="flex:1"><div class="al-id">${nn.id}</div><div class="al-type">${nn.type}</div></div><div class="al-right"><div class="al-amt" style="color:${nn.col}">${nn.amt}</div><div class="al-time">${nn.t}</div></div>`;
    bd.insertBefore(nr, bd.firstChild);
    if(bd.children.length>5) bd.lastChild.remove();
  }, 20000);

  document.querySelectorAll('.sc-num').forEach(el=>{
    const txt = el.innerText;
    const v=parseFloat(txt.replace(/[^0-9.]/g,''));
    if(isNaN(v)) return;
    const isCurrency=txt.includes('₹')||txt.includes('Cr');
    const isPer=txt.includes('%');
    const suffix = txt.replace(/[0-9.]/g,'').replace('₹','');
    let start=0; const it=setInterval(()=>{
      start+=(v-start)/8;
      if(v-start<0.1) { start=v; clearInterval(it); el.innerText=txt; return; }
      el.innerText=(txt.includes('₹')?'₹':'')+(start.toFixed(isPer?1:isCurrency?1:0))+(isPer?'%':'')+suffix;
    },30);
  });

  const bd=[4,8,5,12,7,9,22,11,8,19,14,31,9,17,26,8,12,45,18,9,67,22,14,8,31,19,88,42,31,89];
  const bm=Math.max(...bd);
  document.getElementById('vel-bars').innerHTML=bd.map(v=>`<div class="bbar" style="height:${Math.max(4,(v/bm)*82)}px;background:${v>50?C2:v>20?C4:'#1a3a5c'}" title="${v}"></div>`).join('');
  const typs=[['Round-Tripping',87,C2,7],['Rapid Layering',72,C4,12],['Structuring',58,C4,8],['Dormant Acct',45,C1,3],['Profile Mismatch',33,C5,5]];
  document.getElementById('typo-rows').innerHTML=typs.map(t=>`<div class="typ-row"><span class="ty-n" style="color:${t[2]}">${t[0]}</span><div class="ty-trk"><div class="ty-f" style="width:${t[1]}%;background:${t[2]}"></div></div><span class="ty-ct">${t[3]}</span></div>`).join('');
  const mls=[['GRAPH ANOMALY',94,C2],['VELOCITY',89,C2],['STRUCTURING',76,C4],['PROFILE',31,C3],['NET RISK',92,C2],['DORMANCY',87,C2]];
  document.getElementById('ml-dash').innerHTML=mls.map(m=>`<div class="mlc"><div class="ml-lbl">${m[0]}</div><div class="ml-num" style="color:${m[2]}">${m[1]}<span style="font-size:10px;opacity:0.5">%</span></div><div class="ml-trk"><div class="ml-fill" style="width:${m[1]}%;background:${m[2]}"></div></div></div>`).join('');
}
