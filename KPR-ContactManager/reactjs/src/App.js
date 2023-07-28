import './App.css';
import {AiFillCloseCircle} from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000/"

function App() {

  const[addSection, setAddSection] = useState(false)
  const[formData, setFormData] = useState({
    name : "",
    email : "",
    address : "",
    moblieNo  :"",
    typeOfCase : "",
    description : "",
  })

  const[dataList, setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value, name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
    }
  }

  const getFetchData = async(e)=>{
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

  console.log(dataList)

  return (
    <div>
    <h1 className='title'>Contact Manager</h1>
      <div className='container'>
        <button className='btn btn-add' onClick={()=>setAddSection(true)}>Add New Contact</button>
        {
          addSection && (
            <div className='addContainer'>
          <form onSubmit={handleSubmit}>
          <div className='close-btn' onClick={()=>setAddSection(false)}><AiFillCloseCircle /></div>
            <label htmlFor='name'>Name : </label>
            <input type='text' id='name' name='name' onChange={handleOnChange} required />
            
            <label htmlFor='email'>Eamil : </label>
            <input type='email' id='email' name='email' onChange={handleOnChange} required />

            <label htmlFor='address'>Address : </label>
            <input type='text' id='address' name='address' onChange={handleOnChange} required />

            <label htmlFor='mobileNo'> MobileNo: </label>
            <input type='number' id='mobile' name='moblieNo' onChange={handleOnChange} required />

            <label htmlFor='typeofcase'>Type of case : </label>
            <input type='text' id='case' name='typeOfCase' onChange={handleOnChange} required />

            <label htmlFor='description'>Description : </label>
            <input type='text' id='description' name='description' onChange={handleOnChange} required />

            <button className='btn'>Submit</button>
          </form>
        </div>
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>MobileNo</th>
                <th>Type of case</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                dataList.map((d=>{
                  return(
                    <tr>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.address}</td>
                      <td>{d.moblieNo}</td>
                      <td>{d.typeOfCase}</td>
                      <td>{d.description}</td>
                    </tr>
                  )
                }))
              }
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
} 

export default App;
