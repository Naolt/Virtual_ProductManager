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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/lib/redux";
import { addInterviewResponse } from "@/lib/redux/slices/productSlice";
import { interviewDataSchema } from "@/schema/interviewResponseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { z } from "zod";

export default function AddResponseForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const personas = useSelector(
    (state: RootState) => state.product.userResearch?.personas
  );

  const dispatch = useDispatch();

  const personaOptions = personas?.map((persona) => ({
    value: persona.id,
    label: persona.name,
  }));

  const form = useForm<z.infer<typeof interviewDataSchema>>({
    resolver: zodResolver(interviewDataSchema),
    defaultValues: {
      name: "",
      role: "",
      industry: "",
      personaType: "",
      date: new Date().toISOString().split("T")[0],
      interviewMode: "in-person",
      questions: [],
    },
  });

  useEffect(() => {
    const persona = personas?.find((p) => p.id === form.watch("personaType"));

    if (persona && persona.interviewQuestions) {
      const questions = persona.interviewQuestions.map((q) => ({
        questionId: q.id.toString(),
        questionText: q.question,
        response: "", // or set this to a default value if needed
      }));

      form.setValue("questions", questions);
    } else {
      form.setValue("questions", []); // Reset to an empty array if no questions
    }
  }, [form.watch("personaType")]);

  const onSubmit = (values: z.infer<typeof interviewDataSchema>) => {
    //console.log(values, "values");
    console.log("Error", form.formState.errors);
    dispatch(
      addInterviewResponse({
        ...values,
        id: Math.random().toString(36).substr(2, 9),
      })
    );
    setOpen(false);
  };

  console.log("Error", form.formState.errors);

  const responses = [
    "My typical week involves working from home, taking care of my family, and running errands.",
    "I usually spend about an hour or two on grocery shopping every week.",
    "The biggest pain points for me are dealing with crowds, long lines, and finding parking.",
    "I use mobile apps for most of my daily tasks, from ordering food to booking transportation.",
    "I would definitely be interested in a grocery delivery service that can deliver within an hour.",
    "I think using a mobile app to manage grocery shopping could be a great idea. It would help me stay organized and avoid forgetting items.",
    "Having access to fresh, high-quality groceries is very important to me. I like to support local farmers and eat healthy food.",
    "When choosing a grocery store or delivery service, factors like price, product selection, and convenience are most important. I also value good customer service.",
    "I'm familiar with a few grocery delivery services. I like the convenience of having groceries delivered to my door, but sometimes the prices can be higher than shopping in-store.",
    "I would be willing to pay a reasonable fee for grocery delivery, especially if it saves me time and effort.",
  ];

  const handleWithSampleResponse = () => {
    for (let i = 0; i < responses.length; i++) {
      form.setValue(`questions.${i}.response`, responses[i]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[90vw] max-h-[600px] overflow-y-auto">
        {/*<DialogHeader>
          <DialogTitle>Add Response</DialogTitle>
        </DialogHeader>*/}
        {/*<DialogHeader>
          <DialogTitle>Add Persona</DialogTitle>
        </DialogHeader>*/}
        <DialogHeader>
          <DialogTitle>Add Response</DialogTitle>
          <DialogDescription>
            Add a new interview response to the list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* respondent info and other */}
            <div className="col-span-5 grid grid-cols-12 gap-4 h-fit">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Tech" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personaType"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select persona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {personaOptions?.map((persona) => (
                          <SelectItem key={persona.value} value={persona.value}>
                            {persona.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interviewMode"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Interview Mode</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In-person</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator orientation="vertical" className="col-span-1" />
            {/* questions */}
            <div className="col-span-5">
              <div className="grid gap-2">
                {form.watch("questions")?.map((question, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`questions.${index}.response`}
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>{question.questionText}</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Response" {...field} />
                        </FormControl>
                        <FormMessage>
                          {
                            form.formState.errors.questions?.[index]?.response
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                )) || (
                  <div className="flex h-full w-full items-center justify-center px-6">
                    The selected persona does not have any interview questions.
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="col-span-12">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
              <Button onClick={handleWithSampleResponse} variant={"ghost"}>
                Use Sample Response
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
