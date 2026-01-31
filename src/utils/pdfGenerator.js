import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';

/**
 * A4 dimensions in mm
 */
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const MARGIN = 25.4; // 1 inch in mm
const CONTENT_WIDTH = A4_WIDTH - (MARGIN * 2); // ~159.2mm

/**
 * Black and white colors only
 */
const COLORS = {
  black: [0, 0, 0],
  darkGray: [50, 50, 50],
  gray: [100, 100, 100],
  lightGray: [150, 150, 150],
  white: [255, 255, 255]
};

/**
 * Generate PDF directly from form data (not from HTML)
 * Creates a production-ready A4 PDF with 1 inch margins
 * Black and white only - no colors
 * Supports MIT, Stanford, and Oxford template styles
 */
export const generatePDF = async (formData, filename = 'resume.pdf', template = 'mit') => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Route to appropriate template generator (all use same black/white style now)
    switch (template) {
      case 'stanford':
        generateStanfordPDF(pdf, formData);
        break;
      case 'oxford':
        generateOxfordPDF(pdf, formData);
        break;
      case 'mit':
      default:
        generateMITPDF(pdf, formData);
        break;
    }

    // Save the PDF
    pdf.save(filename);
    
    return { success: true };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: error.message };
  }
};

/**
 * MIT Template PDF Generator
 * Clean, single-column, ATS-friendly with Times New Roman
 */
