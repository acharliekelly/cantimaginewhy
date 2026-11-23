# Artwork follow-up

- [x] Add shareable URLs for individual works in album and filter galleries.
- [x] Widen the album picker on desktop so all 12 covers fit in one row when the viewport has room. Keep wrapping at narrower widths.
- [x] Center the last row of the All Albums grid when it is incomplete. Check with both 10 and 12 albums.
- [ ] Reserve space while images load so the layout stays steady. Check where a placeholder or an explicit loading state helps.
- [ ] Fix blurry Artistic Process images. Compare the Cloudinary image dimensions with the size the panel displays.
- [ ] Check Axios usage and whether native fetch can replace it. If it can, remove the dependency and rerun the full test suite to see what remains of the existing test failure.
- [ ] Embed a map in the Location panel for artwork with geolocation data. Evaluate Google Maps and other suitable map providers.
- [ ] Check that accordion panels appear only when their content applies to the current artwork or album. Verify that switching works removes panels that no longer apply.
