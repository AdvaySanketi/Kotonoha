// Task-based/point-comprehension listening practice, matching the real
// JLPT listening (聴解) format more closely than isolated-word recognition:
// a short dialogue plays, then a comprehension question. Hand-authored and
// individually checked for grammaticality and answer consistency — there's
// no open dataset for this.
//
// Each conversation carries a `questions` array (2 per conversation) rather
// than a single question — callers should pick one at random per session so
// replaying the same conversation doesn't always ask the identical thing.
//
// One real limitation, worth being upfront about: browser text-to-speech
// reads every line in the same single voice, so there's no vocal
// distinction between speakers the way a real listening section has. The
// transcript (shown after answering) has speaker labels to compensate, and
// playback pitch is varied per speaker as a partial substitute.
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
    questions: [
      { q: '女の人は明日何を持っていきますか。', options: ['お弁当と飲み物', 'お弁当だけ', '飲み物だけ', 'お菓子と飲み物'], answer: 0, en: 'What will the woman bring tomorrow?' },
      { q: 'お菓子は誰が買いますか。', options: ['男の人', '女の人', '二人で買う', '買わない'], answer: 0, en: 'Who will buy the snacks?' },
    ],
  },
  {
    id: 'lcv_n5_2', level: 'N5',
    lines: [
      { speaker: '女', jp: 'すみません、次の電車は何時に来ますか。' },
      { speaker: '駅員', jp: '次の電車は三時半に来ます。' },
      { speaker: '女', jp: '今、何時ですか。' },
      { speaker: '駅員', jp: '今、三時十五分です。' },
    ],
    questions: [
      { q: '電車はあと何分で来ますか。', options: ['5分', '10分', '15分', '30分'], answer: 2, en: 'How many more minutes until the train arrives?' },
      { q: '今何時ですか。', options: ['3時15分', '3時30分', '2時45分', '4時'], answer: 0, en: 'What time is it now?' },
    ],
  },
  {
    id: 'lcv_n5_3', level: 'N5',
    lines: [
      { speaker: '店員', jp: 'いらっしゃいませ。' },
      { speaker: '女', jp: 'このくつはいくらですか。' },
      { speaker: '店員', jp: 'それは三千円です。でも、こちらの白いくつは二千五百円です。' },
      { speaker: '女', jp: 'じゃ、白いほうをください。' },
    ],
    questions: [
      { q: '女の人はいくら払いますか。', options: ['2千円', '2千5百円', '3千円', '3千5百円'], answer: 1, en: 'How much will the woman pay?' },
      { q: '最初に見せたくつはいくらでしたか。', options: ['2千円', '2千5百円', '3千円', '3千5百円'], answer: 2, en: 'How much were the shoes first shown?' },
    ],
  },
  {
    id: 'lcv_n5_4', level: 'N5',
    lines: [
      { speaker: '男', jp: '今日の天気はどうですか。' },
      { speaker: '女', jp: '午後から雨が降るそうです。' },
      { speaker: '男', jp: 'じゃ、傘を持っていったほうがいいですね。' },
      { speaker: '女', jp: 'はい、そうしましょう。' },
    ],
    questions: [
      { q: '二人はこれから何を持っていきますか。', options: ['かさ', 'ぼうし', 'コート', 'かばん'], answer: 0, en: 'What will the two bring with them?' },
      { q: '午後の天気はどうですか。', options: ['晴れ', '雨', '雪', 'くもり'], answer: 1, en: 'What will the afternoon weather be like?' },
    ],
  },
  {
    id: 'lcv_n5_5', level: 'N5',
    lines: [
      { speaker: '店員', jp: 'ご注文は何になさいますか。' },
      { speaker: '男', jp: 'すしとみそしるをお願いします。' },
      { speaker: '店員', jp: 'お飲み物は。' },
      { speaker: '男', jp: 'お茶をください。' },
    ],
    questions: [
      { q: '男の人は何を注文しましたか。', options: ['すしとお茶', 'すしとみそしる', 'すしとみそしるとお茶', 'みそしるとお茶'], answer: 2, en: 'What did the man order?' },
      { q: '男の人は何を飲みますか。', options: ['水', 'お茶', 'コーヒー', 'ジュース'], answer: 1, en: 'What will the man drink?' },
    ],
  },
  {
    id: 'lcv_n5_6', level: 'N5',
    lines: [
      { speaker: '女', jp: '会議は三時からですよね。' },
      { speaker: '男', jp: 'いいえ、四時に変わりました。' },
      { speaker: '女', jp: 'そうですか。分かりました。' },
    ],
    questions: [
      { q: '会議は何時に始まりますか。', options: ['2時', '3時', '4時', '5時'], answer: 2, en: 'What time does the meeting start?' },
      { q: '会議は最初何時からでしたか。', options: ['2時', '3時', '4時', '5時'], answer: 1, en: 'What time was the meeting originally supposed to start?' },
    ],
  },
  {
    id: 'lcv_n5_7', level: 'N5',
    lines: [
      { speaker: '男', jp: 'どうしましたか。' },
      { speaker: '女', jp: 'かさをなくしました。黒いかさです。' },
      { speaker: '男', jp: 'いつなくしましたか。' },
      { speaker: '女', jp: '今朝、駅でなくしました。' },
    ],
    questions: [
      { q: '女の人は何をなくしましたか。', options: ['かばん', 'かさ', 'ほん', 'さいふ'], answer: 1, en: 'What did the woman lose?' },
      { q: '何色のかさをなくしましたか。', options: ['黒', '白', '赤', '青'], answer: 0, en: 'What color was the umbrella she lost?' },
    ],
  },
  {
    id: 'lcv_n5_8', level: 'N5',
    lines: [
      { speaker: '女', jp: '週末は何をしますか。' },
      { speaker: '男', jp: '土曜日は勉強して、日曜日は友達と映画を見に行きます。' },
      { speaker: '女', jp: 'いいですね。' },
    ],
    questions: [
      { q: '男の人は土曜日に何をしますか。', options: ['映画を見る', '勉強する', '友達と遊ぶ', '買い物に行く'], answer: 1, en: 'What will the man do on Saturday?' },
      { q: '日曜日は何をしますか。', options: ['勉強する', '友達と映画を見る', '買い物に行く', '家で休む'], answer: 1, en: 'What will they do on Sunday?' },
    ],
  },
  {
    id: 'lcv_n5_9', level: 'N5',
    lines: [
      { speaker: '図書館員', jp: '静かにしてください。ここは図書館です。' },
      { speaker: '女', jp: 'すみません。友達と話していました。' },
      { speaker: '図書館員', jp: '大丈夫ですよ。でも、もう少し静かにお願いします。' },
      { speaker: '女', jp: 'はい、分かりました。' },
    ],
    questions: [
      { q: 'ここはどこですか。', options: ['図書館', '教室', 'カフェ', '病院'], answer: 0, en: 'Where is this?' },
      { q: '女の人は何をしていましたか。', options: ['本を読んでいた', '友達と話していた', '寝ていた', '電話していた'], answer: 1, en: 'What was the woman doing?' },
    ],
  },
  {
    id: 'lcv_n5_10', level: 'N5',
    lines: [
      { speaker: '男', jp: '週末の天気はどうですか。' },
      { speaker: '女', jp: '土曜日は晴れですが、日曜日は雨が降るそうです。' },
      { speaker: '男', jp: 'じゃ、土曜日にピクニックに行きましょう。' },
      { speaker: '女', jp: 'いいですね。' },
    ],
    questions: [
      { q: '土曜日の天気はどうですか。', options: ['晴れ', '雨', '雪', 'くもり'], answer: 0, en: 'What is the weather like on Saturday?' },
      { q: '二人はいつピクニックに行きますか。', options: ['金曜日', '土曜日', '日曜日', '来週'], answer: 1, en: 'When will the two go on a picnic?' },
    ],
  },
  {
    id: 'lcv_n5_11', level: 'N5',
    lines: [
      { speaker: '女', jp: 'すみません、切手を5枚ください。' },
      { speaker: '郵便局員', jp: 'かしこまりました。80円切手でよろしいですか。' },
      { speaker: '女', jp: 'はい、お願いします。' },
      { speaker: '郵便局員', jp: '400円になります。' },
    ],
    questions: [
      { q: '女の人は何を買いますか。', options: ['はがき', '切手', '封筒', '箱'], answer: 1, en: 'What is the woman buying?' },
      { q: '全部でいくらですか。', options: ['80円', '400円', '500円', '800円'], answer: 1, en: 'How much in total?' },
    ],
  },
  {
    id: 'lcv_n5_12', level: 'N5',
    lines: [
      { speaker: '男', jp: 'もしもし、田中さんのお宅ですか。' },
      { speaker: '女', jp: 'いいえ、違います。番号をお間違えだと思います。' },
      { speaker: '男', jp: 'すみません、失礼しました。' },
      { speaker: '女', jp: 'いいえ、大丈夫です。' },
    ],
    questions: [
      { q: '男の人は誰と話したかったですか。', options: ['田中さん', '山田さん', '女の人の家族', '分からない'], answer: 0, en: 'Who did the man want to talk to?' },
      { q: '女の人はどう言いましたか。', options: ['田中です', '番号が違います', '後でかけ直します', '電話を切ります'], answer: 1, en: 'What did the woman say?' },
    ],
  },
  {
    id: 'lcv_n5_13', level: 'N5',
    lines: [
      { speaker: '店員', jp: 'いらっしゃいませ。ご注文は。' },
      { speaker: '女', jp: 'ホットコーヒーを一つお願いします。' },
      { speaker: '店員', jp: 'サイズはいかがですか。' },
      { speaker: '女', jp: 'Mサイズでお願いします。' },
    ],
    questions: [
      { q: '女の人は何を頼みましたか。', options: ['アイスコーヒー', 'ホットコーヒー', '紅茶', 'ジュース'], answer: 1, en: 'What did the woman order?' },
      { q: 'サイズはどれですか。', options: ['S', 'M', 'L', '決めていない'], answer: 1, en: 'What size did she choose?' },
    ],
  },
  {
    id: 'lcv_n5_14', level: 'N5',
    lines: [
      { speaker: '女', jp: 'すみません、駅までどう行けばいいですか。' },
      { speaker: '男', jp: 'この道をまっすぐ行って、二つ目の信号を右に曲がってください。' },
      { speaker: '女', jp: '分かりました。ありがとうございます。' },
      { speaker: '男', jp: 'どういたしまして。' },
    ],
    questions: [
      { q: '駅へはどう行きますか。', options: ['まっすぐ行って右に曲がる', 'まっすぐ行って左に曲がる', 'すぐ右に曲がる', '戻る'], answer: 0, en: 'How does one get to the station?' },
      { q: 'どこで曲がりますか。', options: ['一つ目の信号', '二つ目の信号', '三つ目の信号', '角の店'], answer: 1, en: 'Where should she turn?' },
    ],
  },
  {
    id: 'lcv_n5_15', level: 'N5',
    lines: [
      { speaker: '男', jp: 'すみません、ペンを忘れてしまいました。貸してもらえますか。' },
      { speaker: '女', jp: 'いいですよ。これを使ってください。' },
      { speaker: '男', jp: 'ありがとうございます。授業が終わったら返します。' },
      { speaker: '女', jp: 'はい、大丈夫です。' },
    ],
    questions: [
      { q: '男の人は何を忘れましたか。', options: ['本', 'ペン', 'かばん', 'けいたい'], answer: 1, en: 'What did the man forget?' },
      { q: '男の人はいつペンを返しますか。', options: ['今すぐ', '授業が終わったら', '明日', '来週'], answer: 1, en: 'When will he return the pen?' },
    ],
  },
  {
    id: 'lcv_n5_16', level: 'N5',
    lines: [
      { speaker: '受付', jp: 'こんにちは。今日はどうされましたか。' },
      { speaker: '男', jp: '熱があって、頭が痛いです。' },
      { speaker: '受付', jp: '分かりました。少々お待ちください。3番の部屋にお入りください。' },
      { speaker: '男', jp: 'はい、分かりました。' },
    ],
    questions: [
      { q: '男の人はどこが痛いですか。', options: ['お腹', '頭', '足', '歯'], answer: 1, en: 'Where does the man hurt?' },
      { q: '男の人はどこに入りますか。', options: ['1番の部屋', '2番の部屋', '3番の部屋', '4番の部屋'], answer: 2, en: 'Which room should he enter?' },
    ],
  },
  {
    id: 'lcv_n5_17', level: 'N5',
    lines: [
      { speaker: '女', jp: 'すみません、次のバスは何時に来ますか。' },
      { speaker: 'バス運転手', jp: '次のバスは10分後に来ますよ。' },
      { speaker: '女', jp: 'どこ行きのバスですか。' },
      { speaker: 'バス運転手', jp: '駅前行きです。' },
    ],
    questions: [
      { q: '次のバスは何分後に来ますか。', options: ['5分後', '10分後', '15分後', '20分後'], answer: 1, en: 'How many minutes until the next bus?' },
      { q: 'バスはどこ行きですか。', options: ['学校前', '駅前', '公園前', '空港'], answer: 1, en: 'Where is the bus headed?' },
    ],
  },
  {
    id: 'lcv_n5_18', level: 'N5',
    lines: [
      { speaker: '女', jp: '来週、田中さんの誕生日ですね。何をプレゼントしますか。' },
      { speaker: '男', jp: '本はどうですか。田中さんは本が好きですから。' },
      { speaker: '女', jp: 'いいですね。じゃ、いっしょに本屋に行きましょう。' },
      { speaker: '男', jp: 'はい、いつ行きますか。' },
      { speaker: '女', jp: '明日の午後はどうですか。' },
    ],
    questions: [
      { q: '何をプレゼントしますか。', options: ['花', '本', 'ケーキ', 'かばん'], answer: 1, en: 'What will they give as a present?' },
      { q: 'いつ本屋に行きますか。', options: ['今日', '明日の午後', '来週', '週末'], answer: 1, en: 'When will they go to the bookstore?' },
    ],
  },
  {
    id: 'lcv_n5_19', level: 'N5',
    lines: [
      { speaker: '男', jp: '今度の休みに実家に帰りますか。' },
      { speaker: '女', jp: 'はい、両親に会いに帰ります。' },
      { speaker: '男', jp: '何日ぐらい帰りますか。' },
      { speaker: '女', jp: '三日間、帰る予定です。' },
    ],
    questions: [
      { q: '女の人はどこへ帰りますか。', options: ['友達の家', '実家', '会社', '学校'], answer: 1, en: 'Where will the woman go back to?' },
      { q: '何日間帰りますか。', options: ['一日', '二日', '三日', '一週間'], answer: 2, en: 'How many days will she be gone?' },
    ],
  },
  {
    id: 'lcv_n5_20', level: 'N5',
    lines: [
      { speaker: '女', jp: 'すみません、猫を見ませんでしたか。白い猫です。' },
      { speaker: '男', jp: 'いいえ、見ていません。いつからいませんか。' },
      { speaker: '女', jp: '今朝からです。とても心配です。' },
      { speaker: '男', jp: 'それは大変ですね。警察に連絡しましたか。' },
      { speaker: '女', jp: 'まだです。これから行きます。' },
    ],
    questions: [
      { q: '何色の猫ですか。', options: ['黒', '白', '茶色', '灰色'], answer: 1, en: 'What color is the cat?' },
      { q: '女の人はこれからどこへ行きますか。', options: ['家', '警察', '病院', '学校'], answer: 1, en: 'Where will the woman go next?' },
    ],
  },
  {
    id: 'lcv_n5_21', level: 'N5',
    lines: [
      { speaker: '男', jp: '宿題はいつまでですか。' },
      { speaker: '女', jp: '来週の月曜日までです。' },
      { speaker: '男', jp: 'えっ、もうそんなに時間がないですね。' },
      { speaker: '女', jp: 'そうですね。今日から始めたほうがいいですよ。' },
    ],
    questions: [
      { q: '宿題はいつまでですか。', options: ['今日', '明日', '来週の月曜日', '来月'], answer: 2, en: 'When is the homework due?' },
      { q: '女の人は何と言いましたか。', options: ['宿題はしなくていい', '今日から始めたほうがいい', '来週から始めればいい', '手伝ってあげる'], answer: 1, en: 'What did the woman suggest?' },
    ],
  },
  {
    id: 'lcv_n5_22', level: 'N5',
    lines: [
      { speaker: '男', jp: 'すみません、この本はありますか。' },
      { speaker: '店員', jp: '少々お待ちください。……ございます。こちらです。' },
      { speaker: '男', jp: 'いくらですか。' },
      { speaker: '店員', jp: '1200円です。' },
    ],
    questions: [
      { q: '本はいくらですか。', options: ['1000円', '1200円', '1500円', '2000円'], answer: 1, en: 'How much is the book?' },
      { q: '店員はどうしましたか。', options: ['本がないと言った', '本を探してくれた', '値段を間違えた', '本を薦めた'], answer: 1, en: 'What did the clerk do?' },
    ],
  },
  {
    id: 'lcv_n5_23', level: 'N5',
    lines: [
      { speaker: '女', jp: '週末、部屋を掃除しませんか。' },
      { speaker: '男', jp: 'いいですよ。土曜日と日曜日、どちらがいいですか。' },
      { speaker: '女', jp: '土曜日の午前中がいいです。' },
      { speaker: '男', jp: '分かりました。じゃ、土曜日の10時に始めましょう。' },
    ],
    questions: [
      { q: 'いつ部屋を掃除しますか。', options: ['土曜日の午前', '土曜日の午後', '日曜日の午前', '日曜日の午後'], answer: 0, en: 'When will they clean the room?' },
      { q: '何時に始めますか。', options: ['9時', '10時', '11時', '12時'], answer: 1, en: 'What time will they start?' },
    ],
  },
  {
    id: 'lcv_n5_24', level: 'N5',
    lines: [
      { speaker: '男', jp: '明日、何時に駅で会いましょうか。' },
      { speaker: '女', jp: '9時はどうですか。' },
      { speaker: '男', jp: '少し早いですね。9時半にしませんか。' },
      { speaker: '女', jp: 'はい、いいですよ。じゃ、9時半に駅の北口で。' },
    ],
    questions: [
      { q: '何時に会いますか。', options: ['9時', '9時半', '10時', '10時半'], answer: 1, en: 'What time will they meet?' },
      { q: 'どこで会いますか。', options: ['駅の南口', '駅の北口', '駅の中', '駅前のカフェ'], answer: 1, en: 'Where will they meet?' },
    ],
  },
  {
    id: 'lcv_n5_25', level: 'N5',
    lines: [
      { speaker: '女', jp: 'すみません、りんごはいくらですか。' },
      { speaker: '店員', jp: '一つ100円です。今日は3つで250円ですよ。' },
      { speaker: '女', jp: 'じゃ、3つください。' },
      { speaker: '店員', jp: 'ありがとうございます。' },
    ],
    questions: [
      { q: 'りんご一つはいくらですか。', options: ['50円', '100円', '150円', '250円'], answer: 1, en: 'How much is one apple?' },
      { q: '女の人はいくつ買いますか。', options: ['1つ', '2つ', '3つ', '4つ'], answer: 2, en: 'How many will she buy?' },
    ],
  },
  {
    id: 'lcv_n5_26', level: 'N5',
    lines: [
      { speaker: '男', jp: '駅までお願いします。' },
      { speaker: '運転手', jp: 'かしこまりました。急いでいますか。' },
      { speaker: '男', jp: 'はい、10時の電車に乗りたいんです。' },
      { speaker: '運転手', jp: '分かりました。急ぎます。' },
    ],
    questions: [
      { q: '男の人はどこへ行きたいですか。', options: ['空港', '駅', '会社', '病院'], answer: 1, en: 'Where does the man want to go?' },
      { q: '男の人は何時の電車に乗りたいですか。', options: ['9時', '9時半', '10時', '10時半'], answer: 2, en: 'What time train does he want to catch?' },
    ],
  },
  {
    id: 'lcv_n5_27', level: 'N5',
    lines: [
      { speaker: '女', jp: '何かクラブに入っていますか。' },
      { speaker: '男', jp: 'はい、テニス部に入っています。週に3回練習します。' },
      { speaker: '女', jp: '楽しそうですね。私は写真部に入りたいです。' },
      { speaker: '男', jp: 'いいですね。写真部は毎週金曜日に活動していますよ。' },
    ],
    questions: [
      { q: '男の人は何のクラブに入っていますか。', options: ['サッカー部', 'テニス部', '写真部', '音楽部'], answer: 1, en: 'Which club is the man in?' },
      { q: '写真部はいつ活動しますか。', options: ['月曜日', '水曜日', '金曜日', '土曜日'], answer: 2, en: 'When does the photography club meet?' },
    ],
  },
  {
    id: 'lcv_n5_28', level: 'N5',
    lines: [
      { speaker: '男', jp: 'お正月は何をしますか。' },
      { speaker: '女', jp: '家族と実家に帰ります。田中さんは。' },
      { speaker: '男', jp: '僕は友達と旅行に行く予定です。北海道に行きます。' },
      { speaker: '女', jp: 'いいですね。楽しんできてください。' },
    ],
    questions: [
      { q: '女の人はお正月に何をしますか。', options: ['旅行に行く', '実家に帰る', '仕事をする', '家で休む'], answer: 1, en: "What will the woman do for New Year's?" },
      { q: '男の人はどこへ旅行に行きますか。', options: ['沖縄', '北海道', '大阪', '京都'], answer: 1, en: 'Where will the man travel?' },
    ],
  },
  {
    id: 'lcv_n5_29', level: 'N5',
    lines: [
      { speaker: '図書館員', jp: 'この本は今日が返す日ですよ。' },
      { speaker: '女', jp: 'すみません、忘れていました。今返します。' },
      { speaker: '図書館員', jp: '大丈夫ですよ。次はまた借りますか。' },
      { speaker: '女', jp: 'はい、この本を借りたいです。' },
    ],
    questions: [
      { q: '女の人は何を忘れていましたか。', options: ['本を買うこと', '本を返す日', '図書館の場所', '友達との約束'], answer: 1, en: 'What did the woman forget?' },
      { q: '女の人はこれからどうしますか。', options: ['本を買う', '新しい本を借りる', '図書館をやめる', '家に帰る'], answer: 1, en: 'What will the woman do next?' },
    ],
  },
  {
    id: 'lcv_n5_30', level: 'N5',
    lines: [
      { speaker: '女', jp: 'すみません、自転車を借りたいんですが。' },
      { speaker: '店員', jp: '1時間300円、1日で1000円です。' },
      { speaker: '女', jp: 'じゃ、1日お願いします。' },
      { speaker: '店員', jp: 'かしこまりました。夕方6時までにお返しください。' },
    ],
    questions: [
      { q: '自転車は1日いくらですか。', options: ['300円', '1000円', '1300円', '3000円'], answer: 1, en: 'How much is renting the bike for a day?' },
      { q: '何時までに返しますか。', options: ['夕方5時', '夕方6時', '夜7時', '夜8時'], answer: 1, en: 'By what time must she return it?' },
    ],
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
    questions: [
      { q: '男の人はどうやって旅行に行くことにしましたか。', options: ['車で行く', '電車で行く', 'バスで行く', '歩いて行く'], answer: 1, en: 'How did the man decide to travel?' },
      { q: '車で行くと何がいいですか。', options: ['早く着く', '楽', '荷物をたくさん持っていける', '安い'], answer: 2, en: 'What is the benefit of going by car?' },
    ],
  },
  {
    id: 'lcv_n4_2', level: 'N4',
    lines: [
      { speaker: '女', jp: 'すみません、会議に遅れてしまって。' },
      { speaker: '男', jp: '大丈夫ですよ。まだ始まっていません。' },
      { speaker: '女', jp: '資料を忘れてしまったので、取りに戻ってもいいですか。' },
      { speaker: '男', jp: '時間がないので、コピーを渡しますよ。' },
    ],
    questions: [
      { q: '女の人はこれから何をしますか。', options: ['資料を取りに戻る', '男の人のコピーを使う', '会議をやめる', '家に帰る'], answer: 1, en: 'What will the woman do next?' },
      { q: '女の人は何を忘れましたか。', options: ['資料', 'かばん', 'パソコン', 'けいたい'], answer: 0, en: 'What did the woman forget?' },
    ],
  },
  {
    id: 'lcv_n4_3', level: 'N4',
    lines: [
      { speaker: '男', jp: '最近、隣の部屋がうるさくて、よく眠れないんです。' },
      { speaker: '女', jp: 'それは大変ですね。管理人さんに相談しましたか。' },
      { speaker: '男', jp: 'いいえ、まだです。' },
      { speaker: '女', jp: '一度話してみたほうがいいと思いますよ。' },
    ],
    questions: [
      { q: '女の人は男の人に何をすすめましたか。', options: ['引っ越すこと', '管理人に相談すること', '警察を呼ぶこと', '我慢すること'], answer: 1, en: 'What did the woman suggest to the man?' },
      { q: '男の人はなぜよく眠れませんか。', options: ['仕事が忙しいから', '隣の部屋がうるさいから', '夜遅く帰るから', '部屋が暑いから'], answer: 1, en: "Why can't the man sleep well?" },
    ],
  },
  {
    id: 'lcv_n4_4', level: 'N4',
    lines: [
      { speaker: '店員', jp: 'ご注文がお決まりになりましたら、お呼びください。' },
      { speaker: '女', jp: 'すみません、これは肉が入っていますか。' },
      { speaker: '店員', jp: 'はい、少し入っています。' },
      { speaker: '女', jp: '肉が食べられないので、こちらの野菜スープをお願いします。' },
    ],
    questions: [
      { q: '女の人は何を注文しましたか。', options: ['肉が入った料理', '野菜スープ', '魚料理', '何も注文しなかった'], answer: 1, en: 'What did the woman order?' },
      { q: '女の人はなぜ野菜スープを頼みましたか。', options: ['嫌いだから', '肉が食べられないから', '高いから', '売り切れだから'], answer: 1, en: "Why did she order the vegetable soup?" },
    ],
  },
  {
    id: 'lcv_n4_5', level: 'N4',
    lines: [
      { speaker: '男', jp: '面接の日程についてご連絡いたしました。来週の月曜日か水曜日、どちらがよろしいですか。' },
      { speaker: '女', jp: '月曜日は予定があるので、水曜日でお願いできますか。' },
      { speaker: '男', jp: 'かしこまりました。水曜日の午後二時でいかがでしょうか。' },
      { speaker: '女', jp: 'はい、大丈夫です。よろしくお願いします。' },
    ],
    questions: [
      { q: '面接はいつになりましたか。', options: ['月曜日の午後', '水曜日の午後', '月曜日の午前', '水曜日の午前'], answer: 1, en: 'When was the interview scheduled for?' },
      { q: '男の人が最初に提案した日は？', options: ['月曜日と水曜日', '火曜日と木曜日', '土曜日と日曜日', '月曜日と金曜日'], answer: 0, en: 'Which days did the man first propose?' },
    ],
  },
  {
    id: 'lcv_n4_6', level: 'N4',
    lines: [
      { speaker: '女', jp: 'すみません、昨日買ったこのラジオ、電源が入らないんです。' },
      { speaker: '店員', jp: '申し訳ございません。新しいものと交換いたしましょうか。' },
      { speaker: '女', jp: 'お願いします。レシートは持っています。' },
      { speaker: '店員', jp: 'では、こちらの新しいラジオをどうぞ。' },
    ],
    questions: [
      { q: '店員は女の人に何をしましたか。', options: ['お金を返した', '新しい商品と交換した', '修理した', '何もしなかった'], answer: 1, en: 'What did the clerk do for the woman?' },
      { q: '女の人はいつラジオを買いましたか。', options: ['今日', '昨日', '先週', '先月'], answer: 1, en: 'When did she buy the radio?' },
    ],
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
    questions: [
      { q: '二人はどこで勉強しますか。', options: ['図書館', '男の人の家', '女の人の家', '学校'], answer: 2, en: 'Where will the two study?' },
      { q: '二人はいつ会いますか。', options: ['土曜日の午前', '土曜日の午後1時', '日曜日の午前', '日曜日の午後1時'], answer: 1, en: 'When will they meet?' },
    ],
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
    questions: [
      { q: '男の人はいつまでにプロジェクトを終わらせますか。', options: ['今日', '明日', '金曜日', '来週'], answer: 2, en: 'By when will the man finish the project?' },
      { q: '男の人はあと何日で終わると言いましたか。', options: ['1日', '2日', '3日', '4日'], answer: 1, en: 'How many more days did he say it would take?' },
    ],
  },
  {
    id: 'lcv_n4_9', level: 'N4',
    lines: [
      { speaker: '女', jp: 'すみません、隣のビルの工事の音がうるさくて困っています。' },
      { speaker: '男', jp: '申し訳ございません。工事は来月まで続く予定です。' },
      { speaker: '女', jp: 'そうですか。何か対策はありますか。' },
      { speaker: '男', jp: '窓を二重窓にすることをおすすめします。会社の方に相談してみます。' },
    ],
    questions: [
      { q: '工事はいつまで続きますか。', options: ['来週まで', '来月まで', '半年まで', '分からない'], answer: 1, en: 'Until when will the construction continue?' },
      { q: '管理人は何をすすめましたか。', options: ['引っ越すこと', '窓を二重窓にすること', '工事を止めること', '耳栓をすること'], answer: 1, en: 'What did the manager suggest?' },
    ],
  },
  {
    id: 'lcv_n4_10', level: 'N4',
    lines: [
      { speaker: '男', jp: '部長、来週の金曜日、休みをいただけますか。' },
      { speaker: '部長', jp: 'いいですよ。何かありますか。' },
      { speaker: '男', jp: '実は、引っ越しをすることになりまして。' },
      { speaker: '部長', jp: 'そうですか。分かりました。無理しないでくださいね。' },
    ],
    questions: [
      { q: '男の人はいつ休みたいですか。', options: ['来週の月曜日', '来週の金曜日', '今週の金曜日', '来月'], answer: 1, en: 'When does the man want the day off?' },
      { q: '男の人はなぜ休みたいですか。', options: ['旅行に行くから', '引っ越しをするから', '病院に行くから', '結婚式があるから'], answer: 1, en: 'Why does he want the day off?' },
    ],
  },
  {
    id: 'lcv_n4_11', level: 'N4',
    lines: [
      { speaker: '医者', jp: 'どうされましたか。' },
      { speaker: '女', jp: '三日前から咳が止まらなくて、のども痛いんです。' },
      { speaker: '医者', jp: '熱はありますか。' },
      { speaker: '女', jp: 'はい、昨日から38度くらいあります。' },
      { speaker: '医者', jp: '分かりました。お薬を出しますので、しばらく安静にしてください。' },
    ],
    questions: [
      { q: '女の人はいつから咳をしていますか。', options: ['昨日から', '二日前から', '三日前から', '一週間前から'], answer: 2, en: 'Since when has she had a cough?' },
      { q: '熱はいつからありますか。', options: ['三日前から', '二日前から', '昨日から', '今日から'], answer: 2, en: 'Since when has she had a fever?' },
    ],
  },
  {
    id: 'lcv_n4_12', level: 'N4',
    lines: [
      { speaker: '女', jp: 'この部屋を借りたいんですが、ペットは飼えますか。' },
      { speaker: '不動産屋', jp: '申し訳ございませんが、こちらはペット禁止です。' },
      { speaker: '女', jp: 'そうですか。じゃ、他にペットが飼える部屋はありますか。' },
      { speaker: '不動産屋', jp: 'はい、少し家賃は高くなりますが、いくつかございます。' },
    ],
    questions: [
      { q: 'この部屋でペットは飼えますか。', options: ['飼える', '飼えない', '小さい犬だけ飼える', '猫だけ飼える'], answer: 1, en: 'Can pets be kept in this apartment?' },
      { q: 'ペットが飼える部屋はどうですか。', options: ['家賃が安い', '家賃が高い', '家賃は同じ', '空いていない'], answer: 1, en: 'What about the pet-friendly rooms?' },
    ],
  },
  {
    id: 'lcv_n4_13', level: 'N4',
    lines: [
      { speaker: '男', jp: 'お忙しいところすみません、面接の結果はまだ出ていませんか。' },
      { speaker: '女', jp: '申し訳ございません、来週の水曜日までにはご連絡いたします。' },
      { speaker: '男', jp: '分かりました。よろしくお願いいたします。' },
    ],
    questions: [
      { q: '結果はいつ分かりますか。', options: ['今日', '明日', '来週の水曜日', '来月'], answer: 2, en: 'When will the result be known?' },
      { q: '男の人はなぜ電話をしましたか。', options: ['面接を申し込むため', '結果を聞くため', '日程を変えるため', 'お礼を言うため'], answer: 1, en: 'Why did the man call?' },
    ],
  },
  {
    id: 'lcv_n4_14', level: 'N4',
    lines: [
      { speaker: '男', jp: 'すみません、先週買ったこの時計、動かなくなりました。' },
      { speaker: '店員', jp: '申し訳ございません。レシートはお持ちですか。' },
      { speaker: '男', jp: 'はい、あります。' },
      { speaker: '店員', jp: 'では、新しいものとお取替えいたします。' },
    ],
    questions: [
      { q: '男の人は何を持ってきましたか。', options: ['時計', '時計とレシート', 'レシートだけ', '箱'], answer: 1, en: 'What did he bring with him?' },
      { q: '店員はどうしますか。', options: ['お金を返す', '修理する', '新しいものと交換する', '何もしない'], answer: 2, en: 'What will the clerk do?' },
    ],
  },
  {
    id: 'lcv_n4_15', level: 'N4',
    lines: [
      { speaker: '男', jp: 'すみません、この授業はまだ登録できますか。' },
      { speaker: '事務員', jp: '申し訳ございませんが、もう定員に達しています。' },
      { speaker: '男', jp: 'そうですか。他に空いている授業はありますか。' },
      { speaker: '事務員', jp: 'はい、火曜日の同じ時間に似た授業がありますよ。' },
    ],
    questions: [
      { q: '男の人が受けたい授業はどうなりましたか。', options: ['まだ空いている', '定員に達した', 'なくなった', '時間が変わった'], answer: 1, en: 'What happened with the class he wanted?' },
      { q: '似た授業はいつありますか。', options: ['月曜日', '火曜日', '水曜日', '木曜日'], answer: 1, en: 'When is the similar class?' },
    ],
  },
  {
    id: 'lcv_n4_16', level: 'N4',
    lines: [
      { speaker: '女', jp: 'すみません、この報告書、明日までなんですが、手伝ってもらえますか。' },
      { speaker: '男', jp: 'いいですよ。どこが大変ですか。' },
      { speaker: '女', jp: 'グラフを作るのに時間がかかっていて。' },
      { speaker: '男', jp: 'じゃ、僕がグラフを作りますね。' },
    ],
    questions: [
      { q: '報告書はいつまでですか。', options: ['今日', '明日', '今週末', '来週'], answer: 1, en: 'When is the report due?' },
      { q: '男の人は何を手伝いますか。', options: ['文章を書く', 'グラフを作る', '印刷する', '会議に出る'], answer: 1, en: 'What will the man help with?' },
    ],
  },
  {
    id: 'lcv_n4_17', level: 'N4',
    lines: [
      { speaker: '男', jp: '来月引っ越すそうですね。どこに住むんですか。' },
      { speaker: '女', jp: '会社の近くに住もうと思っています。今より通勤が楽になりますから。' },
      { speaker: '男', jp: 'いいですね。もう部屋は決めましたか。' },
      { speaker: '女', jp: 'はい、先週見て決めました。' },
    ],
    questions: [
      { q: '女の人はなぜ引っ越しますか。', options: ['家賃が安いから', '通勤が楽になるから', '部屋が広いから', '駅から近いから'], answer: 1, en: 'Why is she moving?' },
      { q: '部屋はいつ決めましたか。', options: ['今日', '昨日', '先週', '来週'], answer: 2, en: 'When did she decide on the room?' },
    ],
  },
  {
    id: 'lcv_n4_18', level: 'N4',
    lines: [
      { speaker: '女', jp: 'このあたりでおいしいレストランを知っていますか。' },
      { speaker: '男', jp: 'はい、駅前にいいイタリアンレストランがありますよ。' },
      { speaker: '女', jp: '予約が必要ですか。' },
      { speaker: '男', jp: '週末は混みますので、予約したほうがいいと思います。' },
    ],
    questions: [
      { q: 'どんなレストランをすすめましたか。', options: ['和食', 'イタリアン', '中華', 'フレンチ'], answer: 1, en: 'What kind of restaurant did he recommend?' },
      { q: 'なぜ予約したほうがいいですか。', options: ['安くなるから', '週末は混むから', 'メニューが少ないから', '遠いから'], answer: 1, en: 'Why should she make a reservation?' },
    ],
  },
  {
    id: 'lcv_n4_19', level: 'N4',
    lines: [
      { speaker: '男', jp: 'このアルバイトは週に何日働けますか。' },
      { speaker: '店長', jp: '週に3日から5日まで、自由に選べますよ。' },
      { speaker: '男', jp: '時給はいくらですか。' },
      { speaker: '店長', jp: '1100円です。夜は1300円になります。' },
    ],
    questions: [
      { q: '週に最大何日働けますか。', options: ['3日', '4日', '5日', '毎日'], answer: 2, en: 'What is the maximum days per week?' },
      { q: '夜の時給はいくらですか。', options: ['1100円', '1200円', '1300円', '1400円'], answer: 2, en: 'What is the evening hourly wage?' },
    ],
  },
  {
    id: 'lcv_n4_20', level: 'N4',
    lines: [
      { speaker: '女', jp: 'あの、電車が止まっているみたいなんですが。' },
      { speaker: '駅員', jp: 'はい、事故のため、しばらく運転を見合わせております。' },
      { speaker: '女', jp: '他の行き方はありますか。' },
      { speaker: '駅員', jp: 'バスをご利用いただくことができます。' },
    ],
    questions: [
      { q: 'なぜ電車が止まっていますか。', options: ['天気が悪いから', '事故があったから', '工事のため', '混んでいるから'], answer: 1, en: 'Why has the train stopped?' },
      { q: '駅員は何をすすめましたか。', options: ['タクシー', 'バス', '歩くこと', '待つこと'], answer: 1, en: 'What did the station staff suggest?' },
    ],
  },
  {
    id: 'lcv_n4_21', level: 'N4',
    lines: [
      { speaker: '男', jp: '最近何かいい映画を見ましたか。' },
      { speaker: '女', jp: 'はい、先週見た映画がとても感動的でした。' },
      { speaker: '男', jp: 'どんな映画ですか。' },
      { speaker: '女', jp: '家族の話です。ぜひ見てみてください。' },
    ],
    questions: [
      { q: '女の人はいつ映画を見ましたか。', options: ['今日', '昨日', '先週', '先月'], answer: 2, en: 'When did she watch the movie?' },
      { q: 'どんな話の映画ですか。', options: ['恋愛', '家族', '仕事', '旅行'], answer: 1, en: 'What is the movie about?' },
    ],
  },
  {
    id: 'lcv_n4_22', level: 'N4',
    lines: [
      { speaker: '女', jp: '来月の旅行、まだ計画を立てていませんね。' },
      { speaker: '男', jp: 'そうですね。どこに行きたいですか。' },
      { speaker: '女', jp: '温泉に行きたいです。' },
      { speaker: '男', jp: 'いいですね。じゃ、箱根はどうですか。二時間ぐらいで行けますよ。' },
    ],
    questions: [
      { q: '女の人はどこに行きたいですか。', options: ['海', '山', '温泉', '都市'], answer: 2, en: 'Where does she want to go?' },
      { q: '箱根までどのくらいかかりますか。', options: ['1時間', '2時間', '3時間', '4時間'], answer: 1, en: 'How long does it take to Hakone?' },
    ],
  },
  {
    id: 'lcv_n4_23', level: 'N4',
    lines: [
      { speaker: '部長', jp: 'どうして今日は遅刻したんですか。' },
      { speaker: '男', jp: '申し訳ありません。電車が事故で止まってしまって。' },
      { speaker: '部長', jp: 'そうでしたか。それは仕方ないですね。次から早めに家を出てくださいね。' },
      { speaker: '男', jp: 'はい、気をつけます。' },
    ],
    questions: [
      { q: '男の人はなぜ遅刻しましたか。', options: ['寝坊したから', '電車が止まったから', '道に迷ったから', '体調が悪かったから'], answer: 1, en: 'Why was the man late?' },
      { q: '部長は何と言いましたか。', options: ['怒った', '早めに家を出るよう言った', '会社を休むよう言った', '何も言わなかった'], answer: 1, en: 'What did the manager say?' },
    ],
  },
  {
    id: 'lcv_n4_24', level: 'N4',
    lines: [
      { speaker: '男', jp: 'すみません、資料の締め切りを少し延ばしていただけませんか。' },
      { speaker: '女', jp: 'どのくらい必要ですか。' },
      { speaker: '男', jp: 'あと二日いただけると助かります。' },
      { speaker: '女', jp: '分かりました。じゃ、金曜日までにお願いします。' },
    ],
    questions: [
      { q: '男の人はどのくらい延ばしてほしいですか。', options: ['1日', '2日', '3日', '1週間'], answer: 1, en: 'How much extra time does he want?' },
      { q: '新しい締め切りはいつですか。', options: ['水曜日', '木曜日', '金曜日', '月曜日'], answer: 2, en: 'What is the new deadline?' },
    ],
  },
  {
    id: 'lcv_n4_25', level: 'N4',
    lines: [
      { speaker: '男', jp: '先生、体調が悪くて試験が受けられませんでした。追試を受けられますか。' },
      { speaker: '先生', jp: '診断書がありますか。' },
      { speaker: '男', jp: 'はい、持っています。' },
      { speaker: '先生', jp: 'では、来週の月曜日に追試を行います。' },
    ],
    questions: [
      { q: '男の人はなぜ試験を受けられませんでしたか。', options: ['寝坊したから', '体調が悪かったから', '忘れていたから', '用事があったから'], answer: 1, en: "Why couldn't he take the exam?" },
      { q: '追試はいつですか。', options: ['今週の金曜日', '来週の月曜日', '来週の水曜日', '来月'], answer: 1, en: 'When is the makeup exam?' },
    ],
  },
  {
    id: 'lcv_n4_26', level: 'N4',
    lines: [
      { speaker: '女', jp: '二つの部屋、どちらがいいと思いますか。' },
      { speaker: '男', jp: '駅から近いほうがいいんじゃないですか。' },
      { speaker: '女', jp: 'でも、家賃が2万円も違うんです。' },
      { speaker: '男', jp: 'それなら、少し駅から遠くても安いほうがいいかもしれませんね。' },
    ],
    questions: [
      { q: '二つの部屋は何が主に違いますか。', options: ['広さ', '家賃', '築年数', '階数'], answer: 1, en: 'What mainly differs between the two rooms?' },
      { q: '男の人は最後に何とすすめましたか。', options: ['駅から近いほう', '安いほう', '広いほう', '新しいほう'], answer: 1, en: 'What did the man ultimately suggest?' },
    ],
  },
  {
    id: 'lcv_n4_27', level: 'N4',
    lines: [
      { speaker: '女', jp: 'もしもし、配達をお願いしたいんですが。' },
      { speaker: '店員', jp: 'かしこまりました。ご住所とご注文をお願いします。' },
      { speaker: '女', jp: 'ラーメンを二つお願いします。' },
      { speaker: '店員', jp: '30分ほどでお届けします。' },
    ],
    questions: [
      { q: '女の人は何を注文しましたか。', options: ['ラーメン一つ', 'ラーメン二つ', 'ラーメンとぎょうざ', 'うどん'], answer: 1, en: 'What did she order?' },
      { q: 'どのくらいで届きますか。', options: ['15分', '30分', '45分', '1時間'], answer: 1, en: 'How long until delivery?' },
    ],
  },
  {
    id: 'lcv_n4_28', level: 'N4',
    lines: [
      { speaker: '男', jp: '明日の運動会、天気は大丈夫でしょうか。' },
      { speaker: '女', jp: '天気予報では晴れるそうですが、午後から風が強くなるみたいです。' },
      { speaker: '男', jp: 'そうですか。テントを準備しておいたほうがいいですね。' },
      { speaker: '女', jp: 'はい、そうしましょう。' },
    ],
    questions: [
      { q: '明日の天気はどうなりそうですか。', options: ['雨', '晴れ', '雪', 'ずっとくもり'], answer: 1, en: 'What will the weather be like?' },
      { q: '午後は何が強くなりますか。', options: ['雨', '風', '日差し', '寒さ'], answer: 1, en: 'What will get stronger in the afternoon?' },
    ],
  },
  {
    id: 'lcv_n4_29', level: 'N4',
    lines: [
      { speaker: '女', jp: 'このジムに入会したいんですが、料金はいくらですか。' },
      { speaker: 'スタッフ', jp: '月会費は8000円です。今なら入会金が無料になります。' },
      { speaker: '女', jp: 'それはいいですね。何時まで利用できますか。' },
      { speaker: 'スタッフ', jp: '朝6時から夜11時までです。' },
    ],
    questions: [
      { q: '月会費はいくらですか。', options: ['5000円', '6000円', '8000円', '10000円'], answer: 2, en: 'What is the monthly fee?' },
      { q: '今、何が無料になりますか。', options: ['月会費', '入会金', 'タオル', '駐車場'], answer: 1, en: 'What is currently free?' },
    ],
  },
  {
    id: 'lcv_n4_30', level: 'N4',
    lines: [
      { speaker: '医者', jp: '検査の結果ですが、特に問題はありませんでした。' },
      { speaker: '男', jp: 'よかったです。血圧はどうでしたか。' },
      { speaker: '医者', jp: '少し高めですが、心配するほどではありません。塩分を控えてください。' },
      { speaker: '男', jp: 'はい、気をつけます。' },
    ],
    questions: [
      { q: '検査の結果はどうでしたか。', options: ['大きな問題があった', '特に問題はなかった', '再検査が必要', '分からなかった'], answer: 1, en: 'What were the checkup results?' },
      { q: '医者は何をアドバイスしましたか。', options: ['運動すること', '塩分を控えること', '薬を飲むこと', '早く寝ること'], answer: 1, en: 'What did the doctor advise?' },
    ],
  },
]
