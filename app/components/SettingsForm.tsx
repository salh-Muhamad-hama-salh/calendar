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
import { useFormState } from "react-dom";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingSchemas } from "../lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SettingsFormProps {
  fullname: string;
  email: string;
  profileImage: string;
}

function SettingsForm({ email, fullname, profileImage }: SettingsFormProps) {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [currentPrifileImage, setProfileImage] = React.useState(profileImage);
  const [form, fildes] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingSchemas,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setProfileImage("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account settings!</CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Label>Full Name</Label>
              <Input
                name={fildes.fullName.name}
                key={fildes.fullName.key}
                defaultValue={fullname}
                placeholder="Salih Mohammad"
              />
              <p className="text-red-500 text-sm">{fildes.fullName.errors}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <Input
                disabled
                defaultValue={email}
                placeholder="test@test.com"
              />
            </div>

            <div className="grid gap-y-5">
              <Label>Profile Image</Label>
              {currentPrifileImage ? (
                <div className="relative size-16">
                  <img
                    src={currentPrifileImage}
                    alt="profile image"
                    className="size-16 rounded-lg"
                  />
                  <Button
                    onClick={handleDeleteImage}
                    className="absolute -top-3 -right-3"
                    variant="destructive"
                    size="icon"
                    type="button"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <p>No image uploaded</p>
              )}
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
