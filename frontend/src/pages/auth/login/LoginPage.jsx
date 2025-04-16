import React, { useState } from 'react'
import useLogin from '../../../hooks/auth/useLogin';

const LoginPage = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const {login, loading} = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
          <input name='username' onChange={handleOnChange} type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" title="Only letters, numbers or dash" />
        </label>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
          <input name='password' onChange={handleOnChange} type="password" required placeholder="Password"  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
        </label>
        <button className='btn'>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  )
}

export default LoginPage