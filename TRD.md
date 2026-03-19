TRD
UNIONTRACE
Technical Requirements Document
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
v1.0  ·  Team UnionTrace  ·  Hackathon 2025
Page 1
UNIONTRACE — Technical Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 2
1. System Architecture Overview
UNIONTRACE is built as a microservices-based web application. The frontend is a React SPA communicating over
WebSockets for real-time updates and REST for CRUD operations. The backend consists of independent services
for ingestion, ML inference, graph analytics, and reporting, orchestrated via a message broker (Apache Kafka).
1.1 High-Level Architecture
Layer Component Technology Responsibility
Frontend Dashboard SPA React 18 + Vite Graph visualisation, alert UI, AI chat
Frontend Graph Renderer D3.js / Cytoscape.js Interactive transaction network graph
Frontend 3D Globe Three.js Inter-branch geo visualisation
API Gateway REST + WS Gateway Node.js + Express +
Socket.io
Routes requests, auth, rate limiting
Service Transaction Ingestor Node.js + Kafka Consumer Real-time TX stream processing
Service ML Inference Engine Python + FastAPI Fraud typology scoring (5 models)
Service Graph Analytics Python + Neo4j Driver Circular path detection, centrality
Service Report Generator Node.js + PDFKit STR/CTR FIU-IND format export
Service AI Chat Service Node.js + Anthropic SDK Claude-powered NL query engine
Database Graph Store Neo4j Community 5.x Nodes: accounts, edges: transactions
Database Operational DB PostgreSQL 15 Alerts, cases, users, audit logs
Database Cache Redis 7 Sessions, real-time alert state
Infra Container Runtime Docker + Docker Compose Local dev and deployment
Infra Deployment Vercel (FE) + Railway (BE) Free-tier cloud deployment
2. Frontend Technical Specification
2.1 Tech Stack
• React 18 (functional components, hooks) + Vite 5
• D3.js v7 — transaction graph rendering
• Cytoscape.js — alternative graph engine for larger datasets
• Three.js r158 — 3D globe visualisation
• Recharts — ML score charts, bar charts
• Socket.io-client — real-time alert subscription
UNIONTRACE — Technical Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 3
• Tailwind CSS — utility-first styling
• Zustand — lightweight global state management
2.2 Application Routes
Route Component Description
/ Dashboard Main alert feed + live stats header
/graph/:caseId TransactionGraph Full-screen interactive graph for a case
/investigate/:alertId InvestigatePanel Split view: graph + trace + ML scores
/alerts AlertsTable Filterable, sortable alert management table
/reports ReportsPage STR/CTR generation and export history
/chat AIChat Claude-powered investigator chat interface
/settings Settings User preferences, RBAC, API keys
2.3 Key Frontend Components
Component Props / State Description
nodes[], edges[], onNodeClick D3 force-directed graph. Nodes coloured by risk. Edges animated by
suspicion level.
alerts[], onSelect Real-time WebSocket-fed list. Auto-scrolls on new critical alert.
steps[], caseId Step-by-step fund movement timeline with amount and flag badges.
scores{}, modelNames[] Radar chart + individual score cards for 6 ML models.
conversationHistory[] Claude API integrated chat. Sends graph context in system prompt.
transactions[], duration Scrub slider replays fund movement. Animates edge highlights.
caseId Packages graph PNG, logs, ML scores, STR draft into ZIP download.
3. Backend Services Specification
3.1 REST API Design
All REST endpoints are prefixed /api/v1. Authenticated via JWT Bearer tokens. WebSocket namespace: /ws/alerts.
Method Endpoint Description Auth
GET /api/v1/alerts List alerts with filters (typology, risk, date range) Analyst+
UNIONTRACE — Technical Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 4
Method Endpoint Description Auth
GET /api/v1/alerts/:id Full alert detail with embedded graph data Analyst+
PATCH /api/v1/alerts/:id Update alert status (open/investigating/closed) Investigator+
GET /api/v1/graph/:caseId Full graph: nodes, edges, ML scores for a case Analyst+
GET /api/v1/trace/:accountId Complete fund trace for an account Analyst+
POST /api/v1/reports/str Generate STR for a case, returns PDF URL Investigator+
GET /api/v1/reports/:id Download generated report file Investigator+
POST /api/v1/chat Send message to AI chat; returns streamed response Analyst+
GET /api/v1/accounts/:id Account profile, KYC, risk score, history Analyst+
WS /ws/alerts Subscribe to real-time alert stream Analyst+
3.2 Graph Database Schema (Neo4j)
Entity Type Key Properties
Account Node — :Account accountId, branchCode, type, riskScore, dormancyDays, kycProfile,
createdAt
Customer Node — :Customer customerId, name, segment, declaredIncome, riskCategory
Branch Node — :Branch branchCode, city, state, ifscPrefix
Transaction Relationship — :TRANSFERRED txId, amount, channel, timestamp, flagged, typology, hops
Owns Relationship — :OWNS since, verifiedKYC
3.3 Key Cypher Queries
// Detect circular transactions (round-tripping)
MATCH path = (a:Account)-[:TRANSFERRED*2..8]->(a)
WHERE ALL(r IN relationships(path)
WHERE r.timestamp > datetime() - duration('PT6H'))
RETURN path, [r IN relationships(path) | r.amount] AS amounts
// Find high-velocity fan-out (layering)
MATCH (src:Account)-[t:TRANSFERRED]->(dest:Account)
WHERE t.timestamp > datetime() - duration('PT2H')
WITH src, COUNT(dest) AS hops, SUM(t.amount) AS total
WHERE hops >= 5 AND total > 500000
RETURN src, hops, total ORDER BY total DESC
UNIONTRACE — Technical Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 5
// Structuring detection: sub-threshold clustering
MATCH (a:Account)-[t:TRANSFERRED]->(:Account)
WHERE t.amount BETWEEN 40000 AND 49999
AND t.timestamp > datetime() - duration('P7D')
WITH a, COUNT(t) AS txCount, SUM(t.amount) AS cumulative
WHERE txCount >= 5
RETURN a, txCount, cumulative
4. ML Inference Engine
4.1 Model Architecture
Model Algorithm Input Features Output Threshold
Graph Anomaly GNN — GraphSAGE Node embeddings, edge
weights, centrality
Anomaly prob 0–1 > 0.75 → flag
Velocity Scorer Isolation Forest + Rules Tx count/hr, amount variance,
channel diversity
Velocity score 0–100 > 70 → alert
Structuring DBSCAN + Histogram Tx amounts, time gaps,
destination diversity
Structuring prob 0–1 > 0.65 → flag
Dormancy Threshold + LSTM Days inactive, reactivation
amount, first-tx channel
Binary flag + severity 180d + > 5L
Profile Mismatch Z-score vs. baseline Tx volume, intl ratio, timing
pattern
Divergence score (σ) > 3σ → alert
Network Centrality PageRank + Betweenness Graph topology, connection
count, flow volume
Centrality percentile > 95th pct
4.2 ML Scoring API
POST /ml/score
{
"accountId": "ACC-0091",
"windowHours": 24,
"models": ["graph_anomaly", "velocity", "structuring"]
}
Response:
{
"compositeScore": 94,
"scores": {
UNIONTRACE — Technical Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 6
"graph_anomaly": { "score": 0.96, "label": "CRITICAL", "confidence": 0.91 },
"velocity": { "score": 89, "label": "HIGH", "patternMatch": "rapid_layering" },
"structuring": { "score": 0.72, "label": "HIGH", "txCount": 11 }
},
"typology": "ROUND_TRIPPING",
"evidenceNodes": ["ACC-0091", "ACC-0445", "ACC-0782"]
}
5. AI Chat Investigator — Claude Integration
5.1 Overview
The AI Chat service calls the Anthropic Claude API (claude-sonnet-4-20250514) with a structured system prompt that
includes live graph context, active alerts, and Neo4j schema. Investigators ask natural language questions and
receive graph-grounded answers.
5.2 System Prompt Template
You are UNIONTRACE AI, an expert financial fraud investigator assistant.
You have access to the current transaction graph context below.
ACTIVE CASE: {caseId}
ALERT TYPOLOGY: {typology}
FLAGGED ACCOUNTS: {accountList}
GRAPH SUMMARY: {nodeCount} nodes, {edgeCount} edges
RISK SCORE: {compositeScore}/100
GRAPH DATA (JSON):
{graphJson}
When answering:- Reference specific account IDs and transaction amounts- Suggest Cypher queries when data lookups are needed- Flag any additional suspicious patterns you notice- Keep responses concise and actionable for investigators
6. Real-Time Data Pipeline
UNIONTRACE — Technical Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 7
Step Component Action Latency
1 Kafka Consumer Consume raw TX event from core banking stream < 100ms
2 Validator Schema validation, deduplication, enrichment < 50ms
3 Neo4j Writer Upsert Account nodes, create TRANSFERRED edge < 200ms
4 ML Trigger Publish account IDs to ML scoring queue < 10ms
5 ML Engine Score transaction against 6 models < 2s
6 Alert Generator If score > threshold, create alert in PostgreSQL < 100ms
7 WebSocket Emitter Push alert to all subscribed frontend clients < 50ms
8 Total E2E From TX event to alert on screen < 5s
7. FIU-IND STR Report Generator
The auto-generated Suspicious Transaction Report maps system data to FIU-IND prescribed format (per PMLA
Rules 2005, Schedule):
STR Field Source in UNIONTRACE Notes
Reporting Entity Code System config Bank's FIU registration code
Principal Officer Name User config Compliance officer on record
Customer ID Account node: customerId From KYC master
Account Number Account node: accountId Masked for export
Transaction Date/Time TX edge: timestamp ISO 8601 format
Transaction Amount TX edge: amount INR, to 2 decimal places
Transaction Type TX edge: channel NEFT/RTGS/IMPS/SWIFT/Cash
Suspicious Activity Description ML Engine: typology + evidence Auto-generated narrative from ML scores
Supporting Documents Evidence package URL Graph PNG, logs, ML report ZIP
8. Deployment — Free Tier Stack
Service Platform Free Tier Limits Config
React Frontend Vercel Unlimited bandwidth, 100GB/mo vite build → vercel deploy
Node.js API Railway 500 hrs/mo, 512MB RAM Dockerfile + railway.toml
UNIONTRACE — Technical Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 8
Service Platform Free Tier Limits Config
ML Python Service Render 750 hrs/mo, 512MB RAM FastAPI + uvicorn
Neo4j Graph DB Neo4j AuraDB Free 200MB, 200K nodes AuraDB free instance
PostgreSQL Supabase Free 500MB, 50K rows Supabase project
Redis Cache Upstash Free 10K commands/day Upstash Redis REST
Kafka (Simulated) In-memory / EventEmitter Prototype only Replace with Confluent free for prod
8.1 Repository Structure
uniontrace/
 frontend/ # React + Vite SPA
  src/
   components/ # TransactionGraph, AlertFeed, etc.
   pages/ # Route-level page components
   stores/ # Zustand state stores
   services/ # API clients, WebSocket
  vite.config.js
 backend/ # Node.js API Gateway
  routes/ # REST route handlers
  services/ # Graph, Alert, Report services
  ws/ # WebSocket server
  server.js
 ml-engine/ # Python FastAPI ML service
  models/ # Trained model files (.pkl, .pt)
  detectors/ # One module per typology
  main.py
 data/ # Synthetic transaction datasets
 docker-compose.yml
 README.md
