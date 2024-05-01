import { client, urlFor } from "@/lib/sanity";
import { url } from "inspector";
import { PortableText } from "next-sanity";
import Image from "next/image";
interface BlogData {
  currentslug: string;
  title: string;
  content: string;
  titleImage: string;
}


async function getData(slug: string): Promise<BlogData | null> {
  const query = `*[_type =="blog" && slug.current=='${slug}'] {
    currentslug,
    title,
    content,
    titleImage
  }[0]`;
  
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return null;
  }
}

export default async function Blogdata({ params }: { params: { slug: string } }) {
  const data: BlogData | null = await getData(params.slug);

  if (!data) {
    // Handle case where data is null
    return <div>Data not found</div>;
  }

  // console.log(data);

  return (
    <>
      <div className="mt-8">
        <h1>
          <span className="block text-center text-base text-primary
          font-semibold uppercase tracking-wide">Chohan Blog</span>
          <span className="mt-2 block text-3xl text-center leading-8 font-bold -tracking-tight sm:text-4xl">
          {data.title}
          </span>
        </h1>
        <Image 
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
        />
        <div className="mt-16 prose prose-blue prose-xl dark:prose-invert">
        <PortableText value={data.content}/>
        </div>
      </div>
    </>
  );
}
