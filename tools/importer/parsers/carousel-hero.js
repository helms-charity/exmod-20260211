/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero. Base: carousel.
 * Source: https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 * DOM: section.ashva-slider-hero > div.ashva-slider-swiper-container > div.swiper-wrapper > div.ashva-slider.swiper-slide
 * Each slide: div.banner-bg (background image) + div.slider-content (heading, description, CTA)
 * Block library: Carousel - 2 columns per row: [image, text content]
 * xwalk model: carousel-hero-item { media_image, media_imageAlt (collapsed), content_text }
 */
export default function parse(element, { document }) {
  // Each slide is a div.ashva-slider.swiper-slide or div.swiper-slide inside the swiper wrapper
  const slides = element.querySelectorAll('.ashva-slider.swiper-slide, .swiper-slide.gtmSlide');
  const cells = [];

  slides.forEach((slide) => {
    // Column 1: Background image from div.banner-bg > picture > img or div.banner-bg > img
    const bgImg = slide.querySelector('.banner-bg img, .banner-bg picture');
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:media_image '));
    if (bgImg) {
      imgFrag.appendChild(bgImg.cloneNode(true));
    }

    // Column 2: Text content from div.slider-content - grab all rich content
    const contentEl = slide.querySelector('.slider-content');
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:content_text '));
    if (contentEl) {
      // Grab all meaningful child elements (headings, paragraphs, links)
      const children = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a');
      children.forEach((child) => textFrag.appendChild(child));
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
