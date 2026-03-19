/* Animated star field background */
/* ══ STARS ══ */
(function(){
  const cv=document.getElementById('stars'),ctx=cv.getContext('2d');
  function rsz(){cv.width=innerWidth;cv.height=innerHeight;}rsz();addEventListener('resize',rsz);
  const S=Array.from({length:180},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.2+0.2,o:Math.random()*0.5+0.1,s:Math.random()*0.004+0.001}));
  (function draw(){ctx.clearRect(0,0,cv.width,cv.height);S.forEach(s=>{s.o+=s.s;if(s.o>0.65||s.o<0.08)s.s*=-1;ctx.beginPath();ctx.arc(s.x*cv.width,s.y*cv.height,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(180,220,255,${s.o})`;ctx.fill();});requestAnimationFrame(draw);})();
})();
