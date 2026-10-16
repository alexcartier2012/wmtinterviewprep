(function () {
  "use strict";

  const CFG = window.PREP_CONFIG;
  const $ = (id) => document.getElementById(id);
  const KEY_STORE = "prep-builder:apiKey";
  const MODEL_STORE = "prep-builder:model";

  let currentMarkdown = "";

  // ---------- storage (may be blocked in private windows) ----------
  function store(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch (_) { /* ignore */ }
  }
  function load(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  // ---------- setup ----------
  function init() {
    const roleSel = $("role");
    Object.entries(CFG.roles).forEach(([id, r]) => roleSel.add(new Option(r.label, id)));

    const roundSel = $("round");
    Object.entries(CFG.rounds).forEach(([id, r]) => roundSel.add(new Option(r.label, id)));
    roundSel.value = "technical";

    $("client").value = CFG.client.name;

    $("apiKey").value = load(KEY_STORE) || "";
    $("model").value = load(MODEL_STORE) || "claude-opus-5-5";
    refreshKeyState();

    $("settingsBtn").addEventListener("click", () => {
      const panel = $("settings");
      panel.hidden = !panel.hidden;
      $("settingsBtn").setAttribute("aria-expanded", String(!panel.hidden));
    });
    $("saveKey").addEventListener("click", () => {
      store(KEY_STORE, $("apiKey").value.trim() || null);
      store(MODEL_STORE, $("model").value);
      refreshKeyState("Saved in this browser.");
    });
    $("clearKey").addEventListener("click", () => {
      $("apiKey").value = "";
      store(KEY_STORE, null);
      refreshKeyState("Key removed.");
    });
    $("model").addEventListener("change", () => store(MODEL_STORE, $("model").value));

    $("resumeFile").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file) $("resume").value = await file.text();
    });

    $("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const md = buildPrep(readForm());
      show(md, "Generated from the JD, resume and team config.");
    });
    $("enhance").addEventListener("click", enhanceWithClaude);
    $("reset").addEventListener("click", () => {
      $("form").reset();
      $("client").value = CFG.client.name;
      $("round").value = "technical";
    });

    $("copy").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(currentMarkdown);
        setStatus("Copied as Markdown.");
      } catch (_) {
        setStatus("Copy failed — use Download instead.");
      }
    });
    $("download").addEventListener("click", () => {
      const f = readForm();
      const name = slug([f.candidate || "candidate", f.roleId, f.date].filter(Boolean).join("-"));
      const blob = new Blob([currentMarkdown], { type: "text/markdown" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `prep-${name}.md`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    $("print").addEventListener("click", () => window.print());
  }

  function refreshKeyState(msg) {
    const hasKey = !!(load(KEY_STORE) || "").trim();
    $("enhance").disabled = !hasKey;
    $("enhance").title = hasKey ? "Send to Claude for a fuller, tailored prep" : "Add an API key in AI settings";
    $("keyStatus").textContent = msg || (hasKey ? "Key saved in this browser." : "No key saved.");
  }

  function readForm() {
    const v = (id) => $(id).value.trim();
    return {
      roleId: v("role"),
      level: v("level"),
      roundId: v("round"),
      client: v("client") || CFG.client.name,
      team: v("team"),
      candidate: v("candidate"),
      interviewers: v("interviewers"),
      date: v("date"),
      time: v("time"),
      tz: v("tz"),
      duration: v("duration"),
      format: v("format"),
      where: v("where"),
      recruiter: v("recruiter"),
      jd: $("jd").value,
      resume: $("resume").value,
      notes: $("notes").value.trim(),
      internal: $("internal").checked,
    };
  }

  // ---------- analysis ----------
  function termRegex(term) {
    const prefix = term.endsWith("*");
    const t = (prefix ? term.slice(0, -1) : term).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // whole word, allowing simple plurals (microservice → microservices)
    return new RegExp(`(^|[^a-z0-9])${t}${prefix ? "" : "(?:s|es)?(?![a-z0-9])"}`, "i");
  }

  function findSkills(text) {
    if (!text.trim()) return [];
    return CFG.skills.filter((s) => s.match.some((m) => termRegex(m).test(text)));
  }

  function evidence(skill, resume) {
    // skip the first line (usually name / title) so evidence comes from real bullets
    const body = resume.trim().split(/\r?\n/).slice(1).join("\n");
    const lines = body.split(/\r?\n|(?<=[.;])\s+/).map((l) => l.replace(/^[\s•\-*·▪●]+/, "").trim()).filter((l) => l.length > 20);
    const hit = lines.find((l) => skill.match.some((m) => termRegex(m).test(l)));
    if (!hit) return "";
    return hit.length > 170 ? hit.slice(0, 167) + "…" : hit;
  }

  function yearsAsked(jd) {
    const m = jd.match(/(\d{1,2})\s*\+?\s*(?:-\s*\d{1,2}\s*)?(?:years|yrs)/i);
    return m ? m[0].replace(/\s+/g, " ") : "";
  }

  function analyze(f) {
    const jdSkills = findSkills(f.jd);
    const resumeSkills = new Set(findSkills(f.resume).map((s) => s.name));
    const noteSkills = new Set(findSkills(f.notes).map((s) => s.name));
    const matched = jdSkills.filter((s) => resumeSkills.has(s.name));
    const gaps = jdSkills.filter((s) => !resumeSkills.has(s.name));
    // AM-emphasized skills first
    const byEmphasis = (a, b) => (noteSkills.has(b.name) ? 1 : 0) - (noteSkills.has(a.name) ? 1 : 0);
    matched.sort(byEmphasis);
    gaps.sort(byEmphasis);
    const emphasized = CFG.skills.filter((s) => noteSkills.has(s.name));
    const mentionsCoding = /hackerrank|codesignal|leetcode|live cod|coding (round|test|assessment|exercise)|pair program/i.test(f.jd + " " + f.notes);
    return { jdSkills, matched, gaps, emphasized, noteSkills, years: yearsAsked(f.jd), mentionsCoding };
  }

  // ---------- markdown builder ----------
  const LEVEL_LABEL = { entry: "Entry / Associate", mid: "Mid", senior: "Senior", staff: "Staff / Principal / Lead" };

  function buildPrep(f) {
    const role = CFG.roles[f.roleId];
    const round = CFG.rounds[f.roundId];
    const a = analyze(f);
    const senior = f.level === "senior" || f.level === "staff";
    const wantsDesign = role.systemDesign && (senior || f.roundId === "design" || f.roundId === "panel");
    const wantsCoding = (role.coding && role.coding.expected) || a.mentionsCoding;
    const first = f.candidate ? f.candidate.split(/\s+/)[0] : "";
    const out = [];
    const L = (s = "") => out.push(s);

    L(`# Interview prep: ${role.label}`);
    L(`**${f.client}${f.team ? " · " + f.team : ""}** · ${LEVEL_LABEL[f.level]} · ${round.label}`);
    L();
    if (first) L(`Hi ${first}, here's everything you need for your upcoming interview. Read it once now and skim it again the morning of.`);
    L();

    // Logistics
    L("## Logistics");
    L("| Item | Details |");
    L("|---|---|");
    const rows = [
      ["Candidate", f.candidate],
      ["When", [formatDate(f.date), f.time && `${formatTime(f.time)} ${f.tz}`].filter(Boolean).join(" at ")],
      ["Length", f.duration],
      ["Format", f.format],
      [f.format === "Onsite" ? "Location" : "Where", f.where],
      ["Interviewer(s)", f.interviewers],
      ["Round", round.label],
      ["Day-of contact", f.recruiter],
    ];
    rows.filter(([, v]) => v).forEach(([k, v]) => L(`| **${k}** | ${esc(v)} |`));
    L();

    // AM notes
    if (f.notes) {
      L("## Notes from the team");
      L(f.notes.split(/\r?\n/).filter(Boolean).map((l) => `> ${esc(l)}`).join("\n>\n"));
      L();
    }

    // What to expect
    L("## What to expect");
    L(`**This round:** ${round.expect}`);
    L();
    L(`**The role:** ${role.summary}`);
    L();
    L(`**Typical interview loop:** ${role.loop}`);
    L();
    L("**Focus for this round:**");
    round.focus.forEach((x) => L(`- ${x}`));
    L();

    // Skills match
    L("## How your background lines up");
    if (!f.jd.trim()) {
      L("_Paste the JD to see which skills to emphasize._");
    } else if (!a.jdSkills.length) {
      L("_No known skills were detected in the JD. Add the relevant keywords to `config/roles.js` so the tool can pick them up._");
    } else {
      if (a.years) L(`The JD asks for **${a.years}** of experience. Be ready to walk through that time clearly.`), L();
      if (a.matched.length) {
        L("### Lead with these (in the JD and on your resume)");
        a.matched.forEach((s) => {
          const ev = evidence(s, f.resume);
          const star = a.noteSkills.has(s.name) ? " ⭐ _team says this matters_" : "";
          L(`- **${s.name}**${star}${ev ? ` — your resume: “${esc(ev)}”` : ""}`);
          L(`  - Prep: ${s.tip}`);
        });
        L();
      }
      if (a.gaps.length) {
        L("### Brush up on these (in the JD, not clear on your resume)");
        a.gaps.forEach((s) => {
          const star = a.noteSkills.has(s.name) ? " ⭐ _team says this matters_" : "";
          L(`- **${s.name}**${star} — ${s.tip} If you've used it, have one concrete example ready. If you haven't, say so honestly and connect it to something similar you know.`);
        });
        L();
      }
    }

    // Coding
    if (wantsCoding) {
      L("## Coding");
      if (role.coding && role.coding.expected) {
        L(`**Style:** ${role.coding.style}`);
        L();
        L(`**Language:** ${role.coding.languages.join(", ")}`);
        L();
        L("**Practice these patterns:**");
        role.coding.topics.forEach((t) => L(`- ${t}`));
      } else {
        L("The JD or team notes mention a coding exercise. Confirm the format and language with your recruiter.");
      }
      L();
      L("**How to run a live coding problem:**");
      L("1. Restate the problem and ask about inputs, edge cases and expected output.");
      L("2. Talk through a brute-force approach first, then improve it. Say the time/space complexity out loud.");
      L("3. Write clean code with clear names. Keep talking while you type.");
      L("4. Walk through a test case by hand, including an edge case (empty input, duplicates, very large input).");
      L("5. If you get stuck, say what you're thinking. Interviewers give hints to people who share their reasoning.");
      L();
    }

    // System design
    if (wantsDesign) {
      L("## System design");
      L("Use this structure so you never stall:");
      L("1. **Requirements** — functional, non-functional (scale, latency, availability). Ask about numbers.");
      L("2. **Estimates** — requests/sec, storage, peak (think holiday traffic).");
      L("3. **API & data model** — key endpoints and tables/collections.");
      L("4. **High-level design** — clients, services, data stores, queues, caches.");
      L("5. **Deep dive** — pick 1–2 components the interviewer cares about.");
      L("6. **Trade-offs & failure modes** — what breaks, how you detect it, how you recover.");
      L();
      if (role.seniorQuestions && role.seniorQuestions.length) {
        L("**Practice prompts:**");
        role.seniorQuestions.forEach((q) => L(`- ${q}`));
        L();
      }
    }

    // Technical questions
    L("## Likely questions");
    L("### Role questions");
    role.coreQuestions.forEach((q) => L(`- ${q}`));
    if (senior && role.seniorQuestions && !wantsDesign) role.seniorQuestions.forEach((q) => L(`- ${q}`));
    L();
    const skillQs = a.matched.concat(a.gaps).slice(0, 8);
    if (skillQs.length) {
      L("### From the JD");
      skillQs.forEach((s) => s.q.forEach((q) => L(`- _${s.name}:_ ${q}`)));
      L();
    }

    L("### Topics to review");
    const topics = [...role.prepTopics];
    a.emphasized.forEach((s) => { if (!topics.some((t) => t.toLowerCase().includes(s.name.toLowerCase()))) topics.unshift(`${s.name} (flagged in team notes)`); });
    topics.forEach((t) => L(`- [ ] ${t}`));
    L();

    // Behavioral
    L("## Behavioral (STAR)");
    L(`${f.client} interviewers often tie behavioral questions to company values. Prepare a story for each using **S**ituation, **T**ask, **A**ction, **R**esult. Keep each to about 2 minutes, and end with a number when you can (time saved, revenue, incidents reduced, users).`);
    L();
    CFG.client.values.forEach((val) => {
      L(`**${val.name}**`);
      val.prompts.forEach((p) => L(`- ${p}`));
    });
    L();
    if (a.matched.length) {
      L(`Tip: build your stories around your ${a.matched.slice(0, 3).map((s) => s.name).join(", ")} work so they double as proof of the skills in the JD.`);
      L();
    }

    // Intro
    L("## “Tell me about yourself” (aim for 90 seconds)");
    L("1. **Now:** your current role and the problem space you work in.");
    L(`2. **Proof:** one or two projects that match this role${a.matched.length ? ` — ideally showing ${a.matched.slice(0, 2).map((s) => s.name).join(" and ")}` : ""}, with a result.`);
    L("3. **Path:** a sentence on how your earlier experience led here.");
    L(`4. **Why this role:** what about ${f.team || "this team"} at ${f.client} interests you.`);
    L();

    // Questions to ask
    L("## Questions to ask them");
    [...role.questionsToAsk,
      "What would success look like in the first 90 days?",
      "What's the biggest challenge the team is working through right now?",
    ].forEach((q) => L(`- ${q}`));
    L();

    // General
    L(`## Good to know about ${f.client}`);
    CFG.client.generalNotes.forEach((n) => L(`- ${n}`));
    L();

    // Checklist
    L("## Day-of checklist");
    if (f.format === "Video") {
      L("- [ ] Test the meeting link, camera and mic 15 minutes early");
      L("- [ ] Quiet room, neutral background, charger plugged in, notifications off");
      L("- [ ] Close unrelated tabs in case you share your screen");
      if (wantsCoding) L("- [ ] Have a code editor ready in case they ask you to share screen");
    } else if (f.format === "Phone") {
      L("- [ ] Phone charged, good signal, quiet room");
      L("- [ ] Resume and this doc open in front of you");
    } else {
      L("- [ ] Plan your route and arrive 15 minutes early; bring ID");
      L("- [ ] Bring printed copies of your resume");
    }
    L("- [ ] Resume open — know every bullet and be ready to go deep on any of them");
    L("- [ ] Water nearby; a notepad for questions");
    if (f.recruiter) L(`- [ ] If anything goes wrong (link fails, running late), contact **${esc(f.recruiter)}** right away`);
    L("- [ ] Send a short thank-you to your recruiter afterwards with how it went, so we can debrief");
    L();

    // Internal
    if (f.internal) {
      L("---");
      L("## Internal recruiter notes (remove before sending)");
      if (a.jdSkills.length) {
        const pct = Math.round((a.matched.length / a.jdSkills.length) * 100);
        L(`- **Keyword match:** ${a.matched.length}/${a.jdSkills.length} JD skills found on resume (${pct}%)`);
        if (a.gaps.length) L(`- **Gaps:** ${a.gaps.map((s) => s.name).join(", ")}`);
        const flaggedGaps = a.gaps.filter((s) => a.noteSkills.has(s.name));
        if (flaggedGaps.length) L(`- **⚠ Gaps on skills the team flagged:** ${flaggedGaps.map((s) => s.name).join(", ")} — address in a prep call`);
      }
      if (a.years) L(`- **JD experience ask:** ${a.years} — check against resume dates`);
      L(`- **Coding expected:** ${wantsCoding ? "yes" : "no / unclear"}; **system design:** ${wantsDesign ? "yes" : "unlikely"}`);
      L("- Confirm with AM: coding platform & language, number of rounds, interviewer names/titles, dress code, rate/location constraints.");
      L();
    }

    L(`_Prepared ${new Date().toLocaleDateString()} · Good luck!_`);
    return out.join("\n");
  }

  // ---------- Claude ----------
  async function enhanceWithClaude() {
    const key = (load(KEY_STORE) || $("apiKey").value || "").trim();
    if (!key) return;
    const f = readForm();
    if (!f.jd.trim() && !f.resume.trim()) {
      setStatus("Paste at least a JD or resume first.");
      return;
    }
    const baseline = buildPrep(f);
    const role = CFG.roles[f.roleId];
    const round = CFG.rounds[f.roundId];

    const system = [
      `You are an expert technical recruiter and interview coach at a staffing firm that places candidates with ${f.client}.`,
      "You write interview prep documents that recruiters send directly to candidates.",
      "Write in Markdown. Be specific to the JD and the candidate's resume, practical, and encouraging without hype.",
      "Never invent experience the candidate does not have. When suggesting stories, point to specific projects or bullets on their resume.",
      "For JD skills missing from the resume, give a short, honest way to handle the question and what to study.",
      "Treat the team config's descriptions of the interview loop as commonly reported, not guaranteed.",
      "Keep the Logistics table, team notes and day-of checklist from the baseline draft accurate and intact.",
      f.internal
        ? "Keep the internal recruiter section at the end and make it sharper (risks, what to cover in a prep call)."
        : "This copy goes to the candidate: do not include match scores, internal notes or anything critical of the candidate.",
      "Output only the finished document.",
    ].join(" ");

    const user = [
      `<role_profile>\n${JSON.stringify({ ...role, round, level: LEVEL_LABEL[f.level], team: f.team }, null, 2)}\n</role_profile>`,
      `<company_values>\n${CFG.client.values.map((v) => v.name).join("\n")}\n</company_values>`,
      `<job_description>\n${f.jd || "(not provided)"}\n</job_description>`,
      `<resume>\n${f.resume || "(not provided)"}\n</resume>`,
      `<team_notes>\n${f.notes || "(none)"}\n</team_notes>`,
      `<baseline_draft>\n${baseline}\n</baseline_draft>`,
      "Rewrite the baseline draft into a polished, tailored prep doc. Add: 3–5 likely questions grounded in the specific JD responsibilities with a one-line pointer on how this candidate should answer from their resume; a suggested 90-second intro drafted from their actual resume; and one suggested STAR story per company value mapped to a real resume project. Keep it skimmable.",
    ].join("\n\n");

    setBusy(true, "Claude is writing a tailored prep…");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-beta": "server-side-fallback-2026-07-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: $("model").value,
          max_tokens: 16000,
          output_config: { effort: "medium" },
          fallbacks: "default",
          system,
          messages: [{ role: "user", content: user }],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data.error && data.error.message) || res.statusText;
        throw new Error(`${res.status}: ${msg}`);
      }
      if (data.stop_reason === "refusal") {
        throw new Error("Claude declined this request. The basic prep is shown instead.");
      }
      const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (!text) throw new Error("Empty response.");
      const note = data.stop_reason === "max_tokens" ? " (output hit the length limit and may be cut off)" : "";
      show(text, `Enhanced by ${data.model || $("model").value}${note}. Review before sending.`);
    } catch (err) {
      show(baseline, `Claude request failed — ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  // ---------- render helpers ----------
  function show(md, status) {
    currentMarkdown = md;
    $("doc").innerHTML = DOMPurify.sanitize(marked.parse(md));
    ["copy", "download", "print"].forEach((id) => ($(id).disabled = false));
    setStatus(status);
    $("doc").scrollTop = 0;
  }

  function setStatus(msg) { $("status").textContent = msg; }

  function setBusy(busy, msg) {
    $("enhance").disabled = busy || !(load(KEY_STORE) || "").trim();
    $("generate").disabled = busy;
    if (busy) $("status").innerHTML = `<span class="spinner"></span>${msg}`;
  }

  function esc(s) { return String(s).replace(/\|/g, "\\|").replace(/</g, "&lt;"); }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function formatDate(d) {
    if (!d) return "";
    const dt = new Date(d + "T12:00:00");
    return dt.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  }
  function formatTime(t) {
    const [h, m] = t.split(":").map(Number);
    return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  }

  init();
})();
