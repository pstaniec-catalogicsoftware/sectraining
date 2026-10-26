# SA 01 Platform Integration Contract

Draft for the custom learning platform. The local review player demonstrates lesson behaviour; it does not implement employee authentication, assignment administration, or authoritative completion evidence.

## Versioned delivery

Bind each assignment to a learner, lesson ID `SA-01`, lesson version, variant ID, company-profile version, policy references, due date, and adopted assessment/retry rules. An in-progress attempt stays bound to those versions. Publish a new version for policy changes; preserve existing records rather than silently rewriting historical instructions or results.

The review player deliberately restarts on a changed content/profile version and is only a local demonstration. Production needs explicit rules for finishing an older assignment, withdrawing it, or reassigning updated training.

## Company configuration

Use the fields in `company-profile.json` for organisation name, directory instructions, primary and fallback reporting instructions, evidence handling, sharing controls, review metadata, policy references, and passing percentage. These values populate scenes, feedback, assessment wording, and the transcript.

The current ElevenLabs recordings contain fixed narration and character dialogue only; configurable policy instructions remain readable text. Recorded voiceover cannot automatically acquire new policy wording. To speak company-specific instructions, add reviewed recordings bound to the profile version, with matching captions. Do not show one route while narrating another.

Deliver the local MP3 files and `media/voice/manifest.json` with the lesson. Preserve the cast and source-text checks, cancel playback on navigation and assessment entry, and reuse the same user-authorised audio element across consecutive clips. Changes to spoken text require replacement clips; no runtime ElevenLabs credentials are needed.

Require server-side approval of a profile before assigning the lesson. Keep profile editing and review controls outside the employee player. Check missing fields, version, named approver, review date, and approved policy references at publication. Configuration values are plain text; do not treat them as HTML or executable instructions.

## Minimum event fields

| Field | Meaning |
| --- | --- |
| `eventId` | Unique event identifier, used to make retries idempotent. |
| `eventType` | `lesson.started`, `practice.answered`, `lesson.core_completed`, `assessment.submitted`, or `lesson.completed`. |
| `assignmentId` | Server-issued assignment binding. |
| `lessonId`, `lessonVersion`, `variantId`, `profileVersion` | Exact material and company instructions delivered. |
| `sessionId`, `attemptId` | Server-issued session/assessment identifiers. |
| `nodeId` or `questionId` | Stable content identifier. |
| `choiceId` or `answers` | Submitted option identifiers; no sensitive document contents. |
| `clientOccurredAt` | Client timestamp for sequencing context; not an authoritative completion time. |
| `receivedAt` | Server timestamp supplied when the platform accepts the event. |

Derive employee identity from the authenticated server session. The browser must not choose which employee receives completion credit.

## Progress and assessment behaviour

- Save at every step/answer boundary, including pending practice feedback. Restore the same bound material and coherent narration/simulation position after reload.
- Make saving failures visible and retryable. Do not promise saved progress when persistence fails.
- Record unsafe practice choices for learning analysis without changing the assessment score. If tracking hints, record their use separately.
- The player submits stable option IDs. The server validates the question set and options against the bound version and scores from its answer key.
- Do not send answer keys or assessment rationales to an employee player until the relevant feedback policy allows them. The local review player is an authoring exception.
- Reject missing, duplicated, unknown, or out-of-scope question submissions; reject submissions for another learner's assignment.
- Require completion of the core path and a passing assessment before recording completion. Use server checks; client state alone is not evidence.
- Retain each assessment attempt, threshold, result, and remediation record. Retransmitted events must not create extra attempts or completion records.
- Enforce the adopted retry policy on the server. A passed session cannot be overwritten by a later failed submission.

## Evidence export

Export learner ID, assignment ID and date, due date, lesson/version/variant, profile version and policy mapping, start state/time, core completion, each assessment score and attempt, remediation, final completion state/time, and approved exceptions. Keep assignments without completion in the export. Reconcile annual participation and new-hire completion separately.

Define access and retention rules with the programme owner. Avoid recording real message bodies, contact lists, or sensitive customer documents as lesson telemetry.

## Production acceptance

Exercise assignment, start, interruption, resume, failed attempt, retry, passing completion, duplicate delivery, and revised-version handling with test identities. Reconcile an actual export against those actions. A local JSON download or a passing client-side quiz is not this platform acceptance check.
