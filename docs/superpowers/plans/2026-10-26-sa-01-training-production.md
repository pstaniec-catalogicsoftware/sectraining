# SA 01 Phishing Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a reviewed, accessible phishing foundation lesson combining narrated motion graphics with guided practice in independent verification and reporting.

**Architecture:** Use a single lesson player containing short narrated scenes and simulated application screens. Pause narration for learner actions, give immediate corrective feedback, and reconverge branches on the approved process. Deliver the assessment and completion record through the selected learning platform.

**Tech Stack:** Custom browser module using HTML, CSS and JavaScript modules, versioned lesson JSON, and a versioned company-profile JSON. The local review uses browser speech and local storage. Final media, authenticated delivery, server assessment, persistence and evidence export are production integrations; see `training/sa-01/platform-contract.md`. No new licence or platform purchase is authorized by this plan.

**Spec:** [SA 01 Phishing Foundation Production Design](../specs/2026-10-26-sa-01-training-design.md). Read it with this plan. Proposed production details remain subject to review.

## Global Constraints

- The core lesson targets four minutes, excluding assessment and retries.
- Timing is a baseline content budget, not a learner countdown.
- Exclude technical email-header analysis.
- Start with one fixed document-request variant.
- No live document sharing, external messages, or live reports occur in the simulation.
- Keep practice unscored.
- Treat reporting as appropriate under uncertainty.
- Do not generate or randomize policy wording, correct actions, or unreviewed scenarios at runtime.
- Placeholders can appear in internal drafts but block publication.
- Store assignment and completion separately.

## Review Focus

1. A learner chooses contact details from the suspicious message: feedback must explain why that route is not independent, with a chance to choose again. Covered in Tasks 3 and 5.
2. A genuine urgent request is confirmed: the learner proceeds through approved sharing controls rather than rejecting all urgency or treating verification as blanket permission. Covered in Tasks 3 and 5.
3. A learner uses keyboard, screen reader, muted audio, or reduced motion: essential information and assessment actions remain available. Covered in Tasks 2 and 7.
4. A learner closes or refreshes during the transition from narration to simulation: resume restores a coherent position without recording false completion. Covered in Tasks 2 and 7.
5. A learner fails and retries, or a lesson is revised: exported records preserve the relevant attempt and version according to the approved evidence rules. Covered in Tasks 6 and 7.

## Deliverable structure

Create these production materials during execution, not as empty files now. Keep any native authoring source alongside them in `training/sa-01/source/`.

| Location | Responsibility |
| --- | --- |
| `training/sa-01/production-decisions.md` | Named owners, company policy inputs, platform decision, metadata, and review approvals. |
| `training/sa-01/script.md` | Narration, message text, choices, hints, and all feedback, identified by scene. |
| `training/sa-01/storyboard.csv` | Scene ID, baseline duration, visual, audio, learner action, state transition, accessibility text, and asset reference. |
| `training/sa-01/source/` | Editable lesson, animation, and illustration source files. |
| `training/sa-01/media/` | Approved graphics and scene-based narration clips. |
| `training/sa-01/captions/` | Caption files matching the exported narration clips. |
| `training/sa-01/transcript.md` | Complete readable lesson transcript, with essential visual descriptions. |
| `training/sa-01/assessment.csv` | Question ID, objective, prompt, options, correct option ID, rationale, and reviewed equivalent item IDs. |
| `training/sa-01/qa.md` | Functional, accessibility, policy, platform, and pilot results with issue resolution. |
| `training/sa-01/evidence/` | Restricted pilot export, reconciliation, approval record, and version manifest; apply company access and retention rules. |
| `training/sa-01/release/` | Versioned distributable and release notes. |

Use stable scene IDs `S01` through `S05`, assessment IDs `Q01` through `Q05`, lesson ID `SA-01`, and initial internal variant ID `document-email-01`. Record the release version in the platform and manifest. A platform's native course identifier may differ; document its mapping and update behaviour.

## Production sequence

Update 26 October 2026: the user authorised work, confirmed a custom platform, and requested configurable reporting. A local review player, draft script, fourteen-step storyboard, transcript, five-item assessment key, company profile and platform contract now provide concrete review materials. Company-policy approval, final media, accessibility acceptance, learner pilot, and production platform integration remain open. The checkboxes below track the full production plan, not merely completion of the local draft.

Planning estimate: approximately 10–15 working days for the first lesson, with one learning-content producer, motion graphics/interaction capability, an LMS administrator, a security reviewer, and an accessibility reviewer available as needed. These are roles, not necessarily separate people. Review delays and new platform integration extend elapsed time. Start counting after ownership and access are available; this is not an agreed delivery commitment.

