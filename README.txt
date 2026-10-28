SINGAPORE ARTILLERY INTERACTIVE SITE — PROTOTYPE

Open index.html in a modern browser.

What is included:
- Full-screen splash page
- Scroll snap from splash to opening film
- Normal scrolling after the film
- Apple-style sticky capability sequence
- Responsive desktop, phone portrait, and phone landscape layouts
- Fixed navigation
- Scroll-linked title movement
- Placeholder video modal
- Local/offline assets

Replace placeholders:
1. Put final images into the assets folder.
2. Keep the existing filenames, or update the file paths in index.html.
3. To use real local videos, replace each placeholder panel in the video modal
   with a <video controls playsinline> element pointing to an MP4 in assets/.

Recommended video encoding:
- MP4 / H.264
- 1080p
- AAC audio
- web-optimised / fast start

Note:
The Google font import requires internet. For fully offline typography, remove the
@import line in styles.css and use system fonts, or add licensed local webfont files.


UPDATED OPENING FLOW
- Page 1 scroll-snaps directly to Page 2.
- Page 2 is now a true full-viewport autoplaying video.
- The placeholder MP4 is assets/intro-placeholder.mp4.
- Replace it with your final MP4 while keeping the same filename.
- The final video should remain muted if autoplay is required on phones.


VIDEO UPDATE
- The placeholder opening film now visibly moves with a slow cinematic zoom.
- A Sound on/off control is included.
- Autoplay must begin muted in modern browsers; the viewer can then enable sound.
- The placeholder contains no programme audio. Replace assets/intro-placeholder.mp4 with the final MP4 to hear sound.


V5 FIX
- The first page now uses only assets/landing-splash.png as its background.
- The opening-film controls are hidden until the second page is actually in view.
- The second page has its own isolated full-screen video layer.
- A downward mouse-wheel movement or upward phone swipe snaps from Page 1 to Page 2.
- Volume defaults to 25% after unmuting and remains adjustable.


V6 UPDATE
- Removed the lower-left Opening Film badge.
- Added play/pause control.
- Added seek/progress bar.
- Added current time and duration display.
- Kept mute/unmute and volume controls.
- On narrow mobile screens, the volume slider is hidden to keep the playback bar usable; mute/unmute remains available.


V7 UPDATE
- Removed the “What we bring to the fight” line.
- “Our Capabilities” is now smaller, centred and displayed on one line where space permits.
- Added a scroll-linked parallax movement, opacity transition and subtle scale effect.
- Fixed the top-left header logo so its original aspect ratio is preserved.


V8 UPDATE
- Strengthened the “Our Capabilities” parallax movement.
- As the capabilities section approaches, the full-screen film fades to black.
- The capabilities layer then fades in from black.
- The heading moves farther, scales up and becomes more prominent during the transition.


V9 UPDATE
- Helvetica is now the primary font for body text and interface labels.
- Headers use Helvetica Bold.
- Replaced the previous top-right navigation labels with:
  Officer Scheme, WOSpec Scheme, Apply, and Contact Us.
- These navigation items are placeholders for now and can be linked to their final pages later.


V10 HIMARS PROTOTYPE
- Replaced the generic capability sequence with a single HIMARS scroll story.
- HIMARS vehicle enters and settles in the vertical centre.
- Title appears next.
- Description appears with bold emphasis retained.
- Description fades away while the title remains.
- A clickable video player then fades in with the DARING WARRIOR caption.


V11 HIMARS REFINEMENT
- Restored the “Our Capabilities” intro section before HIMARS.
- Extended the HIMARS scroll story so each phase lasts longer.
- Kept the description visible for a much longer portion of the scroll.
- Moved the video player into the same content area previously occupied by the description.
- Kept the video visible longer.
- Shifted the title/description block left, closer to the HIMARS vehicle.


V12 HIMARS LAYOUT REFINEMENT
- Updated title to “High Mobility Artillery Rocket System (HIMARS)”.
- Reduced title size slightly.
- Shifted the title and description block left, closer to the HIMARS image.
- Enlarged the HIMARS visual area slightly to reduce the gap.
- Raised and repositioned the video so it replaces the description area without covering the title.


V13 HIMARS TRANSITION REFINEMENT
- Restored the “Our Capabilities” transition section before the HIMARS sequence.
- Re-enabled the “Our Capabilities” parallax if it was missing.
- The HIMARS title now fades out together with the description when the video fades in.
- The HIMARS video caption now appears on top of the video instead of below it.


V14 HIMARS VIDEO UPDATE
- Changed the “Our Capabilities” transition background to pure black.
- Raised the HIMARS video player so it aligns better with the vehicle image.
- Replaced the popup behaviour with an inline embedded video player.
- Clicking the play button now swaps the poster for the embedded player in place.


V15 HIMARS ALIGNMENT AND TRANSITION
- Restored the full-screen opening film fade-to-black transition into “Our Capabilities”.
- Shortened the “Our Capabilities” transition so the HIMARS appears sooner.
- Made the HIMARS enter and settle more quickly.
- Rebuilt the right-side content area with a stable height.
- Vertically centred the embedded video so it aligns with the HIMARS vehicle.


V16 HIMARS TEXT POSITION
- Lowered the right-side HIMARS content block.
- Lowered both the title and description within the block.
- Kept the embedded video alignment unchanged.


