import { INotificationProps } from "../../entities/interfaces"
import { useAppDispatch } from "../../shared/store";
import { clearNotification } from "./api/notificationSlice";

const Notification:React.FC<INotificationProps> = ({message,type})=>{
  const dispatch = useAppDispatch();
  return (
    <div
    className={`fixed top-5 right-5 z-50 p-4 border-l-4 shadow-md ${type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`}
    role="alert"
  >
    <span className="block sm:inline">{message}</span>
    <span
      className="absolute top-0 bottom-5 right-0 px-4 "
      onClick={() => dispatch(clearNotification())}

    >
      <svg className="fill-current h-6 w-6 text-gray-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.196 7.349 13.85a1.2 1.2 0 1 1-1.697-1.697L8.196 10 5.651 7.349A1.2 1.2 0 1 1 7.348 5.651L10 8.196l2.651-2.545a1.2 1.2 0 1 1 1.697 1.697L11.804 10l2.544 2.651a1.2 1.2 0 0 1 0 1.698z"/></svg>
    </span>
  </div>
  )
}

export default Notification