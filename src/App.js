import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useBarcode } from 'next-barcode';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  const [barcode, setBarcode] = useState(' ');

  const { request } = useParams();

  // If the URL contains a request parameter, set the barcode to that value
  useEffect(() => {
    request && setBarcode(request);
  }, [request]);

  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      width: 1
    }
  });

  const handleBarcodeInput = (e) => {
    // useBarcode does NOT like an empty string
    if (e.target.value === '') {
      setBarcode(' ');
    } else {
      setBarcode(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.print();
    setBarcode(' ');
  };

  return (
    <div className="receipt">
      <Header />
      <main>
        <svg ref={inputRef} />
      </main>
      <Footer />
      <div className="barcode-input">
        <form onSubmit={handleSubmit}>
          <label htmlFor="barcode">Barcode: </label>
          <input type="text" value={barcode} onChange={handleBarcodeInput} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
