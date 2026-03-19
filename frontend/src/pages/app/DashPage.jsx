import { useEffect } from 'react';
import StatCard           from '../../components/dashboard/StatCard';
import AlertFeed          from '../../components/dashboard/AlertFeed';
import VelocityChart      from '../../components/dashboard/VelocityChart';
import TypologyBreakdown  from '../../components/dashboard/TypologyBreakdown';
import MLScoreGrid        from '../../components/dashboard/MLScoreGrid';

export default function DashPage({ onMount }) {
  useEffect(() => { onMount?.(); }, []);
  return (
    <div className="app-page show">
      <div className="dash-body">
        <div className="stat-row">
          <StatCard variant="r" label="CRITICAL ALERTS" value="07"    change="↑ +3 FROM YESTERDAY" valueColor="var(--c2)" />
          <StatCard variant="a" label="HIGH RISK"       value="23"    change="UNDER REVIEW"         valueColor="var(--c4)" />
          <StatCard variant="b" label="FLAGGED FUNDS"   value="₹2.4Cr" change="ACROSS 14 ACCOUNTS"  valueColor="var(--c1)" />
          <StatCard variant="g" label="ML ACCURACY"     value="98.7%" change="6 MODELS ACTIVE"      valueColor="var(--c3)" />
        </div>
        <div className="dash-grid" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <AlertFeed />
            <TypologyBreakdown />
          </div>
          {/* India branch heatmap placeholder */}
          <div className="dc" style={{ gridRow:'span 2' }}>
            <div className="dc-hd"><span className="dc-ttl">INDIA BRANCH HEATMAP</span></div>
            <div className="dc-body" style={{ position:'relative',display:'flex',justifyContent:'center',alignItems:'center',minHeight:420 }}>
              <svg viewBox="0 0 400 400" width="100%" height="320" style={{ opacity:0.25,pointerEvents:'none' }}>
                <path d="M120,50 L180,80 L240,40 L300,100 L280,180 L350,220 L300,320 L240,380 L180,350 L120,380 L80,280 L60,200 L100,120 Z" fill="none" stroke="var(--c1)" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M180,80 L200,150 L280,180 M200,150 L180,250 L120,380 M180,250 L300,320 M200,150 L100,120" fill="none" stroke="var(--c1)" strokeWidth="1" strokeDasharray="4 4"/>
              </svg>
              {[
                { city:'MUMBAI',    top:'35%',left:'30%',col:'var(--c2)',size:14,anim:'blink 1.8s infinite' },
                { city:'DELHI',     top:'20%',left:'55%',col:'var(--c4)',size:10,anim:'' },
                { city:'BANGALORE', top:'70%',left:'45%',col:'var(--c1)',size:8,anim:'' },
                { city:'CHENNAI',   top:'65%',left:'70%',col:'var(--c2)',size:12,anim:'blink 1.5s infinite' },
                { city:'HYDERABAD', top:'55%',left:'40%',col:'var(--c3)',size:8,anim:'' },
              ].map(p => (
                <div key={p.city} style={{ position:'absolute',top:p.top,left:p.left,display:'flex',flexDirection:'column',alignItems:'center' }}>
                  <div style={{ background:p.col,width:p.size,height:p.size,borderRadius:'50%',boxShadow:`0 0 ${p.size+6}px ${p.size/4}px ${p.col}`,animation:p.anim }} />
                  <span style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:9,marginTop:6,color:p.col }}>{p.city}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <VelocityChart />
            <MLScoreGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
