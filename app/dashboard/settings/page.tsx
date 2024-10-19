import SettingsForm from "@/app/components/SettingsForm";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });
  if (!data) {
    return notFound();
  }

  return data;
}

async function Settingsroute() {
  const session = requireUser();
  const data = await getData((await session).user?.id as string);

  return (
    <div>
      <SettingsForm
        email={data.email}
        fullname={data.name as string}
        profileImage={data.image as string}
      />
    </div>
  );
}

export default Settingsroute;
