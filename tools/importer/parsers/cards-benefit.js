/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-benefit. Base: cards.
 * Source: https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 * DOM instances:
 *   - section#benefits .nudge-swiper-benefits: 4 benefit cards (icon + title + description)
 *   - section#rewards-section .astha-reward-points-slider: 2 reward cards (image + heading + description)
 *   - section.ashva-doc-section .impt-docs-list: 4 document cards (icon + title + link)
 * Block library: Cards - 2 columns per row: [image, text content]
 * xwalk model: card { image (reference), text (richtext) }
 */
export default function parse(element, { document }) {
  const cells = [];

  // Pattern 1: Benefit cards (section#benefits) - div.nudges-slider.swiper-slide > div.card
  const benefitSlides = element.querySelectorAll('.nudges-slider.swiper-slide');
  if (benefitSlides.length > 0) {
    benefitSlides.forEach((slide) => {
      const card = slide.querySelector('.card') || slide;
      // Image/icon from figure inside card-body or metal-content
      const img = card.querySelector('figure.metal-content img, figure img, img.lozad, img');
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      if (img) imgFrag.appendChild(img);

      // Text: title + description from card-body
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      const body = card.querySelector('.card-body') || card;
      const title = body.querySelector('h5.card-title, h4, h3, h5');
      if (title) textFrag.appendChild(title);
      const desc = body.querySelector('p.card-text, p.gtmTxt, p');
      if (desc) textFrag.appendChild(desc);

      cells.push([imgFrag, textFrag]);
    });
  }

  // Pattern 2: Reward cards (section#rewards-section) - div.grad-bg.reward-desc.swiper-slide
  const rewardCards = element.querySelectorAll('.grad-bg.reward-desc.swiper-slide, .reward-desc.swiper-slide');
  if (rewardCards.length > 0) {
    rewardCards.forEach((card) => {
      const img = card.querySelector('img:not(.grad-bg-texture):not(.texture-bg)');
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      if (img) imgFrag.appendChild(img);

      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      const heading = card.querySelector('h2, h3, h4, [class*="h2"]');
      if (heading) textFrag.appendChild(heading);
      const desc = card.querySelector('p.para, p');
      if (desc) textFrag.appendChild(desc);

      cells.push([imgFrag, textFrag]);
    });
  }

  // Pattern 3: Document cards (section.ashva-doc-section) - div.card-docs
  const docCards = element.querySelectorAll('.card-docs');
  if (docCards.length > 0) {
    docCards.forEach((card) => {
      const img = card.querySelector('figure img, img');
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      if (img) imgFrag.appendChild(img);

      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      const title = card.querySelector('h2.header-content-2, h2, h3, h5');
      if (title) textFrag.appendChild(title);
      const link = card.querySelector('a[href]');
      if (link && !title) textFrag.appendChild(link);

      cells.push([imgFrag, textFrag]);
    });
  }

  // Fallback: generic card pattern
  if (cells.length === 0) {
    const genericCards = element.querySelectorAll('.card, .swiper-slide');
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-benefit', cells });
  element.replaceWith(block);
}
