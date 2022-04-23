import React, { FC } from 'react'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { majorScale, Pane, Heading, Spinner } from 'evergreen-ui'
import matter from 'gray-matter'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Post } from '../../types'
import Container from '../../components/container'
import HomeNav from '../../components/homeNav'
import { posts as postsFromCMS } from '../../content'
import path from 'path'
import fs from 'fs'

const BlogPost: FC<Post> = ({ source, frontMatter }) => {
  const content = hydrate(source)
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Pane width="100%" height="100%">
        <Spinner size={48} />
      </Pane>
    )
  }
  return (
    <Pane>
      <Head>
        <title>{`Scribr Blog | ${frontMatter.title}`}</title>
        <meta name="description" content={frontMatter.summary} />
      </Head>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          <Heading fontSize="clamp(2rem, 8vw, 6rem)" lineHeight="clamp(2rem, 8vw, 6rem)" marginY={majorScale(3)}>
            {frontMatter.title}
          </Heading>
          <Pane>{content}</Pane>
        </Container>
      </main>
    </Pane>
  )
}

BlogPost.defaultProps = {
  source: '',
  frontMatter: { title: 'default title', summary: 'summary', publishedOn: '' },
}

// at the bottom
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)
  const paths = filenames.map((name) => ({ params: { slug: name.replace('.mdx', '') } }))
  // dont get paths for cms posts, instead, let fallback handle it
  return { paths, fallback: true }
}

/**
 * Need to get the paths here
 * then the the correct post for the matching path
 * Posts can come from the fs or our CMS
 */

export async function getStaticProps({ params, preview }) {
  let postFile
  // is the slug for a file system post or cms post
  try {
    const postPath = path.join(process.cwd(), 'posts', `${params.slug}.mdx`)
    postFile = fs.readFileSync(postPath, 'utf-8')
  } catch {
    // check that cookie
    const collection = preview ? postsFromCMS.draft : postsFromCMS.published
    postFile = collection.find((p) => {
      const { data } = matter(p)
      return data.slug === params.slug
    })
  }

  if (!postFile) {
    throw new Error('no post')
  }

  const { content, data } = matter(postFile)
  const mdxSource = await renderToString(content, { scope: data })

  return { props: { source: mdxSource, frontMatter: data }, revalidate: 30 }
}
export default BlogPost
