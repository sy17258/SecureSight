# Contributing to SecureSight

Thank you for your interest in contributing to SecureSight! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/SecureSight.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Code Standards

### TypeScript
- Use TypeScript for all new code
- Add proper type annotations
- Follow existing code style

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Add proper prop types

### Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design

### Git Commit Messages
Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

Example: `feat: add incident filtering by camera`

## Pull Request Process

1. **Before submitting:**
   - Run `npm run lint` to check code style
   - Run `npm run build` to ensure it builds successfully
   - Test your changes thoroughly

2. **PR Description:**
   - Clearly describe what your changes do
   - Include screenshots for UI changes
   - Reference any related issues

3. **Review Process:**
   - PRs require at least one review
   - Address feedback promptly
   - Keep PRs focused and atomic

## Testing

- Add tests for new features
- Ensure existing tests pass
- Test edge cases and error conditions

## Docker Testing

Test your changes with Docker:
```bash
npm run docker:build
npm run docker:up
```

## Documentation

- Update README.md if needed
- Add JSDoc comments for functions
- Update API documentation

## Questions?

Feel free to open an issue for:
- Questions about the codebase
- Feature discussions
- Technical help

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a positive community

Thank you for contributing! 🎉
