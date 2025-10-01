# Contributing to The Diary 🤝

Thank you for your interest in contributing to **The Diary**! We're excited to have you join our mission of helping busy professionals stay connected with their loved ones.

## 🌟 How to Contribute

There are many ways to contribute to The Diary:

- 🐛 **Report bugs** or suggest features
- 📝 **Improve documentation** 
- 💻 **Write code** for new features or bug fixes
- 🎨 **Design improvements** for better user experience
- 🧪 **Write tests** to improve code quality
- 🌍 **Translate** the app to other languages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm (recommended) or npm
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/The-Diary.git
   cd The-Diary
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

4. **Set up the database**
   ```bash
   pnpm db:migrate
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

## 📋 Development Workflow

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/saved-content`)
- `fix/` - Bug fixes (e.g., `fix/authentication-error`)
- `docs/` - Documentation updates (e.g., `docs/api-reference`)
- `refactor/` - Code refactoring (e.g., `refactor/user-profile`)
- `test/` - Adding tests (e.g., `test/diary-creation`)

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow our coding standards (see below)
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   pnpm lint        # Check code quality
   pnpm type-check  # TypeScript type checking
   pnpm test        # Run tests (when available)
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add saved content functionality"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   # Create a Pull Request on GitHub
   ```

## 📝 Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper types for all function parameters and return values
- Use strict mode TypeScript configuration
- Prefer `interface` over `type` for object definitions

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Avoid
type UserProfile = {
  id: any;
  name: any;
  // ...
}
```

### React Guidelines

- Use functional components with hooks
- Follow the Rules of Hooks
- Use proper dependency arrays in useEffect
- Implement proper error boundaries

```typescript
// Good
const DiaryEntry: React.FC<DiaryEntryProps> = ({ diary }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Effect logic here
  }, [diary.id]); // Proper dependencies
  
  return <div>{diary.title}</div>;
};
```

### Database Guidelines

- Use Prisma for all database operations
- Write proper migrations for schema changes
- Use transactions for multi-table operations
- Implement proper error handling

```typescript
// Good
const createDiaryEntry = async (data: CreateDiaryData) => {
  try {
    const diary = await prisma.diary.create({
      data: {
        title: data.title,
        content: data.content,
        userId: data.userId,
      },
    });
    return diary;
  } catch (error) {
    console.error('Failed to create diary entry:', error);
    throw new Error('Could not create diary entry');
  }
};
```

### UI/UX Guidelines

- Follow our design system using Radix UI components
- Ensure accessibility (proper ARIA labels, keyboard navigation)
- Use responsive design principles
- Test with both light and dark themes

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable

### Bug Report Template

```markdown
**Bug Description**
A clear and concise description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment**
- OS: [e.g. Windows 11, macOS 13]
- Browser: [e.g. Chrome 118, Firefox 119]
- Node.js version: [e.g. 18.17.0]
```

## 💡 Feature Requests

We love new ideas! When suggesting features:

- Check if the feature already exists or is planned
- Explain the problem your feature would solve
- Describe your proposed solution
- Consider the impact on busy professionals (our target users)

### Feature Request Template

```markdown
**Feature Description**
A clear and concise description of the feature.

**Problem Statement**
What problem does this feature solve for busy professionals?

**Proposed Solution**
Describe your solution in detail.

**Alternative Solutions**
Any alternative approaches you've considered.

**Additional Context**
Screenshots, mockups, or examples that help explain the feature.
```

## 🧪 Testing Guidelines

- Write unit tests for utility functions
- Write integration tests for API endpoints
- Test user interactions with React Testing Library
- Ensure accessibility with testing tools

```typescript
// Example test
describe('DiaryEntry', () => {
  it('should display diary title and content', () => {
    const mockDiary = {
      id: '1',
      title: 'My Day',
      content: 'Had a great day today!',
    };

    render(<DiaryEntry diary={mockDiary} />);
    
    expect(screen.getByText('My Day')).toBeInTheDocument();
    expect(screen.getByText('Had a great day today!')).toBeInTheDocument();
  });
});
```

## 📚 Documentation Guidelines

- Update documentation for any new features
- Use clear, concise language
- Include code examples when helpful
- Keep README.md up to date

## 🎯 Priority Areas for Contribution

We especially welcome contributions in these areas:

### 🔥 High Priority
- **Saved Content System**: Implement the bookmarking functionality
- **Performance Optimization**: Add caching layer with Redis
- **Search Enhancement**: Implement full-text search
- **Mobile Responsiveness**: Improve mobile user experience

### 🚀 Medium Priority
- **Selective Diary Sharing**: Share specific entries with selected users
- **Real-time Updates**: WebSocket integration for live updates
- **Accessibility Improvements**: WCAG 2.1 compliance
- **Test Coverage**: Increase test coverage to 80%+

### 💡 Low Priority (Great for Beginners)
- **UI Polish**: Small design improvements
- **Documentation**: Improve code comments and guides
- **Error Messages**: Better user-facing error messages
- **Performance Monitoring**: Add analytics and monitoring

## 🏆 Recognition

Contributors will be:
- Added to our contributors list
- Mentioned in release notes for significant contributions
- Invited to our contributor Discord (coming soon)
- Given priority access to beta features

## 📞 Getting Help

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs or request features
- **Email**: [maintainers@thediaryapp.com](mailto:maintainers@thediaryapp.com) for sensitive matters

## 🤝 Code of Conduct

### Our Pledge

We are committed to making participation in The Diary a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Publishing others' private information without permission
- Any conduct that could reasonably be considered inappropriate

### Enforcement

Instances of unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

## 📄 License

By contributing to The Diary, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to The Diary! Together, we're helping busy professionals stay connected with the people who matter most. 💕

*Questions? Don't hesitate to ask in our [GitHub Discussions](https://github.com/Amank-root/The-Diary/discussions)!*