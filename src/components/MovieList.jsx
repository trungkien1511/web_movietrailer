import { useContext } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "../context/MovieProvider";
import Carousel from "react-multi-carousel";


const MovieList = ({ title, data }) => {

    const { handleTrailer } = useContext(MovieContext)

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 10 },
        desktop: { breakpoint: { max: 3000, min: 1200 }, items: 7 },
        tablet: { breakpoint: { max: 1200, min: 600 }, items: 3 },
        mobile: { breakpoint: { max: 600, min: 0 }, items: 2 },
    };

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
        </div>
    );
};

MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
};

export default MovieList;