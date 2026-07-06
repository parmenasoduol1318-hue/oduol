// components/forms/FeedbackForm.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "../common/AppButton";
import AppInput from "../common/AppInput";
import Colors from "../../constants/colors";
import client from "../../services/api/client";

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitFeedback = async () => {
    setError("");
    setSuccess("");

    if (!feedback.trim()) {
      setError("Please enter your feedback.");
      return;
    }

    try {
      setLoading(true);

      await client.post("/feedback", {
        rating,
        feedback: feedback.trim(),
      });

      setSuccess(
        "Thank you! Your feedback has been submitted."
      );

      setFeedback("");
      setRating(5);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to submit feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Rate your experience
      </Text>

      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
          >
            <Ionicons
              name={
                star <= rating
                  ? "star"
                  : "star-outline"
              }
              size={34}
              color="#FACC15"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      <AppInput
        label="Feedback"
        placeholder="Tell us how we can improve SwiftReply..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        style={styles.feedbackInput}
        required
      />

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {!!success && (
        <Text style={styles.success}>
          {success}
        </Text>
      )}

      <AppButton
        title="Submit Feedback"
        icon="paper-plane-outline"
        loading={loading}
        onPress={submitFeedback}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },

  star: {
    marginHorizontal: 5,
  },

  feedbackInput: {
    minHeight: 140,
    paddingTop: 14,
  },

  error: {
    color: "#DC2626",
    marginBottom: 15,
    fontSize: 14,
  },

  success: {
    color: "#16A34A",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "600",
  },
});