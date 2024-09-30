"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import AddResponseForm from "./AddResponseForm";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import { InterviewType } from "@/types/interviewReponseType";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { deleteInterviewResponse } from "@/lib/redux/slices/productSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ResponseList() {
  const [open, setOpen] = useState(false);
  const [personaFilter, setPersonaFilter] = useState<string>("All Persona");

  const personas =
    useSelector((state: RootState) => state.product.userResearch?.personas) ||
    [];

  const responses =
    useSelector((state: RootState) => state.product.interviewResponses) || [];

  const filteredResponses = useMemo(() => {
    if (personaFilter === "All Persona") {
      return responses.map((response) => {
        const persona = personas.find((p) => p.id === response.personaType);
        return {
          ...response,
          personaType: persona?.name || response.personaType,
        };
      });
    }
    return responses
      .filter((response) => response.personaType === personaFilter)
      .map((response) => {
        const persona = personas.find((p) => p.id === response.personaType);
        return {
          ...response,
          personaType: persona?.name || response.personaType,
        };
      });
  }, [personaFilter, responses]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <AddResponseForm open={open} setOpen={setOpen} />
      </div>
      <div className="flex justify-between">
        <div>
          <Select onValueChange={setPersonaFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Persona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"All Persona"}>All Personas</SelectItem>
              {personas.map((persona) => (
                <SelectItem value={persona.id} key={persona.id}>
                  {persona.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setOpen(true)}>Add Response</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interview Responses</CardTitle>
          <CardDescription>
            {filteredResponses.length === 0 ? (
              <p>No responses available.</p>
            ) : (
              filteredResponses.length + " responses available."
            )}
          </CardDescription>
          <CardContent>
            <ResponseTable responses={filteredResponses} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

export function ResponseTable({ responses }: { responses: InterviewType[] }) {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    // Dispatch deleteInterviewResponse action
    dispatch(deleteInterviewResponse(id));
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Persona Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Interview Mode</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {responses.length > 0 ? (
          responses.map((response) => (
            <TableRow key={response.id}>
              <TableCell>{response.name}</TableCell>
              <TableCell>{response.role}</TableCell>
              <TableCell>{response.industry}</TableCell>
              <TableCell>{response.personaType}</TableCell>
              <TableCell>{response.date}</TableCell>
              <TableCell>{response.interviewMode}</TableCell>
              <TableCell className="flex gap-1">
                <Button size={"icon"} variant={"outline"}>
                  <Pencil1Icon />
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => handleDelete(response.id)}
                >
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7}>
              <p className="text-center">No interview responses available</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
