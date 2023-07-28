import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useBarcode } from 'next-barcode';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  const [barcode, setBarcode] = useState(' ');

  const { request } = useParams();

  // Extracts the WorldShare request barcode from the URL parameter and loads print dialog box
  useEffect(() => {
    request && setBarcode(request);
    window.print();
  }, [request]);

  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      width: 1
    }
  });

  // On page load, loads print dialog box
  // useEffect(() => {
  // }, []);

  return (
    <div className="receipt">
      <Header />
      <Footer />
      <main>
        <svg ref={inputRef} />
      </main>
    </div>
  );
}

export default App;
