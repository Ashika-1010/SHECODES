import { TYPOLOGIES } from '../../data/mockData';

export default function TypologyBreakdown() {
  return (
    <div className="dc">
      <div className="dc-hd"><span className="dc-ttl">FRAUD TYPOLOGY</span></div>
      <div className="dc-body">
        {TYPOLOGIES.map(t => (
          <div className="typ-row" key={t.name}>
            <span className="ty-n" style={{ color: t.col }}>{t.name}</span>
            <div className="ty-trk"><div className="ty-f" style={{ width:`${t.pct}%`, background: t.col }} /></div>
            <span className="ty-ct">{t.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
