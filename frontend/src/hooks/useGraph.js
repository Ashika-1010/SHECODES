import { useRef, useEffect, useCallback } from 'react';
import { NODES, EDGES } from '../data/mockData';

export function useGraph({ canvasId = 'main-cv', timelineProgress = null } = {}) {
  const rotRef      = useRef(0);
  const hovRef      = useRef(null);
  const selectedRef = useRef(NODES[0].id);
  const dashOffRef  = useRef(0);
  const rafRef      = useRef(null);

  function proj(x, y, z, rot, W, H) {
    const c = Math.cos(rot), s = Math.sin(rot);
    const rx = x * c - z * s, rz = x * s + z * c;
    const sc = 200 / (3.2 - rz);
    return { px: W / 2 + rx * sc * W * 0.36, py: H / 2 - y * sc * H * 0.36, s: Math.max(0.3, sc / 85) };
  }

  const draw = useCallback((cv, tlProg) => {
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, W, H);
    dashOffRef.current = (dashOffRef.current + 0.35) % 20;

    // Grid rings
    ctx.strokeStyle = 'rgba(0,212,255,0.04)'; ctx.lineWidth = 1;
    for (let i = 1; i < 9; i++) {
      ctx.beginPath(); ctx.arc(W / 2, H / 2, i * Math.min(W, H) / 18, 0, Math.PI * 2); ctx.stroke();
    }

    // Edges
    EDGES.forEach((e, ei) => {
      if (tlProg !== null && ei / EDGES.length > tlProg) return;
      const ns = NODES.find(n => n.id === e.s), nt = NODES.find(n => n.id === e.t);
      if (!ns || !nt) return;
      const ps = proj(ns.x, ns.y, ns.z, rotRef.current, W, H);
      const pt = proj(nt.x, nt.y, nt.z, rotRef.current, W, H);
      const mx = (ps.px + pt.px) / 2 - (pt.py - ps.py) * 0.12;
      const my = (ps.py + pt.py) / 2 + (pt.px - ps.px) * 0.08;
      ctx.save();
      ctx.setLineDash(e.sus ? [6, 3] : [3, 6]);
      ctx.lineDashOffset = -dashOffRef.current;
      ctx.strokeStyle = e.col + (e.sus ? 'cc' : '55');
      ctx.lineWidth = e.sus ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(ps.px, ps.py); ctx.quadraticCurveTo(mx, my, pt.px, pt.py); ctx.stroke();
      ctx.setLineDash([]);
      const ang = Math.atan2(pt.py - my, pt.px - mx), ar = 7;
      ctx.fillStyle = e.col + (e.sus ? 'cc' : '55');
      ctx.beginPath();
      ctx.moveTo(pt.px, pt.py);
      ctx.lineTo(pt.px - ar * Math.cos(ang - 0.35), pt.py - ar * Math.sin(ang - 0.35));
      ctx.lineTo(pt.px - ar * Math.cos(ang + 0.35), pt.py - ar * Math.sin(ang + 0.35));
      ctx.closePath(); ctx.fill();
      ctx.restore();
    });

    // Nodes (sorted by depth)
    [...NODES]
      .sort((a, b) => proj(a.x, a.y, a.z, rotRef.current, W, H).s - proj(b.x, b.y, b.z, rotRef.current, W, H).s)
      .forEach(n => {
        const p = proj(n.x, n.y, n.z, rotRef.current, W, H);
        const isH = hovRef.current === n.id, isS = selectedRef.current === n.id;
        p.py += Math.sin(Date.now() / 400 + n.id.charCodeAt(n.id.length - 1)) * 3 * p.s;
        const r = n.r * p.s * 2.4;
        ctx.save();
        ctx.beginPath(); ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fillStyle = n.col + '18'; ctx.fill();
        ctx.strokeStyle = n.col; ctx.lineWidth = isH || isS ? 3 : 1.5; ctx.stroke();
        if (isS) {
          const t = (Date.now() / 800) % 1;
          ctx.beginPath(); ctx.arc(p.px, p.py, r + t * 25, 0, Math.PI * 2);
          ctx.strokeStyle = n.col + Math.floor((1 - t) * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 2 * (1 - t); ctx.stroke();
        }
        if (n.risk === 'CRITICAL' && !isS) {
          const t = (Date.now() / 1000) % 1;
          ctx.beginPath(); ctx.arc(p.px, p.py, r + t * 18, 0, Math.PI * 2);
          ctx.strokeStyle = n.col + Math.floor((1 - t) * 60).toString(16).padStart(2, '0');
          ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(p.px, p.py, r * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = n.col; ctx.fill();
        ctx.fillStyle = n.col;
        ctx.font = `${Math.max(9, 10 * p.s)}px 'Share Tech Mono',monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(n.lbl, p.px, p.py + r + 13 * p.s);
        ctx.restore();
      });
  }, []);

  function startLoop(cv, tlProgRef) {
    function loop() {
      rotRef.current += 0.003;
      draw(cv, tlProgRef ? tlProgRef.current : null);
      rafRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(rafRef.current);
  }

  function getHoveredNode(mx, my, cv) {
    const W = cv.width, H = cv.height;
    for (const n of NODES) {
      const p = proj(n.x, n.y, n.z, rotRef.current, W, H);
      if (Math.hypot(mx - p.px, my - p.py) < n.r * p.s * 2.4) return n;
    }
    return null;
  }

  return { startLoop, getHoveredNode, hovRef, selectedRef, proj, rotRef, NODES };
}
