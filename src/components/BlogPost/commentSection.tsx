'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from './modal';
import { useCommentStore } from '@/store/commentStore';
import { Pagination } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommentSection({ postId }: { postId: string }) {
  const { 
    comments, 
    totalComments, 
    currentPage, 
    commentsPerPage, 
    isLoading,
    addComment, 
    fetchComments, 
    setCurrentPage 
  } = useCommentStore();

  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchComments(postId, currentPage);
  }, [currentPage, fetchComments, postId]);

  const handleAddComment = async () => {
    if (commenterName.trim() && newComment.trim()) {
      await addComment(postId, { name: commenterName, content: newComment });
      setNewComment('');
      setCommenterName('');
      setIsModalOpen(false);
    }
  };

  const totalPages = Math.ceil(totalComments / commentsPerPage);

  return (
    <div className="mt-16">
      <h3 className="text-lg font-semibold">Comments</h3>
      <div className="mt-4">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full mb-4"
        />
        <Button onClick={() => setIsModalOpen(true)} className="mt-2 hover:bg-blue-500">Post Comment</Button>
      </div>
      <ul className="mt-8 space-y-4">
        {isLoading ? (
          Array.from({ length: commentsPerPage }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full" />
          ))
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="p-4 bg-secondary">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{comment.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </ul>
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        commenterName={commenterName}
        setCommenterName={setCommenterName}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
      />
    </div>
  );
}