'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { uploadImage } from '@/lib/cloudinary';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Link as LinkIcon,
} from 'lucide-react';
import { useCallback, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg my-4 max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-400 underline hover:text-blue-300',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
  });

  const addImage = useCallback(async () => {
    if (!editor) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const url = await uploadImage(file);
        editor?.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    };
    input.click();
  }, [editor]);

  const toggleLink = useCallback(() => {
    if (!editor) return;

    // If already a link, remove it
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // Show link input dialog
    setShowLinkInput(true);
    const previousUrl = editor.getAttributes('link').href || '';
    setLinkUrl(previousUrl);
  }, [editor]);

  const applyLink = useCallback(() => {
    if (!editor || !linkUrl.trim()) {
      setShowLinkInput(false);
      return;
    }

    // Add https:// if no protocol specified
    const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setShowLinkInput(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  const cancelLink = useCallback(() => {
    setShowLinkInput(false);
    setLinkUrl('');
  }, []);

  if (!editor) {
    return (
      <div className="border-2 border-white/20 rounded-lg overflow-hidden bg-[#0d0d0d] min-h-125 flex items-center justify-center">
        <div className="text-white/50">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="border-2 border-white/20 rounded-lg overflow-hidden bg-[#0d0d0d]">
      {/* Toolbar */}
      <div className="bg-[#1a1a1a] border-b-2 border-white/20 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('bold') ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Bold"
        >
          <Bold size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('italic') ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Italic"
        >
          <Italic size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('underline') ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Underline"
        >
          <UnderlineIcon size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('strike') ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Strikethrough"
        >
          <Strikethrough size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('code') ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Code"
        >
          <Code size={18} className="text-white" />
        </button>

        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Heading 1"
        >
          <Heading1 size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Heading 2"
        >
          <Heading2 size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Heading 3"
        >
          <Heading3 size={18} className="text-white" />
        </button>

        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('bulletList') ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Bullet List"
        >
          <List size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('orderedList') ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Numbered List"
        >
          <ListOrdered size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('blockquote') ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Quote"
        >
          <Quote size={18} className="text-white" />
        </button>

        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Align Left"
        >
          <AlignLeft size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Align Center"
        >
          <AlignCenter size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-white/20' : ''
          }`}
          type="button"
          title="Align Right"
        >
          <AlignRight size={18} className="text-white" />
        </button>

        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Media */}
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-white/10 transition-colors"
          type="button"
          title="Insert Image"
        >
          <ImageIcon size={18} className="text-white" />
        </button>

        <button
          onClick={toggleLink}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive('link') ? 'bg-white/20' : ''
          }`}
          type="button"
          title={editor.isActive('link') ? 'Remove Link' : 'Add Link'}
        >
          <LinkIcon size={18} className="text-white" />
        </button>

        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          title="Undo"
          disabled={!editor.can().undo()}
        >
          <Undo size={18} className="text-white" />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          title="Redo"
          disabled={!editor.can().redo()}
        >
          <Redo size={18} className="text-white" />
        </button>
      </div>

      {/* Link Input Dialog */}
      {showLinkInput && (
        <div className="bg-[#1a1a1a] border-b-2 border-white/20 p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyLink();
                } else if (e.key === 'Escape') {
                  cancelLink();
                }
              }}
              placeholder="Enter URL (e.g., https://example.com)"
              className="flex-1 px-3 py-2 bg-[#0d0d0d] border-2 border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-white rounded"
              autoFocus
            />
            <button
              onClick={applyLink}
              className="px-4 py-2 bg-white text-black font-heading font-bold text-sm uppercase hover:bg-gray-200 transition-all"
              type="button"
            >
              Apply
            </button>
            <button
              onClick={cancelLink}
              className="px-4 py-2 bg-white/10 text-white font-heading font-bold text-sm uppercase hover:bg-white/20 transition-all"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} />

      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
          color: white;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em;
          text-transform: uppercase;
        }

        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1em 0 0.5em;
          text-transform: uppercase;
        }

        .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 1em 0 0.5em;
          text-transform: uppercase;
        }

        .ProseMirror p {
          margin: 1em 0;
          line-height: 1.7;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 2em;
          margin: 1em 0;
        }

        .ProseMirror li {
          margin: 0.5em 0;
        }

        .ProseMirror blockquote {
          border-left: 4px solid white;
          padding-left: 1em;
          margin: 1.5em 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
        }

        .ProseMirror code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: monospace;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5em 0;
        }

        .ProseMirror a {
          color: rgb(96, 165, 250);
          text-decoration: underline;
        }

        .ProseMirror a:hover {
          color: rgb(147, 197, 253);
        }
      `}</style>
    </div>
  );
}