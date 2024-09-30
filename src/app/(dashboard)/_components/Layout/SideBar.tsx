"use client";
import { cn } from "@/lib/utils";
import {
  DashboardIcon,
  MagnifyingGlassIcon,
  ResumeIcon,
} from "@radix-ui/react-icons";
import { Binoculars, FolderKanban, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  return (
    <aside className="w-72 bg-white p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-8 pl-4 mt-2">Virtual Manager</h2>
      <ul className="space-y-2">
        <li>
          <SingleNav href="/">
            <FolderKanban size={16} />
            Overview
          </SingleNav>
        </li>
        <li>
          <SingleNav href="/market_research">
            <Binoculars size={16} />
            Market Research
          </SingleNav>
        </li>
        <li>
          <SingleNav href="/user_research">
            <UserRoundSearch size={16} />
            User Research
          </SingleNav>
        </li>
      </ul>
    </aside>
  );
}

const SingleNav = ({ href, children }) => {
  const path = usePathname();
  let active = false;

  if (href === "/") {
    active = path === "/";
  } else if (path.includes(href)) {
    active = true;
  }

  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2 text-sm font-medium",
        active && "bg-gray-200"
      )}
    >
      {children}
    </Link>
  );
};
