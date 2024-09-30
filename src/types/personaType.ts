export type PersonaType = {
  id: string; // Unique identifier for the persona
  name: string; // Persona name (e.g., "Tech-Savvy Professional")
  demographics: {
    ageRange: string; // Age range (e.g., "25–40")
    location: string; // Location (e.g., "Urban areas")
    jobTitle?: string; // Optional: Job title or occupation
  };
  behavior: string[]; // List of behavior patterns (e.g., "Uses tech tools daily for work")
  needsAndGoals: string[]; // List of needs and goals (e.g., "Looking for efficiency")
  painPoints: string[]; // List of challenges or frustrations (e.g., "Dislikes slow, outdated tech")
  motivations: string[]; // List of motivations (e.g., "Values time-saving tools")
  interviewQuestions?: InterViewQuestionType[]; // List of interview questions
};

export type InterViewQuestionType = {
  id: number; // The ID will now represent the order as well
  question: string;
  order: number; // This will track the position of the question
};
