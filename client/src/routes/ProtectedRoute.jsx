import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
  const {crediantial,loading,user} = useSelector((state)=>state.user)

  if(crediantial===false){
    return <Navigate to={'/'} />
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default PrivateRoute