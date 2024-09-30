import { SchemaType } from "@google/generative-ai";

export const interviewAnalysisReportSchema = {
  description: "Interview Analysis Report",
  type: SchemaType.OBJECT,
  properties: {
    date: {
      type: SchemaType.STRING,
      description: "Date of the report",
    },
    keyThemes: {
      type: SchemaType.ARRAY,
      description: "List of key themes",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          theme: {
            type: SchemaType.STRING,
            description: "The key theme",
          },
          details: {
            type: SchemaType.ARRAY,
            description: "Specific quotes or examples from responses",
            items: {
              type: SchemaType.STRING,
            },
          },
          frequency: {
            type: SchemaType.NUMBER,
            description: "How often the theme was mentioned",
          },
        },
      },
    },
    sentimentAnalysis: {
      type: SchemaType.OBJECT,
      description: "Sentiment analysis section",
      properties: {
        positive: {
          type: SchemaType.NUMBER,
          description: "Number of positive responses",
        },
        neutral: {
          type: SchemaType.NUMBER,
          description: "Number of neutral responses",
        },
        negative: {
          type: SchemaType.NUMBER,
          description: "Number of negative responses",
        },
        overallSentiment: {
          type: SchemaType.STRING,
          description: "Overall summarized sentiment",
        },
      },
    },
    personaInsights: {
      type: SchemaType.ARRAY,
      description: "List of insights based on personas",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          persona: {
            type: SchemaType.STRING,
            description: "Persona name (e.g., 'Product Manager')",
          },
          topConcerns: {
            type: SchemaType.ARRAY,
            description: "Summarized points about top concerns",
            items: {
              type: SchemaType.STRING,
            },
          },
          feedback: {
            type: SchemaType.STRING,
            description: "Detailed feedback specific to this persona",
          },
        },
      },
    },
    actionableRecommendations: {
      type: SchemaType.ARRAY,
      description: "List of recommendations",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          recommendation: {
            type: SchemaType.STRING,
            description: "Short description of recommendation",
          },
          details: {
            type: SchemaType.STRING,
            description: "Explanation based on data",
          },
          priority: {
            type: SchemaType.STRING,
            enum: ["Low", "Medium", "High"],
            description: "Priority level of recommendation",
          },
        },
      },
    },
    quantitativeMetrics: {
      type: SchemaType.OBJECT,
      description: "Quantitative metrics section",
      properties: {
        userSatisfaction: {
          type: SchemaType.NUMBER,
          description: "Percentage of users who rated the product positively",
        },
        featureRequests: {
          type: SchemaType.ARRAY,
          description: "List of features requested and how many times",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              feature: {
                type: SchemaType.STRING,
                description: "Feature requested",
              },
              count: {
                type: SchemaType.NUMBER,
                description: "Number of requests for the feature",
              },
            },
          },
        },
      },
    },
  },
};