V17 HIMARS VIDEO FIX
- The uploaded HIMARS Daring Warrior clip has been converted to MP4 and embedded.
- The video now has its own independent positioning container.
- Moving the title/description block will no longer move the video.
- The video remains vertically centred against the HIMARS image.


V18 HIMARS VIDEO CORRECTION
- Restored the opening full-screen film to the original opening placeholder clip.
- Assigned the uploaded Daring Warrior clip only to the HIMARS embedded player.
- Extracted a poster frame from the actual HIMARS clip.
- Moved the HIMARS video slot outside the text container so it uses the same screen coordinate system as the vehicle.
- Restored the player to a full 16:9 size beside the HIMARS vehicle.


V19 HIMARS VIDEO REPAIR
- Rebuilt the HIMARS section with valid HTML nesting.
- Kept the Daring Warrior clip assigned only to the HIMARS player.
- Restored a full-size 16:9 poster and embedded video.
- Removed conflicting duplicate video-slot rules that caused the player to collapse.
- Kept the player independently positioned beside the HIMARS vehicle.


V20 HIMARS PLAYBACK
- HIMARS video now starts at 30% volume.
- HIMARS video automatically pauses when less than 35% of the player remains visible.
- Returning to the section does not force playback; the visitor can resume manually.


V21 TABLET LANDSCAPE ALIGNMENT
- The stacked tablet layout now applies only in portrait orientation.
- Tablet landscape keeps the two-column HIMARS composition.
- HIMARS image, title, description and video are vertically centred in the viewport.
- Added short-height landscape overrides for iPad-style screens.


V22 TABLET LANDSCAPE FIX
- Restored true vertical centring for the HIMARS image on tablet landscape.
- Changed the tablet title and description from absolute positioning to normal vertical flow.
- Prevented title and description overlap at narrower landscape widths.
- Kept desktop styling unchanged.
- Kept the embedded video independently centred in the right column.


V23 FH2000 CAPABILITY
- Added a second capability story for the FH2000 Gun Howitzer.
- HIMARS now fades upward as the user scrolls onward into the next capability.
- FH2000 image fades in from the right and sits on the right side.
- FH2000 title and description appear on the left side.
- Added the BATTLEKING video as an embedded inline player with 30% default volume and auto-pause on scroll-away.


V24 TAKEOVER TRANSITION
- The FH2000 section now overlaps upward and takes over the HIMARS section in place.
- Users no longer need to scroll down into a clearly separate next viewport before seeing FH2000.
- The HIMARS image and video begin fading out earlier.
- The FH2000 image/title/description begin appearing earlier so the transition feels like a direct replacement.
- Desktop behavior is prioritized, with tuned overlap values for tablet landscape and portrait.


V25 TAKEOVER REFINEMENT
- HIMARS now fades out in place instead of appearing to scroll upward when transitioning to FH2000.
- Removed the upward exit motion from the HIMARS title, description, and video.
- FH2000 title and description are now right-aligned.


V26 TAKEOVER FIX
- Restored HIMARS title and description to left alignment.
- Kept FH2000 title and description right-aligned.
- Removed the opaque black background from the overlapping FH2000 sticky layer.
- HIMARS can now fade/move away while the FH2000 elements fade in, without a black rectangle scrolling upward over them.


V27 SHARED PROGRESS BAR
- HIMARS image and video now fade out the same way: both shrink slightly and fade without vertical exit movement.
- Replaced separate moving progress bars with one fixed progress bar at the bottom of the viewport.
- HIMARS progress fills the shared bar in yellow.
- FH2000 progress fills the same bar in white over the yellow.


V28 TIMING AND PROGRESS FIX
- HIMARS vehicle and video remain visible longer before shrinking and fading.
- The shared progress bar now stays visible for the full HIMARS and FH2000 sequences.
- Once FH2000 begins, the yellow bar remains fully filled while the white bar progresses over it.


V29 TRANSITION CLEANUP
- Removed the remaining upward movement from the HIMARS video exit.
- HIMARS image and video now both shrink slightly and fade while staying fixed in position.
- Completed their fade just before the sticky section releases to prevent upward travel.
- Removed the subtle radial background difference that caused a colour-shift to scroll upward during the takeover.


V30 BLACK OVERLAY REMOVAL
- Removed the opaque black background from the moving FH2000 section container.
- Kept the stationary HIMARS viewport black.
- Added final transparency safeguards so the overlapping FH2000 section cannot form a black rectangle while moving into place.


V31 BACKGROUND SEAM FIX
- Added a stationary pure-black background to the main document.
- The transparent FH2000 takeover layer now reveals the same black as the HIMARS scene instead of the body's dark green background.
- Removed the visible horizontal colour seam during transition without restoring the moving black overlay.


V32 FH2000 IMAGE AND DESKTOP COPY
- Replaced the FH2000 capability image with the newly supplied transparent image.
- On desktop, moved the FH2000 title and description further right toward the gun image.
- Reduced the vertical gap between the FH2000 title and description.
- Left tablet layout behavior unchanged.


V33 FH2000 IMAGE AND CAPABILITIES TITLE
- Replaced the FH2000 capability image with the newly supplied image.
- The “Our Capabilities” text no longer fades.
- Its parallax movement and scaling remain, but the text stays fully opaque throughout.


V34 SPLASH TITLE REFINEMENT
- Changed the splash title from dark blue to a warm off-white primary title.
- Applied a muted blue accent to the second title line.
- Added a subtle gold accent line below the second line.
- Strengthened the local dark gradient and added a soft glass-like lockup backdrop for readability.


