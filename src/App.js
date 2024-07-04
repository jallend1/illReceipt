import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useBarcode } from "next-barcode";
import { useState, useEffect } from "react";

function App() {
  const [barcode, setBarcode] = useState(" ");
  const [lenderAddress, setLenderAddress] = useState(" ");
  const [title, setTitle] = useState(" ");
  const [requestData, setRequestData] = useState(" ");

  const handleRequestData = (e) => {
    e.preventDefault();
    if (requestData) {
      try {
        const dataArray = JSON.parse(requestData);
        setBarcode(dataArray[1].requestNumber);
        setLenderAddress(dataArray[0].addressString);
        setTitle(dataArray[2].title);
      } catch (e) {
        alert("Invalid request data. Please enter a valid JSON object.");
      }
    }
  };

  useEffect(() => {
    if (barcode && barcode !== " ") {
      const timer = setTimeout(() => {
        window.print();
        setRequestData(" ");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [barcode]);

  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      width: 1,
    },
  });

  return (
    <div className="receipt">
      <Header />
      <Footer />
      <main>
        <h4>WorldShare Request Number</h4>
        <svg ref={inputRef} />
        <h4>Title: {title}</h4>
        <div className="lenderAddress">
          <h4>Lender Address</h4>
          {lenderAddress.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </main>
      <div>
        <form>
          <input
            type="text"
            value={requestData}
            onChange={(e) => setRequestData(e.target.value)}
          />
          <button type="submit" onClick={handleRequestData}>
            Enter Request Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
