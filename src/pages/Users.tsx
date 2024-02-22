import React, { useEffect } from 'react'
import { useAppDispatch } from '../shared/store'
import { formModalHandler, getUsers } from '../features/users/api/usersSlice'
import { useAppSelector } from '../shared/hooks'
import UsersTable from '../features/users/UsersTable'
import Button from '../widgets/Button'
import UserAddModal from '../features/users/UserFormModal'
import { useSearchParams } from 'react-router-dom'

const Users: React.FC = () => {
  const dispatch = useAppDispatch()
  const { users ,totalItems,itemsPerPage} = useAppSelector(state => state.users)
  let [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1

  useEffect(() => {
    dispatch(getUsers(+currentPage))
  }, [dispatch,currentPage])
  
  return (
    <main className="w-full flex flex-col items-center">
      <div className="w-full flex justify-end">
        <Button onClick={formModalHandler} text="Add user +" />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-4 mb-6">
        Users
      </h1>
      <UsersTable users={users} totalItems={totalItems} itemsPerPage={itemsPerPage}/>
      <UserAddModal />
    </main>
  )
}

export default Users
