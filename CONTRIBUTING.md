# Contributing to OIW Social Card Generator

Thank you for your interest in contributing to the Oslo Innovation Week Social Card Generator! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check the issue tracker as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible.

**How Do I Submit A Good Bug Report?**

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
* **If the problem is related to performance or memory**, include a performance profile capture.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

**How Do I Submit A Good Enhancement Suggestion?**

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of the application which the suggestion is related to.
* **Explain why this enhancement would be useful** to most users.
* **List some other applications where this enhancement exists.**
* **Specify which version of the application you're using.**

### Pull Requests

The process described here has several goals:

- Maintain the project's quality
- Fix problems that are important to users
- Enable a sustainable system for the project's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in the template
2. Follow the styleguides
3. After you submit your pull request, verify that all status checks are passing

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies
    * 👕 `:shirt:` when removing linter warnings

### JavaScript/TypeScript Styleguide

All JavaScript/TypeScript code is linted with ESLint and formatted with Prettier.

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Inline `export`s with expressions whenever possible
  ```ts
  // Use this:
  export const MyComponent = () => {}

  // Instead of:
  const MyComponent = () => {}
  export { MyComponent }
  ```
* Place imports in the following order:
  * Built-in Node modules (such as `path`)
  * External modules (such as `react`, `next`)
  * Internal modules (using relative paths)
* Place class properties in the following order:
  * Class methods and properties (methods starting with `static`)
  * Instance methods and properties
* Use arrow functions over anonymous function expressions
* Use destructuring where appropriate
  ```ts
  // Use this:
  const { name, title } = user;

  // Instead of:
  const name = user.name;
  const title = user.title;
  ```

### CSS/Tailwind Styleguide

* Use Tailwind CSS utility classes whenever possible
* Group related classes together
* Follow the order: layout, typography, visual, interactive
  ```jsx
  // Example order:
  <div className="flex flex-col p-4 text-lg font-bold text-gray-800 bg-white rounded-lg shadow-md hover:bg-gray-50">
  ```
* Use custom CSS sparingly and only when Tailwind doesn't provide the needed functionality

### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown) for documentation.
* Reference methods and classes in markdown with the custom `{}` notation:
    * Reference classes with `{ClassName}`
    * Reference instance methods with `{ClassName.methodName}`
    * Reference class methods with `{ClassName.methodName}`

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `documentation` - Issues or PRs related to documentation
* `enhancement` - Issues that are feature requests or PRs that implement new features
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `performance` - Related to performance issues
* `refactor` - Code refactoring
* `testing` - Related to testing

## Development Process

### Setting Up Development Environment

Please refer to the [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for detailed instructions on setting up your development environment.

### Branching Strategy

We follow a simplified Git Flow branching strategy:

- `main`: Production-ready code
- `dev`: Development branch where features are integrated
- Feature branches: Created from `dev` for new features or bug fixes

### Code Review Process

All submissions, including submissions by project members, require review. We use GitHub pull requests for this purpose. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information on using pull requests.

## Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute. 