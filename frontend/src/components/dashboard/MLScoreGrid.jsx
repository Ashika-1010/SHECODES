import { ML_SCORES } from '../../data/mockData';

export default function MLScoreGrid() {
  return (
    <div className="dc" style={{ flex: 1 }}>
      <div className="dc-hd"><span className="dc-ttl">ML SCORES</span></div>
      <div className="dc-body">
        <div className="ml-grid">
          {ML_SCORES.map(m => (
            <div className="mlc" key={m.label}>
              <div className="ml-lbl">{m.label}</div>
              <div className="ml-num" style={{ color: m.col }}>
                {m.score}<span style={{ fontSize:10, opacity:0.5 }}>%</span>
              </div>
              <div className="ml-trk">
                <div className="ml-fill" style={{ width:`${m.score}%`, background: m.col }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
