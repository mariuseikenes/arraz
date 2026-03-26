import { getPostBySlug } from "@/lib/blog";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { MDXProvider } from "@mdx-js/react";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);

    if (!post) {
      throw notFound();
    }

    return { post };
  },
});

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} />,
};

function RouteComponent() {
  const { post } = Route.useLoaderData();
  const PostComponent = post.Component;

  return (
    <main>
      <article>
        <a href="/blog" aria-label="Back">
          <div className="p-2 border w-fit bg-white/10 rounded-md md:ml-16 ml-8 text-white">
            Go Back
          </div>
        </a>
        <MDXProvider components={mdxComponents}>
          <article
            className="prose prose-invert mx-auto px-8 cprose"
          >
            <PostComponent />
          </article>
        </MDXProvider>
      </article>
    </main>
  );
}
