import SearchModal from "./pages/message/SearchModal.jsx"
import LoginPage from "./pages/auth/login/LoginPage.jsx"
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"

import SignupPage from "./pages/auth/signup/SignupPage.jsx"
import useGetMe from "./hooks/auth/useGetMe.js"
import HomePage from "./pages/home/HomePage.jsx"
import Sidebar from "./pages/components/common/Sidebar.jsx"
import ProfilePage from "./pages/profile/ProfilePage.jsx"

function App() {

  const {authUser, loading} = useGetMe();
  if(loading) {
    return (
      <>
        <div className="flex flex-col h-screen bg-black p-8">
          <div className="flex-grow flex justify-center items-center transform scale">
              <img src={'/logo.png'} width={100} alt="Logo" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <div className="flex flex-col justify-end items-center mt-auto">
              <div className="text-center text-slate-400">from</div>
              <div>
                  <img src="/meta.png" width={100} alt="Meta Logo" />
              </div>
          </div>
      </div>
      </>
    )
  }

  return (
    <>
      <div className="h-screen flex bg-black w-screen">
        {authUser && <Sidebar />}
        {authUser && <SearchModal />}
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} /> } />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} /> } />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} /> } />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/"} /> } />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
