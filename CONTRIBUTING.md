# Contributing to RCCG IS CMS

Thank you for your interest in contributing to RCCG IS CMS! We welcome all contributions, whether they're bug reports, feature requests, documentation improvements, or code contributions.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
  - [Creating a Branch](#creating-a-branch)
  - [Making Changes](#making-changes)
  - [Testing](#testing)
  - [Committing Changes](#committing-changes)
  - [Pushing Changes](#pushing-changes)
  - [Creating a Pull Request](#creating-a-pull-request)
- [Code Style](#code-style)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [License](#license)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 8.0.0 or later
- Git

### Installation

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/rccgis-cms.git
   cd rccgis-cms
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Creating a Branch

1. Make sure your fork is up to date:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-number-short-description
   ```

### Making Changes

1. Make your changes following the code style guidelines
2. Add tests if applicable
3. Run the test suite to ensure everything passes

### Testing

Run the test suite:

```bash
npm test
```

### Committing Changes

Commit your changes with a descriptive message:

```bash
git add .
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve issue with login"
```

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Pushing Changes

Push your changes to your fork:

```bash
git push origin your-branch-name
```

### Creating a Pull Request

1. Go to the [repository](https://github.com/your-username/rccgis-cms)
2. Click on "Compare & pull request"
3. Fill in the PR template
4. Submit the pull request

## Code Style

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use Prettier for code formatting
- Write meaningful commit messages
- Document new code with JSDoc comments

## Reporting Issues

If you find a bug or have a suggestion, please open an issue on GitHub. Include:

- A clear title and description
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots if applicable
- Browser/OS version if relevant

## Feature Requests

We welcome feature requests! Please open an issue and use the "Feature Request" template.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
