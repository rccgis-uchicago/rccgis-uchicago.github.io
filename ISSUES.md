# Common Issues and Solutions

This document outlines common issues encountered during development and deployment of the RCC GIS website, along with their solutions.

## Table of Contents
1. [Deployment Issues](#deployment-issues)
   - [404 Errors on Cloudron](#404-errors-on-cloudron)
   - [Broken Links](#broken-links)
2. [Development Issues](#development-issues)
   - [Local Development Server Not Starting](#local-development-server-not-starting)
   - [Environment Variables Not Loading](#environment-variables-not-loading)
3. [Build Issues](#build-issues)
   - [Build Failures](#build-failures)
   - [Asset Loading Issues](#asset-loading-issues)

## Deployment Issues

### 404 Errors on Cloudron

**Symptoms**:
- Pages return 404 errors when accessed directly
- Navigation works but direct URLs don't

**Solution**:
1. Ensure the deployment script is using the correct format:
   ```bash
   NODE_ENV=production \
   CLOUDRON_DEPLOY=true \
   SITE_URL="https://your-domain.org" \
   BASE_PATH="/" \
   PUBLIC_BASE="/" \
   npm run build
   ```
2. Verify that the `deploy-cloudron.sh` script is creating the correct directory structure
3. Check that Cloudron is configured to serve `index.html` for directory requests

### Broken Links

**Symptoms**:
- Links work in development but break in production
- Browser console shows 404 errors for assets

**Solution**:
1. Ensure all internal links use trailing slashes (e.g., `/resources/` instead of `/resources`)
2. Verify the `base` and `site` configurations in `astro.config.mjs`
3. Check that the deployment script is setting the correct `SITE_URL` and `BASE_PATH`

## Development Issues

### Local Development Server Not Starting

**Symptoms**:
- `npm run dev` fails to start
- Port already in use errors

**Solution**:
1. Check for processes using the default port (4321):
   ```bash
   lsof -i :4321
   ```
2. Kill the process or change the port in `astro.config.mjs`:
   ```javascript
   server: {
     host: true,
     port: 4322  // Change this to an available port
   }
   ```
3. Update the `dev` script in `package.json` if needed

### Environment Variables Not Loading

**Symptoms**:
- Environment variables are undefined
- Build fails with missing variables

**Solution**:
1. Create a `.env` file in the project root:
   ```
   SURFER_SERVER=your-cloudron-server
   SURFER_TOKEN=your-surfer-token
   ```
2. Ensure `.env` is in your `.gitignore`
3. Restart the development server after making changes

## Build Issues

### Build Failures

**Symptoms**:
- `npm run build` fails
- TypeScript or dependency errors

**Solution**:
1. Clean the project:
   ```bash
   rm -rf node_modules/
   rm -rf dist/
   npm cache clean --force
   npm install
   ```
2. Check for TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```
3. Update dependencies if needed:
   ```bash
   npm update
   ```

### Asset Loading Issues

**Symptoms**:
- Missing images or styles
- Console shows 404 errors for assets

**Solution**:
1. Verify asset paths in your components
2. Ensure assets are in the `public` directory
3. Check the `vite` configuration in `astro.config.mjs`
4. Clear browser cache or test in incognito mode

## Common Fixes

### For Cloudron Deployments

1. **Force Clean Deploy**:
   ```bash
   rm -rf dist/
   ./deploy-cloudron.sh
   ```

2. **Check Cloudron Logs**:
   - Log in to your Cloudron dashboard
   - Navigate to the app's logs
   - Look for any deployment or runtime errors

### For Local Development

1. **Clear Cache**:
   ```bash
   rm -rf node_modules/.vite/
   ```

2. **Update Dependencies**:
   ```bash
   npm outdated
   npm update
   ```

## Getting Help

If you encounter issues not covered here:
1. Check the [Astro documentation](https://docs.astro.build/)
2. Search the [GitHub issues](https://github.com/withastro/astro/issues)
3. Open a new issue with details about your problem

## Known Issues

- Cloudron deployments may require manual cache clearing after updates
- Some browser extensions may interfere with local development
- Large file uploads may require Cloudron configuration adjustments
