import { useEffect } from 'react';
import TransactionGraph from '../../components/graph/TransactionGraph';
import NodeDetailPanel  from '../../components/graph/NodeDetailPanel';

export default function GraphPage({ onMount }) {
  useEffect(() => { onMount?.(); }, []);
  return (
    <div className="app-page show">
      <div className="graph-layout" style={{ height: '100%' }}>
        <TransactionGraph />
        <NodeDetailPanel />
      </div>
    </div>
  );
}
