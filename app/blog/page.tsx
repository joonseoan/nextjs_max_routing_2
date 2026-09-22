import Link from "next/link";

function Blog() {
  return (
    <main>
      <h1>
        <Link href="/blog/post-1">Post 1</Link>
      </h1>
      <h1>
        <Link href="/blog/post-2">Post 2</Link>
      </h1>
    </main>
  )
}

export default Blog;