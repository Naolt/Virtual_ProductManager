"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/lib/redux";
import { setGeneratedPersonas } from "@/lib/redux/slices/productSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function GeneratePersonaForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const productOverview = useSelector(
    (state: RootState) => state.product.productOverview
  );
  const marketResearch = useSelector(
    (state: RootState) => state.product.marketResearch
  );

  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      additionalNotes: "",
    },
  });

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

    Please generate detailed user personas based on this context, reflecting the target audience for this product.
  `;

  // Define async function to handle persona generation and dispatching results
  async function onSubmit(values: { additionalNotes: string }) {
    // Include any additional notes provided in the form
    const finalPrompt = `${prompt} Additional context: ${values.additionalNotes}`;

    try {
      const response = await fetch("/user_research/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: finalPrompt }),
      });

      const data = await response.json();
      if (response.ok) {
        const generatedPersonas = JSON.parse(data.output); // Parse the generated personas
        dispatch(setGeneratedPersonas(generatedPersonas)); // Dispatch to Redux
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Generate Personas</DialogTitle>
          <DialogDescription>
            You can provide extra details that might help improve the accuracy
            of the generated personas. This could include specific traits,
            behaviors, or any preferences related to your target audience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-4"
          >
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Additional Context (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any specific notes, preferences, or details to tailor the persona generation..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="col-span-12">
              <Button variant={"secondary"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Generate Personas</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
