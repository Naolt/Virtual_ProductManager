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

import { Textarea } from "@/components/ui/textarea";
import { addPersona } from "@/lib/redux/slices/productSlice";
import { PersonaSchema } from "@/schema/personaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

export default function AddPersonaForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const samplePersona = {
    id: new Date().getTime().toString(),
    name: "Tech-Savvy Professional",
    demographics: {
      ageRange: "25-40",
      location: "Urban areas",
      jobTitle: "Software Engineer",
    },
    behavior: [
      "Uses tech tools daily for work",
      "Early adopter of new technology",
    ].join(", "),
    needsAndGoals: [
      "Looking for efficient productivity tools",
      "Seeks automation in routine tasks",
    ].join(", "),
    painPoints: [
      "Dislikes slow, outdated technology",
      "Frustrated by software bugs",
    ].join(", "),
    motivations: [
      "Values time-saving tools",
      "Wants reliable and user-friendly systems",
    ].join(", "),
  };

  const form = useForm({
    resolver: zodResolver(PersonaSchema),
    defaultValues: samplePersona || {
      id: new Date().getTime().toString(),
      name: "",
      demographics: {
        ageRange: "",
        location: "",
        jobTitle: "",
      },
      jobTitle: "",
      behavior: "",
      needsAndGoals: "",
      painPoints: "",
      motivations: "",
    },
  });

  function onSubmit(values: z.infer<typeof PersonaSchema>) {
    dispatch(
      addPersona({
        ...values,
        id: new Date().getTime().toString(),
        behavior: values.behavior.split(","),
        needsAndGoals: values.needsAndGoals.split(","),
        painPoints: values.painPoints.split(","),
        motivations: values.motivations.split(","),
      })
    );
    //console.log("values", values);
    modalCloseRef.current?.click();
  }

  const modalCloseRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Persona</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tech-Savvy Professional" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="demographics.ageRange"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Age Range</FormLabel>
                  <FormControl>
                    <Input placeholder="25-40" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="demographics.location"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Urban areas" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="demographics.jobTitle"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="behavior"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Behavior</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Uses tech tools daily for work (separate with commas)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="needsAndGoals"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Needs and Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Looking for efficient productivity tools (separate with commas)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="painPoints"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Pain Points</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dislikes slow, outdated technology (separate with commas)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motivations"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Motivations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Values time-saving tools (separate with commas)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="col-span-12">
              <DialogClose>
                <Button variant={"secondary"} ref={modalCloseRef}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
