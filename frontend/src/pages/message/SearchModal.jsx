import React, { useEffect, useRef, useState } from 'react'
import useGetUsers from '../../hooks/useGetUsers';

const SearchModal = () => {

  const [toggleModal, setToggleModal] = useState(false);
  const {users} = useGetUsers();
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  }
  
  const filteredData = users?.filter(user => user.fullName.toLowerCase().includes(search.toLowerCase()));


  return (
    <>
      <button className='btn' onClick={() => setToggleModal(true)}>
        Open Modal
      </button>

      {toggleModal && (
        <div
          onClick={() => setToggleModal(false)} 
          className='fixed flex justify-center items-center inset-0 h-screen bg-black bg-opacity-50 p-4'
        >
          <div
            onClick={(e) => e.stopPropagation()} 
            className="relatiev shadow-none flex flex-col justify-between h-[600px] w-[550px] p-0 rounded-2xl overflow-hidden bg-[#1C1C1C]">
          <header>
            <div className='flex justify-center p-2 relative'>
              <h2 className='font-bold text-wrap'>New message</h2>
              <div className='flex absolute right-1 top-0'>
                <form method="dialog">
                  <button 
                    className="btn btn-sm btn-circle btn-ghost text-lg"
                    onClick={() => setToggleModal(false)}
                  >✕</button>
                </form>
              </div>
            </div>
            <div className='shadow-[0_0_0_0.2px_rgba(255,255,255,0.8)]'>
            <label className='flex'>
              <p className='px-4 flex justify-center items-center font-medium'>To:</p>
              <input 
                type="url" 
                required placeholder="Search..." 
                title="Search"
                className='flex-1 py-2 focus:outline-none bg-transparent text-sm'
                onChange={handleOnChange}
                ref={searchRef}
              />
            </label>
            </div>
          </header>
          <main className='h-full overflow-y-scroll'>
            <ul>
              {search && filteredData?.map((data, index) => <li key={index} data={data} >{data.fullName}</li>)}
            </ul>
          </main>
          <footer className='p-4'>
            <button 
              className=' h-11 w-full shadow-none bg-blue-500 text-sm rounded-lg disabled:bg-blue-500 disabled:opacity-35 font-medium hover:bg-blue-600' 
              disabled={!search}
            >
              Chat
            </button>
          </footer>
        </div>
        </div>
      )}
    </>
  )
}

export default SearchModal