'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from './modal';

export default function CommentSection() {
  const [comments, setComments] = useState<{ name: string; comment: string }[]>([]);
  const [newComment, setNewComment] = useState(''); // Moved to parent
  const [commenterName, setCommenterName] = useState(''); // Moved to parent
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddComment = async () => {
    if (commenterName.trim() && newComment.trim()) {
      // Simulate API call
      await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: commenterName, comment: newComment }),
      });

      setComments([...comments, { name: commenterName, comment: newComment }]);
      setNewComment('');
      setCommenterName('');
      setIsModalOpen(false);
    }
  };

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
        {comments.map((comment, index) => (
          <Card key={index} className="p-4 bg-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">{comment.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{comment.comment}</p>
            </CardContent>
          </Card>
        ))}
      </ul>

      {/* Modal for adding name */}
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
