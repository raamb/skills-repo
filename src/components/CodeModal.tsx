import { useState, useEffect } from 'react';

interface Item {
  slug: string;
  type: string;
  name: string;
  frontmatter: Record<string, any>;
  body: string;
}

interface Props {
  items: Item[];
}

function reconstructMarkdown(frontmatter: Record<string, any>, body: string): string {
  const frontmatterLines = ['---'];

  // Add frontmatter fields
  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      // Handle arrays (like tags)
      frontmatterLines.push(`${key}: [${value.map(v => `"${v}"`).join(', ')}]`);
    } else if (value instanceof Date) {
      // Handle dates
      frontmatterLines.push(`${key}: ${value.toISOString().split('T')[0]}`);
    } else if (typeof value === 'string' && value.includes('\n')) {
      // Handle multiline strings (shouldn't happen in our schema but just in case)
      frontmatterLines.push(`${key}: ${value}`);
    } else {
      // Handle simple values
      frontmatterLines.push(`${key}: ${value}`);
    }
  }

  frontmatterLines.push('---');

  return frontmatterLines.join('\n') + '\n\n' + body;
}

export default function CodeModal({ items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleCardClick = (e: Event) => {
      const card = (e.target as HTMLElement).closest('.card');
      if (card) {
        const slug = card.getAttribute('data-slug');
        const type = card.getAttribute('data-type');
        const item = items.find(i => i.slug === slug && i.type === type);
        if (item) {
          setActiveItem(item);
          setIsOpen(true);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleCardClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleCardClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [items]);

  const handleCopy = async () => {
    if (!activeItem) return;
    const fullMarkdown = reconstructMarkdown(activeItem.frontmatter, activeItem.body);
    try {
      await navigator.clipboard.writeText(fullMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    if (!activeItem) return;
    const fullMarkdown = reconstructMarkdown(activeItem.frontmatter, activeItem.body);
    const blob = new Blob([fullMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeItem.slug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen || !activeItem) return null;

  const fullMarkdown = reconstructMarkdown(activeItem.frontmatter, activeItem.body);

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{activeItem.name}</h2>
          <div className="modal-actions">
            <button className="modal-action-btn" onClick={handleCopy} title="Copy to clipboard">
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
            <button className="modal-action-btn" onClick={handleDownload} title="Download as .md file">
              ⬇️ Download
            </button>
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
        </header>
        <div className="modal-body">
          <pre><code>{fullMarkdown}</code></pre>
        </div>
      </div>
    </div>
  );
}
