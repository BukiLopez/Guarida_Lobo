import './ComicPanel.css';
import ComicCard from './ComicCard';
import type { Comic } from '../types/Comic';

interface ComicPanelProps {
  viewMode: 'grid' | 'row';
}

const comics: Comic[] = [
  {
    id: '1',
    title: 'Daredevil: Born Again',
    price: 300,
    imageUrl: 'https://m.media-amazon.com/images/I/81zLflNRqZL._SY466_.jpg',
    description: 'Matt Murdock enfrenta la destrucción total de su vida cuando Kingpin descubre su identidad secreta. Una historia de caída y renacimiento.',
    editorial: 'Marvel',
    related: [
      {
        id: '1a',
        title: 'Daredevil: Yellow',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/81euigMJ9xL._AC_SY741_.jpg',
        description: '',
        editorial: 'Marvel',
        related: []
      },
      {
        id: '1b',
        title: 'Daredevil El hombre sin miedo',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/61MCgFrZBvL._SY466_.jpg',
        description: '',
        editorial: 'Marvel',
        related: []
      },
      {
        id: '1c',
        title: 'Shadowland',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/81oMfujegKL._SY466_.jpg',
        description: '',
        editorial: 'Marvel',
        related: []
      },
      {
        id: '1d',
        title: 'Daredevil: End of Days',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/81fCL2APSPS._SY466_.jpg',
        description: '',
        editorial: 'Marvel',
        related: []
      }
    ]
  },
  {
    id: '2',
    title: 'All-Star Superman',
    price: 700,
    imageUrl: 'https://m.media-amazon.com/images/I/51VMNECljsL._SY445_SX342_PQ99_.jpg',
    description: 'Superman recibe una sobredosis de radiación solar y se enfrenta a su muerte mientras realiza actos heroicos. Una de las obras más queridas del Hombre de Acero.',
    editorial: 'DC',
    related: [
      {
        id: '2a',
        title: 'Superman Birthright',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/81jlDyE6DUL._SY466_.jpg',
        description: '',
        editorial: 'DC',
        related: []
      },
      {
        id: '2b',
        title: 'Superman Red & Blue',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/81nSyUM85fL._SY466_.jpg',
        description: '',
        editorial: 'DC',
        related: []
      },
      {
        id: '2c',
        title: 'Superman Unchained',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/81j0LzjS0xL._SY466_.jpg',
        description: '',
        editorial: 'DC',
        related: []
      },
      {
        id: '2d',
        title: 'Kingdom Come',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/81dmW82u4FL._SY466_.jpg',
        description: '',
        editorial: 'DC',
        related: []
      }
    ]
  },
  {
    id: '3',
    title: 'Civil War',
    price: 350,
    imageUrl: 'https://m.media-amazon.com/images/I/8178RfFOJSL._SY466_.jpg',
    description: 'La comunidad de superhéroes se divide cuando el gobierno exige el registro. Iron Man y el Capitán América lideran lados opuestos en esta épica batalla moral.',
    editorial: 'Marvel',
    related: [
      {
        id: '3a',
        title: 'Secret Wars',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/91HDFhbstML._SY466_.jpg',
        description: '',
        editorial: 'Marvel',
        related: []
      },
      {
        id: '3b',
        title: 'Secret Wars II',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/91XLfnc+-UL._SY466_.jpg',
        description: '',
        editorial: 'Marvel',
        related: []
      },
      {
        id: '3c',
        title: 'Infinity Gauntlet',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/91HemAcOl9L._SY466_.jpg',
        description: '',
        editorial: 'Marvel',
        related: []
      },
      {
        id: '3d',
        title: 'Avengers vs X-Men',
        price: 0,
        imageUrl: 'https://m.media-amazon.com/images/I/91sw0z2xZRL._SY466_.jpg',
        description: '',
        editorial: 'Marvel',
        related: []
      }
    ]
  }
];

const ComicPanel: React.FC<ComicPanelProps> = ({ viewMode }) => {
  const groupedComics = comics.reduce<Record<string, Comic[]>>((acc, comic) => {
    if (!acc[comic.editorial]) acc[comic.editorial] = [];
    acc[comic.editorial].push(comic);
    return acc;
  }, {});

  return (
    <div className={`comic-panel ${viewMode === 'grid' ? 'grid-view' : 'row-view'}`}>
      {viewMode === 'grid' ? (
        comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} viewMode="grid" />
        ))
      ) : (
        Object.entries(groupedComics).map(([editorial, group]) => (
          <div key={editorial} className="comic-section">
            <h2 className="editorial-title">{editorial}</h2>
            <div className="editorial-row">
              {group.map((comic) => (
                <ComicCard key={comic.id} comic={comic} viewMode="row" />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ComicPanel;

