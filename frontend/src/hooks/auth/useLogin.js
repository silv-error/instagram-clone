import { useState } from 'react'

const useLogin = () => {
  
  const [loading, setLoading] = useState(false);
  const login = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if(!res.ok) {
        throw new Error("Something went wrong");
      }

      return data;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return {login, loading}
}

export default useLogin