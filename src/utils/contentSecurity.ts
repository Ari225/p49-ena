import DOMPurify from 'dompurify';

// Configure DOMPurify for safer content rendering
const configureDOMPurify = () => {
  // Allow specific tags and attributes for rich content
  DOMPurify.addHook('beforeSanitizeElements', (node) => {
    // Remove script tags completely
    if (node.nodeName === 'SCRIPT') {
      node.parentNode?.removeChild(node);
    }
  });
  
  // Set allowed tags and attributes
  return {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style']
  };
};

// Sanitize HTML content safely
export const sanitizeHTML = (content: string): string => {
  const config = configureDOMPurify();
  return DOMPurify.sanitize(content, config);
};

// Format content with basic markdown-like syntax
export const formatContent = (content: string): string => {
  if (!content) return '';
  
  let formatted = content
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/__(.*?)__/g, '<u>$1</u>');
  
  // Convert URLs to clickable links
  const urlRegex = /(https?:\/\/[^\s<>"]+|www\.[^\s<>"]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s<>"]*)?)/g;
  formatted = formatted.replace(urlRegex, (url) => {
    let href = url;
    if (!url.startsWith('http')) {
      href = url.startsWith('www.') ? `https://${url}` : `https://${url}`;
    }
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline font-medium transition-colors">${url}</a>`;
  });
    
  return sanitizeHTML(formatted);
};

// Input validation utilities
export const validateInput = (input: string, type: 'email' | 'username' | 'text' = 'text'): boolean => {
  if (!input || input.trim().length === 0) return false;
  
  switch (type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input);
    case 'username':
      // Username: 3-50 chars, alphanumeric and underscore only
      const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
      return usernameRegex.test(input);
    case 'text':
      // Prevent obvious XSS attempts
      const xssRegex = /<script|javascript:|on\w+=/i;
      return !xssRegex.test(input);
    default:
      return true;
  }
};

// Escape user input for display
export const escapeHTML = (str: string): string => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};