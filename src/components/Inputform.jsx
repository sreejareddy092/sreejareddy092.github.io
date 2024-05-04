import Web3 from 'web3';
import { ListItem } from '../backend/backend.js';
import { useEffect, useState } from 'react';

const Inputform = ({contract, userAccount, setListItemHash}) => {
  const web3 = new Web3(window.ethereum);
  const [ listItem, setListItem ] = useState(false);
  const [ productName, setProductName ] = useState('');
  const [ productDesc, setProductDesc ] = useState('');
  const [ productPrice, setProductPrice ] = useState(0);

  useEffect(() => {
    async function handleListItem() {
      if (!setListItemHash) {
        console.log("setListItemHash missing");
        return;
      }

      if (!(contract && userAccount)) {
        console.log(`Waiting for the contract: ${contract}/userAccount: ${userAccount} to be updated`);
        return;
      }

      if (!(productName && productDesc && productPrice)) {
        alert("Fill the forms completely");
        return;
      }

      let name = productName;
      let desc = productDesc;
      let price = web3.utils.toWei(productPrice, "ether");

      setProductName('');
      setProductDesc('');
      setProductPrice(0);

      let reciept = await ListItem(contract, userAccount, name, desc, price);

      console.log(`list hash: ${reciept.transactionHash}`);
      setListItemHash(reciept.transactionHash);
    }

    if (listItem) {
      handleListItem();
      setListItem(false);
    }
  }, [ listItem ]);

  return(
    <>
    <input type="text" value={productName}
            placeholder="Enter product Name"
            onChange={(event) => setProductName(event.target.value)}/>
    <br/>
    <input type="text" value={productDesc}
            placeholder="Enter product Description"
            onChange={(event) => setProductDesc(event.target.value)}/>
    <br/>
    <input type="number" value={productPrice}
            placeholder="Enter product Price"
            onChange={(event) => setProductPrice(event.target.value)}/>
    <br/>
    <button onClick={() => setListItem(true)}>List</button>
    </>
  );
}

export default Inputform;
