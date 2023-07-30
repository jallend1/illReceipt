import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useBarcode } from 'next-barcode';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  const { request } = useParams();
  const [barcode, setBarcode] = useState(' ');

  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      width: 1
    }
  });

  useEffect(() => {
    request && setBarcode(request);
  }, [request]);

  // Printing directly based on request state led to an initial blank barcode
  useEffect(() => {
    if (barcode !== ' ') {
      window.print();
      // window.onafterprint = () => window.close();
    }
  }, [barcode]);

  const loveAndAppreciate = `
 ┏┓
 ┃┃╱╲ In this
 ┃╱╱╲╲ house
 ╱╱╭╮╲╲ we love
▔▏┗┛▕▔ & appreciate
╱▔▔▔▔▔▔▔▔▔▔╲
Console Readers
╱╱┏┳┓╭╮┏┳┓ ╲╲
▔▏┗┻┛┃┃┗┻┛▕▔`;

  console.log(loveAndAppreciate);

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
