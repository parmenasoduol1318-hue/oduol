import { OpenAI } from 'openai';
import {
  Message,
  MessageTone,
  MessageIntent,
  Reply,
  ReplyStyle,
  SuggestedReplies,
} from '@types/index';
import { detectTone } from 'frontend/utils/toneDetector';
import { detectIntent } from 'frontend/utils/intentDetector';

class ReplyService {
  private client: OpenAI | null = null;
  private apiKey: string = '';

  constructor(apiKey?: string) {
    if (apiKey) {
      this.setApiKey(apiKey);
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.client = new OpenAI({ apiKey });
  }

  private validateApiKey(): void {
    if (!this.apiKey || !this.client) {
      throw new Error(
        'OpenAI API key not configured. Please set your API key in settings.'
      );
    }
  }

  async analyzeMessage(
    messageContent: string,
    language: string
  ): Promise<{
    tone: MessageTone;
    intent: MessageIntent;
  }> {
    // Use local detection for speed, fallback to API if needed
    const tone = detectTone(messageContent, language);
    const intent = detectIntent(messageContent, language);

    return { tone, intent };
  }

  async generateReplies(
    message: string,
    tone: MessageTone,
    intent: MessageIntent,
    language: string,
    styles: ReplyStyle[] = ['friendly', 'formal', 'funny', 'short', 'creative']
  ): Promise<Reply[]> {
    this.validateApiKey();

    const systemPrompt = `You are SwiftReply, a smart communication assistant that generates helpful replies.
Analyze the message tone (${tone}) and intent (${intent}).
Generate replies in ${language}.
Help users respond appropriately and authentically.
Keep replies concise and natural-sounding.`;

    const userPrompt = `Message: "${message}"
Detected Tone: ${tone}
Detected Intent: ${intent}

Generate exactly ${styles.length} reply suggestions in these styles: ${styles.join(
      ', '
    )}.
Return as JSON array with fields: {style, content, tone}.
Only return valid JSON, no additional text.`;

    try {
      const response = await this.client!.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const responseText =
        response.choices[0]?.message?.content || '[]';

      // Parse JSON response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.warn('Could not parse reply suggestions');
        return this.generateFallbackReplies(message, styles, tone);
      }

      const parsedReplies = JSON.parse(jsonMatch[0]);

      return parsedReplies.map(
        (reply: any, index: number) => ({
          id: `${Date.now()}-${index}`,
          content: reply.content || message,
          style: reply.style || styles[index],
          tone: reply.tone || tone,
          confidence: 0.85,
        })
      ) as Reply[];
    } catch (error) {
      console.error('Error generating replies:', error);
      return this.generateFallbackReplies(message, styles, tone);
    }
  }

  private generateFallbackReplies(
    originalMessage: string,
    styles: ReplyStyle[],
    tone: MessageTone
  ): Reply[] {
    const styleTemplates: Record<ReplyStyle, string> = {
      short: 'Got it!',
      friendly: `Thanks for reaching out! 😊`,
      formal: 'Thank you for your message. I appreciate it.',
      funny: `That's hilarious! 😄`,
      creative:
        'Your message got my creative juices flowing! Let me get back to you.',
    };

    return styles.map((style, index) => ({
      id: `fallback-${Date.now()}-${index}`,
      content: styleTemplates[style] || `Reply in ${style} style`,
      style,
      tone,
      confidence: 0.6,
    }));
  }

  async generateReplyInStyle(
    message: string,
    style: ReplyStyle,
    language: string
  ): Promise<string> {
    this.validateApiKey();

    const styleDescriptions: Record<ReplyStyle, string> = {
      short: 'Keep it brief, under 10 words',
      friendly: 'Be warm and approachable',
      formal: 'Use professional language',
      funny: 'Add humor and wit',
      creative: 'Be creative and think outside the box',
    };

    const prompt = `Reply to this message in ${style} style: "${message}"
Style description: ${styleDescriptions[style]}
Language: ${language}
Only return the reply, no explanations.`;

    try {
      const response = await this.client!.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      return response.choices[0]?.message?.content || 'Got it!';
    } catch (error) {
      console.error('Error generating reply:', error);
      return 'Unable to generate reply at the moment.';
    }
  }
}

export default ReplyService;
