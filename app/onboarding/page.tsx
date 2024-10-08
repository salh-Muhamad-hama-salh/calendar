import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormState } from "react-dom";
import { OnboardingAction } from "../actions";
import { useForm } from "@conform-to/react";

function OnboardingRoute() {
  const [lastResult, action] = useFormState(OnboardingAction , undefined);

  const [form , fields] = useForm({
    
  });
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to <span className="text-primary">Salih Calender</span>
          </CardTitle>
          <CardDescription>
            We need the following infomation to set up your profile!
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input placeholder="Salih Mohammed" />
            </div>
            <div className="grid gap-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Salih.com/
                </span>
                <Input
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default OnboardingRoute;
