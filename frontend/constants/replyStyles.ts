// frontend/constants/replyStyles.ts

/**
 * ==========================================================
 * SwiftReply Reply Styles
 * Used by Rewrite, Chat, AI Persona and Tone Selection
 * ==========================================================
 */

export interface ReplyStyle {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export const REPLY_STYLES: ReplyStyle[] = [
  {
    id: "default",
    title: "Default",
    description: "Balanced and natural responses.",
    emoji: "💬",
  },
  {
    id: "professional",
    title: "Professional",
    description: "Formal business communication.",
    emoji: "💼",
  },
  {
    id: "friendly",
    title: "Friendly",
    description: "Warm and conversational.",
    emoji: "😊",
  },
  {
    id: "casual",
    title: "Casual",
    description: "Relaxed everyday language.",
    emoji: "😎",
  },
  {
    id: "academic",
    title: "Academic",
    description: "Suitable for school and research.",
    emoji: "🎓",
  },
  {
    id: "creative",
    title: "Creative",
    description: "Imaginative and expressive.",
    emoji: "🎨",
  },
  {
    id: "technical",
    title: "Technical",
    description: "Detailed programming and engineering explanations.",
    emoji: "💻",
  },
  {
    id: "concise",
    title: "Concise",
    description: "Short and straight to the point.",
    emoji: "⚡",
  },
  {
    id: "detailed",
    title: "Detailed",
    description: "Comprehensive explanations.",
    emoji: "📖",
  },
  {
    id: "persuasive",
    title: "Persuasive",
    description: "Convincing and impactful writing.",
    emoji: "📢",
  },
  {
    id: "storytelling",
    title: "Storytelling",
    description: "Narrative and engaging.",
    emoji: "📚",
  },
  {
    id: "motivational",
    title: "Motivational",
    description: "Positive and inspiring.",
    emoji: "🔥",
  },
  {
    id: "humorous",
    title: "Humorous",
    description: "Funny and entertaining.",
    emoji: "😂",
  },
  {
    id: "sheng",
    title: "Sheng",
    description: "Kenyan Sheng style conversation.",
    emoji: "🇰🇪",
  },
  {
    id: "swahili",
    title: "Swahili",
    description: "Natural Kiswahili responses.",
    emoji: "🗣️",
  },
];

export const DEFAULT_REPLY_STYLE = "default";

export function getReplyStyle(id: string): ReplyStyle | undefined {
  return REPLY_STYLES.find((style) => style.id === id);
}

export default REPLY_STYLES;