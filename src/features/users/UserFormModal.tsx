import React, { useEffect } from 'react'
import { useAppSelector } from '../../shared/hooks'
import { useAppDispatch } from '../../shared/store'
import Modal from '../../widgets/Modal'
import {
  addUser,
  cleanForm,
  formModalHandler,
  getCountries,
  getUserById,
  getUsers,
  updateUser,
} from './api/usersSlice'
import { useParams, useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFormInput } from '../../entities/interfaces'
import Input from '../../widgets/Input'
import Select from '../../widgets/Select'
import { triggerNotification } from '../noticiations/api/notificationSlice'

const UserFormModal: React.FC = () => {
  const { formModalState, countries, user } = useAppSelector(
    state => state.users,
  )
  let [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const dispatch = useAppDispatch()
  const { id: userId } = useParams()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm<IFormInput>({
    mode: 'all',
  })

  const onSubmit: SubmitHandler<IFormInput> = data => {
    if (userId) {
      data.avatar =
        typeof data.avatar === 'string'
          ? data.avatar
          : URL.createObjectURL(data.avatar[0])

      dispatch(updateUser({ userId: userId, userData: data })).then(() => {
        dispatch(
          triggerNotification({
            message: 'User Updated successfully',
            type: 'success',
          }),
        )
        dispatch(getUsers(+currentPage)).then(() => {
          dispatch(formModalHandler())
          dispatch(getUserById(userId))
          reset()
        })
      })
    } else {
      data.status = 'active'
      data.avatar = data.avatar[0] ? URL.createObjectURL(data.avatar[0]) : ''
      dispatch(addUser({ userData: data })).then(() => {
        dispatch(
          triggerNotification({
            message: 'User Added successfully',
            type: 'success',
          }),
        )
        dispatch(getUsers(+currentPage)).then(() => {
          dispatch(formModalHandler())
          reset()
        })
      })
    }
  }

  useEffect(() => {
    reset({ ...user })
  }, [user, reset])

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId))
    } else {
      dispatch(cleanForm())
    }
    //eslint-disable-next-line
  }, [userId])

  const form = watch()
  console.log(form, 'form')

  return (
    <Modal isOpen={formModalState} onClose={() => dispatch(formModalHandler())}>
      <b className="text-lg">{userId ? 'Edit' : 'Add'} User</b>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <Input
          errors={errors}
          label="Avatar"
          type="file"
          id="avatar"
          register={register}
        />
        <Input
          errors={errors}
          label="First Name"
          type="text"
          id="first_name"
          register={register}
          validation={{
            required: 'This field is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'First name should contain only letters',
            },
          }}
        />
        <Input
          errors={errors}
          label="Last Name"
          type="text"
          id="last_name"
          register={register}
          validation={{
            required: 'This field is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Last name should contain only letters',
            },
          }}
        />
        <Select
          errors={errors}
          validation={{
            required: 'This field is required',
          }}
          label="Countries"
          name="country"
          options={countries}
          register={register}
        />
        <Input
          errors={errors}
          label="Phone"
          type="text"
          id="phone"
          register={register}
          validation={{
            pattern: {
              value: /^[+]?[0-9]+$/,
              message: 'Only numbers and the + sign are allowed',
            },
          }}
        />
        <Input
          errors={errors}
          label="Email"
          type="email"
          id="mail"
          register={register}
          validation={{
            required: 'This field is required',
            pattern: {
              value: /^\S+@\S+\.[A-Za-z]{2,3}$/,
              message: 'Entered value does not match email format',
            },
          }}
        />
        <div className="flex w-full justify-between">
          <button
            disabled={!isValid}
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default UserFormModal
