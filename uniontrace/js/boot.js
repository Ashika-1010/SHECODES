/* Boot screen animation */
/* ══ BOOT ══ */
(function(){
  const msgs=['INITIALISING KERNEL...','LOADING NEURAL MODELS...','CONNECTING TO GRAPH DB...','ESTABLISHING SECURE CHANNEL...','SYSTEM ONLINE'];
  let p=0,mi=0;
  const bar=document.getElementById('boot-bar'),st=document.getElementById('boot-status');
  const iv=setInterval(()=>{
    p=Math.min(100,p+(100/50)); // Takes ~2 seconds in total (40ms * 50 = 2000)
    bar.style.width=p+'%';
    if(mi<msgs.length-1&&p>mi*(100/(msgs.length-1))){st.textContent=msgs[mi];mi++;}
    if(p>=100){clearInterval(iv);st.textContent=msgs[msgs.length-1];setTimeout(()=>go('land'),200);}
  },40);
})();
