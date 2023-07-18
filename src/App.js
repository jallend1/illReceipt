import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useBarcode } from 'next-barcode';
import { useState } from 'react';

function App() {
  const [barcode, setBarcode] = useState(null);

  const { inputRef } = useBarcode({
    value: barcode,
    options: {}
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
