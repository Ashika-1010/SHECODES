import { useState, useRef, useEffect } from 'react';
import { AI_REPLIES, ML_SCORES } from '../../data/mockData';

const INIT_MSG = {
  ai: true,
  who: 'UNIONTRACE AI',
  txt: 'Case #2847 active. Circular transaction detected: 5 accounts, 42-minute round-trip. Composite risk score: 94/100. Pattern matches round-tripping typology at 96% confidence.',
};

export default function AIChat() {
  const [log, setLog]       = useState([INIT_MSG]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const idxRef   = useRef(0);
  const areaRef  = useRef(null);

  useEffect(() => {
    if (areaRef.current) areaRef.current.scrollTop = 99999;
  }, [log, typing]);

  function send() {
    const v = input.trim();
    if (!v) return;
    setLog(prev => [...prev, { ai: false, who: 'INVESTIGATOR', txt: v }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setLog(prev => [...prev, {
        ai: true,
        who: 'UNIONTRACE AI',
        txt: AI_REPLIES[idxRef.current % AI_REPLIES.length],
      }]);
      idxRef.current++;
    }, 1200);
  }

  return (
    <>
      <div className="panel-hd">AI INVESTIGATOR</div>
      <div className="chat-area" ref={areaRef}>
        {log.map((m, i) => (
          <div className={`cm ${m.ai ? 'ai' : 'usr'}`} key={i}>
            <div className="cm-who">{m.who}</div>
            {m.txt}
          </div>
        ))}
        {typing && (
          <div className="cm ai">
            <div className="cm-who">UNIONTRACE AI</div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div className="typing"><span/><span/><span/></div>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'var(--t3)' }}>ANALYSING...</span>
            </div>
          </div>
        )}
      </div>

      {/* ML mini scores */}
      <div className="ml-mini">
        {ML_SCORES.slice(0, 4).map(m => (
          <div className="mlc" key={m.label}>
            <div className="ml-lbl">{m.label}</div>
            <div className="ml-num" style={{ color:m.col, fontSize:15 }}>{m.score}%</div>
            <div className="ml-trk"><div className="ml-fill" style={{ width:`${m.score}%`, background:m.col }} /></div>
          </div>
        ))}
      </div>

      <div className="chat-bar">
        <input
          placeholder="Ask about this case..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send}>SEND</button>
      </div>

      <EvidenceButton />
    </>
  );
}

function EvidenceButton() {
  const [state, setState] = useState('idle');
  function generate() {
    if (state === 'loading') return;
    setState('loading');
    setTimeout(() => setState('done'), 2500);
  }
  return (
    <div style={{ padding:14, borderTop:'1px solid rgba(0,212,255,0.08)' }}>
      <div
        className="str-btn"
        style={{
          width:'100%', justifyContent:'center', padding:12, textAlign:'center',
          ...(state === 'done' ? { background:'rgba(0,255,136,0.1)', color:'var(--c3)', borderColor:'var(--c3)' } : {}),
        }}
        onClick={generate}
      >
        {state === 'idle' && 'GENERATE EVIDENCE PACKAGE'}
        {state === 'loading' && (
          <span style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span className="typing" style={{ padding:0, transform:'scale(0.8)' }}><span/><span/><span/></span>
            GENERATING ZIP...
          </span>
        )}
        {state === 'done' && '✓ PACKAGE READY — DOWNLOAD ZIP'}
      </div>
    </div>
  );
}
