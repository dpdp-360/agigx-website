// ═══════════════════════════════════════════
//  DPDPA COMPLIANCE AUDIT — MODAL ENGINE
//  Persistence: localStorage
//  Key: dpdpa_audit_v1
// ═══════════════════════════════════════════

const STORAGE_KEY = "dpdpa_audit_v1";

// ─── Data ───────────────────────────────────
const DOMAINS = [
  { id: "consent", label: "Consent & Notice", icon: "📋", color: "#2e7dd4" },
  {
    id: "rights",
    label: "Data Principal Rights",
    icon: "⚖️",
    color: "#5fa3e8",
  },
  {
    id: "minimise",
    label: "Data Minimisation & Retention",
    icon: "🗄️",
    color: "#1a5ca8",
  },
  {
    id: "security",
    label: "Data Security & Breach",
    icon: "🔒",
    color: "#e8324a",
  },
  {
    id: "vendors",
    label: "Vendors & Third Parties",
    icon: "🤝",
    color: "#f0a030",
  },
  {
    id: "governance",
    label: "Governance & Readiness",
    icon: "🏛️",
    color: "#1db87a",
  },
];

const QUESTIONS = [
  // ── 01 Consent & Notice ──
  {
    domain: 0,
    qNum: 1,
    text: 'When you collect personal data, do users give a clear, specific, voluntary "yes" — not buried in fine print or pre-ticked boxes?',
    lawRef: "DPDPA 2023 — Section 6(1)",
    lawDesc:
      "Every collection of personal data requires free, specific, informed and unambiguous consent. Pre-ticked boxes or compelled consent are explicitly invalid.",
    penalty: "₹250 Crore",
    evidence: [
      "Opt-in checkbox is present at point of collection",
      "Checkbox is not pre-ticked by default",
      "Purpose of collection is clearly stated",
      "Consent is obtained separately from Terms & Conditions",
      "Language is plain and understandable",
    ],
    action:
      "Draft a consent notice that names each data type and purpose separately. Implement an explicit opt-in at every data collection touchpoint.",
  },
  {
    domain: 0,
    qNum: 2,
    text: "Does your consent notice name each type of personal data and each specific purpose separately — not one single blanket statement?",
    lawRef: "DPDPA 2023 — Section 6(2)",
    lawDesc:
      "Consent must be granular. A single omnibus consent covering all data types and all purposes does not meet the legal standard under DPDPA.",
    penalty: "₹200 Crore",
    evidence: [
      "Each data category is listed individually",
      "Each purpose has its own consent item",
      "No omnibus language",
      "Users can consent selectively to different purposes",
    ],
    action:
      "Break down your consent notice into itemised sections — one consent item per data type and per processing purpose.",
  },
  {
    domain: 0,
    qNum: 3,
    text: "Can users withdraw consent in as few steps as they gave it — and does your system actually stop processing their data upon withdrawal?",
    lawRef: "DPDPA 2023 — Section 6(4)",
    lawDesc:
      "Withdrawal must be as easy as giving consent. Upon withdrawal, the Data Fiduciary must cease all processing and delete data unless another legal basis applies.",
    penalty: "₹150 Crore",
    evidence: [
      "Withdrawal mechanism accessible in account settings",
      "Process involves no more steps than giving consent",
      "Automated pipeline stops processing within SLA",
      "Confirmation sent to user upon withdrawal",
    ],
    action:
      "Build a self-service consent dashboard. Automate data suppression triggers that fire immediately on withdrawal.",
  },
  // ── 02 Data Principal Rights ──
  {
    domain: 1,
    qNum: 4,
    text: "Can a user request to see, correct, or delete their personal data — and do you have a documented, time-bound process to respond?",
    lawRef: "DPDPA 2023 — Sections 11, 12, 13",
    lawDesc:
      "Data principals have statutory rights to access, correction, and erasure. Failure to respond within a reasonable period is a direct penalty-triggering violation.",
    penalty: "₹250 Crore",
    evidence: [
      "Documented SOP for access, correction, and erasure requests",
      "Defined response timeline (recommended: 30 days)",
      "Designated team handles requests",
      "Audit trail maintained",
    ],
    action:
      "Create a data subject rights request workflow. Appoint a handler. Set and publish your response timeline.",
  },
  {
    domain: 1,
    qNum: 5,
    text: "Is there a named person or dedicated inbox for data-related complaints — and are they resolved within a published timeline?",
    lawRef: "DPDPA 2023 — Section 13(3)",
    lawDesc:
      "DPDPA mandates a readily accessible grievance mechanism. A named or identifiable point of contact for complaints is an explicit requirement.",
    penalty: "₹100 Crore",
    evidence: [
      "Grievance officer named in privacy policy",
      "Contact details published on website",
      "Response SLA defined and published",
      "Escalation process documented",
    ],
    action:
      "Appoint a Grievance Officer and publish their contact in your Privacy Policy. Define and communicate resolution timelines.",
  },
  {
    domain: 1,
    qNum: 6,
    text: "Have you assessed whether you process children's data — and if yes, do you have verifiable parental consent processes in place?",
    lawRef: "DPDPA 2023 — Section 9",
    lawDesc:
      "Processing children's data without verifiable parental consent attracts one of the highest penalties — up to ₹200 Crore.",
    penalty: "₹200 Crore",
    evidence: [
      "Age verification mechanism at registration",
      "Process for verifiable parental consent",
      "No behavioural targeting of children",
      "Children's data stored separately",
    ],
    action:
      "Map all data flows to identify if minors may be registering. Implement age gates and parental consent workflows.",
  },
  // ── 03 Data Minimisation & Retention ──
  {
    domain: 2,
    qNum: 7,
    text: 'Do you collect only the personal data you actually need for your stated purpose — nothing extra, nothing collected "just in case"?',
    lawRef: "DPDPA 2023 — Section 6(1) read with Section 8(3)",
    lawDesc:
      "Data minimisation is foundational — you may only collect what is necessary for the specific, stated purpose.",
    penalty: "₹100 Crore",
    evidence: [
      "Data collection fields mapped to specific business purposes",
      "No fields collected 'for future use'",
      "Regular review of forms and API payloads",
      "Privacy by design principles applied",
    ],
    action:
      "Audit every data collection touchpoint. Remove any field that cannot be directly mapped to a documented, active purpose.",
  },
  {
    domain: 2,
    qNum: 8,
    text: "Do you have a retention schedule — is personal data automatically deleted once the purpose it was collected for is fulfilled?",
    lawRef: "DPDPA 2023 — Section 8(7)",
    lawDesc:
      "Data must be erased as soon as the purpose is fulfilled or consent is withdrawn. Indefinite retention is a direct violation.",
    penalty: "₹150 Crore",
    evidence: [
      "Documented retention schedule for each data category",
      "Automated deletion or anonymisation pipeline",
      "Retention periods communicated in privacy policy",
      "Legal holds process documented",
    ],
    action:
      "Build a retention matrix mapping each data category to its period. Automate deletion jobs and test quarterly.",
  },
  {
    domain: 2,
    qNum: 9,
    text: "Do you have a live inventory of what personal data you hold, where it lives, who can access it, and when it gets deleted?",
    lawRef: "DPDPA 2023 — Section 8(5)",
    lawDesc:
      "Without a data inventory, you cannot demonstrate compliance, respond to rights requests, or manage breach notification.",
    penalty: "₹250 Crore",
    evidence: [
      "Data inventory / data map maintained",
      "Each data store documented with owner, purpose, retention",
      "Access controls documented per data store",
      "Inventory reviewed annually",
    ],
    action:
      "Conduct a data discovery exercise. Build and maintain a data register covering all systems, databases, and third-party tools.",
  },
  // ── 04 Data Security & Breach ──
  {
    domain: 3,
    qNum: 10,
    text: "Are your technical and organisational security measures documented — encryption, access controls, audit logs — not just assumed to exist?",
    lawRef: "DPDPA 2023 — Section 8(5)",
    lawDesc:
      'Failure to implement and document reasonable security safeguards attracts up to ₹250 Crore. "We have security" is not a defence.',
    penalty: "₹250 Crore",
    evidence: [
      "Encryption at rest and in transit documented",
      "Access control policy with role-based permissions",
      "Audit logs retained for 12 months+",
      "Penetration testing conducted",
      "Security reviewed annually",
    ],
    action:
      "Document your security architecture. Conduct a gap assessment against ISO 27001 or NIST CSF.",
  },
  {
    domain: 3,
    qNum: 11,
    text: "If a breach happened tonight, could you notify the Data Protection Board AND every affected individual without delay — with a detailed report within 72 hours?",
    lawRef: "DPDPA 2023 — Section 8(6)",
    lawDesc:
      "All breaches must be reported to the Data Protection Board without delay. An undocumented response plan compounds liability.",
    penalty: "₹200 Crore",
    evidence: [
      "Incident response plan documented and tested",
      "DPB notification template prepared",
      "Individual notification template prepared",
      "Response team roles defined",
      "Communication channel available within 72 hours",
    ],
    action:
      "Draft and test an incident response runbook. Simulate a breach tabletop exercise.",
  },
  {
    domain: 3,
    qNum: 12,
    text: "Have you assessed whether your organisation may be designated a Significant Data Fiduciary — and are you prepared for the heightened obligations this brings?",
    lawRef: "DPDPA 2023 — Section 10",
    lawDesc:
      "Organisations notified as SDFs face mandatory DPIAs, annual audits, a mandatory DPO, and algorithmic accountability.",
    penalty: "₹250 Crore",
    evidence: [
      "Volume and sensitivity of data assessed",
      "National security implications assessed",
      "DPIA methodology identified",
      "DPO candidate identified",
      "Annual audit readiness assessed",
    ],
    action:
      "Perform a self-assessment against SDF criteria. If material risk of notification exists, begin DPIA and DPO readiness now.",
  },
  // ── 05 Vendors & Third Parties ──
  {
    domain: 4,
    qNum: 13,
    text: "Do your contracts with vendors who process personal data on your behalf contain Data Processing Agreement clauses with explicit obligations and liability?",
    lawRef: "DPDPA 2023 — Section 8(2)",
    lawDesc:
      "As Data Fiduciary, you are liable for your processors' compliance failures. Missing DPAs create unmanaged downstream exposure.",
    penalty: "₹250 Crore",
    evidence: [
      "DPA clauses in all vendor contracts involving personal data",
      "Processor obligations mirror DPDPA obligations",
      "Right to audit clause included",
      "Subprocessor restrictions defined",
      "Breach notification passed through to vendors",
    ],
    action:
      "Conduct a vendor contract audit. Add DPA schedules to all contracts. Prioritise high-risk processors first.",
  },
  {
    domain: 4,
    qNum: 14,
    text: "Have you identified every third party that touches personal data — payroll, CRM, cloud, analytics, HR, marketing, and support tools?",
    lawRef: "DPDPA 2023 — Section 8(2)",
    lawDesc:
      "Unidentified processors represent unmanaged risk. DPDPA liability flows back regardless of where a breach occurs.",
    penalty: "₹150 Crore",
    evidence: [
      "Processor inventory / vendor register maintained",
      "Each vendor assessed for type and volume of data shared",
      "Privacy posture of each processor assessed",
      "Register updated at new vendor onboarding",
    ],
    action:
      "Map every system used and identify which receive personal data. Build a processor register.",
  },
  {
    domain: 4,
    qNum: 15,
    text: "If personal data crosses India's borders — to cloud servers, group entities, or international customers — have you assessed whether that transfer is permissible under DPDPA?",
    lawRef: "DPDPA 2023 — Section 16",
    lawDesc:
      "Cross-border transfers to restricted or un-notified countries are prohibited. Unassessed transfers create significant ongoing regulatory exposure.",
    penalty: "₹250 Crore",
    evidence: [
      "All data flows crossing Indian borders identified",
      "Permissibility of each destination assessed",
      "Contractual safeguards documented",
      "Cloud provider data residency assessed",
      "Transfer impact assessment conducted",
    ],
    action:
      "Map all cross-border data flows. Assess each destination against DPDPA transfer provisions.",
  },
  // ── 06 Governance & Readiness ──
  {
    domain: 5,
    qNum: 16,
    text: "Is there a named person — whether an internal DPO, Legal lead, or external advisor — who owns DPDPA compliance and is accountable for it?",
    lawRef: "DPDPA 2023 — Section 10(2)(b) [SDF] / General obligation",
    lawDesc:
      "Compliance without ownership is compliance in name only. For SDFs, a DPO is mandatory.",
    penalty: "₹100 Crore",
    evidence: [
      "Named compliance owner with defined mandate",
      "Scope of responsibility documented",
      "Access to Board / management reporting channel",
      "Adequate budget and resources allocated",
    ],
    action:
      "Designate a DPDPA compliance lead. Document their mandate. For SDFs, appoint or retain a qualified DPO.",
  },
  {
    domain: 5,
    qNum: 17,
    text: "Have your Legal, IT, HR, and Operations teams each been briefed on what DPDPA means for their specific function — not just a general awareness email?",
    lawRef: "DPDPA 2023 — Section 8(1)",
    lawDesc:
      "DPDPA obligations touch every department that collects, processes, or stores data. Awareness gaps become enforcement gaps.",
    penalty: "₹100 Crore",
    evidence: [
      "Function-specific training delivered to Legal, IT, HR, Ops",
      "Training records maintained",
      "Refresher training schedule in place",
      "Privacy embedded in product/project lifecycle",
    ],
    action:
      "Design and deliver function-specific DPDPA training. Document completion. Schedule annual refreshers.",
  },
  {
    domain: 5,
    qNum: 18,
    text: "Is your privacy policy updated to reflect DPDPA 2023 and the Rules notified in November 2025 — not an old GDPR-modelled or generic template?",
    lawRef: "DPDPA 2023 — Section 5 & Rules (Nov 2025)",
    lawDesc:
      "GDPR-modelled policies that omit DPDPA-specific requirements are non-compliant on their face.",
    penalty: "₹150 Crore",
    evidence: [
      "Privacy policy references DPDPA 2023 explicitly",
      "Consent notice format compliant with Section 5",
      "Grievance officer details included",
      "Data principal rights described",
      "Policy reviewed post-November 2025 Rules",
    ],
    action:
      "Commission a privacy policy review against the November 2025 Rules. Replace GDPR-template language with DPDPA-specific provisions.",
  },
];

