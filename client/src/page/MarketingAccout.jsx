import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';

function MarketingAccount() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/server/MarketingActivity/getAllDetails")
      .then((result) => {
        console.log("data: ", typeof result.data.data); // Check the fetched data
        console.log("data: ", Object.values(result.data.data)); // Check the fetched data
        setUsers(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors
  }, []);

  const deleteReview = async (userId) => {
    await axios.delete(`http://localhost:3001/server/MarketingActivity/deleteDetailsById/${userId}`)
      .then((response) => {
        console.log("AdDelete", response.data);
        // After deleting, you might want to update the state to remove the deleted item from the UI
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className=''>
        {/* Header */}
        <Navbar />
      </div>
      <div className=''>
        {/* Added green background */}
        <div className='flex flex-row'>
          <div className="flex w-[300px] h-[1200px] bg-lime-900">
            <div className="p-5">
              <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
                <Link to="/MarketingProfile">Profile</Link>
              </button>
              <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                <Link to="/MarketingPage">Activity</Link>
              </button>
              <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                <Link to="/paymentAddMarketing">Payment</Link>
              </button>
            </div>
          </div>
         
          <div className='ml-4 w-full lg:w-3/4 xl:w-4/5'>
            
            <Link to={"/MarketingAddActivity"} className='bg-green-500 text-white py-2 px-4 rounded-md mb-4 inline-block'>Add Advertisement</Link>
            <table className="border-collapse border w-full" cellSpacing={0}>
              <thead>
                <tr className=''>
                  <th className="border border-green-500 px-4 py-2">S.No.</th>
                  <th className="border border-green-500 px-4 py-2">Advertisement name</th>
                  <th className="border border-green-500 px-4 py-2">Description</th>
                  <th className="border border-green-500 px-4 py-2">Duration</th>
                  <th className="border border-green-500 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="border border-green-500 px-4 py-2">{index + 1}</td>
                    <td className="border border-green-500 px-4 py-2">{user.name}</td>
                    <td className="border border-green-500 px-4 py-2">{user.des}</td>
                    <td className="border border-green-500 px-4 py-2">{user.duration}</td>
                    <td className='border border-green-500 px-4 py-2'>
                      <Link to={`/MarketingUpdateActivity/${user._id}`} className="text-green-600 hover:text-green-800">Edit</Link>
                      <button className="text-red-600 hover:text-red-800 ml-2" onClick={() => deleteReview(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Footer */}
        <div className='w-auto h-[100px] items-end'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MarketingAccount;
