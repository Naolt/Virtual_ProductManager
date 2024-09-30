import { SchemaType } from "@google/generative-ai";

export const personaGenerationSchema = {
  description: "List of generated personas for the product",
  type: SchemaType.ARRAY, // The response will be a list of personas
  items: {
    type: SchemaType.OBJECT,
    description: "Individual persona details",
    properties: {
      id: {
        type: SchemaType.STRING,
        description: "Unique identifier for the persona",
      },
      name: {
        type: SchemaType.STRING,
        description: "Name of the persona (e.g., 'Tech-Savvy Professional')",
      },
      demographics: {
        type: SchemaType.OBJECT,
        description: "Demographic information for the persona",
        properties: {
          ageRange: {
            type: SchemaType.STRING,
            description: "Age range (e.g., '25-40')",
          },
          location: {
            type: SchemaType.STRING,
            description: "Location (e.g., 'Urban areas')",
          },
          jobTitle: {
            type: SchemaType.STRING,
            description: "Optional: Job title or occupation",
          },
        },
      },
      behavior: {
        type: SchemaType.ARRAY,
        description:
          "List of behavior patterns (e.g., 'Uses tech tools daily for work')",
        items: {
          type: SchemaType.STRING,
        },
      },
      needsAndGoals: {
        type: SchemaType.ARRAY,
        description: "List of needs and goals (e.g., 'Looking for efficiency')",
        items: {
          type: SchemaType.STRING,
        },
      },
      painPoints: {
        type: SchemaType.ARRAY,
        description:
          "List of challenges or frustrations (e.g., 'Dislikes slow, outdated tech')",
        items: {
          type: SchemaType.STRING,
        },
      },
      motivations: {
        type: SchemaType.ARRAY,
        description: "List of motivations (e.g., 'Values time-saving tools')",
        items: {
          type: SchemaType.STRING,
        },
      },
    },
  },
};