V35 MINIMAL SPLASH
- Removed the splash logo.
- Removed the dark gradient overlay.
- Removed the backdrop panel.
- Removed the gold accent line.
- Hid the “Singapore Artillery” line.
- Kept only “King of the Battlefield”.
- Centered the text horizontally while keeping the same vertical position.
- Set the text to pure white (#FFFFFF) with a slight drop shadow.


V36 RESPONSIVE HEADER
- Header height, padding, logo size, navigation spacing, and navigation text now scale with viewport size.
- Navigation switches to the compact menu at 1100px instead of waiting until very narrow screens.
- Added a smaller mobile header at 640px and below.


V37 ADDITIONAL CAPABILITIES SHOWCASE
- Added a new fixed-screen sequence after the FH2000 capability.
- FH2000 image and video now fade and shrink away at the start of the sequence.
- Added a centered “and many more” transition.
- Added sequential centered reveals for:
  1) Singapore Light Weight Howitzer (Pegasus)
  2) Belrex Protected Combat Support Vehicle (Mortar)
  3) Arthur Radar
  4) TPQ-53 Radar
  5) SSPH
- The shared bottom progress bar now fills again in yellow for the showcase sequence.


V38 LAPTOP RESPONSIVE LAYOUT
- Replaced conflicting laptop/tablet rules with one final two-column layout.
- HIMARS and FH2000 remain side-by-side on laptop fullscreen and non-maximised desktop windows.
- Added special sizing for short laptop displays such as 1366×768 and 1280×720.
- Vertical stacking now occurs only on genuinely narrow portrait screens below 700px.


V39 FH2000 DUPLICATION FIX
- Removed the duplicated FH2000 image and video from the start of the “and many more” section.
- The real FH2000 image and video now shrink slightly and fade out before the FH2000 section releases.
- “And many more” begins immediately in the next fixed sequence.


V40 MORE-CAPABILITIES SEQUENCE FIX
- Rebuilt the section with correct HTML nesting.
- “And many more” and all five capability items now remain inside the sticky viewport.
- Only the currently active capability is visible; inactive items are hidden.
- Extended the “and many more” reveal slightly before the sequential equipment showcase begins.


V41 OUR FOOTPRINT PAGE
- Shortened the scroll delay before “and many more” appears.
- Removed the Integrated Reach / world map section from the home page.
- Added an offline footprint.html page containing the Our Footprint introduction and world map.
- Added “Our Footprint” to the main header navigation.
- Added footprint.js for the offline page’s responsive navigation.


V42 JOIN ARMY CTA
- Changed the final section headline to “Are you Ready to Wield Heavy Firepower?”
- Updated the final call-to-action to https://go.gov.sg/joinarmy
- Applied the same closing CTA to both the home page and Our Footprint page.


V43 LINKS, VIDEO ASSET, AND LABELS
- Made the closing headline itself link to https://go.gov.sg/joinarmy.
- Updated the opening video source to assets/Singapore Artillery.mp4.
- Renamed Arthur Radar to Artillery Hunting Radar (ARTHUR).
- Renamed SSPH to Singapore Self Propelled Howitzer.


V44 RESPONSIVE FULLSCREEN VIDEO
- Opening video now scales responsively while preserving its full frame.
- Added a fullscreen button to the custom video controls.
- Fullscreen state and button label update automatically.
- Lowered and slimmed the control/progress bar to reduce subtitle obstruction.
- Added compact control layouts for smaller windows and short landscape screens.


V45 CLOSING AND FULLSCREEN FIX
- Removed the “Singapore Artillery” words below the closing logo.
- Moved the logo slightly lower and closer to the closing headline.
- Fullscreen now targets the video element directly instead of the entire film section.
- Native video controls are enabled while fullscreen and removed after exiting.
- This avoids the black transition overlay covering the fullscreen video.


V46 OUR FOOTPRINT WORLD SEQUENCE
- Removed the extra descriptive text from the Our Footprint page.
- Added a centred “Connected across the world” fade-in/fade-out transition.
- Added a fixed world map that fades into the centre of the viewport.
- Added cumulative country highlights for Thailand, New Zealand, Australia, the United States and India.


V47 FOOTPRINT LOWER-THIRD
- Added the lower-third “Our Artillery trains with our partners in...”
- The lower-third fades in before Thailand is highlighted and remains visible through most of the sequence.
- Recalibrated the marker positions for Thailand, New Zealand, Australia, the United States and India against the visible map artwork.


V48 FOOTPRINT ALIGNMENT REFINEMENT
- Moved the “Our Artillery trains with our partners in...” overlay to the upper-left of the viewport.
- Recalibrated all five country markers against the visible geography in world-map.png:
  United States, India, Thailand, Australia and New Zealand.


V49 RESPONSIVE FOOTPRINT LABELS
- Country names now remain visible when the browser window is not maximised.
- Edge-country labels point inward to reduce clipping.
- The upper-left overlay now wraps and scales within the viewport.
- Added compact label sizing for smaller windows.


V50 FOOTPRINT TEXT FIX
- Removed the horizontal -50% animation offset that pushed the upper-left overlay off-screen.
- Constrained the overlay between responsive left and right margins.
- Forced all country names to stay horizontal on one line.
- Removed aggressive word wrapping that caused vertical labels.


