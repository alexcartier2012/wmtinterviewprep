# Interview Prep Builder

A static web page that turns a role, interview logistics, a job description, a resume and team notes into a candidate-ready interview prep doc.

- **Pick a role** from the dropdown (backend, frontend, full stack, mobile, data eng, data science, DevOps/SRE, QA/SDET, PM, TPM, BA, Scrum Master).
- **Enter logistics:** date, time, format, link, interviewers, recruiter contact.
- **Paste the JD, the resume and any AM / hiring manager notes.**
- **Generate:** the page finds the JD skills, checks them against the resume, pulls matching resume lines as evidence, and builds sections for what to expect, coding, system design, likely questions, STAR prompts tied to company values, intro outline, questions to ask and a day-of checklist.
- **Optional, Enhance with Claude:** add an Anthropic API key in *AI settings* and Claude rewrites the draft into a fully tailored doc (a suggested intro drawn from the resume, STAR stories mapped to real projects, JD-specific questions).
- **Export:** Copy as Markdown (pastes into email/Teams/Outlook), Download `.md`, or Print / Save as PDF.

Tick **Include internal recruiter section** to get match %, gaps, and gaps on skills the team flagged. Leave it off for the copy you send the candidate.

## Put it on GitHub Pages

1. Create a repo (an internal/private repo works if your org's GitHub plan supports private Pages).
2. Upload this folder's contents to the repo root.
3. **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root → Save.**
4. Share the URL (`https://<org>.github.io/<repo>/`).

No build step and no server. To try it locally, just open `index.html` in a browser.

## Making it smarter over time: `config/roles.js`

This is the file your team should edit. Every time an AM, hiring manager or candidate debrief tells you something new, put it here:

| Section | What to change |
|---|---|
| `client.values` | Company values and the behavioral prompts tied to them |
| `client.generalNotes` | Things every candidate should know |
| `rounds` | What each round type looks like and what to focus on |
| `roles` | Per-role summary, the typical loop, coding style/languages/topics, prep topics, questions |
| `skills` | Keywords detected in JDs. Add new tech here, with questions and a prep tip |

The role/loop descriptions shipped here are what candidates and recruiters **commonly report**. Confirm them with your AMs and correct them.

Skill keywords match whole words, case-insensitively. End a keyword with `*` to match a prefix (`"load balanc*"` matches *load balancer* and *load balancing*).

To add a role, copy an existing entry in `roles`, give it a new id, and it will appear in the dropdown.

## Privacy

- Without an API key, everything runs in the browser. Nothing is uploaded anywhere.
- With **Enhance with Claude**, the JD, resume and notes are sent to the Anthropic API. Check this against your company's policy for candidate data before turning it on, and consider removing phone numbers and addresses from resumes first.
- The API key is stored in that user's browser (`localStorage`) only. Each teammate uses their own key. Never commit a key to the repo.

## Files

```
index.html        page layout
styles.css        styles (light/dark, print-friendly)
app.js            skill matching, doc builder, Claude call, export
config/roles.js   team-editable roles, rounds, values and skills
```
