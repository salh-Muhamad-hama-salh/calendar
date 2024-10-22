"use server";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemaValidation, settingSchemas } from "./lib/zodSchemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function OnboardingAction(prevSate: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("username") as string,
          },
        });
        return !existingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.username,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            {
              day: "MONDAY",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "TUESDAY",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "WEDNESDAY",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "THURSDAY",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "FRIDAY",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "SATURDAY",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "SUNDAY",
              fromTime: "08:00",
              tillTime: "18:00",
            },
          ],
        },
      },
    },
  });
  return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: settingSchemas,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const user = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });
  return redirect("/dashboard");
}

export async function updateAvailabilityAction(formData: FormData) {
  const session = await requireUser();

  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");

      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );
    revalidatePath("/dashboard/availability");
  } catch (error) {
    console.log(error);
  }
}
