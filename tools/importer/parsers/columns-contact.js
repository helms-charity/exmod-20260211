/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-contact. Base: columns.
 * Source: https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 * DOM: section.get-in-touch .container .row > .col-4.gt-item
 *   Each column: a > figure > img + p (link with icon and label)
 * Block library: Columns - N columns per row (each col-4 = one column)
 * Columns block type: no field hints needed (exempt per hinting rules)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all contact columns
  const columns = element.querySelectorAll('.col-4.gt-item, .gt-item');

  if (columns.length > 0) {
    // Single row with all columns
    const row = [];
    columns.forEach((col) => {
      const colFrag = document.createDocumentFragment();

      const link = col.querySelector('a');
      if (link) {
        // Get the image
        const img = link.querySelector('img');
        if (img) colFrag.appendChild(img);

        // Get the text
        const text = link.querySelector('p');
        if (text) {
          // Wrap text in a link
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = text.textContent.trim();
          colFrag.appendChild(a);
        }
      }

      row.push(colFrag);
    });

    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-contact', cells });
  element.replaceWith(block);
}
