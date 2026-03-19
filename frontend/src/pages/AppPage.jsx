import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import NotificationToast from '../components/shared/NotificationToast';
import StarField from '../components/shared/StarField';

// Lazy page imports (filled in Phase 5)
import GraphPage    from './app/GraphPage';
import DashPage     from './app/DashPage';
import InvestPage   from './app/InvestPage';
import ReportsPage  from './app/ReportsPage';

const PAGE_TITLES = {
  graph:   'THREAT GRAPH',
  dash:    'DASHBOARD',
  invest:  'INVESTIGATE',
  reports: 'REPORTS',
};

export default function AppPage() {
  const [activePage, setActivePage] = useState('graph');

  return (
    <div className="app-shell">
      <StarField />
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="app-main">
        <Topbar title={PAGE_TITLES[activePage]} />
        <div className="app-content">
          <Routes>
            <Route index element={<Navigate to="graph" replace />} />
            <Route path="graph"   element={<GraphPage   onMount={() => setActivePage('graph')}   />} />
            <Route path="dash"    element={<DashPage    onMount={() => setActivePage('dash')}    />} />
            <Route path="invest"  element={<InvestPage  onMount={() => setActivePage('invest')}  />} />
            <Route path="reports" element={<ReportsPage onMount={() => setActivePage('reports')} />} />
          </Routes>
        </div>
      </div>
      <NotificationToast />
    </div>
  );
}
