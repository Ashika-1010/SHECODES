import { useState, useRef, useEffect, useCallback } from 'react';

export default function TimelineReplay({ onProgress }) {
  const [progress, setProgress] = useState(0.65);
  const [playing, setPlaying]   = useState(false);
  const trkRef   = useRef(null);
  const rafRef   = useRef(null);
  const dragging = useRef(false);

  const updateProgress = useCallback((p) => {
    const clamped = Math.max(0, Math.min(1, p));
    setProgress(clamped);
    onProgress?.(clamped);
  }, [onProgress]);

  // Play animation
  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    function step() {
      setProgress(prev => {
        const next = prev + 0.005;
        if (next >= 1) { setPlaying(false); onProgress?.(1); return 1; }
        onProgress?.(next);
        rafRef.current = requestAnimationFrame(step);
        return next;
      });
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, onProgress]);

  function getPos(e) {
    const r = trkRef.current.getBoundingClientRect();
    return (e.clientX - r.left) / r.width;
  }

  function onMouseDown(e) { dragging.current = true; updateProgress(getPos(e)); }
  function onMouseMove(e) { if (dragging.current) updateProgress(getPos(e)); }
  function onMouseUp()    { dragging.current = false; }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
    };
  }, []);

  function reset() { setPlaying(false); updateProgress(0); }

  const pct = Math.round(progress * 100);

  return (
    <div className="tl-panel">
      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:'var(--t3)', letterSpacing:2, marginBottom:8 }}>
        TIMELINE REPLAY
      </div>
      <div className="tl-trk" ref={trkRef} onMouseDown={onMouseDown}>
        <div className="tl-prog" style={{ width:`${pct}%` }} />
        <div className="tl-knob" style={{ left:`${pct}%` }} />
      </div>
      <div className="tl-times"><span>T+0:00</span><span>T+0:42</span></div>
      <div className="tl-btns">
        <div className="g-btn" style={{ flex:1, textAlign:'center' }} onClick={() => setPlaying(p => !p)}>
          {playing ? 'PAUSE' : 'PLAY'}
        </div>
        <div className="g-btn" style={{ flex:1, textAlign:'center' }} onClick={reset}>RESET</div>
      </div>
    </div>
  );
}
