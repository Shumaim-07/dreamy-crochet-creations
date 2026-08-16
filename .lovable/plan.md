# Dreamy Crochet — Build Plan

## Goal
Create a warm, editorial-style e-commerce storefront for the handmade crochet brand **Dreamy Crochet** on TanStack Start. The site will sell physical crochet products through Shopify, with Home, About, Contact, and Products pages.

## Design Direction
- **Warm tactile editorial** from the selected prototype.
- Tokens: cream background `#fdfaf6`, ink foreground `#2d2424`, terracotta primary `#d48166`, warm accent `#e9dcc9`, soft border `#2d242415`.
- Fonts: **Playfair Display** for display/italic headings, **Inter** for body, **JetBrains Mono** for micro-labels.
- Visual feel: soft shadows, rounded corners, tactile product photography, gentle reveal animations, fabric-like hover transitions.
- Faithful port of the chosen prototype: sticky nav, hero with two CTAs, editorial product grid, story section, and footer.

## Routes & Pages
| Route | Purpose |
|-------|---------|
| `/` | Home — hero, new arrivals, story teaser, footer |
| `/about` | About — brand story, process, materials, maker philosophy |
| `/contact` | Contact — contact form, email, social links |
| `/products` | Products — full Shopify product grid with filters |
| `/products/$handle` | Product Detail — single product page |

## Shopify Integration
- Wire up Shopify Storefront API (2025-07) using the configured storefront token and store permanent domain.
- Fetch real products from Shopify with title, description, price, images, variants, and availability.
- Implement Zustand cart store with `addItem`, `updateQuantity`, `removeItem`, `clearCart`, and sync to Shopify.
- Build a cart drawer with item count, quantity controls, and a **Checkout with Shopify** button.
- Ensure checkout flow: add to cart → create Shopify cart via Storefront API → open generated checkout URL in a new tab with `channel=online_store`.
- Show an empty-state product grid if no products exist, with guidance to add products.

## Product Setup
- **No mock products will be created.**
- After the storefront is built, check the Shopify store for existing products. If none exist, ask the user to provide product details (names, descriptions, prices, variants, images) and then create real products in Shopify.
- If the user prefers, a starter set of 3–4 common crochet products can be created with explicit approval.

## Assets
- Generate images from the prototype prompts and replace `data-lov-image-placeholder` blocks with real `<img>` imports.
- Required images: hero blanket shot, hero testimonial/texture, product card images (tote bag, cardigan, harvest set), and About page imagery.

## Metadata & SEO
- Unique `head()` for each route: title, description, `og:title`, `og:description`, `og:type`, `twitter:card`.
- No placeholder `Lovable App` text anywhere.

## Build Steps
1. Update `src/styles.css` with the Warm tactile editorial tokens and fonts.
2. Create shared layout components: Header, Footer, CartDrawer.
3. Set up Shopify Storefront API helper and cart state.
4. Build routes: Home, About, Contact, Products, Product Detail.
5. Generate images and swap placeholders.
6. Verify cart and checkout flow end-to-end.
7. Add product content via Shopify once user provides details.