// ─── State ───────────────────────────────────
let answers = new Array(QUESTIONS.length).fill(null);
let current = 0;
let chartInstance = null;
let isNewSession = true;
let isCompleted = false;
let resultsChartInstance = null;

// ─── Helpers ─────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function scoreFromAnswer(a) {
  if (a === null) return 0;
  if (a === 0) return 0;
  if (a === 1) return 50;
  return 100;
}
function sliderToAnswer(val) {
  const v = parseInt(val);
  if (v <= 33) return 0;
  if (v <= 66) return 1;
  return 2;
}
function answerToSlider(a) {
  if (a === null) return 50;
  if (a === 0) return 16;
  if (a === 1) return 50;
  return 84;
}

// ─── Persistence ─────────────────────────────
function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, current, isCompleted }),
    );
  } catch (e) {
    /* storage unavailable */
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (
      Array.isArray(data.answers) &&
      data.answers.length === QUESTIONS.length
    ) {
      answers = data.answers;
      current = typeof data.current === "number" ? data.current : 0;
      isCompleted = data.isCompleted === true;
      return true;
    }
  } catch (e) {
    /* ignore */
  }
  return false;
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  answers = new Array(QUESTIONS.length).fill(null);
  current = 0;
  isCompleted = false;
}

// ─── Inject gate modal DOM ────────────────────
function ensureGateDOM() {
  if (document.getElementById("gate-overlay")) return;
  const el = document.createElement("div");
  el.innerHTML = `
  <div id="gate-overlay" aria-hidden="true">
    <div id="gate-modal" role="dialog" aria-modal="true" aria-label="Start Compliance Audit">
      <button class="gate-close-btn" id="gate-close-btn" aria-label="Close">✕</button>
      <div class="gate-badge">Free · 18 Questions · ~4 mins</div>
      <div class="gate-icon">🛡️</div>
      <h2 class="gate-title">DPDPA 2023 Compliance Audit</h2>
      <p class="gate-subtitle">Understand your organisation's readiness against India's Digital Personal Data Protection Act — before enforcement begins in May 2027.</p>
      <div class="gate-checklist">
        <div class="gate-check-item"><span class="gate-check-icon">✓</span><span>6 compliance domains covered</span></div>
        <div class="gate-check-item"><span class="gate-check-icon">✓</span><span>Penalty exposure calculated per gap</span></div>
        <div class="gate-check-item"><span class="gate-check-icon">✓</span><span>Downloadable PDF report at the end</span></div>
        <div class="gate-check-item"><span class="gate-check-icon">✓</span><span>Progress saved automatically</span></div>
      </div>
      <button class="gate-start-btn" id="gate-start-btn">I'm Ready — Start Audit <span class="gate-arrow">→</span></button>
      <p class="gate-disclaimer">For indicative purposes only. Does not constitute legal advice.</p>
    </div>
  </div>`;
  document.body.appendChild(el.firstElementChild);

  document
    .getElementById("gate-close-btn")
    .addEventListener("click", closeGate);
  document.getElementById("gate-start-btn").addEventListener("click", () => {
    closeGate();
    openQuizModal();
  });
  document.getElementById("gate-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("gate-overlay")) closeGate();
  });
}

