import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import MetronomeAudio from 'frontend/utils/audioMetronome';

const Metronome = () => {
  const [bpm, setBpm] = useState<number>(80);
  const [isRunning, setIsRunning] = useState(false);
  const [subdivision, setSubdivision] = useState<number>(1);
  const audioRef = useRef<MetronomeAudio | null>(null);

  useEffect(() => {
    audioRef.current = new MetronomeAudio();
    return () => audioRef.current?.stop();
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.setBPM(bpm);
  }, [bpm]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.setSubdivision(subdivision);
  }, [subdivision]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isRunning) {
      audioRef.current.stop();
      setIsRunning(false);
    } else {
      audioRef.current.start();
      setIsRunning(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metronome</Text>
      <View style={styles.row}>
        <Text style={styles.label}>BPM</Text>
        <TextInput
          style={styles.input}
          value={String(bpm)}
          keyboardType="numeric"
          onChangeText={(t) => {
            const v = parseInt(t || '0', 10);
            if (!Number.isNaN(v)) setBpm(v);
          }}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Subdivision</Text>
        <TextInput
          style={styles.input}
          value={String(subdivision)}
          keyboardType="numeric"
          onChangeText={(t) => {
            const v = parseInt(t || '1', 10);
            if (!Number.isNaN(v)) setSubdivision(Math.max(1, v));
          }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Tip: use an even BPM and 1/2/4 subdivisions.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  label: {
    width: 100,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 6,
    minWidth: 80,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  hint: {
    marginTop: 8,
    color: '#666',
  },
});

export default Metronome;
