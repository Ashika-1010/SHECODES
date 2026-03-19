import { useEffect } from 'react';
import FlowTrace     from '../../components/investigate/FlowTrace';
import TimelineReplay from '../../components/investigate/TimelineReplay';
import AIChat        from '../../components/investigate/AIChat';
import InvestGraph   from '../../components/graph/TransactionGraph';

export default function InvestPage({ onMount }) {
  useEffect(() => { onMount?.(); }, []);
  return (
    <div className="app-page show">
      <div className="inv-layout" style={{ height:'100%' }}>
        <div className="inv-left">
          <div className="panel-hd">FUND FLOW TRACE — CASE #2847</div>
          <div style={{ overflowY:'auto',flex:1 }}>
            <FlowTrace />
          </div>
          <TimelineReplay />
        </div>
        <div className="inv-center">
          <div className="inv-cv-area">
            <InvestGraph canvasId="inv-cv" />
          </div>
          <div className="inv-meta">
            <div className="im"><div className="im-lbl">CYCLE TIME</div><div className="im-val" style={{ color:'var(--c2)' }}>42 MIN</div></div>
            <div className="im"><div className="im-lbl">TOTAL HOPS</div><div className="im-val" style={{ color:'var(--c4)' }}>5</div></div>
            <div className="im"><div className="im-lbl">AMOUNT</div><div className="im-val" style={{ color:'var(--c1)' }}>₹47.3L</div></div>
            <div className="im"><div className="im-lbl">RISK SCORE</div><div className="im-val" style={{ color:'var(--c2)' }}>94/100</div></div>
          </div>
        </div>
        <div className="inv-right">
          <AIChat />
        </div>
      </div>
    </div>
  );
}
