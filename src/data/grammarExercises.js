// Fill-in-the-blank grammar questions, built mechanically from the already
// fact-checked N5/N4 grammar patterns rather than authored separately —
// so there's nothing new here to get wrong. For each verified pattern we
// strip the English placeholder labels (Verb/Noun/Adjective/A/B) and tildes
// from its `pattern` string; if what's left is a single contiguous Japanese
// fragment (not a multi-slot template like "AはBが〜", which has two
// separate literal pieces and no single unambiguous blank), and that
// fragment occurs exactly once in one of the pattern's own example
// sentences, it becomes a fill-in-the-blank question. Single-character
// particles (は/が/を/に/で/と/も alone) are excluded too — too trivial and
// prone to matching the wrong occurrence in longer sentences.
import { GRAMMAR_PATTERNS } from './content.js'

function extractLiteral(pattern) {
  const stripped = pattern
    .replace(/い-Adjective|な-Adjective|Adjectival Verb|Adjective|Verb|Noun|\bA\b|\bB\b/g, '|')
    .replace(/[〜～]/g, '|')
    .replace(/[（）()]/g, '|')
  const parts = stripped.split('|').map(s => s.trim()).filter(Boolean)
  return parts.length === 1 ? parts[0] : null
}

function countOccurrences(str, sub) {
  let count = 0, pos = 0
  while ((pos = str.indexOf(sub, pos)) !== -1) { count++; pos += sub.length }
  return count
}

export const FILL_BLANK_POOL = (() => {
  const pool = []
  for (const g of GRAMMAR_PATTERNS) {
    if (!g.verified) continue
    const lit = extractLiteral(g.pattern)
    if (!lit || lit.length < 2) continue
    for (const ex of g.examples) {
      if (countOccurrences(ex.jp, lit) === 1) {
        const idx = ex.jp.indexOf(lit)
        pool.push({
          id: `fb_${g.id}`,
          level: g.level,
          pattern: g.pattern,
          before: ex.jp.slice(0, idx),
          blank: lit,
          after: ex.jp.slice(idx + lit.length),
          en: ex.en,
        })
        break
      }
    }
  }
  return pool
})()
