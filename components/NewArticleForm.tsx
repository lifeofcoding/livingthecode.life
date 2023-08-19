"use client";

import Link from "next/link";
import type { Category } from "@prisma/client";
import { ChangeEvent, useRef } from "react";
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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  categories: z.number().array().nonempty({
    message: "At least one category must be selected.",
  }),
});

export function NewArticleForm({
  categories,
  currentCategoryId,
}: {
  categories: Partial<Category> & { id: number; title: string }[];
  currentCategoryId: number;
}) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      categories: [currentCategoryId],
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

  function isChecked(categoryId: number) {
    return form.watch("categories").includes(categoryId);
  }

  const currentCategories = form.watch("categories");

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
              <CardContent className="space-y-3">
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
                  name="categories"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Category</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[250px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                                {currentCategories.length
                                  ? categories
                                      .filter((category) =>
                                        currentCategories.includes(category.id)
                                      )
                                      .map((category) => category.title)
                                      .join(", ")
                                  : "Select Categories"}
                              </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[250px] p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandEmpty>No Category found.</CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  value={category.title}
                                  key={category.id}
                                  onSelect={() => {
                                    const currentValues =
                                      form.getValues("categories");

                                    const hasValue = currentValues.includes(
                                      category.id
                                    );

                                    if (hasValue) {
                                      const values = currentValues.filter(
                                        (value: number) => value !== category.id
                                      );

                                      if (values.length) {
                                        form.setValue("categories", [
                                          values[0],
                                          ...values.slice(1),
                                        ]);
                                      }
                                      return;
                                    }

                                    form.setValue("categories", [
                                      ...currentValues,
                                      category.id,
                                    ]);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      isChecked(category.id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {form
                                    .getValues("categories")
                                    .includes(category.id)}
                                  {category.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
                          onChange={generateOnChangeEvent(field.onChange)}
                          ref={(e) => {
                            field.ref(e);
                            textareaRef.current = e;
                          }}
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
