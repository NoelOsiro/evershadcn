'use client'
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AddPostForm } from '@/components/Forms/AddPostForm'
export default function AddPostPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-3xl font-bold text-center">Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <AddPostForm/>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}