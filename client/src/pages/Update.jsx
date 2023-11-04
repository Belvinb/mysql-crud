import React, { useState } from 'react'
import axios from "axios"
import {useLoaderData, useLocation, useNavigate} from "react-router-dom"

const Update = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split("/")[2]
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

 const updateBook = async(e) =>{
  e.preventDefault()
  try {
    await axios.put(`http://localhost:8800/books/${bookId}`,newBook)
    navigate("/")
    
  } catch (error) {
    console.log(error);
    
  }
 }


  
  return (
    <div className='form'>
      <h1>Update book</h1>
      <input type="text" placeholder='title' name='title' onChange={handleBookInput} />
      <input type="text" placeholder='description' name='description' onChange={handleBookInput}/>
      <input type="text" placeholder='cover' name='cover' onChange={handleBookInput}/>
      <input type="number" placeholder='price' name='price' onChange={handleBookInput}/>
      <button onClick={updateBook} className='formButton' >
        Update
      </button>
    </div>
  )
}

export default Update