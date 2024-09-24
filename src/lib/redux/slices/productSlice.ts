import { MarketResearchType } from "@/types/marketResearchType";
import { ProductOverviewType } from "@/types/productOverview";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
  productOverview: ProductOverviewType | null;
  marketResearch: MarketResearchType | null;
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
  },
});

// Export the actions
export const { setProductOverview, setMarketResearch } = productSlice.actions;

// Export the reducer to configure the store
export default productSlice.reducer;
