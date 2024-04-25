import React, { useState, useEffect } from 'react';
import ResizableAndDraggable from './components/ResizableAndDraggable';
import { InputField } from './components/InputField';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUserSliceAction, UserEditSliceAction, UserSliceAction } from './reduxToolkit/slice/userSlice';
const App = () => {
  const scale = 1;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [form, setForm] = useState({ name: '', email: '' })
  const [allUser, setAllUser] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()
  const result = useSelector((state) => state.addUserReducer)
  console.log(result, "result")
  useEffect(() => {
    dispatch(GetAllUserSliceAction())
    const handleResize = () => {

      console.log('first', window.innerWidth, window.innerHeight)
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEdit) {
      dispatch(UserEditSliceAction(form))
      setIsEdit(false)
      setForm({ name: '', email: '' })
    }
    else {
      dispatch(UserSliceAction(form))
      setForm({ name: '', email: '' })
    }


  }


  const handleClick = (user) => {
    setIsEdit(true)
    setForm(user)
  }

  const onLayoutChange = (layout, layouts) => {
    // console.log(layout, layouts, "//?")
  }
  return (
    <>
      <ToastContainer />
      <div className='w-full h-screen '>
        <ResizableAndDraggable
          id={1}
          initialSize={{ width: windowSize.width / 5, height: windowSize.height / 3 }}
          initialPosition={{ x: windowSize.width / 10, y: windowSize.height / 20 }}
          scale={scale}
        >
          <div className='grid grid-cols-1 gap-5 place-content-center text-center h-full'>
            <div className='text-xm sm:text-sm lg:text-xl'>
             <strong > Add Count : </strong>  {result.count && result.count.addCount|| 0}
              <br />
            <strong > Edit Count :</strong>   {result.count && result.count.updateCount ||0}
            </div>

          </div>
        </ResizableAndDraggable>
        <ResizableAndDraggable
          id={2}
          initialSize={{ width: windowSize.width / 1.9, height: windowSize.height / 3 }}
          initialPosition={{ x: windowSize.width / 3, y: windowSize.height / 20 }}
          scale={scale}
        // onLayoutChange={onLayoutChange}
        >

          <form className="max-w-lg max-h-full mx-auto  bg- rounded-md px-5 py-1 grid" onSubmit={handleSubmit}>
            <h2 className='text-sm sm:text-xl text-center font-semibold text-black'>Add User</h2>


            <InputField label={"Name"} name={"name"} type={"text"} placeholder={"Enter your name"} required={true} value={form.name} onChange={onChange} />
            <InputField label={"Email"} name={"email"} type={"email"} placeholder={"Enter your email"} required={true} value={form.email} onChange={onChange} />

            <div className='text-center'>

              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
             focus:outline-none focus:ring-blue-300 sm:font-medium rounded-lg text-sm w-full sm:w-auto
             px-2 sm:px-5 p-1 sm:p-1.5 lg:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {isEdit ? "Edit" : "Add"}
              </button>
            </div>
          </form>


        </ResizableAndDraggable>
        <ResizableAndDraggable
          id={3}
          initialSize={{ width: windowSize.width / 1.3, height: windowSize.height / 2 }}
          initialPosition={{ x: windowSize.width / 10, y: (windowSize.height / 2.2) }}
          scale={scale}
        >


          <div className="relative overflow-y-auto max-h-full mx-auto shadow-md sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      created At
                    </th>
                 
                   
                    <th scope="col" className="px-6 py-3">
                      <span className="">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {
                    result.result && result.result.map((user, index) => {
                      return (
                        <tr key={index} className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.name}
                          </th>
                          <td className="px-6 py-4">
                            {user.email}
                          </td>
                          <td className="px-6 py-4">
                            {user.createdAt}
                          </td>
                         
                          <td className="px-6 py-4 ">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { handleClick(user) }}>Edit</a>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>



        </ResizableAndDraggable>
      </div>
    </>
  );
};

export default App;
