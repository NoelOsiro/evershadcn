import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPosts } from '@/utils/fetchPosts'

export default async function MyPagesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/signin')
  }
  else {
    
  }

  const dummyPosts = user?.id ? await fetchPosts(user.id) : []
  return (
    <div className="min-h-screen flex flex-col mt-24">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Pages</h1>
          <Link href="/add-post">
            <Button>Create New Memorial</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyPosts && dummyPosts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="transition-transform duration-300 hover:scale-105 object-cover"
                />
                <Badge
                  variant={post.status === 'published' ? 'default' : 'secondary'}
                  className="absolute top-2 right-2"
                >
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>
                  <div>
                  Created on {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  <Badge variant="outline" className="ml-2">
                    {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </Badge>
                  </div>
                  
                </CardDescription>

              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/edit-post/${post.id}`}>
                <Button variant="outline" size="sm">Edit</Button>
                </Link>
                {post.status === 'published' ? (
                  <Link href={`/view-post/${post.id}`} passHref>
                  <Button variant="secondary" size="sm">View</Button>
                  </Link>
                ) : (
                  <Link href={`/checkout/${post.id}`} passHref>
                  <Button size="sm">Publish</Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}


