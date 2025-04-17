import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import toast from 'react-hot-toast';

const useLogin = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const login = async (formData) => {
    setLoading(true);
    try {
      const success = handleError(formData);
      if(!success) return; 
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if(data.error) {
        toast.error(data.error);
        return;
      }

      if(!res.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setLoading(false);
    }
  }

  return {login, loading}
}

export default useLogin

function handleError(formData) {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
  if(!usernameRegex.test(formData.username)) {
    toast.error("Invalid username format");
    return false;
  };

  if(!formData.username || !formData.password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if(formData.password.length < 6) {
    toast.error("Password must be 6 characters long");
    return false;
  }

  return true;
}