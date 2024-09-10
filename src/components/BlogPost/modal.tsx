'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  commenterName: string;
  setCommenterName: (name: string) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
}

export function Modal({
  isOpen,
  onClose,
  commenterName,
  setCommenterName,
  newComment,
  setNewComment,
  handleAddComment
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-primary text-primary-foreground">
        <DialogHeader>
          <DialogTitle>Add a Name</DialogTitle>
          <DialogDescription>
            Add a name to your comment. You can use a nickname or your real name.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              value={commenterName}
              onChange={(e) => setCommenterName(e.target.value)}
              className="mb-4"
            />
            <Label htmlFor="comment" className="sr-only">
              Comment
            </Label>
            <Textarea
              id="comment"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full mb-4"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={handleAddComment}>
            Post
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
