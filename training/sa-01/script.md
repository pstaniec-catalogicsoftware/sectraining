# The message that cannot wait

SA-01 · Draft 0.2.0 · Narrated motion graphics and guided software simulation

Company instructions are inserted from the active company profile. Configuration fields must be resolved before production. Draft ElevenLabs recordings use Claire for the narrator, Mark for Alex, and Katie for Morgan. Recordings cover the narration and character dialogue; configurable company instructions remain readable on screen and in the transcript. Review the audio and policy wording before release.

## Learning objectives

- Recognise urgency, unexpected sensitive requests, and a departure from the normal process.
- Verify a sensitive request through an independently known channel before acting.
- Report concerns through the configured company process without waiting for proof.

## S01 The request

Core budget: 40 seconds. Learner actions wait without a timeout.

### S01.context A familiar name in your inbox

**Format:** motion. **Baseline budget:** 17 seconds.

**Narration**

Alex's team is getting a customer agreement ready for review. They normally share sensitive documents through the approved workspace, with access limited to the people who need it. Then an email arrives that looks like it's from Alex's manager, Morgan.

**Visual and interaction direction**

Animated SVG of a work laptop and agreement in a shared workspace. A message from Morgan arrives, followed by a clock. Motion runs once; reduced-motion mode shows the complete illustration.

**Next:** S01.message.

### S01.message Could you send me the file?

**Format:** email. **Baseline budget:** 23 seconds.

**Narration**

It looks like a routine request from a busy manager. The deadline is tight, and the message asks Alex to send the file directly instead of using the usual sharing process.

**Visual and interaction direction**

Enterprise-style email client with a blue app bar, folder navigation, message toolbar, sender details, recipient, timestamp, and PDF attachment. The preview is read-only; learner actions are below it.

**Message shown on screen**

From: Morgan Chen · Manager (morgan.chen@company.example)

To: Alex Rivera

Time: 9:42 AM

Subject: Agreement draft for the customer call

Hi Alex,

I'm heading into the customer call in ten minutes and need the latest draft of the agreement. The shared workspace isn't loading for me. Could you reply with the file attached?

I've attached a short note with the details for the call. My contact details are in the note if you need me.

Thanks,
Morgan

Attachment: Agreement review notes.pdf. Contact details are included in the attached note.

**Next:** S02.decision.


## S02 Pause before acting

Core budget: 40 seconds. Learner actions wait without a timeout.

### S02.decision What should Alex do next?

**Format:** decision. **Baseline budget:** 25 seconds.

**Narration**

Before Alex replies or opens the attachment, take a moment. What would you do next?

**Visual and interaction direction**

Message remains visible behind three large action buttons. Do not reveal the preferred answer before the learner chooses.

**Choice reply:** Reply and ask Morgan to confirm the request

Feedback and retry: A reply could go straight back to the person impersonating Morgan. Check through a separate contact route you already trust.

Next: remain on this step and choose again.

**Choice attachment:** Open the attached note to see what Morgan needs

Feedback and retry: The attachment comes with the same unverified request. Check with Morgan independently before opening it or sharing the file.

Next: remain on this step and choose again.

**Choice verify:** Check with Morgan using contact details you already trust

Preferred action: That's the right next step. Keep the document where it is while you check with Morgan through a separate, trusted route.

Next: S02.debrief.

### S02.debrief Check the request, not just the name

**Format:** motion. **Baseline budget:** 15 seconds.

**Narration**

A familiar name and a well-written message can make a request feel routine. Here, the reason to pause is the request to skip the usual sharing process. Let's check with Morgan through a separate, trusted route.

**Visual and interaction direction**

Animated SVG contrasts a familiar display name with an independently opened company directory. A connecting line draws toward the existing contact. No sender-authentication badge appears on the email.

**Next:** S03.route.


## S03 Verify and report

Core budget: 80 seconds. Learner actions wait without a timeout.

