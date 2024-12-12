# CyberGIS at UChicago Website

This is the website for the University of Chicago's Research Computing Center (RCC) Geographic Information Science (GIS). It provides information about GIS resources, training, and support services.

## 🚀 Project Structure 
```
├── public/
│   └── assets/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── package.json
└── README.md
```


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :----------------------- | :----------------------------------------------- |
| `npm install`            | Installs dependencies                            |
| `npm run dev`            | Starts local dev server at `localhost:4321`      |
| `npm run build`          | Build your production site to `./dist/`          |
| `npm run preview`        | Preview your build locally before deploying      |
| `npm run astro ...`      | Run CLI commands like `astro add`, `astro check` |

## 🧪 Technology

This website is built using [Astro](https://astro.build), a modern static site generator that offers:

- **Performance First**: Astro websites are built to be lightning-fast by default
- **Zero JS, by default**: No JavaScript runtime overhead
- **MDX Support**: Write content using Markdown + JSX
- **Component Islands**: Use React, Vue, or Svelte components where needed
- **Static Site Generation**: Generate fast, secure static pages

## 🛠️ Development

1. Clone the repository:

```bash
git clone https://github.com/rccgis-uchicago/site.git
cd site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Make your changes and test them locally

5. Build for production:
```bash
npm run build
```

## 📝 Content Updates

- **Pages**: Add or edit pages in `src/pages/`
- **Components**: Reusable components are in `src/components/`
- **Styles**: Global styles are in `src/styles/`
- **Assets**: Static assets go in `public/`

## 🔄 Deployment

The site is automatically deployed through GitHub Actions when changes are pushed to the main branch.

## 📫 Contact

For questions or support, please contact the RCC-GIS team at [gis-help@rcc.uchicago.edu]
