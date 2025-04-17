import React, { useEffect, useState } from 'react'

const useGetUsers = () => {
  
  const [users, setUsers] = useState();
  const getUsers = async () => {
    try {
      const res = await fetch("/api/users/");
      const data = await res.json();

      if(!res.ok) {
        console.error(data.error);
        throw new Error("Something went wrong");
      }

      setUsers(data);
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  return {getUsers, users}
}

export default useGetUsers