### S03.route Where would you look?

**Format:** route. **Baseline budget:** 20 seconds.

**Narration**

You want to check with Morgan. Where should you get the contact details?

**Visual and interaction direction**

Provide two equally prominent options: the separately opened trusted directory, or the contact details in the suspicious message.

**Choice message-contact:** Use the contact details in the email or attachment

Feedback and retry: Those details come from the same unverified source. They could lead back to the impersonator. Use an existing company contact instead.

Next: remain on this step and choose again.

**Choice trusted-directory:** Open {{directory.label}} separately

Preferred action: Yes. This gives you a contact route that doesn't depend on the email. {{directory.steps}}

Next: S03.directory.

### S03.directory Find Morgan's existing contact

**Format:** directory. **Baseline budget:** 15 seconds.

**Narration**

Use Morgan's existing directory entry to get in touch. Keep the document where it is while you check.

**Visual and interaction direction**

Directory entry for fictional manager Morgan Chen. No real phone number or external link; the call control is simulated.

**Directory entry**

Morgan Chen — Alex's manager. Existing entry in {{directory.label}}.

**Choice call-manager:** Contact Morgan using this directory entry

Preferred action: You're checking the request through the existing company contact, separately from the email.

Next: S03.call.

### S03.call That wasn't Morgan

**Format:** conversation. **Baseline budget:** 15 seconds.

**Narration**

Alex checks with Morgan before sending anything. The request wasn't theirs.

**Visual and interaction direction**

Animated SVG of two colleagues connected by a call, followed by readable dialogue cards. Decorative animation is hidden from assistive technology; the dialogue remains available as text and narration.

**Alex:** Hi Morgan. Did you just ask me to email you the agreement? The message says the workspace isn't loading.

**Morgan:** No, that wasn't me. Please don't send the file.

**Next:** S03.report.

### S03.report Report the message

**Format:** report. **Baseline budget:** 20 seconds.

**Narration**

Morgan didn't send it. Use your company's reporting process so the team can look into it. You can report a concern even if you're not sure it's an attack. If the main route isn't available, use the fallback.

**Visual and interaction direction**

Simulated reporting panel with configured primary route, fallback and evidence instructions. Show only fictional, minimal report facts.

**Configured instructions**

Primary: {{reporting.primary.label}}. {{reporting.primary.steps}}

Fallback: {{reporting.fallback.label}}. {{reporting.fallback.steps}}

Evidence: {{reporting.evidenceInstructions}}

**Fictional report facts**

I received a message asking me to email a customer agreement instead of using the shared workspace. I checked with Morgan through the company directory, and they said they hadn't sent it. I haven't shared the file.

**Choice delete-only:** Delete it without reporting

Feedback and retry: Deleting it alone won't alert the team that handles these concerns. Use the company reporting process.

Next: remain on this step and choose again.

**Choice report-primary:** Report through {{reporting.primary.label}}

Preferred action: Include the relevant facts and follow the reporting instructions. {{reporting.evidenceInstructions}}

Next: S03.confirm.

**Choice report-fallback:** If the main route is unavailable, use {{reporting.fallback.label}}

Preferred action: Use the fallback when the main reporting route is unavailable. {{reporting.fallback.steps}}

Next: S03.confirm.

### S03.confirm The concern is reported

**Format:** motion. **Baseline budget:** 10 seconds.

**Narration**

You've practised reporting the message. In a real situation, follow any instructions from the response team. No document has been shared.

**Visual and interaction direction**

Animated SVG shows a factual report moving toward a reporting inbox, followed by a check mark. This confirms the practice action without promising a response time.

**Next:** S04.request.


## S04 When urgency is genuine

Core budget: 50 seconds. Learner actions wait without a timeout.

### S04.request Another request, another deadline

**Format:** email. **Baseline budget:** 10 seconds.

**Narration**

Later that morning, Morgan needs the agreement for another call. There's still a deadline. How would you handle this request?

