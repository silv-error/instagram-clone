import { useState } from 'react'
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const useSignup = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const signup = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if(!res.ok) {
        toast.error(data.error);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setLoading(false);
    }
  }
  signup();
  return {loading};
}

export default useSignup