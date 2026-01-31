# Resume Builder

A modern, dynamic resume builder that generates professional resumes in Markdown and LaTeX formats. Built with React and Vite.

## 🚀 Features

- **Live Preview**: See your resume in real-time as you edit
- **Multiple Export Formats**: Generate Markdown and LaTeX versions
- **Dynamic Sections**: Add/remove experience and education entries on the fly
- **Smooth Animations**: Beautiful transitions and hover effects
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Copy to Clipboard**: One-click copy for generated code
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🛠️ Technologies

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons
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
│   │   ├── ResumePreview.jsx   # Resume preview component
│   │   └── CodeView.jsx        # Code viewer with copy button
│   ├── utils/
│   │   ├── generators.js       # Markdown and LaTeX generators
│   │   └── constants.js        # Shared constants and styles
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Application entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Project dependencies

```

## 🎨 Key Features Explained

### Dynamic Block Addition
- Click "Add New" to create new experience or education entries
- Each entry can be removed individually
- Smooth fade-in animations for new blocks

### Smooth Design
- Transition effects on all interactive elements
- Hover states with scale transformations
- Responsive layout that adapts to screen size

### GitHub Pages Deployment
- Automated deployment via GitHub Actions
- Builds on every push to main branch
- Accessible via custom GitHub Pages URL

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👤 Author

Built with ❤️ by Rahim Khan
