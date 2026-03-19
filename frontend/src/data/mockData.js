// ─── Colour constants (mirrors navigation.js) ───────────────────────────────
export const C1 = '#00d4ff';
export const C2 = '#ff2d55';
export const C3 = '#00ff88';
export const C4 = '#ffb700';
export const C5 = '#7c3aed';

// ─── Graph nodes ─────────────────────────────────────────────────────────────
export const NODES = [
  { id: 'n1', x: 0,     y: 0.35,  z: 0,     lbl: 'ACC-0091', sub: 'Mumbai · Origin',              col: C2, r: 13, risk: 'CRITICAL', score: 94, branch: 'Mumbai',    type: 'Current A/C', amt: '₹47.3L',  cnt: 18 },
  { id: 'n2', x: 0.55,  y: 0.18,  z: 0.28,  lbl: 'ACC-0445', sub: 'Delhi · Hop 1',                col: C4, r: 10, risk: 'HIGH',     score: 78, branch: 'Delhi',     type: 'Savings',     amt: '₹47.2L',  cnt: 5  },
  { id: 'n3', x: 0.65,  y: -0.28, z: -0.18, lbl: 'ACC-0782', sub: 'Bangalore · Hop 2',            col: C4, r: 10, risk: 'HIGH',     score: 74, branch: 'Bangalore', type: 'Current A/C', amt: '₹47.1L',  cnt: 4  },
  { id: 'n4', x: 0,     y: -0.48, z: 0.38,  lbl: 'ACC-0118', sub: 'Hyderabad · Hop 3',            col: C4, r: 9,  risk: 'HIGH',     score: 67, branch: 'Hyderabad', type: 'Savings',     amt: '₹46.9L',  cnt: 3  },
  { id: 'n5', x: -0.62, y: -0.2,  z: -0.1,  lbl: 'ACC-0567', sub: 'Chennai · Structuring',        col: C2, r: 9,  risk: 'CRITICAL', score: 82, branch: 'Chennai',   type: 'Savings',     amt: '₹5.3L',   cnt: 11 },
  { id: 'n6', x: -0.55, y: 0.28,  z: 0.18,  lbl: 'ACC-0234', sub: 'Pune · Dormant',               col: C1, r: 9,  risk: 'WATCH',    score: 87, branch: 'Pune',      type: 'Savings',     amt: '₹1.2Cr',  cnt: 1  },
  { id: 'n7', x: 0.1,   y: 0.08,  z: -0.45, lbl: 'FX-GATE',  sub: 'SWIFT Gateway',                col: C5, r: 8,  risk: 'WATCH',    score: 55, branch: 'Mumbai',    type: 'Gateway',     amt: '₹23L',    cnt: 8  },
  { id: 'n8', x: -0.18, y: -0.08, z: 0.42,  lbl: 'NEFT-HUB', sub: 'Processor',                   col: C3, r: 7,  risk: 'CLEAN',    score: 12, branch: 'Mumbai',    type: 'Processor',   amt: '₹5.3L',   cnt: 11 },
];

// ─── Graph edges ─────────────────────────────────────────────────────────────
export const EDGES = [
  { s: 'n1', t: 'n2', sus: true,  col: C2 },
  { s: 'n2', t: 'n3', sus: true,  col: C2 },
  { s: 'n3', t: 'n4', sus: true,  col: C4 },
  { s: 'n4', t: 'n1', sus: true,  col: C2 },
  { s: 'n1', t: 'n6', sus: false, col: C1 },
  { s: 'n6', t: 'n7', sus: false, col: C1 },
  { s: 'n5', t: 'n8', sus: false, col: C4 },
  { s: 'n7', t: 'n2', sus: false, col: C5 },
];

// ─── Live alert feed ──────────────────────────────────────────────────────────
export const ALERTS = [
  { id: 'ALT-2847', type: 'Round-Tripping',    col: C2, amt: '₹47.3L', t: '2m ago'  },
  { id: 'ALT-2843', type: 'Rapid Layering',    col: C2, amt: '₹9.8L',  t: '14m ago' },
  { id: 'ALT-2839', type: 'Structuring',       col: C4, amt: '₹5.3L',  t: '31m ago' },
  { id: 'ALT-2835', type: 'Dormant Activated', col: C2, amt: '₹1.2Cr', t: '1h ago'  },
  { id: 'ALT-2831', type: 'Profile Mismatch',  col: C4, amt: '₹23L',   t: '2h ago'  },
];

