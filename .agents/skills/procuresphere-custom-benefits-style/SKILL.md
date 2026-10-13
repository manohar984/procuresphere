---
name: procuresphere-custom-benefits-style
description: Applies the custom, ultra-compact Benefits section style and delayed card stack interactions for Procuresphere.
---

# Custom Benefits Section Specifications

Whenever the user requests the "custom short benefits header style" or asks to apply the recent Procuresphere design fixes, you MUST implement the following precise styles and logic:

## 1. Section Dimensions (Ultra-Compact)
- **Padding & Margins:** The section container must have absolute minimal padding (`padding: '60px 20px 20px'` or `0px 20px` depending on spacing needs, but generally heavily squeezed).
- **Text Gaps:** The gaps between the eyebrow text, H2, and paragraph must be reduced to absolute minimums (e.g., `marginBottom: '4px'` for eyebrow, `margin: '0 0 8px'` for H2) to save vertical space.

## 2. Background Video Overlap Prevention
- **Positioning:** If using `objectFit: 'cover'` in a short/compact container, you MUST set `objectPosition: 'bottom'`. This pushes the video up, intentionally cropping the top half out so that baked-in 3D text from the video does not overlap with the HTML text.
- **Opacity & Shadows:** Video opacity should be low (e.g., `0.25`). HTML text must have a strong text-shadow (e.g., `textShadow: '0 4px 24px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'`) to remain readable.

## 3. Card Stack Interaction Logic (AnimatedModulesStack)
- **Modal Close Delay:** When a popup modal is closed (e.g., `selectedModule` becomes null), the card stack MUST NOT collapse immediately. It must wait exactly **3 seconds (3000ms)** before transitioning to the shuffle/close state.
- **Hover Interruption:** Ensure that `onMouseLeave` events on the container DO NOT trigger the collapse/shuffle animation if a module is currently selected (i.e., modal is open).
