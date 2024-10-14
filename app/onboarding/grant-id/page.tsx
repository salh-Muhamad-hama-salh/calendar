import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import VideoGif from "@/public/work-is-almost-over-happy.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";

function onboardingrouteTwo() {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>You are almost Done!</CardTitle>
          <CardDescription>
            You have to now connect your calender to your account.
          </CardDescription>
          <Image
            src={VideoGif}
            alt="almost-over-happy"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          {" "}
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" />
              Conenct Calender to your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default onboardingrouteTwo;
