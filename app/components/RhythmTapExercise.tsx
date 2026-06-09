import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import MetronomeAudio from '@utils/audioMetronome';
import SamplePlayer from '@utils/SamplePlayer';

type Props = {
  bpm: number;
  onComplete?: (score: number) => void;
};

const RhythmTapExercise: React.FC<Props> = ({ bpm, onComplete }) => {
  const [running, setRunning] = useState(false);
  const [taps, setTaps] = useState<number[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const metronomeRef = useRef<MetronomeAudio | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [feedback, setFeedback] = useState<string>('');

  const expectedInterval = 60000 / Math.max(20, Math.min(300, bpm));
  const tolerance = expectedInterval * 0.15; // stricter: 15% tolerance

  useEffect(() => {
    metronomeRef.current = new MetronomeAudio();
    metronomeRef.current.setBPM(bpm);
    return () => metronomeRef.current?.stop();
  }, [bpm]);

  const start = () => {
    setTaps([]);
    setFeedback('');
    // play 4-beat lead-in then start metronome
    try {
      const player = new SamplePlayer();
      player.playSequence([1,1,1,1], bpm).then(() => {
        startTimeRef.current = Date.now();
        setRunning(true);
        if (metronomeRef.current) metronomeRef.current.start();
      });
      // also set a timeout as fallback
      setTimeout(() => {
        if (!running) {
          startTimeRef.current = Date.now();
          setRunning(true);
          if (metronomeRef.current) metronomeRef.current.start();
        }
      }, (60000 / bpm) * 4 + 200);
    } catch (e) {
      startTimeRef.current = Date.now();
      setRunning(true);
      if (metronomeRef.current) metronomeRef.current.start();
    }
  };

  const stop = () => {
    setRunning(false);
    if (metronomeRef.current) {
      metronomeRef.current.stop();
    }
    evaluate();
  };

  const onTap = () => {
    if (!running) return;
    setTaps((prev) => [...prev, Date.now()]);
    setFeedback('✓ Tap recorded');

    // animate tap feedback
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    // clear feedback after 500ms
    setTimeout(() => setFeedback(''), 500);
  };

  const evaluate = () => {
    if (taps.length < 3) {
      Alert.alert('More taps needed', 'Tap at least 3 times to evaluate.');
      return;
    }

    // compute intervals
    const intervals: number[] = [];
    for (let i = 1; i < taps.length; i++) intervals.push(taps[i] - taps[i - 1]);

    // filter outliers for more robust evaluation
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const deviations = intervals.map((iv) => Math.abs(iv - avgInterval));
    const stdDev = Math.sqrt(deviations.reduce((a, b) => a + b, 0) / deviations.length);

    // stricter scoring: consistency relative to expected interval
    const consistency = Math.max(0, 1 - stdDev / expectedInterval);
    const accuracy = Math.max(
      0,
      1 - Math.abs(avgInterval - expectedInterval) / expectedInterval
    );

    // combined score with stricter thresholds
    const score = Math.round((consistency * 0.6 + accuracy * 0.4) * 100);

    if (onComplete) onComplete(score);

    let result = '';
    if (score >= 85) result = '🌟 Excellent timing!';
    else if (score >= 70) result = '👍 Good timing!';
    else if (score >= 50) result = '📈 Keep practicing!';
    else result = '🎯 Try again!';

    Alert.alert(
      'Tapping Evaluation',
      `${result}\n\nConsistency: ${Math.round(consistency * 100)}%\nAccuracy: ${Math.round(accuracy * 100)}%\nScore: ${score}%`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tapping Accuracy Exercise</Text>
      <Text style={styles.hint}>
        Tap along with the metronome beat. Stricter scoring requires consistency and accuracy.
      </Text>

      <Animated.View style={[styles.tapArea, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onTap} activeOpacity={0.9}>
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Text style={styles.tapText}>{running ? 'TAP' : 'Start and TAP'}</Text>
            {feedback && <Text style={styles.feedback}>{feedback}</Text>}
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={start} disabled={running}>
          <Text style={styles.btnText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#ff3b30' }]} onPress={stop} disabled={!running}>
          <Text style={[styles.btnText, { color: '#fff' }]}>Stop</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>
        {running ? `🎵 Keep tapping! (${taps.length} taps)` : `Taps recorded: ${taps.length}`}
      </Text>
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
  tapArea: {
    height: 120,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  tapText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
  },
  feedback: {
    fontSize: 14,
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
    backgroundColor: '#007AFF',
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

export default RhythmTapExercise;

