# SA 01 Verification Record

Draft review player, lesson version 0.2.0, 26 October 2026.

## Automated behaviour checks

The initial test run against unimplemented engine functions failed all eleven tests. After implementation, all eleven tests passed. Checks cover unsafe-contact feedback and progression, feedback acknowledgement, the core-path prerequisite, option-ID scoring, configured thresholds, retained retries, incomplete/unknown answers, duplicate passing submissions, resume after a chosen verification step, changed content/profile versions, company-field substitution, and required policy approval fields.

Seven further regression checks initially failed and then passed after fixes to configured narration, speech controls and source-profile updates. That revision brought the suite to eighteen passing tests. Run `npm test` from this folder for the current result.

## Browser walkthrough

Checked the actual local player in the Codex in-app browser:

- Opened the narrated introduction, message, decision, trusted-directory route, manager conversation, report, legitimate request, sharing and recap screens.
- A reply-to-sender choice and a contact-number-from-message choice showed corrective feedback without allowing progression.
- Saved fictional company settings, then verified the configured directory, primary report route, fallback, evidence instructions and sharing route in the learner screens and assessment.
- Exercised the fallback reporting path and the genuine-urgency rejection feedback before continuing through verification and approved sharing.
- Started and paused browser narration, advanced through a practice action, and checked that subsequent narration controls returned to an active state. Paused recap narration and entered the assessment; playback controls cleared and narration was disabled for the quiz.
- Attempted an empty assessment; submission was rejected and focus moved to the first unanswered item.
- Submitted five incorrect answers; the player showed 0%, Attempt 1, feedback and a retry.
- Reloaded, retried with four correct answers, and reloaded again; the player showed 80%, Attempt 2, Passed, with correct answer feedback and the configured company wording.

These checks do not establish a complete screen-reader audit, mobile-device acceptance, audio quality review or production platform acceptance.

## Independent review

A separate reviewer found three important defects: omitted company instructions in narration, inconsistent pause/cancel behaviour across navigation, and saved preview profiles shadowing source-profile updates. Each was corrected with failing-then-passing regression checks. The reviewer also exercised the actual content path and found no additional important progression or content defect.

## Editorial checks

- The fourteen step budgets total 240 seconds and preserve the five original scene budgets of 40, 40, 80, 50, and 30 seconds.
- Core narration contains approximately 331 words, excluding on-screen messages and dialogue. Final pacing must be checked with a spoken read and learner pilot.
- All five assessment items use stable option IDs, a rationale, and an objective mapping. The key is a draft pending security review.
- Directory, reporting, fallback, evidence, and sharing instructions are configurable; policy values remain unconfirmed in the initial profile.

## Remaining production checks

- Editorial sign-off of the recorded voiceover and synchronized captions.
- Security review of content and active company profile.
- Screen-reader, keyboard-only, reduced-motion, zoom, and mobile testing in the production player.
- Identity, assignments, server-side scoring, attempt persistence, and evidence export in the custom platform.
- Representative learner pilot, timing review, and final release approval.

## Draft 0.2.0 visual and wording revision

Added four locally authored SVG scenes, three recap icons, and an enterprise mailbox with app bar, folder navigation on wider layouts, message toolbar, sender address, recipient, timestamp and attachment tile. Decorative graphics are hidden from assistive technology; learning information remains in text and narration. Motion runs once, settles within four seconds, and is disabled by the reduced-motion rule.

Revised emails, narration, dialogue, learner choices and assessment explanations to use natural workplace language. Refreshed script, transcript, storyboard and answer-key exports from the current content. The existing eighteen automated checks still pass. Browser review covered the updated message and decision screen at the actual side-panel width; wider-layout and assistive-technology acceptance remain production checks.

## ElevenLabs recorded audio revision

Generated and downloaded 18 clips: fourteen narrator segments and four actor lines. The manifest matches every spoken line and role in the lesson source. All 18 MP3 files decoded successfully in the local media inspector; actual durations were within 0.2 seconds of manifest metadata. Selected audio totals 159.68 seconds. Each complete scene queue fits its revised step budget; the five scene totals still sum to 240 seconds.

Nine recorded-audio checks cover speaking order, source-text and role mismatch, missing clips, pause/resume, cancellation, delayed playback promises, load failure, reuse of the authorised media element, and stale clip callbacks. The new behaviour was first exercised with failing checks, then implemented. The complete suite passes 27 tests.

An independent code review identified a browser compatibility risk from creating a new audio element for each speaker. The controller now reuses one element and guards old clip callbacks. A failing per-element permission regression test passes after the fix. This is not an actual Safari acceptance test.

The focused follow-up review confirmed the fix and found no remaining important issue; all 27 tests passed in that review as well.

Browser checks in the in-app preview confirmed Claire’s narrator status, the automatic transition to Alex/Mark and Morgan/Katie, the matching speaker highlight, and pause/resume during Alex’s line. The conversation returned to idle when finished. A preview screenshot is saved as `preview-voice.png`. These checks establish playback controls and sequencing, not editorial approval of pronunciation or performance.

Fixed narration and dialogue use recordings. Configured company instructions, feedback, emails and assessment remain readable text, replacing the earlier all-screen browser speech behaviour. Production accessibility review must cover this distinction.
