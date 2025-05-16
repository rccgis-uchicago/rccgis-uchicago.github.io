import {defineConfig} from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "src/content/images",
      publicFolder: ""
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        label: 'Projects',
        name: 'projects',
        path: 'src/pages/projects',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            required: true,
          },
          {
            type: 'string',
            label: 'Description',
            name: 'description',
          },
          {
            type: 'image',
            label: 'Featured Image',
            name: 'image',
          },
          {
            type: 'string',
            label: 'Layout',
            name: 'layout',
            ui: {
              component: 'hidden',
            }
          },
          {
            type: 'rich-text',
            label: 'Body',
            name: 'body',
            isBody: true,
            templates: [
              {
                name: 'CodeBlock',
                label: 'Code Block',
                fields: [
                  {
                    name: 'language',
                    label: 'Language',
                    type: 'string',
                    options: ['jsx', 'python', 'bash', 'javascript', 'typescript', 'json'],
                  },
                  {
                    name: 'code',
                    label: 'Code',
                    type: 'string',
                    ui: {
                      component: 'textarea',
                    }
                  }
                ]
              },
              {
                name: 'Callout',
                label: 'Callout',
                fields: [
                  {
                    name: 'text',
                    label: 'Text',
                    type: 'string',
                  },
                  {
                    name: 'type',
                    label: 'Type',
                    type: 'string',
                    options: ['info', 'warning', 'error'],
                  }
                ]
              }
            ]
          }
        ],
      },
      {
        label: 'Resources',
        name: 'resources',
        path: 'src/pages/resources',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            required: true,
          },
          {
            type: 'string',
            label: 'Description',
            name: 'description',
          },
          {
            type: 'image',
            label: 'Featured Image',
            name: 'image',
          },
          {
            type: 'string',
            label: 'Layout',
            name: 'layout',
            ui: {
              component: 'hidden',
            }
          },
          {
            type: 'rich-text',
            label: 'Body',
            name: 'body',
            isBody: true,
            templates: [
              {
                name: 'CodeBlock',
                label: 'Code Block',
                fields: [
                  {
                    name: 'language',
                    label: 'Language',
                    type: 'string',
                    options: ['jsx', 'python', 'bash', 'javascript', 'typescript', 'json'],
                  },
                  {
                    name: 'code',
                    label: 'Code',
                    type: 'string',
                    ui: {
                      component: 'textarea',
                    }
                  }
                ]
              }
            ]
          }
        ],
      },
      {
        label: 'Services',
        name: 'services',
        path: 'src/pages/services',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            required: true,
          },
          {
            type: 'string',
            label: 'Description',
            name: 'description',
          },
          {
            type: 'image',
            label: 'Featured Image',
            name: 'image',
          },
          {
            type: 'string',
            label: 'Layout',
            name: 'layout',
            ui: {
              component: 'hidden',
            }
          },
          {
            type: 'rich-text',
            label: 'Body',
            name: 'body',
            isBody: true,
            templates: [
              {
                name: 'CodeBlock',
                label: 'Code Block',
                fields: [
                  {
                    name: 'language',
                    label: 'Language',
                    type: 'string',
                    options: ['jsx', 'python', 'bash', 'javascript', 'typescript', 'json'],
                  },
                  {
                    name: 'code',
                    label: 'Code',
                    type: 'string',
                    ui: {
                      component: 'textarea',
                    }
                  }
                ]
              }
            ]
          }
        ],
      },
      {
        label: 'Training',
        name: 'training',
        path: 'src/pages/training',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            required: true,
          },
          {
            type: 'string',
            label: 'Description',
            name: 'description',
          },
          {
            type: 'image',
            label: 'Featured Image',
            name: 'image',
          },
          {
            type: 'datetime',
            label: 'Workshop Date',
            name: 'date',
          },
          {
            type: 'string',
            label: 'Layout',
            name: 'layout',
            ui: {
              component: 'hidden',
            }
          },
          {
            type: 'rich-text',
            label: 'Body',
            name: 'body',
            isBody: true,
            templates: [
              {
                name: 'CodeBlock',
                label: 'Code Block',
                fields: [
                  {
                    name: 'language',
                    label: 'Language',
                    type: 'string',
                    options: ['jsx', 'python', 'bash', 'javascript', 'typescript', 'json'],
                  },
                  {
                    name: 'code',
                    label: 'Code',
                    type: 'string',
                    ui: {
                      component: 'textarea',
                    }
                  }
                ]
              }
            ]
          }
        ],
      },
    ]
  }
});