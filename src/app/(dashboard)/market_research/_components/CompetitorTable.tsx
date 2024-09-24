"use client";

import { CompetitorType } from "@/types/marketResearchType";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CompetitorTable({
  competitors,
}: {
  competitors: Array<CompetitorType>;
}) {
  return (
    <Table>
      <TableCaption>A list of your competitors.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Market Share</TableHead>
          <TableHead>Pricing Strategy</TableHead>
          <TableHead>Strengths</TableHead>
          <TableHead>Weaknesses</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {competitors.map((competitor) => (
          <TableRow key={competitor.name}>
            <TableCell className="font-medium">{competitor.name}</TableCell>
            <TableCell>{competitor.description}</TableCell>
            <TableCell>{competitor.marketShare}</TableCell>
            <TableCell>{competitor.pricingStrategy}</TableCell>
            <TableCell>{competitor.strengths.join(", ")}</TableCell>
            <TableCell>{competitor.weaknesses.join(", ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Competitors</TableCell>
          <TableCell className="text-right">{competitors.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
