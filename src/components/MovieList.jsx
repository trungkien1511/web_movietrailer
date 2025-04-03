import React, { useState } from "react";
import PropTypes from "prop-types";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-modal';
import YouTube from "react-youtube";


const MovieList = ({ title, data }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [trailerKey, setTrailerKey] = useState("")

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 10 },
        desktop: { breakpoint: { max: 3000, min: 1200 }, items: 7 },
        tablet: { breakpoint: { max: 1200, min: 600 }, items: 3 },
        mobile: { breakpoint: { max: 600, min: 0 }, items: 2 },
    };

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
        <div className="w-[90dvw] mx-auto pb-10">
            <div className="text-white py-10 mb-5 uppercase">{title}</div>
            <Carousel responsive={responsive} >
                {data && data.map((item) => (
                    <div
                        key={item.id}
                        className="w-[200px] h-[300px] relative group mx-2 flex-shrink-0 cursor-pointer"
                        onClick={() => handleTrailer(item.id)}
                    >
                        <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out">
                            <div className="absolute top-0 left-0 w-full h-full bg-black/40 group-hover:bg-transparent"></div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute h-auto w-full bottom-2 text-center">
                                <p className="text-white uppercase text-sm line-clamp-2">
                                    {item.title || item.original_title}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

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
    );
};

MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
};

export default MovieList;