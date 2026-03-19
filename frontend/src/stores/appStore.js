import { create } from 'zustand';

export const useAppStore = create((set) => ({
  highlightedAccounts: [],
  setHighlightedAccounts: (accounts) => set({ highlightedAccounts: accounts }),
  apiKey: localStorage.getItem('anthropic_api_key') || '',
  setApiKey: (key) => {
    localStorage.setItem('anthropic_api_key', key);
    set({ apiKey: key });
  },
  
  graphData: {
    nodes: [
      { id: 'ACC-0091', riskScore: 95, type: 'Account', branchCode: 'BR-MUM-01', riskCategory: 'flagged' },
      { id: 'ACC-0445', riskScore: 80, type: 'Account', branchCode: 'BR-DEL-02', riskCategory: 'watch' },
      { id: 'ACC-0782', riskScore: 90, type: 'Account', branchCode: 'BR-MUM-01', riskCategory: 'flagged' },
      { id: 'ACC-0112', riskScore: 20, type: 'Account', branchCode: 'BR-BLR-04', riskCategory: 'clean' },
      { id: 'ACC-0999', riskScore: 40, type: 'Account', branchCode: 'BR-MUM-01', riskCategory: 'dormant' }
    ],
    edges: [
      { source: 'ACC-0091', target: 'ACC-0445', amount: 500000 },
      { source: 'ACC-0445', target: 'ACC-0782', amount: 495000 },
      { source: 'ACC-0782', target: 'ACC-0091', amount: 490000 }
    ]
  },
  
  caseContext: {
    caseId: 'RT-2025-001',
    typology: 'Round-Tripping',
    flaggedAccounts: ['ACC-0091', 'ACC-0782'],
    compositeScore: 94
  }
}));
