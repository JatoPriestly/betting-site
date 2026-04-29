// ============================================================
// DOCUMENT 3: SOLO DEVELOPER EXECUTION PLAN
// ============================================================
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, Header, Footer, AlignmentType, HeadingLevel, LevelFormat,
  BorderStyle, WidthType, ShadingType, PageBreak, TabStopType, PageNumberElement
} = require('docx');
const fs = require('fs');

const C = {
  navy:"0F3460", blue:"1C64A2", lblue:"5B9BD5", silver:"D6E4F2",
  green:"116E22", lgreen:"C6EFCE", red:"9C0006", lred:"FFC7CE",
  gold:"A37C00", lgold:"FFF2CC", orange:"C55A11", lorange:"FCE4D6",
  purple:"44308C", lpurple:"DCd5FF", gray:"595959", lgray:"F5F5F5",
  white:"FFFFFF", black:"141414", accent:"E8F0FA"
};
const bdr={style:BorderStyle.SINGLE,size:1,color:"CCCCCC"};
const borders={top:bdr,bottom:bdr,left:bdr,right:bdr};
const nob={style:BorderStyle.NONE,size:0,color:"FFFFFF"};
const noBorders={top:nob,bottom:nob,left:nob,right:nob};
const blank=()=>new Paragraph({spacing:{before:40,after:40},children:[new TextRun("")]});
const PB=()=>new Paragraph({children:[new PageBreak()]});
const run=(t,o={})=>new TextRun({text:t,font:"Arial",size:22,...o});
const H1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{before:400,after:120},
  border:{bottom:{style:BorderStyle.SINGLE,size:10,color:C.blue,space:4}},
  children:[run(t,{size:36,bold:true,color:C.navy})]});
const H2=t=>new Paragraph({heading:HeadingLevel.HEADING_2,spacing:{before:260,after:80},
  children:[run(t,{size:27,bold:true,color:C.blue})]});
const H3=t=>new Paragraph({heading:HeadingLevel.HEADING_3,spacing:{before:160,after:60},
  children:[run(t,{size:24,bold:true,color:C.gray})]});
const P=(t,o={})=>new Paragraph({spacing:{before:60,after:90},
  children:[run(t,{size:22,color:C.black,...o})]});
const B=(t,lv=0)=>new Paragraph({numbering:{reference:"bullets",level:lv},spacing:{before:36,after:36},
  children:[run(t,{size:22,color:C.black})]});
const N=(t,lv=0)=>new Paragraph({numbering:{reference:"numbers",level:lv},spacing:{before:36,after:36},
  children:[run(t,{size:22,color:C.black})]});

function tbl(headers,rows,cw,hdrFill=C.navy){
  return new Table({
    width:{size:9360,type:WidthType.DXA},columnWidths:cw,
    rows:[
      new TableRow({tableHeader:true,children:headers.map((h,i)=>new TableCell({
        borders,width:{size:cw[i],type:WidthType.DXA},
        shading:{fill:hdrFill,type:ShadingType.CLEAR},
        margins:{top:90,bottom:90,left:120,right:120},
        children:[new Paragraph({children:[run(h,{size:20,bold:true,color:C.white})]})]
      }))}),
      ...rows.map((row,ri)=>new TableRow({children:row.map((cell,ci)=>new TableCell({
        borders,width:{size:cw[ci],type:WidthType.DXA},
        shading:{fill:ri%2===0?C.white:"F0F5FB",type:ShadingType.CLEAR},
        margins:{top:80,bottom:80,left:120,right:120},
        children:[new Paragraph({children:[run(cell,{size:20,color:C.black})]})]
      }))}))
    ]
  });
}

function colorTbl(headers,rows,cw,rowColors){
  // rowColors: array of fill colors per row
  return new Table({
    width:{size:9360,type:WidthType.DXA},columnWidths:cw,
    rows:[
      new TableRow({tableHeader:true,children:headers.map((h,i)=>new TableCell({
        borders,width:{size:cw[i],type:WidthType.DXA},
        shading:{fill:C.navy,type:ShadingType.CLEAR},
        margins:{top:90,bottom:90,left:120,right:120},
        children:[new Paragraph({children:[run(h,{size:20,bold:true,color:C.white})]})]
      }))}),
      ...rows.map((row,ri)=>new TableRow({children:row.map((cell,ci)=>new TableCell({
        borders,width:{size:cw[ci],type:WidthType.DXA},
        shading:{fill:rowColors[ri]||C.white,type:ShadingType.CLEAR},
        margins:{top:80,bottom:80,left:120,right:120},
        children:[new Paragraph({children:[run(cell,{size:20,color:C.black})]})]
      }))}))
    ]
  });
}

function alert(emoji,title,body,bg,tc=C.black){
  const lines=body.split('\n');
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[9360],
    rows:[new TableRow({children:[new TableCell({
      borders:noBorders,shading:{fill:bg,type:ShadingType.CLEAR},
      margins:{top:130,bottom:130,left:200,right:200},
      children:[
        new Paragraph({spacing:{before:0,after:50},children:[run(`${emoji}  ${title}`,{size:22,bold:true,color:tc})]}),
        ...lines.map(l=>new Paragraph({spacing:{before:0,after:0},children:[run(l,{size:20,color:tc})]}))
      ]
    })]})]
  });
}

function imgBlock(path,wPx,hPx,caption){
  const data=fs.readFileSync(path);
  const maxW=5943600;
  const scale=Math.min(1,maxW/(wPx*9144));
  return[
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:120,after:60},
      children:[new ImageRun({data,type:"png",transformation:{
        width:Math.round(wPx*9144*scale/9144),
        height:Math.round(hPx*9144*scale/9144)
      }})]}),
    ...(caption?[new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:120},
      children:[run(caption,{size:18,italics:true,color:C.gray})]})]:[])
  ];
}

const hdr=()=>new Header({children:[new Paragraph({
  tabStops:[{type:TabStopType.RIGHT,position:9360}],
  border:{bottom:{style:BorderStyle.SINGLE,size:4,color:C.blue,space:4}},
  children:[
    run("WMATBS — Solo Developer Execution Plan",{size:18,color:C.gray}),
    run("\t",{size:18}),
    run("Internal | Confidential",{size:18,italics:true,color:C.gray})
  ]
})]});

