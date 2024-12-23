import React, {useCallback, useState} from 'react';
import ReactJson, {InteractionProps} from 'react-json-view';
import './style.scss';
import {SendTransactionRequest, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";

// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.
const defaultTx: SendTransactionRequest = {
  // The transaction is valid for 10 minutes from now, in unix epoch seconds.
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [

    {
      // The receiver's address.
      address: 'UQDQ5glJxfkNcp4qZdo7XcXLRPEKjgnANcPE6Zt8-kL-8Vm0',
      // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
      amount: '7200000000',
      // (optional) State initialization in boc base64 format.
      stateInit: 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
      // (optional) Payload in boc base64 format.
      payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==',
    },

    // Uncomment the following message to send two messages in one transaction.
    /*
    {
      // Note: Funds sent to this address will not be returned back to the sender.
      address: 'UQAuz15H1ZHrZ_psVrAra7HealMIVeFq0wguqlmFno1f3B-m',
      amount: toNano('0.01').toString(),
    }
    */
  ],
};

export function TxForm5() {

  const [tx, setTx] = useState(defaultTx);

  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  const onChange = useCallback((value: InteractionProps) => {
    setTx(value.updated_src as SendTransactionRequest)
  }, []);

  return (
    <div className="send-tx-form2">


      {/*  <ReactJson theme="ocean" src={defaultTx} onEdit={onChange} onAdd={onChange} onDelete={onChange}/> */}
      

            {wallet ? (
        <button onClick={() => tonConnectUi.sendTransaction(tx)}>
          <img className="image-left" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/StarPrice.gif" alt="star" /><p className="price-left">1200</p><p className="price-right">7.2</p><img className="image-right" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/Ton.svg" alt="ton" />
          </button>
      ) : (
        <button onClick={() => tonConnectUi.openModal()}>
          <img className="image-left" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/StarPrice.gif" alt="star" /><p className="price-left">1200</p><p className="price-right">7.2</p><img className="image-right" src="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/src/components/TxForm/Ton.svg" alt="ton" />
          </button>
      )}
      
    </div>
  );
}