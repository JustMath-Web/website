import assert from 'node:assert/strict'
import {
  validateFaqAnswer,
  validateFaqLevels,
  validateFaqText,
} from '../schemaTypes/lib/faqValidation'

const levels = (titleLevel?: string, questionLevel?: string) => ({titleLevel, questionLevel})

assert.equal(validateFaqText('Common questions'), true)
for (const bad of [undefined, null, '', '   ', '\n\t']) {
  assert.equal(validateFaqText(bad), 'Required.')
}

assert.equal(validateFaqLevels(undefined), true)
// The only valid pairs: the question level is exactly one below the FAQ title.
for (const [t, q] of [
  ['h2', 'h3'],
  ['h3', 'h4'],
  ['h4', 'h5'],
]) {
  assert.equal(validateFaqLevels(levels(t, q)), true, `${t}/${q}`)
}

// Bob, PR #114 P1: a skipped level inside the FAQ's own parent-child pair is an error, not a
// warning that still lets Publish through.
for (const [t, q] of [
  ['h2', 'h4'],
  ['h2', 'h5'],
  ['h3', 'h5'],
]) {
  assert.match(String(validateFaqLevels(levels(t, q))), /exactly one level below/, `${t}/${q}`)
}
assert.match(String(validateFaqLevels(levels('h2', 'h4'))), /H2 → questions H3/)

// A question cannot sit at or above its own FAQ title.
for (const [t, q] of [
  ['h3', 'h3'],
  ['h4', 'h3'],
  ['h4', 'h4'],
]) {
  assert.match(String(validateFaqLevels(levels(t, q))), /exactly one level below/, `${t}/${q}`)
}

// Cleared or script-written values are rejected, not silently defaulted by the page.
assert.match(String(validateFaqLevels(levels(undefined, 'h3'))), /FAQ title/)
assert.match(String(validateFaqLevels(levels('h2', undefined))), /questions/)
assert.match(String(validateFaqLevels(levels('h1', 'h3'))), /FAQ title/)
assert.match(String(validateFaqLevels(levels('h2', 'h2'))), /questions/) // h2 is not offered for questions
assert.match(String(validateFaqLevels(levels('h2', 'h7'))), /questions/)
// H6 is no longer offered: with titles capped at H4 it could never be the one level below.
assert.match(String(validateFaqLevels(levels('h4', 'h6'))), /questions/)

// Bob, PR #114 P2: an answer needs real text, not just a block.
const block = (...children: object[]) => ({_type: 'block', children})
const span = (text: string) => ({_type: 'span', text})
const math = (latex: string) => ({_type: 'mathInline', latex})

assert.equal(validateFaqAnswer(undefined), true) // `required()` reports a missing answer
assert.equal(validateFaqAnswer([]), true) // `min(1)` reports an empty list
assert.equal(validateFaqAnswer([block(span('Yes.'))]), true)
assert.equal(validateFaqAnswer([block(math('\\sqrt{2}'))]), true) // maths-only is a real answer
assert.equal(validateFaqAnswer([block(span('  ')), block(span('Second paragraph.'))]), true)
for (const bad of [
  [block()], // one block, no children
  [block(span(''))],
  [block(span('   '), span('\n\t'))],
  [block(math('  '))],
  [block(span(' ')), block(span(''))],
]) {
  assert.match(String(validateFaqAnswer(bad)), /Write an answer/, JSON.stringify(bad))
}

console.log(
  'OK: FAQ validation enforces question-exactly-one-below-title and rejects blank titles, questions and answers.',
)
