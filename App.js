import React, { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import MyContract from './Lock.json';

const contractAddress = 'CONTRACT_ADDRESS'; // Replace with your deployed contract address

function App() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState('');

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, MyContract.abi, provider);
      try {
        const v1 = await contract.value1();
        const v2 = await contract.value2();
        setValue1(v1.toNumber());
        setValue2(v2);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleInputChange = (event) => {
    setValue2(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, MyContract.abi, signer);
      try {
        await contract.setValue1(value1);
        await contract.setValue2(value2);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="App">
      <h1>My Contract</h1>
      <div className="values">
        <p>Stored Ether: {value1}</p>
        <p>Owner: {value2}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Number of Ether"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name of the owner"
          value={value2}
          onChange={handleInputChange}
        />
        <button type="submit">Set Values</button>
      </form>
    </div>
  );
}

export default App;
