import assert from 'node:assert/strict'
import {
  MAX_DECLARATION_LENGTH,
  validateRedirectFrom,
  validateRedirectTo,
} from '../schemaTypes/lib/redirectValidation'

// Empty values are left to `required()`, not reported twice.
for (const empty of [undefined, null, ''] as const) {
  assert.equal(validateRedirectFrom(empty), true)
  assert.equal(validateRedirectTo(empty), true)
}

// Valid entries.
assert.equal(validateRedirectFrom('/pricing'), true)
assert.equal(validateRedirectFrom('/old-post/'), true)
assert.equal(validateRedirectTo('/#pricing'), true)
assert.equal(validateRedirectTo('/blog/new/'), true)
assert.equal(validateRedirectTo('https://example.com/x?y=1'), true)
assert.equal(validateRedirectTo('/b', '/a'), true)

// BOB P1: a trailing/leading space used to publish and then vanish at build time.
assert.match(String(validateRedirectFrom('/pricing ')), /spaces/)
assert.match(String(validateRedirectFrom(' /pricing')), /spaces/)
assert.match(String(validateRedirectFrom('/a\nb')), /spaces or line breaks/)
assert.match(String(validateRedirectFrom('/a\tb')), /spaces or line breaks/)
assert.match(String(validateRedirectTo('/ok ')), /spaces/)
assert.match(String(validateRedirectTo('/a\n/evil /x 301')), /spaces or line breaks/)

// Source shape.
assert.match(String(validateRedirectFrom('pricing')), /single \//)
assert.match(String(validateRedirectFrom('//host')), /single \//)
assert.match(String(validateRedirectFrom('/')), /home page/)
assert.match(String(validateRedirectFrom('/blog/*')), /wildcards/)
assert.match(String(validateRedirectFrom('/p/:slug')), /wildcards/)

// BOB P2: Cloudflare cannot match a query string or fragment in the source.
assert.match(String(validateRedirectFrom('/old?ref=1')), /\? or #/)
assert.match(String(validateRedirectFrom('/old#part')), /\? or #/)

// Target shape.
assert.match(String(validateRedirectTo('http://example.com')), /https/)
assert.match(String(validateRedirectTo('javascript:alert(1)')), /https/)
assert.match(String(validateRedirectTo('//evil.example')), /https/)
assert.match(String(validateRedirectTo('blog')), /https/)

// Loop.
assert.match(String(validateRedirectTo('/same', '/same')), /loop/)

// Length: the whole `from to 301` line must fit Cloudflare's 1,000-character limit, exactly.
// A line is `from to 301`: from + to + 5 (two spaces and the status). This one is exactly 1000.
const fits = '/' + 'a'.repeat(MAX_DECLARATION_LENGTH - 5 - 2 - 1)
assert.equal(validateRedirectTo('/b', fits), true)
assert.match(String(validateRedirectTo('/bb', fits)), /too long/)

console.log('redirect validation: all assertions passed')
