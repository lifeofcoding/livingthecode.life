"use client";

import { ChangeEvent, useLayoutEffect, useRef } from "react";
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
import { editCategory } from "@/app/actions";
import { Markdown } from "@/lib/markdown";
import { useState } from "react";

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

export function EditCategoryForm({
  categories,
  data,
}: {
  categories: Partial<Category>[];
  data: {
    id: number;
    title: string;
    content: string;
  };
}) {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<string>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id,
      title: data.title,
      content: data.content,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      categories.find(
        (category) =>
          category.title === values.title && category.id !== values.id
      )
    ) {
      setFormErrors("Category already exists");
      return;
    }

    const result = await editCategory(values);

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

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [textareaRef]);

  return (
    <div className="grid grid-cols-2">
      <div className="p-5 overflow-x-auto">
        <Markdown>{watchContent}</Markdown>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Edit Category</CardTitle>
            <CardDescription>Edit an existing category</CardDescription>
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
                      <FormDescription>Must be in markdown</FormDescription>
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
