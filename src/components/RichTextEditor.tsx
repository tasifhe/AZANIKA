'use client';

import React, { useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Enter description...',
  className = ''
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const ToolbarButton = ({ 
    icon: Icon, 
    command, 
    value, 
    title 
  }: { 
    icon: any; 
    command?: string; 
    value?: string; 
    title: string;
  }) => (
    <button
      type="button"
      onClick={() => command ? execCommand(command, value) : insertLink()}
      className="p-2 hover:bg-blush-100 rounded-lg transition-colors text-neutral-700 hover:text-blush-600"
      title={title}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className={`border-2 border-neutral-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blush-500 focus-within:border-blush-500 ${className}`}>
      {/* Toolbar */}
      <div className="bg-neutral-50 border-b border-neutral-300 p-2 flex flex-wrap gap-1">
        <div className="flex items-center gap-1 pr-2 border-r border-neutral-300">
          <ToolbarButton icon={Bold} command="bold" title="Bold (Ctrl+B)" />
          <ToolbarButton icon={Italic} command="italic" title="Italic (Ctrl+I)" />
          <ToolbarButton icon={Underline} command="underline" title="Underline (Ctrl+U)" />
        </div>
        
        <div className="flex items-center gap-1 pr-2 border-r border-neutral-300">
          <ToolbarButton icon={Heading1} command="formatBlock" value="h2" title="Heading 1" />
          <ToolbarButton icon={Heading2} command="formatBlock" value="h3" title="Heading 2" />
        </div>
        
        <div className="flex items-center gap-1 pr-2 border-r border-neutral-300">
          <ToolbarButton icon={List} command="insertUnorderedList" title="Bullet List" />
          <ToolbarButton icon={ListOrdered} command="insertOrderedList" title="Numbered List" />
        </div>
        
        <div className="flex items-center gap-1 pr-2 border-r border-neutral-300">
          <ToolbarButton icon={AlignLeft} command="justifyLeft" title="Align Left" />
          <ToolbarButton icon={AlignCenter} command="justifyCenter" title="Align Center" />
          <ToolbarButton icon={AlignRight} command="justifyRight" title="Align Right" />
        </div>
        
        <div className="flex items-center gap-1">
          <ToolbarButton icon={LinkIcon} title="Insert Link" />
          <ToolbarButton icon={Code} command="formatBlock" value="pre" title="Code Block" />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        className="min-h-[200px] p-4 focus:outline-none prose prose-sm max-w-none"
        data-placeholder={placeholder}
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          position: absolute;
        }
        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        [contenteditable] h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        [contenteditable] ul,
        [contenteditable] ol {
          padding-left: 2em;
          margin: 0.5em 0;
        }
        [contenteditable] li {
          margin: 0.25em 0;
        }
        [contenteditable] a {
          color: #ef5f98;
          text-decoration: underline;
        }
        [contenteditable] strong {
          font-weight: bold;
        }
        [contenteditable] em {
          font-style: italic;
        }
        [contenteditable] u {
          text-decoration: underline;
        }
        [contenteditable] pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
