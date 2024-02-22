import { IAvatar } from '../entities/interfaces'

const Avatar: React.FC<IAvatar> = ({
  src,
  className = 'w-[50px] h-[50px] p-1 text-2xl flex items-center justify-center rounded-full bg-blue-500 text-white  rounded-full uppercase',
  text,
}) => {
  return src ? (
    <img
      className={className}
      src={src}
      alt={`${text}'s avatar`}
    />
  ) : (
    <span className={className}>{text}</span>
  )
}

export default Avatar
