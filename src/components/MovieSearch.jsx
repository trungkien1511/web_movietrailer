import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "../context/MovieProvider";


const MovieSearch = ({ title, data }) => {

    const { handleTrailer } = useContext(MovieContext)


    return (
        <div className="w-[90dvw] pb-10 mx-auto flex flex-col ">
            <p className="text-white p-4">{title}</p>
            <div className="grid grid-cols-6 w-fit gap-20 ">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="w-[200px] h-[300px] relative group cursor-pointer"
                        onClick={() => handleTrailer(item.id)}
                    >
                        <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out">
                            <div className="absolute top-0 left-0 w-full h-full bg-black/40 group-hover:bg-transparent"></div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-full object-cover text-white"
                            />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                                <p className="text-white uppercase text-md line-clamp-2">
                                    {item.title || item.original_title}
                                </p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

MovieSearch.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
}

export default MovieSearch