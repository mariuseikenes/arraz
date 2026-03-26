import type { ComponentType } from "react";

export type BlogMeta = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  published?: boolean;
};

type BlogModule = {
  default: ComponentType;
  meta: BlogMeta;
};

const postModules = import.meta.glob("../content/blog/*.mdx", {
  eager: true,
}) as Record<string, BlogModule>;

export type BlogPost = {
  slug: string;
  meta: BlogMeta;
  Component: ComponentType;
};

function getSlugFromPath(path: string) {
  return path.split("/").pop()?.replace(/\.mdx$/, "") ?? "";
}

export function getAllPosts(): BlogPost[] {
  return Object.entries(postModules)
    .map(([path, mod]) => ({
      slug: getSlugFromPath(path),
      meta: mod.meta,
      Component: mod.default,
    }))
    .filter((post) => post.meta.published !== false)
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
    );
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}