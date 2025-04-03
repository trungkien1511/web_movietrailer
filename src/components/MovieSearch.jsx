import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from 'react-modal';
import YouTube from "react-youtube";

const MovieSearch = ({ title, data }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [trailerKey, setTrailerKey] = useState("")


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleTrailer = async (id) => {
        setTrailerKey("")
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWRkNTgyZDE4M2NlYWU1Yjc5MzgwYWNiZmVmNGE2NCIsIm5iZiI6MTc0MzE0MTMxNC4xMDQsInN1YiI6IjY3ZTYzOWMyNWYzZTBhYzE4ODAwNGJkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ynNDpUfdOmi_kbjUrhFPJIcm2oJzXhs3v1SlvaQVEs`,
                }
            };

            const movieKey = await fetch(url, options)
            const data = await movieKey.json()
            setTrailerKey(data.results[0].key)
            setModalIsOpen(true)
            console.log(data)
        } catch (error) {
            setModalIsOpen(false)
            console.log(error)
        }
    }

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

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        position: "fixed",
                        zIndex: 9999,
                    },
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
            >
                <YouTube videoId={trailerKey} opts={opts} />
            </Modal>

        </div>
    )
}

MovieSearch.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
}

export default MovieSearch