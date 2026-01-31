# Resume Builder 2.0

A modern, feature-rich resume builder that generates professional resumes in multiple formats with GitHub integration, automatic saving, and advanced markdown features. Built with React and Vite.

## 🚀 Features

### Core Functionality
- **Live Preview**: See your resume in real-time as you edit
- **5 Professional Templates**:
  - 📄 MIT / Jake's Resume - Clean, ATS-friendly single-column
  - 📝 Stanford / Deedy - Modern two-column with sidebar
  - 🎓 Oxford / Harvard Classic - Traditional academic style
  - ✨ Creative Professional - Bold, vibrant design for creatives
  - 🌿 Minimalist Modern - Clean, elegant minimalist design
- **Multiple Export Formats**: 
  - 📄 PDF (Client-side generation with consistent 6pt line spacing)
  - 📋 DOCX (Word document)
  - 📝 Markdown (with GitHub stats and badges)
  - 📋 LaTeX (Academic/Professional format)
  - 💾 JSON (Data portability)
- **Dynamic Sections**: Add/remove experience and education entries on the fly
- **Auto-Save**: Automatic localStorage persistence (no data loss!)
- **Smooth Animations**: Beautiful transitions and hover effects
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern Dark Theme Homepage**: Sleek, modern interface for template selection

### Advanced Features
- **GitHub Integration**: 
  - Display GitHub profile statistics
  - Show contribution graphs and streaks
  - Top languages chart
  - Automatic badge generation
- **Skill Badges**: Auto-generated technology badges using shields.io
- **Social Media Links**: LinkedIn, GitHub, Portfolio with branded badges
- **Professional Formatting**: Enhanced markdown with emojis and sections
- **Data Management**:
  - Auto-save every second
  - Load sample data
  - Clear all data
  - Import/Export via JSON

## 🛠️ Technologies

- React 18
- Vite 4
- Tailwind CSS
- Lucide React Icons
- jsPDF (PDF generation)
- docx (DOCX generation)
- GitHub Pages

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Live Demo

Visit the live application at: [https://rahimkhan0011.github.io/resumebuilder/](https://rahimkhan0011.github.io/resumebuilder/)

## 📁 Project Structure

```
resumebuilder/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── components/
│   │   ├── InputGroup.jsx      # Reusable input component
│   │   ├── SectionHeader.jsx   # Section header with add button
│   │   ├── ExperienceCard.jsx  # Experience entry card
│   │   ├── EducationCard.jsx   # Education entry card
│   │   ├── LanguageCard.jsx    # Language entry card
│   │   ├── ResumePreview.jsx   # Live resume preview
│   │   └── CodeView.jsx        # Code viewer with copy button
│   ├── pages/
│   │   ├── HomePage.jsx        # Template selection page
│   │   ├── MITPage.jsx         # MIT template editor
│   │   ├── StanfordPage.jsx    # Stanford template editor
│   │   ├── OxfordPage.jsx      # Oxford template editor
│   │   ├── CreativePage.jsx    # Creative template editor
│   │   ├── MinimalistPage.jsx  # Minimalist template editor
│   │   └── index.js            # Page exports
│   ├── templates/
│   │   ├── MITTemplate.jsx     # MIT resume template
│   │   ├── StanfordTemplate.jsx # Stanford resume template
│   │   ├── OxfordTemplate.jsx  # Oxford resume template
│   │   ├── CreativeTemplate.jsx # Creative resume template
│   │   ├── MinimalistTemplate.jsx # Minimalist resume template
│   │   └── index.js            # Template exports
│   ├── utils/
│   │   ├── generators.js       # Markdown, LaTeX, JSON generators
│   │   ├── constants.js        # Shared constants and styles
│   │   ├── storage.js          # LocalStorage utilities
│   │   └── pdfGenerator.js     # PDF & DOCX export functionality
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── public/
│   └── resumes/                # Resume storage documentation
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Project dependencies
```

## 🎨 Available Templates

### 1. MIT / Jake's Resume
- Clean, single-column layout
- ATS-optimized for tech jobs
- Times New Roman font
- Perfect for engineering and software roles

### 2. Stanford / Deedy
- Modern two-column design
- Colored sidebar for skills and contact
- Helvetica font for a clean look
- Great for showcasing skills prominently

### 3. Oxford / Harvard Classic
- Traditional academic style
- Formal layout with left border accents
- Times New Roman font
- Ideal for academic and research positions

### 4. Creative Professional
- Bold, vibrant gradient header
- Timeline-style experience section
- Skill badges with colored backgrounds
- Perfect for designers and marketers

### 5. Minimalist Modern
- Clean, centered layout
- Subtle styling with light separators
- Focus on content over decoration
- Elegant and professional

## 📝 Usage Guide

### Basic Workflow
1. Select a template from the homepage
2. Fill in your personal information
3. Add experience and education entries
4. List your skills (comma-separated)
5. Add GitHub username for stats integration
6. Preview your resume in real-time
7. Export in your preferred format

### Export Options
- **Export PDF**: Download as professional PDF document
- **Export DOCX**: Download as Word document
- **Export MD**: Download markdown with GitHub stats
- **Export LaTeX**: Download LaTeX source for academic use
- **Export JSON**: Download data for backup/portability

### Data Management
- **Load Sample**: Load example data to see features
- **Clear All**: Remove all data (with confirmation)
- **Auto-Save**: Data saves automatically as you type

## 🚀 Deployment

### GitHub Pages Setup
1. Merge changes to main branch
2. Enable GitHub Pages in Settings:
   - Go to: **Settings** → **Pages**
   - Source: Select **GitHub Actions**
3. Automatic deployment will trigger on every push

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👤 Author

Built with ❤️ by Rahim Khan

## 📊 Version History

### v2.1.0 (Latest)
- ✨ Added 2 new templates (Creative & Minimalist)
- 🎨 Modernized homepage with dark theme
- 📄 Fixed PDF line spacing (consistent 6pt spacing)
- 🗑️ Removed "Free • No Sign-up Required" from header
- 🗑️ Removed "Why Use Our Resume Builder?" section
- 📝 Updated README documentation

### v2.0.0
- ✨ PDF export functionality
- 💾 LocalStorage auto-save
- 📊 GitHub stats integration
- 🎨 Advanced markdown with badges
- 📦 JSON export support
- 🔧 Enhanced UI with action buttons
- 🚀 Fixed GitHub Actions deployment

### v1.0.0
- Basic resume builder
- Markdown and LaTeX export
- Dynamic sections
- Smooth animations
