interface CellLike {
  value?: {children?: {_type?: string; text?: string; latex?: string}[]}[]
}

interface TableLike {
  headerRows?: number
  rows?: {cells?: CellLike[]}[]
}

function cellHasContent(cell: CellLike): boolean {
  return (cell.value ?? []).some((block) =>
    (block.children ?? []).some((child) =>
      child._type === 'mathInline' ? !!child.latex?.trim() : !!child.text?.trim(),
    ),
  )
}

/**
 * A data table needs column headers (WCAG 1.3.1). Studio's table menu lets an editor switch the
 * header row off, and Table.astro can only render `<th>` for rows the editor marked as headers, so
 * the gate has to be here: at least one header row, no more header rows than rows, and no blank
 * header cell (a blank `<th>` names its column to nobody).
 */
export function validateTableHeader(value: unknown): true | string {
  const table = value as TableLike | undefined
  if (!table) return true
  const rows = table.rows ?? []
  if (rows.length === 0) return true // the required-rows rule reports an empty table
  const headerRows = table.headerRows ?? 0
  if (!Number.isInteger(headerRows) || headerRows < 1) {
    return 'Turn the header row on (table menu → Header row). A table needs column headers.'
  }
  if (headerRows > rows.length) return 'There are more header rows than rows.'
  const blank = rows.slice(0, headerRows).some((row) => {
    const cells = row.cells ?? []
    return cells.length === 0 || cells.some((cell) => !cellHasContent(cell))
  })
  return blank ? 'Every header cell needs text.' : true
}

interface FigureItem {
  _type?: string
  children?: {text?: string}[]
}

/**
 * `postTable.content` is a Portable Text field only so Studio's table editor can render in it.
 * It must hold exactly one grid; typed text outside the grid would never be rendered, so reject
 * it instead of silently dropping an editor's words. Empty paragraphs are the editor's own
 * scaffolding and are fine.
 */
export function validateTableFigureContent(value: unknown): true | string {
  const items = (value as FigureItem[] | undefined) ?? []
  const grids = items.filter((item) => item._type === 'table')
  if (grids.length !== 1) return 'Add exactly one table: Insert → Table.'
  const stray = items.some(
    (item) => item._type === 'block' && (item.children ?? []).some((child) => !!child.text?.trim()),
  )
  return stray ? 'Remove the text outside the grid. Put it inside a table cell.' : true
}
