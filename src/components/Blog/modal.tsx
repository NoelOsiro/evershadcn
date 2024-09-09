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

interface ModalProps {
  commenterName: string;
  setCommenterName: (name: string) => void;
  isOpen: boolean;
  onClose: () => void;
}
export function Modal({ isOpen, onClose, commenterName, setCommenterName }: ModalProps) {
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
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              placeholder="Your name"
              value={commenterName}
              onChange={(e) => setCommenterName(e.target.value)}
              className="mb-4"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Post
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
