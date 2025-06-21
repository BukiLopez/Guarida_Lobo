import './ComicCard.css';
import type { Comic } from '../types/Comic';
import RelatedComics from './RelatedComics';

interface ComicCardProps {
  comic: Comic;
  viewMode: 'grid' | 'row';
}

const ComicCard: React.FC<ComicCardProps> = ({ comic, viewMode }) => {
  return (
    <div className={`comic-card ${viewMode}`}>
        <div className="comic-image-column">
            <img className="comic-image" src={comic.imageUrl} alt={comic.title} />
        </div>

        <div className="comic-main-content">
            <div className="comic-details">
            <h2 className="comic-title">{comic.title}</h2>
            <p className="comic-price">${comic.price.toFixed(2)}</p>
            <p className="comic-description">{comic.description}</p>
            </div>

            <div className="comic-related-column">
            <RelatedComics related={comic.related} />
            </div>
        </div>
    </div>

  );
};

export default ComicCard;
