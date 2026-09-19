// --------------------- This root page.tsx only ---------------------

import Link from "next/link";

// It is React's server component in React v19.
// React server components which require a special circumstance.
// Nextjs provides such an environment.

// It never executes in the client.
// It only executes and make HTML in the server and then
// nextjs server delivers the HTML file to the browser!.
// Then the browser renders the HTML file.
// RSC payload is same as well.

// We can see this log in the terminal.
console.log('executing 1') // we will not see this one in the client.

// -------------------- When transitioning the page -------------------
// no `use client` case
// In Next.js, the server and client work together. [IMPORTANT]

// ============================================
// [PREFETCH]
// When <Link href="/about" /> exists in *** this root page ***
// and the link enters the viewport
// ============================================

// 1. SERVER  - executes "about" page ahead of time. It does NOT make an HTML file.
// 2. SERVER  - builds the RSC payload (document), then sends it to the client.
// 3. CLIENT  - receives the RSC payload but does NOT render it. Stores it only.

// NOTE: this whole prefetch block only happens when:
//   - running a production build (pnpm build && pnpm start), AND
//   - "about" is a static page
// In dev mode (pnpm dev), prefetch does not happen at all.


// ============================================
// [CLICK]
// When the user clicks the <Link /> above  ->  *** about page ***
// FYI, root page.js does NOT execute again. It stays alive in the browser.
// ============================================

// 1. SERVER  - if prefetch was already done above, SKIP this step.
//              Otherwise, execute the "about" page. It does NOT make an HTML file.
// 2. SERVER  - if prefetch was already done above, SKIP this step.
//              Otherwise, build the RSC payload and send it to the client.
// 3. CLIENT  - React reads the RSC payload.
// 4. CLIENT  - compares it with the existing screen,
//              then renders only the part that needs to change.

// NOTE on step 1-2: the prefetched payload is cached for 5 minutes.
// After 5 minutes it is discarded, so steps 1-2 run again.


// ============================================
// [JAVASCRIPT]
// ============================================

// The server never creates a JavaScript file for a component
// that does not have the 'use client' tag.
//
// So in this "no use client" case:
//   - root page   -> no JS file
//   - about page  -> no JS file
//
// (Common JS for React / Next.js runtime is still downloaded once
//  on the very first visit, but that is not page code.)

// ============================================
// [COMMON JS]  -  What is it?
// ============================================

// Common JS = React library + Next.js runtime.
// It is NOT your code. It is code written by the React / Next.js teams.
// It is what you get when you run `npm install`.


// ============================================
// Why the browser needs it, even with no 'use client'
// ============================================

// When you click <Link />, the server sends an RSC payload.
// An RSC payload is just text. It says "change the screen like this".
//
// Somebody has to READ that text and actually update the screen.
// That somebody is React, running inside the browser.
//
// No React in the browser  ->  payload arrives  ->  nothing happens.
// So Common JS is always downloaded.


// ============================================
// What is inside Common JS
// ============================================

// 1. React            - reads the RSC payload, updates the DOM
// 2. Next.js router   - handles URL changes
// 3. <Link> itself    - Link is a Client Component by nature
// 4. Prefetch scheduler - watches which links are on screen, fetches them early


// ============================================
// Common JS  vs  Page JS
// ============================================

//                    | Common JS              | Page JS
//   -----------------|------------------------|---------------------------
//   Whose code       | React / Next.js team   | YOURS
//   When downloaded  | first visit, ONCE      | when you visit that page
//   Needs 'use

// ============================================
// [HTML]  -  When is it made, when is it not
// ============================================

// The server makes HTML ONLY on the first entry into the app.
// "First entry" means the browser had nothing loaded yet.


// ============================================
// Case 1 - HTML IS made
// ============================================

// Triggers:
//   - typing a URL in the address bar
//   - pressing Enter / reloading (F5)
//   - clicking <a href="/about">
//   - arriving from an external site
//   - opening a bookmark
//
// SERVER  - executes the page, turns the result into HTML, sends it.
// CLIENT  - paints that HTML directly. The screen appears.
//
// Note: the RSC payload is sent together with the HTML.
//       The browser's React needs it later, for the next navigation.


// ============================================
// Case 2 - HTML is NOT made
// ============================================

// Trigger:
//   - clicking <Link href="/about" />
//
// SERVER  - executes the page, turns the result into an RSC payload. NO HTML.
// CLIENT  - React reads the payload and patches only the changed part.
//
// The app is never restarted, so no new HTML is needed.


// ============================================
// Why HTML is needed at all
// ============================================

// On first entry the browser is empty.
// React is not running yet, so nothing can read an RSC payload.
//
// HTML is the only thing a browser can paint on its own.
// That is why the first screen must be HTML.
//
// Once React is running in the browser, HTML is no longer needed.
// From then on, RSC payload is enough.


// ============================================
// root page / about page
// ============================================

//   Action                        | root page HTML | about page HTML
//   ------------------------------|----------------|-----------------
//   type "/" in address bar       | MADE           | not made
//   type "/about" in address bar  | not made       | MADE
//   click <Link href="/about">    | not made       | NOT MADE
//   press F5 on /about            | not made       | MADE


// ============================================
// The three things, side by side
// ============================================

//                  | First entry (URL / reload) | <Link> click
//   ---------------|----------------------------|---------------------------
//   HTML           | YES                        | NO
//   RSC payload    | YES                        | YES (unless prefetched)
//   Common JS      | YES, once                  | NO, already there
//   Page JS        | only if 'use client'       | only if 'use client'


// ============================================
// One line to remember
// ============================================

// HTML is made once, to get the browser started.
// After that, only RSC payloads travel.


// ============================================
// no 'use client'  -  SUMMARY
// ============================================

//   Item        | SERVER                       | CLIENT
//   ------------|------------------------------|------------------------------
//   Execution   | runs page.tsx                | never runs page.tsx
//   RSC payload | builds it, always            | reads it
//   HTML        | builds it, first entry only  | paints it, first entry only
//   Page JS     | never creates it             | never receives it
//   Common JS   | sends it once                | runs it


// ============================================
// First entry  (URL typed / reload)
// ============================================
//
// SERVER  1. runs page.tsx
//         2. makes HTML
//         3. sends HTML + RSC payload + Common JS
//
// CLIENT  4. paints the HTML   -> screen appears
//         5. React starts running


// ============================================
// <Link> click
// ============================================
//
// SERVER  1. runs page.tsx
//         2. makes RSC payload   (NO HTML)
//         3. sends it
//
// CLIENT  4. React reads the payload
//         5. patches only the changed part


// ============================================
// One line
// ============================================
//
// SERVER executes.  CLIENT displays.
// HTML starts the browser.  RSC payload keeps it updated.

// '@' is automatically set in nextjs.
import Header from "@/components/header";

export default function Home() {
  // we will see this one in the browser and terminal which means it executes in the server.
  console.log("executing 2")
  return (
    <main>
      {/* move this image to the custom `Header` component
          just verify we can set the custom component
      */}
      {/* <img src="/logo.png" alt="A server surrounded by magic sparkles." /> */}
      <Header />
      <h1>Welcome to this NextJS Course!</h1>
      <Link href="/about">🔥 Let&apos;s get started! 🔥</Link>
    </main>
  );
}
