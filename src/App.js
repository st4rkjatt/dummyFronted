import React, { useState, useEffect } from 'react';
import ResizableAndDraggable from './components/ResizableAndDraggable';
import { InputField } from './components/InputField';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUserSliceAction, UserEditSliceAction, UserSliceAction } from './reduxToolkit/slice/userSlice';

const App = () => {
  // Initialize scale for resizing
  const scale = 1;

  // State for window size
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // State for form inputs
  const [form, setForm] = useState({ name: '', email: '' });

  // State for all users
  const [isEdit, setIsEdit] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  // Redux selector to get data from store
  const result = useSelector((state) => state.addUserReducer);

  // Function to handle window resize
  useEffect(() => {
    // Dispatch action to get all users
    dispatch(GetAllUserSliceAction());

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  // Function to handle input change
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch action based on whether it's an edit or add operation
    if (isEdit) {
      dispatch(UserEditSliceAction(form));
      setIsEdit(false);
      setForm({ name: '', email: '' });
    } else {
      dispatch(UserSliceAction(form));
      setForm({ name: '', email: '' });
    }
  }

  // Function to handle edit button click
  const handleClick = (user) => {
    setIsEdit(true);
    setForm(user);
  }

  // Return JSX
  return (
    <>
      <ToastContainer />
      <div className='w-full h-screen'>
        {/* First resizable and draggable component */}
        <ResizableAndDraggable
          id={1}
          initialSize={{ width: windowSize.width / 5, height: windowSize.height / 3 }}
          initialPosition={{ x: windowSize.width / 10, y: windowSize.height / 20 }}
          scale={scale}
        >
          {/* Content for the first component */}
          <div className='grid grid-cols-1 gap-5 place-content-center text-center h-full'>
            <div className='text-xm sm:text-sm lg:text-xl'>
             <strong> Add Count : </strong>  {result.count && result.count.addCount || 0}
              <br />
            <strong> Edit Count :</strong>   {result.count && result.count.updateCount || 0}
            </div>
          </div>
        </ResizableAndDraggable>
        
        {/* Second resizable and draggable component */}
        <ResizableAndDraggable
          id={2}
          initialSize={{ width: windowSize.width / 1.9, height: windowSize.height / 3 }}
          initialPosition={{ x: windowSize.width / 3, y: windowSize.height / 20 }}
          scale={scale}
        >
          {/* Form for adding/editing users */}
          <form className="max-w-lg max-h-full mx-auto bg-white rounded-md px-5 py-1 grid" onSubmit={handleSubmit}>
            <h2 className='text-sm sm:text-xl text-center font-semibold text-black'>Add User</h2>
            <InputField label={"Name"} name={"name"} type={"text"} placeholder={"Enter your name"} required={true} value={form.name} onChange={onChange} />
            <InputField label={"Email"} name={"email"} type={"email"} placeholder={"Enter your email"} required={true} value={form.email} onChange={onChange} />
            <div className='text-center'>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:font-medium rounded-lg text-sm w-full sm:w-auto px-2 sm:px-5 p-1 sm:p-1.5 lg:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {isEdit ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </ResizableAndDraggable>
        
        {/* Third resizable and draggable component */}
        <ResizableAndDraggable
          id={3}
          initialSize={{ width: windowSize.width / 1.3, height: windowSize.height / 2 }}
          initialPosition={{ x: windowSize.width / 10, y: (windowSize.height / 2.2) }}
          scale={scale}
        >
          {/* Table for displaying user data */}
          <div className="relative overflow-y-auto max-h-full mx-auto shadow-md sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Map over user data to display in table */}
                  {result.result && result.result.map((user, index) => {
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
                        <td className="px-6 py-4">
                          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { handleClick(user) }}>Edit</a>
                        </td>
                      </tr>
                    )
                  })}
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
