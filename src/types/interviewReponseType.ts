export type QuestionResponse = {
  questionId: string; // Unique ID for each question
  questionText: string; // The text of the question
  response: string; // Interviewee's response to the question
};

export type InterviewType = {
  id: string; // Unique ID for the interview
  // Interviewee's basic information
  name: string;
  email?: string; // Optional, for follow-up purposes
  role: string; // Job title or position of the interviewee
  industry: string; // Interviewee's industry (e.g., tech, healthcare)

  // Persona and interview context
  personaType: string; // The persona type selected for this interview
  date: string; // Date of the interview
  interviewMode: "in-person" | "remote"; // How the interview was conducted

  // Questions and responses
  questions: QuestionResponse[];
};
