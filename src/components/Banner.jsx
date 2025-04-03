import starRating from "../assets/rating.png";
import temp1 from "../assets/temp-1.png";
import iconPlay from "../assets/play-button.png"

const Banner = () => {
return (
    <div className="w-full h-[80dvh] md:h-[80dvh] lg:h-[90dvh] bg-banner bg-center bg-no-repeat bg-cover relative">
        <div className="w-full h-full bg-black/30"></div>
        <div className="w-full h-full flex flex-col md:flex-row justify-between items-center absolute top-0 left-0 text-white">
            <div className="flex-1 p-4 space-y-6 max-h-full overflow-auto">
                <p className="bg-gradient-to-r from-red-500 to-red-300 w-fit p-2 ">TV show</p>
                <p className="font-bold text-2xl md:text-4xl ">Nghe nói em thích anh</p>
                <div className="flex space-x-2">
                    <img src={starRating} alt="" className="w-8 h-8"/>
                    <img src={starRating} alt="" className="w-8 h-8"/>
                    <img src={starRating} alt="" className="w-8 h-8"/>
                    <img src={starRating} alt="" className="w-8 h-8"/>
                    <img src={starRating} alt="" className="w-8 h-8"/>
                </div>
                <p className="line-clamp-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deserunt nam, sed tempore quod officia earum ad provident nesciunt temporibus placeat in ratione reprehenderit saepe quos ea quam illo odio, voluptatem obcaecati labore ipsa. Veniam accusantium ea ab deleniti aut maiores doloribus deserunt tenetur in quia ducimus atque ut, assumenda facilis fugit laboriosam facere recusandae aliquam est a unde officia, temporibus excepturi aspernatur? Nobis vel facere dolorum voluptate rem, est autem maiores quia, alias quaerat deserunt ullam? Nemo corrupti nihil debitis? Hic aliquam molestias obcaecati molestiae similique sint, quas et accusamus pariatur accusantium adipisci nam fugit. Ipsum dolores impedit reiciendis.</p>
                <div className="space-x-4 font-bold">
                    <button className="bg-black p-2">Chi tiết</button>
                    <button className="bg-red-500 p-2">Xem phim</button>
                </div>
            </div>
            <div className="flex-1 hidden sm:hidden md:hidden lg:flex justify-center items-center p-4 ">    
            <div className="w-[300px] h-[400px] relative group">
            <img
                src={temp1}
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 transition-all ease-in-out group-hover:backdrop-blur-sm"></div>
                <img
                    src={iconPlay}
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                />
            </div>
            </div>
        </div>
    </div>
);
};

export default Banner;