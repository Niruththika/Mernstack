import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Navbar from "../../component/Navbar";
import axios from "axios";
import Footer from "../../component/Footer";

export default function InventryAddtoform() {
    const [InProduct, setInProduct] = useState([]);
    const [UserProfile, setUserProfile] = useState([]);


    const handleDelete = (id)=>
    {
      axios.delete(`http://localhost:3001/server/inventoryapi/inventoryDelete/${id}`)
      .then(res=>{console.log(res)
          window.location.reload()
      } )
      .catch(err=>console.log(err))
    }

    
    useEffect(() => {
      axios
        .get("http://localhost:3001/server/inventoryapi/inventoryGetAll")
        .then((result) => {
          console.log("data: ", typeof result.data.data); // Check the fetched data
          console.log("data: ", Object.values(result.data.data)); // Check the fetched data
          setInProduct(result.data ? Object.values(result.data.data) : []);
          setUserProfile(result.data ? Object.values(result.data.data) : []);
        })
        .catch((err) => console.error(err)); // Log any errors
    }, []);
    
   

  return (
    <div>
    
 <Navbar/>

    {/* sidebar button*/}
    <div className=" flex flex-row">
       <div className="flex w-[300px] h-[1200px] bg-lime-900">
          <div className="p-5">
            <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
              <Link to="/inventryProfile">Profile</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/inventroyAddtoForms">Add Form</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/inventryAnalytics">Analytics</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/inventryCalculation">Caluculate</Link>
            </button>
            
          </div>
        </div>
      <div className="w-[20%] h-[600px] flex-grow border rounded-b">
          <main className="main-container">
          <div className="">
            <h3 className="text-3xl text-center mt-6">Inventory Product list</h3>
        
          </div>
          </main>

        {/* search */}
          <div className="w-[300px] ml-[50px]">
          <label className="mt-3">
            
            <input
              class="search"
              placeholder="Search for anything..."
              type="text"
              name="search"
              className="w-56 h-8 px-4 py-1 mt-3"

            />
          </label>
          </div>

          <div className=" bg-white rounded p-3 ">
            <div className="flex justify-en">
              <Link to="/inventryCreateForm" className=" ml-[1000px] bg-slate-500  text-white px-3 py-3 rounded-2xl btn m-[30px] flex"><IoMdAddCircleOutline  className=" w-10 h-5"/> Add Product</Link>
            </div>
            <div className="tableContainer">
  <table className="w-full border-collapse border border-gray-300">
    <thead className="bg-gray-200">
      <tr>
        <th className="border border-gray-300 px-4 py-2">ID</th>
        <th className="border border-gray-300 px-4 py-2">Name</th>
        <th className="border border-gray-300 px-4 py-2">Qty</th>
        <th className="border border-gray-300 px-4 py-2">Price (LKR)</th>
        <th className="border border-gray-300 px-4 py-2">Description</th>
        <th className="border border-gray-300 px-4 py-2">Action</th>
      </tr>
    </thead>

    <tbody>
      {/* get all data from db */}
      {InProduct.map((product, index) => (
        <tr key={index} className="bg-white">
          <td className="border border-gray-300 px-4 py-2">{product.pcode}</td>
          <td className="border border-gray-300 px-4 py-2">{product.name}</td>
          <td className="border border-gray-300 px-4 py-2">{product.qty}</td>
          <td className="border border-gray-300 px-4 py-2">{product.price}</td>
          <td className="border border-gray-300 px-4 py-2">{product.des}</td>
          <td className="border border-gray-300 px-4 py-2 flex space-x-2">
            <Link to={`/inventryUpdateform/${product._id}`} className="btn-update bg-blue-500 text-white px-3 py-1 rounded">Edit</Link>
            <button className="btn-delete bg-red-500 text-white px-3 py-1 rounded" onClick={(e)=>handleDelete(product._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
      </div>
    </div>
    <br/>
    <div>
    <Footer/>
    </div>
  </div>
)
}
