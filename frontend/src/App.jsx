import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"

import useGetMe from "./hooks/auth/useGetMe.js"

import LoginPage from "./pages/auth/login/LoginPage.jsx"
import SignupPage from "./pages/auth/signup/SignupPage.jsx"
import HomePage from "./pages/home/HomePage.jsx"
import Sidebar from "./pages/components/common/Sidebar.jsx"
import ProfilePage from "./pages/profile/ProfilePage.jsx"
import ExplorePage from "./pages/explore/ExplorePage.jsx"
import ChatPage from "./pages/message/ChatPage.jsx"

function App() {
  const {authUser, isLoading} = useGetMe();

  if(isLoading) {
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
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} /> } />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} /> } />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} /> } />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/"} /> } />
          <Route path="/explore" element={authUser ? <ExplorePage /> : <Navigate to={"/"} /> } />
          <Route path="/inbox" element={authUser ? <ChatPage /> : <Navigate to={"/"} /> } />
        </Routes>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </>
  )
}

export default App
