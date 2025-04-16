import React, { useEffect, useState } from 'react'

const useGetMe = () => {
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState();
  const getMe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if(data.error) {
        return null;
      }

      if(!res.ok) {
        throw new Error("Something went wrong");
      }

      setAuthUser(data);
      return data;
    } catch (error) {
      throw new Error(error);
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }
  
  useEffect(() => {
    getMe();
  }, [])

  return {authUser, loading};
}

export default useGetMe