# Cinematic Scroll & Animation Preferences

When implementing or modifying scroll-linked or cinematic animations (e.g., using `requestAnimationFrame`, LERP, and sticky containers) for this workspace, strictly adhere to the following user preferences:

1. **Short Scroll Lengths**: The user prefers very fast, responsive scroll experiences. Keep sticky container heights tight (exactly `250vh` for a 3-phase animation is preferred) rather than long (like `400vh+`) or too short (`150vh`).
2. **Time-based Reveal over Scroll-tied Reveal**: Do not strictly tie the `opacity` or `transform` of final revealing elements (like text cards, headings, or grids) to the exact scroll progress percentage. If the user stops scrolling halfway, elements should not get stuck in a "blurred" or semi-transparent state. 
   - **Fix**: Use the scroll progress only as a *trigger point* (e.g., `if (statsP > 0.01) setShow(true)`). Once triggered, let CSS `transition` (e.g., `transition: opacity 0.8s ease`) handle the smooth animation into full view.
3. **Simultaneous Group Arrival**: When revealing a grid or group of items (like 4 cards), they should arrive simultaneously (no delay staggers between them) unless explicitly requested otherwise.
4. **"Sobha Style" Text**: If the user asks for "Sobha Style" text animation, it means a premium, character-by-character staggered reveal from the bottom up using `IntersectionObserver` or a trigger state. Do not use basic word/line fading.
5. **Anti-Overlap**: Ensure that moving background elements (like scaling images) and foreground text elements exist in separate visual spaces (e.g., by translating one out of the viewport entirely using `vh` units) to prevent them from overlapping during the scroll sequence.
