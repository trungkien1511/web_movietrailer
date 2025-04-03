import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const Header = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");



    return (
        <div className="bg-black text-white min-1em-8percent h-20dvh lg:h-30dvh">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex space-x-10 items-center">
                    <h1 className="text-red-700 uppercase font-medium responsive-heading">Movie</h1>
                    <p className="responsive-text">Home</p>
                    <p className="responsive-text">About</p>
                    <p className="responsive-text">Contact</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="p-2 text-black bg-white border-amber-50 border"
                        onChange={(e) => setSearchValue(e.target.value)} // Cập nhật state khi nhập
                    />
                    <button
                        className="bg-red-500 p-2 rounded cursor-pointer"
                        onClick={() => onSearch(searchValue)}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    onSearch: PropTypes.func,
}

export default Header