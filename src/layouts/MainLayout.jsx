import React from 'react'
import Nav from '../components/nav/Nav'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <>
       <Nav/>
       <Outlet/>
    </>
  )
}

export default MainLayout
