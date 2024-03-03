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
                {/* Current: "bg-gray-700 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <button onClick={() => { window.location.href = "/" }} className="text-green-300 rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Landing</button>
                <button onClick={() => { window.location.href = "/Indv" }} className="text-green-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Check Bill</button>
                <button onClick={() => { window.location.href = "/Leave" }} className="text-green-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Leave</button>
                <button onClick={() => { window.location.href = "/Monthy Table" }} className="text-green-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Monthy Table</button>
              </div>
            </div>
          </div>
        </div>
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

function Landing() {
  useEffect(()=>{
    getAverage()
  },[])
  const [Avg, setAvg] = useState([0,0,0,0]);
  return (
    <div>
      <p>Breakfast average={Avg[0][0]}</p>
      <br />
      <p>Lunch average={Avg[0][1]}</p>
      <br />
      <p>Snack average={Avg[0][2]}</p>
      <br />
      <p>Dinner average={Avg[0][3]}</p>
    </div>
  );

  function getAverage() {
    setInterval(()=>{
      fetch('http://localhost:3020/')
      .then((response) => response.json())
      .then((data) => {
        setAvg(data);
      })
      .catch((error) => console.error('Error:', error));
    },1000)
  
  }
}

function IndividualBill({Cost,SetCost}){
  useEffect(()=>{

  },[Cost])
 return (
  
    <div style={{ backgroundColor: '#4a5568', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
      <div className="flex w-72 flex-col items-start gap-2 text-green-300">
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', textAlign: 'left' }} htmlFor="name">Name</label>
        <input id="name" type='text' placeholder='Name' size="md" className='border-2 border-green-200' />
      
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', textAlign: 'left' }} htmlFor="id">ID</label>
        <input id="id" type='text' placeholder='ID' size="md" className='border-2 border-green-200 text-black'  />
      
        <br />
        <button onClick={calculate} className='bg-gray-800 py-2 px-2 rounded-md border-2 border-green-100'>calculate</button>
        <br />
        <div style={{position: 'absolute',left: "50%",top:"50%",transform: "translate(-50%,-100%)", width:"300px",height:"200px",background: "white"}}>
          <div className='text-black'>
            No of days: {Cost/200}
            <br></br>
            Total:{Cost}
            <br></br>
            GST:{Cost*0.18}
            <br></br>
            ______________________________________
            <br></br>
            Total:{Cost+(Cost*0.18)}

          </div>
          

        </div>
      </div>
    </div>
);

  
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
  return(<div style={{background:"#4a5568",minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
    <div className='text-green-300'>
    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', textAlign: 'left' }} htmlFor="id">ID</label>
    <input type='number'id='id' className='text-black rounded-md'></input>
    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', textAlign: 'left' }} htmlFor="Start_date">From</label>
    <input type='date' id='Start_date' className='text-black rounded-md' ></input>
    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', textAlign: 'left' }} htmlFor="Start_date" >Till</label>
    <input type='date' id='End_date' className='text-black rounded-md'></input>
    <br></br>
    <br></br>
    <button onClick={calculate} className='bg-gray-800 py-2 px-2 rounded-md border-2 border-green-100'>Confirm</button></div>
  </div>)
  
  
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



