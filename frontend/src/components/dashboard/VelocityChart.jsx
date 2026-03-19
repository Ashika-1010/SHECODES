import { VELOCITY_DATA } from '../../data/mockData';

export default function VelocityChart() {
  const max = Math.max(...VELOCITY_DATA);
  return (
    <div className="dc">
      <div className="dc-hd"><span className="dc-ttl">TX VELOCITY</span></div>
      <div className="dc-body">
        <div className="bar-wrap">
          {VELOCITY_DATA.map((v, i) => (
            <div
              key={i}
              className="bbar"
              style={{
                height: `${Math.max(4, (v / max) * 82)}px`,
                background: v > 50 ? 'var(--c2)' : v > 20 ? 'var(--c4)' : '#1a3a5c',
              }}
              title={String(v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
