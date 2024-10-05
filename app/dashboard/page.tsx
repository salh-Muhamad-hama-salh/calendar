import React from "react";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }
  return <div>DashboardPage</div>;
}

export default DashboardPage;