### Task 1: Resolve company policy inputs

**Owner:** Security owner, supported by the learning producer.

**Files:** Create `training/sa-01/production-decisions.md`.

**Consumes:** The original scope, the production design, current policies, and SA-17 reporting instructions.

**Produces:** Approved verification, reporting, sharing, and fallback instructions; named reviewers; content metadata.

- [ ] Obtain the exact trusted-directory route and what counts as an independent contact channel.
- [ ] Obtain the approved reporting action and fallback, including what to do when legitimacy is uncertain.
- [ ] Obtain sensitive-document sharing rules and the policy references that support the script.
- [ ] Assign the content owner, security approver, platform administrator, review date, and coverage tags.
- [ ] Have the security owner check the proposed suspicious and legitimate-request outcomes against those rules. Record accepted wording and unresolved issues.

**Acceptance:** No policy instruction needed for the lesson is left to the animator or developer to invent. Any unresolved instruction has an owner and blocks release.

### Task 2: Validate the delivery route

**Owner:** Learning producer and LMS administrator.

**Files:** Update `training/sa-01/production-decisions.md`; record results in `training/sa-01/qa.md`; retain the technical sample in `training/sa-01/source/`.

**Consumes:** Available tools, LMS access, supported delivery formats, and evidence requirements from the design.

**Produces:** Selected authoring route, publishing settings, evidence-field mapping, and a verified technical sample.

- [ ] Inventory the existing learning platform and authoring access; select a candidate route that can support the required controls and reporting.
- [ ] Build a disposable sample containing one narrated scene, a pause for a simulated directory action, and one scored question. This is a production compatibility sample, not the finished lesson.
- [ ] Upload the sample to the actual learning platform and complete it with a test learner account.
- [ ] Check keyboard operation, accessible control labels, captions, muted playback, narration pause/resume, browser refresh, and close/relaunch behaviour.
- [ ] Export the test result and map required evidence fields to their actual location in the platform, manifest, or reconciliation process.
- [ ] Record the selected route and any release-blocking limitations. Resolve missing completion, version, or retry evidence before full production.

**Acceptance:** The chosen route supports the essential interaction, accessibility, resume, and evidence requirements in the actual delivery environment.

### Task 3: Produce the script and storyboard

**Owner:** Learning producer; security reviewer approves wording.

**Files:** Create `training/sa-01/script.md` and `training/sa-01/storyboard.csv`.

**Consumes:** Task 1's approved policy text, Task 2's delivery constraints, and the five-scene design.

**Produces:** A timed script, complete interaction map, and approved storyboard for S01–S05.

- [ ] Write narration, on-screen text, and visuals for the five scenes using the 40/40/80/50/30-second baseline budgets.
- [ ] Write the suspicious message and contrasting legitimate message; make the normal sharing process clear before assessing a departure from it.
- [ ] Specify the reply, attachment, and verification choices, with short feedback and a rewind for unsafe choices.
- [ ] Specify a meaningful contact-route choice: separately opened trusted directory versus a number or link supplied in the suspicious message. Explain why the latter is not independent.
- [ ] Script the denied-request reporting action and the confirmed-request approved-sharing action, including all incorrect choices and optional hints.
- [ ] Read the narration aloud against a paper walkthrough, then adjust pacing without imposing time limits on learner actions.
- [ ] Obtain security approval of all factual claims, choices, feedback, reporting instructions, and the SA-17 reference before final media production.

**Acceptance:** Every interaction has an entry state, action, feedback, and next state; neither the producer nor the learner must guess the correct policy route.

### Task 4: Produce narration and motion graphics

**Owner:** Motion graphics producer and narrator; roles may be combined.

**Files:** Create assets in `training/sa-01/source/`, `training/sa-01/media/`, and `training/sa-01/captions/`; create `training/sa-01/transcript.md`.

**Consumes:** Task 3's approved scene IDs, narration, storyboard, and accessible descriptions.

**Produces:** Editable sources, approved media, matching captions, transcript, and reduced-motion presentation assets.

- [ ] Establish one visual style for message cards, characters, callouts, directory screens, reporting confirmation, and the recap.
- [ ] Produce a rough animation with temporary narration and check legibility at the intended screen sizes before polishing.
- [ ] Record final narration only after script approval; use separately replayable scene clips and consistent audio levels.
- [ ] Export motion graphics without burning essential interface text into images as the only readable representation.
- [ ] Create and check captions against final audio; complete the transcript with essential visual descriptions.
- [ ] Review the complete media sequence for pacing and the handoff into each simulation state.

**Acceptance:** Media matches the approved script, essential content works without audio or animation, and source assets remain editable.

### Task 5: Assemble the guided simulation

