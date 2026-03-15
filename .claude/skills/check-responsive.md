# Check Responsive Design

Verify and ensure the application is fully responsive across all screen sizes.

## Instructions

### 1. Review CSS Media Queries

Search for existing media queries in CSS files:
```bash
grep -r "@media" src/
```

Ensure breakpoints cover:
- **Mobile**: max-width 480px
- **Tablet**: max-width 768px
- **Desktop**: max-width 1024px

### 2. Check for Responsive Anti-patterns

Search for fixed widths that may break responsiveness:
```bash
grep -rE "width:\s*[0-9]+px" src/*.css
```

Fix by using:
- `max-width` instead of `width`
- Percentages or `vw`/`vh` units
- `clamp()` for fluid sizing
- Flexbox/Grid with `fr` units

### 3. Required Responsive Elements

Verify these components adapt correctly:

**Header**
- Font size scales down on mobile
- Padding reduces on smaller screens

**Map Container**
- Takes full available height
- Min-height for very small screens

**Event Info Panel**
- On mobile: full width at bottom
- On desktop: fixed width on right side

**Timeline Controls**
- Buttons remain tappable (min 44px touch target)
- Slider remains usable on touch devices
- Year labels scale or hide on very small screens

### 4. Add Missing Media Queries

For each component, ensure media queries exist:

```css
/* Mobile */
@media (max-width: 480px) {
  /* Smaller fonts, stacked layouts, full-width elements */
}

/* Tablet */
@media (max-width: 768px) {
  /* Adjusted spacing, repositioned panels */
}

/* Large screens */
@media (min-width: 1200px) {
  /* Max-width containers, larger fonts */
}
```

### 5. Check Touch-friendly Elements

- All clickable elements: min 44x44px
- Sufficient spacing between interactive elements
- No hover-only interactions (add touch alternatives)

### 6. Verify Viewport Meta Tag

Ensure `index.html` has:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 7. Test Checklist

After fixes, mentally verify these scenarios work:
- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1440px)
- [ ] Ultrawide (1920px+)

Report all responsive issues found and fixes applied.
