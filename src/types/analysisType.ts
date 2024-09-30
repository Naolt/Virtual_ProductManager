export type Theme = {
  theme: string; // The key theme
  details: string[]; // Specific quotes or examples from responses
  frequency: number; // How often the theme was mentioned
};

// Type for sentiment analysis
export type SentimentAnalysis = {
  positive: number; // Number of positive responses
  neutral: number; // Number of neutral responses
  negative: number; // Number of negative responses
  overallSentiment: string; // Overall summarized sentiment
};

// Type for persona-based insights
export type PersonaInsight = {
  persona: string; // Persona name (e.g., "Product Manager")
  topConcerns: string[]; // Summarized points about top concerns
  feedback: string; // Detailed feedback specific to this persona
};

// Type for actionable recommendations
export type Recommendation = {
  recommendation: string; // Short description of recommendation
  details: string; // Explanation based on data
  priority: "Low" | "Medium" | "High"; // Priority level of recommendation
};

// Type for quantitative metrics
export type QuantitativeMetric = {
  userSatisfaction: number; // Percentage of users who rated the product positively
  featureRequests: { feature: string; count: number }[]; // List of features requested and how many times
};

// Main Interview Analysis Report Type
export type InterviewAnalysisReport = {
  date: string; // Date of the report
  keyThemes: Theme[]; // List of key themes
  sentimentAnalysis: SentimentAnalysis; // Sentiment analysis section
  personaInsights: PersonaInsight[]; // List of insights based on personas
  actionableRecommendations: Recommendation[]; // List of recommendations
  quantitativeMetrics: QuantitativeMetric; // Quantitative metrics section
};

export const exampleReport: InterviewAnalysisReport = {
  date: "2024-09-29",
  keyThemes: [
    {
      theme: "Performance Issues",
      details: ["The app is slow", "Takes too long to load pages"],
      frequency: 5,
    },
  ],
  sentimentAnalysis: {
    positive: 10,
    neutral: 5,
    negative: 3,
    overallSentiment: "Mostly positive, with some performance concerns",
  },
  personaInsights: [
    {
      persona: "Product Manager",
      topConcerns: ["Lack of reporting tools", "Performance bottlenecks"],
      feedback:
        "Needs more data visualization features and better performance.",
    },
  ],
  actionableRecommendations: [
    {
      recommendation: "Optimize performance",
      details: "Users are experiencing slow load times, especially on mobile.",
      priority: "High",
    },
  ],
  quantitativeMetrics: {
    userSatisfaction: 85, // 85% satisfaction
    featureRequests: [
      { feature: "Dark Mode", count: 10 },
      { feature: "Better reporting", count: 7 },
    ],
  },
};
