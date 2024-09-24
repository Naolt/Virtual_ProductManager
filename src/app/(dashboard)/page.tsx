"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "@radix-ui/react-icons";
import ProductOverview from "./_components/Forms/ProductOverview";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";

export default function OverviewPage() {
  // Replace this with the actual data from the store
  // Fetch product overview from Redux store
  const data = useSelector((state: RootState) => state.product.productOverview);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-end">
        <ProductOverview>
          <Button>Edit Overview</Button>
        </ProductOverview>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Welcome to {data.productName}</CardTitle>
          <CardDescription>{data.productDescription}</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Product Goals</CardTitle>
          <CardDescription>{data.productGoals}</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Target Audience</CardTitle>
          <CardDescription>{data.targetAudience}</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Value Proposition</CardTitle>
          <CardDescription>{data.valueProposition}</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
          <CardDescription>
            <ul>
              {data.keyFeatures.map((feature, index) => (
                <li key={index} className="flex gap-1 items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
          <CardDescription>{data.additionalNotes}</CardDescription>
        </CardHeader>
      </Card>
      <div className="w-full flex justify-end">
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
