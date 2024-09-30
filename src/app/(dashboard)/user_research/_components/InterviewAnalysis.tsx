"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InterviewAnalysisReport } from "@/schema/analysisSchema";
import {
  ArrowRightIcon,
  CircleIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import SentimentChart from "./SentimentChart";
import FeatureRequestBarChart from "./FeatureRequestBarChart";
import { Button } from "@/components/ui/button";
import { report } from "@/types/analysisType";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import { PersonaType } from "@/types/personaType";
import { InterviewType } from "@/types/interviewReponseType";
import { useDispatch } from "react-redux";
import { setInterviewAnalysis } from "@/lib/redux/slices/productSlice";
import { CircleArrowRight } from "lucide-react";

export default function InterviewAnalysis() {
  const dispatch = useDispatch();

  const report = useSelector(
    (state: RootState) => state.product.interviewAnalysis
  );

  const productOverview = useSelector(
    (state: RootState) => state.product.productOverview
  );
  const marketResearch = useSelector(
    (state: RootState) => state.product.marketResearch
  );

  const personas = useSelector(
    (state: RootState) => state.product.userResearch
  );

  const interviewResponses = useSelector(
    (state: RootState) => state.product.interviewResponses
  );

  // If the necessary product information is missing, return null
  if (!productOverview || !marketResearch) {
    return null;
  }

  // Create the prompt by leveraging product overview and market research data
  const prompt = `
    The product is ${productOverview.productName}, which ${
    productOverview.productDescription
  }.
    It targets ${productOverview.targetAudience} and aims to achieve ${
    productOverview.productGoals
  }.
    The value proposition of the product is: ${
      productOverview.valueProposition
    }.
    Key features include: ${productOverview.keyFeatures.join(", ")}.
    
    Additional notes: ${productOverview.additionalNotes || "None provided"}.

    The market research highlights that current market trends include ${marketResearch?.marketTrends.currentTrends.join(
      ", "
    )}.
    Competitor analysis shows key competitors are ${marketResearch?.competitorAnalysis.competitors
      .map((c) => c.name)
      .join(", ")}.

    Here are the personas generated based on market research data: 
    ${personas?.personas
      .map((p: PersonaType) => {
        return `
        Persona: ${p.name}
        Demographics:{
          ${Object.entries(p.demographics).map(([key, value]) => {
            return `${key}: ${value}`;
          })}
        }
        Behaviors: ${p.behavior.join(", ")}
        needsAndGoals: ${p.needsAndGoals.join(", ")}
        painPoints: ${p.painPoints.join(", ")}
        motivations: ${p.motivations.join(", ")}
        interviewQuestions: ${p?.interviewQuestions?.join(", ")}
      `;
      })
      .join("\n")}.

    Here are the interview responses:
    ${interviewResponses
      ?.map((response: InterviewType) => {
        const persona = personas?.personas.find(
          (p) => p.id == response.personaType
        );
        return `
        Interviewee: ${response.name}
        Role: ${response.role}
        Industry: ${response.industry}
        Persona: ${persona?.name}
        Date: ${response.date}
        Interview Mode: ${response.interviewMode}
        Questions and Responses:
        ${response.questions
          .map((q) => {
            return `
            Question: ${q.questionText}
            Response: ${q.response}
          `;
          })
          .join("\n")}
      `;
      })
      .join("\n")}
      
    Analyze the interview data to generate insights and recommendations.
  `;

  const handleAnalyzeInterviewData = async () => {
    try {
      const response = await fetch("/user_research/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        const generatedReport = JSON.parse(data.output); // Parse the generated personas
        dispatch(setInterviewAnalysis(generatedReport)); // Dispatch to Redux
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!report) {
    return (
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Interview Analysis</CardTitle>
            <CardDescription>
              <p>No report </p>
            </CardDescription>
            <CardContent className="flex items-center justify-center">
              <Button onClick={handleAnalyzeInterviewData}>
                Analyze Interview Data
              </Button>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 flex justify-end">
        <Button onClick={handleAnalyzeInterviewData}>
          Analyze Interview Data
        </Button>
      </div>
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Interview Analysis</CardTitle>
          <CardDescription>
            <p>Date: {report.date}</p>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Key Themes</CardTitle>
          <CardDescription>
            <div className="grid grid-cols-12 gap-2">
              {report.keyThemes.map((theme) => (
                <div key={theme.theme} className="col-span-6">
                  <p className="font-medium text-sm ">{theme.theme}</p>
                  <ul>
                    {theme.details.map((detail) => (
                      <li key={detail} className=" flex items-top gap-1">
                        <CircleArrowRight color="red" size={32} className="" />
                        <p>{detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      {/* sentiment analysis */}
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
          <CardDescription>
            This chart shows the distribution of interview responses based on
            sentiment. {report.sentimentAnalysis.overallSentiment}
          </CardDescription>
          <CardContent>
            <SentimentChart sentimentData={report.sentimentAnalysis} />
          </CardContent>
        </CardHeader>
      </Card>

      {/* Persona Insights */}

      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Persona Insights</CardTitle>
          <CardDescription>
            <div className="grid grid-cols-12 gap-2">
              {report.personaInsights.map((insight) => (
                <div key={insight.persona} className="col-span-6">
                  <p className="font-medium text-sm">{insight.persona}</p>
                  <ul className=" px-2">
                    {insight.topConcerns.map((concern) => (
                      <li
                        key={concern}
                        className="text-sm flex items-center gap-1"
                      >
                        <ExclamationTriangleIcon />
                        {concern}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm flex gap-1 items-center text-green-400">
                    <InfoCircledIcon />
                    {insight.feedback}
                  </p>
                </div>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* actionableRecommendations */}

      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Actionable Recommendations</CardTitle>
          <CardDescription>
            <div className="grid grid-cols-12 gap-2">
              {report.actionableRecommendations.map((recommendation) => (
                <div key={recommendation.recommendation} className="col-span-6">
                  <p className="font-medium text-sm">
                    {recommendation.recommendation}
                  </p>
                  <p className="text-sm flex gap-1 items-center">
                    <CircleIcon />
                    {recommendation.details}
                  </p>
                  <p className="text-sm flex gap-1 items-center">
                    <InfoCircledIcon />
                    Priority: {recommendation.priority}
                  </p>
                </div>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Feature Request */}
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Feature Requests</CardTitle>
          <CardDescription>
            This chart shows the number of feature requests for different
            features.
          </CardDescription>
          <CardContent>
            <div className="grid grid-cols-12">
              <div className="col-span-6">
                Features:
                {report.quantitativeMetrics.featureRequests.map((req) => (
                  <div key={req.feature} className="flex gap-2">
                    <CircleIcon />
                    <p>{req.feature}</p>
                  </div>
                ))}
                Satisfaction Rate: {report.quantitativeMetrics.userSatisfaction}
                %
              </div>
              <div className="col-span-6">
                <FeatureRequestBarChart
                  requests={report.quantitativeMetrics.featureRequests}
                />
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