const ftr=()=>new Footer({children:[new Paragraph({
  tabStops:[{type:TabStopType.RIGHT,position:9360}],
  border:{top:{style:BorderStyle.SINGLE,size:4,color:C.blue,space:4}},
  children:[
    run("Solo Developer Execution Plan — WMATBS | Proprietary",{size:16,color:C.gray}),
    run("\tPage ",{size:16,color:C.gray}),
    new TextRun({children:[new PageNumberElement()],font:"Arial",size:16,color:C.gray})
  ]
})]});

// ─────────────────────────────────────────────────────────────
// COVER
// ─────────────────────────────────────────────────────────────
function cover(){return[
  blank(),blank(),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:80},
    children:[run("SOLO DEVELOPER",{size:58,bold:true,color:C.navy})]}),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:60},
    border:{bottom:{style:BorderStyle.SINGLE,size:10,color:C.blue,space:8}},
    children:[run("Execution Plan — WMATBS Platform",{size:34,color:C.blue})]}),
  blank(),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:100},
    children:[run("14 Weeks | One Developer | Four Roles | Zero Excuses",
      {size:24,italics:true,color:C.gray})]}),
  blank(),blank(),
  new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[2808,6552],
    rows:[
      ...([
        ["Document Type","Executable Development Plan — Internal Working Document"],
        ["Author","Senior Developer (Acting PM, Architect, QA Lead, DevOps)"],
        ["Date","April 25, 2026"],
        ["Project","WhatsApp Multi-Agency Ticket Booking System (WMATBS)"],
        ["Duration","14 Weeks from Contract Signature"],
        ["Team Size","1 (Solo Senior Developer — Full Stack)"],
        ["Budget Reference","550,000 FCFA (see DOC2 — Commercial Proposal)"],
        ["SRS Reference","SRS v2.0 (see DOC1 — Software Requirements Specification)"],
        ["Classification","Internal | Confidential | Working Document"],
      ].map(([k,v],i)=>new TableRow({children:[
        new TableCell({borders,width:{size:2808,type:WidthType.DXA},
          shading:{fill:C.silver,type:ShadingType.CLEAR},
          margins:{top:80,bottom:80,left:120,right:120},
          children:[new Paragraph({children:[run(k,{size:20,bold:true,color:C.navy})]})]}),
        new TableCell({borders,width:{size:6552,type:WidthType.DXA},
          shading:{fill:i%2===0?C.white:"F0F5FB",type:ShadingType.CLEAR},
          margins:{top:80,bottom:80,left:120,right:120},
          children:[new Paragraph({children:[run(v,{size:20,color:C.black})]})]})
      ]})))
    ]
  }),
  blank(),
  alert("🔥","A NOTE FROM THE DEVELOPER",
    "The intern team is gone. The budget is tight. The client is waiting.\n"+
    "I am now the only person who can deliver this project.\n"+
    "This document is my personal execution plan — written with the precision of someone\n"+
    "who has no safety net and cannot afford to get this wrong.\n"+
    "Every week is planned. Every risk is named. Every deliverable is concrete.\n"+
    "This is not a wish list. This is a war plan.",
    "FCE4D6","9C0006"),
  PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 1: ROLES & RESPONSIBILITIES
