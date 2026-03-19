/* Reports table and STR generation */
/* ══ REPORTS ══ */
function buildReports(){
  const rows=[['#2847','Round-Tripping','₹47.3L','FILED','2 hrs ago'],['#2843','Rapid Layering','₹9.8L','PENDING','14 hrs ago'],['#2831','Profile Mismatch','₹23L','FILED','1 day ago'],['#2819','Structuring','₹5.1L','APPROVED','3 days ago'],['#2805','Dormant Activation','₹1.2Cr','REVIEW','5 days ago']];
  const sc={FILED:C3,PENDING:C4,APPROVED:C1,REVIEW:C2};
  document.getElementById('rep-rows').innerHTML=rows.map(r=>`<div class="rt-row"><span class="rtc" style="color:${C1};font-family:'Share Tech Mono',monospace">Case ${r[0]}</span><span class="rtc">${r[1]}</span><span class="rtc" style="font-family:'Share Tech Mono',monospace">${r[2]}</span><span class="rtc" style="color:${sc[r[3]]}">${r[3]}</span><span class="rtc">${r[4]}</span></div>`).join('');
}
