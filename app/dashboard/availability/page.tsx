import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { times } from "@/app/lib/times";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";
import React from "react";

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

async function AvailabilityRoute() {
  const sesstion = await requireUser();
  const data = await getData(sesstion.user?.id as string);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>
            In this section you can manage your availability!
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="flex flex-col gap-y-4">
            {data.map((item) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
                key={item.id}
              >
                <div className="flex items-center gap-x-3">
                  <Switch defaultChecked={item.isActive} />
                  <p>{item.day}</p>
                </div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="From Time"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem key={time.id} value={time.time}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </form>
      </Card>
    </>
  );
}

export default AvailabilityRoute;
