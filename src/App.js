import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useBarcode } from 'next-barcode';
import { useState, useEffect } from 'react';

function App() {
  const [barcode, setBarcode] = useState(null);

  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      width: 1
    }
  });

  const handleBarcodeInput = (e) => {
    if (e.target.value === '') {
      setBarcode(null);
    } else {
      setBarcode(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    window.print();
    // e.preventDefault();
  };

  const detectEnterPress = (e) => {
    if (e.key === 'Enter') {
      // e.preventDefault();
      window.open('http://localhost:3000/' + barcode, '_blank');
    }
  };

  const extractBarcodeFromURL = () => {
    const url = window.location.href;
    const urlParts = url.split('/');
    const barcode = urlParts[urlParts.length - 1];
    setBarcode(barcode);
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
