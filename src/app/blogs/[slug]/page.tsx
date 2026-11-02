import { Container, Section } from "@/components/sectionComponants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GrFormNext } from "react-icons/gr";
import { blogsData } from "../blogData";
import { notFound } from "next/navigation";

interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateStaticParams() {
  const posts = await blogsData;

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const path = await params;
  const blogPost = blogsData.find((post) => post.slug === path.slug);

  if (!blogPost) {
    return {
      title: "page not found",
    };
  }

  // params is a Promise in this Next.js version, so build URLs from the awaited value.
  const url = `https://eazotel.com/blogs/${path.slug}`;
  const images = blogPost.src
    ? [{ url: `https://eazotel.com${blogPost.src}`, width: 1600, height: 1000, alt: blogPost.title }]
    : undefined;

  return {
    title: blogPost?.metadata.title,
    description: blogPost?.metadata.description,
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    openGraph: {
      title: blogPost?.metadata.title,
      description: blogPost?.metadata.description,
      url,
      siteName: "Eazotel",
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost?.metadata.title,
      description: blogPost?.metadata.description,
      images,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Blog({ params }: Params) {
  const path = await params;
  const blog = await blogsData.find((post) => post.slug === path.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main>
      <Section>
        <Container className="space-y-6">
          <p className="flex items-center gap-2 text-sm">
            <Link href="/blogs" className="text-primary">
              Blogs
            </Link>
            <GrFormNext /> {blog?.title}
          </p>
          {blog?.src && (
            <div className="w-full relative aspect-[4/2.5] max-w-5xl mx-auto rounded-2xl overflow-hidden">
              <Image
                src={blog?.src}
                alt={blog?.title}
                fill
                preload
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div
            className="data max-width"
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          />
        </Container>
      </Section>
    </main>
  );
}
