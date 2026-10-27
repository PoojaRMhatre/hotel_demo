# Demo Luxury Stay — Hospitality Website

A responsive, multi-page hotel/resort website demo built with **HTML5, CSS3, and Vanilla JavaScript only**. No frontend framework or build step is required.

## Pages
- `index.html` — home, stay enquiry form, room previews, amenities, gallery preview, journal cards, contact form
- `about.html` — property story template
- `rooms.html` — sample room categories (all prices and facilities are placeholders)
- `gallery.html` — category filters and keyboard-accessible lightbox
- `blog.html` — journal index
- `articles/` — six individual article starter pages
- `contact.html` — contact details placeholders, map placeholder, validated demo form
- `privacy-policy.html` and `terms.html` — starter templates requiring business/legal review

## Run locally
1. Extract the ZIP.
2. Open the `hospitality-website` folder.
3. Double-click `index.html`, or use a local server:
   - VS Code: install/use the Live Server extension and select **Open with Live Server**.
   - Python: open a terminal in this folder and run `python -m http.server 8000`, then visit `http://localhost:8000`.
4. Internet access is needed for the external Unsplash sample images and Google Fonts. Replace these with optimized, licensed local images for production.

## Customize before publishing
1. Search all files for `Demo Luxury Stay`, `Placeholder`, `example.com`, `₹—`, and sample copy.
2. Replace the logo/brand, business name, actual location, phone, email, WhatsApp link, social profiles, reception hours, and Google Maps embed.
3. Replace all stock imagery with owned or properly licensed property photographs. Update alt text.
4. Confirm room names, prices, guest capacity, bed types, amenities, policies, and every business claim.
5. Replace the canonical URL, Open Graph URL/image, JSON-LD URLs, `robots.txt`, and `sitemap.xml` with the real production domain.
6. Have privacy policy and terms reviewed for the actual business and jurisdiction.
7. Remove or rewrite sample testimonials; never publish invented reviews as genuine.
8. Update article text, author, publication dates, and article metadata with original, accurate content.

## Functionality and limitations
- Responsive sticky navigation and mobile menu; section navigation and active-link indication.
- Booking enquiry validation and a summary modal. It is **not connected to availability, a booking engine, payments, or a database**; it does not confirm reservations.
- Contact and newsletter forms validate in the browser and show a clear demo message. They **do not send email or subscribe anyone**. Connect a backend or reputable form provider to enable delivery.
- Gallery filters and lightbox support close, next/previous, Escape, and arrow keys.
- Current year updates automatically.
- WhatsApp button is a placeholder; replace it with the real `https://wa.me/<countrycodephonenumber>` URL.

## SEO and deployment
- Update `robots.txt` and `sitemap.xml` after the real domain is chosen.
- Add a real canonical URL and approved LocalBusiness/Hotel structured data. Only use a type and details that reflect the actual business.
- Validate structured data with Google's Rich Results Test and Schema.org Validator.
- Check pages with Lighthouse, PageSpeed Insights, mobile-friendly browser testing, and an accessibility review.
- Push the folder to a GitHub repository. On Vercel, import that repository as a static site; no build command is required and the output directory is the project root.
- Add the custom domain in Vercel project settings and update DNS records exactly as Vercel instructs. Enable HTTPS after DNS verification.
- Submit the sitemap in Google Search Console after the site is live. SEO cannot guarantee first-page rankings.

## Folder structure
```text
hospitality-website/
├── index.html
├── about.html
├── rooms.html
├── gallery.html
├── blog.html
├── contact.html
├── privacy-policy.html
├── terms.html
├── robots.txt
├── sitemap.xml
├── README.md
├── css/style.css
├── js/script.js
├── articles/
│   ├── weekend-getaway.html
│   ├── choosing-a-resort.html
│   ├── local-food.html
│   ├── day-trip-guide.html
│   ├── restful-stay.html
│   └── family-break.html
└── assets/
    ├── favicon/favicon.svg
    ├── icons/
    └── images/
```


## WhatsApp enquiry submission
The homepage stay-enquiry form and contact forms open WhatsApp with the visitor's entered details pre-filled for **+91 98508 26021**. The visitor must press **Send** inside WhatsApp; the website cannot send a WhatsApp message silently. Update the number in `js/script.js` if the business contact changes.
