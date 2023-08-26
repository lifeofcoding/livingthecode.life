"use client";

import { ChangeEvent, useRef } from "react";
import type { Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { addCategory } from "@/app/actions";
import { Markdown } from "@/lib/markdown";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z
    .string()
    .min(10, {
      message: "Content must be at least 10 characters.",
    })
    .max(10000, {
      message: "Content must be less than 100000 characters.",
    }),
});

export function NewCategoryForm({
  categories,
}: {
  categories: Partial<Category>[];
}) {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<string>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (categories.find((category) => category.title === values.title)) {
      setFormErrors("Category already exists");
      return;
    }

    const result = await addCategory(values);

    if (result) {
      router.push(`/categories/${result.title.replaceAll(" ", "-")}`);
    } else {
      setFormErrors("Category already exists");
    }
  }

  const watchContent = form.watch("content");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const generateOnChangeEvent = (onChange: (...event: any[]) => void) => {
    return (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event);
      if (textareaRef.current) {
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    };
  };

  return (
    <div className="grid grid-cols-2">
      <div className="p-5 overflow-x-auto">
        <Markdown>{watchContent}</Markdown>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>New Category</CardTitle>
            <CardDescription>Add a new category</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardContent className="space-y-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Category title" {...field} />
                      </FormControl>
                      <FormDescription>This has to be unique.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your content here."
                          {...field}
                          onChange={generateOnChangeEvent(field.onChange)}
                          ref={(e) => {
                            field.ref(e);
                            textareaRef.current = e;
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be in markdown{" "}
                        {watchContent.length
                          ? `(${watchContent.length} characters)`
                          : ""}
                      </FormDescription>
                      <FormMessage />
                      {formErrors ? (
                        <p className="text-sm font-medium text-destructive">
                          {formErrors}
                        </p>
                      ) : null}
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