function openGate() {
  ensureGateDOM();
  const overlay = document.getElementById("gate-overlay");
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeGate() {
  const overlay = document.getElementById("gate-overlay");
  if (!overlay) return;
  overlay.setAttribute("aria-hidden", "true");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ─── Inject results modal DOM ─────────────────
function ensureResultsModalDOM() {
  if (document.getElementById("results-overlay")) return;
  const el = document.createElement("div");
  el.innerHTML = `
  <div id="results-overlay" aria-hidden="true">
    <div id="results-modal" role="dialog" aria-modal="true" aria-label="Compliance Audit Results">
      <div class="results-modal-header">
        <div class="results-modal-brand">AGI<span>Gx</span> <span class="results-modal-sep">|</span> <span class="results-modal-label">Audit Results</span></div>
        <div class="results-modal-actions">
          <button class="rm-btn-pdf" id="rm-btn-pdf">⬇ Download PDF</button>
          <button class="rm-btn-reset" id="rm-btn-reset">↺ Retake</button>
          <button class="rm-close-btn" id="rm-close-btn" aria-label="Close results">✕</button>
        </div>
      </div>
      <div class="results-modal-body">
        <!-- Score hero -->
        <section class="rm-hero">
          <div class="rm-hero-inner">
            <div class="rm-ring-wrap">
              <div class="rm-ring-container">
                <svg class="rm-ring-svg" viewBox="0 0 180 180" style="transform:rotate(-90deg)">
                  <circle class="score-ring-bg" cx="90" cy="90" r="80"/>
                  <circle class="rm-ring-fill" id="rm-ring-fill" cx="90" cy="90" r="80"
                    stroke="#2e7dd4" stroke-dasharray="502" stroke-dashoffset="502"/>
                </svg>
                <div class="score-center">
                  <span class="score-number" id="rm-score-number">0%</span>
                  <span class="score-sub">Compliance Score</span>
                </div>
              </div>
              <div class="stats-row">
                <div class="stat-card"><div class="stat-card-value green" id="rm-stat-controls">0</div><div class="stat-card-label">In Place</div></div>
                <div class="stat-card"><div class="stat-card-value amber" id="rm-stat-partial">0</div><div class="stat-card-label">Partial</div></div>
                <div class="stat-card"><div class="stat-card-value red" id="rm-stat-gaps">0</div><div class="stat-card-label">Gaps</div></div>
              </div>
            </div>
            <div class="score-verdict">
              <div class="verdict-badge" id="rm-verdict-badge">Calculating…</div>
              <h2 class="verdict-title" id="rm-verdict-title"></h2>
              <p class="verdict-desc" id="rm-verdict-desc"></p>
            </div>
          </div>
        </section>
        <!-- Grid -->
        <div class="rm-grid">
          <div class="radar-card">
            <div class="section-label">Domain Breakdown</div>
            <canvas id="rm-radar-canvas" width="380" height="300"></canvas>
          </div>
          <div class="exposure-card">
            <div class="section-label">Penalty Exposure by Domain</div>
            <div class="exposure-total">
              <div class="exposure-total-label">Total Estimated Exposure</div>
              <div class="exposure-total-value" id="rm-exposure-total-value">₹— Cr</div>
            </div>
            <div id="rm-exposure-rows"></div>
          </div>
        </div>
        <!-- Findings -->
        <div class="findings-section" style="padding:0 40px;margin-top:28px;">
          <div class="section-label">Detailed Findings — Sorted by Penalty Exposure</div>
          <div id="rm-findings-list"></div>
        </div>
        <!-- CTA -->
        <div class="results-cta" style="margin:32px 40px 0;border-radius:14px;">
          <div class="results-cta-inner">
            <h2 class="results-cta-title">Your gaps are mapped.<br/><span>Now automate the fix.</span></h2>
            <p class="results-cta-sub">AGIGx's AI-powered platform turns this audit into a live, automated compliance programme — continuous scanning, adaptive remediation, and full DPDPA coverage before May 2027.</p>
            <button class="btn-get-started-lg" id="rm-get-started-btn">Get Started →</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  document.body.appendChild(el.firstElementChild);

  document
    .getElementById("rm-close-btn")
    .addEventListener("click", closeResultsModal);
  document.getElementById("rm-btn-pdf").addEventListener("click", downloadPDF);
  document.getElementById("rm-btn-reset").addEventListener("click", () => {
    closeResultsModal();
    doFullReset();
  });
  document.getElementById("results-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("results-overlay"))
      closeResultsModal();
  });
}

function openResultsModal() {
  ensureResultsModalDOM();
  const overlay = document.getElementById("results-overlay");
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  const score = computeScore();
  renderScoreRingEl($("#rm-ring-fill"), $("#rm-score-number"), score.overall);
  renderVerdictEls(
    $("#rm-verdict-badge"),
    $("#rm-verdict-title"),
    $("#rm-verdict-desc"),
    score,
  );
  renderStatsEls(
    $("#rm-stat-controls"),
    $("#rm-stat-partial"),
    $("#rm-stat-gaps"),
    score,
  );
  renderExposureEls(
    $("#rm-exposure-total-value"),
    $("#rm-exposure-rows"),
    score,
  );
  renderFindingsEl($("#rm-findings-list"), score);

  if (resultsChartInstance) {
    resultsChartInstance.destroy();
    resultsChartInstance = null;
  }
  setTimeout(() => {
    renderRadarEl($("#rm-radar-canvas"), score.byDomain, "rm-chart");
    $$(
      `.exposure-bar-fill`,
      document.getElementById("results-overlay"),
    ).forEach((bar) => {
      bar.style.width = bar.dataset.width + "%";
    });
  }, 200);
}

function closeResultsModal() {
  const overlay = document.getElementById("results-overlay");
  if (!overlay) return;
  overlay.setAttribute("aria-hidden", "true");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ─── Inject modal DOM if not already in page ─
function ensureModalDOM() {
  if (document.getElementById("audit-overlay")) return;

  if (!document.querySelector('link[href*="audit.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    const scripts = document.querySelectorAll('script[src*="audit.js"]');
    const base = scripts.length
      ? scripts[scripts.length - 1].src.replace(/audit\.js.*$/, "")
      : "";
    link.href = base + "audit.css";
    document.head.appendChild(link);
  }

  if (
    typeof Chart === "undefined" &&
    !document.querySelector('script[src*="chart"]')
  ) {
    const s = document.createElement("script");
    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js";
    document.head.appendChild(s);
  }

  const html = `
  <div id="audit-overlay" aria-hidden="true">
    <div id="audit-modal" role="dialog" aria-modal="true" aria-label="DPDPA Compliance Audit" class="">
      <div class="modal-header">
        <div class="modal-brand">AGI<span>Gx</span> <span class="modal-brand-sep">|</span> <span class="modal-brand-label">Compliance Audit</span></div>
        <div class="domain-tabs" id="modal-domain-tabs">
          <div class="domain-tab active" data-domain="0"><div class="domain-tab-dot"></div>Consent</div>
          <div class="domain-tab" data-domain="1"><div class="domain-tab-dot"></div>Rights</div>
          <div class="domain-tab" data-domain="2"><div class="domain-tab-dot"></div>Minimisation</div>
          <div class="domain-tab" data-domain="3"><div class="domain-tab-dot"></div>Security</div>
          <div class="domain-tab" data-domain="4"><div class="domain-tab-dot"></div>Vendors</div>
          <div class="domain-tab" data-domain="5"><div class="domain-tab-dot"></div>Governance</div>
        </div>
        <div class="modal-header-right">
          <div class="modal-counter" id="modal-counter"><strong>1</strong> / 18</div>
          <button class="modal-reset-btn" id="modal-reset-btn" title="Reset all answers">↺ Reset</button>
          <button class="modal-close-btn" id="modal-close-btn" aria-label="Close audit">✕</button>
        </div>
      </div>
      <div class="modal-progress-track">
        <div class="modal-progress-fill" id="modal-progress-fill" style="width: 0%"></div>
      </div>
      <div class="resume-banner" id="resume-banner">
        <div class="resume-banner-inner">
          <span class="resume-icon">◎</span>
          <span class="resume-text">Resuming from where you left off — <strong id="resume-q-label">Question 1</strong></span>
          <button class="resume-dismiss" id="resume-dismiss">Got it</button>
        </div>
      </div>
      <div class="modal-stage" id="modal-stage"></div>
    </div>
  </div>`;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  while (wrapper.firstChild) document.body.appendChild(wrapper.firstChild);

  // Wire close/reset/dismiss now that DOM exists
  document
    .getElementById("modal-close-btn")
    ?.addEventListener("click", closeModal);
  document
    .getElementById("modal-reset-btn")
    ?.addEventListener("click", showResetConfirm);
  document.getElementById("resume-dismiss")?.addEventListener("click", () => {
    document.getElementById("resume-banner")?.classList.remove("visible");
  });
  document.getElementById("audit-overlay")?.addEventListener("click", (e) => {
    if (e.target === document.getElementById("audit-overlay")) closeModal();
  });
}

// ─── Modal Control ────────────────────────────
// openModal now shows the gate first (unless already in progress)
function openModal() {
  const hadSaved = loadState();
  const answeredCount = answers.filter((a) => a !== null).length;

  // If previously completed → go straight to results modal
  if (hadSaved && isCompleted) {
    openResultsModal();
    return;
  }

  // If mid-quiz → skip gate, go straight to quiz
  if (hadSaved && answeredCount > 0 && current > 0) {
    openQuizModal();
    return;
  }

  // Fresh start → show gate
  openGate();
}

// The actual quiz modal opener (called from gate "Start" button or resume)
function openQuizModal() {
  ensureModalDOM();

  const overlay = $("#audit-overlay");
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  const hadSaved = loadState();
  const answeredCount = answers.filter((a) => a !== null).length;

  if (hadSaved && answeredCount > 0 && current > 0) {
    isNewSession = false;
    showResumeBanner(current);
  } else {
    isNewSession = true;
    const resumeBanner = $("#resume-banner");
    if (resumeBanner) resumeBanner.classList.remove("visible");
  }

  buildQuiz();
}

function closeModal() {
  const overlay = $("#audit-overlay");
  if (!overlay) return;
  overlay.setAttribute("aria-hidden", "true");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  saveState();
}

function showResumeBanner(qIdx) {
  const banner = $("#resume-banner");
  const label = $("#resume-q-label");
  if (label) label.textContent = `Question ${qIdx + 1} of ${QUESTIONS.length}`;
  if (banner) banner.classList.add("visible");
}

// ─── (kept as no-op for back-compat, results now go to separate modal) ─
function showModalResults() {
  // Results are now shown in the dedicated results-overlay modal
  openResultsModal();
}

// ─── Reset Flow ───────────────────────────────
function showResetConfirm() {
  const stage = $("#modal-stage");
  if (!stage) return;

  let bd = stage.querySelector(".reset-backdrop");
  if (!bd) {
    bd = document.createElement("div");
    bd.className = "reset-backdrop";
    stage.appendChild(bd);
  }

  let dlg = stage.querySelector(".reset-confirm");
  if (!dlg) {
    dlg = document.createElement("div");
    dlg.className = "reset-confirm";
    dlg.innerHTML = `
      <h3>Reset Audit?</h3>
      <p>All your answers will be cleared and you'll start from Question 1. This cannot be undone.</p>
      <div class="reset-confirm-btns">
        <button class="rc-cancel">Keep answers</button>
        <button class="rc-confirm">Yes, reset</button>
      </div>
    `;
    stage.appendChild(dlg);
    dlg.querySelector(".rc-cancel").addEventListener("click", hideResetConfirm);
    dlg.querySelector(".rc-confirm").addEventListener("click", doReset);
  }

  bd.classList.add("visible");
  dlg.classList.add("visible");
}

function hideResetConfirm() {
  const stage = $("#modal-stage");
  if (!stage) return;
  stage.querySelector(".reset-backdrop")?.classList.remove("visible");
  stage.querySelector(".reset-confirm")?.classList.remove("visible");
}

function doReset() {
  hideResetConfirm();
  clearState();
  const resumeBanner = $("#resume-banner");
  if (resumeBanner) resumeBanner.classList.remove("visible");
  buildQuiz();
}

// Full reset — closes results modal, clears state, opens quiz fresh
function doFullReset() {
  closeResultsModal();
  clearState();

  // Re-open the quiz modal directly (skip gate on retake)
  const overlay = $("#audit-overlay");
  if (overlay && overlay.classList.contains("open")) {
    buildQuiz();
  } else {
    openQuizModal();
  }
}

// ─── Build Quiz DOM ───────────────────────────
function buildQuiz() {
  const stage = $("#modal-stage");
  if (!stage) return;

  $$(".question-card", stage).forEach((c) => c.remove());
  $$(".domain-flash", stage).forEach((c) => c.remove());

  QUESTIONS.forEach((q, idx) => {
    const dom = DOMAINS[q.domain];
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `qcard-${idx}`;

    const savedAnswer = answers[idx];
    const sliderVal = answerToSlider(savedAnswer);

    card.innerHTML = `
      <div class="card-shell">
        <div class="card-header">
          <div class="card-domain-label">
            <div class="card-domain-icon">${dom.icon}</div>
            <span>0${q.domain + 1} — ${dom.label}</span>
          </div>
          <div class="card-q-number">Question ${idx + 1} of ${QUESTIONS.length}</div>
        </div>
        <div class="card-body">
          <div class="context-panel">
            <div><span class="context-law-tag">⚖ ${q.lawRef}</span></div>
            <p class="context-title">${dom.label}</p>
            <p class="context-desc">${q.lawDesc}</p>
            <div class="penalty-chip">
              <span class="penalty-icon">⚠️</span>
              <div class="penalty-text">
                <div class="penalty-label">Maximum Penalty</div>
                <div class="penalty-value">${q.penalty}</div>
              </div>
            </div>
            <div>
              <button class="evidence-toggle" data-idx="${idx}">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                What counts as evidence?
              </button>
              <div class="evidence-list" id="evidence-${idx}">
                ${q.evidence
                  .map(
                    (e) => `
                  <div class="evidence-item">
                    <div class="evidence-check"></div>
                    <span>${e}</span>
                  </div>`,
                  )
                  .join("")}
              </div>
            </div>
          </div>
          <div class="question-panel" id="qpanel-${idx}">
            <p class="question-text">${q.text}</p>
            <div class="slider-wrapper">
              <div class="slider-labels">
                <div class="slider-label not-yet" id="lbl-notyet-${idx}">
                  <span class="slider-label-icon">✗</span><span>Not Yet</span>
                </div>
                <div class="slider-label partial" id="lbl-partial-${idx}">
                  <span class="slider-label-icon">◑</span><span>Partially</span>
                </div>
                <div class="slider-label yes" id="lbl-yes-${idx}">
                  <span class="slider-label-icon">✓</span><span>In Place</span>
                </div>
              </div>
              <div class="slider-track-wrap">
                <input type="range" min="0" max="100" value="${sliderVal}"
                  id="slider-${idx}" data-idx="${idx}">
                <div class="slider-value-pill" id="pill-${idx}">Not Yet</div>
              </div>
            </div>
            <button class="btn-next" id="btn-next-${idx}" data-idx="${idx}"
              ${savedAnswer === null ? "disabled" : ""}>
              ${idx === QUESTIONS.length - 1 ? "View My Results" : "Next Question"}
              <span class="btn-next-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const backdrop = stage.querySelector(".reset-backdrop");
    backdrop ? stage.insertBefore(card, backdrop) : stage.appendChild(card);

    if (savedAnswer !== null) applyZone(idx, savedAnswer);
  });

  $$(".evidence-toggle", stage).forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.idx;
      const list = $(`#evidence-${idx}`);
      list.classList.toggle("open");
      btn.classList.toggle("open");
    });
  });

  $$('input[type="range"]', stage).forEach((slider) => {
    slider.addEventListener("input", onSliderInput);
    slider.addEventListener("change", onSliderChange);
  });

  $$(".btn-next", stage).forEach((btn) => {
    btn.addEventListener("click", () => onNext(parseInt(btn.dataset.idx)));
  });

  showCard(current, null);
  updateNavTabs();
  updateProgress();
  updateCounter();
}

