"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function addArticle({
  content,
  title,
  category,
}: {
  content: string;
  title: string;
  category: string;
}) {
  try {
    const user = await getCurrentUser();

    if (!user || !user.isAdmin) {
      throw new Error("Unknown user tried creating an article.");
    }

    const result = await db.article.create({
      data: {
        title,
        content,
        authorId: user.id,
        categories: {
          connect: [{ id: Number(category) }],
        },
      },
      select: {
        id: true,
        categories: true,
      },
    });

    revalidatePath("/categories");

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function addCategory({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  try {
    const result = await db.category.create({
      data: {
        title,
        content,
      },
    });

    revalidatePath("/categories");

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}
