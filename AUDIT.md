# Cant Imagine Why portfolio audit

Reviewed November 19, 2026. This is a source review of the existing site, with a local production build and test run. The live URL was unreachable from the review environment, so the layout, live Cloudinary responses, and current deployment still need browser verification.

## Start with Artwork

The existing album covers, gallery, and artwork detail give this page enough material for an incremental improvement. The most visible first change would be to make the base Artwork URL feel like a destination. Shareable links would make the next visit easier.

### 1. Give the Artwork landing page something to show

**What happens today.** Artwork starts with an empty image list and no selected album. The gallery fetch starts when a visitor picks an album or filter. On a fresh visit, the page offers browse controls and an instruction, while the artwork display renders an empty container. See [Artwork](src/views/Artwork/index.jsx) and [ImageDetail](src/components/ImageDetail/index.jsx).

**Candidate improvement.** Turn the existing album covers and descriptions into the overview, with a clear heading and named links. The data already lives in [albums.js](src/config/albums.js). That gives visitors several pieces to look at immediately, independently of the gallery-list request. The [Home page](src/views/Home/index.jsx) already has a Featured Artwork strip, so an album overview also gives Artwork its own purpose. If you'd rather show one large piece first, choose an explicit featured work or album so the landing view reflects your curatorial choice.

**Browser check.** Open [Artwork](https://cantimaginewhy.com/#/artwork) in a fresh tab at phone and desktop widths. Look for visible work, readable album names, and a clear way into a gallery. Throttle requests and check that a selected album communicates loading, an empty result, or failure.

### 2. Use the same Artwork controls at every width

**What happens today.** [Artwork](src/views/Artwork/index.jsx) branches at Bootstrap's large breakpoint (992 px). The desktop branch puts the gallery beside the image and offers both album and filter browsing. Below that breakpoint, the image precedes an accordion containing a separate album picker. That path also disables image zoom. Breakpoint values are copied into [system.js](src/utils/system.js). The album labels in [NavButton](src/components/Navs/NavButton.jsx) are also breakpoint-dependent, and [nav.scss](src/components/Navs/nav.scss) sizes tiles using viewport-width limits that deserve a check on narrow screens.

**Candidate improvement.** Use one browse control, one gallery, and one image detail. Let the existing React Bootstrap grid put controls and detail side by side on desktop and stack them on a phone. Keep album and filter names in ordinary text and decide the mobile reading order deliberately. Once someone chooses an album, the painting and next/previous controls should be easy to reach without working through several panels. Keep process and location details available when present. Try the current zoom on a touch screen before deciding whether to enable it there.

**Browser check.** Compare a narrow phone, a tablet, and desktop. Resize across 992 px with a piece selected. Confirm the same browsing choices are available, controls fit without horizontal scrolling, and the selection survives resizing.

### 3. Make albums and individual works shareable

**What happens today.** [App.js](src/App.js) uses React Router's hash URLs for the top-level pages. [Artwork](src/views/Artwork/index.jsx) keeps browse mode, selected gallery, and image index in React state. The [album](src/components/Navs/AlbumNav/index.jsx) and [filter](src/components/Navs/FilterNav/index.jsx) pickers also track their own highlights. An image's index is its current position in a sorted result, so a saved index could point to a different painting after content changes.

**Candidate improvement.** Keep the existing hash router. Use routes such as `#/artwork/album/plein-air-acrylic` and give a selected work a stable identifier, such as its URL-encoded Cloudinary public ID. A public ID can contain a slash, so verify encoding and decoding on reload. Use the URL as the source for selection and highlighting. A filter route should identify the mode, group, and option, because an album and a filter can share a tag such as `subj-politic`. Album links are a reasonable first slice if work and filter links would make the first change too large. Decide whether paging through paintings should add browser history entries before wiring up next/previous.

**Browser check.** Copy links into a fresh tab, reload, and use Back and Forward. Check an invalid gallery and a work that has been removed. The visitor should get a clear recovery path to the gallery or overview.

## Other improvements worth considering

- **Keyboard and touch access.** Album and filter tiles use clickable divs, spans, or images. Gallery thumbnails are clickable images with a title. Use links for destinations and buttons for actions, show focus and selection clearly, and give images meaningful text alternatives. Filter descriptions shown on hover should also be available by keyboard and touch. See [NavButton](src/components/Navs/NavButton.jsx), [FilterNav](src/components/Navs/FilterNav/index.jsx), and [ThumbGallery](src/components/ThumbGallery/index.jsx).
- **Gallery feedback and request order.** Gallery errors currently go to the console. A slow request from an earlier click can also resolve after a newer selection and replace that gallery. Make visible loading, empty, and retry states part of the gallery change, and ensure an obsolete response cannot replace the current selection. See [Artwork](src/views/Artwork/index.jsx) and [cloudinaryApi.js](src/utils/cloudinaryApi.js).
- **Extend deep links where they have a purpose.** The [Connect page](src/views/Contact/index.jsx) defaults to the Art tab without reflecting its tab in the URL. A direct link to Design or Tech could be useful when sharing that side of the portfolio. The zoom overlay can remain an interaction within a shareable artwork page.
- **Restore a usable test baseline.** The production build succeeded and reported a main JavaScript bundle of about 373 kB gzip. The test command stopped before running any tests because Jest tried to load Axios's ES module entry. The [existing smoke test](src/App.test.js) would also need to provide the favicon element that [system.js](src/utils/system.js) expects for an isolated render. Fix the harness when adding coverage for deep links or request ordering. Measure image loading on a phone before deciding whether bundle or image optimization should move up the list.

## A decision for the first change

Choose what visitors should see at the base Artwork URL. An album overview reuses your existing covers, descriptions, and organization. A featured piece gives you more control over the first impression. Either can fit the current site. The existing React Router and Bootstrap setup supports the proposed improvements, so a framework migration can be evaluated separately when it has a specific benefit.