// ─── Zone / Slider ────────────────────────────
function applyZone(idx, answer) {
  const slider = $(`#slider-${idx}`);
  const panel = $(`#qpanel-${idx}`);
  const pill = $(`#pill-${idx}`);
  const lblNY = $(`#lbl-notyet-${idx}`);
  const lblP = $(`#lbl-partial-${idx}`);
  const lblY = $(`#lbl-yes-${idx}`);
  const btn = $(`#btn-next-${idx}`);

  [lblNY, lblP, lblY].forEach((l) => l && l.classList.remove("active"));
  if (panel)
    panel.classList.remove(
      "zone-flash-red",
      "zone-flash-amber",
      "zone-flash-green",
    );
  if (slider) slider.classList.remove("zone-red", "zone-amber", "zone-green");

  if (answer === 0) {
    slider?.classList.add("zone-red");
    panel?.classList.add("zone-flash-red");
    lblNY?.classList.add("active");
    if (pill) pill.textContent = "Not Yet";
  } else if (answer === 1) {
    slider?.classList.add("zone-amber");
    panel?.classList.add("zone-flash-amber");
    lblP?.classList.add("active");
    if (pill) pill.textContent = "Partially";
  } else {
    slider?.classList.add("zone-green");
    panel?.classList.add("zone-flash-green");
    lblY?.classList.add("active");
    if (pill) pill.textContent = "In Place";
  }

  if (btn) btn.disabled = false;
}

