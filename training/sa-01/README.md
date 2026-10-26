# SA 01 Training Review

This working draft combines narrated scenes, guided verification and reporting practice, and a five-question assessment. Open the review player through a local web server, then use **Company settings** to configure directory, reporting, fallback, sharing, and scoring instructions.

The preview uses recorded ElevenLabs voices, animated SVG illustrations, and an enterprise-style email interface. Claire narrates; Mark plays Alex and Katie plays Morgan. Conversations switch voices and highlight the current speaker. Progress is saved locally, and results can be downloaded for review. Audio sign-off, timed captions, security approval, assistive-technology testing, and platform integration remain before employee release.

## Review materials

- [Detailed script](script.md)
- [Storyboard](storyboard.csv)
- [Transcript](transcript.md)
- [Assessment and answer key](assessment-review.md)
- [Assessment CSV](assessment.csv)
- [Company profile](company-profile.json)
- [Production decisions and source references](production-decisions.md)
- [Platform integration contract](platform-contract.md)
- [Verification record](qa.md)

## Run the local preview

From this directory:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765`. This is a local review server, not the employee delivery platform. Keep it bound to localhost.

Run the automated checks with `npm test`. No package installation is required.

## Configure a company

Edit `company-profile.json`, or use **Company settings** in the review player and download the resulting profile. Player edits remain on that browser until incorporated into the profile file. Saving settings begins a new local session and invalidates recorded approval for the edited profile.

The source profile leaves company instructions blank. Missing values are shown as configuration prompts during internal review. `validateProfile` reports missing policy inputs and approval; it is a readiness check, not access control. Production deployment must enforce approval and versioning on the server.

## Content maintenance

`source/lesson.json` contains the editable draft narration, on-screen messages, choices, feedback, transitions, and assessment key. The Markdown and CSV files are review exports of draft 0.2.0. If the source content changes, update those exports before requesting a new review.

The local review player carries the answer key for convenient review and local scoring. The production platform must provide its own authoritative assessment and completion handling described in the integration contract.

## Recorded voices

Use **Listen to this scene** to start playback, then pause, resume, or stop. The 18 local MP3 clips contain about 2 minutes 40 seconds of speech; learner reading and practice fill the remaining core budget. Each scene waits for the learner to continue.

`media/voice/manifest.json` records the cast, exact spoken text, duration, provider model, and generation IDs. The player sequences these files without contacting ElevenLabs or exposing an API key. A changed or missing line disables that scene’s recording until refreshed, leaving the readable lesson available.

Only fixed narration and character dialogue are recorded. Emails, feedback, assessment, and configurable directory/reporting/sharing instructions remain readable text. These company details must be included in the accessibility and captioning review; recording them later requires a reviewed, versioned company-specific segment.
