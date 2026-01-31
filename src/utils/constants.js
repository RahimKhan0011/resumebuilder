export const COMMON_CLASSES = {
  input: "w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200",
  sectionTitle: "text-xl font-bold uppercase text-slate-800 mb-2 border-b border-slate-300 pb-1",
  card: "bg-slate-50 p-4 rounded-lg border border-slate-200 relative group transition-all duration-300 hover:shadow-md",
  deleteButton: "absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200",
  addButton: "flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200",
  tabButton: (isActive) => `flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
    isActive ? 'bg-slate-800 text-white shadow-md scale-105' : 'text-slate-600 hover:bg-slate-100 hover:scale-102'
  }`,
  actionButton: "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
};

export const INITIAL_DATA = {
  fullName: "Alex Developer",
  email: "alex@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexdev",
  github: "alexdev",
  portfolio: "https://alexdev.com",
  summary: "Detail-oriented software engineer with 5+ years of experience building scalable web applications. Passionate about clean code and user-centric design.",
  skills: "JavaScript, React, Node.js, Python, SQL, Git, AWS, TypeScript, Docker",
  experience: [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "Tech Solutions Inc.",
      startDate: "2021",
      endDate: "Present",
      description: "Led the migration of a legacy codebase to React. Improved page load times by 40%. Mentored junior developers."
    },
    {
      id: 2,
      title: "Web Developer",
      company: "Creative Agency",
      startDate: "2018",
      endDate: "2021",
      description: "Developed responsive websites for 20+ clients using HTML, CSS, and JavaScript. Collaborated with designers to ensure pixel-perfect implementation."
    }
  ],
  education: [
    {
      id: 1,
      degree: "B.S. Computer Science",
      school: "University of Technology",
      year: "2018"
    }
  ]
};
