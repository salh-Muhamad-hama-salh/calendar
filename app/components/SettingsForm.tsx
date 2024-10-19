"use client";

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
import { SubmitButton } from "./SubmitButtons";


function SettingsForm() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account settings!</CardDescription>
        </CardHeader>

        <form>
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Salih Mohammad" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <Input placeholder="test@test.com" />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Save Changes" />
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

export default SettingsForm;
