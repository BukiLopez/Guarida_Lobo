import './RelatedComics.css';
import type { Comic } from '../types/Comic';

interface RelatedComicsProps {
  related: Comic[];
}

const RelatedComics: React.FC<RelatedComicsProps> = ({ related }) => {
  return (
    <div className="related-section">
      <p className="related-title">Relacionados:</p>
      <div className="related-list">
        {related.map((comic) => (
          <div className="related-item" key={comic.id}>
            <div className="related-thumb">
              <img
                src={comic.imageUrl}
                alt={comic.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="related-name">{comic.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedComics;
