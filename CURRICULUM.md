oduol Curriculum — Complete Piano Learning Syllabus

Goal: provide a browser-first, self-contained curriculum that teaches a student from absolute beginner to confident sight-reader and pianist.

Core Modules

1. Note Reading
- Treble and Bass clefs
- Ledger lines
- Note naming and octave numbers
- Accidentals (sharps, flats, naturals)
- Intervals and key signatures

2. Rhythm & Meter
- Note durations (whole, half, quarter, eighth, sixteenth)
- Rests
- Time signatures (2/4, 3/4, 4/4, 6/8)
- Subdivision and counting
- Syncopation and common rhythmic patterns
- Metronome-based exercises

3. Scales & Key Signatures
- Major scales, natural/minor scales
- Circle of fifths and key signature recognition
- Scale practice exercises and visualizations

4. Chords & Harmony
- Triads (major, minor, diminished, augmented)
- Seventh chords and inversions
- Common chord progressions
- Basic harmonic analysis exercises

5. Sight-Reading & Sight-Playing
- Progressive sight-reading passages
- Eye-training exercises and timed tests

6. Ear Training
- Interval recognition
- Melody transcription (simple to complex)
- Chord quality recognition

7. Technique & Touch
- Hand position and posture
- Scales, arpeggios, Hanon-style exercises
- Articulation: legato, staccato

8. Repertoire & Practice
- Curated short pieces by level
- Practice planner (time, goals, repetition)
- Progress tracking and assessments

9. Performance Tools
- Metronome and click tracks
- Recording and playback
- MIDI in/out for controller input

10. Assessments & Progression
- Quizzes per module
- Automatic scoring and streaks
- Certificates or badges (optional export)

Implementation Notes
- The web app will progressively unlock modules.
- Each module includes lessons, interactive exercises, audio, and short quizzes.
- Prefer sample audio for realism; provide oscillator fallback for browsers without samples.
- Persist user progress in `localStorage`; optionally allow import/export (JSON).

Resources and Data
- Provide links to free sample packs, MIDI utilities, and recommended books in the app.

If you'd like, I can begin implementing Module 2 (Metronome & Rhythm) next, or add basic `localStorage` progress persistence. Which do you prefer?

Progress (implementation notes)
- Implemented: Module 2 — Metronome & basic rhythm tools (UI component and Web Audio utility).
- Implemented: Progress persistence service that uses `localStorage` on web and `AsyncStorage` on native.
- Implemented: Curriculum progress types and `zustand` store extension to track unlocked modules and lesson completions.

Next steps
- Integrate the `Metronome` UI into the app navigation (Home and Module pages).
- Add interactive rhythm exercises, timed sight-reading drills, and short quizzes per lesson.
- Add audio sample support and MIDI in/out for controller input.
- Add import/export progress (JSON) and certificate/badge generation.

If you want, I can continue by integrating the Metronome into the app navigation and building the first set of rhythm exercises.