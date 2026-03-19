import { FLOW_STEPS } from '../../data/mockData';

export default function FlowTrace({ activeIdx = -1 }) {
  return (
    <>
      {FLOW_STEPS.map((s, i) => (
        <div
          className="flow-item"
          key={i}
          style={{
            borderLeft: `2px solid ${i === activeIdx ? 'var(--c1)' : 'transparent'}`,
            background: i === activeIdx ? 'rgba(0,212,255,0.08)' : 'transparent',
            opacity: activeIdx >= 0 && i > activeIdx ? 0.3 : 1,
            transition: 'all 0.3s',
          }}
        >
          <div className="fi-line">
            <div className="fi-dot" style={{ background: s.col }} />
            {i < FLOW_STEPS.length - 1 && <div className="fi-conn" />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
              <span className="fi-name">{s.name}</span>
              <span className="fi-tag" style={{ background:`${s.col}22`, color:s.col, border:`1px solid ${s.col}44` }}>
                {s.tag}
              </span>
            </div>
            <div className="fi-det">{s.det}</div>
            <div className="fi-amt" style={{ color: s.col }}>{s.amt}</div>
          </div>
        </div>
      ))}
    </>
  );
}