**Visual and interaction direction**

Same familiar sender styling. Avoid making legitimacy depend on the visual design or a green authenticity badge.

**Message shown on screen**

From: Morgan Chen · Manager (morgan.chen@company.example)

To: Alex Rivera

Time: 11:08 AM

Subject: Access to the agreement before 11:30

Hi Alex,

Could you give me access to the latest agreement draft in the shared workspace before our 11:30 customer call? The usual review permissions are fine.

Thanks,
Morgan

**Next:** S04.route.

### S04.route Make the same quick check

**Format:** route. **Baseline budget:** 10 seconds.

**Narration**

This is still a sensitive document. Check with Morgan through a contact route you already trust before sharing it.

**Visual and interaction direction**

Same contact-route choice pattern as the suspicious example.

**Choice assume-genuine:** Go ahead because the request looks normal

Feedback and retry: A familiar-looking message still needs checking. Contact Morgan through a route you already trust before sharing the document.

Next: remain on this step and choose again.

**Choice reject-urgency:** Decline because the request is urgent

Feedback and retry: Some urgent requests are genuine. Check with Morgan so the work can continue safely.

Next: remain on this step and choose again.

**Choice verify-again:** Contact Morgan through {{directory.label}} again

Preferred action: Use the existing contact route, separately from the new message.

Next: S04.call.

### S04.call This one is from Morgan

**Format:** conversation. **Baseline budget:** 15 seconds.

**Narration**

Morgan confirms the request through the existing contact route.

**Visual and interaction direction**

Reuse the verification conversation layout. No automatic document sharing.

**Alex:** Hi Morgan. Just checking, did you ask for access to the agreement for the 11:30 call?

**Morgan:** Yes, that's from me. Thanks for checking. Please use the usual workspace and permissions.

**Next:** S04.share.

### S04.share Carry on with the usual checks

**Format:** sharing. **Baseline budget:** 15 seconds.

**Narration**

Morgan has confirmed the request. You can carry on with the work, using the usual sharing process and checking who will have access.

**Visual and interaction direction**

Show verified request and an approved-workspace document card with recipient and permission review.

**Choice email-copy:** Email a copy now that you've confirmed who asked

Feedback and retry: Use the approved sharing process even after confirming the request. Check the recipient and permissions before you share.

Next: remain on this step and choose again.

**Choice approved-sharing:** Use {{sharing.label}} and review access and permissions

Preferred action: {{sharing.steps}} You've confirmed the request and kept the usual sharing controls in place.

Next: S05.recap.


## S05 Take it into your workday

Core budget: 30 seconds. Learner actions wait without a timeout.

### S05.recap Pause, check, and report

**Format:** recap. **Baseline budget:** 30 seconds.

**Narration**

When a request is unexpected or asks you to skip the usual process, pause. Check with the person using contact details you already trust, rather than details from the message. If something seems wrong, use the company reporting route. You don't need proof to raise a concern. SA-17, Report it early, even if you are unsure, walks through the reporting process.

**Visual and interaction direction**

Three SVG action icons enter once: pause, check with the person, report the concern. Configured reporting and fallback instructions remain readable below.

**Configured instructions**

Primary: {{reporting.primary.label}}. {{reporting.primary.steps}}

Fallback: {{reporting.fallback.label}}. {{reporting.fallback.steps}}

Evidence: {{reporting.evidenceInstructions}}

**Next:** assessment.

## Narration and animation notes

Use a calm, conversational delivery, with natural contractions and everyday workplace language. Pause narration when handing control to the learner. Include dialogue in captions and show important message and directory information as readable text.

SVG animations run once and settle within four seconds. Reduced-motion mode shows the complete artwork without animation. The illustrations are decorative; the same learning information remains in the narration and on-screen text.

The four-minute budget includes baseline reading and action time. Validate pacing with the configured company instructions and recorded narration before media lock.
