import { createContext, useState } from "react";
import PropTypes from "prop-types";
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-modal';
import YouTube from "react-youtube";

const MovieContext = createContext();

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};

const MovieProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [trailerKey, setTrailerKey] = useState("")

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
        <MovieContext.Provider value={{ handleTrailer }}>
            {children}
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
        </MovieContext.Provider>
    );
}

MovieProvider.propTypes = {
    children: PropTypes.node
};

export { MovieContext, MovieProvider }