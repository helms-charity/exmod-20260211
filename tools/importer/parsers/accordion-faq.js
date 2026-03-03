/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 * DOM: section#faqs .accordian > .faq-wrap
 *   Each faq-wrap: h3.trgr (question) + div.tog_cont (answer)
 * Block library: Accordion - 2 columns per row: [summary, text]
 * xwalk model: accordion-faq-item { summary (text), text (richtext) }
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all FAQ items
  const faqItems = element.querySelectorAll('.faq-wrap');

  faqItems.forEach((item) => {
    // Column 1: Summary (question title)
    const summaryFrag = document.createDocumentFragment();
    summaryFrag.appendChild(document.createComment(' field:summary '));
    const question = item.querySelector('h3.trgr, h3, h4, [class*="trgr"]');
    if (question) {
      const p = document.createElement('p');
      p.textContent = question.textContent.trim();
      summaryFrag.appendChild(p);
    }

    // Column 2: Text (answer content)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    const answer = item.querySelector('.tog_cont');
    if (answer) {
      // Get all paragraphs and content from the answer area
      const paragraphs = answer.querySelectorAll('p');
      if (paragraphs.length > 0) {
        paragraphs.forEach((p) => textFrag.appendChild(p));
      } else {
        // Fallback: grab all text content
        const p = document.createElement('p');
        p.textContent = answer.textContent.trim();
        textFrag.appendChild(p);
      }
    }

    cells.push([summaryFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
