// Deterministic hiragana -> romaji (Hepburn-ish) conversion, built from the
// same table used by the kana study module (src/data/kana.js) so there is
// a single source of truth for kana/romaji pairs.
import { HIRAGANA_GROUPS, KATAKANA_GROUPS } from './kana.js'

const KANA_TO_ROMAJI = {}
for (const group of [...HIRAGANA_GROUPS, ...KATAKANA_GROUPS]) {
  for (const { kana, romaji } of group.chars) KANA_TO_ROMAJI[kana] = romaji
}

const SMALL_VOWELS = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo', ャ: 'ya', ュ: 'yu', ョ: 'yo' }
const VOWELS = new Set(['a', 'i', 'u', 'e', 'o'])

// Converts a raw KANJIDIC-style reading (may contain "." for okurigana
// boundaries and a leading/trailing "-" for suffix/prefix-only readings)
// into plain romaji. Falls back to returning the untouched character for
// anything outside the standard kana table (rare edge cases).
export function kanaToRomaji(raw) {
  const clean = raw.replace(/[.\-]/g, '')
  let out = ''
  let i = 0
  while (i < clean.length) {
    const two = clean.slice(i, i + 2)
    if (KANA_TO_ROMAJI[two]) { out += KANA_TO_ROMAJI[two]; i += 2; continue }
    const ch = clean[i]
    if (ch === 'っ' || ch === 'ッ') {
      // Sokuon: double the following consonant.
      const next = clean[i + 1]
      const nextTwo = clean.slice(i + 1, i + 3)
      const nextRomaji = KANA_TO_ROMAJI[nextTwo] || KANA_TO_ROMAJI[next]
      if (nextRomaji) out += nextRomaji[0]
      i += 1
      continue
    }
    if (ch === 'ー') {
      // Chōonpu: repeat the preceding vowel sound.
      const last = out[out.length - 1]
      if (last && VOWELS.has(last)) out += last
      i += 1
      continue
    }
    if (KANA_TO_ROMAJI[ch]) { out += KANA_TO_ROMAJI[ch]; i += 1; continue }
    if (SMALL_VOWELS[ch]) { out += SMALL_VOWELS[ch]; i += 1; continue }
    out += ch
    i += 1
  }
  return out
}
