"use server";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parsWithZod } from "@conform-to/zod";
import { onboardingSchema } from "./lib/zodSchemas";

export async function OnboardingAction(prevSate: any, formData: FormData) {
  const session = await requireUser();

  const submission = parsWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });
}