V51 ARTILLERY OFFICER PAGE
- Added officer.html as an offline Artillery Officer page.
- Added hero, role, requirements and benefits sections using the supplied visual references.
- Added animated role cards for Mission, People, Systems and Integration.
- Linked Officer Scheme navigation to officer.html from the existing pages.
- Added officer.js for responsive navigation and scroll reveals.


V52 OFFICER IMAGE UPDATE
- Replaced the Officer page splash with the uploaded operational field image.
- Added stronger cinematic overlay treatment so the splash title remains readable.
- Replaced the Officer page closing section with the uploaded beret/mentorship image.
- Restyled the closing section as a full-screen recruitment panel with the existing join link.


V53 OFFICER IMAGE AND CENTERING FIX
- Replaced the Officer splash asset with the confirmed uploaded field image file.
- Replaced the Officer closing asset with the confirmed uploaded beret image file.
- Centred the closing paragraph and recruitment content.


V54 OFFICER PAGE UPDATE
- Removed the “Singapore Artillery” eyebrow above “Artillery Officer”.
- Updated the introduction to mention the Enhanced Officer Scheme (EOS).
- Removed the background image from the Entry Requirements and Benefits section.


V55 OFFICER ROLES REFINEMENT
- Replaced the second-section static background with a looping-video placeholder:
  assets/Artillery Officer Roles.mp4
- Kept officer-roles.png as the video poster/fallback.
- Replaced the four heavy description boxes with a cleaner editorial list using subtle dividers and numbered labels.
- Added automatic play/pause behaviour when the role section enters or leaves the viewport.


V56 WOSPEC PAGE
- Added wospec.html as an offline Warrant Officers & Specialists page.
- Added hero, roles, entry requirements, benefits and recruitment sections.
- Added a looping-video placeholder at assets/Artillery WOSpec Roles.mp4.
- Linked WOSpec Scheme navigation across the existing pages.
- Added wospec.js for responsive navigation, scroll reveals and video play/pause.


V58 SNEAK-PEEK VIDEOS
- Added a “Sneak a peek” button to the Artillery Officer roles section.
- Officer button opens and plays assets/Vid-5.mp4.
- Added the same button to the WOSpec roles section.
- WOSpec button opens and plays assets/Vid-1.mp4.
- Buttons fade in on the right side during the middle of each scroll story.
- Added responsive full-screen-style video modals with close and Escape-key support.


V59 WOSPEC COPY UPDATES
- Updated the WOSpec introduction to mention the Enhanced Warrant Officer Scheme (EWOS).
- Changed Academic Qualifications to “Minimally ‘N’ Level.”
- Updated the closing copy to “Step forward as our Artillery's next generation of Warfighters.”


V60 WOSPEC CLOSING BACKGROUND UPDATE
- Replaced the last WOSpec section background with the uploaded night-field image.
- Tuned crop positioning, contrast, and overlay so the image blends better with the page and keeps the headline readable.


V61 WOSPEC CLOSING VISIBILITY REFINEMENT
- Reworked the last WOSpec section background treatment to preserve the subject's fierce facial expression and the item-grab moment.
- Added a soft blurred full-bleed background plus a contained foreground portrait so the full moment remains visible while still blending into the page.


V62 WOSPEC CLOSING EDGE BLEND REFINEMENT
- Softened the visible left/right borders of the closing background image.
- Added horizontal mask blending and subtle side vignettes so the photo merges more naturally into the black page background.


V63 WOSPEC CLOSING COMPOSITE BLEND
- Replaced the browser-dependent mask treatment with a pre-blended 16:9 composite image.
- The subject, facial expression and item-grab remain visible, while the image now fades smoothly into black without hard vertical borders.


V64 ROLE BACKGROUNDS AND FOOTPRINT CTA
- Replaced the Officer role-section video background with the original WhatOfficerDo.jpg still image.
- Replaced the WOSpec role-section video background with the original Arty WOSpec Background.jpg still image.
- Added subtle scroll-based scale/parallax movement to keep both sections visually alive without a looping background video.
- Kept the existing “Sneak a peek” video buttons and modal playback.
- Changed the Our Footprint closing headline to “Are you Ready to Explore the World with Us?”


V65 OFFICER AND WOSPEC HEADLINES
- Officer closing headline changed to “Are you Ready to Lead the Men of Steel?”
- WOSpec opening title changed to “Artillery Warrant Officers & Specialists”.
- WOSpec closing headline changed to “Are you Ready to Forge our Men of Steel?”


V66 OUR FOOTPRINT COUNTRY PHOTOS
- Added a photo pop-up for each highlighted country on the world map.
- Thailand, New Zealand, Australia, the United States and India now reveal their corresponding uploaded image together with the country marker.
- Cards point inward near the map edges and resize for smaller windows.


V67 COUNTRY PHOTO DISPLAY
- Country markers and labels still accumulate on the map.
- Only the most recently highlighted country's photo remains visible.
- Previous photos fade out before the next country photo appears, preventing overlap.


V68 COUNTRY PHOTO TRAY
- The current country's photo still appears beside its highlighted map marker.
- When the next country is highlighted, the previous photo is retained as a thumbnail along the bottom of the screen.
- Thumbnails accumulate in reveal order without covering the map.
- Smaller windows use a horizontally scrollable bottom tray.


V69 TRAY-ONLY COUNTRY PHOTOS
- Removed the large country photo beside each map highlight.
- Country markers and labels remain on the map.
- Photos now appear only in the accumulated bottom tray.


