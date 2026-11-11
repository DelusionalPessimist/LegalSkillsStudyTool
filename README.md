<div align="center">

<img src="icon-512.png" alt="1L Legal Skills icon" width="96" height="96">

# 1L Legal Skills

**Browser-based practice for the skills behind law school.**

Work through short lessons, practice on your own class materials, and track your progress on your device.

[![Open the live demo](https://img.shields.io/badge/Open_the_live_demo-→-2ea44f?style=for-the-badge)](https://delusionalpessimist.github.io/LegalSkillsStudyTool/)

![No backend](https://img.shields.io/badge/backend-none-555?style=flat-square)
![No build step](https://img.shields.io/badge/build_step-none-555?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-installable-5a0fc8?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/vanilla-HTML%20%2F%20CSS%20%2F%20JS-f7df1e?style=flat-square)

[What’s included](#whats-included) · [Run locally](#run-locally) · [Privacy](#privacy-and-saved-data) · [Limitations](#what-this-app-does-not-do) · [License](#license)

</div>

---

> [!IMPORTANT]
> This is a study aid, not legal advice and not a source of legal doctrine. Examples in the app use fictional facts and fictional rules. Bring your own assigned materials, verify legal rules against your course sources, and follow your school’s and professor’s policies on AI and other study tools, especially for graded work.

## What’s included

The curriculum covers **7 skills × 3 levels × 3 lessons = 63 lessons**.

| Skill | What you practice |
| :-- | :-- |
| **Reading** | Opinions, holdings, statutes, and competing interpretations |
| **Analysis** | Issue framing, rule application, missing facts, and exam time management |
| **Logic** | Rule structure, reasoning, synthesis, and calibrated conclusions |
| **Writing** | Organization, precision, objective memos, and revision |
| **Argument** | Analogy, distinction, counterarguments, and adverse authority |
| **Oral** | Cold calls, changed-fact questions, and short arguments |
| **Research** | Research planning, primary sources, citators, and stopping points |

### Also included

- **Daily practice:** A daily lesson and a rotating practice drill
- **Timed writing workspace:** Adjustable session lengths and word goals
- **Work log:** Answers, notes, class names, and self-checks
- **The Seven Moves:** An interactive analysis module built around a fictional Harbor Point Market problem
- **Themes:** Light, dark, and system
- **Backup:** JSON export and import for saving or moving your study data
- **Installable:** Progressive web app support on compatible browsers

## Run locally

No package manager, build step, API key, or backend is required. Clone the repository and serve the files from its root with any static web server. For example, with Python installed:

```bash
git clone https://github.com/DelusionalPessimist/LegalSkillsStudyTool.git
cd LegalSkillsStudyTool
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser. You can also use the [live demo](https://delusionalpessimist.github.io/LegalSkillsStudyTool/).

## Privacy and saved data

The app has no account or backend. Lessons, drafts, notes, practice entries, and progress are saved in the browser’s local storage on your device. The app does not send your class materials or writing to an AI service.

- Your saved data does not automatically sync between browsers or devices.
- Clearing the browser’s site data can remove your saved work.
- Importing a backup **replaces** the data currently saved by the app, so export first if you want to keep both copies.

> [!TIP]
> Use **Settings → Export backup** regularly to save a JSON copy of your work.

## What this app does not do

The app does not grade answers, provide legal advice, verify citations, or teach jurisdiction-specific doctrine. It is a practice framework to use with your own course materials.

> [!NOTE]
> The **Gap Bridge** screen describes a possible future feedback feature. It is a mockup and is not connected in this build.

## Built with

Vanilla HTML, CSS, and JavaScript. The app is a static site and uses browser local storage for persistence.

## License

No license is specified in this repository. Unless a license is added, reuse and redistribution are not granted by this README.
