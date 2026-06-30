import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import MetronomeAudio from 'frontend/utils/audioMetronome';
import SamplePlayer from 'frontend/utils/SamplePlayer';

type Props = {
  onComplete?: (score: number) => void;
};

interface Pattern {
  beats: number[];
  name: string;
  symbol: string;
}

const SAMPLE_PATTERNS: Pattern[] = [
  { beats: [1, 1, 1, 1], name: 'Four Quarters', symbol: '♩ ♩ ♩ ♩' },
  { beats: [0.5, 0.5, 1, 2], name: 'Eighths, Quarter, Half', symbol: '♪ ♪ ♩ 𝅗𝅥' },
  { beats: [1.5, 0.5, 1, 1], name: 'Dotted Quarter, Eighth, Quarters', symbol: '♩. ♪ ♩ ♩' },
  { beats: [2, 1, 1], name: 'Half, Two Quarters', symbol: '𝅗𝅥 ♩ ♩' },
];

const PatternMatchExercise: React.FC<Props> = ({ onComplete }) => {
  const pattern = useMemo(() => SAMPLE_PATTERNS[Math.floor(Math.random() * SAMPLE_PATTERNS.length)], []);
  const [taps, setTaps] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const [showingPattern, setShowingPattern] = useState(false);
  const scaleAnim = useMemo(() => new Animated.Value(1), []);
  const [feedback, setFeedback] = useState<string>('');

  const metronome = useMemo(() => new MetronomeAudio(), []);

  const playPattern = async () => {
    setShowingPattern(true);
    const baseBeat = 60000 / 80; // use fixed 80 BPM for playback

    // play audible sequence if possible
    try {
      const player = new SamplePlayer();
      // play sequence in parallel with visual animation
      player.playSequence(pattern.beats, 80);
    } catch (e) {
      // ignore
    }

    for (let i = 0; i < pattern.beats.length; i++) {
      const duration = pattern.beats[i];
      // simulate visual beat with animation
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();

      // wait for beat duration
      await new Promise((resolve) => setTimeout(resolve, baseBeat * duration));
    }
    setShowingPattern(false);
  };

  const start = () => {
    setTaps([]);
    setFeedback('');
    setStarted(true);
  };

  const tap = () => {
    if (!started) return;
    setTaps((p) => [...p, Date.now()]);
    setFeedback('✓ Tap');
    setTimeout(() => setFeedback(''), 300);

    // brief animation feedback
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.15, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const submit = () => {
    if (taps.length < 2) {
      Alert.alert('Need more taps', 'Please tap the pattern at least twice.');
      return;
    }

    // convert taps to relative durations
    const intervals: number[] = [];
    for (let i = 1; i < taps.length; i++) intervals.push(taps[i] - taps[i - 1]);
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const beats = intervals.map((iv) => Math.round((iv / avg) * 100) / 100);

    // stricter matching: compare beat counts and check ratio closeness
    const expected = pattern.beats;
    const beatCountMatch = beats.length === expected.length ? 1 : Math.max(0, 1 - Math.abs(beats.length - expected.length) * 0.3);

    // compute ratio matching (stricter: penalize larger deviations)
    let ratioScore = 0;
    if (beats.length === expected.length) {
      const deviations = beats.map((b, i) => Math.abs(b - expected[i]) / expected[i]);
      const avgDeviation = deviations.reduce((a, d) => a + d, 0) / deviations.length;
      ratioScore = Math.max(0, 1 - avgDeviation * 1.5); // stricter: 1.5x penalty
    } else {
      ratioScore = 0.3; // low score if count doesn't match
    }

    // combined score
    const score = Math.round((beatCountMatch * 0.3 + ratioScore * 0.7) * 100);

    if (onComplete) onComplete(score);

    let result = '';
    if (score >= 85) result = '🌟 Perfect rhythm!';
    else if (score >= 70) result = '👍 Great match!';
    else if (score >= 50) result = '📈 Getting closer!';
    else result = '🎯 Try again!';

    Alert.alert('Pattern Result', `${result}\n\nScore: ${score}%\nExpected: ${expected.join(', ')}\nYour taps: ${beats.join(', ')}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rhythmic Pattern Matching</Text>
      <Text style={styles.hint}>Listen to the pattern, then tap it back. Scoring is stricter.</Text>

      <Animated.View style={[styles.patternBox, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.patternName}>{pattern.name}</Text>
        <Text style={styles.patternSymbol}>{pattern.symbol}</Text>
      </Animated.View>

      <TouchableOpacity style={styles.playButton} onPress={playPattern} disabled={showingPattern}>
        <Text style={styles.playButtonText}>{showingPattern ? '🎵 Playing...' : '▶️ Play Pattern'}</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.tapArea, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={tap} activeOpacity={0.9}>
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Text style={styles.tapText}>{started ? 'TAP PATTERN' : 'Start and TAP'}</Text>
            {feedback && <Text style={styles.feedback}>{feedback}</Text>}
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={start} disabled={started}>
          <Text style={styles.btnText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#007AFF' }]} onPress={submit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>{started ? `Taps: ${taps.length}` : 'Press Start, then tap the pattern'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  hint: {
    color: '#666',
    marginBottom: 8,
  },
  patternBox: {
    padding: 12,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  patternName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  patternSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  playButton: {
    backgroundColor: '#34C759',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  tapArea: {
    height: 100,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  tapText: {
    fontSize: 18,
    fontWeight: '800',
  },
  feedback: {
    fontSize: 12,
    color: '#10a050',
    fontWeight: '600',
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
  note: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
});

export default PatternMatchExercise;