// ─────────────────────────────────────────────────────────────
function roles(){return[
  H1("1. Roles & Responsibilities (All Mine)"),
  P("As the sole person on this project, I am wearing every hat simultaneously. This section documents what each role requires and how I will manage the workload."),
  blank(),
  tbl(["Role","What It Means In Practice","Time Allocation"],
    [
      ["Project Manager",
       "Client communication, scope management, milestone tracking, change requests, stakeholder updates, meeting facilitation",
       "~10% weekly"],
      ["Solutions Architect",
       "Technology decisions, system design, DB schema, API contracts, security architecture, infrastructure planning",
       "~15% (heavy in Weeks 1–3)"],
      ["Full-Stack Developer",
       "All backend (Node.js/Express/PostgreSQL/Redis), all frontend (React agency portal + admin dashboard), bot engine, payment integration, notification services",
       "~55% weekly"],
      ["QA Engineer",
       "Unit tests, integration tests, bot flow tests, load testing, UAT coordination, bug triage and resolution",
       "~15% weekly"],
      ["DevOps Engineer",
       "AWS infrastructure setup, CI/CD pipeline, Docker configuration, monitoring setup, production deployment, SSL/DNS management",
       "~5% (heavy in Weeks 1–2 and Week 14)"],
    ],
    [1800,5160,2400]
  ),
  blank(),
  alert("⚠️","Workload Reality Check",
    "14 weeks × 5 days × 8 hours = 560 working hours total.\n"+
    "This is aggressive but achievable for a senior developer who knows the stack.\n"+
    "The key discipline: NO CONTEXT SWITCHING mid-task. Each day has a defined focus (see Section 3).\n"+
    "Client meetings are batched to Tuesdays. All communication is async-first to protect coding blocks.\n"+
    "I will not apologise for protecting my deep work time — it is the only way to deliver on schedule.",
    C.accent,C.navy),
  blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 2: TECHNICAL DECISIONS LOG
// ─────────────────────────────────────────────────────────────
function techDecisions(){return[
  H1("2. Technical Decisions Log"),
  P("Every decision that would block development if left undecided is made here, upfront, before a single line of code is written. This is architectural discipline."),
  blank(),
  tbl(["Decision","Choice Made","Rationale","Decided By","Date"],
    [
      ["Backend runtime","Node.js 20 LTS + Express 5","Async I/O, WA SDK support, familiar","Senior Dev","Apr 25 2026"],
      ["WhatsApp integration","Meta Cloud API (shared WABA)","No on-premise ops; auto-scaling","Senior Dev","Apr 25 2026"],
      ["Primary database","PostgreSQL 16 on AWS RDS","ACID, RLS, multi-tenancy, JSON","Senior Dev","Apr 25 2026"],
      ["Session/cache/holds","Redis 7 on AWS ElastiCache","Sub-ms seat locks, TTL expiry","Senior Dev","Apr 25 2026"],
      ["Agency portal frontend","React 18 + TypeScript + Tailwind","Type safety, fast dev, responsive","Senior Dev","Apr 25 2026"],
      ["Authentication","JWT (15min/7d) + TOTP MFA","Stateless, revocable, offline TOTP","Senior Dev","Apr 25 2026"],
      ["Payment gateway","Flutterwave primary, CinetPay backup","FCFA, MoMo, cards, PCI-DSS","Senior Dev","Apr 25 2026"],
      ["Cloud provider","AWS eu-west-3 (Paris)","Lowest latency to Cameroon, RDS","Senior Dev","Apr 25 2026"],
      ["File storage","AWS S3 + pre-signed URLs","Cheap, durable, secure delivery","Senior Dev","Apr 25 2026"],
      ["CI/CD pipeline","GitHub Actions + Docker Compose","Automated tests on every push","Senior Dev","Apr 25 2026"],
      ["Monitoring","UptimeRobot + Sentry","Uptime alerts + error tracking","Senior Dev","Apr 25 2026"],
      ["SMS fallback","Africa's Talking","Best Cameroon SMS coverage","Senior Dev","Apr 25 2026"],
      ["Seat hold mechanism","Redis SETNX with 600s TTL","Atomic, guaranteed exclusive lock","Senior Dev","Apr 25 2026"],
      ["Bot state persistence","Redis HASH per phone number","Fast R/W; auto-expiry on timeout","Senior Dev","Apr 25 2026"],
      ["Multi-tenancy isolation","PostgreSQL Row Level Security + app middleware","Defense in depth","Senior Dev","Apr 25 2026"],
    ],
    [2000,2000,2600,1400,1360]
  ),
  blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 3: WEEK-BY-WEEK EXECUTION PLAN
// ─────────────────────────────────────────────────────────────
function weeklyPlan(){
  const weeks=[
    {w:"Week 1",focus:"Infrastructure, WABA, Project Scaffolding",phase:"Phase 0",
     tasks:[
       "Monday: Register AWS account; provision EC2, RDS PostgreSQL, ElastiCache Redis, S3. Configure VPC and security groups.",
       "Tuesday: Set up GitHub repo; create Docker Compose dev environment; configure GitHub Actions CI pipeline with lint + test stages.",
       "Wednesday: Begin Meta WABA registration; submit first batch of WhatsApp template messages for approval. Create developer Meta app.",
       "Thursday: Design full PostgreSQL database schema (all 10 entities + relationships + RLS policies). Write and execute migrations.",
       "Friday: Scaffold Node.js/Express API with folder structure, auth middleware skeleton, health-check endpoint, env config system.",
     ],
     deliverable:"AWS running; DB schema migrated; API scaffold deployed to staging; WABA submitted",
     risk:"Meta WABA approval can take 3–5 days. Submitted Week 1, expected by Week 2 end."},

    {w:"Week 2",focus:"API Core, Auth Service, WABA Webhook",phase:"Phase 0→1",
     tasks:[
       "Monday: Build JWT auth service: register, login, refresh token rotation, MFA (TOTP) setup and verification endpoints.",
       "Tuesday: Build RBAC middleware: agency_id scoping on all agency-facing routes; admin bypass; role validation.",
       "Wednesday: Implement WhatsApp Cloud API webhook receiver: message parsing, delivery status handling, error queue.",
       "Thursday: Build Redis session service: HASH-based conversation state, TTL management, seat hold SETNX locking.",
       "Friday: Write unit tests for auth, RBAC, and webhook parser. First passing CI pipeline with >60% coverage.",
     ],
     deliverable:"Auth service complete; RBAC enforced; WA webhook receiving messages; Redis session live",
     risk:"TOTP MFA library compatibility — test with multiple authenticator apps (Google, Authy, Microsoft)."},

    {w:"Week 3",focus:"Bot State Machine Core",phase:"Phase 1",
     tasks:[
       "Monday: Implement state machine router: maps inbound WA message + current state → next handler function.",
       "Tuesday: Build IDLE → MAIN_MENU → SEARCHING states with all error branches (unexpected input, session timeout).",
       "Wednesday: Build SEARCHING → TRIP_LIST state: city lookup, fuzzy matching, date parsing, agency/route query.",
       "Thursday: Build WA message formatters: List Messages for trip results, Reply Buttons for confirmations.",
       "Friday: Integration test: send real WhatsApp messages to staging bot and trace full state transitions. Fix bugs.",
     ],
     deliverable:"Bot responds on WA; handles search flow; graceful error handling at every state",
     risk:"WhatsApp list message formatting is strict — test on Android, iOS, and WhatsApp Web."},

    {w:"Week 4",focus:"Seat Map, Hold, Booking Summary",phase:"Phase 1→2",
     tasks:[
       "Monday: Build seat availability service: query DB for schedule seats, filter booked, filter held (Redis), format display.",
       "Tuesday: Implement seat selection handler: validate seat is available, write Redis SETNX hold (600s TTL), transition state.",
       "Wednesday: Build race condition handler: if seat grabbed between display and selection, refresh seat map and re-display.",
       "Thursday: Build booking summary formatter and BOOKING_SUMMARY state with Confirm/Cancel reply buttons.",
       "Friday: End-to-end bot flow test: search → trip select → seat select → hold → summary. All branches covered.",
     ],
     deliverable:"Full booking flow without payment working end-to-end in staging. Seat hold proven atomic.",
     risk:"Redis SETNX race condition — load test with 50 concurrent users selecting same seat simultaneously."},

    {w:"Week 5",focus:"Payment Integration + Bot MVP",phase:"Phase 2",
     tasks:[
       "Monday: Integrate Flutterwave API: initiate payment, generate payment link, handle webhook callback.",
       "Tuesday: Implement idempotency key system for payment requests. Build payment status polling fallback.",
       "Wednesday: Build PNR generator (format: TKT-YYYYMMDD-NNNN, sequential, collision-safe). Generate ticket image using canvas/sharp.",
       "Thursday: Wire payment success → create Booking record → mark seat permanently → send PNR + ticket to passenger.",
       "Friday: Full end-to-end test including real Flutterwave test payment. Milestone M2 demo to client (bot MVP).",
     ],
     deliverable:"MILESTONE M2 — Full booking flow with real payment tested. PNR and ticket delivered via WA.",
     risk:"Flutterwave webhook delivery can be delayed — implement webhook retry + polling fallback."},

    {w:"Week 6",focus:"Agency Portal — Auth, Dashboard, Fleet",phase:"Phase 3",
     tasks:[
       "Monday: Create React 18 + TypeScript + Tailwind project. Configure API proxy, auth context, protected routes.",
       "Tuesday: Build login page with TOTP MFA flow. Implement JWT refresh rotation on frontend. Session timeout handling.",
       "Wednesday: Build portal dashboard: KPI cards (total trips today, seats sold, revenue), active trip list with occupancy bars.",
       "Thursday: Build Fleet Management page: bus list, Add Bus form, Edit Bus modal, Deactivate confirmation.",
       "Friday: Build seat configuration panel: visual grid of seats, toggle online/walk-in per seat, save to API.",
     ],
     deliverable:"Agency portal login, dashboard, fleet management, and seat config working in staging",
     risk:"React state management complexity — use Zustand or React Query; avoid Redux for solo dev speed."},

    {w:"Week 7",focus:"Agency Portal — Routes, Schedules, Bookings",phase:"Phase 3",
     tasks:[
       "Monday: Build Route Management: route list, add route (origin/destination/price), edit, deactivate.",
       "Tuesday: Build Schedule Management: schedule list filtered by bus and route, add schedule (date/time/bus assignment).",
       "Wednesday: Build Booking Management page: searchable/filterable table of all bookings for this agency, PNR lookup.",
       "Thursday: Build real-time seat occupancy view per schedule: seat grid showing CONFIRMED/HELD/AVAILABLE/WALKIN.",
       "Friday: Build broadcast message feature: select schedule, write message, send WA template to all booked passengers.",
     ],
     deliverable:"Full agency portal CRUD for routes, schedules, and booking management. Broadcast messaging live.",
     risk:"Real-time occupancy requires WebSocket or polling — use 10-second polling for v1.0 simplicity."},

    {w:"Week 8",focus:"Agency Portal — Reports + Payment Go-Live",phase:"Phase 2→3",
     tasks:[
       "Monday: Build CSV export endpoint (bookings by date range). Build PDF report generation (pdfkit or puppeteer).",
       "Tuesday: Build cancellation/refund policy configuration UI: set window hours, refund percentage brackets.",
       "Wednesday: Switch payment gateway from Flutterwave test mode to live mode. Verify FCFA currency handling.",
       "Thursday: Full payment regression test in staging with live gateway credentials. Test all failure scenarios.",
       "Friday: MILESTONE M3 — Client demo of payment live + agency portal beta. Collect feedback.",
     ],
     deliverable:"MILESTONE M3 — Payment live in staging. Agency portal 90% complete. Client demo done.",
     risk:"Live gateway credentials take 2–3 business days to activate — request in Week 6."},

    {w:"Week 9",focus:"Admin Dashboard",phase:"Phase 4",
     tasks:[
       "Monday: Build admin auth: separate admin role, admin-only route guard, admin MFA enforcement.",
       "Tuesday: Build admin dashboard: platform KPIs (all agencies, total bookings, total revenue, active passengers).",
       "Wednesday: Build agency management: list all agencies, view agency detail, activate/suspend agency, create operator.",
       "Thursday: Build audit log viewer: paginated, filterable log of all system events with actor/timestamp/delta display.",
       "Friday: Build platform config panel: seat hold duration, OTP expiry, session timeout — editable by admin.",
     ],
     deliverable:"Full admin dashboard: platform analytics, agency management, audit log, platform config.",
     risk:"Audit log can grow large fast — implement cursor-based pagination from day one."},

    {w:"Week 10",focus:"Notifications, Reminders, SMS Fallback",phase:"Phase 5",
     tasks:[
       "Monday: Build notification service: abstract interface with WhatsApp, SMS (Africa's Talking), and email adapters.",
       "Tuesday: Build scheduled reminder job: query upcoming departures within 25 hours, send 24h WA reminder template.",
       "Wednesday: Build 1-hour reminder job. Configure cron scheduler (node-cron or Bull queue with Redis).",
       "Thursday: Implement SMS fallback: if WA 'delivered' status not received within 5 minutes, send SMS.",
       "Friday: Test all notification paths: 24h reminder, 1h reminder, SMS fallback, booking confirmation, cancellation.",
     ],
     deliverable:"All notifications working: WA reminders (24h+1h), SMS fallback, booking + cancel confirmations.",
     risk:"Africa's Talking requires Cameroon phone number verification — register in Week 8."},

    {w:"Week 11",focus:"Security Hardening + Portal Beta Sign-Off",phase:"Phase 6",
     tasks:[
       "Monday: Implement rate limiting: express-rate-limit on all endpoints; custom WA bot throttle (30 msg/min/number).",
       "Tuesday: Audit all API endpoints: ensure every route has auth + RBAC check. No unprotected endpoints.",
       "Wednesday: Run OWASP ZAP automated scan against staging. Triage and fix all CRITICAL and HIGH findings.",
       "Thursday: External pen test (if budget allows) OR manual testing: SQL injection, XSS, IDOR, auth bypass.",
       "Friday: MILESTONE M4 — Agency portal + admin dashboard beta delivered. Client begins UAT.",
     ],
     deliverable:"MILESTONE M4 — Security hardened. All portals in staging for client UAT. Test report produced.",
     risk:"OWASP findings can open unexpected work — allocate 2 days buffer in Week 12 for remediation."},

    {w:"Week 12",focus:"UAT Round 1 + Bug Fixes",phase:"Phase 7",
     tasks:[
       "Monday: Conduct UAT kickoff with client and agency operators. Provide test credentials and UAT script.",
       "Tuesday–Wednesday: Monitor UAT, answer questions, log all bugs found (GitHub Issues with severity labels).",
       "Thursday: Bug fix sprint: prioritise CRITICAL → HIGH → MEDIUM. Aim to clear all CRITICAL in this week.",
       "Friday: Re-deploy fixes to staging. Verify all CRITICAL bugs resolved. Run regression suite.",
     ],
     deliverable:"UAT Round 1 complete. All CRITICAL bugs fixed and verified. Issue tracker updated.",
     risk:"Clients find unexpected bugs during UAT. Buffer: 3 days of HIGH bug fixes allocated to Week 13."},

    {w:"Week 13",focus:"UAT Round 2 + Final Fixes + Documentation",phase:"Phase 7",
     tasks:[
       "Monday: UAT Round 2: client re-tests all CRITICAL-fixed areas + remaining HIGH items.",
       "Tuesday: Fix remaining HIGH and MEDIUM bugs. Final regression suite run with 0 critical failures required.",
       "Wednesday: Write API documentation (Swagger/OpenAPI). Write agency portal user manual (PDF).",
       "Thursday: Write system admin manual. Write deployment runbook (how to re-deploy, scale, backup, restore).",
       "Friday: MILESTONE M5 — Written UAT sign-off from client. All documentation submitted.",
     ],
     deliverable:"MILESTONE M5 — UAT signed off. All docs complete: API docs, user manuals, runbook.",
     risk:"Client may be slow to provide written sign-off — chase daily from Wednesday of Week 13."},

    {w:"Week 14",focus:"Production Deployment + Handover + Training",phase:"Phase 8",
     tasks:[
       "Monday: Provision production AWS environment (separate from staging). Run all migrations. Configure monitoring.",
       "Tuesday: Deploy all services to production. Configure domain, SSL (Let's Encrypt), CloudFront CDN. Smoke test.",
       "Wednesday: Switch WABA webhook to production URL. Test with real WhatsApp number. Verify payment gateway live.",
       "Thursday: Client training session: agency portal walkthrough with operators, admin dashboard walkthrough with client.",
       "Friday: MILESTONE M6 — Go-Live. Hand over all credentials, source code, documentation. Final invoice issued.",
     ],
     deliverable:"MILESTONE M6 — WMATBS live in production. All credentials and code handed over. Project complete.",
     risk:"DNS propagation can take 24–48 hours — initiate DNS changes Tuesday to be live Thursday."},
  ];

  const items=[
    H1("3. Week-by-Week Execution Plan"),
    P("This is my personal task breakdown for each of the 14 weeks. Written with the clarity of someone who cannot afford ambiguity."),
    blank(),
    ...imgBlock('/home/claude/project/charts/05_gantt.png',1100,640,"Figure 5 — 14-Week Solo Developer Gantt Chart"),
    blank(),
  ];

  for(const wk of weeks){
    items.push(
      new Paragraph({spacing:{before:260,after:80},
        border:{left:{style:BorderStyle.SINGLE,size:12,color:C.blue,space:8}},
        children:[
          run(`${wk.w} — `,{size:26,bold:true,color:C.navy}),
          run(wk.focus,{size:26,bold:false,color:C.blue}),
          run(`  [${wk.phase}]`,{size:22,italics:true,color:C.gray})
        ]
      })
    );
    for(const t of wk.tasks) items.push(B(t));
    items.push(blank());
    items.push(new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[4680,4680],
      rows:[new TableRow({children:[
        new TableCell({borders,width:{size:4680,type:WidthType.DXA},
          shading:{fill:C.lgreen,type:ShadingType.CLEAR},
          margins:{top:80,bottom:80,left:120,right:120},
          children:[
            new Paragraph({children:[run("✅  WEEK DELIVERABLE",{size:19,bold:true,color:C.green})]}),
            new Paragraph({children:[run(wk.deliverable,{size:19,color:C.black})]})
          ]}),
        new TableCell({borders,width:{size:4680,type:WidthType.DXA},
          shading:{fill:C.lred,type:ShadingType.CLEAR},
          margins:{top:80,bottom:80,left:120,right:120},
          children:[
            new Paragraph({children:[run("⚠️  KEY RISK",{size:19,bold:true,color:C.red})]}),
            new Paragraph({children:[run(wk.risk,{size:19,color:C.black})]})
          ]})
      ]})]
    }));
    items.push(blank());
  }
  items.push(PB());
  return items;
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: DAILY SCHEDULE TEMPLATE
// ─────────────────────────────────────────────────────────────
function dailySchedule(){return[
  H1("4. Daily Working Schedule Template"),
  P("A solo developer who does not protect their deep work time will burn out or drift. This is my non-negotiable daily structure for all 14 weeks. Exceptions require a conscious decision, not a default."),
  blank(),
  tbl(["Time Block","Activity","Notes"],
    [
      ["06:30 – 07:00","Morning review: check overnight WA messages, Sentry alerts, CI status","5 min max. Do not deep-dive — flag for later."],
      ["07:00 – 07:30","Plan today's 3 concrete outputs. Write them in the daily log.","If you cannot name 3 outputs, you have no plan."],
      ["07:30 – 10:30","DEEP WORK BLOCK 1 — Core development. Phone on silent. No email.","Most important task of the day. Guard ferociously."],
      ["10:30 – 10:45","Break — walk, coffee, no screens.","Cognitive reset. Non-negotiable."],
      ["10:45 – 13:00","DEEP WORK BLOCK 2 — Continue core task or second priority task.","Second most complex work of the day."],
      ["13:00 – 13:45","Lunch. No laptop.","Rest is part of the delivery plan."],
      ["13:45 – 15:00","Testing, code review, bug fixes, PR writing.","Verify what was built in the morning."],
      ["15:00 – 16:00 (Tue only)","Client/stakeholder communication: emails, calls, updates.","All async comms batched to Tuesday afternoon."],
      ["15:00 – 16:00 (other days)","Documentation, technical notes, architecture decisions log.","Write while context is fresh."],
      ["16:00 – 17:30","DEEP WORK BLOCK 3 — Next day prep: write failing tests before coding.","Test-first mindset for next morning's block."],
      ["17:30 – 18:00","End-of-day log: what was completed, what is blocked, next steps.","Takes 15 minutes. Saves 2 hours of confusion tomorrow."],
    ],
    [2200,3560,3600]
  ),
  blank(),
  alert("📌","The Three Rules of Solo Delivery",
    "Rule 1: Ship something every day. A commit, a test passing, a design decision logged. Never go to bed with zero output.\n"+
    "Rule 2: Name your blockers immediately. If something is blocked, escalate in writing within the same day. Do not sit on blockers.\n"+
    "Rule 3: Never touch production on a Friday. Deploy on Tuesday or Wednesday only. Weekends are not support windows.",
    C.accent,C.navy),
  blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 5: RISK REGISTER
// ─────────────────────────────────────────────────────────────
function riskRegister(){return[
  H1("5. Risk Register"),
  P("Every risk I can foresee is named here with its probability, impact, and mitigation plan. An unplanned risk is a crisis. A planned risk is a decision."),
  blank(),
  colorTbl(
    ["#","Risk","Prob.","Impact","Score","Mitigation","Owner"],
    [
      ["R01","Meta WABA approval delayed beyond Week 2","HIGH","CRITICAL","12","Submit all templates in Week 1. Build bot with mock WA adapter to continue development while waiting.","Dev"],
      ["R02","Payment gateway live credentials delayed","MED","HIGH","6","Request live creds in Week 6. Implement CinetPay as backup. Test gateway switch via abstraction layer.","Dev + Client"],
      ["R03","Client slow to provide UAT feedback","HIGH","HIGH","9","Define UAT schedule in contract. Daily chase emails from Week 12. Escalate in writing if >3 days silent.","Dev"],
      ["R04","Scope creep — client requests new features mid-development","HIGH","MED","6","All changes via written Change Request. No implementation without signed CR. Price changes attached.","Dev + Client"],
      ["R05","AWS service outage","LOW","HIGH","3","Multi-AZ RDS. Redis Cluster mode. Auto-scaling group for EC2. Staging environment tested for failover.","Dev"],
      ["R06","Redis seat hold race condition","MED","CRITICAL","9","Use Redis SETNX (atomic). Load test with 50 concurrent users selecting same seat. Proven in Week 4.","Dev"],
      ["R07","Security vulnerability discovered post-launch","LOW","CRITICAL","6","Pen test in Week 11. OWASP ZAP scan. 30-day warranty covers dev-caused bugs. Patch SLA: 24h critical.","Dev"],
      ["R08","Solo developer falls ill or is unavailable","LOW","CRITICAL","6","Daily code commits to GitHub. Full documentation as I go. Runbook written in Week 13 for handover.","Dev"],
      ["R09","WhatsApp template messages rejected by Meta","MED","HIGH","6","Submit 2x more templates than needed. Have fallback template wording ready. Appeal process documented.","Dev"],
      ["R10","PostgreSQL query performance degrades at scale","LOW","MED","2","Index all foreign keys and query columns in Week 1 schema. Run EXPLAIN ANALYZE in load test.","Dev"],
      ["R11","Flutterwave FCFA support issue or fee change","LOW","HIGH","3","CinetPay as contractual backup. Payment abstraction layer allows gateway swap with minimal code change.","Dev"],
      ["R12","Client disputes deliverable scope post-delivery","MED","HIGH","6","SRS v2.0 is the contractual scope baseline. All sign-offs documented. Change requests in writing only.","Dev + Client"],
    ],
    [350,2800,700,800,700,2960,1050],
    [
      "FFC7CE","FFC7CE","FCE4D6","FCE4D6","FFC7CE",
      "FCE4D6","FFC7CE","FCE4D6","FCE4D6","FFF2CC","FFF2CC","FCE4D6"
    ]
  ),
  blank(),
  P("Risk Score = Probability (High=3, Med=2, Low=1) × Impact (Critical=4, High=3, Med=2, Low=1). Score ≥8 = RED. Score 4–7 = AMBER. Score <4 = GREEN.",
    {italics:true,size:19,color:C.gray}),
  blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 6: API CONTRACT OVERVIEW
// ─────────────────────────────────────────────────────────────
function apiOverview(){return[
  H1("6. API Contract Overview"),
  P("All services communicate through a versioned REST API (/api/v1/). Below is the contract overview. Full OpenAPI spec will be generated using Swagger in Week 13."),
  blank(),
  H2("6.1 Authentication Endpoints"),
  tbl(["Method","Endpoint","Auth","Description"],
    [
      ["POST","/api/v1/auth/register","Public","Create operator account (admin-initiated)"],
      ["POST","/api/v1/auth/login","Public","Email + password → JWT access + refresh"],
      ["POST","/api/v1/auth/mfa/verify","JWT","Verify TOTP code; complete MFA login"],
      ["POST","/api/v1/auth/refresh","Refresh token","Rotate access token"],
      ["POST","/api/v1/auth/logout","JWT","Invalidate refresh token (Redis blacklist)"],
    ],
    [800,2800,1200,4560]
  ),blank(),
  H2("6.2 Agency Management Endpoints"),
  tbl(["Method","Endpoint","Auth","Description"],
    [
      ["GET","/api/v1/agencies","Admin","List all agencies with status"],
      ["POST","/api/v1/agencies","Admin","Create new agency + operator account"],
      ["PATCH","/api/v1/agencies/:id/status","Admin","Activate / suspend agency"],
      ["GET","/api/v1/agencies/:id/buses","Operator","List buses for own agency"],
      ["POST","/api/v1/agencies/:id/buses","Operator","Add bus to fleet"],
      ["PATCH","/api/v1/buses/:id","Operator","Edit bus details"],
      ["GET","/api/v1/buses/:id/seats","Operator","Get seat config for bus"],
      ["PUT","/api/v1/buses/:id/seats","Operator","Update online-bookable seat config"],
    ],
    [800,2800,1200,4560]
  ),blank(),
  H2("6.3 Routes, Schedules & Bookings"),
  tbl(["Method","Endpoint","Auth","Description"],
    [
      ["GET","/api/v1/routes?origin=&dest=&date=","Public","Search trips (bot uses this)"],
      ["POST","/api/v1/routes","Operator","Create route"],
      ["POST","/api/v1/schedules","Operator","Create schedule"],
      ["GET","/api/v1/schedules/:id/seats","Public","Get real-time seat availability"],
      ["POST","/api/v1/bookings","System (bot)","Create booking + acquire seat hold"],
      ["GET","/api/v1/bookings/:pnr","Passenger/Op","Get booking by PNR"],
      ["POST","/api/v1/bookings/:id/cancel","Passenger","Cancel booking"],
      ["GET","/api/v1/agencies/:id/bookings","Operator","Get all bookings for agency"],
    ],
    [800,2800,1200,4560]
  ),blank(),
  H2("6.4 Payment & Bot Webhook Endpoints"),
  tbl(["Method","Endpoint","Auth","Description"],
    [
      ["POST","/api/v1/payments/initiate","System (bot)","Generate payment link; store idempotency key"],
      ["POST","/api/v1/payments/webhook","Gateway sig","Flutterwave/CinetPay payment callback"],
      ["POST","/api/v1/wa/webhook","Meta sig","Inbound WhatsApp message handler"],
      ["GET","/api/v1/wa/webhook","Meta verify","WhatsApp webhook verification (GET challenge)"],
      ["GET","/api/v1/health","Public","System health check for monitoring"],
    ],
    [800,2800,1200,4560]
  ),blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 7: DEFINITION OF DONE
// ─────────────────────────────────────────────────────────────
function dod(){return[
  H1("7. Definition of Done"),
  P("A feature is not done when the code is written. A feature is done when all of the following criteria are met. No exceptions."),
  blank(),
  tbl(["#","Criterion","Applies To"],
    [
      ["1","Code is committed to GitHub main branch via reviewed Pull Request","All features"],
      ["2","Unit tests written and passing (coverage maintained at >80%)","All service functions"],
      ["3","Integration tests cover the happy path and at least 2 error paths","All API endpoints"],
      ["4","Bot flow tested manually by sending real WhatsApp messages to staging","All bot states"],
      ["5","No CRITICAL or HIGH security findings in OWASP ZAP scan","Security-sensitive endpoints"],
      ["6","Feature documented in the relevant section of the developer wiki","All features"],
      ["7","API endpoint documented with request/response examples in Swagger","All API endpoints"],
      ["8","Performance verified: response time within NFR targets under load","Core booking paths"],
      ["9","Cross-browser tested: Chrome, Firefox, Edge (agency portal)","Portal UI features"],
      ["10","Client/operator has reviewed and approved the feature in UAT","All P1 requirements"],
    ],
    [480,5880,3000]
  ),
  blank(),
  alert("🎯","Non-Negotiable Quality Gates",
    "These gates apply to every milestone demo and to the final go-live:\n"+
    "• 0 CRITICAL bugs open in the issue tracker\n"+
    "• CI pipeline green (all tests passing)\n"+
    "• Load test results within NFR targets (NFR-P01 through NFR-P04)\n"+
    "• UAT sign-off signed by client representative\n"+
    "• All P1 requirements from SRS v2.0 verified and ticked off\n"+
    "A milestone is not delivered until every gate is passed. No exceptions. No 'we can fix it after go-live.'",
    C.lgreen,C.green),
  blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 8: COMMUNICATION PLAN
// ─────────────────────────────────────────────────────────────
function commsPlan(){return[
  H1("8. Communication Plan"),
  P("Communication is the biggest risk on a solo project with a client who has expectations. This plan defines exactly who gets what, when, and how."),
  blank(),
  tbl(["Communication","Frequency","Format","Audience","Owner"],
    [
      ["Weekly Status Report","Every Tuesday EOD","Email + PDF summary","Client + stakeholders","Dev"],
      ["Milestone Demo","End of each milestone week","Video call (30 min max)","Client rep + agency ops","Dev"],
      ["Bug/Issue Log","Updated daily","GitHub Issues (shared link)","Client (read access)","Dev"],
      ["Blocker Escalation","Same day as blocker identified","Email (flagged URGENT)","Client decision-maker","Dev"],
      ["Change Request","As needed","Formal CR document (Word)","Client + Dev","Dev"],
      ["UAT Kickoff","Start of Week 12","Video call (1 hour)","Client + agency ops","Dev"],
      ["UAT Daily Log","During UAT (Weeks 12–13)","Shared Google Sheet","Client + Dev","Both"],
      ["Go-Live Announcement","Week 14","Client-drafted (Dev reviews)","End users / agencies","Client"],
    ],
    [2200,1600,2000,2000,1560]
  ),
  blank(),
  alert("📧","Async-First Communication Policy",
    "All non-urgent communication is handled asynchronously (email, Slack, WhatsApp).\n"+
    "Calls are scheduled in advance with a written agenda. No unscheduled calls.\n"+
    "Response time SLA for the developer: critical issues within 4 hours; standard queries within 24 hours.\n"+
    "This policy protects the deep work blocks in Section 4 and is the reason this project can be delivered on time by one person.",
    C.accent,C.navy),
  blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 9: POST-LAUNCH PLAN
// ─────────────────────────────────────────────────────────────
function postLaunch(){return[
  H1("9. Post-Launch Plan"),
  H2("9.1 30-Day Warranty Period"),
  B("All bugs that are the developer's responsibility (not client modifications) will be fixed within the warranty period at no charge."),
  B("Bug response SLA: CRITICAL = 4 hours; HIGH = 24 hours; MEDIUM = 72 hours; LOW = next sprint."),
  B("Warranty does not cover: new feature requests, client-introduced bugs, or third-party API outages (Flutterwave, Meta)."),
  blank(),
  H2("9.2 Handover Package Contents"),
  tbl(["Item","Format","Delivered When"],
    [
      ["Full source code (backend + frontend)","Private GitHub repo — client becomes owner","Day of go-live"],
      ["Database schema + migration files","SQL files in repo + documentation","Day of go-live"],
      ["AWS infrastructure credentials","Secure password manager transfer","Day of go-live"],
      ["API documentation (Swagger/OpenAPI)","Hosted on staging + PDF export","Week 13"],
      ["Agency portal user manual","PDF — step-by-step with screenshots","Week 13"],
      ["System admin manual","PDF — all admin functions documented","Week 13"],
      ["Deployment runbook","Markdown in GitHub repo","Week 13"],
      ["WhatsApp template message library","Meta Business Manager access transferred","Day of go-live"],
      ["Payment gateway credentials","Flutterwave dashboard access transferred","Day of go-live"],
      ["Monitoring dashboards","UptimeRobot + Sentry accounts transferred","Day of go-live"],
    ],
    [3200,2800,3360]
  ),
  blank(),
  H2("9.3 Post-Warranty Maintenance Options"),
  tbl(["Option","Description","Monthly Cost (FCFA)"],
    [
      ["Basic Monitoring","UptimeRobot + Sentry review; monthly status report; no code changes","25,000"],
      ["Standard Maintenance","Bug fixes (HIGH+), dependency updates, security patches, monthly report","75,000"],
      ["Full Retainer","Above + new feature development (up to 20 hours/month), priority support","150,000"],
      ["Equity Partner Model","Developer active as technical co-founder; no monthly fee; equity instead","Negotiable"],
    ],
    [2000,5160,2200]
  ),
  blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// SECTION 10: SUCCESS METRICS
// ─────────────────────────────────────────────────────────────
function successMetrics(){return[
  H1("10. Success Metrics — How We Know This Worked"),
  P("The project is not just successful when it goes live. It is successful when it achieves the outcomes the client hired us to achieve. These are the metrics we will track."),
  blank(),
  H2("10.1 Technical Success Metrics (Measured at Go-Live)"),
  tbl(["Metric","Target","Measurement Method"],
    [
      ["System uptime","≥ 99.5%","UptimeRobot — first 30 days post-launch"],
      ["Bot response time","< 2s at 500 concurrent users","k6 load test — run before go-live"],
      ["Payment success rate","≥ 95% of initiated payments","Gateway dashboard — first 30 days"],
      ["Seat double-booking incidents","0","Audit log + booking DB check"],
      ["Security vulnerabilities (CRITICAL)","0 open at launch","Pen test report sign-off"],
      ["Test coverage","≥ 80% on all service modules","Jest coverage report"],
    ],
    [2800,2000,4560]
  ),
  blank(),
  H2("10.2 Business Success Metrics (Measured at 90 Days Post-Launch)"),
  tbl(["Metric","Target (90 days)","Why It Matters"],
    [
      ["Agencies onboarded","≥ 10 active agencies","Platform viability threshold"],
      ["Bookings completed via bot","≥ 500 confirmed bookings","Passenger adoption proof"],
      ["Booking conversion rate","≥ 60% (search → confirmed)","Bot UX quality indicator"],
      ["Agency operator NPS","≥ 7/10","Portal usability signal"],
      ["Passenger repeat booking rate","≥ 30%","Platform stickiness / trust"],
      ["Average booking time","< 4 minutes (search to PNR)","UX efficiency benchmark"],
    ],
    [2800,2000,4560]
  ),
  blank(),
  alert("📊","Revenue Projection — For Equity Conversation",
    "At 3% commission per booking, 10 agencies, 50 bookings/day average, 5,000 FCFA average ticket:\n"+
    "Daily revenue: 10 × 50 × 5,000 × 3% = 75,000 FCFA/day\n"+
    "Monthly revenue: 75,000 × 30 = 2,250,000 FCFA/month\n"+
    "Annual (Year 1 conservative): ~27,000,000 FCFA\n"+
    "At 50 agencies (Year 2): ~135,000,000 FCFA/year\n"+
    "A 15% equity stake at this scale represents 20,250,000 FCFA/year in passive revenue.\n"+
    "This is why the equity option is commercially compelling for the developer.",
    C.lgreen,C.green),
  blank(),PB()
];}

// ─────────────────────────────────────────────────────────────
// FINAL SIGN-OFF
// ─────────────────────────────────────────────────────────────
function signOff(){return[
  H1("11. Developer Commitment & Sign-Off"),
  blank(),
  new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[9360],
    rows:[new TableRow({children:[new TableCell({
      borders:{top:bdr,bottom:bdr,left:{style:BorderStyle.SINGLE,size:8,color:C.navy},right:bdr},
      shading:{fill:C.accent,type:ShadingType.CLEAR},
      margins:{top:200,bottom:200,left:300,right:300},
      children:[
        new Paragraph({spacing:{before:0,after:80},children:[
          run("DEVELOPER STATEMENT",{size:26,bold:true,color:C.navy})
        ]}),
        new Paragraph({spacing:{before:0,after:60},children:[
          run("I am one person. The intern team is gone. The budget is what it is. I have been handed a project that needs four professionals and given a one-man budget.",
            {size:22,color:C.black})
        ]}),
        new Paragraph({spacing:{before:0,after:60},children:[
          run("I have reviewed the v1.0 SRS. I have identified every gap. I have filled every gap. I have made every architectural decision. I have written the execution plan, the risk register, the API contracts, the testing strategy, and the delivery milestones — all of it — before writing a single line of application code.",
            {size:22,color:C.black})
        ]}),
        new Paragraph({spacing:{before:0,after:60},children:[
          run("This is what a senior professional does when the team disappears: they do not complain about the situation. They document the situation with precision, build the plan with discipline, and execute with the confidence that comes from knowing exactly what needs to be done.",
            {size:22,color:C.black})
        ]}),
        new Paragraph({spacing:{before:0,after:80},children:[
          run("I commit to delivering WMATBS within 14 weeks to the standard defined in SRS v2.0, at the agreed price, with the quality gates defined in Section 7 of this document. Not because it is easy. Because it is what was agreed. And I keep my agreements.",
            {size:22,bold:true,color:C.navy})
        ]}),
        new Paragraph({spacing:{before:60,after:0},children:[
          run("Senior Developer — Acting Project Manager, Architect, QA Lead & DevOps",
            {size:20,italics:true,color:C.gray})
        ]}),
        new Paragraph({spacing:{before:20,after:0},children:[
          run("Signature: _________________________  Date: _____________",{size:22,color:C.black})
        ]}),
      ]
    })]})],
  }),
  blank(),blank(),
  tbl(["Document","File Name","Purpose"],
    [
      ["DOC1","DOC1_SRS_WMATBS_v2.0_Senior_Dev_Review.docx","Full Software Requirements Specification with story, flowcharts, and PM review"],
      ["DOC2","DOC2_Commercial_Proposal_FCFA_WMATBS.docx","Commercial proposal with FCFA pricing, equity options, milestone payments"],
      ["DOC3","DOC3_Solo_Dev_Execution_Plan_WMATBS.docx","This document — 14-week plan, risks, API contracts, DoD, comms plan"],
    ],
    [800,4360,4200]
  ),
  blank(),
  P("These three documents together constitute the complete project initiation package for WMATBS. No development begins until DOC2 is signed.",
    {italics:true,color:C.gray})
];}

// ─────────────────────────────────────────────────────────────
// ASSEMBLE & WRITE
// ─────────────────────────────────────────────────────────────
const doc=new Document({
  styles:{
    default:{document:{run:{font:"Arial",size:22}}},
    paragraphStyles:[
      {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,
       run:{size:36,bold:true,font:"Arial",color:C.navy},
       paragraph:{spacing:{before:400,after:120},outlineLevel:0}},
      {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,
       run:{size:27,bold:true,font:"Arial",color:C.blue},
       paragraph:{spacing:{before:260,after:80},outlineLevel:1}},
      {id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,
       run:{size:24,bold:true,font:"Arial",color:C.gray},
       paragraph:{spacing:{before:160,after:60},outlineLevel:2}},
    ]
  },
  numbering:{config:[
    {reference:"bullets",levels:[{level:0,format:LevelFormat.BULLET,text:"\u2022",
      alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:720,hanging:360}},run:{font:"Arial"}}}]},
    {reference:"numbers",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",
      alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:720,hanging:360}},run:{font:"Arial"}}}]},
  ]},
  sections:[{
    properties:{page:{size:{width:12240,height:15840},
      margin:{top:1440,right:1296,bottom:1440,left:1296}}},
    headers:{default:hdr()},
    footers:{default:ftr()},
    children:[
      ...cover(),
      ...roles(),
      ...techDecisions(),
      ...weeklyPlan(),
      ...dailySchedule(),
      ...riskRegister(),
      ...apiOverview(),
      ...dod(),
      ...commsPlan(),
      ...postLaunch(),
      ...successMetrics(),
      ...signOff(),
    ]
  }]
});

Packer.toBuffer(doc).then(buf=>{
  fs.writeFileSync("/mnt/user-data/outputs/DOC3_Solo_Dev_Execution_Plan_WMATBS.docx",buf);
  console.log("DOC3 written.");
});