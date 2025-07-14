import './RelatedComics.css';
import type { Comic } from '../types/Comic';

interface RelatedComicsProps {
  related: Comic[];
}

const RelatedComics: React.FC<RelatedComicsProps> = ({ related }) => {
  if(!related || related.length === 0) {
    return null; // No related comics to display
  }
  return (
    <div className="related-section">
      <p className="related-title">Relacionados:</p>
      <div className="related-list">
        {related.map((comic) => (
          <div className="related-item" key={comic.id}>
            <div className="related-thumb">
              <img
                src={comic.portada_url}
                alt={comic.nombre}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="related-name">{comic.nombre}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedComics;
