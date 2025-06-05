# RCC-GIS Website Project Guide

## Project Overview
- **Framework**: Astro.js v4
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **Base Path**: `/site` (production), `/` (development)

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/          # Route components
├── content/        # Content collections (if using)
├── styles/         # Global styles
└── utils/          # Utility functions
```

### Code Style
- Use TypeScript for type safety
- Follow Astro's component syntax
- Use Tailwind utility classes for styling
- Keep components small and focused

### Common Tasks

#### Adding a New Page
1. Create a new `.astro` or `.mdx` file in `src/pages/`
2. Use the appropriate layout
3. Add to navigation in `src/config/navigation.ts`

#### Adding a New Component
1. Create a new `.astro` file in `src/components/`
2. Export any necessary props in the frontmatter
3. Import and use in your pages

### Deployment
1. The site is configured to deploy to GitHub Pages at `https://rccgis-uchicago.github.io`
2. Pushes to `main` or `master` branch trigger deployment
3. The site is built with `npm run build`
4. The built files are deployed to GitHub Pages
5. No base path is needed as we're using the root domain

## Troubleshooting

### Links Not Working
- Check if the page exists in `src/pages/`
- Verify the path in `navigation.ts`
- Ensure base path is correctly set in `astro.config.mjs`

### Styling Issues
- Check Tailwind classes
- Verify responsive breakpoints
- Check for CSS conflicts

## Best Practices
1. Keep components small and focused
2. Use TypeScript for better developer experience
3. Document complex logic
4. Write meaningful commit messages
5. Test in both development and production environments
