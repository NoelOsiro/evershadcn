'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import { Post } from '@/types'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    // Fetch post data from API
    const fetchPost = async () => {
      
      try {
        const response = await fetch(`http://localhost:3000/api/getPosts?postId=${params.id}`)
        const data = await response.json()

        // Check if data matches the expected format
        if (data && data.posts && data.posts.length > 0) {
          setPost(data.posts[0])
        } else {
          console.error('Post data not found or invalid format')
        }
      } catch (error) {
        console.error('Failed to fetch post data', error)
      }
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    // Update post in the database
    console.log('Form submitted', post)
    router.push('/my-pages')
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col mt-24">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Edit Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="postType">Post Type</Label>
                <RadioGroup
                  id="postType"
                  value={post.type}
                  onValueChange={(value: 'tribute' | 'memorial' | 'obituary') => setPost({ ...post, type: value })}
                >
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tribute" id="tribute" />
                      <Label htmlFor="tribute">Tribute</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="memorial" id="memorial" />
                      <Label htmlFor="memorial">Memorial</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="obituary" id="obituary" />
                      <Label htmlFor="obituary">Obituary</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <ReactQuill
                  theme="snow"
                  value={post.content}
                  onChange={(content) => setPost({ ...post, content })}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" accept="image/*" />
              </div>

              <Button type="submit" className="w-full">Update Post</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
