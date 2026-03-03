var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-credit-card-product-page.js
  var import_credit_card_product_page_exports = {};
  __export(import_credit_card_product_page_exports, {
    default: () => import_credit_card_product_page_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll(".ashva-slider.swiper-slide, .swiper-slide.gtmSlide");
    const cells = [];
    slides.forEach((slide) => {
      const bgImg = slide.querySelector(".banner-bg img, .banner-bg picture");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:media_image "));
      if (bgImg) {
        imgFrag.appendChild(bgImg.cloneNode(true));
      }
      const contentEl = slide.querySelector(".slider-content");
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:content_text "));
      if (contentEl) {
        const children = contentEl.querySelectorAll("h1, h2, h3, h4, h5, h6, p, a");
        children.forEach((child) => textFrag.appendChild(child));
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-benefit.js
  function parse2(element, { document }) {
    const cells = [];
    const benefitSlides = element.querySelectorAll(".nudges-slider.swiper-slide");
    if (benefitSlides.length > 0) {
      benefitSlides.forEach((slide) => {
        const card = slide.querySelector(".card") || slide;
        const img = card.querySelector("figure.metal-content img, figure img, img.lozad, img");
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        if (img) imgFrag.appendChild(img);
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        const body = card.querySelector(".card-body") || card;
        const title = body.querySelector("h5.card-title, h4, h3, h5");
        if (title) textFrag.appendChild(title);
        const desc = body.querySelector("p.card-text, p.gtmTxt, p");
        if (desc) textFrag.appendChild(desc);
        cells.push([imgFrag, textFrag]);
      });
    }
    const rewardCards = element.querySelectorAll(".grad-bg.reward-desc.swiper-slide, .reward-desc.swiper-slide");
    if (rewardCards.length > 0) {
      rewardCards.forEach((card) => {
        const img = card.querySelector("img:not(.grad-bg-texture):not(.texture-bg)");
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        if (img) imgFrag.appendChild(img);
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        const heading = card.querySelector('h2, h3, h4, [class*="h2"]');
        if (heading) textFrag.appendChild(heading);
        const desc = card.querySelector("p.para, p");
        if (desc) textFrag.appendChild(desc);
        cells.push([imgFrag, textFrag]);
      });
    }
    const docCards = element.querySelectorAll(".card-docs");
    if (docCards.length > 0) {
      docCards.forEach((card) => {
        const img = card.querySelector("figure img, img");
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        if (img) imgFrag.appendChild(img);
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        const title = card.querySelector("h2.header-content-2, h2, h3, h5");
        if (title) textFrag.appendChild(title);
        const link = card.querySelector("a[href]");
        if (link && !title) textFrag.appendChild(link);
        cells.push([imgFrag, textFrag]);
      });
    }
    if (cells.length === 0) {
      const genericCards = element.querySelectorAll(".card, .swiper-slide");
      genericCards.forEach((card) => {
        const img = card.querySelector("img");
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        if (img) imgFrag.appendChild(img);
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        const children = card.querySelectorAll("h2, h3, h4, h5, p, a");
        children.forEach((child) => textFrag.appendChild(child));
        cells.push([imgFrag, textFrag]);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-benefit", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-privilege.js
  function parse3(element, { document }) {
    const cells = [];
    const tabLinks = element.querySelectorAll("ul.nav-tabs .nav-link, #ashva-tab-container .nav-link");
    const tabPanes = element.querySelectorAll(".tab-content .tab-pane, #ashva-tab-container-myTabContent .tab-pane");
    tabLinks.forEach((tabLink, index) => {
      const labelText = tabLink.textContent.trim();
      const panel = tabPanes[index];
      if (panel) {
        const slides = panel.querySelectorAll(".ashva-slider.swiper-slide, .swiper-slide");
        slides.forEach((slide) => {
          const titleFrag = document.createDocumentFragment();
          titleFrag.appendChild(document.createComment(" field:title "));
          const titleEl = document.createElement("p");
          titleEl.textContent = labelText;
          titleFrag.appendChild(titleEl);
          const contentFrag = document.createDocumentFragment();
          const textArea = slide.querySelector(".slider-content, .zindex, .z1");
          const heading = textArea ? textArea.querySelector('h2, h3, h4, h5, [class*="head"]') : null;
          if (heading) {
            contentFrag.appendChild(document.createComment(" field:content_heading "));
            const h3 = document.createElement("h3");
            h3.textContent = heading.textContent.trim();
            contentFrag.appendChild(h3);
          }
          const img = slide.querySelector(".banner-bg img, img");
          if (img) {
            contentFrag.appendChild(document.createComment(" field:content_image "));
            contentFrag.appendChild(img);
          }
          const desc = textArea ? textArea.querySelector('p, [class*="desc"]') : null;
          if (desc) {
            contentFrag.appendChild(document.createComment(" field:content_richtext "));
            contentFrag.appendChild(desc);
          }
          cells.push([titleFrag, contentFrag]);
        });
      } else {
        const titleFrag = document.createDocumentFragment();
        titleFrag.appendChild(document.createComment(" field:title "));
        const titleEl = document.createElement("p");
        titleEl.textContent = labelText;
        titleFrag.appendChild(titleEl);
        const contentFrag = document.createDocumentFragment();
        cells.push([titleFrag, contentFrag]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-privilege", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse4(element, { document }) {
    const cells = [];
    const exploreCards = element.querySelectorAll(".nudges-slider.swiper-slide");
    if (exploreCards.length > 0) {
      exploreCards.forEach((slide) => {
        const card = slide.querySelector(".card") || slide;
        const img = card.querySelector("img.card-img-top, figure img, img");
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        if (img) imgFrag.appendChild(img);
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        const title = card.querySelector("h5.card-title, h4, h3, h5");
        if (title) textFrag.appendChild(title);
        const link = card.querySelector('a.redirect, a[class*="exp-btn"], a');
        if (link) textFrag.appendChild(link);
        cells.push([imgFrag, textFrag]);
      });
    }
    const relatedItems = element.querySelectorAll("a.intBx, .col-md-4 a.intBx");
    if (relatedItems.length > 0) {
      relatedItems.forEach((item) => {
        const img = item.querySelector("figure img, img");
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        if (img) imgFrag.appendChild(img);
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        const linkClone = item.cloneNode(true);
        linkClone.querySelectorAll("img, figure, picture").forEach((el) => el.remove());
        textFrag.appendChild(linkClone);
        cells.push([imgFrag, textFrag]);
      });
    }
    if (cells.length === 0) {
      const genericCards = element.querySelectorAll('.card, .swiper-slide, a[class*="intBx"]');
      genericCards.forEach((card) => {
        const img = card.querySelector("img");
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        if (img) imgFrag.appendChild(img);
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        const children = card.querySelectorAll("h2, h3, h4, h5, p, a");
        children.forEach((child) => textFrag.appendChild(child));
        cells.push([imgFrag, textFrag]);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-blog.js
  function parse5(element, { document }) {
    const cells = [];
    const blogSlides = element.querySelectorAll(".swiper-slide");
    blogSlides.forEach((slide) => {
      const img = slide.querySelector(".banner-bg img, img.card-img-top, img");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      if (img) imgFrag.appendChild(img);
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const content = slide.querySelector(".slider-content") || slide;
      const title = content.querySelector('h5.sldrh2, h5, h4, h3, [class*="sldrh"]');
      if (title) {
        const h = document.createElement("h5");
        h.textContent = title.textContent.trim();
        textFrag.appendChild(h);
      }
      const desc = content.querySelector("p.pera, p");
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        textFrag.appendChild(p);
      }
      const cta = content.querySelector('a.btn-red-new, a.btn, a[class*="blog-btn"], a');
      if (cta) {
        const link = document.createElement("a");
        link.setAttribute("href", cta.getAttribute("href") || "#");
        link.textContent = cta.textContent.trim().replace(/\s+/g, " ");
        const p = document.createElement("p");
        p.appendChild(link);
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const cells = [];
    const faqItems = element.querySelectorAll(".faq-wrap");
    faqItems.forEach((item) => {
      const summaryFrag = document.createDocumentFragment();
      summaryFrag.appendChild(document.createComment(" field:summary "));
      const question = item.querySelector('h3.trgr, h3, h4, [class*="trgr"]');
      if (question) {
        const p = document.createElement("p");
        p.textContent = question.textContent.trim();
        summaryFrag.appendChild(p);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const answer = item.querySelector(".tog_cont");
      if (answer) {
        const paragraphs = answer.querySelectorAll("p");
        if (paragraphs.length > 0) {
          paragraphs.forEach((p) => textFrag.appendChild(p));
        } else {
          const p = document.createElement("p");
          p.textContent = answer.textContent.trim();
          textFrag.appendChild(p);
        }
      }
      cells.push([summaryFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-contact.js
  function parse7(element, { document }) {
    const cells = [];
    const columns = element.querySelectorAll(".col-4.gt-item, .gt-item");
    if (columns.length > 0) {
      const row = [];
      columns.forEach((col) => {
        const colFrag = document.createDocumentFragment();
        const link = col.querySelector("a");
        if (link) {
          const img = link.querySelector("img");
          if (img) colFrag.appendChild(img);
          const text = link.querySelector("p");
          if (text) {
            const a = document.createElement("a");
            a.href = link.href;
            a.textContent = text.textContent.trim();
            colFrag.appendChild(a);
          }
        }
        row.push(colFrag);
      });
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-contact", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/idfcfirst-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".cc-exit-intent-popup",
        ".modal",
        ".modal-backdrop",
        "#onetrust-consent-sdk",
        '[class*="cookie"]',
        "#drift-widget",
        ".chat-widget"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".ashv-header.ashv-header-fixed",
        ".ashv-header-fixed"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        "nav",
        // Sticky anchor navigation bar (section-2)
        "#ashv-navigation",
        ".heritage-cc-navigation",
        // Breadcrumbs inside hero banner
        ".ahvamayur-bredcrumbs",
        // Intro animation elements (not authorable)
        ".ashv-intro-container",
        // FAQ filter tabs (JS-driven UI, not authorable)
        ".ashva-cc-faq-filter",
        // Load more buttons (JS pagination)
        ".btn-load-more",
        // Swiper navigation arrows and pagination dots (JS-generated)
        ".swiper-button-next",
        ".swiper-button-prev",
        ".swiper-pagination",
        // Benefit popup modals
        ".benefitPopup",
        // Safe element removal
        "iframe",
        "link",
        "noscript",
        "source"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-gtm");
      });
    }
  }

  // tools/importer/transformers/idfcfirst-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const resolved = [];
      for (const section of sections) {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let found = null;
        for (const sel of selectors) {
          try {
            found = element.querySelector(sel);
          } catch (e) {
          }
          if (found) break;
        }
        resolved.push({ section, element: found });
      }
      resolved.reverse();
      for (const { section, element: sectionEl } of resolved) {
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (section.id !== sections[0].id) {
          const hr = doc.createElement("hr");
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

  // tools/importer/import-credit-card-product-page.js
  var parsers = {
    "carousel-hero": parse,
    "cards-benefit": parse2,
    "tabs-privilege": parse3,
    "cards-product": parse4,
    "cards-blog": parse5,
    "accordion-faq": parse6,
    "columns-contact": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "credit-card-product-page",
    description: "Credit card product detail page showcasing features, benefits, and application details for the IDFC First Bank Ashva metal credit card",
    urls: [
      "https://www.idfcfirst.bank.in/credit-card/metal-credit-card/ashva"
    ],
    blocks: [
      {
        name: "carousel-hero",
        instances: ["section.ashva-slider-hero", "div.heritage-cc-hero-slider"]
      },
      {
        name: "cards-benefit",
        instances: ["section#benefits .nudge-swiper-benefits", "section#rewards-section .astha-reward-points-slider", "section.ashva-doc-section .impt-docs-list"]
      },
      {
        name: "tabs-privilege",
        instances: ["section#possibilities .tab-Section"]
      },
      {
        name: "cards-product",
        instances: ["section#explore .nudge-swiper-exp-more", "section#related .MT50"]
      },
      {
        name: "cards-blog",
        instances: ["section#blogs .first-select-finfirst-blog-section"]
      },
      {
        name: "accordion-faq",
        instances: ["section#faqs .accordian"]
      },
      {
        name: "columns-contact",
        instances: ["section.get-in-touch .row"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner and Carousel",
        selector: ["section#heritage-banner", "div.heritage-cc-banner"],
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: ["section#heritage-banner .ashv-intro-container"]
      },
      {
        id: "section-3",
        name: "Key Benefits",
        selector: ["section#benefits", "div.heritage-cc-benefits"],
        style: "dark-maroon",
        blocks: ["cards-benefit"],
        defaultContent: ["section#benefits h2.title"]
      },
      {
        id: "section-4",
        name: "Privileges Tabs",
        selector: ["section#possibilities", "div.heritage-cc-red-carpet"],
        style: "dark",
        blocks: ["tabs-privilege"],
        defaultContent: ["section#possibilities h2.h2head"]
      },
      {
        id: "section-5",
        name: "Reward Points",
        selector: ["section#rewards-section", "div.heritage-cc-rewards-calculator"],
        style: "dark-maroon-textured",
        blocks: ["cards-benefit"],
        defaultContent: ["section#rewards-section h2.h2head"]
      },
      {
        id: "section-6",
        name: "Fees and Charges",
        selector: ["section#fees.fee-charges", "div.heritage-cc-fees-charges"],
        style: "light-cream",
        blocks: [],
        defaultContent: ["section#fees h2.title", "section#fees .grnt-custom-listing", "section#fees a.viewmorelite"]
      },
      {
        id: "section-7",
        name: "UPI Banner",
        selector: ["section.cc-upi", "div.heritage-cc-upi"],
        style: "dark",
        blocks: [],
        defaultContent: ["section.cc-upi h2.h1head", "section.cc-upi .btn-box"]
      },
      {
        id: "section-8",
        name: "Explore Other Cards",
        selector: ["section#explore", "div.heritage-cc-exp-more"],
        style: null,
        blocks: ["cards-product"],
        defaultContent: ["section#explore h2.title"]
      },
      {
        id: "section-9",
        name: "Blog Posts",
        selector: ["section#blogs", "div.heritage-cc-blogs"],
        style: null,
        blocks: ["cards-blog"],
        defaultContent: ["section#blogs .heading"]
      },
      {
        id: "section-10",
        name: "FAQs",
        selector: ["section#faqs", "div.heritage-cc-faq"],
        style: "light-cream",
        blocks: ["accordion-faq"],
        defaultContent: ["section#faqs h2.hd"]
      },
      {
        id: "section-11",
        name: "Important Documents",
        selector: ["section.ashva-doc-section", "div.heritage-cc-importantdocs"],
        style: "dark",
        blocks: ["cards-benefit"],
        defaultContent: ["section.ashva-doc-section h3.hd24s"]
      },
      {
        id: "section-12",
        name: "Related Searches",
        selector: ["section#related", "div.csr-program"],
        style: null,
        blocks: ["cards-product"],
        defaultContent: ["section#related .col-lg-4"]
      },
      {
        id: "section-13",
        name: "Get in Touch",
        selector: ["section.get-in-touch", "div.heritage-cc-getintouch"],
        style: "grey",
        blocks: ["columns-contact"],
        defaultContent: ["section.get-in-touch h4.hd"]
      },
      {
        id: "section-14",
        name: "Mission Statement",
        selector: ["section.customer-friendly", "div.heritage-cc-quote"],
        style: "dark",
        blocks: [],
        defaultContent: ["section.customer-friendly .customer-friendly-inner"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_credit_card_product_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_credit_card_product_page_exports);
})();
