import React from "react";
import { requireUser } from "../lib/hooks";
import prisma from "../lib/db";
import { notFound } from "next/navigation";
import EmptyState from "../components/EmptyState";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          deration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below"
          buttonText="Add event type"
          href="/dashboard/new"
        />
      ) : (
        <p>hey we have event types</p>
      )}
    </>
  );
}

export default DashboardPage;
