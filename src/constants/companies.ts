export const COMPANIES = [
  {
    id: "google",
    name: "Google",
    keywords: [
      "Algorithms", "System Design", "Python", "Cloud", "AI", "Leadership", 
      "Data Structures", "Scalability", "Problem Solving", "GCP", "Machine Learning",
      "Go", "C++", "Distributed Systems"
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    keywords: [
      "Leadership Principles", "Ownership", "AWS", "Java", "Distributed Systems",
      "Scalability", "Customer Obsession", "Deliver Results", "Microservices",
      "Object-Oriented Design"
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    keywords: [
      "Azure", ".NET", "C#", "Cloud", "AI", "Security", "TypeScript", 
      "Algorithms", "System Design", "Enterprise", "Collaboration"
    ]
  },
  {
    id: "apple",
    name: "Apple",
    keywords: [
      "Swift", "Objective-C", "iOS", "macOS", "UX", "Hardware", "Performance",
      "C++", "Algorithms", "Detail-Oriented", "Design"
    ]
  },
  {
    id: "meta",
    name: "Meta",
    keywords: [
      "React", "JavaScript", "PHP", "Hack", "Scalability", "Data Structures",
      "Algorithms", "System Design", "Mobile", "GraphQL", "Performance"
    ]
  },
  {
    id: "netflix",
    name: "Netflix",
    keywords: [
      "Java", "Spring Boot", "Microservices", "AWS", "High Availability",
      "Distributed Systems", "Cloud", "Video Streaming", "Performance"
    ]
  },
  {
    id: "tcs",
    name: "TCS",
    keywords: [
      "Java", "SQL", "Communication", "Testing", "Agile", "Spring Boot",
      "Oracle", "Consulting", "Teamwork"
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    keywords: [
      "Java", "Python", "SQL", "Cloud", "Problem Solving", "Agile",
      "Communication", "Testing", "SDLC"
    ]
  }
  // We can add more companies as needed from the list (Adobe, Oracle, IBM, etc.)
];

export const getCompanyKeywords = (companyId: string) => {
  return COMPANIES.find(c => c.id === companyId)?.keywords || [];
};
