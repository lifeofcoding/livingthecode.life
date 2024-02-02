"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function addArticle({
  content,
  title,
  categories,
}: {
  content: string;
  title: string;
  categories: number[];
}) {
  try {
    const user = await getCurrentUser();

    if (!user || !user.isAdmin) {
      throw new Error("Unknown user tried creating an article.");
    }

    const connectCatgeories = categories.map((id) => ({ id }));

    const result = await db.article.create({
      data: {
        title,
        content,
        authorId: user.id,
        categories: {
          connect: connectCatgeories,
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
    const user = await getCurrentUser();

    if (!user || !user.isAdmin) {
      throw new Error("Unknown user tried creating an article.");
    }

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

export async function editCategory({
  id,
  title,
  content,
}: {
  id: number;
  title: string;
  content: string;
}) {
  try {
    const user = await getCurrentUser();

    if (!user || !user.isAdmin) {
      throw new Error("Unknown user tried creating an article.");
    }

    const result = await db.category.update({
      where: {
        id,
      },
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

export async function editArticle({
  id,
  title,
  content,

  categories,
}: {
  id: number;
  title: string;
  content: string;
  categories: number[];
}) {
  try {
    const user = await getCurrentUser();

    if (!user || !user.isAdmin) {
      throw new Error("Unknown user tried creating an article.");
    }

    const connectCatgeories = categories.map((id) => ({ id }));
    const result = await db.article.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        categories: {
          // connect: [{ id: Number(category) }], // Just connected new categories and doesn't remove existing ones
          set: connectCatgeories,
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
