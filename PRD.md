Product Requirements Document
Fund Flow Tracking & Fraud Detection System
Version 1.0 · Confidential · Hackathon Build
Prepared by
Problem Statement
Target
Tech Stack
Team UnionTrace — Hackathon Build
Tracking of Funds within Bank for Fraud Detection
Hackathon Prototype Submission
React · Node.js · Neo4j · Python ML · WebSockets

UNIONTRACE — Product Requirements Document
CONFIDENTIAL
1. Executive Summary
UNIONTRACE is an intelligent Fund Flow Tracking and Fraud Detection platform designed for commercial banks. It
maps end-to-end movement of funds across accounts, products, branches, and channels using graph analytics and
machine learning. The system enables compliance investigators to detect complex money-laundering typologies in
real time and generate evidence packages for regulatory reporting to India's Financial Intelligence Unit (FIU-IND).
2. Problem Statement
Banks process millions of daily transactions, making it nearly impossible for human investigators to manually trace
suspicious fund flows. Current rule-based systems generate excessive false positives and miss sophisticated layering
schemes. Key pain points:
• No end-to-end visualisation of how funds move between accounts, products, and branches
• Inability to detect circular transactions (round-tripping) and multi-hop layering in real time
• Manual STR/CTR filing that is slow, error-prone, and misses FIU-IND deadlines
• No behavioral baseline engine to flag profile mismatches between declared income and actual activity
• Dormant account reactivation for high-value transfers goes undetected for days
3. Goals & Objectives
3.1 Primary Goals
• Build a real-time fund flow graph that visualises transaction paths across all bank channels
• Detect 5 core fraud typologies: Round-Tripping, Rapid Layering, Structuring, Dormant Activation, Profile
Mismatch
• Reduce mean time to detect (MTTD) from 72 hours to under 5 minutes
• Auto-generate FIU-IND compliant Suspicious Transaction Reports (STRs)
3.2 Non-Goals (v1.0)
• Cross-bank transaction tracking (requires RBI data-sharing mandate)
• Mobile application for field investigators
• Integration with CIBIL / external credit bureaus
4. Target Users & Personas
Persona
Role
Primary Need
Fraud Investigator
Compliance Team
Trace complete fund journey
Key Pain Point
Too many false positives, slow tools
v1.0  ·  Team UnionTrace  ·  Hackathon 2025
Page 2
UNIONTRACE — Product Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 3
Persona Role Primary Need Key Pain Point
AML Analyst Risk & Compliance Detect typology patterns No graph view, manual correlation
Branch Manager Operations Monitor branch-level alerts No real-time visibility
FIU Reporting Officer Compliance File STRs on time Manual report preparation
CISO Security Audit trail & evidence Fragmented data across systems
5. User Stories
ID As a… I want to… Acceptance Criteria
US-01 Fraud Investigator See a graph of all accounts a flagged
transaction touched
Graph renders within 3s with node/edge labels and risk
scores
US-02 AML Analyst Replay a transaction sequence in
slow motion
Timeline slider replays fund movement with timestamps
US-03 Investigator Click an account node and see its full
profile
Side panel shows KYC, transaction history, risk score
US-04 Reporting Officer Auto-generate a pre-filled STR for
FIU-IND
STR exports in prescribed XML/PDF format with all
required fields
US-05 AML Analyst Filter alerts by fraud typology Dropdown filters to: Round-Trip, Layering, Structuring,
Dormant, Mismatch
US-06 Investigator Chat with an AI assistant to query
transaction data
Natural language query returns graph highlights within 5s
US-07 Branch Manager See a risk heatmap for my branch Choropleth branch map with drill-down to individual
accounts
US-08 CISO Export a complete evidence package ZIP export with graph PNG, raw tx logs, ML scores, STR
draft
6. Feature Requirements
ID Feature Priority MoSCoW Description
F-01 Real-Time Transaction Graph P0 Must Have Interactive graph showing fund flow using D3/Cytoscape
F-02 Fraud Typology Detection P0 Must Have ML models for 5 typologies
F-03 Alert Management Dashboard P0 Must Have Prioritised alert feed with risk scores and typology tags
F-04 AI Chat Investigator P0 Must Have Claude-powered NL interface to query transaction data
UNIONTRACE — Product Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 4
ID Feature Priority MoSCoW Description
F-05 Timeline Replay Mode P1 Should Have Scrub timeline to watch fund movement animate
step-by-step
F-06 FIU-IND STR Auto-Generator P0 Must Have One-click STR generation in RBI prescribed format
F-07 Evidence Package Export P1 Should Have ZIP bundle: graph, logs, ML scores, STR draft
F-08 Behavioral Baseline Engine P1 Should Have Customer's normal TX pattern vs. recent anomalous
activity
F-09 Risk Propagation Heatmap P1 Should Have Suspicion score spreads through network on flag
F-10 Dormant Account Radar P2 Could Have Radar chart of dormant accounts; pings on sudden
activation
F-11 3D Network Globe P2 Could Have Inter-branch fund flows on rotating 3D globe (Three.js)
F-12 Voice Alert System P2 Could Have Web Speech API announces critical alerts aloud
F-13 Investigator Collaboration Board P2 Could Have Multi-user notes, tags, case assignment on shared alerts
7. Fraud Typology Specifications
Typology Pattern Description Detection Signal Risk Weight
Round-Tripping Funds cycled back to origin through
2–10 hops
Circular graph path with <6 hr cycle
time
Critical (90–100)
Rapid Layering 18+ sub-threshold txns via 3+
intermediaries in <2 hrs
High velocity fan-out from single
source node
Critical (85–95)
Structuring Multiple txns just below 50,000
reporting limit
Clustering of amounts in
40K–49.9K band
High (70–85)
Dormant Activation Account inactive 180+ days
receives high-value transfer
Inactivity flag + delta > 5L Critical (85–90)
Profile Mismatch Volume inconsistent with declared
KYC profile
ML divergence score vs. segment
baseline > 3σ
High (65–80)
8. Non-Functional Requirements
8.1 Performance
• Graph rendering: < 3 seconds for graphs with up to 500 nodes
• Alert generation latency: < 10 seconds from transaction ingestion
• STR export: < 5 seconds
UNIONTRACE — Product Requirements Document
CONFIDENTIAL
• AI chat response: < 8 seconds for complex graph queries
8.2 Security
• All data encrypted in transit (TLS 1.3) and at rest (AES-256)
• Role-based access control (RBAC): Viewer, Analyst, Investigator, Admin
• Full audit log of all investigator actions
• PII masking in exported evidence packages
8.3 Compliance
• RBI Master Directions on KYC (2016, updated 2023)
• PMLA (Prevention of Money Laundering Act) reporting obligations
• FIU-IND STR/CTR format compliance
9. Success Metrics (KPIs)
Metric
Baseline (Current)
Mean Time to Detect (MTTD)
False Positive Rate
72 hours
~65%
Target (v1.0)
< 5 minutes
Measurement Method
Avg. time from transaction to alert
< 20%
Alerts dismissed as non-suspicious / total
STR Filing Time
Investigator Coverage
4–8 hours
1 case/day
< 30 minutes
Time from alert to submitted STR
10 cases/day
Fraud Detection Recall
Unknown
10. Assumptions & Constraints
> 85%
Cases resolved per investigator per day
Detected fraud / total fraud (test set)
10.1 Assumptions
• Transaction data is available via core banking API or Kafka stream
• Customer KYC data is accessible from the bank's master data store
• Graph database (Neo4j or Amazon Neptune) is available or can be containerised
10.2 Constraints
• Hackathon prototype uses synthetic/anonymised transaction data only
• No live integration with SWIFT or RTGS in v1.0 prototype
• Four-person dev team with 48-hour build window