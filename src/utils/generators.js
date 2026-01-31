export const generateMarkdown = (data) => {
  const sections = [];
  
  sections.push(`# ${data.fullName}`);
  sections.push(`${data.email} | ${data.phone} | ${data.location}`);
  if (data.linkedin) {
    sections.push(`[LinkedIn](${data.linkedin})`);
  }
  sections.push('---');

  if (data.summary) {
    sections.push(`## Professional Summary\n\n${data.summary}`);
  }

  if (data.experience.length > 0) {
    const expSection = ['## Experience'];
    data.experience.forEach(job => {
      expSection.push(`### ${job.title}\n**${job.company}** | ${job.startDate} - ${job.endDate}\n\n${job.description}`);
    });
    sections.push(expSection.join('\n\n'));
  }

  if (data.education.length > 0) {
    const eduSection = ['## Education'];
    data.education.forEach(edu => {
      eduSection.push(`### ${edu.degree}\n**${edu.school}** | ${edu.year}`);
    });
    sections.push(eduSection.join('\n\n'));
  }

  if (data.skills) {
    sections.push(`## Skills\n\n${data.skills}`);
  }

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
    ${data.linkedin ? `\\url{${data.linkedin}}` : ''}
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
      parts.push(`    \\item \\textbf{${edu.degree}}, ${edu.school} \\hfill ${edu.year}`);
    });
    parts.push('\\end{itemize}\n');
  }

  if (data.skills) {
    parts.push(`\\section*{Skills}\n${data.skills}`);
  }

  parts.push('\n\\end{document}');
  return parts.join('\n');
};