V70 FOOTPRINT MARKER POSITION FIX
- Shifted the Thailand marker west and slightly south so it sits over Thailand rather than Vietnam.
- Shifted the New Zealand marker onto the New Zealand landmass rather than the surrounding sea.


V71 FOOTPRINT MARKER REFINEMENT
- Moved the Thailand marker higher so it sits over Thailand rather than near Malaysia.
- Moved the India marker slightly left and lower.


V72 INDIA MARKER POSITION
- Moved the India marker substantially lower while keeping its horizontal position unchanged.


V73 CONTACT US PAGE
- Added a new Contact Us page with the headline “It's a big decision and a big responsibility. Talk to us.”
- Added EOS and EWOS advisor sections using the supplied personnel panels.
- Added a Telegram QR section using the supplied QR code.
- Updated Contact Us in every page header to open contact.html.
- Updated Apply in every page header to open https://go.gov.sg/joinarmy.


V74 JOIN US CTA WORDING
- Changed visible end-section CTA wording from “Join the Army” to “Join Us”.
- Existing links and destinations remain unchanged.


V75 HIMARS PLAY BUTTON FIX
- Raised the HIMARS play control above the fading media layers.
- Disabled pointer interception on decorative fade overlays.
- Added a defensive interaction fallback so the play button remains clickable throughout the transition.


V76 OUR FOOTPRINT UPDATE
- Removed Thailand from the Our Footprint map sequence.
- Removed the Thailand marker, label, photo tray item and unused image asset.
- Remaining country highlights continue in sequence.


V77 FORMSG LINK UPDATE
- Changed all “Join Us” and “Apply” links to https://form.gov.sg/62cd16ccbbb7a20012d9ede0.


V78 OUR FOOTPRINT REPAIR
- Restored New Zealand, Australia, United States and India to the world map.
- Thailand remains removed.
- Restored the correct country indices so the highlights and bottom photo tray animate in sequence.


V79 CAPABILITY VIDEO DESCRIPTION
- Changed the HIMARS and FH2000 video descriptions to “Click here to see our capability in action”.


V80 CAPABILITY VIDEO LABELS
- HIMARS label changed to “See the HIMARS in action”.
- FH2000 label changed to “See the FH2000 in action”.


V81 THAILAND, SAVER AND CARE LINKS
- Restored Thailand to the Our Footprint map, highlight sequence and photo tray.
- Added an external link from SAVER on the Officer page to the Army Officers career-scheme section.
- Added an external link from CARE on the WOSpec page to the Army Warrant Officers career-scheme section.


V82 OFFICER CAREER ROADMAP
- Added a scroll-driven horizontal Officer career roadmap between “What does an Artillery Officer do?” and “Entry requirements and benefits”.
- Added age, profile, rank, Army PMET, Artillery PMET, example-role and domain-specialisation lanes.
- Added progressive highlighting and a moving age cursor as the user scrolls.
- Added a mobile vertical accordion version for smaller screens.


V83 COMPACT OFFICER ROADMAP
- Reduced the desktop roadmap from six information lanes to five.
- Combined Army and Artillery PMET into one compact “Key Development” lane.
- Limited the always-visible content so the full roadmap fits within shorter laptop viewports.
- Added a “View full details” drawer for each career stage.
- Added extra compression rules for low-height screens.


V84 OFFICER ROADMAP HUB
- Replaced the large embedded Officer timeline with a concise three-stage preview.
- Added “Explore the Career Journey” linking to a hidden officer-roadmap.html deep-dive page.
- Added “View the Full Roadmap” opening the complete roadmap image in a fullscreen zoom-and-pan viewer.
- Added mouse-wheel zoom, pinch-to-zoom, drag-to-pan, reset, close and open-original controls.
- Added a persistent back-to-Officer-Scheme link on the dedicated roadmap page.


V85 FIVE-STAGE OFFICER JOURNEY
- Expanded the dedicated Officer journey page into five stages: 2LT–CPT, CPT–MAJ, MAJ–SLTC, COL–BG and MG–LG.
- Added Army-level leadership stages to show the full potential of an Officer career.
- Removed Artillery domain specialisations from COL–BG and MG–LG, replacing them with broader Army and SAF leadership focus areas.
- Updated the Officer page preview to show all five stages.


V86 OFFICER PAGE COPY UPDATES
- Removed “Your career journey” from the career journey section.
- Changed the career journey heading to “Build a career with purpose”.
- Changed “View the Full Roadmap” to “Full Roadmap at a Glance”.
- Changed the requirements section heading to “Entry Requirements and Benefits”.
- Removed the smaller “Entry requirements and benefits” eyebrow text.


V87 OFFICER ROADMAP RANK INSIGNIA UPDATE
- Replaced the five Officer roadmap phase text headers with rank insignia image pairs.
- Added rank insignia image assets for 2LT, LTA, CPT, MAJ, LTC, SLTC, COL, BG, MG and LG.
- Removed “Strategic and joint military education” from the COL–BG section.
- Removed “Senior Joint and Defence Appointments” from the MG–LG section.


V89 OFFICER CAREER JOURNEY BACKGROUND
- Added a dark strategic-grid background to the Officer career journey section.
- Added subtle topographic contour lines, a gold five-stage route line and faint rank-insignia watermarks.
- Added restrained slow background movement with a reduced-motion fallback.
- Kept the section text and roadmap cards as the main visual focus.


