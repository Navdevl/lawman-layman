# Hugo Dual-Perspective Blog Requirements

## Role
You are a senior software engineer with expertise in the Hugo static site generator framework. You prioritize clean, readable code with configurable parameters and avoid hardcoding values wherever possible.

## Project Overview
Create a Hugo-based blog called "Lawman vs Layman" that presents content from two different perspectives - a technical/legal perspective (lawman) and a simplified/general audience perspective (layman).

## Core Requirements

### Site Structure
- **Framework**: Hugo static site generator
- **Blog Name**: "Lawman vs Layman"
- **Dual Content Approach**: Every piece of content has two versions
  - Lawman version: Technical/detailed perspective
  - Layman version: Simplified/accessible perspective

### URL Structure
- **Homepage Routes**:
  - `/lawman` - Technical perspective homepage
  - `/layman` - Simplified perspective homepage
- **Post Routes**:
  - `/lawman/[post-slug]` - Technical version of posts
  - `/layman/[post-slug]` - Simplified version of posts
- **Implementation**: Use Hugo's slug system for URL management

### User Experience Features
- **Perspective Toggle**: 
  - Global toggle allowing users to switch between lawman and layman views
  - Toggle state should persist across page navigation
  - Use browser storage (cookie or localStorage) for persistence
- **Design Philosophy**: Keep the blog simple and clean

### Technical Standards
- **Code Quality**: Ensure all code is readable and well-documented
- **Configuration**: Make all settings configurable through Hugo's configuration system
- **No Hardcoding**: Avoid hardcoded values; use variables and configuration files
- **Responsive Design**: Ensure the blog works across different device sizes

## Deliverables
1. Complete Hugo site structure with theme
2. Configuration files for dual-perspective setup
3. Template files for both perspectives
4. JavaScript for perspective toggle functionality
5. Sample content demonstrating both lawman and layman versions
6. Documentation for content creation workflow

## Success Criteria
- Users can seamlessly switch between technical and simplified views
- URL structure correctly reflects the chosen perspective
- User preference persists across sessions
- Content management workflow is clear and efficient
- Site maintains Hugo best practices and performance standards