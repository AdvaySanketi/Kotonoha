// ── KANA TABLES (Hiragana & Katakana) ────────────────────────────
// Structured as groups matching the standard gojūon (五十音) ordering,
// followed by dakuten/handakuten and yōon (combination) sounds.

function row(chars) {
  // chars: [ [glyph, romaji], ... ] -> objects with stable id
  return chars.map(([kana, romaji]) => ({ kana, romaji, id: `${kana}-${romaji}` }))
}

export const HIRAGANA_GROUPS = [
  { title: 'Vowels', chars: row([['あ','a'],['い','i'],['う','u'],['え','e'],['お','o']]) },
  { title: 'K', chars: row([['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko']]) },
  { title: 'S', chars: row([['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so']]) },
  { title: 'T', chars: row([['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to']]) },
  { title: 'N', chars: row([['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no']]) },
  { title: 'H', chars: row([['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho']]) },
  { title: 'M', chars: row([['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo']]) },
  { title: 'Y', chars: row([['や','ya'],['ゆ','yu'],['よ','yo']]) },
  { title: 'R', chars: row([['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro']]) },
  { title: 'W / N', chars: row([['わ','wa'],['を','wo'],['ん','n']]) },
  { title: 'Dakuten (゛)', chars: row([
    ['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go'],
    ['ざ','za'],['じ','ji'],['ず','zu'],['ぜ','ze'],['ぞ','zo'],
    ['だ','da'],['ぢ','ji'],['づ','zu'],['で','de'],['ど','do'],
    ['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo'],
  ]) },
  { title: 'Handakuten (゜)', chars: row([['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po']]) },
  { title: 'Yōon (combinations)', chars: row([
    ['きゃ','kya'],['きゅ','kyu'],['きょ','kyo'],
    ['しゃ','sha'],['しゅ','shu'],['しょ','sho'],
    ['ちゃ','cha'],['ちゅ','chu'],['ちょ','cho'],
    ['にゃ','nya'],['にゅ','nyu'],['にょ','nyo'],
    ['ひゃ','hya'],['ひゅ','hyu'],['ひょ','hyo'],
    ['みゃ','mya'],['みゅ','myu'],['みょ','myo'],
    ['りゃ','rya'],['りゅ','ryu'],['りょ','ryo'],
    ['ぎゃ','gya'],['ぎゅ','gyu'],['ぎょ','gyo'],
    ['じゃ','ja'],['じゅ','ju'],['じょ','jo'],
    ['びゃ','bya'],['びゅ','byu'],['びょ','byo'],
    ['ぴゃ','pya'],['ぴゅ','pyu'],['ぴょ','pyo'],
  ]) },
]

export const KATAKANA_GROUPS = [
  { title: 'Vowels', chars: row([['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o']]) },
  { title: 'K', chars: row([['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko']]) },
  { title: 'S', chars: row([['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so']]) },
  { title: 'T', chars: row([['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to']]) },
  { title: 'N', chars: row([['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no']]) },
  { title: 'H', chars: row([['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho']]) },
  { title: 'M', chars: row([['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo']]) },
  { title: 'Y', chars: row([['ヤ','ya'],['ユ','yu'],['ヨ','yo']]) },
  { title: 'R', chars: row([['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro']]) },
  { title: 'W / N', chars: row([['ワ','wa'],['ヲ','wo'],['ン','n']]) },
  { title: 'Dakuten (゛)', chars: row([
    ['ガ','ga'],['ギ','gi'],['グ','gu'],['ゲ','ge'],['ゴ','go'],
    ['ザ','za'],['ジ','ji'],['ズ','zu'],['ゼ','ze'],['ゾ','zo'],
    ['ダ','da'],['ヂ','ji'],['ヅ','zu'],['デ','de'],['ド','do'],
    ['バ','ba'],['ビ','bi'],['ブ','bu'],['ベ','be'],['ボ','bo'],
  ]) },
  { title: 'Handakuten (゜)', chars: row([['パ','pa'],['ピ','pi'],['プ','pu'],['ペ','pe'],['ポ','po']]) },
  { title: 'Yōon (combinations)', chars: row([
    ['キャ','kya'],['キュ','kyu'],['キョ','kyo'],
    ['シャ','sha'],['シュ','shu'],['ショ','sho'],
    ['チャ','cha'],['チュ','chu'],['チョ','cho'],
    ['ニャ','nya'],['ニュ','nyu'],['ニョ','nyo'],
    ['ヒャ','hya'],['ヒュ','hyu'],['ヒョ','hyo'],
    ['ミャ','mya'],['ミュ','myu'],['ミョ','myo'],
    ['リャ','rya'],['リュ','ryu'],['リョ','ryo'],
    ['ギャ','gya'],['ギュ','gyu'],['ギョ','gyo'],
    ['ジャ','ja'],['ジュ','ju'],['ジョ','jo'],
    ['ビャ','bya'],['ビュ','byu'],['ビョ','byo'],
    ['ピャ','pya'],['ピュ','pyu'],['ピョ','pyo'],
  ]) },
]
