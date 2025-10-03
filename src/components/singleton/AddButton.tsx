'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import BasicTipTapEditor from '@/components/singleton/BasicTipTapEditor';
import { Button } from '@/components/ui/button';
import { PenTool } from 'lucide-react';

function AddButton() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div>
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full w-14 h-14 shadow-lg"
          >
            <PenTool className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Write a New Diary Entry</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <BasicTipTapEditor
              placeholder="Share what's on your mind today..."
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddButton;
