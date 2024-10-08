"use client";
import { CalendarCheck, HomeIcon, Settings, User2 } from "lucide-react";
import Link from "next/link";

import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardLinksProps {
  id: number;
  name: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardLinks: DashboardLinksProps[] = [
  {
    id: 0,
    name: "Event Types",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: User2,
  },
  {
    id: 2,
    name: "Availability",
    href: "/dashboard/availability",
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function DashboardLinks() {
  const Pathname = usePathname();
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          className={cn(
            Pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
          key={link.id}
          href={link.href}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
}

export default DashboardLinks;
