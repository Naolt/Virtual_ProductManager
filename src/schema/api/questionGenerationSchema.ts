import { SchemaType } from "@google/generative-ai";

export const questionGenerationSchema = {
  description: "List of Generated questions",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.STRING,
    description: "Generated question",
  },
};
