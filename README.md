<<<<<<< HEAD
oduol — Learn Piano & Read Music

oduol is a progressive, browser-based learning app that teaches how to read musical notation, develop rhythm and ear, and apply those skills at the piano. This repository contains a minimal, extensible starter with:

- An interactive staff that shows notes
- On-screen piano keyboard (white + optional black keys)
- Audio playback with sample-file support and WebAudio oscillator fallback
- Levels, scoring and simple lessons
- Responsive layout for mobile and desktop

Files
- [index.html](index.html)
- [styles.css](styles.css)
- [app.js](app.js)
- [CURRICULUM.md](CURRICULUM.md)

Run locally (Python 3 simple server)

```powershell
cd "c:\Users\rogol\New folder"
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Adding piano samples
- Create a `samples/` folder next to `index.html` and add MP3/OGG files named by note, e.g. `C4.mp3`, `C#4.mp3`, `D4.mp3`.
- The app will try to load `samples/<NOTE>.mp3` and use samples when available; otherwise it uses a generated tone.

Curriculum & features
- See `CURRICULUM.md` for the full syllabus the app aims to cover. The document lists modules (note reading, rhythm/metronome, scales, chords, ear training, sight-reading, technique, repertoire, practice scheduling and assessments).

Next steps you can ask me to implement
- Add real piano sample files or a downloader for free sample packs
- Implement a metronome + rhythm exercises
- Add MIDI input, recording and playback
- Persist progress to `localStorage` and add user profiles
- Add lesson progression, quizzes and graded assessments

If you want, I can start by adding the metronome and rhythm lessons or include a small set of sample audio files into `samples/`.
=======
# oduol
>>>>>>> 294795e795aac5a349cb6209e705bf305ddb5d3a
