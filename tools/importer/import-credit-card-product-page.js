/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import cardsBenefitParser from './parsers/cards-benefit.js';
import tabsPrivilegeParser from './parsers/tabs-privilege.js';
import cardsProductParser from './parsers/cards-product.js';
import cardsBlogParser from './parsers/cards-blog.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import columnsContactParser from './parsers/columns-contact.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/idfcfirst-cleanup.js';
import sectionsTransformer from './transformers/idfcfirst-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'cards-benefit': cardsBenefitParser,
  'tabs-privilege': tabsPrivilegeParser,
  'cards-product': cardsProductParser,
  'cards-blog': cardsBlogParser,
  'accordion-faq': accordionFaqParser,
  'columns-contact': columnsContactParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'credit-card-product-page',
  description: 'Credit card product detail page showcasing features, benefits, and application details for the IDFC First Bank Ashva metal credit card',
  urls: [
    'https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva'
  ],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['section.ashva-slider-hero', 'div.heritage-cc-hero-slider']
    },
    {
      name: 'cards-benefit',
      instances: ['section#benefits .nudge-swiper-benefits', 'section#rewards-section .astha-reward-points-slider', 'section.ashva-doc-section .impt-docs-list']
    },
    {
      name: 'tabs-privilege',
      instances: ['section#possibilities .tab-Section']
    },
    {
      name: 'cards-product',
      instances: ['section#explore .nudge-swiper-exp-more', 'section#related .MT50']
    },
    {
      name: 'cards-blog',
      instances: ['section#blogs .first-select-finfirst-blog-section']
    },
    {
      name: 'accordion-faq',
      instances: ['section#faqs .accordian']
    },
    {
      name: 'columns-contact',
      instances: ['section.get-in-touch .row']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner and Carousel',
      selector: ['section#heritage-banner', 'div.heritage-cc-banner'],
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: ['section#heritage-banner .ashv-intro-container']
    },
    {
      id: 'section-3',
      name: 'Key Benefits',
      selector: ['section#benefits', 'div.heritage-cc-benefits'],
      style: 'dark-maroon',
      blocks: ['cards-benefit'],
      defaultContent: ['section#benefits h2.title']
    },
    {
      id: 'section-4',
      name: 'Privileges Tabs',
      selector: ['section#possibilities', 'div.heritage-cc-red-carpet'],
      style: 'dark',
      blocks: ['tabs-privilege'],
      defaultContent: ['section#possibilities h2.h2head']
    },
    {
      id: 'section-5',
      name: 'Reward Points',
      selector: ['section#rewards-section', 'div.heritage-cc-rewards-calculator'],
      style: 'dark-maroon-textured',
      blocks: ['cards-benefit'],
      defaultContent: ['section#rewards-section h2.h2head']
    },
    {
      id: 'section-6',
      name: 'Fees and Charges',
      selector: ['section#fees.fee-charges', 'div.heritage-cc-fees-charges'],
      style: 'light-cream',
      blocks: [],
      defaultContent: ['section#fees h2.title', 'section#fees .grnt-custom-listing', 'section#fees a.viewmorelite']
    },
    {
      id: 'section-7',
      name: 'UPI Banner',
      selector: ['section.cc-upi', 'div.heritage-cc-upi'],
      style: 'dark',
      blocks: [],
      defaultContent: ['section.cc-upi h2.h1head', 'section.cc-upi .btn-box']
    },
    {
      id: 'section-8',
      name: 'Explore Other Cards',
      selector: ['section#explore', 'div.heritage-cc-exp-more'],
      style: null,
      blocks: ['cards-product'],
      defaultContent: ['section#explore h2.title']
    },
    {
      id: 'section-9',
      name: 'Blog Posts',
      selector: ['section#blogs', 'div.heritage-cc-blogs'],
      style: null,
      blocks: ['cards-blog'],
      defaultContent: ['section#blogs .heading']
    },
    {
      id: 'section-10',
      name: 'FAQs',
      selector: ['section#faqs', 'div.heritage-cc-faq'],
      style: 'light-cream',
      blocks: ['accordion-faq'],
      defaultContent: ['section#faqs h2.hd']
    },
    {
      id: 'section-11',
      name: 'Important Documents',
      selector: ['section.ashva-doc-section', 'div.heritage-cc-importantdocs'],
      style: 'dark',
      blocks: ['cards-benefit'],
      defaultContent: ['section.ashva-doc-section h3.hd24s']
    },
    {
      id: 'section-12',
      name: 'Related Searches',
      selector: ['section#related', 'div.csr-program'],
      style: null,
      blocks: ['cards-product'],
      defaultContent: ['section#related .col-lg-4']
    },
    {
      id: 'section-13',
      name: 'Get in Touch',
      selector: ['section.get-in-touch', 'div.heritage-cc-getintouch'],
      style: 'grey',
      blocks: ['columns-contact'],
      defaultContent: ['section.get-in-touch h4.hd']
    },
    {
      id: 'section-14',
      name: 'Mission Statement',
      selector: ['section.customer-friendly', 'div.heritage-cc-quote'],
      style: 'dark',
      blocks: [],
      defaultContent: ['section.customer-friendly .customer-friendly-inner']
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (section breaks + metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