function onSliderInput(e) {
  const idx = parseInt(e.target.dataset.idx);
  const answer = sliderToAnswer(e.target.value);
  answers[idx] = answer;
  applyZone(idx, answer);
}

function onSliderChange(e) {
  const idx = parseInt(e.target.dataset.idx);
  const answer = sliderToAnswer(e.target.value);
  answers[idx] = answer;
  e.target.value = answerToSlider(answer);
  applyZone(idx, answer);
  updateProgress();
  saveState();
}

// ─── Card navigation ──────────────────────────
function showCard(idx, direction) {
  const stage = $("#modal-stage");
  if (!stage) return;

  $$(".question-card", stage).forEach((c) => {
    c.classList.remove("active", "enter", "exit");
  });

  const card = $(`#qcard-${idx}`);
  if (!card) return;
  card.classList.add("active");
  if (direction) card.classList.add(direction);

  current = idx;
  updateNavTabs();
  updateProgress();
  updateCounter();
  saveState();
}

function onNext(idx) {
  const card = $(`#qcard-${idx}`);
  card?.classList.add("exit");

  setTimeout(() => {
    card?.classList.remove("active", "exit");

    if (idx === QUESTIONS.length - 1) {
      // Mark as completed before saving
      isCompleted = true;
      saveState();

      // Close quiz modal, open the separate results modal
      closeModal();
      openResultsModal();
    } else {
      const nextIdx = idx + 1;
      const prevDomain = QUESTIONS[idx].domain;
      const nextDomain = QUESTIONS[nextIdx].domain;

      showCard(nextIdx, "enter");
      if (nextDomain !== prevDomain) showDomainFlash(nextDomain);
    }
  }, 280);
}

