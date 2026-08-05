// ── VOCABULARY DECKS ──────────────────────────────────────────────
// Sourced from a real JLPT vocabulary dataset rather than hand-typed —
// see src/data/vocabData.js and scripts/generate-vocab-data.mjs.
export { VOCAB_DECKS, VOCAB_ALL } from './vocabData.js'

// ── KANJI DECKS ───────────────────────────────────────────────────
// Sourced from a real kanji database (KANJIDIC2 + JLPT level data) rather
// than hand-typed — see src/data/kanjiData.js and scripts/generate-kanji-data.mjs.
export { KANJI_DECKS, KANJI_DB, KANJI_ALL } from './kanjiData.js'

// ── GRAMMAR PATTERNS ──────────────────────────────────────────────
// Sourced from a real (if imperfect) JLPT grammar database, not hand-typed.
// N5/N4 entries were individually fact-checked and corrected; N3/N2/N1 are
// passed through unverified from an LLM-generated source — see README and
// each entry's `verified` field. See src/data/grammarData.js and
// scripts/generate-grammar-data.mjs.
export { GRAMMAR_PATTERNS } from './grammarData.js'

// ── READING PASSAGES ──────────────────────────────────────────────
export const READING_PASSAGES = [
  {
    id: 'r1', level: 'N5', title: '私の一日',
    titleEn: 'My Day',
    text: `わたしは毎朝七時に起きます。朝ごはんを食べてから、電車で学校に行きます。学校では日本語を勉強します。昼ごはんは友達と食べます。午後は図書館で本を読みます。夕方六時ごろ家に帰ります。夜はテレビを見てから寝ます。`,
    vocab: [
      { word: '毎朝', reading: 'まいあさ', meaning: 'every morning' },
      { word: '起きます', reading: 'おきます', meaning: 'wake up' },
      { word: '図書館', reading: 'としょかん', meaning: 'library' },
      { word: '夕方', reading: 'ゆうがた', meaning: 'evening' },
    ],
    questions: [
      { q: '何時に起きますか。', options: ['六時', '七時', '八時', '九時'], answer: 1 },
      { q: '昼ごはんは誰と食べますか。', options: ['一人で', '先生と', '友達と', '家族と'], answer: 2 },
    ]
  },
  {
    id: 'r2', level: 'N4', title: '日本の季節',
    titleEn: 'Seasons of Japan',
    text: `日本には四つの季節があります。春は三月から五月で、桜の花が咲きます。多くの人が花見をします。夏は六月から八月で、とても暑いです。梅雨という雨の多い時期もあります。秋は九月から十一月で、紅葉が美しいです。冬は十二月から二月で、北の地方では雪がたくさん降ります。日本の気候は地域によって大きく異なります。`,
    vocab: [
      { word: '季節', reading: 'きせつ', meaning: 'season' },
      { word: '桜', reading: 'さくら', meaning: 'cherry blossom' },
      { word: '梅雨', reading: 'つゆ', meaning: 'rainy season' },
      { word: '紅葉', reading: 'こうよう', meaning: 'autumn leaves' },
      { word: '地域', reading: 'ちいき', meaning: 'region / area' },
    ],
    questions: [
      { q: '梅雨はどの季節に関係がありますか。', options: ['春', '夏', '秋', '冬'], answer: 1 },
      { q: '日本の気候について何と言っていますか。', options: ['全国同じだ', '地域によって異なる', '夏だけ暑い', '雪が多い'], answer: 1 },
    ]
  },
  {
    id: 'r3', level: 'N3', title: '環境問題と私たち',
    titleEn: 'Environmental Issues and Us',
    text: `現代社会では、環境問題が深刻な課題となっています。地球温暖化の影響により、世界各地で異常気象が増加しています。この問題の主な原因は、化石燃料の大量消費による温室効果ガスの排出です。解決策として、再生可能エネルギーの普及や省エネルギーの推進が挙げられます。個人レベルでも、日常生活の中でできることがたくさんあります。例えば、電気の節約やゴミの削減、公共交通機関の利用などが有効です。環境問題は私たち全員が取り組むべき問題です。`,
    vocab: [
      { word: '深刻', reading: 'しんこく', meaning: 'serious / grave' },
      { word: '地球温暖化', reading: 'ちきゅうおんだんか', meaning: 'global warming' },
      { word: '異常気象', reading: 'いじょうきしょう', meaning: 'abnormal weather' },
      { word: '温室効果', reading: 'おんしつこうか', meaning: 'greenhouse effect' },
      { word: '再生可能', reading: 'さいせいかのう', meaning: 'renewable' },
      { word: '省エネルギー', reading: 'しょうエネルギー', meaning: 'energy saving' },
    ],
    questions: [
      { q: '地球温暖化の主な原因は何ですか。', options: ['森林破壊', '人口増加', '化石燃料の消費', '水不足'], answer: 2 },
      { q: '個人ができる解決策として挙げられていないものはどれですか。', options: ['電気の節約', '工場の建設', 'ゴミの削減', '公共交通機関の利用'], answer: 1 },
    ]
  },
  {
    id: 'r4', level: 'N2', title: '科学技術の発展と社会',
    titleEn: 'Technological Development and Society',
    text: `科学技術の急速な発展は、現代社会に多大な恩恵をもたらす一方で、新たな課題も生み出しています。人工知能の普及により、これまで人間が行っていた多くの作業が自動化されつつあります。これは生産性の向上に寄与する反面、雇用問題という深刻な社会的課題を引き起こす可能性があります。また、インターネットの発達に伴い、情報へのアクセスが容易になった反面、偽情報や個人情報の流出といった問題も浮上しています。こうした課題に対処するためには、技術の恩恵を最大限に活かしつつも、倫理的な観点から適切な規制や教育を推進することが不可欠です。`,
    vocab: [
      { word: '多大', reading: 'ただい', meaning: 'great / enormous' },
      { word: '恩恵', reading: 'おんけい', meaning: 'benefit / blessing' },
      { word: '自動化', reading: 'じどうか', meaning: 'automation' },
      { word: '寄与する', reading: 'きよする', meaning: 'to contribute to' },
      { word: '偽情報', reading: 'にせじょうほう', meaning: 'false information' },
      { word: '不可欠', reading: 'ふかけつ', meaning: 'indispensable' },
      { word: '倫理的', reading: 'りんりてき', meaning: 'ethical' },
    ],
    questions: [
      { q: '人工知能の普及による問題として挙げられているのは何ですか。', options: ['環境破壊', '雇用問題', '交通渋滞', '食料不足'], answer: 1 },
      { q: '筆者が不可欠だと述べているのは何ですか。', options: ['技術の禁止', '規制と教育の推進', '人工知能の廃止', 'インターネットの制限'], answer: 1 },
    ]
  },
  {
    id: 'r5', level: 'N5', title: '私の家族',
    titleEn: 'My Family',
    text: `わたしの家族は四人です。父と母と妹がいます。父は会社員です。毎朝早く仕事に行きます。母は料理が上手です。晩ご飯はいつもおいしいです。妹は今年高校生になりました。妹はピアノを習っています。日曜日はよく家族で公園に行きます。公園でお弁当を食べます。とても楽しいです。`,
    vocab: [
      { word: '家族', reading: 'かぞく', meaning: 'family' },
      { word: '会社員', reading: 'かいしゃいん', meaning: 'company employee' },
      { word: '料理', reading: 'りょうり', meaning: 'cooking' },
      { word: '高校生', reading: 'こうこうせい', meaning: 'high school student' },
    ],
    questions: [
      { q: '妹は何を習っていますか。', options: ['ギター', 'ピアノ', '水泳', '英語'], answer: 1 },
      { q: '日曜日は家族で何をしますか。', options: ['買い物に行く', '映画を見る', '公園に行く', '家で休む'], answer: 2 },
    ]
  },
  {
    id: 'r6', level: 'N5', title: '週末の買い物',
    titleEn: 'Weekend Shopping',
    text: `きのう、わたしは友達とデパートに行きました。新しいくつがほしかったので、たくさん見ました。白いくつと黒いくつがありましたが、黒いくつを買いました。少し高かったですが、とても気に入っています。買い物のあとで、友達とカフェでコーヒーを飲みました。楽しい一日でした。`,
    vocab: [
      { word: 'デパート', reading: 'でぱーと', meaning: 'department store' },
      { word: '気に入っています', reading: 'きにいっています', meaning: 'like it / am pleased with it' },
      { word: 'カフェ', reading: 'かふぇ', meaning: 'cafe' },
    ],
    questions: [
      { q: '何を買いましたか。', options: ['白いくつ', '黒いくつ', 'かばん', 'ふく'], answer: 1 },
      { q: '買い物のあとで何をしましたか。', options: ['家に帰った', '映画を見た', 'コーヒーを飲んだ', '昼ご飯を食べた'], answer: 2 },
    ]
  },
  {
    id: 'r7', level: 'N4', title: '私のアルバイト',
    titleEn: 'My Part-time Job',
    text: `わたしは駅の近くのレストランでアルバイトをしています。週に三回、夕方から夜まで働いています。仕事は大変ですが、いろいろな人と話せるので楽しいです。先週、新しいアルバイトの人が入りました。まだ仕事に慣れていないので、私がいろいろ教えてあげました。今では上手にできるようになったので、安心しました。来月からは土曜日も働くつもりです。`,
    vocab: [
      { word: '慣れて', reading: 'なれて', meaning: 'get used to' },
      { word: '教えて', reading: 'おしえて', meaning: 'teach / tell' },
      { word: '安心しました', reading: 'あんしんしました', meaning: 'felt relieved' },
      { word: '来月', reading: 'らいげつ', meaning: 'next month' },
    ],
    questions: [
      { q: '新しいアルバイトの人はどうでしたか。', options: ['すぐ仕事ができた', 'まだ仕事に慣れていなかった', '仕事をやめた', '忙しくなかった'], answer: 1 },
      { q: '来月から何が変わりますか。', options: ['アルバイトをやめる', '土曜日も働く', 'レストランを変える', '週に一回になる'], answer: 1 },
    ]
  },
  {
    id: 'r8', level: 'N4', title: '京都旅行',
    titleEn: 'Trip to Kyoto',
    text: `先月、家族と京都へ旅行に行きました。新幹線で行ったので、思ったより早く着きました。京都には古いお寺や神社がたくさんあって、とてもきれいでした。特に、紅葉が見られる有名なお寺に行ったとき、写真をたくさん撮りました。夜は京都らしい料理を食べに行きました。少し値段が高かったですが、とてもおいしかったです。また行きたいと思っています。`,
    vocab: [
      { word: '新幹線', reading: 'しんかんせん', meaning: 'bullet train' },
      { word: 'お寺', reading: 'おてら', meaning: 'temple' },
      { word: '神社', reading: 'じんじゃ', meaning: 'shrine' },
      { word: '値段', reading: 'ねだん', meaning: 'price' },
    ],
    questions: [
      { q: '京都へ何で行きましたか。', options: ['飛行機', '新幹線', 'バス', '車'], answer: 1 },
      { q: '夜は何をしましたか。', options: ['お寺を見た', '写真を撮った', '京都らしい料理を食べた', '神社に行った'], answer: 2 },
    ]
  },
  {
    id: 'r9', level: 'N3', title: 'コンビニの進化',
    titleEn: 'The Evolution of Convenience Stores',
    text: `日本のコンビニは、単なる買い物の場所ではなくなりつつある。近年は、公共料金の支払いや荷物の受け取り、コピー機やATMの利用など、生活に欠かせないサービスを提供している。また、24時間営業という特徴を生かし、深夜に働く人々や急な用事がある人々にとって重要な存在となっている。一方で、人手不足という課題も抱えており、一部の店舗では営業時間を短縮する動きも見られる。今後、コンビニがどのように変化していくのか、注目されている。`,
    vocab: [
      { word: '公共料金', reading: 'こうきょうりょうきん', meaning: 'public utility bills' },
      { word: '支払い', reading: 'しはらい', meaning: 'payment' },
      { word: '人手不足', reading: 'ひとでぶそく', meaning: 'labor shortage' },
      { word: '短縮する', reading: 'たんしゅくする', meaning: 'to shorten' },
    ],
    questions: [
      { q: 'コンビニが提供しているサービスに含まれないものはどれか。', options: ['公共料金の支払い', '荷物の受け取り', 'ATMの利用', '医療相談'], answer: 3 },
      { q: 'コンビニが抱えている課題は何か。', options: ['売り上げの減少', '人手不足', '商品の不足', '利用者の減少'], answer: 1 },
    ]
  },
  {
    id: 'r10', level: 'N3', title: '高齢化社会と地域のつながり',
    titleEn: 'Aging Society and Community Ties',
    text: `日本は世界でも有数の高齢化社会であり、その割合は今後もさらに高くなると予測されている。高齢者が増えることで、医療や介護の需要が高まる一方、地域社会のつながりが薄れつつあることも問題視されている。かつては近所同士で助け合う習慣があったが、都市部を中心にそうした関係が失われてきた。この状況を改善するために、自治体やボランティア団体が高齢者向けの交流イベントを開いたり、見守り活動を行ったりしている。地域全体で高齢者を支える仕組みづくりが求められている。`,
    vocab: [
      { word: '高齢化', reading: 'こうれいか', meaning: 'aging (of a population)' },
      { word: '介護', reading: 'かいご', meaning: 'nursing care' },
      { word: '自治体', reading: 'じちたい', meaning: 'local government' },
      { word: '見守り', reading: 'みまもり', meaning: 'watching over / monitoring' },
    ],
    questions: [
      { q: '高齢化によってどんな需要が高まっているか。', options: ['教育', '医療や介護', '交通', '住宅'], answer: 1 },
      { q: '自治体やボランティア団体が行っていることは何か。', options: ['高齢者向けの交流イベント', '高齢者の就職支援', '高齢者向けの住宅建設', '高齢者への年金支給'], answer: 0 },
    ]
  },
  {
    id: 'r11', level: 'N2', title: 'SNSと人間関係の変化',
    titleEn: 'SNS and Changing Human Relationships',
    text: `ソーシャルメディアの普及により、人々のコミュニケーションのあり方は大きく変化した。かつては直接会って話すことが中心であったが、現在では画面を通じたやり取りが日常の一部となっている。この変化は、遠く離れた人と気軽に連絡が取れるようになったという利点をもたらす一方で、表情や声のトーンといった非言語情報が伝わりにくいという弊害も指摘されている。さらに、他人の投稿と自分を比較してしまうことで、精神的な負担を感じる人も少なくない。便利さの裏にあるこうした側面にも目を向ける必要があるだろう。`,
    vocab: [
      { word: 'あり方', reading: 'ありかた', meaning: 'the way something should be / state of' },
      { word: '弊害', reading: 'へいがい', meaning: 'harmful effect' },
      { word: '指摘されている', reading: 'してきされている', meaning: 'is being pointed out' },
      { word: '負担', reading: 'ふたん', meaning: 'burden' },
    ],
    questions: [
      { q: 'SNSの普及によってもたらされた利点は何か。', options: ['表情が伝わりやすくなった', '遠くの人と気軽に連絡が取れる', '精神的負担が減った', '直接会う機会が増えた'], answer: 1 },
      { q: 'SNSの弊害として挙げられているのは何か。', options: ['通信費が高くなること', '非言語情報が伝わりにくいこと', 'インターネットが遅くなること', '個人情報が多すぎること'], answer: 1 },
    ]
  },
  {
    id: 'r12', level: 'N2', title: '働き方改革と日本社会',
    titleEn: 'Work-Style Reform and Japanese Society',
    text: `近年、日本では「働き方改革」という言葉がよく聞かれるようになった。長時間労働が当たり前とされてきた従来の働き方を見直し、労働者一人ひとりがより柔軟に、そして健康的に働ける環境を整えようという動きである。具体的には、残業時間の上限規制や有給休暇取得の義務化、テレワークの導入などが進められている。こうした取り組みの背景には、少子高齢化による労働力不足や、仕事と家庭生活の両立を望む人が増えていることがある。制度が整えられつつある一方、企業文化や意識の変化にはまだ時間がかかると言われている。`,
    vocab: [
      { word: '従来', reading: 'じゅうらい', meaning: 'conventional / traditional' },
      { word: '上限規制', reading: 'じょうげんきせい', meaning: 'upper-limit regulation' },
      { word: '義務化', reading: 'ぎむか', meaning: 'making mandatory' },
      { word: '両立', reading: 'りょうりつ', meaning: 'balancing / compatibility' },
    ],
    questions: [
      { q: '働き方改革の具体的な取り組みに含まれないものはどれか。', options: ['残業時間の上限規制', '有給休暇取得の義務化', 'テレワークの導入', '定年退職年齢の引き下げ'], answer: 3 },
      { q: '働き方改革が進められている背景として挙げられているのは何か。', options: ['企業の利益拡大', '少子高齢化による労働力不足', '海外からの圧力', '物価の上昇'], answer: 1 },
    ]
  },

  // ── Short document-style passages (notices, ads, flyers) ──────────
  // Distinct from the narrative passages above: the real JLPT reading
  // section also tests short realistic documents, which read very
  // differently from a story (fragmented, list-like, information-dense).
  {
    id: 'r13', level: 'N5', title: '図書館からのお知らせ', format: 'notice',
    titleEn: 'Library Notice',
    text: `図書館からのお知らせ\n来週の月曜日から金曜日まで、図書館はお休みです。図書館の場所が変わりますので、注意してください。新しい住所は「みどり町三丁目」です。質問があったら、電話で連絡してください。電話番号は03-1234-5678です。`,
    vocab: [
      { word: 'お知らせ', reading: 'おしらせ', meaning: 'notice / announcement' },
      { word: '住所', reading: 'じゅうしょ', meaning: 'address' },
      { word: '注意', reading: 'ちゅうい', meaning: 'attention / caution' },
      { word: '連絡', reading: 'れんらく', meaning: 'contact' },
    ],
    questions: [
      { q: '図書館はいつから休みですか。', options: ['今週の月曜日', '来週の月曜日', '来週の金曜日', '来月の月曜日'], answer: 1 },
      { q: '新しい図書館はどこにありますか。', options: ['みどり町一丁目', 'みどり町二丁目', 'みどり町三丁目', 'さくら町三丁目'], answer: 2 },
    ]
  },
  {
    id: 'r14', level: 'N5', title: 'スーパーのセールのお知らせ', format: 'notice',
    titleEn: 'Supermarket Sale Notice',
    text: `さくらスーパー　春のセール\n4月1日から4月7日まで、春のセールをします。くだものと野菜が安くなります。りんごは1つ50円、バナナは1ふさ100円です。午前9時から午後8時まで、お店は開いています。ぜひ来てください。`,
    vocab: [
      { word: 'セール', reading: 'せーる', meaning: 'sale' },
      { word: 'くだもの', reading: 'くだもの', meaning: 'fruit' },
      { word: '開いて', reading: 'ひらいて', meaning: 'to open (te-form)' },
    ],
    questions: [
      { q: 'セールはいつまでですか。', options: ['4月1日', '4月5日', '4月7日', '4月10日'], answer: 2 },
      { q: 'りんごはいくらですか。', options: ['50円', '100円', '150円', '200円'], answer: 0 },
    ]
  },
  {
    id: 'r15', level: 'N5', title: '授業の時間変更のお知らせ', format: 'notice',
    titleEn: 'Class Schedule Change Notice',
    text: `来週火曜日の日本語の授業は、午前10時からではなく、午後1時から始まります。教室も202号室から305号室に変わります。忘れないでください。`,
    vocab: [
      { word: '授業', reading: 'じゅぎょう', meaning: 'class / lesson' },
      { word: '教室', reading: 'きょうしつ', meaning: 'classroom' },
      { word: '変わります', reading: 'かわります', meaning: 'to change' },
    ],
    questions: [
      { q: '来週火曜日の授業は何時からですか。', options: ['午前10時', '午後1時', '午後2時', '午後3時'], answer: 1 },
      { q: '教室はどこに変わりましたか。', options: ['202号室', '305号室', '105号室', '203号室'], answer: 1 },
    ]
  },
  {
    id: 'r16', level: 'N4', title: 'マンションのルールについて', format: 'notice',
    titleEn: 'Apartment Building Rules',
    text: `住民の皆様へ\nいつもお世話になっております。最近、ゴミの捨て方について、いくつかご注意いただきたいことがあります。燃えるゴミは月曜日と木曜日、燃えないゴミは水曜日に出してください。ゴミは朝8時までに出す必要があります。また、夜10時以降は、音楽や話し声にご注意ください。ご協力をお願いいたします。\n管理人`,
    vocab: [
      { word: '住民', reading: 'じゅうみん', meaning: 'resident' },
      { word: '捨て方', reading: 'すてかた', meaning: 'how to dispose of (something)' },
      { word: '協力', reading: 'きょうりょく', meaning: 'cooperation' },
    ],
    questions: [
      { q: '燃えるゴミはいつ出しますか。', options: ['月曜日と水曜日', '月曜日と木曜日', '火曜日と木曜日', '水曜日だけ'], answer: 1 },
      { q: 'ゴミは何時までに出さなければなりませんか。', options: ['朝7時', '朝8時', '朝9時', '夜10時'], answer: 1 },
    ]
  },
  {
    id: 'r17', level: 'N4', title: 'アルバイト募集', format: 'notice',
    titleEn: 'Part-Time Job Posting',
    text: `カフェ「ひまわり」では、いっしょに働いてくれる方を探しています。仕事内容はレジと料理を運ぶことです。経験がなくても大丈夫です。丁寧に教えます。時給は1000円から、週2日以上働ける方を歓迎します。興味がある方は、店長まで電話でご連絡ください。`,
    vocab: [
      { word: '時給', reading: 'じきゅう', meaning: 'hourly wage' },
      { word: '経験', reading: 'けいけん', meaning: 'experience' },
      { word: '歓迎します', reading: 'かんげいします', meaning: 'to welcome' },
    ],
    questions: [
      { q: '仕事内容は何ですか。', options: ['料理を作ること', 'レジと料理を運ぶこと', '掃除をすること', '配達をすること'], answer: 1 },
      { q: '経験がなくても働けますか。', options: ['はい、教えてもらえる', 'いいえ、経験が必要', '経験者だけ歓迎', '分からない'], answer: 0 },
    ]
  },
  {
    id: 'r18', level: 'N4', title: '秋祭りのお知らせ', format: 'notice',
    titleEn: 'Autumn Festival Announcement',
    text: `今年も秋祭りを行うことになりました。日時は10月15日土曜日、午後5時から午後9時までです。場所はいつもの公園ではなく、駅前広場に変更になりましたので、ご注意ください。雨天の場合は、翌週の日曜日に延期されます。皆様のご参加をお待ちしております。`,
    vocab: [
      { word: '祭り', reading: 'まつり', meaning: 'festival' },
      { word: '変更', reading: 'へんこう', meaning: 'change' },
      { word: '延期されます', reading: 'えんきされます', meaning: 'to be postponed' },
    ],
    questions: [
      { q: '秋祭りはどこで行われますか。', options: ['いつもの公園', '駅前広場', '学校のグラウンド', '市民ホール'], answer: 1 },
      { q: '雨が降ったらどうなりますか。', options: ['中止になる', '次の日曜日に延期される', '室内で行う', '変わらず行う'], answer: 1 },
    ]
  },
]

