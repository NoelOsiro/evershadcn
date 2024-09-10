'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { Post } from '@/types'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

// Convert image to base64
const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [content, setContent] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    // Fetch post data from API
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/getPosts?postId=${params.id}`)
        const data = await response.json()

        if (data && data.posts && data.posts.length > 0) {
          const fetchedPost = data.posts[0]
          setPost(fetchedPost)
          setContent(fetchedPost.content) // Set content for editor
        }
      } catch (error) {
        console.error('Failed to fetch post data', error)
      }
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      let imageBase64 = ''
      if (image) {
        imageBase64 = await convertImageToBase64(image)
      }

      const updatedAt = new Date().toISOString()

      const formData = new FormData()
      if (!post) {
        console.error('Post data is not available');
        return;
      }

      formData.append('title', post.title)
      formData.append('description', post.description)
      formData.append('content', content)
      formData.append('fullName', post.fullName)
      formData.append('dateOfBirth', post.dateOfBirth)
      formData.append('dateOfDeath', post.dateOfDeath)
      formData.append('placeOfDeath', post.placeOfDeath)
      formData.append('causeOfDeath', post.causeOfDeath || '')
      formData.append('postType', post.type)
      formData.append('updatedAt', updatedAt)

      if (imageBase64) {
        formData.append('image', imageBase64)
      }

      // Send update request to API
      const response = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to update post')
      }

      router.push('/my-pages')
    } catch (error) {
      console.error('Error updating post:', error)
    }
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
              {/* Post Type */}
              <div className="space-y-2">
                <Label htmlFor="postType">Post Type</Label>
                <RadioGroup
                  id="postType"
                  value={post.type}
                  onValueChange={(value: 'tribute' | 'memorial' | 'obituary') =>
                    setPost({ ...post, type: value })
                  }
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

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  required
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name of Deceased</Label>
                <Input
                  id="fullName"
                  value={post.fullName}
                  onChange={(e) => setPost({ ...post, fullName: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={post.description}
                  onChange={(e) => setPost({ ...post, description: e.target.value })}
                  required
                />
              </div>

              {/* Date of Birth & Date of Death */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={post.dateOfBirth}
                    onChange={(e) => setPost({ ...post, dateOfBirth: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfDeath">Date of Death</Label>
                  <Input
                    id="dateOfDeath"
                    type="date"
                    value={post.dateOfDeath}
                    onChange={(e) => setPost({ ...post, dateOfDeath: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Place of Death & Cause of Death */}
              <div className="space-y-2">
                <Label htmlFor="placeOfDeath">Place of Death</Label>
                <Input
                  id="placeOfDeath"
                  value={post.placeOfDeath}
                  onChange={(e) => setPost({ ...post, placeOfDeath: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="causeOfDeath">Cause of Death (optional)</Label>
                <Input
                  id="causeOfDeath"
                  value={post.causeOfDeath}
                  onChange={(e) => setPost({ ...post, causeOfDeath: e.target.value })}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="h-80"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline'],
                      ['link'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['clean'],
                    ],
                  }}
                />
              </div>

              {/* Image */}
              <div className="space-y-4">
                <Label htmlFor="image" className="text-lg font-semibold">
                  Image
                </Label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0]
                    if (file) {
                      setImage(file)
                    }
                  }}
                  className="text-lg p-3 w-full"
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full text-lg py-6 mt-6">
                Update Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
