// components/forms/SubscriptionForm.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

const PLANS: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "SwiftReply Pro",
    price: 299,
    duration: "Monthly",
    description:
      "Unlimited chats, image generation, voice AI, faster responses, and premium features.",
  },
];

export default function SubscriptionForm() {
  const [selectedPlan, setSelectedPlan] =
    useState<SubscriptionPlan>(PLANS[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Choose Your Plan
      </Text>

      {PLANS.map((plan) => {
        const selected =
          selectedPlan.id === plan.id;

        return (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selected &&
                styles.selectedCard,
            ]}
            onPress={() =>
              setSelectedPlan(plan)
            }
          >
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text
                  style={styles.planTitle}
                >
                  {plan.name}
                </Text>

                <Text
                  style={
                    styles.planDescription
                  }
                >
                  {plan.description}
                </Text>

                <Text
                  style={styles.price}
                >
                  KSh {plan.price}/
                  {plan.duration}
                </Text>
              </View>

              <Ionicons
                name={
                  selected
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={26}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        );
      })}

      <AppButton
        title="Pay with M-Pesa"
        icon="phone-portrait-outline"
        onPress={() =>
          router.push({
            pathname:
              "/payments/mpesa",
            params: {
              planId:
                selectedPlan.id,
            },
          })
        }
      />

      <View style={{ height: 14 }} />

      <AppButton
        title="Pay with PayPal"
        variant="outline"
        icon="logo-paypal"
        onPress={() =>
          router.push({
            pathname:
              "/payments/paypal",
            params: {
              planId:
                selectedPlan.id,
            },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 24,
    textAlign: "center",
  },

  planCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor:
      Colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  selectedCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  planTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },

  planDescription: {
    color:
      Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 10,
  },

  price: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 18,
  },
});