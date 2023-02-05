import { useEffect, useState } from "react"
import { getAxiosInstance } from "./auth/auth"
import { fetchUserUrl } from "./constants/api"
const axiosInstance = getAxiosInstance();

interface User {
  id: string;
  email: string;
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await axiosInstance.get(fetchUserUrl);
      const user = result.data.data;
    }

    fetchUserData();
  }, [])
  return (
    <h1>Hi!</h1>
  )
}

export default App
