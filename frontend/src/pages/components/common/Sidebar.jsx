import { Link } from "react-router-dom"
import React from 'react'

import { AlignJustify, Compass, Heart, Search, User } from 'lucide-react'
import { GoHomeFill } from 'react-icons/go'
import { RiMessengerLine } from 'react-icons/ri'
import { CgAddR } from 'react-icons/cg'
import { FaInstagram } from "react-icons/fa"

const Sidebar = () => {
  const DESKTOP_MENU = [
    { logo: <span><GoHomeFill size={25} /></span>, name: "Home", link: "/" },
    { logo: <span><Search size={25} /></span>, name: "Search", link: "/" },
    { logo: <span><Compass size={25} /></span>, name: "Explore", link: "/explore" },
    { logo: <span><RiMessengerLine size={25} /></span>, name: "Messenger", link: "/inbox" },
    { logo: <span><Heart size={25} /></span>, name: "Notifications", link: "/" }, 
    { logo: <span><CgAddR size={25} /></span>, name: "Create", link: "/" }, 
    { logo: <div className="rounded-full w-6 h-6 overflow-hidden object-cover"><img src={'/avatar.jpg'}/></div>, name: "Profile", link: "/profile" }
  ]

  const MOBILE_MENU = [
    { logo: <span><GoHomeFill size={25} /></span>, name: "Home", link: "/" },
    { logo: <span><Compass size={25} /></span>, name: "Explore", link: "/explore" },
    { logo: <span><RiMessengerLine size={25} /></span>, name: "Messenger", link: "/inbox" },
    { logo: <span><CgAddR size={25} /></span>, name: "Create", link: "/" }, 
    { logo: <img src={'/avatar.jpg'} className="rounded-full w-6 h-6 overflow-hidden object-cover"/>, name: "Profile", link: "/profile" }
  ]

  return (
    <>
      // TODO: make selected bar bold
      <div className='shadow-[0_0_0_0.2px_rgba(255,255,255,0.8)] px-4 h-screen w-auto max-sm:hidden'>
        <Link to={"/"}>
          <h2 className='flex text-3xl grand-hotel-regular italic py-9 active:opacity-30'>
            <span className="opacity-0 lg:opacity-100 absolute duration-500 transition-opacity ease-in-out">Instagram</span>
            <span className="px-1 py-2"><FaInstagram className="w-fit flex absolute justify-center lg:h-0 transition-all duration-500" /></span>
          </h2>
        </Link>
        <div className='flex flex-col h-[800px]'>
          <ul className="lg:w-52 w-10 mt-5 transition-all duration-75 h-full">
            {DESKTOP_MENU.map((bar, index) => (
              <li key={index}>
                <Link
                  to={bar.link} 
                  className='flex mb-4 justify-start items-center gap-4 p-2 rounded-lg hover:bg-gray-400 hover:bg-opacity-20'>
                  <span>{bar.logo}</span> <h2 className="opacity-0 lg:opacity-100 transition-opacity duration-100 -translate-x-44 lg:-translate-x-0 lg:delay-100">{bar.name}</h2>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <Link className='flex mt-4 justify-start items-center gap-4 p-2 rounded-lg hover:bg-gray-400 hover:bg-opacity-20'>
                <span><AlignJustify size={25} /></span> <h2 className="hidden lg:block">More</h2>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden max-sm:block shadow-[0_0_0_0.2px_rgba(255,255,255,0.8)] w-screen fixed bottom-0">
        <ul className="flex justify-around">
          {MOBILE_MENU.map((bar, index) => (
            <li key={index}>
              <Link 
                to={bar.link}
                className='flex justify-around items-center gap-4 p-2 rounded-lg'>
                {bar.logo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Sidebar