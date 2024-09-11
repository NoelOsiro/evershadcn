import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
    console.log('No user found, redirecting to signin');
    redirect('/signin')
  }

  if (!user.id) {
    console.error('User object does not contain an id');
    return <div>Error: Unable to fetch user data. Please try logging in again.</div>
  }



  let posts = null
  let error = null

  try {
    posts = await fetchPosts(user.id)

  } catch (err) {
    console.error('Error fetching posts:', err)
    error = 'Failed to fetch posts. Please try again later.'
  }

  return (
    <div className="min-h-screen flex flex-col mt-24">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Pages</h1>
          <Link href="/add-post">
            <Button>Create New Memorial</Button>
          </Link>
        </div>
        
        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {!error && (
          <>
            {(!posts || posts.length === 0) ? (
              <div className="text-center py-10">
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">You haven&apos;t created any memorials yet.</p>
                <Link href="/add-post">
                  <Button>Create Your First Memorial</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Card key={post.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src={post.imageUrl || '/placeholder.svg'}
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
                    <div>
                      Created on {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      <Badge variant="outline" className="ml-2">
                        {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/edit-post/${post.id}`} passHref>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>

                    {post.status === 'published' ? (
                      <>
                        <Link href={`/view-post/${post.id}`} passHref>
                          <Button variant="secondary" size="sm">View</Button>
                        </Link>
                        <Link href={`/add-services/${post.id}`} passHref>
                          <Button size="sm">Add Services</Button>
                        </Link>
                      </>
                    ) : (
                      <Link href={`/checkout/${post.id}`} passHref>
                        <Button size="sm">Publish</Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}