// ─── Fund flow trace steps ────────────────────────────────────────────────────
export const FLOW_STEPS = [
  { name: 'ACC-0091', det: 'Mumbai · Rajesh Exports Pvt Ltd',          amt: '₹47,30,000', col: C2, tag: 'ORIGIN'   },
  { name: 'ACC-0445', det: 'Delhi · Ananya Trading Co. · 12 min',      amt: '₹47,22,000', col: C4, tag: 'HOP 1'    },
  { name: 'ACC-0782', det: 'Bangalore · ZM Consultants · 8 min',       amt: '₹47,10,000', col: C4, tag: 'HOP 2'    },
  { name: 'ACC-0118', det: 'Hyderabad · P. Krishnan · 22 min',         amt: '₹46,95,000', col: C4, tag: 'HOP 3'    },
  { name: 'ACC-0091', det: 'Mumbai · RETURN TO ORIGIN · 42 min total', amt: '₹46,80,000', col: C2, tag: 'CIRCULAR' },
];

// ─── ML model scores ──────────────────────────────────────────────────────────
export const ML_SCORES = [
  { label: 'GRAPH ANOMALY', score: 94, col: C2 },
  { label: 'VELOCITY',      score: 89, col: C2 },
  { label: 'STRUCTURING',   score: 76, col: C4 },
  { label: 'PROFILE',       score: 31, col: C3 },
  { label: 'NET RISK',      score: 92, col: C2 },
  { label: 'DORMANCY',      score: 87, col: C2 },
];

// ─── Reports case table ───────────────────────────────────────────────────────
export const REPORT_CASES = [
  { id: '#2847', typology: 'Round-Tripping',    amt: '₹47.3L', status: 'FILED',   filed: '2 hrs ago'  },
  { id: '#2843', typology: 'Rapid Layering',    amt: '₹9.8L',  status: 'PENDING', filed: '14 hrs ago' },
  { id: '#2831', typology: 'Profile Mismatch',  amt: '₹23L',   status: 'FILED',   filed: '1 day ago'  },
  { id: '#2819', typology: 'Structuring',       amt: '₹5.1L',  status: 'APPROVED',filed: '3 days ago' },
  { id: '#2805', typology: 'Dormant Activation',amt: '₹1.2Cr', status: 'REVIEW',  filed: '5 days ago' },
];

// ─── Notification toast messages ─────────────────────────────────────────────
export const NOTIF_MESSAGES = [
  'Round-tripping detected — ACC-0091 · ₹47.3L',
  'New dormant account activated — ACC-0234 · ₹1.2Cr',
  'Structuring pattern — 11 sub-threshold txns · ACC-0567',
  'Profile mismatch alert — ACC-0889 · ₹23L',
];

// ─── AI chat canned replies ───────────────────────────────────────────────────
export const AI_REPLIES = [
  'Tracing fund path from ACC-0091. 5-hop circular loop confirmed. Total cycle: 42 minutes. Pattern matches round-tripping typology at 94% confidence.',
  'ACC-0445 in Delhi has zero prior transaction history. Account was created 3 days before these transfers — classic mule account profile.',
  'Generating FIU-IND STR evidence package for Case #2847. All 9 required fields auto-populated from graph data.',
  'Network centrality analysis: ACC-0091 sits in the top 2% for betweenness score across the branch network.',
  'Parallel structuring pattern from ACC-0567: 11 transactions between ₹40K–₹49.9K over 7 days. Recommending joint STR filing.',
];

// ─── Fraud typology breakdown (dashboard) ────────────────────────────────────
export const TYPOLOGIES = [
  { name: 'Round-Tripping',  pct: 87, col: C2, count: 7  },
  { name: 'Rapid Layering',  pct: 72, col: C4, count: 12 },
  { name: 'Structuring',     pct: 58, col: C4, count: 8  },
  { name: 'Dormant Acct',    pct: 45, col: C1, count: 3  },
  { name: 'Profile Mismatch',pct: 33, col: C5, count: 5  },
];

// ─── TX velocity bar data (30 data points) ───────────────────────────────────
export const VELOCITY_DATA = [4,8,5,12,7,9,22,11,8,19,14,31,9,17,26,8,12,45,18,9,67,22,14,8,31,19,88,42,31,89];
