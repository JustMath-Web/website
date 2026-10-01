import assert from 'node:assert/strict'
import {
  faqLevelSkipWarning,
  validateFaqLevels,
  validateFaqText,
} from '../schemaTypes/lib/faqValidation'

const levels = (titleLevel?: string, questionLevel?: string) => ({titleLevel, questionLevel})

assert.equal(validateFaqText('Common questions'), true)
for (const bad of [undefined, null, '', '   ', '\n\t']) {
  assert.equal(validateFaqText(bad), 'Required.')
}

assert.equal(validateFaqLevels(undefined), true)
for (const [t, q] of [
  ['h2', 'h3'],
  ['h2', 'h4'],
  ['h3', 'h4'],
  ['h4', 'h6'],
]) {
  assert.equal(validateFaqLevels(levels(t, q)), true, `${t}/${q}`)
}

// A question cannot sit at or above its own FAQ title.
for (const [t, q] of [
  ['h3', 'h3'],
  ['h4', 'h3'],
  ['h4', 'h4'],
]) {
  assert.match(String(validateFaqLevels(levels(t, q))), /deeper than the FAQ title/, `${t}/${q}`)
}

// Cleared or script-written values are rejected, not silently defaulted by the page.
assert.match(String(validateFaqLevels(levels(undefined, 'h3'))), /FAQ title/)
assert.match(String(validateFaqLevels(levels('h2', undefined))), /questions/)
assert.match(String(validateFaqLevels(levels('h1', 'h3'))), /FAQ title/)
assert.match(String(validateFaqLevels(levels('h2', 'h2'))), /questions/) // h2 is not offered for questions
assert.match(String(validateFaqLevels(levels('h2', 'h7'))), /questions/)

// Skipping a level warns; the next level down and invalid input do not.
assert.equal(faqLevelSkipWarning(levels('h2', 'h3')), true)
assert.equal(faqLevelSkipWarning(levels('h3', 'h4')), true)
assert.equal(faqLevelSkipWarning(levels('h3', 'h3')), true) // already an error, not also a warning
assert.equal(faqLevelSkipWarning(undefined), true)
assert.match(String(faqLevelSkipWarning(levels('h2', 'h4'))), /skip a heading level/)
assert.match(String(faqLevelSkipWarning(levels('h2', 'h6'))), /skip a heading level/)

console.log(
  'OK: FAQ validation enforces question-deeper-than-title, rejects blanks, warns on skipped levels.',
)
