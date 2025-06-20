import Header from './components/Header';
import MenuBar from './components/MenuBar';
import ComicPanel from './components/ComicPanel';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <MenuBar />
      <main className="main-content">
        <ComicPanel />
        <ComicPanel />
        <ComicPanel />
      </main>
      <Footer />
    </div>
  );
}

export default App;