async function BlogSub({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;

  return <main>
    <p>Blog Post</p>
    <p>{slug}</p>
  </main>
}

export default BlogSub;