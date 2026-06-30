import { MessageTone } from '@types/index';

// Tone detection keywords for different languages
const toneKeywords: Record<string, Record<MessageTone, string[]>> = {
  en: {
    friendly: [
      'hey',
      'thanks',
      'appreciate',
      'love',
      'awesome',
      'great',
      'cool',
      'nice',
      'happy',
      'fun',
    ],
    serious: [
      'urgent',
      'important',
      'critical',
      'severe',
      'must',
      'immediately',
      'serious',
      'concerning',
    ],
    angry: [
      'hate',
      'terrible',
      'worst',
      'awful',
      'disgusting',
      'furious',
      'mad',
      'frustrated',
      '!!!',
    ],
    formal: [
      'regards',
      'sincerely',
      'respectfully',
      'kindly',
      'hereby',
      'furthermore',
      'therefore',
    ],
    joking: [
      'haha',
      'lol',
      'joke',
      'funny',
      'jk',
      'just kidding',
      'hilarious',
      '😂',
      '😄',
    ],
    confused: [
      'what',
      'why',
      'confused',
      'unclear',
      'lost',
      'not sure',
      '?',
      'huh',
    ],
    supportive: [
      'support',
      'help',
      'there for you',
      'got your back',
      'believe in you',
      'can do it',
    ],
    neutral: ['okay', 'ok', 'sure', 'understood', 'copy'],
  },
  sw: {
    friendly: [
      'habari',
      'asante',
      'mahaba',
      'moja kwa moja',
      'vizuri',
      'nzuri',
    ],
    serious: [
      'haraka',
      'muhimu',
      'sasa sasa',
      'haraka haraka',
    ],
    angry: ['chuki', 'kasirika', 'hasira', 'machafua'],
    formal: ['tafadhali', 'heshima', 'karibu', 'inakubali'],
    joking: ['kuchekeana', 'karata', 'hahaha', 'kidogo'],
    confused: ['sinaelewa', 'mkate', 'nini', 'huh'],
    supportive: ['msaada', 'pamoja', 'nguvu'],
    neutral: ['oke', 'sawa', 'karibu'],
  },
  fr: {
    friendly: [
      'bonjour',
      'merci',
      'aimer',
      'super',
      'génial',
      'cool',
      'sympa',
    ],
    serious: [
      'urgent',
      'important',
      'critique',
      'grave',
    ],
    angry: ['déteste', 'horrible', 'terrible', 'fureur'],
    formal: ['respectueusement', 'sincères', 'cordialement'],
    joking: ['blague', 'rigolo', 'marrant', 'haha'],
    confused: ['quoi', 'pourquoi', 'confusion', '?'],
    supportive: ['soutien', 'aide', 'là pour toi'],
    neutral: ['ok', 'sûr', 'compris'],
  },
  ar: {
    friendly: ['مرحبا', 'شكرا', 'حب', 'رائع', 'جميل', 'جيد'],
    serious: ['عاجل', 'مهم', 'حرج', 'خطير'],
    angry: ['كره', 'فظيع', 'يزعج', 'غاضب'],
    formal: ['باحترام', 'صادقة', 'مودة'],
    joking: ['نكتة', 'طريف', 'مضحك'],
    confused: ['ماذا', 'لماذا', 'ارتباك'],
    supportive: ['دعم', 'مساعدة', 'معك'],
    neutral: ['حسنا', 'تمام', 'فهمت'],
  },
};

export function detectTone(message: string, language: string = 'en'): MessageTone {
  const lowerMessage = message.toLowerCase();
  const keywords = toneKeywords[language] || toneKeywords['en'];

  // Count tone indicators
  const scores: Record<MessageTone, number> = {
    friendly: 0,
    serious: 0,
    angry: 0,
    formal: 0,
    joking: 0,
    confused: 0,
    supportive: 0,
    neutral: 0,
  };

  // Check for keywords
  Object.entries(scores).forEach(([tone, _]) => {
    const toneKeywordList = keywords[tone as MessageTone] || [];
    toneKeywordList.forEach((keyword) => {
      if (lowerMessage.includes(keyword)) {
        scores[tone as MessageTone]++;
      }
    });
  });

  // Check for punctuation patterns
  if (message.includes('!!!') || message.includes('???')) {
    scores.angry += 2;
  }

  if (message.endsWith('?')) {
    scores.confused += 1;
  }

  if (message.match(/😂|😄|😅|🤣|lol|haha|hehe/i)) {
    scores.joking += 2;
  }

  if (message.match(/❤️|💕|😍|love/i)) {
    scores.friendly += 2;
  }

  // Find dominant tone
  let detectedTone: MessageTone = 'neutral';
  let maxScore = 0;

  Object.entries(scores).forEach(([tone, score]) => {
    if (score > maxScore) {
      maxScore = score;
      detectedTone = tone as MessageTone;
    }
  });

  return detectedTone;
}
