import React from 'react'
import { Link } from 'react-router-dom'

function ConfirmedTicket() {


  return (
    <>
      <h1>Your Ticket Booking Confirmed</h1>
      <p>Ticeket Is Valid Upto 2 Hours From Now!</p>
      <Link to='/'>Return To Home</Link>
    </>
  )
}

export default ConfirmedTicket