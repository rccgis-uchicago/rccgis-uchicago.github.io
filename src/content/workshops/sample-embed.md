---
title: "Sample Workshop with Embedded Notebook"
date: 2024-06-06
description: "A workshop demonstrating how to embed and link Jupyter notebooks and Rmd files."
summary: "Demo of embedding and linking interactive workshop materials."
tags: ["python", "jupyter", "Rmd", "demo"]
duration: "Self-paced"
level: "intermediate"
notebook: "./sample-notebook.ipynb"
rmd: "./sample-report.Rmd"
image: "images/sample-workshop.jpg"
---

# Sample Workshop: Embedding Notebooks and Rmd

## Workshop Overview

This workshop demonstrates how you can present interactive, code-based materials within a workshop page. Below are examples of how to link and embed Jupyter notebooks and R Markdown files.

## Materials

- [Download Jupyter Notebook](./sample-notebook.ipynb)
- [View R Markdown Source](./sample-report.Rmd)
- [Open Notebook in Binder](https://mybinder.org/v2/gh/yourrepo/yourworkshop/HEAD?filepath=sample-notebook.ipynb)

## Embedded Notebook (HTML Preview)

<iframe src="/notebooks/sample-notebook.html" width="100%" height="600" style="border:1px solid #ccc; border-radius:8px; margin-bottom:2rem;"></iframe>

## Embedded R Markdown (HTML Preview)

<iframe src="/notebooks/sample-report.html" width="100%" height="600" style="border:1px solid #ccc; border-radius:8px;"></iframe>

---

## Tutorial Content

You can add step-by-step instructions, code snippets, or summaries here. The embedded iframes above will show rendered HTML versions of your Jupyter notebook and R Markdown report. To generate these HTML files, export your notebook and Rmd to HTML and place them in the `public/notebooks/` directory.

```bash
# Example: Export notebook to HTML
jupyter nbconvert --to html sample-notebook.ipynb --output-dir=public/notebooks

# Example: Render Rmd to HTML
Rscript -e "rmarkdown::render('sample-report.Rmd', output_dir='public/notebooks')"
```

> **Tip:** For true interactivity, link to Binder, Colab, or Shiny as shown above.
