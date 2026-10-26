# SA 01 Production Decisions

Updated 26 October 2026. Working draft version 0.2.0; variant `document-email-01`.

## Agreed direction

- Narrated motion graphics combined with guided software simulation.
- The organisation will build its own learning platform. Build a browser lesson with a separate platform integration contract.
- Reporting instructions must be configurable. Do not hard-code Teams or IT Support as the universal route.
- Four-minute core content budget; thinking time, assistance, assessment, and retries can extend the session.

## Company profile

Keep the organisation name, trusted-directory label and opening instructions, primary reporting label and steps, fallback reporting label and steps, approved sharing label and instructions, and policy references in `company-profile.json`. Substitute values into content at render time. Required empty fields prevent production readiness but do not prevent internal draft review with visible placeholders. Changing the profile must change the visible instructions, transcript, and recorded profile version together.

The initial profile is deliberately unconfirmed. The learner must not be shown an unreviewed reporting route as approved company policy. Configuration changes require a new profile version and policy review before release.

## Evidence for policy review

- [SA-01 draft](https://app.notion.com/p/40419c4d5f3e810ca9a3d4ce6dbfbaf8) provides scope and the original five-scene sequence.
- [SA-17 draft](https://app.notion.com/p/40419c4d5f3e814d9c8dfb74f60b3d73) requires an actual reporting channel, fallback, and supported evidence mechanism.
- [Catalogic incident reporting announcement, 28 August 2025](https://catalogicsoftware.sharepoint.com/sites/Security/Shared%20Documents/Vulnerability%20and%20Incident%20Reporting/IR_TeamsReportingChannel_Communication_20250828.pdf?web=1) directs employees to Teams → Security → Incident Reporting, including suspected phishing and uncertain incidents. This is a candidate profile value, pending confirmation of current applicability.
- A 17 September 2026 email search result displayed an external-sender banner directing suspicious messages to `ITSupport@catalogicsoftware.com`. The banner does not establish precedence over the Teams announcement or a fallback policy. Do not infer that precedence.

## Decisions made for the draft

- Use fictional Alex Rivera and manager Morgan Chen, a draft customer agreement, and a request to bypass the sharing workspace. No real customer or employee data is used.
- Use neutral application screens rather than reproducing a specific version of Outlook or Teams.
- The initial browser speech preview has been replaced by ElevenLabs recordings at the user’s request. Audio sign-off, caption timing, policy approval, accessibility validation, platform integration, and release remain production work.
- Five equally weighted assessment items; 80% is a configurable draft default pending programme adoption. Practice is unscored.
- Local progress and downloadable review results support prototype review. They are not authoritative employee completion evidence.

## Open production inputs

| Input | Responsible role | Required before |
| --- | --- | --- |
| Reviewed primary reporting route, fallback, and safe evidence submission | Security owner | Final script/media and release |
| Reviewed trusted directory and independent verification instructions | Security owner | Final script/media and release |
| Approved sharing process and policy references | Security owner | Final script/media and release |
| Named content owner, approver, and review date | Programme owner | Release |
| Identity, assignment, persistence, scoring, and evidence endpoints | Platform owner | Platform acceptance |
| Passing threshold and retry policy | Programme owner | Production assessment |

## Execution record

Ruling: This folder is not a Git repository; continue in the existing authorised workspace without creating a repository, worktree, or commits.

Initial ruling: Create a local review player while policy fields remain unconfirmed and keep it explicitly a draft. The subsequent explicit request to use ElevenLabs authorises draft voice production; company-policy placeholders are excluded from recordings and publication remains pending.

Ruling: Interpret “we will build our own” as a custom delivery platform. This lesson provides a working local module and integration contract; a whole employee-management platform requires its own design.

Ruling: Interpret “make it configurable” as a versioned company profile covering reporting, fallback, directory, sharing and assessment settings. Route precedence is left to the configured approved profile; no unconfirmed route becomes a company default.

Local review status: script, storyboard, transcript, assessment draft and player prepared. Twenty-seven engine/audio checks pass, and the browser walkthrough covers the full scenario, configurable routes, failure, retry, and resumed passing result. See `qa.md` for the evidence and remaining production checks.

## Visual and wording revision

The user requested animated SVG graphics, a more familiar enterprise email interface, and natural corporate language with a restrained conversational tone. Draft 0.2.0 adds locally authored SVG scenes for the request, independent verification, reporting and calls; an enterprise mailbox layout; and revised emails, narration, dialogue, choices and assessment feedback. All animations run once and honour reduced-motion preferences.

## ElevenLabs voice production

The user explicitly requested ElevenLabs with different narration and conversation voices. Selected Claire — E-Learning & Corporate Training for narration, Mark — Natural Conversations for Alex, and Katie — E-Learning & Podcast Host for Morgan. The 18 selected clips use `eleven_v4` and total 159.68 seconds. Voice, generation, source-text, and duration provenance is retained in `media/voice/manifest.json`; files are stored locally.

The cast applies consistently to both verification conversations. Fixed narration and actor dialogue are recorded separately and sequenced by the player, which highlights the active speaker. Company instructions remain configurable text; no unconfirmed route or placeholder was recorded.

The introduction and genuine-request conversation budgets were adjusted to fit the actual recordings while preserving the original scene totals and 240-second core budget. Learner actions remain untimed. Audio still needs editorial listening and sign-off; synchronized captions and a representative learner timing pilot remain production checks.
