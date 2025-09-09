import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <h1 className="text-4xl font-bold text-center mt-10">Welcome to AZANIKA</h1>
        <p className="text-lg text-center mt-4">Discover the latest in women's fashion accessories.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;