import { Button } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface iAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

function EmptyState({ buttonText, description, href, title }: iAppProps) {
  return (
    <div className="flex flex-col flex-1 justify-center items-center h-full rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex justify-center items-center size-20 rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
        {description}
      </p>
      <Button asChild>
        <Link href={href}>
          <PlusCircle className="mr-2 size-4" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}

export default EmptyState;
