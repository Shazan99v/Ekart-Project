import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../styles/hero.css";
import "../styles/global.css"




const products = [
  {
    id: 1,
    name: "Gaming Headset",
    price: "$99",
    image: "https://images.pexels.com/photos/159472/headphones-instagram-video-games-razer-159472.jpeg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$149",
    image: "https://images.pexels.com/photos/10177085/pexels-photo-10177085.jpeg",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: "$49",
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
  },
  {
    id: 4,
    name: "Laptop",
    price: "$39",
    image: "https://images.pexels.com/photos/33092502/pexels-photo-33092502.jpeg",
  },
];

export default function Hero() {

  const navigate = useNavigate();


  return (
    <section className="hero">

      {/* Floating Glow */}
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>

      <div className="hero-content">

        {/* TEXT */}

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Discover <span>Next-Gen</span> Tech
          </h1>

          <p>
            Premium gadgets crafted for speed,
            power, and performance.
          </p>

          <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="hero-btn"
  onClick={() => navigate("/products")}
>
  Shop Now
</motion.button>

        </motion.div>


        {/* SWIPER */}

        <motion.div
          className="hero-swiper"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{
              delay: 2200,
            }}
            coverflowEffect={{
              rotate: 15,
              depth: 200,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            className="product-swiper"
          >

            {products.map((item) => (
              <SwiperSlide key={item.id}>

                <motion.div
                  className="product-card"
                  whileHover={{
                    scale: 1.08,
                    rotateY: 10,
                  }}
                >
                  <img src={item.image} alt={item.name} />

                  <h3>{item.name}</h3>

                  <p>{item.price}</p>

                </motion.div>

              </SwiperSlide>
            ))}

          </Swiper>

        </motion.div>

      </div>
    </section>
  );
}
