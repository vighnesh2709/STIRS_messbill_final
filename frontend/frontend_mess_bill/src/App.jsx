import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import{BrowserRouter, Route,Routes} from 'react-router-dom'
function App() {
  const [Cost,SetCost]=useState(0);
  return(
    <div>
      <button onClick={()=>{
        window.location.href="/"
      }}>Landing</button>
      <button onClick={()=>{
        window.location.href="/Indv"
      }}>check Bill</button>
      <button onClick={()=>{
        window.location.href="/Leave"
      }}>Leave</button>
      <button onClick={()=>{
        window.location.href="/Month"
      }}>Monthly Table</button>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/Indv" element={<IndividualBill Cost={Cost} SetCost={SetCost}/>}></Route>
        <Route path="/Leave" element={<Leave/>}></Route>
        <Route path="/Month" element={<MonthlyTable/>}></Route>
        
      </Routes>
    </BrowserRouter>
    </div>)
}

function Landing(){
  return<div>
    <br></br>
    Welcome to the mess menu page
    <br></br>
    here are the instructions:
    <br></br>
    1. check bill to check the bill of a perticular studnet
    <br></br>
    2. leave to admit leaves for the studnet
    <br></br>
    3. the monthly bill of the all the studnets so far
  </div>
}
function IndividualBill({Cost,SetCost}){
  useEffect(()=>{

  },[Cost])
  return<div>
    <input id="name" type='text'placeholder='Name'></input>
    <input id="id" type='text' placeholder='ID'></input>
    <br></br>
    <button onClick={calculate}>calculate</button>
    <br></br>
    {Cost}
    
  </div>
  async function calculate() {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  
  fetch(`http://localhost:3020/calculate/${id}/${name}`, {
  method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    SetCost(data);
  })
  .catch(error => console.error('Error:', error));
}

}
function Leave(){
  return<div>
    <input type='number'id='id'></input>
    <div>From</div>
    <input type='date' id='Start_date' ></input>
    <div>Till</div>
    <input type='date' id='End_date'></input>
    <br></br>
    <button onClick={calculate}>Confirm</button>
  </div>
  async function calculate(){
      let start=document.getElementById("Start_date").value;
      let end=document.getElementById("End_date").value;
      let id=document.getElementById("id").value;
      fetch(`http://localhost:3020/leave/${start}/${end}/${id}`,{
        method: 'POST',
      })
      .then(response=>response.json())
      .then(data=>{
        console.log(data.dayDifference-2);
      })

  }
}
function MonthlyTable() {
  return (
    <div>
      <iframe
        src="https://sheet2api.com/table/aKc1q28TMqaS/mess-bill/Sheet1"
        width="100%" height="600" frameBorder="0"
        style={{ border: '1px solid #dedede', background: 'transparent' }}
      ></iframe>
    </div>
  );
}





export default App



