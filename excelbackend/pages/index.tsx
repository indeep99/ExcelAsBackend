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
  const [number, setNumber] = useState('');

  async function testAxiosXlsx() {
    var XLSX = require("xlsx");
  
      let axiosResponse = await axios.get("https://spat-batchfiles.s3.amazonaws.com/test1.xlsx", {
        responseType :"arraybuffer"
      })

      let axiosResponse2 = await axios.get("https://spat-batchfiles.s3.amazonaws.com/test2.xlsx", {
        responseType :"arraybuffer"
      })

      var workbook2 = XLSX.read(axiosResponse2.data);
      
      workbook2.Sheets['Sheet1'].A1.v = number;

  
      var workbook = XLSX.read(axiosResponse.data);
  
      workbook.Sheets['Sheet1'].A1.v = number;
  
      // recalc the workbook
      var XLSX_CALC = require('xlsx-calc');
      XLSX_CALC(workbook);
      XLSX_CALC(workbook2);
      setScore(workbook.Sheets['Sheet1'].A4.v)
      setScore2(workbook2.Sheets['Sheet1'].A4.v)
  
  }

  const handleChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value)
    setNumber(event.target.value);
  };

  return (
    <>
      <h1>{score}</h1>
      <h1>{score2}</h1>
      <input
        type="text"
        id="number"
        name="number"
        onChange={handleChange}
        value={number}
      />
      <button onClick={()=>testAxiosXlsx()}>Run</button>
    </>
  )
}
