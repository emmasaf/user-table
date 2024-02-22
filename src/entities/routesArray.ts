import Home from '../pages/Home'
import User from '../pages/User'
import Users from '../pages/Users'
import { IRoutes } from './interfaces'

export const routesArray: Array<IRoutes> = [
  {
    id: 1, name: 'Home', component: Home, path: '/'
  },
  {
    id: 2, name: 'Users', component: Users, path: '/users'
  },
  {
    id: 3, name: 'User', component: User, path: '/users/:id'
  },
]

export const menuArray: Array<IRoutes> = [
  {
    id: 1, name: 'Home', component: Home, path: '/'
  },
  {
    id: 2, name: 'Users', component: Users, path: '/users'
  },
]