function showDomainFlash(domainIdx) {
  const dom = DOMAINS[domainIdx];
  const stage = $("#modal-stage");
  if (!stage) return;
  const flash = document.createElement("div");
  flash.className = "domain-flash";
  flash.innerHTML = `
    <span class="domain-flash-icon">${dom.icon}</span>
    <span class="domain-flash-text">
      <span class="domain-flash-num">Section ${domainIdx + 1} of 6</span>
      ${dom.label}
    </span>
  `;
  const backdrop = stage.querySelector(".reset-backdrop");
  backdrop ? stage.insertBefore(flash, backdrop) : stage.appendChild(flash);
  setTimeout(() => flash.remove(), 2200);
}

// ─── Nav ──────────────────────────────────────
function updateNavTabs() {
  const currentDomain = QUESTIONS[current].domain;
  $$(".domain-tab").forEach((tab, dIdx) => {
    tab.classList.remove("active", "completed");
    const firstGlobal = QUESTIONS.findIndex((q) => q.domain === dIdx);
    const domainQs = QUESTIONS.filter((q) => q.domain === dIdx);
    const allAnswered = domainQs.every(
      (_, i) => answers[firstGlobal + i] !== null,
    );
    if (allAnswered && dIdx < currentDomain) {
      tab.classList.add("completed");
    } else if (dIdx === currentDomain) {
      tab.classList.add("active");
    }
  });
}

function updateProgress() {
  const answered = answers.filter((a) => a !== null).length;
  const pct = (answered / QUESTIONS.length) * 100;
  const fill = $("#modal-progress-fill");
  if (fill) fill.style.width = pct + "%";
}

function updateCounter() {
  const counter = $("#modal-counter");
  if (counter)
    counter.innerHTML = `<strong>${current + 1}</strong> / ${QUESTIONS.length}`;
}

// ─── Results (full-page) — no longer used, kept for back-compat ──────
function showResults() {
  // Results are now shown in the results-overlay modal
  openResultsModal();
}

// ─── Compute ──────────────────────────────────
function computeScore() {
  let controls = 0,
    partial = 0,
    gaps = 0;

  const byDomain = DOMAINS.map((dom, dIdx) => {
    const domQs = QUESTIONS.map((q, i) => ({ ...q, idx: i })).filter(
      (q) => q.domain === dIdx,
    );
    let domScore = 0;
    domQs.forEach((q) => {
      const a = answers[q.idx];
      domScore += scoreFromAnswer(a);
      if (a === 2) controls++;
      else if (a === 1) partial++;
      else gaps++;
    });
    return {
      domain: dom,
      score: domQs.length ? Math.round(domScore / domQs.length) : 0,
      questions: domQs,
    };
  });

  const overall = Math.round(
    byDomain.reduce((s, d) => s + d.score, 0) / DOMAINS.length,
  );
  return { overall, byDomain, controls, partial, gaps };
}

// ─── Render helpers (element-based, reusable) ─

function renderScoreRingEl(fillEl, numEl, score) {
  const circumference = 502;
  let color = "#e8324a";
  if (score >= 70) color = "#1db87a";
  else if (score >= 40) color = "#f0a030";
  if (fillEl) fillEl.style.stroke = color;

  let count = 0;
  const target = score;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    if (numEl) numEl.textContent = count + "%";
    if (count >= target) clearInterval(timer);
  }, 20);

  setTimeout(() => {
    if (fillEl)
      fillEl.style.strokeDashoffset =
        circumference - (score / 100) * circumference;
  }, 100);
}

function renderVerdictEls(badgeEl, titleEl, descEl, score) {
  const s = score.overall;
  let badge, titleHTML, desc, cls;

  if (s < 35) {
    cls = "danger";
    badge = "Early Stage";
    titleHTML = `You are <s class="vrd-strike">compliant</s><br><span class="vrd-real">significantly exposed.</span>`;
    desc = `${score.gaps} gaps across your DPDPA domains. Each one is a live penalty trigger. The Board begins enforcement May 2027 — a structured programme started today can close all of them in time.`;
  } else if (s < 70) {
    cls = "warning";
    badge = "Developing";
    titleHTML = `You're <s class="vrd-strike">almost there</s><br><span class="vrd-real">not there yet.</span>`;
    desc = `${score.controls} controls confirmed, ${score.partial} partially in place, ${score.gaps} gaps remaining. The foundation exists — it needs formalisation and deadline discipline before May 2027.`;
  } else {
    cls = "success";
    badge = "Strong Foundation";
    titleHTML = `You're <s class="vrd-strike">done</s><br><span class="vrd-real">almost done.</span>`;
    desc = `${score.controls} of 18 controls are confirmed in place. Remaining items are documentation and process gaps — a targeted review closes them well before enforcement.`;
  }

  if (badgeEl) {
    badgeEl.className = `verdict-badge ${cls}`;
    badgeEl.textContent = badge;
  }
  if (titleEl) titleEl.innerHTML = titleHTML;
  if (descEl) descEl.textContent = desc;
}

function renderStatsEls(controlsEl, partialEl, gapsEl, score) {
  if (controlsEl) controlsEl.textContent = score.controls;
  if (partialEl) partialEl.textContent = score.partial;
  if (gapsEl) gapsEl.textContent = score.gaps;
}

// Keep for backward compat (called by old showResults path)
function renderScoreRing(score) {
  renderScoreRingEl($("#score-ring-fill"), $("#score-number"), score);
}
function renderVerdict(score) {
  renderVerdictEls(
    $("#verdict-badge"),
    $("#verdict-title"),
    $("#verdict-desc"),
    score,
  );
}
function renderStats(score) {
  renderStatsEls(
    $("#stat-controls"),
    $("#stat-partial"),
    $("#stat-gaps"),
    score,
  );
}

// ─── Radar ────────────────────────────────────
let pageChartInstance = null;

