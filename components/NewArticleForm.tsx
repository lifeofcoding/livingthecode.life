"use client";

import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { addArticle } from "@/app/actions";
import { Markdown } from "@/lib/markdown";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  category: z.string().nonempty({
    message: "Category must be selected.",
  }),
});

export function NewArticleForm({
  categories,
}: {
  categories: Partial<Category>[];
}) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await addArticle(values);

    if (result) {
      const firstCategory = result.categories[0];
      router.push(
        `/categories/${firstCategory.title.replaceAll(" ", "-")}/${result.id}`
      );
    }
  }

  const watchContent = form.watch("content");

  return (
    <div className="grid grid-cols-2">
      <div className="p-5 overflow-x-auto">
        <Markdown>{watchContent}</Markdown>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>New Article</CardTitle>
            <CardDescription>Add a new article</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardContent>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Article title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be the aricle display title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category for this article" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              value={`${category.id}`}
                              key={category.id}
                            >
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can create a new category
                        <Link href="/categories/new">here</Link>.
                      </FormDescription>
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
                        />
                      </FormControl>
                      <FormDescription>
                        This is the page content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
