/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: IDFC First Bank cleanup.
 * Selectors from captured DOM of https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent, chat widgets, modals, overlays that may block parsing
    // Found in captured DOM: exit intent popup, modals, sticky header CTAs
    WebImporter.DOMUtils.remove(element, [
      '.cc-exit-intent-popup',
      '.modal',
      '.modal-backdrop',
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
      '#drift-widget',
      '.chat-widget',
    ]);

    // Remove sticky floating CTAs (not authorable content)
    // Found in captured DOM: div.ashv-header.ashv-header-fixed with Apply Now / Fees buttons
    WebImporter.DOMUtils.remove(element, [
      '.ashv-header.ashv-header-fixed',
      '.ashv-header-fixed',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable content: header, footer, nav, breadcrumbs, sidebar
    // Found in captured DOM: header, footer, sticky nav, breadcrumbs
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'nav',
      // Sticky anchor navigation bar (section-2)
      '#ashv-navigation',
      '.heritage-cc-navigation',
      // Breadcrumbs inside hero banner
      '.ahvamayur-bredcrumbs',
      // Intro animation elements (not authorable)
      '.ashv-intro-container',
      // FAQ filter tabs (JS-driven UI, not authorable)
      '.ashva-cc-faq-filter',
      // Load more buttons (JS pagination)
      '.btn-load-more',
      // Swiper navigation arrows and pagination dots (JS-generated)
      '.swiper-button-next',
      '.swiper-button-prev',
      '.swiper-pagination',
      // Benefit popup modals
      '.benefitPopup',
      // Safe element removal
      'iframe',
      'link',
      'noscript',
      'source',
    ]);

    // Clean up tracking/analytics attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-gtm');
    });
  }
}