function renderRadarEl(canvas, byDomain, instanceKey) {
  if (!canvas || typeof Chart === "undefined") return;

  // Destroy existing instance for this slot
  if (instanceKey === "mr-chart" && chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
  if (instanceKey === "page-chart" && pageChartInstance) {
    pageChartInstance.destroy();
    pageChartInstance = null;
  }

  const labels = byDomain.map((d) => d.domain.label.split(" & ")[0]);
  const data = byDomain.map((d) => d.score);

  const instance = new Chart(canvas, {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          label: "Full Compliance",
          data: [100, 100, 100, 100, 100, 100],
          backgroundColor: "rgba(46,125,212,.08)",
          borderColor: "rgba(46,125,212,.25)",
          borderWidth: 2,
          pointRadius: 0,
          borderDash: [6, 4],
        },
        {
          label: "Your Score",
          data,
          backgroundColor: "rgba(46,125,212,.18)",
          borderColor: "rgba(46,125,212,.9)",
          borderWidth: 2.5,
          pointRadius: 5,
          pointBackgroundColor: "#2e7dd4",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1200, easing: "easeOutQuart" },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { stepSize: 25, display: false },
          grid: { color: "rgba(184,200,219,.3)" },
          angleLines: { color: "rgba(184,200,219,.3)" },
          pointLabels: {
            font: { family: "'DM Sans', sans-serif", size: 11, weight: "500" },
            color: "#3a506b",
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { family: "'DM Sans', sans-serif", size: 11 },
            color: "#6b85a0",
            padding: 16,
            usePointStyle: true,
            pointStyleWidth: 10,
          },
        },
        tooltip: {
          callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}%` },
        },
      },
    },
  });

  if (instanceKey === "mr-chart") chartInstance = instance;
  if (instanceKey === "page-chart") pageChartInstance = instance;
  if (instanceKey === "rm-chart") resultsChartInstance = instance;
}

function renderRadar(byDomain) {
  renderRadarEl($("#radar-canvas"), byDomain, "page-chart");
}

// ─── Exposure ─────────────────────────────────
const DOMAIN_MAX_PENALTIES = [250, 250, 150, 250, 250, 150];

function renderExposureEls(totalEl, rowsEl, score) {
  if (!rowsEl) return;
  let totalExposure = 0;

  const rows = score.byDomain.map((d, i) => {
    const gapFraction = (100 - d.score) / 100;
    const exposure = Math.round(DOMAIN_MAX_PENALTIES[i] * gapFraction);
    totalExposure += exposure;
    return { d, i, exposure };
  });

  if (totalEl) totalEl.textContent = `₹${totalExposure} Cr`;

  rowsEl.innerHTML = rows
    .map(({ d, i, exposure }) => {
      const barW = Math.round((exposure / DOMAIN_MAX_PENALTIES[i]) * 100);
      const cls = d.score >= 70 ? "green" : d.score >= 40 ? "amber" : "red";
      return `
      <div class="exposure-row">
        <div class="exposure-dot ${cls}"></div>
        <div class="exposure-domain">${d.domain.label}</div>
        <div class="exposure-bar-wrap"><div class="exposure-bar-fill ${cls}" data-width="${barW}" style="width:0%"></div></div>
        <div class="exposure-amount ${cls === "green" ? "green" : ""}">
          ${exposure > 0 ? `₹${exposure} Cr` : "✓ Managed"}
        </div>
      </div>`;
    })
    .join("");
}

function renderExposure(score) {
  renderExposureEls($("#exposure-total-value"), $("#exposure-rows"), score);
}

// ─── Findings ─────────────────────────────────
function renderFindingsEl(container, score) {
  if (!container) return;

  const items = QUESTIONS.map((q, idx) => ({
    q,
    idx,
    answer: answers[idx],
    domain: DOMAINS[q.domain],
  }));

  const penaltyNum = (str) => parseInt(str.replace(/[^0-9]/g, ""));
  items.sort((a, b) => {
    const aScore = a.answer === 0 ? 0 : a.answer === 1 ? 1 : 2;
    const bScore = b.answer === 0 ? 0 : b.answer === 1 ? 1 : 2;
    if (aScore !== bScore) return aScore - bScore;
    return penaltyNum(b.q.penalty) - penaltyNum(a.q.penalty);
  });

  container.innerHTML = items
    .map((item) => {
      const a = item.answer;
      let cls, icon, tagCls, tagText;
      if (a === 0) {
        cls = "red";
        icon = "🔴";
        tagCls = "red";
        tagText = item.q.penalty + " risk";
      } else if (a === 1) {
        cls = "amber";
        icon = "🟡";
        tagCls = "amber";
        tagText = "Partial risk";
      } else {
        cls = "green";
        icon = "🟢";
        tagCls = "green";
        tagText = "Managed";
      }

      const actionHtml =
        a !== 2 ? `<div class="finding-action">💡 ${item.q.action}</div>` : "";
      const detailText =
        a === 0
          ? item.q.lawDesc
          : a === 1
            ? "Partial implementation creates residual risk. Formalisation and documentation needed before the enforcement deadline."
            : "This control is in place. Ensure it is formally documented and reviewed against the November 2025 Rules.";

      return `
      <div class="finding-card">
        <div class="finding-status ${cls}">${icon}</div>
        <div class="finding-body">
          <div class="finding-title">Q${item.q.qNum} — ${item.q.text.substring(0, 80)}${item.q.text.length > 80 ? "…" : ""}</div>
          <div class="finding-detail">${detailText}</div>
          <span class="finding-law">⚖ ${item.q.lawRef}</span>
          ${actionHtml}
        </div>
        <div class="finding-penalty-tag ${tagCls}">${tagText}</div>
      </div>`;
    })
    .join("");
}

function renderFindings(score) {
  renderFindingsEl($("#findings-list"), score);
}

// ─── PDF Download ─────────────────────────────
function downloadPDF() {
  const score = computeScore();

  // Build a print-friendly window
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert("Please allow popups to download the PDF report.");
    return;
  }

  const statusLabel = (a) =>
    a === 0 ? "Not Yet" : a === 1 ? "Partially" : "In Place";
  const statusColor = (a) =>
    a === 0 ? "#e8324a" : a === 1 ? "#f0a030" : "#1db87a";

  const findingsHTML = QUESTIONS.map((q, idx) => {
    const a = answers[idx];
    return `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e8eef5;font-size:12px;color:#1a2f4a;">${q.qNum}. ${q.text.substring(0, 90)}${q.text.length > 90 ? "…" : ""}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e8eef5;font-size:12px;color:${statusColor(a)};font-weight:600;white-space:nowrap;">${statusLabel(a)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e8eef5;font-size:12px;color:#e8324a;white-space:nowrap;">${q.penalty}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e8eef5;font-size:11px;color:#4a6080;">${a !== 2 ? q.action : "Control confirmed — document formally."}</td>
      </tr>`;
  }).join("");

  const domainRows = score.byDomain
    .map((d, i) => {
      const gapFraction = (100 - d.score) / 100;
      const exposure = Math.round(DOMAIN_MAX_PENALTIES[i] * gapFraction);
      const cls =
        d.score >= 70 ? "#1db87a" : d.score >= 40 ? "#f0a030" : "#e8324a";
      return `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e8eef5;font-size:12px;color:#1a2f4a;">${d.domain.icon} ${d.domain.label}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e8eef5;font-size:12px;font-weight:700;color:${cls};">${d.score}%</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e8eef5;font-size:12px;color:#e8324a;">${exposure > 0 ? "₹" + exposure + " Cr" : "✓ Managed"}</td>
      </tr>`;
    })
    .join("");

  const verdictMap = {
    danger: { label: "Early Stage", color: "#e8324a" },
    warning: { label: "Developing", color: "#f0a030" },
    success: { label: "Strong Foundation", color: "#1db87a" },
  };
  const vCls =
    score.overall < 35 ? "danger" : score.overall < 70 ? "warning" : "success";
  const verdict = verdictMap[vCls];

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>DPDPA Compliance Audit Report — AGIGx</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', Arial, sans-serif; background: #fff; color: #1a2f4a; }
  .page { padding: 48px 52px; max-width: 860px; margin: auto; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #2e7dd4; padding-bottom: 20px; margin-bottom: 32px; }
  .brand { font-size: 22px; font-weight: 700; color: #1a2f4a; letter-spacing: -0.5px; }
  .brand span { color: #2e7dd4; }
  .report-meta { font-size: 11px; color: #6b85a0; text-align: right; }
  .score-section { display: flex; gap: 32px; align-items: center; background: #f0f5fc; border-radius: 14px; padding: 28px 32px; margin-bottom: 32px; }
  .score-circle { width: 100px; height: 100px; border-radius: 50%; border: 8px solid ${verdict.color}; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
  .score-num { font-size: 28px; font-weight: 700; color: ${verdict.color}; }
  .score-lbl { font-size: 9px; color: #6b85a0; text-transform: uppercase; letter-spacing: 1px; }
  .verdict-badge { display: inline-block; background: ${verdict.color}22; color: ${verdict.color}; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
  .verdict-title { font-size: 18px; font-weight: 700; color: #1a2f4a; margin-bottom: 6px; }
  .stats-row { display: flex; gap: 16px; margin-top: 12px; }
  .stat { text-align: center; }
  .stat-val { font-size: 22px; font-weight: 700; }
  .stat-lbl { font-size: 10px; color: #6b85a0; margin-top: 2px; }
  .green { color: #1db87a; } .amber { color: #f0a030; } .red { color: #e8324a; }
  .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #6b85a0; margin-bottom: 14px; padding-bottom: 6px; border-bottom: 1px solid #e8eef5; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
  th { padding: 8px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #6b85a0; border-bottom: 2px solid #e8eef5; text-align: left; }
  .footer { border-top: 1px solid #e8eef5; padding-top: 16px; margin-top: 8px; font-size: 10px; color: #9ab0c8; text-align: center; }
  @media print {
    @page { margin: 20mm; }
    .page { padding: 0; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div>
      <div class="brand">AGI<span>Gx</span> Compliance</div>
      <div style="font-size:12px;color:#6b85a0;margin-top:4px;">DPDPA 2023 Audit Report</div>
    </div>
    <div class="report-meta">
      Generated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}<br/>
      DPDPA 2023 + Rules (Nov 2025)<br/>
      Enforcement: May 2027
    </div>
  </div>

  <div class="score-section">
    <div class="score-circle">
      <div class="score-num">${score.overall}%</div>
      <div class="score-lbl">Score</div>
    </div>
    <div>
      <div class="verdict-badge">${verdict.label}</div>
      <div class="verdict-title">Overall Compliance Score: ${score.overall}%</div>
      <div class="stats-row">
        <div class="stat"><div class="stat-val green">${score.controls}</div><div class="stat-lbl">In Place</div></div>
        <div class="stat"><div class="stat-val amber">${score.partial}</div><div class="stat-lbl">Partial</div></div>
        <div class="stat"><div class="stat-val red">${score.gaps}</div><div class="stat-lbl">Gaps</div></div>
      </div>
    </div>
  </div>

  <div class="section-title">Domain Scores &amp; Penalty Exposure</div>
  <table>
    <thead><tr><th>Domain</th><th>Score</th><th>Est. Exposure</th></tr></thead>
    <tbody>${domainRows}</tbody>
  </table>

  <div class="section-title">Detailed Findings</div>
  <table>
    <thead><tr><th>Question</th><th>Status</th><th>Max Penalty</th><th>Recommended Action</th></tr></thead>
    <tbody>${findingsHTML}</tbody>
  </table>

  <div class="footer">
    This report was generated by AGIGx's DPDPA Compliance Audit tool. It is indicative only and does not constitute legal advice.
    Contact AGIGx to convert these findings into a live compliance programme before the May 2027 enforcement deadline.
  </div>
</div>
<script>window.onload = function(){ window.print(); };<\/script>
</body>
</html>`);
  printWindow.document.close();
}

