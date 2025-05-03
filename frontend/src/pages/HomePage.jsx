import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/operation/authOperaton'

const HomePage = () => {
  const dispatch = useDispatch(); 
  return (
    <div className="">
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
    </div>
  )
}

export default HomePage