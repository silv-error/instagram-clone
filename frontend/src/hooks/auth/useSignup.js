import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useSignup = () => {
  const [loading, setLoading] = useState();
  const signup = async (formData) => {
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
    }
  }
  signup();
  return {loading};
}

export default useSignup