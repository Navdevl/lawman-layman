# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based blog called "Lawman vs Layman" that presents content from dual perspectives - a technical/legal perspective (lawman) and a simplified/general audience perspective (layman). The site uses a custom theme called "dual-perspective" with JavaScript-powered perspective switching.

## Development Commands

### Hugo Commands
- `hugo server -D` - Start development server with draft content
- `hugo server` - Start development server (published content only)
- `hugo build` - Build static site for production
- `hugo new lawman/[post-name].md` - Create new lawman perspective post
- `hugo new layman/[post-name].md` - Create new layman perspective post

### Content Management
- Use the same slug for both perspectives of the same topic
- Lawman content: `/content/lawman/[slug].md`
- Layman content: `/content/layman/[slug].md`
- URL structure: `/lawman/[slug]/` and `/layman/[slug]/`

## Site Architecture

### Dual-Perspective System
The site uses a perspective-based content model where every topic has two versions:
- **Lawman perspective**: Technical, detailed, legal/regulatory focus
- **Layman perspective**: Simplified, accessible, general audience

### Key Components

#### Configuration (hugo.toml)
- Dual perspective parameters in `[params.lawman]` and `[params.layman]`
- Permalink configuration for `/lawman/` and `/layman/` sections
- Theme set to "dual-perspective"

#### Theme Structure (`themes/dual-perspective/`)
- **Templates**: `layouts/_default/` contains base templates
- **Partials**: `layouts/partials/` for header, footer components
- **Static Assets**: `static/css/style.css` and `static/js/perspective-toggle.js`
- **Archetypes**: Pre-configured content templates for each perspective

#### Content Organization
- `content/lawman/` - Technical perspective posts
- `content/layman/` - Simplified perspective posts
- Each section has `_index.md` for section homepage
- Root `_index.md` for main homepage

### Perspective Toggle System
JavaScript-powered perspective switching with:
- Browser storage persistence (localStorage)
- Automatic URL routing between perspectives
- Visual toggle button in header
- Seamless user experience without page reloads

## Content Creation Workflow

### Creating Dual-Perspective Posts
1. **Choose Topic and Slug**: Select a consistent slug for both perspectives
2. **Create Lawman Version**: 
   ```bash
   hugo new lawman/[slug].md
   ```
   - Use technical language, detailed analysis
   - Include regulatory/legal context
   - Target audience: experts, professionals

3. **Create Layman Version**:
   ```bash
   hugo new layman/[slug].md
   ```
   - Use simple, accessible language
   - Focus on practical understanding
   - Target audience: general public

4. **Content Requirements**:
   - Same `slug` field in both files
   - Appropriate `perspective` field ("lawman" or "layman")
   - Consistent `date` between versions
   - Descriptive `title` and `description`

### Content Front Matter
```yaml
---
title: "Post Title"
date: 2024-01-15
draft: false
perspective: "lawman" # or "layman"
slug: "consistent-slug-name"
description: "Post description"
tags: ["tag1", "tag2"]
categories: ["category1"]
---
```

## Design Philosophy

### CSS Architecture
- CSS custom properties for consistent theming
- Responsive design with mobile-first approach
- Perspective-specific styling using `data-perspective` attribute
- Clean, minimal aesthetic prioritizing readability

### JavaScript Functionality
- `PerspectiveToggle` class manages state and UI
- LocalStorage for preference persistence
- Automatic URL routing between perspectives
- Error handling for missing perspective versions

## Technical Standards

### Code Quality
- Use semantic HTML5 elements
- Follow Hugo best practices for templates
- Maintain consistent naming conventions
- Configure settings through Hugo's parameter system

### Content Standards
- No hardcoded values in templates
- Use Hugo's built-in functions for URLs and dates
- Implement proper SEO meta tags
- Ensure accessibility compliance

## Deployment Considerations

### Build Process
- Hugo generates static files to `public/` directory
- CSS and JavaScript are served from theme's static directory
- No build tools required beyond Hugo
- Compatible with any static hosting service

### Performance
- Minimal JavaScript footprint
- Optimized CSS with efficient selectors
- Hugo's built-in asset optimization
- Fast perspective switching without page reloads

## Troubleshooting

### Common Issues
- **Perspective toggle not working**: Check JavaScript console, ensure localStorage is enabled
- **Missing perspective link**: Verify both perspectives exist with matching slugs
- **Styling issues**: Check CSS custom properties and data-perspective attributes
- **Content not appearing**: Verify front matter format and draft status