
export interface IRoutes {
  id: number;
  name: string;
  component: React.ComponentType;
  path: string
}
export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export interface IButtonProps {
  onClick: Function;
  text: string;
  className?: string;
  payload?: any
}
export interface ISimpleButtonProps {
  onClick: Function;
  text: string;
  className?: string;
  children: React.ReactNode;
}
export interface IUserProps {
  first_name: string,
  last_name: string,
  phone: string,
  mail: string,
  status?: string,
  id?: number,
  country: string,
  avatar?: any
}


export interface ICountry {
  idd: {
    suffixes:Array<string> 
  },
  name: {
    common:string
  }
}
export interface IUsersSliceProps {
  users: IUserProps[],
  countries: ICountry[],
  user:IUserProps | null,
  formModalState:boolean,
  totalItems:number,
  itemsPerPage:number,
}

export interface IUsersTableProps{
  users: IUserProps[],
  itemsPerPage:number,
  totalItems:number
}

export interface ILoadingComponentProps {
  size?: number; 
  message?: string;
}

export interface IFormInput {
  first_name: string;
  last_name: string;
  phone: string;
  mail: string;
  country: string;
  avatar?:  any;
  status?:string
}
export interface IInputProps<>{
  label: string;
  type: string;
  id: string; 
  register: Function; 
  validation?: object;
  errors: any
}
export interface ISelectProps {
  label: string;
  name: string;
  register: Function;
  errors?: any;
  options: ICountry[];
  validation: object
}


export interface IAvatar{
  text:string
  size?:string
  className?:string
  src?:string
}

export interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface IPaginateUsers{
  items:number,
  data:IUserProps[]
}

export interface INotificationSliceProps {
  message: string | null;
  type: 'success' | 'error' | null;
}

export interface INotificationProps {
  message: string;
  type: 'success' | 'error';
}