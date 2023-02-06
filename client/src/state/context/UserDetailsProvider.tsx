import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import { getAxiosInstance } from "../../auth/auth";
import { InitialUserDetails, IUserDetails } from "../types/State";

const placeholder = "https://jsonplaceholder.typicode.com/todos/1";
interface Props {
  children: ReactNode
}

interface UserContextProps {
  user: IUserDetails | undefined,
  setUser: Dispatch<SetStateAction<IUserDetails | undefined>>
}

const initialUserContextProps: UserContextProps = {
  user: InitialUserDetails,
  setUser: () => { }
}

export const UserDetailsContext = createContext<UserContextProps>(initialUserContextProps);

export const UserDataProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUserDetails | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const axiosInstance = getAxiosInstance();
      const result = await axiosInstance.get(placeholder);

      const user: IUserDetails = {
        email: result.data.title,
        token: result.data.userId
      };

      //setUser(user);
      setIsLoading(false);
    };

    fetchUserDetails();
  }, []);

  if (isLoading) {
    return <div>"Loading.."</div>;
  }

  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailsContext.Provider>);
};
