# ScrollFlow.js

![ScrollFlow Showcase](assets/hero-bg.png)

**ScrollFlow.js** is a lightweight, zero-dependency JavaScript library designed to bring modern scroll interactions to your website. Built for performance and aesthetics.

## Features

- **⚡ Zero Dependencies**: Pure ES6+. No jQuery, no heavy frameworks.
- **🎨 Reveal Animations**: Fade, slide, and zoom elements as they enter the viewport.
- **🌌 Parallax Engine**: Smooth parallax scrolling effects with simple data attributes.
- **📏 Progress Indicator**: Automatic reading progress bar at the top of the page.
- **🔽 Smooth Scrolling**: Native-like smooth scrolling for anchor links.

## Installation

Simply include the CSS and JS files in your project:

```html
<link rel="stylesheet" href="css/scrollflow.css">
<script src="src/scrollflow.js"></script>
```

## Usage

### 1. Auto Initialization
Add `data-auto-init` to your script tag to automatically initialize with default settings.

```html
<script src="src/scrollflow.js" data-auto-init></script>
```

### 2. Manual Initialization
Or initialize it manually in your JavaScript for custom options:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    new ScrollFlow({
        revealThreshold: 0.2, // 20% of element visible before revealing
        parallaxSpeed: 0.5,   // Parallax movement speed
        progressBar: true     // Show reading progress bar
    });
});
```

## API & Data Attributes

### Reveal Animations
Add `data-sf-reveal="type"` to any element.

| Animation | Description |
|-----------|-------------|
| `fade-up` | Fades in and moves up |
| `fade-in` | Simple opacity fade |
| `slide-left` | Slides in from the left |
| `slide-right`| Slides in from the right |
| `zoom-in` | Scales up from 95% |

**Optional Delay:**
Add `data-sf-delay="ms"` under the same element.
```html
<div data-sf-reveal="fade-up" data-sf-delay="200">
    I appear 200ms later!
</div>
```

### Parallax
Add `data-sf-parallax="speed"` to any element.
- `0.5`: Moves at half the scroll speed (slower).
- `0.1`: Very subtle movement.

```html
<div class="bg-image" data-sf-parallax="0.3"></div>
```

## License
MIT License. Free to use for personal and commercial projects.
