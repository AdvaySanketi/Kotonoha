// Sentence-reordering (文法整序) practice, matching the real JLPT format:
// a sentence is broken into 4 fragments; one position is marked with a
// star, and the question is "which fragment goes in the starred spot"
// (the actual test only grades that one position, not the full order).
// Hand-authored and individually checked for grammaticality — there's no
// open dataset for this, and auto-splitting arbitrary sentences into valid
// bunsetsu-like chunks isn't reliable without real morphological analysis.
export const SENTENCE_ORDER = [
  // ── N5 ──────────────────────────────────────────────────────────
  {
    id: 'so_n5_1', level: 'N5', before: 'わたしは', after: '。',
    chunks: ['毎朝', '六時に', '起きて', '顔を洗います'], starIndex: 2,
    en: 'I get up at six every morning and wash my face.',
  },
  {
    id: 'so_n5_2', level: 'N5', before: 'きのう', after: '。',
    chunks: ['友達と', 'いっしょに', '映画を', '見ました'], starIndex: 1,
    en: 'Yesterday I watched a movie together with a friend.',
  },
  {
    id: 'so_n5_3', level: 'N5', before: '日曜日は', after: '。',
    chunks: ['たいてい', '家で', 'のんびり', '休みます'], starIndex: 2,
    en: 'On Sundays I usually relax at home.',
  },
  {
    id: 'so_n5_4', level: 'N5', before: '', after: '。',
    chunks: ['図書館で', '静かに', '本を', '読んでいます'], starIndex: 1,
    en: 'I am quietly reading a book in the library.',
  },
  {
    id: 'so_n5_5', level: 'N5', before: '明日', after: '。',
    chunks: ['友達に', '会ってから', '買い物に', '行きます'], starIndex: 1,
    en: "Tomorrow, after meeting my friend, I'll go shopping.",
  },
  {
    id: 'so_n5_6', level: 'N5', before: 'この漢字は', after: '。',
    chunks: ['とても', '難しくて', 'まだ', '覚えられません'], starIndex: 3,
    en: "This kanji is very difficult, and I still can't remember it.",
  },
  {
    id: 'so_n5_7', level: 'N5', before: '弟は', after: '。',
    chunks: ['テレビを', '見ながら', '宿題を', 'しています'], starIndex: 2,
    en: 'My younger brother is doing homework while watching TV.',
  },
  {
    id: 'so_n5_8', level: 'N5', before: '', after: '。',
    chunks: ['駅の', '近くに', '新しいカフェが', 'できました'], starIndex: 2,
    en: 'A new cafe opened near the station.',
  },
  {
    id: 'so_n5_9', level: 'N5', before: '', after: '。',
    chunks: ['今度の休みに', '家族と', '旅行に行く', '予定です'], starIndex: 1,
    en: 'I plan to go on a trip with my family during the next holiday.',
  },
  {
    id: 'so_n5_10', level: 'N5', before: '母は', after: '。',
    chunks: ['いつも', 'わたしより', '早く', '起きます'], starIndex: 1,
    en: 'My mother always gets up earlier than me.',
  },

  // ── N4 ──────────────────────────────────────────────────────────
  {
    id: 'so_n4_1', level: 'N4', before: '', after: '。',
    chunks: ['雨が降っているので', '傘を', '持って行った', 'ほうがいい'], starIndex: 2,
    en: "Since it's raining, you'd better take an umbrella.",
  },
  {
    id: 'so_n4_2', level: 'N4', before: '', after: '。',
    chunks: ['電車が', '止まってしまったので', '会社に', '遅れました'], starIndex: 1,
    en: 'Because the train stopped, I was late for work.',
  },
  {
    id: 'so_n4_3', level: 'N4', before: '彼は', after: '。',
    chunks: ['忙しいと', '言いながら', 'いつも', '手伝ってくれる'], starIndex: 1,
    en: "Even though he says he's busy, he always helps me.",
  },
  {
    id: 'so_n4_4', level: 'N4', before: '', after: '。',
    chunks: ['母に', 'しかられないように', '早く', '帰った'], starIndex: 1,
    en: 'I went home early so as not to be scolded by my mother.',
  },
  {
    id: 'so_n4_5', level: 'N4', before: '田中さんは', after: '。',
    chunks: ['日本語は', 'もちろん', '英語も', '話せます'], starIndex: 2,
    en: 'Mr. Tanaka can speak not only Japanese but of course English too.',
  },
  {
    id: 'so_n4_6', level: 'N4', before: '', after: '。',
    chunks: ['用事があるなら', '先に', '帰っても', 'いいですよ'], starIndex: 2,
    en: 'If you have something to do, you may leave first.',
  },
  {
    id: 'so_n4_7', level: 'N4', before: '', after: '。',
    chunks: ['宿題が終わったら', '遊びに', '行っても', 'いいです'], starIndex: 2,
    en: 'Once you finish your homework, you may go out to play.',
  },
  {
    id: 'so_n4_8', level: 'N4', before: '彼女は', after: '。',
    chunks: ['英語が', '話せる', 'ように', 'なりました'], starIndex: 2,
    en: 'She has become able to speak English.',
  },
  {
    id: 'so_n4_9', level: 'N4', before: '', after: '。',
    chunks: ['忘れない', 'うちに', 'メモして', 'おきましょう'], starIndex: 1,
    en: "Let's write it down before we forget.",
  },
  {
    id: 'so_n4_10', level: 'N4', before: '田中さんは', after: '。',
    chunks: ['国に', '帰る', 'ことに', 'しました'], starIndex: 2,
    en: 'Mr. Tanaka decided to return to his country.',
  },
]
