import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Add = () => {
  const navigate = useNavigate()
  const [newBook,setNewBook] = useState({
    title:"",
    description:"",
    price:null,
    cover:""
  })

  const handleBookInput=(e)=>{
 setNewBook(prev=>({
  ...prev,[e.target.name]:e.target.value
 }))
}

 const addNewBook = async(e) =>{
  e.preventDefault()
  try {
    await axios.post("http://localhost:8800/books",newBook)
    navigate("/")
    
  } catch (error) {
    console.log(error);
    
  }
 }


  
  return (
    <div className='form'>
      <h1>Add new book</h1>
      <input type="text" placeholder='title' name='title' onChange={handleBookInput} />
      <input type="text" placeholder='description' name='description' onChange={handleBookInput}/>
      <input type="text" placeholder='cover' name='cover' onChange={handleBookInput}/>
      <input type="number" placeholder='price' name='price' onChange={handleBookInput}/>
      <button onClick={addNewBook} className='formButton' >
        Add
      </button>
    </div>
  )
}

export default Add