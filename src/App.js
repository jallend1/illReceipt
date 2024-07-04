import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useBarcode } from "next-barcode";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

function App() {
  const [barcode, setBarcode] = useState(" ");
  // const [requestData, setRequestData] = useState(" ");
  const [lenderAddress, setLenderAddress] = useState(" ");
  const [title, setTitle] = useState(" ");

  // const { request } = useParams();

  const handleRequestData = () => {
    const requestData = prompt("Enter the WorldShare request data:");
    if (requestData) {
      try {
        const dataArray = JSON.parse(requestData);
        // setRequestData(dataArray);
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
      <button onClick={handleRequestData}>Enter Request Data</button>
    </div>
  );
}

export default App;
