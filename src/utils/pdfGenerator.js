import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';

/**
 * Generate PDF from HTML element
 * Uses html2canvas with optimized settings for smaller file size
 * A4 paper with 1 inch margins (25.4mm)
 */
export const generatePDF = async (elementId, filename = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Store original styles
    const originalStyle = element.style.cssText;
    
    // Apply print-optimized styles
    element.style.width = '794px'; // A4 width at 96dpi minus margins
    element.style.padding = '0';
    element.style.margin = '0';

    // Capture the element as canvas with optimized settings
    const canvas = await html2canvas(element, {
      scale: 1.5, // Reduced from 2 for smaller file size while maintaining quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 15000,
      removeContainer: true,
      // Optimize for text rendering
      letterRendering: true
    });

    // Restore original styles
    element.style.cssText = originalStyle;

    // Use JPEG for smaller file size (with high quality)
    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // A4 dimensions: 210mm x 297mm
    // 1 inch margins = 25.4mm on each side
    const marginMM = 25.4;
    const pageWidth = 210;
    const pageHeight = 297;
    const contentWidth = pageWidth - (marginMM * 2); // ~159.2mm
    const contentHeight = pageHeight - (marginMM * 2); // ~246.2mm
    
    // Calculate image dimensions to fit within margins
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = marginMM; // Start at top margin

    // Add the first page
    pdf.addImage(imgData, 'JPEG', marginMM, position, imgWidth, imgHeight);
    heightLeft -= contentHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft > 0) {
      position = marginMM - (imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', marginMM, position, imgWidth, imgHeight);
      heightLeft -= contentHeight;
    }
    
    // Save the PDF
    pdf.save(filename);
    
    return { success: true, blob: pdf.output('blob') };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: error.message };
  }
};

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
              top: 1440, // 1 inch in twips (1 inch = 1440 twips)
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
