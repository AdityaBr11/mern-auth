import { useEffect, useState } from 'react'
import './App.css'
import AllRoutes from './routes/AllRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Redux/user/action'

function App() {
  const { user,isAuthenticated }=useSelector((store)=>store.user)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])

  return (
    <>
      <AllRoutes/>
    </>
  )
}

export default App