V90 SIMPLIFIED OFFICER CAREER PREVIEW
- Removed rank insignia images from the brief career timeline on officer.html.
- Replaced fully spelled-out rank ranges there with 2LT–CPT, CPT–MAJ, MAJ–SLTC, COL–BG and MG–LG.
- Retained the insignias and fully spelled-out rank ranges on officer-roadmap.html.


V91 REDESIGNED FULL ROADMAP AT A GLANCE
- Replaced the old roadmap screenshot viewer with a purpose-built, responsive five-stage roadmap overview.
- Added rank insignias, concise development milestones, representative roles and focus areas for each career stage.
- Added horizontal swipe, arrow-key and on-screen arrow navigation.
- Retained a direct link to the detailed Officer career journey.


V92 REFINED FULL ROADMAP SLIDE VIEWER
- Replaced the custom card-style roadmap overview with the original slide image again.
- Restyled the viewer as a more polished presentation-style lightbox.
- Added a cleaner header, presenter-friendly captioning, and a framed slide stage.
- Retained zoom, reset, drag-to-pan, pinch-to-zoom, open-original and close controls.


V93 ORIGINAL ROADMAP VIEWER RESTORED
- Restored the original fullscreen roadmap image viewer used before V91/V92.
- Restored the compact toolbar, large image stage, zoom, reset, drag-to-pan and pinch-to-zoom behaviour.
- Kept all later Officer page and roadmap content updates unchanged.


V94 OFFICER PAGE INTERACTION UPDATE
- The “Sneak a peek” button now appears as soon as the Officer role-section title begins to reveal.
- Added gentle proximity snap-scrolling between the Officer page’s major sections on desktop.
- Kept mobile scrolling natural to avoid conflicts with smaller screens and the long sticky role sequence.
- Used proximity rather than mandatory snapping so users can still stop naturally within longer content.


V95 GLOBAL FOOTPRINT AND OPERATIONS STORY
- Renamed “Our Footprint” to “Global Footprint” across page titles and navigation.
- Updated the training line to “Our Artillery trains with our partners in”.
- Added a coordinated fade-out for all five training-country markers, labels, photos and heading.
- Added an Afghanistan operations sequence while retaining the world-map screen.
- Added Afghanistan / Operation BLUE RIDGE marker and label.
- Added “Shield of Safety” with the Afghanistan flag-hoisting image and clickable Arty OBR video.
- Added “Shona Ba Shona” with the Afghan live-firing image while retaining the first operation card.


V96 GLOBAL FOOTPRINT REFINEMENTS
- Fixed the training-country image tray so it remains centred instead of shifting off the right edge.
- Changed “Watch Arty OBR” to “See the WLR in Afghanistan”.
- Shifted the Afghanistan map marker slightly southeast for better geographic alignment.


V97 ARTILLERY LIFE PAGE
- Added a new Artillery Life page and navigation item.
- Featured National Day Parade first.
- Added an Artillery Key Challenges section with Skill at Arms and Men of Steel Challenge.
- Added a Gunners’ RV section describing the quarterly Gunner-family gathering.
- Added responsive reveal animations, parallax treatment and mobile layouts.


V98 ARTILLERY LIFE COPY REFRESH
- Removed the introductory Artillery Life hero so the page starts directly with National Day Parade.
- Simplified National Day Parade and Signature Events headings.
- Updated Gunners' RV and closing-section copy.
- Added a cropped Men of Steel group photo as the closing-section backdrop.

V99 FIX
- Fixed the Artillery Life closing backdrop so it spans the full section width.


V100 CONSISTENT HEADER NAVIGATION
- Standardised the primary header navigation across all pages.
- Navigation order is now: Home, Global Footprint, Artillery Life, Officer Scheme, WOSpec Scheme, Apply, Contact Us.
- Apply opens the official application form in a new tab.


V101 CONSISTENT HEADER NAVIGATION — ALL PAGES
- Standardised every page header to: Home, Global Footprint, Artillery Life, Officer Scheme, WOSpec Scheme, Apply, Contact Us.
- Preserved the active-page indicator on each page.
- Added the same navigation to the hidden Officer roadmap page.
- Added responsive menu behaviour to the Officer roadmap page.


V102 CAPABILITIES AT A GLANCE
- Replaced the long HIMARS, FH2000 and additional-capability scroll stories with one visual capability gallery.
- Added clickable imagery for HIMARS, FH2000, SLWH Pegasus, SSPH Primus, ARTHUR, TPQ-53 and SAFARI.
- Added capability pop-ups with titles and descriptions.
- Retained live-firing videos for HIMARS and FH2000.
- Added the uploaded SAFARI radar image.


V103 CAPABILITIES LAYOUT REFINEMENT
- Removed the boxed-card treatment from the capability gallery.
- Adjusted the gallery so all system images use contain sizing and remain fully visible.
- Reduced the capability popup title size.
- Removed the “Our Capabilities” label from the popup.
- Resized the popup and video area so the live-firing videos remain fully visible.


V104 UNIFORM CAPABILITY IMAGE SIZING
- Resized the capability images to have a more consistent visual scale based on the SSPH.
- Removed the mouseover glow.
- Removed the mouseover enlargement and movement.


V105 CAPABILITY ROW ORDER
- First row: HIMARS, FH2000, SSPH and SLWH.
- Second row: SAFARI, ARTHUR and TPQ-53.
- Increased ARTHUR and TPQ-53 image sizes.
- Reduced the SAFARI image size.