9. Security Specifications
Area Requirement Implementation
Authentication JWT + refresh tokens jsonwebtoken — 15min access / 7d refresh tokens
Authorisation RBAC (4 roles) Middleware checks role on every protected route
UNIONTRACE — Technical Requirements Document CONFIDENTIAL
v1.0  ·  Team UnionTrace  ·  Hackathon 2025 Page 9
Area Requirement Implementation
Data Encryption TLS 1.3 in transit Vercel + Railway enforce HTTPS by default
PII Handling Account numbers masked Last 4 digits shown; full number in secure export only
Audit Log All investigator actions logged PostgreSQL audit_log table, immutable append-only
Rate Limiting 100 req/min per user express-rate-limit middleware on all endpoints
Input Validation All inputs sanitised Joi schema validation on all API endpoints
10. Testing Strategy
Test Type Tool Coverage Target Focus Areas
Unit Tests Jest + Pytest ≥ 70% line coverage ML model logic, graph algorithms, API handlers
Integration Tests Supertest + Jest All API endpoints Auth, alert CRUD, STR generation
E2E Tests Playwright 5 critical user journeys Alert → investigate → generate STR flow
ML Model Tests Pytest + synthetic data All 5 typology detectors Precision ≥ 85%, Recall ≥ 80% per typology
Performance Tests k6 Graph render < 3s 500-node graph, 1000-edge dataset
11. Team Task Split
Member Responsibility Key Deliverables
Person 1 — Frontend Lead React dashboard, D3 graph, Three.js
globe
TransactionGraph, AlertFeed, TimelineReplay components
Person 2 — ML Engineer Python ML service, 5 fraud detectors,
model scoring
FastAPI /ml/score endpoint, model files, Cypher queries
Person 3 — Backend Lead Node.js API, Neo4j schema, WebSocket,
STR generator
All REST endpoints, graph DB setup, PDF export
Person 4 — AI + Deploy Claude API chat, frontend integration,
deployment
AIChat component, Vercel + Railway deploy, final demo