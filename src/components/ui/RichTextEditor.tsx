import React, { useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, List, ListOrdered, Strikethrough } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Entrez votre texte...",
  className,
  minHeight = "120px"
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Only update innerHTML when value changes externally (not from user input)
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const execCommand = useCallback((command: string, commandValue?: string) => {
    document.execCommand(command, false, commandValue);
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title,
    isActive = false 
  }: { 
    onClick: () => void; 
    icon: React.ElementType; 
    title: string;
    isActive?: boolean;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      className={cn(
        "h-8 w-8 p-0 hover:bg-muted",
        isActive && "bg-muted text-primary"
      )}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className={cn("border rounded-md overflow-hidden bg-background", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-muted/30 flex-wrap">
        <ToolbarButton
          onClick={() => execCommand('bold')}
          icon={Bold}
          title="Gras (Ctrl+B)"
        />
        <ToolbarButton
          onClick={() => execCommand('italic')}
          icon={Italic}
          title="Italique (Ctrl+I)"
        />
        <ToolbarButton
          onClick={() => execCommand('underline')}
          icon={Underline}
          title="Souligné (Ctrl+U)"
        />
        <ToolbarButton
          onClick={() => execCommand('strikeThrough')}
          icon={Strikethrough}
          title="Barré"
        />
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarButton
          onClick={() => execCommand('insertUnorderedList')}
          icon={List}
          title="Liste à puces"
        />
        <ToolbarButton
          onClick={() => execCommand('insertOrderedList')}
          icon={ListOrdered}
          title="Liste numérotée"
        />
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        className={cn(
          "p-3 outline-none prose prose-sm max-w-none",
          "focus:ring-0 focus:outline-none",
          "[&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4",
          "[&>ul>li]:my-1 [&>ol>li]:my-1",
          "text-foreground"
        )}
        style={{ minHeight }}
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
