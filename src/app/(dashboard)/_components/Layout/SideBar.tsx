import {
  DashboardIcon,
  MagnifyingGlassIcon,
  ResumeIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function SideBar() {
  return (
    <aside className="w-72 bg-white p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-8 pl-4 mt-2">Virtual Manager</h2>
      <ul className="space-y-2">
        <li>
          <SingleNav href="/">
            <DashboardIcon fontSize={28} />
            Overview
          </SingleNav>
        </li>
        <li>
          <SingleNav href="/market_research">
            <MagnifyingGlassIcon fontSize={28} />
            Market Research
          </SingleNav>
        </li>
        <li>
          <SingleNav href="/user_research">
            <ResumeIcon fontSize={28} />
            User Research
          </SingleNav>
        </li>
      </ul>
    </aside>
  );
}

const SingleNav = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2 text-sm font-medium"
    >
      {children}
    </Link>
  );
};
