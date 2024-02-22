import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import{BrowserRouter, Route,Routes} from 'react-router-dom'
function App() {
  const [Cost,SetCost]=useState(0);
  return(
    <div >
     <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <button onClick={() => { window.location.href = "/" }} className="bg-gray-900 text-green-300 rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Landing</button>
                <button onClick={() => { window.location.href = "/Indv" }} className="text-green-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Check Bill</button>
                <button onClick={() => { window.location.href = "/Leave" }} className="text-green-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Leave</button>
                <button onClick={() => { window.location.href = "/Monthy Table" }} className="text-green-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Monthy Table</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className="sm:hidden" id="mobile-menu">
      </div>
    </nav>

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



