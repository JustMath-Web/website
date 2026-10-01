import assert from 'node:assert/strict'
import {validateTableHeader} from '../schemaTypes/lib/tableValidation'

const text = (t: string) => ({value: [{children: [{_type: 'span', text: t}]}]})
const math = (latex: string) => ({value: [{children: [{_type: 'mathInline', latex}]}]})
const blank = {value: [{children: [{_type: 'span', text: '  '}]}]}
const row = (...cells: object[]) => ({cells})

const ok = [row(text('Surd'), text('Simplest form')), row(math('\\sqrt{72}'), math('6\\sqrt{2}'))]

assert.equal(validateTableHeader(undefined), true)
assert.equal(validateTableHeader({headerRows: 1, rows: ok}), true)
assert.equal(validateTableHeader({headerRows: 1, rows: [row(math('x'), text('y'))]}), true)
assert.equal(validateTableHeader({headerRows: 2, rows: ok}), true)
// Empty table: left to the required-rows rule, not reported twice.
assert.equal(validateTableHeader({headerRows: 0, rows: []}), true)

// The header-toggle-off path: Studio stores 0 (or drops the field).
assert.match(String(validateTableHeader({headerRows: 0, rows: ok})), /Turn the header row on/)
assert.match(String(validateTableHeader({rows: ok})), /Turn the header row on/)
assert.match(String(validateTableHeader({headerRows: 1.5, rows: ok})), /Turn the header row on/)
assert.match(String(validateTableHeader({headerRows: -1, rows: ok})), /Turn the header row on/)
assert.match(String(validateTableHeader({headerRows: 3, rows: ok})), /more header rows/)
assert.match(
  String(validateTableHeader({headerRows: 1, rows: [row(text('A'), blank), ...ok]})),
  /header cell/,
)
assert.match(String(validateTableHeader({headerRows: 1, rows: [row(), ...ok]})), /header cell/)

console.log('OK: table header validation rejects header-off, out-of-range and blank-header tables.')
