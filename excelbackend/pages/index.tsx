import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from "react";


const inter = Inter({ subsets: ['latin'] })

import axios from "axios"





export default function Home() {
  const [score, setScore] = useState(0);
  const [score2, setScore2] = useState(0)
  const [rehab, setRehab] = useState('');
  const [arv, setArv] = useState('');
  const [bid, setBid] = useState('');
  const [cost, setCost] = useState('');
  
  async function testAxiosXlsx() {
    var XLSX = require("xlsx");
  
      let axiosResponse = await axios.get("https://spat-batchfiles.s3.amazonaws.com/Nhimble+Proforma+v3.xlsx", {
        responseType :"arraybuffer"
      })

      let axiosResponse2 = await axios.get("  https://spat-batchfiles.s3.amazonaws.com/MPH+-+Proforma+Assumptions+v3.xlsx", {
        responseType :"arraybuffer"
      })

      var workbook2 = XLSX.read(axiosResponse2.data);
      
      workbook2.Sheets['ACQ Flip - MPH'].C9.w = cost;
      workbook2.Sheets['ACQ Flip - MPH'].D7.w = bid;
      workbook2.Sheets['ACQ Flip - MPH'].C9.v = parseFloat(cost)/100;
      workbook2.Sheets['ACQ Flip - MPH'].D7.v = parseInt(bid);
      workbook2.Sheets['ACQ Flip - MPH'].D43.f = '';
      console.log(workbook2.Sheets);
  
      var workbook = XLSX.read(axiosResponse.data);
      console.log(workbook.Sheets['ACQ Flip to Buyer - Doorvest'].D14.v);
      console.log(workbook2.Sheets['ACQ Flip - MPH'].D7.v);
  
      workbook.Sheets['ACQ Flip to Buyer - Doorvest'].D14.v = rehab;
      workbook.Sheets['ACQ Flip to Buyer - Doorvest'].D19.v = arv;
  
      // recalc the workbook
      var XLSX_CALC = require('xlsx-calc');
      XLSX_CALC(workbook);
      XLSX_CALC(workbook2, { continue_after_error: true, log_error: true });
      console.log(workbook2.Sheets);
      setScore(workbook.Sheets['ACQ Flip to Buyer - Doorvest'].D9.v)
      setScore2(workbook2.Sheets['ACQ Flip - MPH'].D11.v)
  
  }

  const handleChangeRehab = (event: { target: { value: any; }; }) => {
    console.log(event.target.value)
    setRehab(event.target.value);
  };

  const handleChangeARV = (event: { target: { value: any; }; }) => {
    console.log(event.target.value)
    setArv(event.target.value);
  };

  const handleChangeBid = (event: { target: { value: any; }; }) => {
    console.log(event.target.value)
    setBid(event.target.value);
  };

  const handleChangeCost = (event: { target: { value: any; }; }) => {
    console.log(event.target.value)
    setCost(event.target.value);
  };

  return (
    <>
      Maximum Bid Price Nhimble: <h1>{score}</h1>
      Total Acquisition Cost MPH:<h1>{score2}</h1>
      <br />
      <br />
      <h2>Doorvest</h2>
      Rehab:<input
        type="text"
        id="rehab"
        name="rehab"
        onChange={handleChangeRehab}
        value={rehab}
      />
      ARV:<input
        type="text"
        id="arv"
        name="arv"
        onChange={handleChangeARV}
        value={arv}
      />
      <br></br>
      <h2>MPH</h2>
      Maxmium Bid Price: 
      <input
        type="text"
        id="bid"
        name="bid"
        onChange={handleChangeBid}
        value={bid}
      />
      Closing Cost %:<input
        type="text"
        id="cost"
        name="cost"
        onChange={handleChangeCost}
        value={cost}
      />


      <button onClick={()=>testAxiosXlsx()}>Run</button>
    </>
  )
}
