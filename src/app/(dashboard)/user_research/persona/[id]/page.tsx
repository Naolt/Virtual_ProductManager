"use client";
import { RootState } from "@/lib/redux";
import { useDispatch, useSelector } from "react-redux";
import { PersonaCard } from "../../_components/PersonaList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InterViewQuestionType } from "@/types/personaType";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddQuestionForm from "./_components/AddQuestionForm";
import SingleInterviewQuestion from "./_components/SingleInterviewQuestion";
import GenerateQuestionForm from "./_components/GenerateQuestionForm";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [openGenerateQuestions, setOpenGenerateQuestions] = useState(false);

  const selectedPersona = useSelector((state: RootState) =>
    state.product.userResearch?.personas.find((persona) => persona.id === id)
  );

  if (!selectedPersona) {
    return <div>Persona not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {selectedPersona && <PersonaCard persona={selectedPersona} noAction />}
      <div className="flex gap-2 justify-end flex-1">
        <Button
          variant={"outline"}
          onClick={() => setOpenGenerateQuestions(true)}
        >
          Generate Questions
        </Button>
        <Button onClick={() => setOpenAddQuestion(true)}>Add Question</Button>
      </div>
      {/*  add question form */}
      <AddQuestionForm
        open={openAddQuestion}
        setOpen={setOpenAddQuestion}
        personaId={selectedPersona?.id}
      />
      {/*  generate questions form */}
      <GenerateQuestionForm
        open={openGenerateQuestions}
        setOpen={setOpenGenerateQuestions}
        persona={selectedPersona}
      />
      {/* List of questions */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-1">
            {selectedPersona?.interviewQuestions?.map((question) => (
              <SingleInterviewQuestion
                key={question.id}
                question={question}
                personaId={selectedPersona.id}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
