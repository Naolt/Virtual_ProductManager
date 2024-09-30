"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonaType } from "@/types/personaType";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import AddPersonaForm from "./AddPersonaForm";
import { useDispatch, useSelector } from "react-redux";
import { deletePersona, ProductState } from "@/lib/redux/slices/productSlice";
import { RootState } from "@/lib/redux";
import GeneratePersonaForm from "./GeneratePersonaForm";
import { useState } from "react";
import Link from "next/link";

const personaExample: PersonaType = {
  id: "1",
  name: "Tech-Savvy Professional",
  demographics: {
    ageRange: "25-40",
    location: "Urban areas",
    jobTitle: "Software Engineer",
  },
  behavior: [
    "Uses tech tools daily for work",
    "Early adopter of new technology",
  ],
  needsAndGoals: [
    "Looking for efficient productivity tools",
    "Seeks automation in routine tasks",
  ],
  painPoints: [
    "Dislikes slow, outdated technology",
    "Frustrated by software bugs",
  ],
  motivations: [
    "Values time-saving tools",
    "Wants reliable and user-friendly systems",
  ],
};

export default function PersonaList() {
  const personas = useSelector(
    (state: RootState) => state.product.userResearch?.personas
  );
  const [showAddPersonaForm, setShowAddPersonaForm] = useState(false);

  return (
    <div className="grid grid-cols-12 w-full gap-2">
      <div className="col-span-12 flex justify-end gap-2">
        <Button variant={"outline"} onClick={() => setShowAddPersonaForm(true)}>
          Generate Persona
        </Button>
        <GeneratePersonaForm
          open={showAddPersonaForm}
          setOpen={setShowAddPersonaForm}
        />
        <AddPersonaForm>
          <Button>Add Persona</Button>
        </AddPersonaForm>
      </div>
      {personas?.map((persona: PersonaType) => (
        <PersonaCard key={persona.id} persona={persona} />
      ))}
    </div>
  );
}

export function PersonaCard({
  persona,
  noAction,
}: {
  persona: PersonaType;
  noAction?: boolean;
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePersona(persona.id));
  };

  return (
    <Link href={`/user_research/persona/${persona.id}`} className="col-span-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h2>{persona.name}</h2>
            <div className="flex gap-2">
              <Button variant={"outline"} size={"icon"}>
                <Pencil1Icon className="cursor-pointer" />
              </Button>
              {!noAction && (
                <Button variant="outline" size="icon" onClick={handleDelete}>
                  <TrashIcon className="cursor-pointer" />
                </Button>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            <p>
              <strong>Age Range:</strong> {persona.demographics.ageRange}
            </p>
            <p>
              <strong>Location:</strong> {persona.demographics.location}
            </p>
            <p>
              <strong>Job Title:</strong> {persona.demographics.jobTitle}
            </p>
            <p>
              <strong>Behavior:</strong> {persona?.behavior.join(", ")}
            </p>
            <p>
              <strong>Needs and Goals:</strong>{" "}
              {persona?.needsAndGoals.join(", ")}
            </p>
            <p>
              <strong>Pain Points:</strong> {persona?.painPoints.join(", ")}
            </p>
            <p>
              <strong>Motivations:</strong> {persona?.motivations.join(", ")}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
