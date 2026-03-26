import { Divider } from "@/components/Divider";
import { getAllPosts } from "@/lib/blog";
import { createFileRoute } from "@tanstack/react-router";
import { FaLongArrowAltLeft } from "react-icons/fa";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
  loader: () => {
    return {
      posts: getAllPosts(),
    };
  },
});

function RouteComponent() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" aria-label="Back" className="">
          <div className="p-2 border w-fit bg-white/10 rounded-md">
            <FaLongArrowAltLeft className="text-white" />
          </div>
        </a>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Blog & Articles
          </h1>
        </header>
        <main>
          <ul className="flex flex-col gap-8">
            {posts.map((post) => (
              <>
                <li key={post.slug}>
                  <article>
                    <h2 className="flex items-center justify-between">
                      <a
                        href={"/blog/" + post.slug}
                        className="text-accent font-semibold text-xl"
                      >
                        {post.meta.title}
                      </a>
                      <small>{post.meta.date}</small>
                    </h2>

                    <p className="text-white/40">{post.meta.description}</p>
                  </article>
                </li>
                <Divider />
              </>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
