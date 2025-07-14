# Suman Raj Sharma - Portfolio

A modern, minimalist portfolio website built with Next.js 14, featuring a monochrome design aesthetic and an interactive developer terminal.

## ✨ Features

### 🎨 Design
- **Monochrome Theme**: Clean black/white/gray color scheme inspired by modern developer tools
- **Single-Page Layout**: Smooth scrolling navigation with parallax effects
- **Responsive Design**: Mobile-first approach with optimal viewing on all devices
- **Modern Typography**: Inter and Crimson Pro fonts for professional presentation

### 🖥️ Interactive Terminal
- **Developer Experience**: Command-line interface for portfolio navigation
- **15+ Commands**: whoami, skills, projects, contact, easter-egg, and more
- **CMS Integration**: Terminal commands dynamically fetch data from Sanity CMS
- **Creative Touch**: Unique way to showcase technical skills and personality

### 🚀 Technical Stack
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: Material-UI (MUI) with custom monochrome theme
- **CMS**: Sanity.io for content management
- **Animations**: Framer Motion for smooth scroll-triggered effects
- **Terminal**: Custom implementation with fallback to xterm.js
- **Deployment**: Optimized for Vercel deployment

## 🏗️ Architecture

### Core Sections
- **Hero**: Large typography with gradient backgrounds and call-to-action
- **Terminal**: Interactive command-line experience (placed after hero)
- **About**: Personal information and background
- **Skills**: Technical expertise organized by categories
- **Projects**: Showcase of development work with live demos
- **Contact**: Professional contact form and social links

### Key Components
```
src/
├── components/
│   ├── layout/
│   │   └── SmoothScrollNavigation.tsx    # Fixed nav with active section detection
│   ├── sections/
│   │   ├── HeroSection.tsx               # Landing section with large typography
│   │   ├── AboutSection.tsx              # Personal information
│   │   ├── SkillsSection.tsx             # Technical skills display
│   │   ├── ProjectsSection.tsx           # Project showcase
│   │   └── ContactSection.tsx            # Contact form and social links
│   └── terminal/
│       ├── ClientTerminal.tsx            # SSR-compatible terminal
│       └── PortfolioTerminal.tsx         # xterm.js implementation
├── lib/
│   ├── theme.ts                          # MUI monochrome theme configuration
│   ├── sanity.client.ts                  # Sanity CMS client setup
│   └── sanity.queries.ts                 # GraphQL queries for content
└── app/
    ├── page.tsx                          # Main single-page portfolio
    ├── globals.css                       # Global styles and terminal CSS
    └── layout.tsx                        # Root layout with theme provider
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity account (for CMS)

### Installation
```bash
# Clone the repository
git clone https://github.com/sumanxcodes/sumanrajsharma_portfolio.git
cd sumanrajsharma_portfolio

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Add your Sanity project details to .env.local

# Start development server
npm run dev
```

### Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎮 Terminal Commands

The interactive terminal supports these commands:

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `whoami` | Display user information |
| `skills [category]` | Show technical skills by category |
| `projects` | List all projects with links |
| `contact` | Display contact information |
| `about` | Show personal information |
| `ls` | List portfolio sections |
| `pwd` | Show current directory |
| `git log` | Show project timeline |
| `easter-egg` | Find the hidden surprise |
| `theme` | Display color scheme |
| `clear` | Clear terminal output |

## 📱 Responsive Design

- **Mobile**: Optimized touch interface with hamburger navigation
- **Tablet**: Adapted layouts with proper spacing
- **Desktop**: Full feature set with hover effects and animations
- **Terminal**: Responsive terminal that works on all screen sizes

## 🎯 SEO & Performance

- **Metadata**: Comprehensive Open Graph and Twitter Card support
- **Performance**: Optimized images and lazy loading
- **Accessibility**: ARIA labels and semantic HTML
- **Core Web Vitals**: Optimized for Google's performance metrics

## 🔄 Content Management

Content is managed through Sanity Studio with these schemas:
- **Profile**: Personal information and bio
- **Projects**: Portfolio projects with images, descriptions, and links
- **Skills**: Technical skills organized by categories
- **Blog Posts**: Optional blog functionality (schema ready)

Access Sanity Studio at `/studio` when running locally.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod

# Or connect your GitHub repository to Vercel for automatic deployments
```

### Environment Variables for Production
Ensure these are set in your deployment platform:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN`

## 🎨 Design Philosophy

The portfolio follows a minimalist monochrome design philosophy:

- **Color Palette**: Pure white backgrounds, black text, strategic gray accents
- **Typography**: Clean, readable fonts with strong hierarchy
- **Spacing**: Generous whitespace for clarity and focus
- **Interactions**: Subtle animations that enhance rather than distract
- **Developer Focus**: Terminal interface showcases technical personality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📧 Contact

**Suman Raj Sharma**
- Portfolio: [https://sumanrajsharma.dev](https://sumanrajsharma.dev)
- GitHub: [@sumanxcodes](https://github.com/sumanxcodes)
- LinkedIn: [Suman Raj Sharma](https://linkedin.com/in/sumanrajsharma)
- Email: contact@sumanrajsharma.dev

---

Built with ❤️ using Next.js, TypeScript, and creativity. Try the terminal - type `easter-egg` for a surprise! 🎮