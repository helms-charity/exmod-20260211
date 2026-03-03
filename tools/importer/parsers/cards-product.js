/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product. Base: cards.
 * Source: https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 * DOM instances:
 *   - section#explore .nudge-swiper-exp-more: 2 card product items (image + card name + link)
 *   - section#related .MT50: 6 related search link items (icon + name)
 * Block library: Cards - 2 columns per row: [image, text content]
 * xwalk model: card { image (reference), text (richtext) }
 */
export default function parse(element, { document }) {
  const cells = [];

  // Pattern 1: Explore other cards - div.nudges-slider.swiper-slide > div.card
  const exploreCards = element.querySelectorAll('.nudges-slider.swiper-slide');
  if (exploreCards.length > 0) {
    exploreCards.forEach((slide) => {
      const card = slide.querySelector('.card') || slide;
      const img = card.querySelector('img.card-img-top, figure img, img');
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      if (img) imgFrag.appendChild(img);

      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      const title = card.querySelector('h5.card-title, h4, h3, h5');
      if (title) textFrag.appendChild(title);
      const link = card.querySelector('a.redirect, a[class*="exp-btn"], a');
      if (link) textFrag.appendChild(link);

      cells.push([imgFrag, textFrag]);
    });
  }

  // Pattern 2: Related searches - div.col-md-4 > a.intBx
  const relatedItems = element.querySelectorAll('a.intBx, .col-md-4 a.intBx');
  if (relatedItems.length > 0) {
    relatedItems.forEach((item) => {
      const img = item.querySelector('figure img, img');
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      if (img) imgFrag.appendChild(img);

      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      // Clone the link and keep just the text
      const linkClone = item.cloneNode(true);
      // Remove nested images from the link clone
      linkClone.querySelectorAll('img, figure, picture').forEach((el) => el.remove());
      textFrag.appendChild(linkClone);

      cells.push([imgFrag, textFrag]);
    });
  }

  // Fallback
  if (cells.length === 0) {
    const genericCards = element.querySelectorAll('.card, .swiper-slide, a[class*="intBx"]');
    genericCards.forEach((card) => {
      const img = card.querySelector('img');
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      if (img) imgFrag.appendChild(img);

      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      const children = card.querySelectorAll('h2, h3, h4, h5, p, a');
      children.forEach((child) => textFrag.appendChild(child));

      cells.push([imgFrag, textFrag]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