V106 THREE-STORY OFFICER ROADMAP
- Rebuilt officer-roadmap.html as a guided vertical scroller.
- Each career stage now tells three connected stories: how the officer grows, how the officer is developed, and where the officer may serve.
- Separated Army PME from role-linked Artillery professional education.
- Clarified that Artillery courses depend on the appointments and domains pursued.
- Visualised domain breadth at 2LT–CPT, expanding specialisation at CPT–MAJ, consolidation at MAJ–SLTC, and leadership focus from COL onwards.
- Added representative appointments and a career-pathway disclaimer.


V107 OFFICER ROADMAP CROSSFADE FIX
- Fixed the three story layers stacking on top of one another during scrolling.
- Added exclusive crossfade windows so only one layer is readable at a time.
- Added clipping and visibility safeguards inside each sticky stage.
- Improved behaviour on shorter desktop viewports.


V108 OFFICER ROADMAP RANK AND CONTENT UPDATES
- Rank insignias and rank ranges now remain visible throughout every story layer.
- Added estimated ages: 19, 30, 40 and 50 across the career stages.
- Added Integrated Strike Course for specialist battlestaff appointments.
- Refined the CPT–MAJ pathway wording.
- Removed Training Commander Course from MAJ–SLTC.
- Added Brigade Commander Course to COL–BG.
- Removed the faded closing taglines from the senior “How you may lead” sections.


V109 OFFICER ROADMAP HEADER SPACING FIX
- Removed the faded taglines from the “Where you may serve” portions.
- Increased the reserved space below the persistent rank header.
- Added a subtle header background so content no longer scrolls beneath the rank insignias.
- Reduced and tightened the rank insignia header to prevent it from covering later content.


V110 OFFICER ROADMAP CONTENT CLEARANCE FIX
- Reserved an explicit fixed-height area for the persistent rank header.
- Moved every story panel fully below that reserved area.
- Added additional top clearance for large headings and education panels.
- Improved behaviour on shorter desktop screens and mobile.


V111 CENTERED LEADERSHIP FOCUS TEXT
- Centered the text horizontally and vertically inside all “How you may lead” boxes.


V112 OFFICER PREVIEW OVERFLOW FIX
- Prevented the compact career roadmap cards from bleeding outside the Officer page section.
- Made the five-stage preview responsive to available width.
- Added horizontal scrolling only on narrower screens where the cards cannot fit comfortably.


V113 OFFICER PREVIEW FIVE-CARD FIT
- Corrected the actual five-stage preview selectors on the Officer Scheme page.
- Removed the separate arrow columns so all five career cards fit within the section.
- Expanded the usable preview width and allowed every card to shrink safely.
- Retained controlled horizontal scrolling only for genuinely narrow screens.


V114 ROADMAP GLANCE IMAGE UPDATE
- Replaced the Full Roadmap at a Glance image with the newly provided officer career roadmap slide.


V115 FULL-BLOCK SAVER AND CARE LINKS
- Made the complete SAVER information block clickable on the Officer Scheme page.
- Made the complete CARE information block clickable on the WOSpec Scheme page.
- Added keyboard focus and restrained hover feedback to both linked blocks.


V116 BENEFITS BUTTONS
- Restored the SAVER and CARE blocks to the same card structure as the surrounding information blocks.
- Added a “See Salary and Full Benefits” button inside the Officer SAVER card.
- Added a “See Salary and Full Benefits” button inside the WOSpec CARE card.
- Officer button links to the Officer Scheme benefits section.
- WOSpec button links to the Warrant Officer and Specialist benefits section.


V117 REMOVE MG–LG ROADMAP STAGE
- Removed the MG–LG stage from the full Officer career roadmap.
- Removed the MG–LG card from the Officer Scheme page roadmap preview.
- Updated the compact preview to use a four-column layout ending at COL–BG.


V118 OFFICER ROADMAP GLANCE + COL-BG UPDATES
- Replaced the Full Roadmap at a Glance image with the newly provided officer roadmap graphic.
- Updated the Officer Scheme preview card label for COL-BG from "Lead formations" to "Strategic Leadership".
- Added Division Commander to the COL-BG representative appointments on the Officer roadmap page.
- Refined the COL-BG stage heading on the roadmap page to reflect strategic leadership.


V119 WOSPEC CAREER ROADMAP
- Added a four-stage WOSpec career preview to the WOSpec Scheme page.
- Added a dedicated vertical-scrolling WOSpec career roadmap.
- Career stages: Novice, Expert, Master Gunner and Institutional Stewardship.
- Joint Leadership Course is shown at 3WO in preparation for 2WO appointments.
- Joint Advanced Leadership Course is shown at 1WO in preparation for MWO appointments.
- Added platform cross-training, professional development and representative roles across all four stages.


V120 WOSPEC RANK INSIGNIAS
- Added the uploaded rank insignias to every WOSpec roadmap stage.
- Stage 1 displays 3SG, 2SG, 1SG, SSG, MSG and 3WO.
- Stage 2 displays 3WO, 2WO and 1WO.
- Stage 3 displays 1WO and MWO.
- Stage 4 displays SWO and CWO.
- Removed the six leadership-focus boxes from the SWO–CWO “How you may lead” section.


