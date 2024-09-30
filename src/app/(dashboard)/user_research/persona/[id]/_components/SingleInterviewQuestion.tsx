import { Button } from "@/components/ui/button";
import { deleteInterviewQuestion } from "@/lib/redux/slices/productSlice";
import { InterViewQuestionType } from "@/types/personaType";
import {
  DragHandleDots2Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

export default function SingleInterviewQuestion({
  question,
  personaId,
}: {
  question: InterViewQuestionType;
  personaId: string;
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteInterviewQuestion({ personaId, questionId: question.id }));
  };

  return (
    <li className="flex justify-between hover:bg-gray-100 py-2 px-4 cursor-grab transition-all ease-linear rounded-md">
      <div className="flex gap-2 items-center">
        <DragHandleDots2Icon />
        <span className="text-sm">{question.question}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon">
          <Pencil1Icon />
        </Button>
        <Button variant="outline" size="icon" onClick={handleDelete}>
          <TrashIcon />
        </Button>
      </div>
    </li>
  );
}