// ─── CSS for modal results panel & new buttons ─
// Injected once to avoid needing audit.css edits
(function injectModalResultsCSS() {
  if (document.getElementById("audit-mr-styles")) return;
  const style = document.createElement("style");
  style.id = "audit-mr-styles";
  style.textContent = `
    /* ── Bigger modal in results mode ── */
    #audit-modal.modal-results-mode {
      width: min(98vw, 1100px) !important;
      max-height: 92vh !important;
      border-radius: 18px !important;
    }

    /* ── Modal results panel ── */
    .modal-results-panel {
      overflow-y: auto;
      max-height: calc(92vh - 70px);
      padding: 0;
    }
    .modal-results-scroll {
      padding: 0 0 40px;
    }

    /* ── Hero inside modal ── */
    .mr-hero {
      background: linear-gradient(135deg, #0d1f38 0%, #152845 100%);
      padding: 40px 44px 32px;
    }
    .mr-hero-inner {
      display: flex;
      gap: 40px;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .mr-ring-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      flex-shrink: 0;
    }
    .mr-ring-container {
      position: relative;
      width: 160px;
      height: 160px;
    }
    .mr-ring-svg {
      width: 160px;
      height: 160px;
    }
    .mr-ring-fill {
      fill: none;
      stroke-width: 12;
      stroke-linecap: round;
      transition: stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1), stroke 0.5s;
    }
    .mr-ring-container .score-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .mr-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      padding: 0 44px;
      margin-top: 28px;
    }
    @media (max-width: 700px) {
      .mr-grid { grid-template-columns: 1fr; padding: 0 20px; }
      .mr-hero { padding: 28px 20px 24px; }
      .mr-hero-inner { gap: 24px; }
    }
    .mr-grid .radar-card,
    .mr-grid .exposure-card {
      padding: 24px;
    }
    .modal-results-panel .findings-section {
      padding: 0 44px;
      margin-top: 28px;
    }
    .modal-results-panel .results-cta {
      margin: 32px 44px 0;
      border-radius: 14px;
    }

    /* ── Action buttons in modal results ── */
    .mr-action-btns {
      display: flex;
      gap: 12px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .mr-btn-pdf {
      background: #2e7dd4;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      font-family: inherit;
    }
    .mr-btn-pdf:hover { background: #1a5ca8; }
    .mr-btn-reset {
      background: rgba(255,255,255,0.1);
      color: #e0eaf6;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      font-family: inherit;
    }
    .mr-btn-reset:hover { background: rgba(255,255,255,0.18); }

    /* ── Reset / PDF buttons on results page ── */
    .results-page-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .page-btn-pdf {
      background: #2e7dd4;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 22px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      font-family: inherit;
    }
    .page-btn-pdf:hover { background: #1a5ca8; }
    .page-btn-reset {
      background: transparent;
      color: #2e7dd4;
      border: 1.5px solid #2e7dd4;
      border-radius: 8px;
      padding: 10px 22px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .page-btn-reset:hover { background: #2e7dd4; color: #fff; }
  `;
  document.head.appendChild(style);
})();

// ─── Init ─────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Trigger buttons — opens gate first (or resumes quiz)
  ["btn-start", "nav-audit-trigger"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", openModal);
  });
  document.querySelectorAll("[data-open-audit]").forEach((el) => {
    el.addEventListener("click", openModal);
  });

  // ESC key closes whichever modal is open
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const gateOpen = document
        .getElementById("gate-overlay")
        ?.classList.contains("open");
      const quizOpen = document
        .getElementById("audit-overlay")
        ?.classList.contains("open");
      const resultsOpen = document
        .getElementById("results-overlay")
        ?.classList.contains("open");
      if (resultsOpen) closeResultsModal();
      else if (quizOpen) closeModal();
      else if (gateOpen) closeGate();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".btn-get-started") ||
      e.target.closest(".btn-get-started-lg")
    ) {
      window.location.href = "contact.html";
    }
  });
});
