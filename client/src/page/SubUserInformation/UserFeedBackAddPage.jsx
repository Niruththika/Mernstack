import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

function UserFeedBackAddPage() {
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [rating, setRating] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/server/FeedBackUser/create",
                {
                    rating,
                    name,
                    des
                }
            );

            console.log(response);
            alert('Review added successfully!');
            navigate('/UserFeedBack');
        } catch (error) {
            console.error("Error creating UserDetails:", error);
            alert('Error adding review!');
        }
    };


    return (
        <div className='bg-slate-200 rounded-lg py-7 w-[500px] h-[500px] mt-5 ml-[500px] p-7'>
            <Link to={"/UserFeedBack"} className="block mb-4">Back</Link>
            <h3 className="text-2xl font-bold mb-4">Add New Review</h3>
            <form className='addreviewForm' onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="adname" className="text-xl mb-2 block  font-medium text-gray-700">Product Rating (?/5)</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        id="adname"
                        name="adname"
                        autoComplete='off'
                        className='w-[400px] h-[40px] px-2 rounded-lg bg-green-200'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="adname" className="text-xl mb-2 block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="adname"
                        name="adname"
                        autoComplete='off'
                        placeholder='Product Name'
                        className='w-80 w-[400px] h-[40px] px-2 rounded-lg bg-white'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="descript" className="text-xl mb-2 block text-sm font-medium text-gray-700">Review</label>
                    <input
                        type="text"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        id="descript"
                        name="descript"
                        autoComplete='off'
                        placeholder='Description'
                        className='w-80 w-[400px] h-[40px] px-2 rounded-lg bg-white'
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className='bg-green-600 mt-9 px-4 py-2 rounded-3xl text-white'>ADD Review</button>
                </div>
            </form>
        </div>
    )
}

export default UserFeedBackAddPage;
