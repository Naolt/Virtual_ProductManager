export type CompetitorType = {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  marketShare: string;
  pricingStrategy: string;
};

export type MarketResearchType = {
  competitorAnalysis: {
    competitors: CompetitorType[];
    summary: string;
  };
  marketTrends: {
    currentTrends: string[];
    futureProjections: string[];
  };
  marketSizeAndPotential: {
    totalAddressableMarket: string;
    serviceableAvailableMarket: string;
    growthRate: string;
    geographicBreakdown: {
      "North America": string;
      Europe: string;
      "Asia-Pacific": string;
      Other: string;
    };
  };
  opportunitiesAndThreats: {
    opportunities: string[];
    threats: string[];
  };
};
