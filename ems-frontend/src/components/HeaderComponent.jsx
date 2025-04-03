import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark'>
                <a className="navbar-brand">Employee Management System</a>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent