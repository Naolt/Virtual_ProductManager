import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonaList from "./_components/PersonaList";
import ResponseList from "./_components/ResponseList";
import InterviewAnalysis from "./_components/InterviewAnalysis";

export default function UserResearchPage() {
  return (
    <Tabs defaultValue="Persona_Identification" className="w-full">
      <TabsList className="grid grid-cols-3 w-fit">
        <TabsTrigger value="Persona_Identification">
          Persona Identification
        </TabsTrigger>
        <TabsTrigger value="Interview_Responses">
          Interview Responses
        </TabsTrigger>
        <TabsTrigger value="Interview_Insights">Interview Insights</TabsTrigger>
      </TabsList>
      <Separator className="my-2" />
      <TabsContent value="Persona_Identification">
        <PersonaList />
      </TabsContent>
      <TabsContent value="Interview_Responses">
        <ResponseList />
      </TabsContent>
      <TabsContent value="Interview_Insights">
        <InterviewAnalysis />
      </TabsContent>
    </Tabs>
  );
}
