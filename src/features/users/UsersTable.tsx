import React from 'react'
import { IUsersTableProps } from '../../entities/interfaces'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SimpleButton from '../../widgets/SimpleButton'
import { MdMore } from 'react-icons/md'
import { useAppDispatch } from '../../shared/store'
import { getUsers, updateUserStatus } from './api/usersSlice'
import { MdBlock } from 'react-icons/md'
import { VscVmActive } from 'react-icons/vsc'
import Avatar from '../../widgets/Avatar'
import Pagination from '../../widgets/Paginate'
import { selectNotification, triggerNotification } from '../noticiations/api/notificationSlice'
import { useAppSelector } from '../../shared/hooks'
import Notification from '../noticiations/Notification'

const UsersTable: React.FC<IUsersTableProps> = ({
  users,
  totalItems,
  itemsPerPage,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const notification = useAppSelector(selectNotification);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() })
  }
  const changeStatus = (id: string, status: string): void => {
    const newStatus = status === 'active' ? 'block' : 'active'
    dispatch(updateUserStatus({ userId: id, status: newStatus })).then(() => {
      dispatch(
        triggerNotification({
          message: 'User Status changed successfully',
          type: 'success',
        }),
      )
      dispatch(getUsers(+currentPage))
    })
  }
  return (
    <div className="w-[90%] overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Avatar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mail
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Avatar
                  src={user.avatar}
                  text={`${user.first_name.slice(0, 1)}${user.last_name.slice(
                    0,
                    1,
                  )}`}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.last_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.mail}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <SimpleButton
                  onClick={() =>
                    changeStatus(String(user.id), String(user.status))
                  }
                  children={
                    user.status === 'active' ? <MdBlock /> : <VscVmActive />
                  }
                  className={`flex items-center px-4 py-2 ${
                    user.status === 'active'
                      ? 'bg-red-500 hover:bg-red-700'
                      : 'bg-blue-500 hover:bg-blue-700'
                  } text-white font-semibold rounded-lg shadow-md `}
                  text={user.status === 'active' ? 'block' : 'active'}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.country}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <SimpleButton
                  text="Edit"
                  onClick={() => navigate(`/users/${user.id}`)}
                  children={<MdMore />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={+currentPage}
        onPageChange={handlePageChange}
      />
            {notification.message && <Notification message={notification.message} type={notification.type} />}
    </div>
  )
}

export default UsersTable
