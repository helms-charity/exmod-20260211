/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-privilege. Base: tabs.
 * Source: https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 * DOM: section#possibilities .tab-Section
 *   - ul.nav.nav-tabs#ashva-tab-container > li.nav-item > a.nav-link (tab labels)
 *   - div.tab-content#ashva-tab-container-myTabContent > div.tab-pane (tab panels)
 *     Each panel: div.astha-red-carped-slider > div.swiper-wrapper > div.ashva-slider.swiper-slide
 *     Each slide: div.banner-bg (image) + text content
 * Block library: Tabs - 2 columns per row: [tab label, tab content]
 * xwalk model: tabs-privilege-item { title, content_heading, content_headingType (collapsed), content_image, content_richtext }
 * Column mapping (grouped by prefix):
 *   Column 1: title (standalone)
 *   Column 2: content_heading + content_image + content_richtext (content_ prefix grouped, model field order)
 * Each slide = one row. Slides in the same tab share the same title value.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find tab navigation items
  const tabLinks = element.querySelectorAll('ul.nav-tabs .nav-link, #ashva-tab-container .nav-link');
  // Find tab content panels
  const tabPanes = element.querySelectorAll('.tab-content .tab-pane, #ashva-tab-container-myTabContent .tab-pane');

  // Match each tab link with its corresponding panel
  tabLinks.forEach((tabLink, index) => {
    const labelText = tabLink.textContent.trim();
    const panel = tabPanes[index];

    if (panel) {
      // Get slides within this tab panel
      const slides = panel.querySelectorAll('.ashva-slider.swiper-slide, .swiper-slide');

      slides.forEach((slide) => {
        // Column 1: Tab label (title field)
        const titleFrag = document.createDocumentFragment();
        titleFrag.appendChild(document.createComment(' field:title '));
        const titleEl = document.createElement('p');
        titleEl.textContent = labelText;
        titleFrag.appendChild(titleEl);

        // Column 2: Grouped content_ fields in model field order
        const contentFrag = document.createDocumentFragment();

        // 1. content_heading (text field - extract heading text)
        const textArea = slide.querySelector('.slider-content, .zindex, .z1');
        const heading = textArea
          ? textArea.querySelector('h2, h3, h4, h5, [class*="head"]')
          : null;
        if (heading) {
          contentFrag.appendChild(document.createComment(' field:content_heading '));
          const h3 = document.createElement('h3');
          h3.textContent = heading.textContent.trim();
          contentFrag.appendChild(h3);
        }

        // 2. content_headingType — collapsed (ends in Type), skip per Rule 3

        // 3. content_image (reference field - single image)
        const img = slide.querySelector('.banner-bg img, img');
        if (img) {
          contentFrag.appendChild(document.createComment(' field:content_image '));
          contentFrag.appendChild(img);
        }

        // 4. content_richtext (richtext field - description text)
        const desc = textArea
          ? textArea.querySelector('p, [class*="desc"]')
          : null;
        if (desc) {
          contentFrag.appendChild(document.createComment(' field:content_richtext '));
          contentFrag.appendChild(desc);
        }

        cells.push([titleFrag, contentFrag]);
      });
    } else {
      // Panel not found — still emit one row with title only
      const titleFrag = document.createDocumentFragment();
      titleFrag.appendChild(document.createComment(' field:title '));
      const titleEl = document.createElement('p');
      titleEl.textContent = labelText;
      titleFrag.appendChild(titleEl);

      const contentFrag = document.createDocumentFragment();
      cells.push([titleFrag, contentFrag]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-privilege', cells });
  element.replaceWith(block);
}
