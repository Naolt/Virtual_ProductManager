import { SchemaType } from "@google/generative-ai";

export const marketResearchSchema = {
  description: "Comprehensive Market Research Report",
  type: SchemaType.OBJECT,
  properties: {
    competitorAnalysis: {
      type: SchemaType.OBJECT,
      description: "Analysis of competitors",
      properties: {
        competitors: {
          type: SchemaType.ARRAY,
          description: "List of competitors",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: {
                type: SchemaType.STRING,
                description: "Name of the competitor",
              },
              description: {
                type: SchemaType.STRING,
                description: "Brief description of the competitor",
              },
              strengths: {
                type: SchemaType.ARRAY,
                description: "List of strengths of the competitor",
                items: {
                  type: SchemaType.STRING,
                },
              },
              weaknesses: {
                type: SchemaType.ARRAY,
                description: "List of weaknesses of the competitor",
                items: {
                  type: SchemaType.STRING,
                },
              },
              marketShare: {
                type: SchemaType.STRING,
                description: "Market share of the competitor",
              },
              pricingStrategy: {
                type: SchemaType.STRING,
                description: "Pricing strategy of the competitor",
              },
            },
          },
        },
        summary: {
          type: SchemaType.STRING,
          description: "Summary of the competitor analysis",
        },
      },
    },
    marketTrends: {
      type: SchemaType.OBJECT,
      description: "Current market trends and future projections",
      properties: {
        currentTrends: {
          type: SchemaType.ARRAY,
          description: "List of current market trends",
          items: {
            type: SchemaType.STRING,
          },
        },
        futureProjections: {
          type: SchemaType.ARRAY,
          description: "List of future market projections",
          items: {
            type: SchemaType.STRING,
          },
        },
      },
    },
    marketSizeAndPotential: {
      type: SchemaType.OBJECT,
      description: "Market size, potential, and growth rates",
      properties: {
        totalAddressableMarket: {
          type: SchemaType.STRING,
          description: "Total addressable market size",
        },
        serviceableAvailableMarket: {
          type: SchemaType.STRING,
          description: "Serviceable available market size",
        },
        growthRate: {
          type: SchemaType.STRING,
          description: "Annual growth rate of the market",
        },
        geographicBreakdown: {
          type: SchemaType.OBJECT,
          description: "Geographic breakdown of the market",
          properties: {
            NorthAmerica: { type: SchemaType.STRING },
            Europe: { type: SchemaType.STRING },
            AsiaPacific: { type: SchemaType.STRING },
            Other: { type: SchemaType.STRING },
          },
        },
      },
    },
    opportunitiesAndThreats: {
      type: SchemaType.OBJECT,
      description:
        "Identified opportunities and potential threats in the market",
      properties: {
        opportunities: {
          type: SchemaType.ARRAY,
          description: "List of market opportunities",
          items: {
            type: SchemaType.STRING,
          },
        },
        threats: {
          type: SchemaType.ARRAY,
          description: "List of potential market threats",
          items: {
            type: SchemaType.STRING,
          },
        },
      },
    },
  },
  required: [
    "competitorAnalysis",
    "marketTrends",
    "marketSizeAndPotential",
    "opportunitiesAndThreats",
  ],
};