V121 SCROLL-STICKING FIX
- Removed aggressive scroll snapping from the Officer and WOSpec pages.
- Added normal scroll chaining for the Officer and WOSpec roadmap panels.
- When an inner roadmap panel reaches its top or bottom, mouse-wheel scrolling
  now continues on the main page instead of appearing to get stuck.


V122 OFFICER ROLES SCROLL FIX
- Disabled the remaining HTML-level scroll snap affecting the Officer page.
- Removed snap alignment from the Officer page sections.
- Updated the “What does an Artillery Officer do?” animation through a single
  requestAnimationFrame loop for smoother wheel and trackpad scrolling.
- Slightly lengthened the role-reveal sequence and disabled scroll anchoring jumps.


V123 GLOBAL FOOTPRINT TRAINING VIDEOS
- Confirmed that the home-page opening video source points to assets/Singapore Artillery.mp4.
- Added a “Watch the exercise” button above every training-country photograph.
- Thailand opens XBK2.mp4.
- New Zealand opens ZaqyThunderWarrior.mp4.
- Australia opens XWB.mp4.
- United States opens DaringWarrior.mp4.
- India opens AgniWarrior18.mp4.
- Added a reusable fullscreen training-video popup.


V124 PACKAGE WITHOUT VIDEO ASSETS
- Removed all MP4 video files from the downloadable package.
- Existing HTML and JavaScript references to the videos remain unchanged.
- Place the required video files back into singapore_artillery_site/assets/ using the expected filenames.


V125 GLOBAL FOOTPRINT VIDEO BUTTON VISIBILITY FIX
- Fixed the training-country video buttons being clipped by the image thumbnails.
- Reserved space above the photograph tray for the buttons.
- Kept the buttons clickable while each corresponding country image is visible.
- This package continues to exclude MP4 video assets.


V126 GLOBAL FOOTPRINT VIDEO TITLES
- Thailand: Ex BATTLEKING
- New Zealand: SMS Zaqy with us in Ex THUNDER WARRIOR
- Australia: Ex WALLABY
- United States: Ex DARING WARRIOR
- India: Ex AGNI WARRIOR
- This package continues to exclude MP4 video assets.


V127 OFFICER ROADMAP LIGHTBOX FIX
- Moved the Full Roadmap at a Glance viewer directly under the document body.
- Prevented transformed or animated parent sections from constraining the fixed viewer.
- The viewer now fills the browser viewport regardless of the user's scroll position.
- Preserved and restored the user's page position when opening and closing the viewer.
- Kept the close control visible and keyboard accessible.
- This package continues to exclude MP4 video assets.


V128 WOSPEC ROADMAP AT A GLANCE
- Added a WOSpec Career Roadmap at a Glance image using the same structure and visual treatment as the Officer roadmap.
- Added a Full Roadmap at a Glance button to the WOSpec Scheme page.
- Added fullscreen zoom, reset, pan, open-original and close controls.
- This package continues to exclude MP4 video assets.


V129 WOSPEC ROADMAP CLARITY AND BACKGROUND
- Rebuilt the WOSpec roadmap-at-a-glance image at double resolution for sharper viewing.
- Reduced and reflowed text to prevent words from spilling outside their boxes.
- Added an abstract strategic background to the WOSpec roadmap preview section, matching the Officer page's visual language.
- This package continues to exclude MP4 video assets.


V130 WOSPEC ROADMAP STAGE TEXT FIT
- Reduced and wrapped the full rank-range labels in the stage row.
- Repositioned the stage titles to prevent overlap and horizontal spillage.
- Preserved the high-resolution roadmap image and existing layout.
- This package continues to exclude MP4 video assets.


V131 REMOVE THAILAND FROM GLOBAL FOOTPRINT
- Removed Thailand from the Global Footprint training-country sequence.
- Removed the Thailand country photo and Ex BATTLEKING video popup reference.
- The remaining training countries are New Zealand, Australia, United States and India.
- This package continues to exclude MP4 video assets.


V132 CAPABILITY DESCRIPTION UPDATES
- Updated SSPH, SLWH, SAFARI, ARTHUR and TPQ-53 capability descriptions.
- Added bold emphasis within the relevant capability descriptions.
- Added a video reference for SSPH: assets/ssph_clip.mp4.
- No MP4 file was added to this package; place ssph_clip.mp4 inside assets/ for the video to play.


V134 CAPABILITY BOLD FIX
- Fixed capability popup descriptions rendering <strong> tags as visible text.
- Capability descriptions now render inline HTML so bold emphasis displays properly.
- Added popup emphasis styling for strong text.


V135 REMOVE CAPABILITY STRONG TAGS
- Removed all <strong> tags from the updated capability descriptions.
- Capability descriptions are rendered as plain text again to avoid visible HTML tags.


V136 JOIN ARMY AND CONTACT INTEREST UPDATE
- Updated application/join links across the site to https://go.gov.sg/joinarmy.
- Removed the old “Apply to Join Us” action from Contact Us Stay Connected.
- Split the Contact Us Stay Connected box into two actions:
  1. Join our Telegram.
  2. Express Interest without Applying, linking to https://form.gov.sg/62cd16ccbbb7a20012d9ede0.


V137 CONTACT STAY CONNECTED REFINEMENT
- Added viewport side padding to the Contact Us Stay Connected section.
- Removed the Telegram link and descriptor from the Join our Telegram action.
- Added the Telegram QR code directly inside the Join our Telegram card.
- Updated the Express Interest without Applying descriptor.
