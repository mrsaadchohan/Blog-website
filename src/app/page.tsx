import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "@/lib/sanity";
import { blogs } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

async function getData()
{
  const query=`*[_type =="blog"]
  {
    title,
    titleImage,
    smalldescription,
    "currentslug":slug.current
  }`
  const data= await client.fetch(query);
  return data;
}

export default async function Home() {
    const data:blogs[]=await getData();
    // console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {data.map((post,index)=>
      {
        return(
         <Card key={index}>
           <Image
            src={urlFor(post.titleImage).url()}
            alt={'abc'}
            width={500}
            height={500}
            className=" object-fill rounded-t-lg h-[200px]"
           /> 
           <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 dark:text-gray-300">{post.smalldescription}</p>
            <Button asChild className="w-full mt-7">
            <Link href={`/blog/${post.currentslug}`}>
              Read More
            </Link>
            </Button>
           </CardContent>
         </Card>
        )
      })}
    </div>
  );
}
