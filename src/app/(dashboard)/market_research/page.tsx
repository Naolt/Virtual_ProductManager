"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState } from "@/lib/redux";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMarketResearch } from "@/lib/redux/slices/productSlice"; // Action for saving the product overview
import CompetitorTable from "./_components/CompetitorTable";
import {
  ArrowTopRightIcon,
  CheckCircledIcon,
  LightningBoltIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export default function MarketResearchPage() {
  // Define a prompt for the model to generate market research from the given product overview
  // Fetch product overview from Redux store
  const productOverview = useSelector(
    (state: RootState) => state.product.productOverview
  );

  const marketResearch = useSelector(
    (state: RootState) => state.product.marketResearch
  );

  const dispatch = useDispatch();

  // Define an asynchronous function to send POST request to our api
  const generateText = async () => {
    if (!productOverview) {
      return;
    }

    const prompt = `The product is a ${productOverview.productName} that ${
      productOverview.productDescription
    }. The product goals are ${
      productOverview.productGoals
    }. The target audience is ${
      productOverview.targetAudience
    }. The value proposition is ${
      productOverview.valueProposition
    }. The key features are ${productOverview.keyFeatures.join(
      ", "
    )}. Additional notes: ${productOverview.additionalNotes}.

      prompt: Generate market research for the product.
    
      `;

    try {
      // use the fetch method to send an http request to /api/generate endpoint
      const response = await fetch("/market_research/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      // Waits for the response to be converted to JSON format and stores it in the data variable
      const data = await response.json();

      //  If successful, updates the output state with the output field from the response data
      console.log("data", data);
      if (response.ok) {
        const res = JSON.parse(data.output);
        dispatch(setMarketResearch(res));
      } else {
        console.log("Error:", data);
      }

      // Catches any errors that occur during the fetch request
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 flex justify-end gap-2">
        <Button onClick={generateText} variant={"outline"}>
          Generate Market Research
        </Button>
        <Button>Edit Market Research</Button>
      </div>
      {/* Title */}
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>
            Market Research for {productOverview?.productName}
          </CardTitle>
          <CardDescription>
            The market research for the product is as follows:
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Competitor analysis */}
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>
            Competitor Analysis for {productOverview?.productName}
          </CardTitle>
          <CardDescription>
            {marketResearch?.competitorAnalysis.summary}
          </CardDescription>
          <CardContent>
            {marketResearch?.competitorAnalysis && (
              <CompetitorTable
                competitors={marketResearch.competitorAnalysis.competitors}
              />
            )}
          </CardContent>
        </CardHeader>
      </Card>
      {/* Market Trend */}
      {/* Current Trend */}

      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Current Trends</CardTitle>
          <CardDescription>
            <ul>
              {marketResearch?.marketTrends.currentTrends.map(
                (trend, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-start"
                  >
                    <ArrowTopRightIcon className="h-4 w-4 text-black" />
                    {trend}
                  </li>
                )
              )}
            </ul>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Future Projections</CardTitle>
          <CardDescription>
            <ul>
              {marketResearch?.marketTrends.currentTrends.map(
                (trend, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-start"
                  >
                    <LightningBoltIcon className="h-4 w-4 text-black" />
                    {trend}
                  </li>
                )
              )}
            </ul>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* totalAddressableMarket: string;
    serviceableAvailableMarket: string;
    growthRate: string;  let's display them in 3 cards */}

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Total Addressable Market</CardTitle>
          <CardDescription>
            {marketResearch?.marketSizeAndPotential.totalAddressableMarket}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Serviceable Available Market</CardTitle>
          <CardDescription>
            {marketResearch?.marketSizeAndPotential.serviceableAvailableMarket}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Growth Rate</CardTitle>
          <CardDescription>
            {marketResearch?.marketSizeAndPotential.growthRate}
          </CardDescription>
        </CardHeader>
      </Card>
      {/* geographicBreakdown */}
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Geographic Breakdown</CardTitle>
          <CardDescription>
            <ul>
              {Object.entries(
                marketResearch?.marketSizeAndPotential.geographicBreakdown || {}
              ).map(([key, value], index) => (
                <li key={index} className="flex items-center gap-2 text-start">
                  <ArrowTopRightIcon className="h-4 w-4 text-black" />
                  {key}: {value}
                </li>
              ))}
            </ul>
          </CardDescription>
        </CardHeader>
      </Card>
      {/* opportunitiesAndThreats */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Opportunities</CardTitle>
          <CardDescription>
            <ul>
              {marketResearch?.opportunitiesAndThreats.opportunities.map(
                (opportunity, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-start"
                  >
                    <CheckCircledIcon className="h-4 w-4 text-black" />
                    {opportunity}
                  </li>
                )
              )}
            </ul>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Threats</CardTitle>
          <CardDescription>
            <ul>
              {marketResearch?.opportunitiesAndThreats.threats.map(
                (threat, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-start"
                  >
                    <QuestionMarkCircledIcon className="h-4 w-4 text-black" />
                    {threat}
                  </li>
                )
              )}
            </ul>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
