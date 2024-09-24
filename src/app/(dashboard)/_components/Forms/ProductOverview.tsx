"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { productOverviewSchema } from "@/schema/overviewSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux"; // Adjust import according to your store setup
import { setProductOverview } from "@/lib/redux/slices/productSlice"; // Action for saving the product overview

export default function ProductOverview({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch product overview from Redux store
  const productOverview = useSelector(
    (state: RootState) => state.product.productOverview
  );

  const dispatch = useDispatch();

  // Initialize form with values from Redux state
  const form = useForm<z.infer<typeof productOverviewSchema>>({
    resolver: zodResolver(productOverviewSchema),
    defaultValues: {
      productName: productOverview?.productName || "",
      productDescription: productOverview?.productDescription || "",
      productGoals: productOverview?.productGoals || "",
      targetAudience: productOverview?.targetAudience || "",
      valueProposition: productOverview?.valueProposition || "",
      keyFeatures: productOverview?.keyFeatures.join(", ") || "",
      additionalNotes: productOverview?.additionalNotes || "",
    },
  });

  const onSubmit = (data: z.infer<typeof productOverviewSchema>) => {
    console.log(data);

    // Dispatch the updated values to the Redux store
    dispatch(
      setProductOverview({
        ...data,
        additionalNotes: data.additionalNotes || "",
        keyFeatures: data.keyFeatures
          .split(",")
          .map((feature) => feature.trim()),
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Overview</DialogTitle>
          <DialogDescription>
            This is where you can edit the product overview details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* product name */}
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Quick Shop" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* product description */}
            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your product."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* product goals */}
            <FormField
              control={form.control}
              name="productGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are the goals of your product?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* target audience */}
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Who is your target audience?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* value proposition */}
            <FormField
              control={form.control}
              name="valueProposition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value Proposition</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What is the value proposition of your product?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* key features */}
            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List the key features of your product separated by commas."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* additional notes */}
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes here."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose className="gap-2">
                <Button variant={"secondary"} type="button">
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
