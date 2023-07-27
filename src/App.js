import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useBarcode } from 'next-barcode';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  const [barcode, setBarcode] = useState(' ');

  const { request } = useParams();

  // Set the barcode to the value of the URL parameter
  useEffect(() => {
    request && setBarcode(request);
  }, [request]);

  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      width: 1
    }
  });

  // On page load, loads print dialog
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="receipt">
      <Header />
      <main>
        <svg ref={inputRef} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
