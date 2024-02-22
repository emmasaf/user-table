import React, { useEffect } from 'react'
import { useAppDispatch } from '../shared/store'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  deleteUser,
  formModalHandler,
  getUserById,
  getUsers,
} from '../features/users/api/usersSlice'
import { useAppSelector } from '../shared/hooks'
import LoadingComponent from '../widgets/Loading'
import SimpleButton from '../widgets/SimpleButton'
import { FiEdit } from 'react-icons/fi'
import UserFormModal from '../features/users/UserFormModal'
import { MdDelete } from 'react-icons/md'
import Avatar from '../widgets/Avatar'
import {
  selectNotification,
  triggerNotification,
} from '../features/noticiations/api/notificationSlice'
import Notification from '../features/noticiations/Notification'

const User: React.FC = () => {
  const dispacth = useAppDispatch()
  const { id } = useParams()
  const { user } = useAppSelector(state => state.users)
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const notification = useAppSelector(selectNotification)

  useEffect(() => {
    if (id) dispacth(getUserById(id))
  }, [id, dispacth])

  const handleDelete = () => {
    if (id) {
      dispacth(deleteUser(id)).then(() => {
        dispacth(
          triggerNotification({
            message: 'User Deleted successfully',
            type: 'success',
          }),
        )
        dispacth(getUsers(+currentPage)).then(() => {
          navigate('/users?page=1')
        })
      })
    }
  }

  return user?.id ? (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-center items-center p-5">
        <Avatar
          className={
            'w-[150px] h-[150px] p-1 text-5xl flex items-center justify-center rounded-full bg-blue-500 text-white  rounded-full uppercase'
          }
          src={user.avatar}
          text={user.first_name.slice(0, 1) + user.last_name.slice(0, 1)}
        />
      </div>
      <div className="px-6 py-4">
        <div className="flex w-full justify-between">
          <span className="font-bold text-xl mb-2 mr-5">
            {`${user.first_name} ${user.last_name}`}
          </span>

          {id ? (
            <SimpleButton
              text="delete"
              children={<MdDelete />}
              className="flex items-center mx-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
              onClick={handleDelete}
            />
          ) : null}
          <SimpleButton
            children={<FiEdit />}
            text="edit"
            onClick={() => dispacth(formModalHandler())}
          />
        </div>
        <ul>
          <li>
            <strong>Email:</strong> {user.mail}
          </li>
          <li>
            <strong>Phone:</strong> {user.phone}
          </li>
          <li>
            <strong>Status:</strong> {user.status}
          </li>
          <li>
            <strong>Country:</strong> {user.country}
          </li>
        </ul>
      </div>
      <UserFormModal />
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  ) : (
    <LoadingComponent />
  )
}

export default User
