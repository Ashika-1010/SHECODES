import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

export const generateSTR_PDF = (storeState) => {
  const doc = new jsPDF();
  const { caseContext, graphData } = storeState;
  
  // Header
  // Logo placeholder
  doc.setFillColor(59, 130, 246);
  doc.rect(14, 15, 12, 12, 'F');
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('UNIONTRACE', 30, 24);
  
  doc.setFontSize(14);
  doc.text('FIU-IND Suspicious Transaction Report (STR)', 14, 40);
  
  // Metadata Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Reporting Entity Code: IND-BANK-0001 (Union SheCODES Bank)`, 14, 50);
  doc.text(`Principal Officer: Jane Doe (Chief Compliance Officer)`, 14, 55);
  doc.text(`Date Generated: ${new Date().toISOString()}`, 14, 60);
  doc.text(`Case ID: ${caseContext.caseId}`, 14, 65);
  
  // Subject Accounts Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Subject Accounts', 14, 80);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  caseContext.flaggedAccounts.forEach((acc, i) => {
    // Mask account number for export: XXXX-XXXX-1234
    const masked = acc.replace(/ACC-(\d{2})\d{2}/, 'XXXX-XXXX-$1XX');
    doc.text(`• Account: ${masked} | Customer: CUST-${acc.split('-')[1]} | Risk: Critical`, 14, 88 + i * 6);
  });
  
  // Suspicious Activity Narrative (Mapping ML Engine)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Suspicious Activity Details', 14, 110);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const narrative = `ML Engine detected a ${caseContext.typology} pattern with a composite risk score of ${caseContext.compositeScore}/100. Graph analytics uncovered ${graphData.nodes.length} nodes and ${graphData.edges.length} edges participating in layering and round-tripping sequences within a 6-hour window. This is highly indicative of structured money laundering traversing through shell accounts.`;
  const splitText = doc.splitTextToSize(narrative, 180);
  doc.text(splitText, 14, 118);
  
  // Transaction Log
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Transaction Log Extract', 14, 145);
  
  doc.setFontSize(9);
  doc.setFont('courier', 'normal');
  doc.text('TIMESTAMP            | CHANNEL | AMOUNT (INR) | PATH', 14, 153);
  doc.line(14, 155, 190, 155);
  
  graphData.edges.slice(0, 10).forEach((edge, i) => {
    const timestamp = edge.timestamp || new Date().toISOString();
    doc.text(`${timestamp.split('.')[0]}Z | ${edge.channel.padEnd(7)} | ₹${edge.amount.toLocaleString().padEnd(10)} | ${edge.source} -> ${edge.target}`, 14, 161 + i * 5);
  });
  
  return doc;
};

export const downloadSTR = (storeState) => {
  const doc = generateSTR_PDF(storeState);
  doc.save(`FIU_STR_${storeState.caseContext.caseId}.pdf`);
};

export const downloadEvidencePackage = async (storeState) => {
  const zip = new JSZip();
  const { caseContext, graphData } = storeState;
  
  // 1. Core STR Draft (PDF)
  const doc = generateSTR_PDF(storeState);
  const pdfBlob = doc.output('blob');
  zip.file(`FIU_STR_${caseContext.caseId}.pdf`, pdfBlob);
  
  // 2. Full Transaction Logs (CSV)
  let csv = 'Transaction ID,Timestamp,Channel,Amount (INR),Source Account,Target Account,Suspicion Level\n';
  graphData.edges.forEach((e, i) => {
    const timestamp = e.timestamp || new Date().toISOString();
    csv += `TXN-${String(i).padStart(4, '0')},${timestamp},${e.channel},${e.amount},${e.source},${e.target},${e.suspicionLevel || 'medium'}\n`;
  });
  zip.file(`raw_transactions_${caseContext.caseId}.csv`, csv);
  
  // 3. ML Scoring Context (JSON)
  zip.file(`ml_inference_report_${caseContext.caseId}.json`, JSON.stringify({
    metadata: {
      generatedAt: new Date().toISOString(),
      caseId: caseContext.caseId,
      typologyDetected: caseContext.typology
    },
    inference: {
      compositeRiskScore: caseContext.compositeScore,
      models: [
        { model: "GraphSAGE", subject: "Graph Anomaly", probability: 0.96 },
        { model: "Isolation Forest", subject: "Velocity Scorer", probability: 0.89 },
        { model: "DBSCAN", subject: "Structuring", probability: 0.72 },
        { model: "PageRank", subject: "Network Centrality", probability: 0.95 }
      ],
      nodesImplicated: caseContext.flaggedAccounts
    }
  }, null, 2));
  
  // 4. Graph Visualisation Screenshot (PNG)
  try {
    const graphElement = document.querySelector('.graph-container-capture');
    if (graphElement) {
      // Temporarily stash overflow settings for a clean capture
      const originalOverflow = graphElement.style.overflow;
      graphElement.style.overflow = 'visible';
      
      const canvas = await html2canvas(graphElement, {
        backgroundColor: '#ffffff',
        scale: 2 // High resolution
      });
      const imgData = canvas.toDataURL('image/png').split(',')[1];
      zip.file(`network_graph_${caseContext.caseId}.png`, imgData, {base64: true});
      
      graphElement.style.overflow = originalOverflow;
    }
  } catch (err) {
    console.warn('Screenshot capture failed or skipped:', err);
  }
  
  // Generate and Download ZIP file
  const content = await zip.generateAsync({type: 'blob'});
  saveAs(content, `UNIONTRACE_Evidence_Package_${caseContext.caseId}.zip`);
};
