import { useState, useEffect } from 'react';

interface Item {
  slug: string;
  type: string;
  name: string;
  code: string;
}

interface Props {
  items: Item[];
}

export default function CodeModal({ items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Item | null>(null);

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

  if (!isOpen || !activeItem) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{activeItem.name}</h2>
          <button className="modal-close" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </header>
        <div className="modal-body">
          <pre><code>{activeItem.code}</code></pre>
        </div>
      </div>
    </div>
  );
}
