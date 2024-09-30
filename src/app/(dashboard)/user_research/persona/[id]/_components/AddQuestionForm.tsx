import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { addInterviewQuestion } from "@/lib/redux/slices/productSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

export default function AddQuestionForm({
  personaId,
  open,
  setOpen,
}: {
  personaId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const schema = z.object({
    question: z.string().min(1, "Question is required"),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = (values: { question: string }) => {
    dispatch(
      addInterviewQuestion({
        personaId,
        question: values.question,
      })
    );
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-4"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the question you would like to ask during the interview..."
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
              <Button type="submit">Add Question</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
