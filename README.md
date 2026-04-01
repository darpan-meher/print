# Angular 15 — Side-by-Side Print Table

A production-ready Angular 15 component that renders an HTML table in two side-by-side columns with:

- **Repeating page header** on every printed page
- **Repeating table headers** (`<thead>`) on every page break
- **Side-by-side layout** (two tables in a CSS grid)
- **Status badges** with correct background colours preserved in print
- **A4 landscape** page format with native page numbers

---

## Project Structure

```
src/
├── app/
│   ├── print-table/
│   │   ├── print-table.component.ts      ← Component logic & data
│   │   ├── print-table.component.html    ← Template with print markup
│   │   └── print-table.component.scss   ← Screen + @media print styles
│   ├── app.component.ts
│   └── app.module.ts
├── index.html
├── main.ts
└── styles.scss
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
ng serve

# Open browser
http://localhost:4200
```

---

## How Print Works

### 1. Repeating page header
```scss
@media print {
  .page-header {
    display: table-header-group !important;
  }
}
```
Setting `display: table-header-group` on any block causes browsers to repeat it at the top of every printed page when the content overflows.

### 2. Repeating table header rows
```scss
@media print {
  .data-table thead {
    display: table-header-group; /* native browser behaviour */
  }
}
```
This is the standard CSS rule that tells browsers to reprint `<thead>` at the top of each new page when a table spans multiple pages.

### 3. Prevent row splitting
```scss
tbody tr {
  break-inside: avoid;
  page-break-inside: avoid; /* legacy */
}
```

### 4. Preserve background colours
```scss
.badge, thead tr, .row-alt {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
```
Without this, Chrome/Edge strip all background colours in print mode.

### 5. Page size & native page numbers
```scss
@page {
  size: A4 landscape;
  margin: 10mm 12mm;

  @bottom-right {
    content: "Page " counter(page) " of " counter(pages);
  }
}
```

---

## Customising

| What to change | Where |
|---|---|
| Data source | `generateData()` in `.component.ts` |
| Columns shown | `<thead>` + `<tbody>` in `.component.html` |
| Page size | `@page { size: ... }` in `.component.scss` |
| Rows per page | Controlled by browser based on content height |
| Company name / title | `pageTitle`, `companyName` in `.component.ts` |

---

## Browser Support for Print

| Feature | Chrome | Edge | Firefox | Safari |
|---|---|---|---|---|
| `table-header-group` repeat | ✅ | ✅ | ✅ | ✅ |
| `print-color-adjust` | ✅ | ✅ | ✅ | ✅ |
| `@page @bottom-right` | ✅ | ✅ | ✅ | ⚠️ Partial |

> **Tip:** In the browser print dialog, enable **"Background graphics"** to ensure header and badge colours appear correctly.
