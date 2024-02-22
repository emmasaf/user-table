import React from 'react'
import { Link } from 'react-router-dom'
import { menuArray } from '../../entities/routesArray'

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="flex space-x-4 text-black p-2 bg-gray-200">
        {menuArray.map(route => {
          return <li key={route.id}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        })}
      </ul>
    </nav>
  )
}

export default Navbar
