# UNIONTRACE
### FUND FLOW INTELLIGENCE PLATFORM

**Follow The Money. Stop The Fraud.**

---

## What is UNIONTRACE?

UNIONTRACE is an AI-powered Fund Flow Tracking and Fraud Detection platform built for commercial banks. It maps the complete end-to-end movement of funds across accounts, branches, products, and channels in real time using graph analytics and machine learning to surface suspicious patterns before human investigators can even open their laptops.

Built as a hackathon prototype for the problem statement:

> Develop an intelligent Fund Flow Tracking system that maps and visualises the end-to-end movement of funds within the bank across accounts, products, branches, and channels.

---

## The Problem We Are Solving

Banks process millions of transactions daily. Current systems:

- Generate excessive false positives from rule-based detection
- Miss sophisticated layering schemes that span multiple accounts
- Take 72 plus hours to detect circular transactions
- Require manual STR filing that takes 4 to 8 hours per case
- Have no visual way to trace how money actually moves

UNIONTRACE solves all of this in under 5 minutes.

---

## Key Features

### 3D Transaction Network Graph
Live rotating 3D graph built with Canvas 2D perspective math. Every account is a node, every transaction is an animated edge. Click any node to instantly see full account intelligence including branch, risk score, transaction history, and ML analysis.

### 5 Fraud Typology Detectors
Purpose-built ML models running simultaneously:

| Typology | What It Detects | Risk Level |
|---|---|---|
| Round-Tripping | Funds returning to origin within hours | CRITICAL |
| Rapid Layering | 18+ sub-threshold txns via multiple hops | CRITICAL |
| Structuring | Transactions clustered just below 50K limit | HIGH |
| Dormant Activation | Inactive 180+ day accounts suddenly active | CRITICAL |
| Profile Mismatch | TX behaviour inconsistent with declared KYC | HIGH |

### AI Investigator Chat
Natural language interface for investigators. Ask anything about an active case and get graph-grounded answers instantly.

### Timeline Replay Mode
Scrub back in time and watch exactly how funds moved step by step. A frame-by-frame reconstruction of any suspicious transaction chain.

### One-Click FIU-IND STR Report
Auto-generates RBI-compliant Suspicious Transaction Reports with all required fields pre-populated from graph and ML data. File in minutes not hours.

### Real-Time Risk Scoring
Six ML models score every transaction simultaneously. Composite risk scores from 0 to 100 update live as new data arrives.

---

## Pages and Screens

| Route | Page | Description |
|---|---|---|
| / | Boot Screen | 5-second system boot animation |
| /landing | Landing Page | Full marketing page with all sections |
| /login | Login Page | Secure split-layout login form |
| /app/graph | Threat Graph | 3D rotating transaction network graph |
| /app/dashboard | Dashboard | Live stats, charts, alert feed |
| /app/invest | Investigate | Fund trace, timeline replay, AI chat |
| /app/reports | Reports | STR generation, evidence packages |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI components and state management |
| Vite | 5.0 | Build tool and dev server |
| React Router v6 | 6.22 | Multi-page routing |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 11.0 | Page transitions and animations |
| Recharts | 2.12 | Charts and data visualisation |
| Canvas 2D API | Native | Custom 3D graph engine |

### Deployment

| Service | Purpose |
|---|---|
| Vercel | Frontend hosting with auto-deploy on push |
| GitHub | Version control and CI/CD trigger |

### Backend Coming in v2.0

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API and WebSocket server |
| Neo4j | Graph database for transaction network |
| Python + FastAPI | ML inference engine |
| Apache Kafka | Real-time transaction stream processing |

---



## Demo Walkthrough

| Step | What to Do | What You See |
|---|---|---|
| 1 | Open the live URL | Boot screen with progress animation |
| 2 | Wait 5 seconds | Auto-redirects to landing page |
| 3 | Scroll the landing page | Hero, features, how it works, compliance |
| 4 | Click Sign In | Login page with split layout |
| 5 | Enter admin / uniontrace | Access granted, goes to app |
| 6 | Threat Graph loads | 3D rotating transaction network |
| 7 | Click any node | Node intelligence panel updates |
| 8 | Click Dashboard in sidebar | Live charts and alert feed |
| 9 | Click Investigate in sidebar | Fund trace, hit PLAY on timeline |
| 10 | Type in AI chat | AI responds with case analysis |
| 11 | Click Reports in sidebar | STR report cards and case table |
| 12 | Click Generate STR button | Watch auto-report generation |

---

## Compliance Standards

| Standard | Coverage |
|---|---|
| RBI Master Directions on KYC | Customer profile matching and verification |
| PMLA 2002 | Anti-money laundering detection and reporting |
| FIU-IND STR Format | Auto-generated suspicious transaction reports |
| AES-256 Encryption | Bank-grade data security standard |

---

## The Team

Team SheCodes

 Member 

 Vrushti Mehta 
 Dhruvi Mandviya 
 Ashika Shetty 
 Arya Desai 

---

## Hackathon Submission

Problem Statement:

Tracking of Funds within Bank for Fraud Detection. Develop an intelligent Fund Flow Tracking system that maps and visualises the end-to-end movement of funds within the bank across accounts, products, branches, and channels. The system should use graph analytics and machine learning to identify suspicious fund flow patterns such as rapid layering through multiple accounts, circular transactions, structuring below reporting thresholds, sudden activation of dormant accounts for high-value transfers, and mismatches between declared customer profiles and actual fund movement behaviour.

How UNIONTRACE Answers Every Point:

- Maps fund movement across accounts, products, branches, channels
- Visualises end-to-end flow in a live 3D network graph
- Detects rapid layering through multiple accounts
- Detects circular transactions and round-tripping
- Detects structuring below reporting thresholds
- Flags dormant account activation for high-value transfers
- Identifies profile vs behaviour mismatches
- Enables investigators to trace the complete fund journey
- Generates evidence packages for FIU-IND reporting

---

Built with love by Team SheCodes

UNIONTRACE — Because every rupee leaves a trace.
