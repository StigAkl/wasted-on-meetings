import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import { getAxiosInstance, getToken, setToken } from "../../utils/token";
import { fetchUserUrl } from "../../constants/api";
import { ACCESS_TOKEN } from "../../constants/constants";
import { InitialUserDetails, IUserDetails } from "../types/State";

interface Props {
  children: ReactNode
}

interface UserContextProps {
  user: IUserDetails | undefined,
  setUser: Dispatch<SetStateAction<IUserDetails | undefined>>,
  fetchDetails: () => Promise<void>
}

const initialUserContextProps: UserContextProps = {
  user: InitialUserDetails,
  setUser: () => { },
  fetchDetails: async () => { }
}

export const UserDetailsContext = createContext<UserContextProps>(initialUserContextProps);

export const UserDataProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUserDetails | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDetails = async () => {
    const axiosInstance = getAxiosInstance();
    try {
      const result = await axiosInstance.get(fetchUserUrl);
      if (result.status === 200) {
        setUser({
          email: result.data.data.email,
          token: getToken(ACCESS_TOKEN)!
        })
      }
    } catch (err: any) {
      try {
        //Retry if failed
        const result = await axiosInstance.get(fetchUserUrl);
        const { email, token } = result.data.data;
        setUser({
          email: email,
          token: token
        });

      } catch (err: any) { }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (getToken(ACCESS_TOKEN)) {
      fetchDetails();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>"Loading.."</div>;
  }

  return (
    <UserDetailsContext.Provider value={{ user, setUser, fetchDetails }}>
      {children}
    </UserDetailsContext.Provider>);
};
