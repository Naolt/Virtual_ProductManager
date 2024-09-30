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
import { setGeneratedInterviewQuestions } from "@/lib/redux/slices/productSlice";
import { PersonaType } from "@/types/personaType";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function GenerateQuestionForm({
  open,
  setOpen,
  persona,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  persona: PersonaType;
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
	The persona being targeted is ${persona.name}, who is a ${
    persona.demographics.ageRange
  } ${persona.demographics.location} ${persona.demographics.jobTitle}, 
	the behavior of this persona includes ${persona.behavior.join(
    ", "
  )}, their needs and goals are ${persona.needsAndGoals.join(
    ", "
  )}, their pain points are ${persona.painPoints.join(
    ", "
  )}, and their motivations are ${persona.motivations.join(", ")} 
	.

    Based on this information, please generate interview questions to better understand the user's needs and goals.
  `;

  // Define async function to handle persona generation and dispatching results
  async function onSubmit(values: { additionalNotes: string }) {
    // Include any additional notes provided in the form
    const finalPrompt = `${prompt} Additional context: ${values.additionalNotes}`;

    try {
      const response = await fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: finalPrompt }),
      });

      const data = await response.json();
      if (response.ok) {
        const generatedQuestions = JSON.parse(data.output); // Parse the generated personas
        dispatch(
          setGeneratedInterviewQuestions({
            personaId: persona.id,
            questions: generatedQuestions,
          })
        ); // Dispatch to Redux
        setOpen(false); // Close the dialog
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
          <DialogTitle>Generate Interview Questions</DialogTitle>
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
                      placeholder="Entry any interview question type or specific questions you would like to ask during the user research interviews...
			"
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
              <Button type="submit">Generate Questions</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
