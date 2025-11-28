import React from 'react';
import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

const RichTextDisplay = ({ content, className }: RichTextDisplayProps) => {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'ul', 'ol', 'li', 'span', 'div'],
    ALLOWED_ATTR: ['class', 'style']
  });

  return (
    <div 
      className={cn(
        "prose prose-sm max-w-none",
        "[&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4",
        "[&>ul>li]:my-0.5 [&>ol>li]:my-0.5",
        "[&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4",
        "[&_ul>li]:my-0.5 [&_ol>li]:my-0.5",
        className
      )}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default RichTextDisplay;
