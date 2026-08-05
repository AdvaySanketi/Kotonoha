// Task-based/point-comprehension listening practice, matching the real
// JLPT listening (聴解) format more closely than isolated-word recognition:
// a short dialogue plays, then a comprehension question. Hand-authored and
// individually checked for grammaticality and answer consistency — there's
// no open dataset for this.
//
// One real limitation, worth being upfront about: browser text-to-speech
// reads every line in the same single voice, so there's no vocal
// distinction between speakers the way a real listening section has. The
// transcript (shown after answering) has speaker labels to compensate.
export const LISTENING_CONVERSATIONS = [
  // ── N5 ──────────────────────────────────────────────────────────
  {
    id: 'lcv_n5_1', level: 'N5',
    lines: [
      { speaker: '男', jp: '明日のピクニック、何か持っていく？' },
      { speaker: '女', jp: 'お弁当を作ろうと思います。' },
      { speaker: '男', jp: '飲み物は？' },
      { speaker: '女', jp: 'あ、それも持っていきます。お菓子は男の人が買います。' },
    ],
    question: '女の人は明日何を持っていきますか。',
    options: ['お弁当と飲み物', 'お弁当だけ', '飲み物だけ', 'お菓子と飲み物'],
    answer: 0, en: 'What will the woman bring tomorrow?',
  },
  {
    id: 'lcv_n5_2', level: 'N5',
    lines: [
      { speaker: '女', jp: 'すみません、次の電車は何時に来ますか。' },
      { speaker: '駅員', jp: '次の電車は三時半に来ます。' },
      { speaker: '女', jp: '今、何時ですか。' },
      { speaker: '駅員', jp: '今、三時十五分です。' },
    ],
    question: '電車はあと何分で来ますか。',
    options: ['5分', '10分', '15分', '30分'],
    answer: 2, en: 'How many more minutes until the train arrives?',
  },
  {
    id: 'lcv_n5_3', level: 'N5',
    lines: [
      { speaker: '店員', jp: 'いらっしゃいませ。' },
      { speaker: '女', jp: 'このくつはいくらですか。' },
      { speaker: '店員', jp: 'それは三千円です。でも、こちらの白いくつは二千五百円です。' },
      { speaker: '女', jp: 'じゃ、白いほうをください。' },
    ],
    question: '女の人はいくら払いますか。',
    options: ['2千円', '2千5百円', '3千円', '3千5百円'],
    answer: 1, en: 'How much will the woman pay?',
  },
  {
    id: 'lcv_n5_4', level: 'N5',
    lines: [
      { speaker: '男', jp: '今日の天気はどうですか。' },
      { speaker: '女', jp: '午後から雨が降るそうです。' },
      { speaker: '男', jp: 'じゃ、傘を持っていったほうがいいですね。' },
      { speaker: '女', jp: 'はい、そうしましょう。' },
    ],
    question: '二人はこれから何を持っていきますか。',
    options: ['かさ', 'ぼうし', 'コート', 'かばん'],
    answer: 0, en: 'What will the two bring with them?',
  },
  {
    id: 'lcv_n5_5', level: 'N5',
    lines: [
      { speaker: '店員', jp: 'ご注文は何になさいますか。' },
      { speaker: '男', jp: 'すしとみそしるをお願いします。' },
      { speaker: '店員', jp: 'お飲み物は。' },
      { speaker: '男', jp: 'お茶をください。' },
    ],
    question: '男の人は何を注文しましたか。',
    options: ['すしとお茶', 'すしとみそしる', 'すしとみそしるとお茶', 'みそしるとお茶'],
    answer: 2, en: 'What did the man order?',
  },
  {
    id: 'lcv_n5_6', level: 'N5',
    lines: [
      { speaker: '女', jp: '会議は三時からですよね。' },
      { speaker: '男', jp: 'いいえ、四時に変わりました。' },
      { speaker: '女', jp: 'そうですか。分かりました。' },
    ],
    question: '会議は何時に始まりますか。',
    options: ['2時', '3時', '4時', '5時'],
    answer: 2, en: 'What time does the meeting start?',
  },
  {
    id: 'lcv_n5_7', level: 'N5',
    lines: [
      { speaker: '男', jp: 'どうしましたか。' },
      { speaker: '女', jp: 'かさをなくしました。黒いかさです。' },
      { speaker: '男', jp: 'いつなくしましたか。' },
      { speaker: '女', jp: '今朝、駅でなくしました。' },
    ],
    question: '女の人は何をなくしましたか。',
    options: ['かばん', 'かさ', 'ほん', 'さいふ'],
    answer: 1, en: 'What did the woman lose?',
  },
  {
    id: 'lcv_n5_8', level: 'N5',
    lines: [
      { speaker: '女', jp: '週末は何をしますか。' },
      { speaker: '男', jp: '土曜日は勉強して、日曜日は友達と映画を見に行きます。' },
      { speaker: '女', jp: 'いいですね。' },
    ],
    question: '男の人は土曜日に何をしますか。',
    options: ['映画を見る', '勉強する', '友達と遊ぶ', '買い物に行く'],
    answer: 1, en: 'What will the man do on Saturday?',
  },

  // ── N4 ──────────────────────────────────────────────────────────
  {
    id: 'lcv_n4_1', level: 'N4',
    lines: [
      { speaker: '男', jp: '今度の旅行、電車で行くか車で行くか迷っています。' },
      { speaker: '女', jp: '電車のほうが早いし、楽ですよ。' },
      { speaker: '男', jp: 'でも、車のほうが荷物をたくさん持っていけます。' },
      { speaker: '女', jp: '天気が悪かったら、電車のほうが安全だと思います。' },
      { speaker: '男', jp: 'そうですね。じゃ、電車にします。' },
    ],
    question: '男の人はどうやって旅行に行くことにしましたか。',
    options: ['車で行く', '電車で行く', 'バスで行く', '歩いて行く'],
    answer: 1, en: 'How did the man decide to travel?',
  },
  {
    id: 'lcv_n4_2', level: 'N4',
    lines: [
      { speaker: '女', jp: 'すみません、会議に遅れてしまって。' },
      { speaker: '男', jp: '大丈夫ですよ。まだ始まっていません。' },
      { speaker: '女', jp: '資料を忘れてしまったので、取りに戻ってもいいですか。' },
      { speaker: '男', jp: '時間がないので、コピーを渡しますよ。' },
    ],
    question: '女の人はこれから何をしますか。',
    options: ['資料を取りに戻る', '男の人のコピーを使う', '会議をやめる', '家に帰る'],
    answer: 1, en: 'What will the woman do next?',
  },
  {
    id: 'lcv_n4_3', level: 'N4',
    lines: [
      { speaker: '男', jp: '最近、隣の部屋がうるさくて、よく眠れないんです。' },
      { speaker: '女', jp: 'それは大変ですね。管理人さんに相談しましたか。' },
      { speaker: '男', jp: 'いいえ、まだです。' },
      { speaker: '女', jp: '一度話してみたほうがいいと思いますよ。' },
    ],
    question: '女の人は男の人に何をすすめましたか。',
    options: ['引っ越すこと', '管理人に相談すること', '警察を呼ぶこと', '我慢すること'],
    answer: 1, en: 'What did the woman suggest to the man?',
  },
  {
    id: 'lcv_n4_4', level: 'N4',
    lines: [
      { speaker: '店員', jp: 'ご注文がお決まりになりましたら、お呼びください。' },
      { speaker: '女', jp: 'すみません、これは肉が入っていますか。' },
      { speaker: '店員', jp: 'はい、少し入っています。' },
      { speaker: '女', jp: '肉が食べられないので、こちらの野菜スープをお願いします。' },
    ],
    question: '女の人は何を注文しましたか。',
    options: ['肉が入った料理', '野菜スープ', '魚料理', '何も注文しなかった'],
    answer: 1, en: 'What did the woman order?',
  },
  {
    id: 'lcv_n4_5', level: 'N4',
    lines: [
      { speaker: '男', jp: '面接の日程についてご連絡いたしました。来週の月曜日か水曜日、どちらがよろしいですか。' },
      { speaker: '女', jp: '月曜日は予定があるので、水曜日でお願いできますか。' },
      { speaker: '男', jp: 'かしこまりました。水曜日の午後二時でいかがでしょうか。' },
      { speaker: '女', jp: 'はい、大丈夫です。よろしくお願いします。' },
    ],
    question: '面接はいつになりましたか。',
    options: ['月曜日の午後', '水曜日の午後', '月曜日の午前', '水曜日の午前'],
    answer: 1, en: 'When was the interview scheduled for?',
  },
  {
    id: 'lcv_n4_6', level: 'N4',
    lines: [
      { speaker: '女', jp: 'すみません、昨日買ったこのラジオ、電源が入らないんです。' },
      { speaker: '店員', jp: '申し訳ございません。新しいものと交換いたしましょうか。' },
      { speaker: '女', jp: 'お願いします。レシートは持っています。' },
      { speaker: '店員', jp: 'では、こちらの新しいラジオをどうぞ。' },
    ],
    question: '店員は女の人に何をしましたか。',
    options: ['お金を返した', '新しい商品と交換した', '修理した', '何もしなかった'],
    answer: 1, en: 'What did the clerk do for the woman?',
  },
  {
    id: 'lcv_n4_7', level: 'N4',
    lines: [
      { speaker: '男', jp: '来週のテストのために、いっしょに勉強しない？' },
      { speaker: '女', jp: 'いいね。図書館で会おうか。' },
      { speaker: '男', jp: '図書館は土曜日、休みだよ。' },
      { speaker: '女', jp: 'じゃ、わたしの家に来る？' },
      { speaker: '男', jp: 'うん、ありがとう。何時に行けばいい？' },
      { speaker: '女', jp: '午後一時はどう？' },
    ],
    question: '二人はどこで勉強しますか。',
    options: ['図書館', '男の人の家', '女の人の家', '学校'],
    answer: 2, en: 'Where will the two study?',
  },
  {
    id: 'lcv_n4_8', level: 'N4',
    lines: [
      { speaker: '女', jp: 'プロジェクトの進み具合はどうですか。' },
      { speaker: '男', jp: 'すみません、資料の準備に時間がかかっていて、少し遅れています。' },
      { speaker: '女', jp: 'あとどのくらいで終わりそうですか。' },
      { speaker: '男', jp: 'あと二日あれば終わると思います。' },
      { speaker: '女', jp: '分かりました。では、金曜日までにお願いします。' },
    ],
    question: '男の人はいつまでにプロジェクトを終わらせますか。',
    options: ['今日', '明日', '金曜日', '来週'],
    answer: 2, en: 'By when will the man finish the project?',
  },
]
