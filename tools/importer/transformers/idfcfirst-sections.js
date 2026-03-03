/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: IDFC First Bank section breaks and section-metadata.
 * Selectors from captured DOM of https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 * Runs in afterTransform only. Uses payload.template.sections.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const doc = element.ownerDocument || document;
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid DOM position shifts
    const resolved = [];
    for (const section of sections) {
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let found = null;
      for (const sel of selectors) {
        try {
          found = element.querySelector(sel);
        } catch (e) {
          // invalid selector, skip
        }
        if (found) break;
      }
      resolved.push({ section, element: found });
    }

    // Reverse to process bottom-up
    resolved.reverse();

    for (const { section, element: sectionEl } of resolved) {
      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add <hr> before each section except the first
      if (section.id !== sections[0].id) {
        const hr = doc.createElement('hr');
        // If section element is the only/first child of a wrapper div, insert before the wrapper
        const parent = sectionEl.parentElement;
        if (parent && parent !== element && !sectionEl.previousElementSibling) {
          parent.before(hr);
        } else {
          sectionEl.before(hr);
        }
      }
    }
  }
}
