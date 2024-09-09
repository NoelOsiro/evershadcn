'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from './modal';
// Ensure you have a modal component

export default function CommentSection() {
  const [comments, setComments] = useState<{ name: string; comment: string }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
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
          className="w-full"
        />
        <Button onClick={() => setIsModalOpen(true)} className="mt-2">Post Comment</Button>
      </div>
      <ul className="mt-8 space-y-4">
        {comments.map((comment, index) => (
          <li key={index} className="p-4 bg-secondary rounded-lg">
            <strong>{comment.name}</strong>: {comment.comment}
          </li>
        ))}
      </ul>

      {/* Modal for adding comments */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} commenterName={commenterName} setCommenterName={setCommenterName} />
    </div>
  );
}