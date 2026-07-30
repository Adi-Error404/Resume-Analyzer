export const ROLES = [
  {
    id: "software_engineer",
    name: "Software Engineer",
    keywords: [
      "JavaScript", "TypeScript", "Python", "Java", "C++", "Algorithms",
      "Data Structures", "System Design", "Git", "REST", "API",
      "Agile", "SQL", "NoSQL", "Problem Solving"
    ]
  },
  {
    id: "frontend_developer",
    name: "Frontend Developer",
    keywords: [
      "React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind",
      "Vue", "Angular", "Redux", "UI/UX", "Responsive Design",
      "Web Performance", "Accessibility", "Webpack", "Vite"
    ]
  },
  {
    id: "backend_developer",
    name: "Backend Developer",
    keywords: [
      "Node.js", "Python", "Java", "Go", "C#", "SQL", "PostgreSQL",
      "MongoDB", "Redis", "Docker", "Kubernetes", "Microservices",
      "RESTful APIs", "GraphQL", "System Design"
    ]
  },
  {
    id: "full_stack_developer",
    name: "Full Stack Developer",
    keywords: [
      "React", "Node.js", "TypeScript", "JavaScript", "SQL",
      "NoSQL", "REST", "GraphQL", "Docker", "AWS", "CI/CD",
      "System Design", "Frontend", "Backend"
    ]
  },
  {
    id: "machine_learning_engineer",
    name: "Machine Learning Engineer",
    keywords: [
      "Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas",
      "NumPy", "Deep Learning", "NLP", "Computer Vision", "SQL",
      "Data Modeling", "MLOps", "Algorithms"
    ]
  },
  {
    id: "data_scientist",
    name: "Data Scientist",
    keywords: [
      "Python", "R", "SQL", "Machine Learning", "Statistics",
      "Data Visualization", "Tableau", "Pandas", "A/B Testing",
      "Data Analysis", "Predictive Modeling"
    ]
  },
  {
    id: "devops_engineer",
    name: "DevOps Engineer",
    keywords: [
      "Linux", "Docker", "Kubernetes", "AWS", "Azure", "GCP",
      "CI/CD", "Jenkins", "Terraform", "Ansible", "Bash", "Python",
      "Monitoring", "Networking"
    ]
  }
  // Add more roles as needed (Cloud Engineer, Cybersecurity, Mobile App, UI/UX, etc.)
];

export const getRoleKeywords = (roleId: string) => {
  return ROLES.find(r => r.id === roleId)?.keywords || [];
};
