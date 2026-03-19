import { useEffect, useRef, useState } from 'react';
import { useGraph } from '../../hooks/useGraph';
import { NODES } from '../../data/mockData';
import NodeDetailPanel from './NodeDetailPanel';

const MODES = ['FLOW MAP', 'CIRCULAR TX', 'LAYERING', 'ALL NODES'];

export default function TransactionGraph({ canvasId = 'main-cv', showPanel = true }) {
  const canvasRef    = useRef(null);
  const [mode, setMode]           = useState('FLOW MAP');
  const [selectedNode, setSelected] = useState(null);
  const { startLoop, getHoveredNode, hovRef, selectedRef } = useGraph();

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    function resize() { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    cv.addEventListener('mousemove', e => {
      const r = cv.getBoundingClientRect();
      const n = getHoveredNode(e.clientX - r.left, e.clientY - r.top, cv);
      hovRef.current = n ? n.id : null;
      cv.style.cursor = n ? 'pointer' : 'default';
    });

    cv.addEventListener('click', () => {
      if (hovRef.current) {
        selectedRef.current = hovRef.current;
        const n = NODES.find(x => x.id === hovRef.current);
        if (n) setSelected(n);
      }
    });

    const stop = startLoop(cv, null);
    return () => { stop(); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="graph-layout" style={{ height: '100%' }}>
      <div className="graph-cv-area">
        <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />

        <div className="g-ctrl">
          {MODES.map(m => (
            <div key={m} className={`g-btn${mode === m ? ' active' : ''}`} onClick={() => setMode(m)}>{m}</div>
          ))}
        </div>

        <div className="g-legend">
          {[['#ff2d55','CRITICAL'],['#ffb700','HIGH RISK'],['#00d4ff','DORMANT'],['#00ff88','CLEAN'],['#7c3aed','GATEWAY']].map(([col, lbl]) => (
            <div className="gli" key={lbl}><div className="gld" style={{ background: col }} />{lbl}</div>
          ))}
        </div>

        <div className="g-hud">
          <div className="g-hud-card"><div className="ghc-lbl">THREATS</div><div className="ghc-val" style={{ color:'var(--c2)' }}>07</div></div>
          <div className="g-hud-card"><div className="ghc-lbl">FLAGGED</div><div className="ghc-val" style={{ color:'var(--c1)' }}>₹2.4Cr</div></div>
        </div>
      </div>

      {showPanel && (
        <NodeDetailPanel
          selectedNode={selectedNode}
          onSearch={n => { selectedRef.current = n.id; setSelected(n); }}
        />
      )}
    </div>
  );
}
