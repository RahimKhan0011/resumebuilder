# Resume Builder 2.0

A modern, feature-rich resume builder that generates professional resumes in multiple formats with GitHub integration, automatic saving, and advanced markdown features. Built with React and Vite.

## 🚀 Features

### Core Functionality
- **Live Preview**: See your resume in real-time as you edit
- **Multiple Export Formats**: 
  - 📄 PDF (Client-side generation)
  - 📝 Markdown (with GitHub stats and badges)
  - 📋 LaTeX (Academic/Professional format)
  - 💾 JSON (Data portability)
- **Dynamic Sections**: Add/remove experience and education entries on the fly
- **Auto-Save**: Automatic localStorage persistence (no data loss!)
- **Smooth Animations**: Beautiful transitions and hover effects
- **Responsive Design**: Works seamlessly on desktop and mobile

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
- Tailwind CSS (CDN)
- Lucide React Icons
- jsPDF (PDF generation)
- html2canvas (Screenshot to PDF)
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
│   │   ├── ResumePreview.jsx   # Live resume preview
│   │   └── CodeView.jsx        # Code viewer with copy button
│   ├── utils/
│   │   ├── generators.js       # Markdown, LaTeX, JSON generators
│   │   ├── constants.js        # Shared constants and styles
│   │   ├── storage.js          # LocalStorage utilities
│   │   └── pdfGenerator.js     # PDF export functionality
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Application entry point
├── public/
│   └── resumes/               # Resume storage documentation
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
└── package.json              # Project dependencies
```

## 🎨 Key Features Explained

### Dynamic Content Management
- Click "Add New" to create new experience or education entries
- Hover over entries to reveal delete button
- Each entry can be edited independently
- Smooth fade-in/fade-out animations
- Unlimited entries supported

### Advanced Markdown Export
Generated markdown includes:
- **GitHub Stats**: Profile statistics, top languages, contribution streaks
- **Skill Badges**: Automatic badge generation for popular technologies
- **Social Links**: Branded badges for LinkedIn, GitHub, Portfolio
- **Professional Formatting**: Emojis, centered headers, sections
- **Responsive Layout**: Looks great on GitHub profiles

Example badges generated:
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

### LocalStorage Auto-Save
- Saves form data automatically every second
- Loads saved data on page refresh
- Status indicator shows "Auto-saved"
- No data loss between sessions
- Clear all data with confirmation

### PDF Export
- High-quality PDF generation
- Uses html2canvas for accurate rendering
- Downloads with formatted filename
- Client-side processing (no server needed)
- A4 format, professional layout

### GitHub Integration
Add your GitHub username to get:
```markdown
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=yourusername&layout=compact&theme=radical)
![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=yourusername&theme=radical)
```

## 🚀 Deployment

### GitHub Pages Setup
1. Merge this PR to main branch
2. Enable GitHub Pages in Settings:
   - Go to: **Settings** → **Pages**
   - Source: Select **GitHub Actions**
3. Automatic deployment will trigger on every push

### Deployment Pipeline
The GitHub Actions workflow automatically:
- Installs dependencies with caching
- Builds production bundle
- Creates resumes directory
- Uploads artifacts to GitHub Pages
- Deploys to live site

## 📝 Usage Guide

### Basic Workflow
1. Fill in your personal information
2. Add experience and education entries
3. List your skills (comma-separated)
4. Add GitHub username for stats integration
5. Preview your resume in real-time
6. Export in your preferred format

### Export Options
- **Export PDF**: Download as professional PDF document
- **Export MD**: Download markdown with GitHub stats
- **Export LaTeX**: Download LaTeX source for academic use
- **Export JSON**: Download data for backup/portability

### Data Management
- **Load Sample**: Load example data to see features
- **Clear All**: Remove all data (with confirmation)
- **Auto-Save**: Data saves automatically as you type

## 🎯 Supported Skill Badges

The markdown generator automatically creates badges for:
- JavaScript, TypeScript, React, Node.js
- Python, Java, C++, Go, Rust
- HTML, CSS, SQL, Git, Docker
- AWS, Azure, GCP
- And many more...

Custom skills get generic badges automatically.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- [shields.io](https://shields.io/) for badge generation
- [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) for GitHub statistics
- [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) for contribution streaks
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) for canvas rendering

## 👤 Author

Built with ❤️ by Rahim Khan

## 📊 Version History

### v2.0.0 (Latest)
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
