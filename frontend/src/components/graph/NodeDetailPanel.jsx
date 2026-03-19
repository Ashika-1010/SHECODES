import { useState } from 'react';
import { NODES } from '../../data/mockData';

const RISK_COLORS = { CRITICAL: 'var(--c2)', HIGH: 'var(--c4)', WATCH: 'var(--c1)', CLEAN: 'var(--c3)' };

export default function NodeDetailPanel({ selectedNode, onSearch }) {
  const [query, setQuery]     = useState('');
  const [notFound, setNotFound] = useState(false);
  const node = selectedNode || NODES[0];

  function handleSearch(v) {
    setQuery(v);
    if (!v.trim()) { setNotFound(false); return; }
    const found = NODES.find(n =>
      n.id.toUpperCase().includes(v.toUpperCase()) ||
      n.lbl.toUpperCase().includes(v.toUpperCase())
    );
    setNotFound(!found);
    if (found) onSearch?.(found);
  }

  const rc = RISK_COLORS[node.risk] || 'var(--c1)';

  return (
    <div className="node-panel">
      <div style={{ padding:'16px 20px 0', borderBottom:'none' }}>
        <input
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search Account ID..."
          style={{
            width:'100%', background:'rgba(0,212,255,0.04)',
            border:'1px solid rgba(0,212,255,0.1)', color:'var(--t1)',
            padding:'10px 12px', fontFamily:"'Share Tech Mono',monospace",
            fontSize:11, outline:'none', transition:'border 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--c1)'}
          onBlur={e  => e.target.style.borderColor = 'rgba(0,212,255,0.1)'}
        />
        {notFound && (
          <div style={{ color:'var(--c2)', fontFamily:"'Share Tech Mono',monospace", fontSize:9, marginTop:6, letterSpacing:1 }}>
            NODE NOT FOUND
          </div>
        )}
      </div>

      <div className="np-hd">
        <div className="np-tag">NODE INTELLIGENCE</div>
        <div className="np-id">{node.lbl}</div>
        <div className="np-sub">{node.sub}</div>
      </div>

      <div className="np-rows">
        {[
          ['Risk Level',    <span style={{ color: rc }}>{node.risk}</span>],
          ['ML Score',      <span style={{ color: rc, fontFamily:"'Orbitron',monospace" }}>{node.score}/100</span>],
          ['Branch',        node.branch],
          ['Type',          node.type],
          ['Flagged Amt',   node.amt],
          ['TX Count (30d)',node.cnt],
        ].map(([k, v]) => (
          <div className="np-row" key={k}>
            <span className="np-k">{k}</span>
            <span className="np-v">{v}</span>
          </div>
        ))}
      </div>

      <div className="risk-section">
        <div className="risk-label-row">
          <span className="risk-title">COMPOSITE RISK</span>
          <span className="risk-score">{node.score}/100</span>
        </div>
        <div className="risk-track">
          <div className="risk-fill" style={{ width:`${node.score}%` }} />
        </div>
        <div className="risk-marks"><span>LOW</span><span>MED</span><span>HIGH</span><span>CRIT</span></div>
      </div>
    </div>
  );
}
