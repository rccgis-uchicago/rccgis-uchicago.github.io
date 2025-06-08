# RCC GIS CMS – Issues & Changes Log

This document tracks major issues, changes, and workflow decisions for the RCC GIS CMS project. Use this as a handoff or summary for future work or new chat sessions.

---

## Recent Issues & Fixes

### 2025-06-05
- **CI/CD Artifact Name Mismatch:**
  - Problem: Cloudron deploy job could not find the build artifact (`pages-artifact`) because the upload step used a different name (`github-pages`).
  - Solution: Standardized artifact name to `github-pages` for both upload and download steps.
- **Cloudron Token Error:**
  - Problem: Cloudron Surfer deploy step failed due to missing `SURFER_API_TOKEN` secret.
  - Solution: Needs secret added in GitHub repo settings (`SURFER_API_TOKEN`).
- **Astro Content Collection Schema Error:**
  - Problem: Placeholder for workshops was missing required frontmatter fields (`date`, `duration`, `level`).
  - Solution: Added compliant placeholder with all required fields and valid enum values.
- **Runtime Error – Tool Icon:**
  - Problem: Astro build/runtime error due to reference to non-existent `Tool` icon in `lucide-astro`.
  - Solution: Replaced all references to `Tool` with `Code` icon in resources pages.

### 2024-06-04
- **About Us Page Temporarily Removed:**
  - Decision: The About Us page was removed to focus on higher-priority content. To be re-added with updated info in the future.

---

## Ongoing/Outstanding Issues
- **NPM Deprecation Warnings:** Several indirect dependencies (`har-validator`, `uuid@3.4.0`, `request`) are deprecated. No immediate action required, but consider updating dependencies.
- **SURFER_API_TOKEN Secret:** Cloudron deployment will fail until this secret is added in GitHub repository settings.
- **Security Vulnerabilities:** GitHub Dependabot reports critical/high vulnerabilities. Audit and address as needed.

---

## Workflow Decisions
- Use Husky pre-push hook to enforce local build before push.
- Use default artifact name (`github-pages`) for both GitHub Pages and Cloudron deployments.
- Keep placeholder content in content collections to suppress Astro warnings.
- Direct commits to `master` branch as per user preference.

---

## To-Do / Next Steps
- Add/update About Us page with new team info.
- Address npm and security warnings as time permits.
- Add Cloudron Surfer API token as a GitHub secret.
- Continue updating navigation and content as needed.

---

*Last updated: 2025-06-05*
