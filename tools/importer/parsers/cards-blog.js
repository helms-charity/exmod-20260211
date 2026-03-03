/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-blog. Base: cards.
 * Source: https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 * DOM: section#blogs .first-select-finfirst-blog-section > .ff-finfirst-blog-slider > .swiper-wrapper > .swiper-slide
 * Each blog card: div.banner-bg (image) + div.slider-content (title, description, Read More CTA)
 * Block library: Cards - 2 columns per row: [image, text content]
 * xwalk model: card { image (reference), text (richtext) }
 */
export default function parse(element, { document }) {
  const cells = [];

  // Blog cards - each swiper-slide contains banner-bg (image) + slider-content (text)
  const blogSlides = element.querySelectorAll('.swiper-slide');

  blogSlides.forEach((slide) => {
    // Column 1: image field (reference)
    const img = slide.querySelector('.banner-bg img, img.card-img-top, img');
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    if (img) imgFrag.appendChild(img);

    // Column 2: text field (richtext)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    const content = slide.querySelector('.slider-content') || slide;
    const title = content.querySelector('h5.sldrh2, h5, h4, h3, [class*="sldrh"]');
    if (title) {
      const h = document.createElement('h5');
      h.textContent = title.textContent.trim();
      textFrag.appendChild(h);
    }
    const desc = content.querySelector('p.pera, p');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textFrag.appendChild(p);
    }
    const cta = content.querySelector('a.btn-red-new, a.btn, a[class*="blog-btn"], a');
    if (cta) {
      const link = document.createElement('a');
      link.setAttribute('href', cta.getAttribute('href') || '#');
      link.textContent = cta.textContent.trim().replace(/\s+/g, ' ');
      const p = document.createElement('p');
      p.appendChild(link);
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-blog', cells });
  element.replaceWith(block);
}
