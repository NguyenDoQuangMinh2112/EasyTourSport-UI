# EasyTourSport Color Scheme Documentation

## Overview
This document outlines the unified color scheme used throughout the EasyTourSport application to ensure consistency and visual harmony.

## Color Philosophy
The application uses a **modern dark theme** with **blue as the primary brand color**, complemented by purple and pink accents. This creates a professional yet vibrant sports-focused atmosphere.

## Primary Brand Colors

### Main Brand Gradient
- **Primary**: `from-blue-500 via-purple-500 to-pink-500`
- **Text**: `from-blue-400 via-purple-400 to-pink-400`
- **Subtle**: `from-blue-500/10 via-purple-500/10 to-pink-500/10`

### Usage
- Logo backgrounds
- Brand text
- Hero elements
- Important CTAs

## Background System

### Main Layout
- **Background**: `from-slate-900 via-blue-900/50 to-slate-900`
- **Header**: `from-slate-900/95 via-blue-900/50 to-slate-900/95`
- **Footer**: `from-slate-900 via-blue-900/50 to-slate-900`

### Cards & Components
- **Primary Cards**: `from-slate-800/50 to-slate-700/50`
- **Accent Cards**: `from-blue-500/10 via-purple-500/10 to-pink-500/10`

## Action Colors

### Primary Actions
- **Default**: `from-blue-500 to-purple-600`
- **Hover**: `from-blue-600 to-purple-700`

### Secondary Actions
- **Success**: `from-green-500 to-emerald-500`
- **Warning**: `from-yellow-500 to-orange-500`
- **Danger**: `from-red-500 to-pink-500`

## Status Colors

### Difficulty Levels
- **Beginner**: `from-green-500 to-blue-500`
- **Intermediate**: `from-yellow-500 to-orange-500`
- **Advanced**: `from-red-500 to-purple-500`

### Tournament Status
- **Featured**: `from-yellow-500 to-orange-500`
- **Active**: `from-green-500 to-emerald-500`
- **Completed**: `from-slate-500 to-slate-600`

## Text Colors

### Hierarchy
- **Primary**: `text-white`
- **Secondary**: `text-slate-300`
- **Muted**: `text-slate-400`
- **Accent**: `text-blue-400`

## Border Colors

### Standard Borders
- **Primary**: `border-slate-700/50`
- **Accent**: `border-blue-500/20`
- **Muted**: `border-slate-600/30`

## Implementation

### Using the Color System

```tsx
import { gradients, theme } from '../utils/colors'

// Background gradients
<div className={`bg-gradient-to-br ${gradients.background.main}`}>

// Action buttons
<button className={`bg-gradient-to-r ${gradients.action.primary} hover:${gradients.action.primaryHover}`}>

// Status indicators
<span className={`bg-gradient-to-r ${gradients.status.beginner}`}>

// Text colors
<h1 className={theme.text.primary}>
<p className={theme.text.secondary}>
```

### Helper Functions

```tsx
import { getGradient } from '../utils/colors'

// Quick access to common gradients
<div className={getGradient.background()}>
<button className={getGradient.action()}>
<span className={getGradient.status('intermediate')}>
```

## Design Principles

1. **Consistency**: All components use the same color palette
2. **Hierarchy**: Different opacity levels create visual depth
3. **Accessibility**: Sufficient contrast ratios for readability
4. **Branding**: Blue-purple-pink gradient maintains brand identity
5. **Modularity**: Colors are defined once and reused everywhere

## Component-Specific Usage

### Header/Footer
- Background: Consistent with main layout
- Accent borders: Blue-purple gradient lines
- Logo: Brand gradient

### Forms/Modals
- Primary buttons: Brand action gradient
- Secondary buttons: Neutral slate colors
- Form fields: Subtle slate backgrounds

### Cards/Lists
- Tournament cards: Slate base with accent borders
- Featured items: Subtle brand gradient backgrounds
- Status badges: Contextual status gradients

## Maintenance

When adding new components:
1. Import colors from `utils/colors`
2. Use predefined gradients instead of custom colors
3. Follow the established color hierarchy
4. Test contrast ratios for accessibility

This unified approach ensures visual consistency and makes maintenance easier while providing a professional, modern appearance throughout the application.
