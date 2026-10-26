# SA 01 Phishing Foundation Production Design

Status: Working draft. Prepared 26 October 2026. The user selected the format and authorised work to begin. Content and policy approval are still required before employee release.

## Intent and scope

Produce Catalogic's SA-01 foundation lesson using narrated motion graphics and a guided software simulation. Employees should identify urgency, unexpected sensitive requests, and departures from normal process; verify through an independently known contact route before acting; and report concerns through the approved mechanism without needing proof of malice.

The core lesson targets four minutes, excluding assessment and retries. Timing is a baseline content budget, not a learner countdown. Reading, choices, assistance, and accessibility needs can extend actual time. Exclude technical email-header analysis.

## Selected approach

The user selected narrated motion graphics combined with guided software simulation. Motion graphics establish context, explain feedback, and recap the lesson. The learner takes control in a simulated inbox, trusted directory, verification conversation, and reporting workflow. Both media sit in one lesson player; narration pauses for decisions and resumes after the learner advances.

Alternatives discussed were animated video with a quiz, illustrated branching lessons, and a complete software simulation. The selected combination provides storytelling and practical action without requiring every scene to be fully animated or every application feature to be reproduced.

## Scenario and timing

| Baseline time | Narrated content | Learner action |
| --- | --- | --- |
| 0:00–0:40 | Introduce Alex, a sensitive document request apparently from a manager, urgency, and a request that bypasses the normal sharing process. | Read the clearly marked fictional message. |
| 0:40–1:20 | Freeze before action; explain feedback after the choice. Familiar names, branding, and correct grammar do not prove legitimacy. | Choose reply, open attachment, or verify independently. Unsafe choices receive a short explanation and rewind before the risky action. |
| 1:20–2:40 | Briefly introduce the trusted-directory route; reveal that the manager did not send the message. | Open the trusted directory separately, choose the existing manager contact rather than contact details supplied in the message, complete the guided verification, then practise the approved reporting action. |
| 2:40–3:30 | Introduce a genuine urgent request and show successful confirmation. | Verify independently again, then select the approved sharing process. Verification does not replace access and handling rules. |
| 3:30–4:00 | Recap pause, verify independently, report; introduce SA-17. | Review the actual approved reporting route and finish the core lesson. |

Start with one fixed document-request variant. Payroll, customer-export, contract, and collaboration-chat variants come after the base version is reviewed. Do not generate or randomize policy wording, correct actions, or unreviewed scenarios at runtime.

## Interaction and accessibility rules

- Use fictional people, contact details, documents, and messages. No live document sharing, external messages, or live reports occur in the simulation.
- Give the learner meaningful choices before showing the preferred action. After an incorrect choice, explain why it is unsafe and let the learner try again.
- Keep practice unscored. Offer a clearly labelled hint after difficulty and record assistance separately if the platform supports it.
- Treat reporting as appropriate under uncertainty. Do not require the learner to establish malicious intent.
- Keep all branches short and reconverge on the same approved sequence. Do not imply that opening any attachment necessarily causes a compromise.
- Mark the environment as a training simulation. Provide keyboard-operable controls, visible focus, readable message text, captions, a transcript, reduced-motion presentation, and meaningful text for essential visual information.
- Provide narrated information in text and visual information in accessible text. Avoid timed choices, colour-only cues, drag-only actions, or audio-only clues. Pause, replay, mute, and resume must work across the narration-to-simulation transitions.
- Simulation action labels must reflect Catalogic's approved process. A transcript alone is not an accessible replacement for the interactive assessment.

## Assessment and evidence

Produce five reviewed, equally weighted questions covering process bypass, an independently known contact route, reporting uncertainty, a verified genuine urgent request, and a transfer case in collaboration chat. Each answer needs a rationale and objective mapping. Assess action rather than character names or incidental story details.

The programme's proposed 80% threshold would mean four of five correct. The security owner must adopt the threshold and retry rules before publication. Proposed retry behaviour is explanatory feedback, focused review of missed objectives, and another attempt using approved equivalent items or reordered options; preserve each attempt in the evidence record where supported.

Store assignment and completion separately. Required evidence includes learner identity, assignment and due date, started/completed state, assessment score, attempts, remediation, lesson ID and version, approved variant ID, and completion date. Record any randomized selection explicitly. Do not assume a package format automatically exposes every field in the platform's reports.

## Production decisions and dependencies

The user confirmed that the organisation will build its own platform. Develop this lesson as a browser module with separate content, company configuration, progression/scoring logic, and a player. The initial local review uses browser speech and local progress. Define the identity, assignment, server scoring, persistence, and evidence contract for the production platform; these services are not supplied by the local review player.

The user also directed that reporting be configurable. Store the primary route, fallback, evidence submission instructions, trusted directory, sharing process, scoring threshold, policy references, and review metadata in a versioned company profile. Apply the active values consistently to visible content, narration, feedback, transcript, and assessment. An unreviewed profile remains available for internal review but must not be assigned to employees as approved policy.

Security must supply the reporting mechanism and fallback, trusted-directory route, approved sensitive-request verification and sharing rules, policy references, and the relationship to SA-17. Placeholders can appear in internal drafts but block publication. Assign a named content owner, version, review date, and coverage tags before release.

## Acceptance

The learner makes an independent-verification choice in both suspicious and legitimate urgent cases; sees that uncertainty is enough to report; and follows the reviewed company process. Incorrect branches, accessible use, interruption/resume, pass/fail, retries, and exported evidence work in the actual learning platform. Release requires security approval of the final wording and a reconciled pilot completion export.

## Programme references

- [Programme plan and scope](https://app.notion.com/p/40419c4d5f3e810b8549e5a1bec8aba0)
- [Assignment rules and coverage](https://app.notion.com/p/40419c4d5f3e81ea8aefdd0003d8efed)
