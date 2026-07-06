// frontend/app/payments/mpesa.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export default function MpesaScreen() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!phone.trim()) {
      Alert.alert("Phone Number", "Enter your M-Pesa phone number.");
      return;
    }

    setLoading(true);

    try {
      // TODO:
      // await paymentService.payWithMpesa(phone);

      setTimeout(() => {
        setLoading(false);

        Alert.alert(
          "STK Push Sent",
          "Check your phone and complete the M-Pesa payment."
        );
      }, 1800);
    } catch (error) {
      setLoading(false);

      Alert.alert(
        "Payment Failed",
        "Unable to initiate M-Pesa payment."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}

          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors.text}
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              M-Pesa Payment
            </Text>

            <View style={{ width: 24 }} />
          </View>

          {/* Icon */}

          <View style={styles.iconContainer}>
            <Ionicons
              name="phone-portrait"
              size={70}
              color="#00A651"
            />
          </View>

          <Text style={styles.title}>
            Upgrade to SwiftReply Pro
          </Text>

          <Text style={styles.subtitle}>
            Enter your Safaricom number to receive an
            M-Pesa STK Push.
          </Text>

          {/* Amount */}

          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>
              Subscription
            </Text>

            <Text style={styles.price}>
              KSh 499 / Month
            </Text>
          </View>

          {/* Phone */}

          <Text style={styles.label}>
            M-Pesa Phone Number
          </Text>

          <TextInput
            placeholder="07XXXXXXXX"
            placeholderTextColor={Colors.textSecondary}
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
            style={styles.input}
          />

          {/* Info */}

          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={Colors.primary}
            />

            <Text style={styles.infoText}>
              You'll receive an STK Push on your phone.
              Enter your M-Pesa PIN to complete payment.
            </Text>
          </View>

          {/* Button */}

          <TouchableOpacity
            style={styles.button}
            onPress={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Ionicons
                  name="flash"
                  size={20}
                  color="#fff"
                />

                <Text style={styles.buttonText}>
                  Send STK Push
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: Colors.text,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    color: Colors.textSecondary,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 25,
  },

  priceCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    alignItems: "center",
  },

  priceLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  price: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: "800",
    color: "#00A651",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },

  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 20,
  },

  infoBox: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 30,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    color: Colors.textSecondary,
    lineHeight: 21,
  },

  button: {
    backgroundColor: "#00A651",
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    marginLeft: 10,
  },

  cancelButton: {
    marginTop: 18,
    alignItems: "center",
  },

  cancelText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});