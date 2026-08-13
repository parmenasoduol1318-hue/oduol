import { MessageIntent } from '../types';

// Intent detection patterns for different languages
const intentPatterns: Record<string, Record<MessageIntent, RegExp[]>> = {
  en: {
    question: [/\?$/, /^(what|when|where|why|how|who|which|do you|can you|will you|would you)/i],
    statement: [/^(i|we|he|she|it|they|the|a|an)/i, /[.!]$/],
    request: [/please|can you|could you|would you|will you|can i/i, /^(please|can|could|would)/i],
    warning: [/watch out|be careful|beware|careful|danger|warning/i],
    flirting: [/😊|😍|😏|wink|haha|cute|gorgeous/i, /bet you|i like you|pretty/i],
    joking: [/just kidding|jk|haha|lol|joke|funny/i],
    help_request: [/help|assist|support|can you help|need help|struggling/i],
    complaint: [/hate|terrible|awful|worst|annoying|frustrated|disappointing/i],
    compliment: [/great|awesome|amazing|beautiful|wonderful|excellent|love it/i],
  },
  sw: {
    question: [/\?$/, /^(nini|wapi|lini|kwa nini|vipi|nani)/i],
    statement: [/[.!]$/],
    request: [/tafadhali|karibu|unaweza|kama ungependa/i],
    warning: [/angalia|onyo|hatari|kuwa makini/i],
    flirting: [/😊|😍|upendo|wewe ni/i],
    joking: [/karata|kucheka|haha/i],
    help_request: [/msaada|tutiya|shida/i],
    complaint: [/siachi|vibaya|kasirika/i],
    compliment: [/nzuri|mjinga|waziri/i],
  },
  fr: {
    question: [/\?$/, /^(quoi|quand|où|pourquoi|comment|qui|lequel)/i],
    statement: [/[.!]$/],
    request: [/s'il vous plaît|pouvez-vous|pourriez-vous/i],
    warning: [/attention|gare|prudence|danger/i],
    flirting: [/mignon|beau|adorable|tu me plais/i],
    joking: [/blague|rigolo|haha|marrant/i],
    help_request: [/aide|assistance|besoin/i],
    complaint: [/horrible|déteste|agaçant|déception/i],
    compliment: [/super|fantastique|merveilleux|j'adore/i],
  },
  ar: {
    question: [/\؟$/, /^(ماذا|متى|أين|لماذا|كيف|من|أي)/i],
    statement: [/[.!]$/],
    request: [/من فضلك|هل يمكنك|هل تستطيع/i],
    warning: [/احذر|انتبه|خطر|حذر/i],
    flirting: [/جميل|رائع|عزيز|أنت|مثير/i],
    joking: [/نكتة|طريفة|مضحك|ههه/i],
    help_request: [/ساعدني|دعم|مشكلة|محتاج/i],
    complaint: [/كره|سيئ|مزعج|محبط/i],
    compliment: [/عظيم|رائع|مذهل|أحب/i],
  },
};

export function detectIntent(message: string, language: string = 'en'): MessageIntent {
  const patterns = intentPatterns[language] || intentPatterns['en'];

  // Score each intent
  const scores: Record<MessageIntent, number> = {
    question: 0,
    statement: 0,
    request: 0,
    warning: 0,
    flirting: 0,
    joking: 0,
    help_request: 0,
    complaint: 0,
    compliment: 0,
  };

  // Check patterns
  Object.entries(patterns).forEach(([intent, regexps]) => {
    regexps.forEach((regex) => {
      if (regex.test(message)) {
        scores[intent as MessageIntent]++;
      }
    });
  });

  // Find dominant intent
  let detectedIntent: MessageIntent = 'statement';
  let maxScore = 0;

  Object.entries(scores).forEach(([intent, score]) => {
    if (score > maxScore) {
      maxScore = score;
      detectedIntent = intent as MessageIntent;
    }
  });

  // Default to statement if no specific intent detected
  if (maxScore === 0) {
    detectedIntent = 'statement';
  }

  return detectedIntent;
}
