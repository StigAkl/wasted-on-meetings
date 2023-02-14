import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import { getAxiosInstance, getToken } from "../../auth/auth";
import { fetchUserUrl, refreshUrl } from "../../constants/api";
import { ACCESS_TOKEN } from "../../constants/constants";
import { InitialUserDetails, IUserDetails } from "../types/State";

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
      try {
        const result = await axiosInstance.get(fetchUserUrl);
      } catch (err: any) {
        if (err.response?.status === 401) {
          try {
            const results = await axiosInstance.get(refreshUrl)
            /*
            TODO: Set new refresh and access token
            */

          } catch (err: any) {
            //Both tokens are expired, remove from local storage 
          }
        }
      }
      setIsLoading(false);
    };

    if (getToken(ACCESS_TOKEN)) {
      fetchUserDetails();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>"Loading.."</div>;
  }

  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailsContext.Provider>);
};