**Owner:** Interaction producer.

**Files:** Create the editable lesson in `training/sa-01/source/`; update `training/sa-01/qa.md`.

**Consumes:** The approved storyboard, Task 4's assets, and Task 2's authoring route.

**Produces:** A complete unscored practice flow with coherent narration transitions.

- [ ] Assemble S01–S05 in one player with clear pause, replay, mute, captions, and navigation controls.
- [ ] Build only the application controls needed to read, verify, report, and use the approved sharing process. Make simulated action status explicit.
- [ ] Implement all approved wrong-choice feedback and return paths; preserve a chance to decide before revealing the preferred answer.
- [ ] Walk through independent verification in the suspicious case, reporting under uncertainty, and verified legitimate sharing.
- [ ] Check that hints are available, practice mistakes do not affect the assessment score, and no interaction sends a real message, report, or document.
- [ ] Check every storyboard branch, including repeated wrong choices and narration replay around an interaction.

**Acceptance:** Both suspicious and genuine urgency lead through independent verification; all branches resolve without dead ends or unintended actions.

### Task 6: Build assessment and completion rules

**Owner:** Learning producer, security reviewer, and LMS administrator.

**Files:** Create `training/sa-01/assessment.csv`; update the lesson source and `training/sa-01/production-decisions.md`.

**Consumes:** Learning objectives, approved policy instructions, the delivery route, and adopted scoring rules.

**Produces:** Five accessible reviewed questions, answer key, feedback, retry configuration, and completion mapping.

- [ ] Write Q01 process bypass, Q02 independent contact route, Q03 uncertainty and reporting, Q04 legitimate urgency, and Q05 transfer to collaboration chat.
- [ ] Give every question one defensible correct answer, meaningful distractors, a rationale, and an objective mapping; have security review the key.
- [ ] Confirm the passing threshold and retry policy. If 80% is adopted, set five equally weighted items to require four correct.
- [ ] Configure completion to require the core learning path and a passing assessment; prevent a video end or an unscored practice choice from recording a pass.
- [ ] Verify failed, passed, resumed, and retried attempts, including a learner who reaches the pass threshold before completing the core path.
- [ ] Confirm that question reordering preserves correct-option IDs and that any alternate retry items are approved and equivalent.

**Acceptance:** The published rules match the adopted programme rules; completion and score reflect the required learning and assessment conditions.

### Task 7: Verify, pilot, and release

**Owner:** Learning producer, LMS administrator, accessibility reviewer, security owner, and programme owner.

**Files:** Complete `training/sa-01/qa.md`; create restricted pilot evidence and a version manifest in `training/sa-01/evidence/`; produce `training/sa-01/release/`.

**Consumes:** The assembled lesson, assessment, final assets, adopted rules, and evidence mapping.

**Produces:** Tested release package, resolved pilot findings, approved metadata, and reconciled completion evidence.

- [ ] Verify all correct and incorrect paths against the storyboard and approved policy text in the actual platform.
- [ ] Test keyboard-only and screen-reader use, muted audio, captions, reduced motion, zoom, and intended desktop/mobile layouts; resolve barriers to essential actions.
- [ ] Test refresh, close/relaunch, interrupted audio, completion boundary conditions, failed attempts, retries, and the handling of a revised lesson version.
- [ ] Pilot with approximately five representative learners, including someone using accessibility features where practicable; observe the contact-route choice without coaching it.
- [ ] Measure baseline duration separately from learner thinking and assessment time; collect confusing controls, incorrect reasoning, and unclear policy wording.
- [ ] Resolve findings and rerun the checks affected by each change.
- [ ] Export actual pilot results and reconcile assignment, due date, status, score, attempts, remediation, lesson/version/variant, and completion date against the known test actions. Restrict learner data according to company policy.
- [ ] Record final security/content approval, owner, release version, review date, policy references, coverage tags, and platform course mapping.
- [ ] Publish to the intended cohort only after programme-owner authorization; archive the approved sources, distributable, review record, and evidence mapping together.

**Acceptance:** No unresolved policy placeholder or essential accessibility barrier remains; pilot exports reconcile; final approval is recorded; the distributable matches the approved version.

## First lesson and reusable foundation

Build once: narration-to-simulation controls, caption and transcript conventions, simulation visual components, feedback patterns, assessment configuration, version manifest, and QA checklist. After the base lesson is accepted, reuse these for other foundation lessons. Add controlled variants only through a separate content review and retain the actual variant delivered.

## Plan review

The user authorised execution and selected a custom platform. Review the draft script and player before final media production, configure and review company instructions before employee release, and complete platform acceptance before treating any record as official employee completion. No launch date or publication approval is implied.
