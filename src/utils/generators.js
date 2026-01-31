export const generateMarkdown = (data) => {
  const sections = [];
  
  // Header with name and badges
  sections.push(`<div align="center">`);
  sections.push(`\n# ${data.fullName}\n`);
  
  // Contact information with icons
  const contacts = [];
  if (data.email) contacts.push(`📧 ${data.email}`);
  if (data.phone) contacts.push(`📱 ${data.phone}`);
  if (data.location) contacts.push(`📍 ${data.location}`);
  if (contacts.length > 0) {
    sections.push(contacts.join(' • '));
  }
  
  // Social links
  if (data.linkedin) {
    sections.push(`\n[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${data.linkedin.startsWith('http') ? data.linkedin : 'https://' + data.linkedin})`);
  }
  if (data.github) {
    sections.push(`[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${data.github})`);
  }
  if (data.portfolio) {
    sections.push(`[![Portfolio](https://img.shields.io/badge/Portfolio-255E63?style=for-the-badge&logo=About.me&logoColor=white)](${data.portfolio})`);
  }
  
  sections.push(`\n</div>\n`);
  sections.push('---\n');

  // GitHub Stats (if GitHub username provided)
  if (data.github) {
    sections.push(`## 📊 GitHub Stats\n`);
    sections.push(`<div align="center">\n`);
    sections.push(`![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=radical&hide_border=true)\n`);
    sections.push(`![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=radical&hide_border=true)\n`);
    sections.push(`![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=radical&hide_border=true)\n`);
    sections.push(`</div>\n`);
  }

  // Professional Summary
  if (data.summary) {
    sections.push(`## 💼 Professional Summary\n\n${data.summary}\n`);
  }

  // Skills with badges
  if (data.skills) {
    sections.push(`## 🛠️ Skills & Technologies\n`);
    const skillsList = data.skills.split(',').map(s => s.trim());
    const skillBadges = skillsList.map(skill => {
      const skillLower = skill.toLowerCase();
      let badge = '';
      
      // Map common skills to badges
      if (skillLower.includes('javascript') || skillLower.includes('js')) {
        badge = `![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)`;
      } else if (skillLower.includes('react')) {
        badge = `![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)`;
      } else if (skillLower.includes('node')) {
        badge = `![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)`;
      } else if (skillLower.includes('python')) {
        badge = `![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)`;
      } else if (skillLower.includes('java')) {
        badge = `![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)`;
      } else if (skillLower.includes('typescript')) {
        badge = `![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)`;
      } else if (skillLower.includes('sql')) {
        badge = `![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)`;
      } else if (skillLower.includes('git')) {
        badge = `![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)`;
      } else if (skillLower.includes('docker')) {
        badge = `![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)`;
      } else if (skillLower.includes('aws')) {
        badge = `![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)`;
      } else if (skillLower.includes('css')) {
        badge = `![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)`;
      } else if (skillLower.includes('html')) {
        badge = `![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)`;
      } else {
        badge = `![${skill}](https://img.shields.io/badge/${encodeURIComponent(skill)}-blue?style=for-the-badge)`;
      }
      
      return badge;
    });
    
    sections.push(skillBadges.join(' '));
    sections.push('');
  }

  // Experience with timeline
  if (data.experience.length > 0) {
    sections.push(`## 💻 Experience\n`);
    data.experience.forEach((job, index) => {
      sections.push(`### ${job.title}`);
      sections.push(`**${job.company}** • ${job.startDate} - ${job.endDate}\n`);
      sections.push(`${job.description}\n`);
      if (index < data.experience.length - 1) {
        sections.push('---\n');
      }
    });
  }

  // Education
  if (data.education.length > 0) {
    sections.push(`## 🎓 Education\n`);
    data.education.forEach(edu => {
      sections.push(`### ${edu.degree}`);
      let schoolLine = `**${edu.school}** • ${edu.year}`;
      if (edu.gpa || edu.cgpa) {
        const grades = [];
        if (edu.gpa) grades.push(`GPA: ${edu.gpa}`);
        if (edu.cgpa) grades.push(`CGPA: ${edu.cgpa}`);
        schoolLine += ` • ${grades.join(' • ')}`;
      }
      sections.push(schoolLine + '\n');
    });
  }

  // Languages
  if (data.languages && data.languages.length > 0) {
    sections.push(`## 🌐 Languages\n`);
    const langList = data.languages.map(lang => `**${lang.language}** - ${lang.proficiency}`);
    sections.push(langList.join(' • '));
  }

  // Footer
  sections.push('\n---');
  sections.push('\n<div align="center">');
  sections.push(`\n*Generated with ❤️ by Resume Builder*`);
  sections.push('\n</div>');

  return sections.join('\n\n');
};

export const generateLatex = (data) => {
  const parts = [
    `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{left=2cm, right=2cm, top=2cm, bottom=2cm}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\title{\\vspace{-2cm}${data.fullName}}
\\date{}
\\author{}

\\begin{document}

\\maketitle
\\vspace{-1.5cm}
\\begin{center}
    ${data.email} -- ${data.phone} -- ${data.location} \\\\
    ${data.linkedin ? `\\url{${data.linkedin}}` : ''}${data.github ? ` -- GitHub: ${data.github}` : ''}${data.portfolio ? ` -- \\url{${data.portfolio}}` : ''}
\\end{center}

\\hrule
\\vspace{0.5cm}\n`
  ];

  if (data.summary) {
    parts.push(`\\section*{Professional Summary}\n${data.summary}\n`);
  }

  if (data.experience.length > 0) {
    parts.push('\\section*{Experience}\n\\begin{itemize}[leftmargin=*]');
    data.experience.forEach(job => {
      parts.push(`    \\item \\textbf{${job.title}} at \\textit{${job.company}} \\hfill ${job.startDate} -- ${job.endDate} \\\\
    ${job.description}
    \\vspace{0.2cm}`);
    });
    parts.push('\\end{itemize}\n');
  }

  if (data.education.length > 0) {
    parts.push('\\section*{Education}\n\\begin{itemize}[leftmargin=*]');
    data.education.forEach(edu => {
      let eduLine = `    \\item \\textbf{${edu.degree}}, ${edu.school} \\hfill ${edu.year}`;
      if (edu.gpa || edu.cgpa) {
        eduLine += ' \\\\';
        const grades = [];
        if (edu.gpa) grades.push(`GPA: ${edu.gpa}`);
        if (edu.cgpa) grades.push(`CGPA: ${edu.cgpa}`);
        eduLine += `\n    ${grades.join(' • ')}`;
      }
      parts.push(eduLine);
    });
    parts.push('\\end{itemize}\n');
  }

  if (data.skills) {
    parts.push(`\\section*{Skills}\n${data.skills}`);
  }

  if (data.languages && data.languages.length > 0) {
    parts.push('\\section*{Languages}\n\\begin{itemize}[leftmargin=*]');
    data.languages.forEach(lang => {
      parts.push(`    \\item \\textbf{${lang.language}}: ${lang.proficiency}`);
    });
    parts.push('\\end{itemize}\n');
  }

  parts.push('\n\\end{document}');
  return parts.join('\n');
};

export const generateJSON = (data) => {
  return JSON.stringify(data, null, 2);
};
