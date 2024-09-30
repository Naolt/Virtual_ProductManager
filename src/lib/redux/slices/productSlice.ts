import { InterviewAnalysisReport } from "@/types/analysisType";
import { InterviewType } from "@/types/interviewReponseType";
import { MarketResearchType } from "@/types/marketResearchType";
import { PersonaType, InterViewQuestionType } from "@/types/personaType";
import { ProductOverviewType } from "@/types/productOverview";
import { UserResearchType } from "@/types/userResearchType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProductState = {
  productOverview: ProductOverviewType | null;
  marketResearch: MarketResearchType | null;
  userResearch: UserResearchType | null;
  interviewResponses: InterviewType[] | null;
  interviewAnalysis: InterviewAnalysisReport | null;
};

const initialState: ProductState = {
  productOverview: {
    productName: "",
    productDescription: "",
    productGoals: "",
    targetAudience: "",
    valueProposition: "",
    keyFeatures: [],
    additionalNotes: "",
  },
  marketResearch: {
    competitorAnalysis: {
      competitors: [],
      summary: "",
    },
    marketSizeAndPotential: {
      totalAddressableMarket: "",
      serviceableAvailableMarket: "",
      growthRate: "",
      geographicBreakdown: {
        "Asia-Pacific": "",
        "North America": "",
        Europe: "",
        Other: "",
      },
    },
    marketTrends: {
      currentTrends: [],
      futureProjections: [],
    },
    opportunitiesAndThreats: {
      opportunities: [],
      threats: [],
    },
  },
  userResearch: {
    personas: [],
    summary: "",
  },
  interviewResponses: [],
  interviewAnalysis: null,
};

// Create the slice with actions and reducers
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductOverview: (state, action: PayloadAction<ProductOverviewType>) => {
      state.productOverview = action.payload;
    },
    setMarketResearch: (state, action: PayloadAction<MarketResearchType>) => {
      state.marketResearch = action.payload;
    },
    setUserResearch: (state, action: PayloadAction<UserResearchType>) => {
      state.userResearch = action.payload;
    },
    addPersona: (state, action: PayloadAction<PersonaType>) => {
      state.userResearch?.personas.push(action.payload);
    },
    updatePersona: (state, action: PayloadAction<PersonaType>) => {
      const index = state.userResearch?.personas.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== undefined && index >= 0) {
        state.userResearch!.personas[index] = action.payload;
      }
    },
    deletePersona: (state, action: PayloadAction<string>) => {
      state.userResearch!.personas = state.userResearch!.personas.filter(
        (persona) => persona.id !== action.payload
      );
    },
    setGeneratedPersonas: (state, action: PayloadAction<PersonaType[]>) => {
      // Replace current personas with the generated list
      state.userResearch!.personas = action.payload;
    },

    addInterviewQuestion: (
      state,
      action: PayloadAction<{ personaId: string; question: string }>
    ) => {
      const persona = state.userResearch?.personas.find(
        (p) => p.id === action.payload.personaId
      );
      if (persona) {
        if (!persona.interviewQuestions) {
          persona.interviewQuestions = [];
        }
        const order = persona.interviewQuestions.length + 1; // Set the order
        persona.interviewQuestions.push({
          id: order,
          question: action.payload.question,
          order,
        });
      }
    },

    updateInterviewQuestion: (
      state,
      action: PayloadAction<{
        personaId: string;
        questionId: number;
        question: string;
      }>
    ) => {
      const persona = state.userResearch?.personas.find(
        (p) => p.id === action.payload.personaId
      );
      if (persona && persona.interviewQuestions) {
        const index = persona.interviewQuestions.findIndex(
          (q) => q.id === action.payload.questionId
        );
        if (index !== undefined && index >= 0) {
          persona.interviewQuestions[index].question = action.payload.question;
        }
      }
    },

    deleteInterviewQuestion: (
      state,
      action: PayloadAction<{ personaId: string; questionId: number }>
    ) => {
      const persona = state.userResearch?.personas.find(
        (p) => p.id === action.payload.personaId
      );
      if (persona && persona.interviewQuestions) {
        persona.interviewQuestions = persona.interviewQuestions.filter(
          (q) => q.id !== action.payload.questionId
        );
        // Update the order of remaining questions
        persona.interviewQuestions.forEach((q, index) => {
          q.order = index + 1;
        });
      }
    },

    reorderInterviewQuestion: (
      state,
      action: PayloadAction<{
        personaId: string;
        fromIndex: number;
        toIndex: number;
      }>
    ) => {
      const persona = state.userResearch?.personas.find(
        (p) => p.id === action.payload.personaId
      );
      if (persona && persona.interviewQuestions) {
        const [movedItem] = persona.interviewQuestions.splice(
          action.payload.fromIndex,
          1
        );
        persona.interviewQuestions.splice(action.payload.toIndex, 0, movedItem);
        // Update the order after reordering
        persona.interviewQuestions.forEach((q, index) => {
          q.order = index + 1;
        });
      }
    },

    setGeneratedInterviewQuestions: (
      state,
      action: PayloadAction<{ personaId: string; questions: string[] }>
    ) => {
      const persona = state.userResearch?.personas.find(
        (p) => p.id === action.payload.personaId
      );
      if (persona) {
        persona.interviewQuestions = action.payload.questions.map(
          (q, index) => ({
            id: index + 1,
            question: q,
            order: index + 1,
          })
        );
      }
    },

    addInterviewResponse: (state, action: PayloadAction<InterviewType>) => {
      state.interviewResponses?.push({
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
      });
    },
    updateInterviewResponse: (
      state,
      action: PayloadAction<{ interviewId: string; response: InterviewType }>
    ) => {
      const index = state.interviewResponses?.findIndex(
        (i) => i.id === action.payload.interviewId
      );
      if (index !== undefined && index >= 0) {
        state.interviewResponses![index] = action.payload.response;
      }
    },
    deleteInterviewResponse: (state, action: PayloadAction<string>) => {
      state.interviewResponses =
        state.interviewResponses?.filter((i) => i.id !== action.payload) ||
        null;
    },
    setInterviewAnalysis: (
      state,
      action: PayloadAction<InterviewAnalysisReport>
    ) => {
      state.interviewAnalysis = action.payload;
    },
  },
});

// Export the actions
export const {
  setProductOverview,
  setMarketResearch,
  setUserResearch,
  addPersona,
  updatePersona,
  deletePersona,
  setGeneratedPersonas,
  addInterviewQuestion,
  updateInterviewQuestion,
  deleteInterviewQuestion,
  reorderInterviewQuestion,
  setGeneratedInterviewQuestions,
  addInterviewResponse,
  updateInterviewResponse,
  deleteInterviewResponse,
  setInterviewAnalysis,
} = productSlice.actions;

// Export the reducer to configure the store
export default productSlice.reducer;