function generateMITPDF(pdf, formData) {
  let y = MARGIN;
  const leftMargin = MARGIN;
  const rightMargin = A4_WIDTH - MARGIN;

  // Helper functions
  const setFont = (style = 'normal', size = 10) => {
    pdf.setFont('times', style);
    pdf.setFontSize(size);
  };

  const addLine = () => {
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.4);
    pdf.line(leftMargin, y, rightMargin, y);
    y += 2;
  };

  const checkPage = (needed = 15) => {
    if (y + needed > A4_HEIGHT - MARGIN) {
      pdf.addPage();
      y = MARGIN;
    }
  };

  // ===== HEADER =====
  if (formData.fullName) {
    setFont('bold', 28);
    pdf.setTextColor(...COLORS.black);
    const nameWidth = pdf.getTextWidth(formData.fullName);
    pdf.text(formData.fullName, (A4_WIDTH - nameWidth) / 2, y);
    y += 8;
  }

  // Contact line
  const contactParts = [];
  if (formData.phone) contactParts.push(formData.phone);
  if (formData.email) contactParts.push(formData.email);
  if (contactParts.length > 0) {
    setFont('normal', 10);
    pdf.setTextColor(...COLORS.gray);
    const contactText = contactParts.join(' | ');
    const contactWidth = pdf.getTextWidth(contactText);
    pdf.text(contactText, (A4_WIDTH - contactWidth) / 2, y);
    y += 4;
  }

  // Links line
  const linkParts = [];
  if (formData.linkedin) linkParts.push(formData.linkedin.replace(/^https?:\/\//, ''));
  if (formData.github) linkParts.push(`github.com/${formData.github}`);
  if (formData.portfolio) linkParts.push(formData.portfolio.replace(/^https?:\/\//, ''));
  if (linkParts.length > 0) {
    setFont('normal', 10);
    pdf.setTextColor(...COLORS.gray);
    const linkText = linkParts.join(' | ');
    const linkWidth = pdf.getTextWidth(linkText);
    pdf.text(linkText, (A4_WIDTH - linkWidth) / 2, y);
    y += 4;
  }

  // Location
  if (formData.location) {
    setFont('normal', 10);
    pdf.setTextColor(...COLORS.gray);
    const locWidth = pdf.getTextWidth(formData.location);
    pdf.text(formData.location, (A4_WIDTH - locWidth) / 2, y);
    y += 6;
  }

  // ===== EDUCATION =====
  if (formData.education && formData.education.length > 0) {
    checkPage(20);
    setFont('bold', 11);
    pdf.setTextColor(...COLORS.black);
    pdf.text('EDUCATION', leftMargin, y);
    y += 1;
    addLine();

    formData.education.forEach(edu => {
      checkPage(12);
      
      // School and year
      setFont('bold', 10);
      pdf.setTextColor(...COLORS.black);
      pdf.text(edu.school || '', leftMargin, y);
      
      if (edu.year) {
        setFont('normal', 10);
        pdf.setTextColor(...COLORS.gray);
        const yearWidth = pdf.getTextWidth(edu.year);
        pdf.text(edu.year, rightMargin - yearWidth, y);
      }
      y += 4;

      // Degree
      if (edu.degree) {
        setFont('italic', 10);
        pdf.setTextColor(...COLORS.black);
        pdf.text(edu.degree, leftMargin, y);
        y += 4;
      }

      // GPA
      const grades = [];
      if (edu.gpa) grades.push(`GPA: ${edu.gpa}`);
      if (edu.cgpa) grades.push(`CGPA: ${edu.cgpa}`);
      if (grades.length > 0) {
        setFont('normal', 9);
        pdf.setTextColor(...COLORS.gray);
        pdf.text(grades.join(' | '), leftMargin, y);
        y += 4;
      }
      y += 2;
    });
  }

  // ===== EXPERIENCE =====
  if (formData.experience && formData.experience.length > 0) {
    checkPage(20);
    setFont('bold', 11);
    pdf.setTextColor(...COLORS.black);
    pdf.text('EXPERIENCE', leftMargin, y);
    y += 1;
    addLine();

    formData.experience.forEach(job => {
      checkPage(18);
      
      // Company and dates
      setFont('bold', 10);
      pdf.setTextColor(...COLORS.black);
      pdf.text(job.company || '', leftMargin, y);
      
      const dateText = `${job.startDate || ''} – ${job.endDate || 'Present'}`;
      setFont('normal', 9);
      pdf.setTextColor(...COLORS.gray);
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.text(dateText, rightMargin - dateWidth, y);
      y += 4;

      // Title
      if (job.title) {
        setFont('italic', 10);
        pdf.setTextColor(...COLORS.black);
        pdf.text(job.title, leftMargin, y);
        y += 5;
      }

      // Description bullets
      if (job.description) {
        const lines = job.description.split('\n').filter(l => l.trim());
        lines.forEach(line => {
          checkPage(5);
          const cleanLine = line.replace(/^[-•]\s*/, '');
          setFont('normal', 9);
          pdf.setTextColor(...COLORS.gray);
          
          // Bullet
          pdf.text('•', leftMargin + 2, y);
          
          // Wrap text
          const textLines = pdf.splitTextToSize(cleanLine, CONTENT_WIDTH - 8);
          textLines.forEach((tl, i) => {
            pdf.text(tl, leftMargin + 6, y + (i * 3.5));
          });
          y += textLines.length * 3.5 + 1;
        });
      }
      y += 3;
    });
  }

  // ===== SUMMARY =====
  if (formData.summary) {
    checkPage(15);
    setFont('bold', 11);
    pdf.setTextColor(...COLORS.black);
    pdf.text('SUMMARY', leftMargin, y);
    y += 1;
    addLine();

    setFont('normal', 10);
    pdf.setTextColor(...COLORS.gray);
    const summaryLines = pdf.splitTextToSize(formData.summary, CONTENT_WIDTH);
    summaryLines.forEach((line, i) => {
      pdf.text(line, leftMargin, y + (i * 4));
    });
    y += summaryLines.length * 4 + 4;
  }

  // ===== SKILLS =====
  if (formData.skills) {
    checkPage(12);
    setFont('bold', 11);
    pdf.setTextColor(...COLORS.black);
    pdf.text('TECHNICAL SKILLS', leftMargin, y);
    y += 1;
    addLine();

    setFont('bold', 10);
    pdf.setTextColor(...COLORS.black);
    pdf.text('Skills: ', leftMargin, y);
    
    setFont('normal', 10);
    const skillsLines = pdf.splitTextToSize(formData.skills, CONTENT_WIDTH - 15);
    skillsLines.forEach((line, i) => {
      pdf.text(line, leftMargin + 14, y + (i * 4));
    });
    y += skillsLines.length * 4 + 4;
  }

  // ===== LANGUAGES =====
  if (formData.languages && formData.languages.length > 0) {
    checkPage(12);
    setFont('bold', 11);
    pdf.setTextColor(...COLORS.black);
    pdf.text('LANGUAGES', leftMargin, y);
    y += 1;
    addLine();

    setFont('normal', 10);
    pdf.setTextColor(...COLORS.black);
    const langText = formData.languages
      .map(l => `${l.language} (${l.proficiency})`)
      .join(' | ');
    pdf.text(langText, leftMargin, y);
  }
}

/**
 * Stanford Template PDF Generator
 * Clean single-column layout with Helvetica font (black and white)
 */
function generateStanfordPDF(pdf, formData) {
  let y = MARGIN;
  const leftMargin = MARGIN;
  const rightMargin = A4_WIDTH - MARGIN;

  // Helper functions
  const setFont = (style = 'normal', size = 10) => {
    pdf.setFont('helvetica', style);
    pdf.setFontSize(size);
  };

  const addLine = () => {
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.line(leftMargin, y, rightMargin, y);
    y += 2;
  };

  const checkPage = (needed = 15) => {
    if (y + needed > A4_HEIGHT - MARGIN) {
      pdf.addPage();
      y = MARGIN;
    }
  };

  // ===== HEADER =====
  if (formData.fullName) {
    setFont('bold', 26);
    pdf.setTextColor(...COLORS.black);
    const nameWidth = pdf.getTextWidth(formData.fullName);
    pdf.text(formData.fullName, (A4_WIDTH - nameWidth) / 2, y);
    y += 8;
  }

  // Contact line
  const contactParts = [];
  if (formData.phone) contactParts.push(formData.phone);
  if (formData.email) contactParts.push(formData.email);
  if (formData.location) contactParts.push(formData.location);
  if (contactParts.length > 0) {
    setFont('normal', 10);
    pdf.setTextColor(...COLORS.gray);
    const contactText = contactParts.join(' | ');
    const contactWidth = pdf.getTextWidth(contactText);
    pdf.text(contactText, (A4_WIDTH - contactWidth) / 2, y);
    y += 4;
  }

  // Links line
  const linkParts = [];
  if (formData.linkedin) linkParts.push(formData.linkedin.replace(/^https?:\/\//, ''));
  if (formData.github) linkParts.push(`github.com/${formData.github}`);
  if (formData.portfolio) linkParts.push(formData.portfolio.replace(/^https?:\/\//, ''));
  if (linkParts.length > 0) {
    setFont('normal', 9);
    pdf.setTextColor(...COLORS.gray);
    const linkText = linkParts.join(' | ');
    const linkWidth = pdf.getTextWidth(linkText);
    pdf.text(linkText, (A4_WIDTH - linkWidth) / 2, y);
    y += 6;
  }

  // ===== EDUCATION =====
  if (formData.education && formData.education.length > 0) {
    checkPage(20);
    setFont('bold', 12);
    pdf.setTextColor(...COLORS.black);
    pdf.text('EDUCATION', leftMargin, y);
    y += 1;
    addLine();

    formData.education.forEach(edu => {
      checkPage(12);
      
      setFont('bold', 11);
      pdf.setTextColor(...COLORS.black);
      pdf.text(edu.school || '', leftMargin, y);
      
      if (edu.year) {
        setFont('normal', 10);
        pdf.setTextColor(...COLORS.gray);
        const yearWidth = pdf.getTextWidth(edu.year);
        pdf.text(edu.year, rightMargin - yearWidth, y);
      }
      y += 4;

      if (edu.degree) {
        setFont('italic', 10);
        pdf.setTextColor(...COLORS.darkGray);
        pdf.text(edu.degree, leftMargin, y);
        y += 4;
      }

      const grades = [];
      if (edu.gpa) grades.push(`GPA: ${edu.gpa}`);
      if (edu.cgpa) grades.push(`CGPA: ${edu.cgpa}`);
      if (grades.length > 0) {
        setFont('normal', 9);
        pdf.setTextColor(...COLORS.gray);
        pdf.text(grades.join(' | '), leftMargin, y);
        y += 4;
      }
      y += 2;
    });
  }

  // ===== EXPERIENCE =====
  if (formData.experience && formData.experience.length > 0) {
    checkPage(20);
    setFont('bold', 12);
    pdf.setTextColor(...COLORS.black);
    pdf.text('EXPERIENCE', leftMargin, y);
    y += 1;
    addLine();

    formData.experience.forEach(job => {
      checkPage(18);
      
      setFont('bold', 11);
      pdf.setTextColor(...COLORS.black);
      pdf.text(job.title || '', leftMargin, y);
      
      const dateText = `${job.startDate || ''} – ${job.endDate || 'Present'}`;
      setFont('normal', 9);
      pdf.setTextColor(...COLORS.gray);
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.text(dateText, rightMargin - dateWidth, y);
      y += 4;

      if (job.company) {
        setFont('normal', 10);
        pdf.setTextColor(...COLORS.darkGray);
        pdf.text(job.company, leftMargin, y);
        y += 5;
      }

      if (job.description) {
        const lines = job.description.split('\n').filter(l => l.trim());
        lines.forEach(line => {
          checkPage(5);
          const cleanLine = line.replace(/^[-•]\s*/, '');
          setFont('normal', 9);
          pdf.setTextColor(...COLORS.gray);
          
          pdf.text('•', leftMargin + 2, y);
          const textLines = pdf.splitTextToSize(cleanLine, CONTENT_WIDTH - 8);
          textLines.forEach((tl, i) => {
            pdf.text(tl, leftMargin + 6, y + (i * 3.5));
          });
          y += textLines.length * 3.5 + 1;
        });
      }
      y += 3;
    });
  }

  // ===== SUMMARY =====
  if (formData.summary) {
    checkPage(15);
    setFont('bold', 12);
    pdf.setTextColor(...COLORS.black);
    pdf.text('ABOUT', leftMargin, y);
    y += 1;
    addLine();

    setFont('normal', 10);
    pdf.setTextColor(...COLORS.gray);
    const summaryLines = pdf.splitTextToSize(formData.summary, CONTENT_WIDTH);
    summaryLines.forEach((line, i) => {
      pdf.text(line, leftMargin, y + (i * 4));
    });
    y += summaryLines.length * 4 + 4;
  }

  // ===== SKILLS =====
  if (formData.skills) {
    checkPage(12);
    setFont('bold', 12);
    pdf.setTextColor(...COLORS.black);
    pdf.text('SKILLS', leftMargin, y);
    y += 1;
    addLine();

    setFont('normal', 10);
    pdf.setTextColor(...COLORS.darkGray);
    const skillsLines = pdf.splitTextToSize(formData.skills, CONTENT_WIDTH);
    skillsLines.forEach((line, i) => {
      pdf.text(line, leftMargin, y + (i * 4));
    });
    y += skillsLines.length * 4 + 4;
  }

  // ===== LANGUAGES =====
  if (formData.languages && formData.languages.length > 0) {
    checkPage(12);
    setFont('bold', 12);
    pdf.setTextColor(...COLORS.black);
    pdf.text('LANGUAGES', leftMargin, y);
    y += 1;
    addLine();

    setFont('normal', 10);
    pdf.setTextColor(...COLORS.darkGray);
    const langText = formData.languages
      .map(l => `${l.language} (${l.proficiency})`)
      .join(' | ');
    pdf.text(langText, leftMargin, y);
  }
}

/**
 * Oxford Template PDF Generator
 * Traditional academic style with Times New Roman
 */
function generateOxfordPDF(pdf, formData) {
  let y = MARGIN;
  const leftMargin = MARGIN;
  const rightMargin = A4_WIDTH - MARGIN;

  const setFont = (style = 'normal', size = 11) => {
    pdf.setFont('times', style);
    pdf.setFontSize(size);
  };

  const checkPage = (needed = 15) => {
    if (y + needed > A4_HEIGHT - MARGIN) {
      pdf.addPage();
      y = MARGIN;
    }
  };

  const addSectionHeader = (text) => {
    checkPage(15);
    setFont('bold', 13);
    pdf.setTextColor(...COLORS.black);
    pdf.text(text.toUpperCase(), leftMargin, y);
    y += 5;
  };

  // ===== HEADER =====
  // Name with double underline
  if (formData.fullName) {
    setFont('bold', 26);
    pdf.setTextColor(...COLORS.black);
    const nameWidth = pdf.getTextWidth(formData.fullName);
    pdf.text(formData.fullName, (A4_WIDTH - nameWidth) / 2, y);
    y += 4;
    
    // Double border line
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.8);
    pdf.line(leftMargin, y, rightMargin, y);
    y += 8;
  }

  // Contact info centered
  const contactParts = [];
  if (formData.location) contactParts.push(formData.location);
  if (formData.phone) contactParts.push(formData.phone);
  if (formData.email) contactParts.push(formData.email);
  if (contactParts.length > 0) {
    setFont('normal', 11);
    pdf.setTextColor(...COLORS.gray);
    const contactText = contactParts.join(' • ');
    const contactWidth = pdf.getTextWidth(contactText);
    pdf.text(contactText, (A4_WIDTH - contactWidth) / 2, y);
    y += 5;
  }

  // Links
  const linkParts = [];
  if (formData.linkedin) linkParts.push(formData.linkedin.replace(/^https?:\/\//, ''));
  if (formData.github) linkParts.push(`github.com/${formData.github}`);
  if (formData.portfolio) linkParts.push(formData.portfolio.replace(/^https?:\/\//, ''));
  if (linkParts.length > 0) {
    setFont('normal', 10);
    pdf.setTextColor(...COLORS.gray);
    const linkText = linkParts.join(' • ');
    const linkWidth = pdf.getTextWidth(linkText);
    pdf.text(linkText, (A4_WIDTH - linkWidth) / 2, y);
    y += 8;
  }

  // ===== PERSONAL STATEMENT =====
  if (formData.summary) {
    addSectionHeader('Personal Statement');
    
    // Left border decoration
    pdf.setDrawColor(180, 180, 180);
    pdf.setLineWidth(0.8);
    const startY = y;
    
    setFont('normal', 11);
    pdf.setTextColor(...COLORS.gray);
    const summaryLines = pdf.splitTextToSize(formData.summary, CONTENT_WIDTH - 8);
    summaryLines.forEach((line, i) => {
      pdf.text(line, leftMargin + 6, y + (i * 4.5));
    });
    
    // Draw left border
    pdf.line(leftMargin + 2, startY - 2, leftMargin + 2, y + summaryLines.length * 4.5);
    y += summaryLines.length * 4.5 + 6;
  }

  // ===== EDUCATION =====
  if (formData.education && formData.education.length > 0) {
    addSectionHeader('Education');
    
    formData.education.forEach(edu => {
      checkPage(15);
      
      // Left border
      const startY = y - 2;
      
      // School
      setFont('bold', 12);
      pdf.setTextColor(...COLORS.black);
      pdf.text(edu.school || '', leftMargin + 6, y);
      
      // Year
      if (edu.year) {
        setFont('normal', 11);
        pdf.setTextColor(...COLORS.gray);
        const yearWidth = pdf.getTextWidth(edu.year);
        pdf.text(edu.year, rightMargin - yearWidth, y);
      }
      y += 5;

      // Degree
      if (edu.degree) {
        setFont('italic', 11);
        pdf.setTextColor(...COLORS.gray);
        pdf.text(edu.degree, leftMargin + 6, y);
        y += 5;
      }

      // GPA
      const grades = [];
      if (edu.gpa) grades.push(`GPA: ${edu.gpa}`);
      if (edu.cgpa) grades.push(`CGPA: ${edu.cgpa}`);
      if (grades.length > 0) {
        setFont('normal', 10);
        pdf.setTextColor(...COLORS.lightGray);
        pdf.text(grades.join(' | '), leftMargin + 6, y);
        y += 4;
      }

      // Draw left border
      pdf.setDrawColor(180, 180, 180);
      pdf.setLineWidth(0.8);
      pdf.line(leftMargin + 2, startY, leftMargin + 2, y);
      y += 4;
    });
  }

  // ===== EXPERIENCE =====
  if (formData.experience && formData.experience.length > 0) {
    addSectionHeader('Professional Experience');
    
    formData.experience.forEach(job => {
      checkPage(18);
      
      const startY = y - 2;
      
      // Title
      setFont('bold', 12);
      pdf.setTextColor(...COLORS.black);
      pdf.text(job.title || '', leftMargin + 6, y);
      
      // Dates
      const dateText = `${job.startDate || ''} – ${job.endDate || 'Present'}`;
      setFont('normal', 10);
      pdf.setTextColor(...COLORS.gray);
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.text(dateText, rightMargin - dateWidth, y);
      y += 5;

      // Company
      if (job.company) {
        setFont('italic', 11);
        pdf.setTextColor(...COLORS.gray);
        pdf.text(job.company, leftMargin + 6, y);
        y += 5;
      }

      // Description
      if (job.description) {
        const lines = job.description.split('\n').filter(l => l.trim());
        if (lines.length > 1 || job.description.includes('\n')) {
          // Bullet points
          lines.forEach(line => {
            checkPage(5);
            const cleanLine = line.replace(/^[-•]\s*/, '');
            setFont('normal', 10);
            pdf.setTextColor(...COLORS.gray);
            
            pdf.text('•', leftMargin + 8, y);
            const textLines = pdf.splitTextToSize(cleanLine, CONTENT_WIDTH - 12);
            textLines.forEach((tl, i) => {
              pdf.text(tl, leftMargin + 12, y + (i * 4));
            });
            y += textLines.length * 4 + 1;
          });
        } else {
          // Single paragraph
          setFont('normal', 10);
          pdf.setTextColor(...COLORS.gray);
          const descLines = pdf.splitTextToSize(job.description, CONTENT_WIDTH - 8);
          descLines.forEach((line, i) => {
            pdf.text(line, leftMargin + 6, y + (i * 4));
          });
          y += descLines.length * 4;
        }
      }

      // Draw left border
      pdf.setDrawColor(180, 180, 180);
      pdf.setLineWidth(0.8);
      pdf.line(leftMargin + 2, startY, leftMargin + 2, y);
      y += 5;
    });
  }

  // ===== SKILLS =====
  if (formData.skills) {
    addSectionHeader('Skills & Competencies');
    
    const startY = y - 2;
    setFont('normal', 11);
    pdf.setTextColor(...COLORS.gray);
    const skillsLines = pdf.splitTextToSize(formData.skills, CONTENT_WIDTH - 8);
    skillsLines.forEach((line, i) => {
      pdf.text(line, leftMargin + 6, y + (i * 4.5));
    });
    
    // Left border
    pdf.setDrawColor(180, 180, 180);
    pdf.setLineWidth(0.8);
    pdf.line(leftMargin + 2, startY, leftMargin + 2, y + skillsLines.length * 4.5);
    y += skillsLines.length * 4.5 + 6;
  }

  // ===== LANGUAGES =====
  if (formData.languages && formData.languages.length > 0) {
    addSectionHeader('Languages');
    
    const startY = y - 2;
    setFont('normal', 11);
    pdf.setTextColor(...COLORS.gray);
    const langText = formData.languages
      .map(l => `${l.language} (${l.proficiency})`)
      .join(' | ');
    pdf.text(langText, leftMargin + 6, y);
    
    // Left border
    pdf.setDrawColor(180, 180, 180);
    pdf.setLineWidth(0.8);
    pdf.line(leftMargin + 2, startY, leftMargin + 2, y + 4);
    y += 10;
  }

  // Footer
  y = A4_HEIGHT - 15;
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.3);
  pdf.line(leftMargin, y, rightMargin, y);
  y += 4;
  setFont('italic', 9);
  pdf.setTextColor(...COLORS.lightGray);
  const footerText = 'References available upon request';
  const footerWidth = pdf.getTextWidth(footerText);
  pdf.text(footerText, (A4_WIDTH - footerWidth) / 2, y);
}

/**
 * Generate DOCX document from form data
 * Uses Times New Roman font, proper formatting for Word documents
 */
export const generateDOCX = async (formData, filename = 'resume.docx') => {
  try {
    const children = [];

    // Helper function to create section header
    const createSectionHeader = (text) => {
      return new Paragraph({
        children: [
          new TextRun({
            text: text.toUpperCase(),
            bold: true,
            size: 28, // 14pt
            font: 'Times New Roman'
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        border: {
          bottom: {
            color: '000000',
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6
          }
        }
      });
    };

    // Name (centered, large)
    children.push(new Paragraph({
      children: [
        new TextRun({
          text: formData.fullName,
          bold: true,
          size: 48, // 24pt
          font: 'Times New Roman'
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 }
    }));

    // Contact info (centered)
    const contactParts = [];
    if (formData.phone) contactParts.push(formData.phone);
    if (formData.email) contactParts.push(formData.email);
    if (formData.location) contactParts.push(formData.location);
    
    if (contactParts.length > 0) {
      children.push(new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join(' | '),
            size: 22, // 11pt
            font: 'Times New Roman'
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 }
      }));
    }

    // Links (centered)
    const linkParts = [];
    if (formData.linkedin) linkParts.push(formData.linkedin.replace(/^https?:\/\//, ''));
    if (formData.github) linkParts.push(`github.com/${formData.github}`);
    if (formData.portfolio) linkParts.push(formData.portfolio.replace(/^https?:\/\//, ''));
    
    if (linkParts.length > 0) {
      children.push(new Paragraph({
        children: [
          new TextRun({
            text: linkParts.join(' | '),
            size: 22, // 11pt
            font: 'Times New Roman',
            color: '0066CC'
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 }
      }));
    }

    // Summary/Profile
    if (formData.summary) {
      children.push(createSectionHeader('Professional Summary'));
      children.push(new Paragraph({
        children: [
          new TextRun({
            text: formData.summary,
            size: 24, // 12pt
            font: 'Times New Roman'
          })
        ],
        spacing: { after: 120 }
      }));
    }

    // Education
    if (formData.education && formData.education.length > 0) {
      children.push(createSectionHeader('Education'));
      
      formData.education.forEach(edu => {
        // School and Year
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: edu.school,
              bold: true,
              size: 24, // 12pt
              font: 'Times New Roman'
            }),
            new TextRun({
              text: `\t${edu.year}`,
              size: 24,
              font: 'Times New Roman'
            })
          ],
          tabStops: [{ type: 'right', position: 9360 }], // Right tab at 6.5 inches
          spacing: { before: 120 }
        }));

        // Degree
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              italics: true,
              size: 24,
              font: 'Times New Roman'
            })
          ]
        }));

        // GPA/CGPA
        if (edu.gpa || edu.cgpa) {
          const gradeText = [
            edu.gpa ? `GPA: ${edu.gpa}` : '',
            edu.cgpa ? `CGPA: ${edu.cgpa}` : ''
          ].filter(Boolean).join(' | ');
          
          children.push(new Paragraph({
            children: [
              new TextRun({
                text: gradeText,
                size: 22,
                font: 'Times New Roman',
                color: '666666'
              })
            ],
            spacing: { after: 120 }
          }));
        }
      });
    }

    // Experience
    if (formData.experience && formData.experience.length > 0) {
      children.push(createSectionHeader('Experience'));
      
      formData.experience.forEach(job => {
        // Company and Dates
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: job.company,
              bold: true,
              size: 24,
              font: 'Times New Roman'
            }),
            new TextRun({
              text: `\t${job.startDate} – ${job.endDate}`,
              size: 22,
              font: 'Times New Roman'
            })
          ],
          tabStops: [{ type: 'right', position: 9360 }],
          spacing: { before: 120 }
        }));

        // Title
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: job.title,
              italics: true,
              size: 24,
              font: 'Times New Roman'
            })
          ]
        }));

        // Description (bullet points or paragraph)
        if (job.description) {
          const lines = job.description.split('\n').filter(line => line.trim());
          lines.forEach(line => {
            const cleanLine = line.replace(/^[-•]\s*/, '');
            children.push(new Paragraph({
              children: [
                new TextRun({
                  text: cleanLine,
                  size: 22,
                  font: 'Times New Roman'
                })
              ],
              bullet: { level: 0 },
              spacing: { after: 60 }
            }));
          });
        }
      });
    }

    // Skills
    if (formData.skills) {
      children.push(createSectionHeader('Skills'));
      children.push(new Paragraph({
        children: [
          new TextRun({
            text: formData.skills,
            size: 24,
            font: 'Times New Roman'
          })
        ],
        spacing: { after: 120 }
      }));
    }

    // Languages
    if (formData.languages && formData.languages.length > 0) {
      children.push(createSectionHeader('Languages'));
      const langText = formData.languages
        .map(lang => `${lang.language} (${lang.proficiency})`)
        .join(' | ');
      
      children.push(new Paragraph({
        children: [
          new TextRun({
            text: langText,
            size: 24,
            font: 'Times New Roman'
          })
        ]
      }));
    }

    // Create document with 1 inch margins
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twips (twentieths of a point)
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: children
      }]
    });

    // Generate and download
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw error;
  }
};

/**
 * Download file utility
 */
export const downloadFile = (content, filename, type = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
