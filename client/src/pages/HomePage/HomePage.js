import React, { useEffect, useRef } from "react";
import { Button, Card, Collapse } from "antd";
import { useNavigate } from "react-router-dom";
import homepageImage from "../../image/homepage.webp";
import carousel1 from "../../image/homepage-carousel/1.png";
import carousel2 from "../../image/homepage-carousel/2.png";
import carousel3 from "../../image/homepage-carousel/3.png";
import carousel4 from "../../image/homepage-carousel/4.png";
import carousel5 from "../../image/homepage-carousel/5.png";
import carousel6 from "../../image/homepage-carousel/6.png";
import carousel7 from "../../image/homepage-carousel/7.png";
import carousel8 from "../../image/homepage-carousel/8.png";
import carousel9 from "../../image/homepage-carousel/9.png";
import carousel10 from "../../image/homepage-carousel/10.png";
import carousel11 from "../../image/homepage-carousel/11.png";
import carousel12 from "../../image/homepage-carousel/12.png";
import carousel13 from "../../image/homepage-carousel/13.png";
import carousel14 from "../../image/homepage-carousel/14.png";
import carousel15 from "../../image/homepage-carousel/15.png";
import r1 from "../../image/ranking1.jpg";
import r2 from "../../image/ranking2.jpg";
import r3 from "../../image/ranking3.jpg";
import "./HomePage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/rankings");
  };

  // const scrollToFAQ = () => {
  //   const faqSection = document.getElementById("homepage-qa-section");
  //   if (faqSection) {
  //     faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  const carouselRef = useRef(null);

  const text1 = `
  This game is designed for basketball enthusiasts and should be accessible at no cost to everyone who loves the sport.
`;

  const text2 = `
  GC represents 'Game Currency,' a virtual currency that players can use to purchase athletes based on their current market value within the game.
`;

  const text3 = `
  The index displayed on the user's 'My Team' page highlights the most profitable transaction made for that player.
`;

  const text4 = `
  To view the transaction history of a player, hover over the 'Sell' button after choosing a player from your team.
`;

  const text5 = `
  For instance, if you purchased 100 shares of LeBron at a price of 35 and later sold them at 40, the profit from this transaction would be calculated as 
(
40
×
100
)
−
(
35
×
100
)
=
500
(40×100)−(35×100)=500 points. The ranking system, based on a specific timeframe, lists the top 10 users with the most points. Note that the points can also be negative if shares are sold at a price lower than the purchase price.
`;

  const text6 = `
  This game is currently under development and will soon include additional features such as the ability for users to trade with each other. Please stay tuned for the latest updates!
  `;

  const items1 = [
    {
      key: "1",
      label: "Is there a fee to participate in the game?",
      children: <p>{text1}</p>,
    },
  ];

  const items2 = [
    {
      key: "2",
      label: "What is the significance of GC within the game?",
      children: <p>{text2}</p>,
    },
  ];

  const items3 = [
    {
      key: "3",
      label: "What does the index represent on the 'My Team' page?",
      children: <p>{text3}</p>,
    },
  ];

  const items4 = [
    {
      key: "4",
      label: "Where can I view the details of all my transactions?",
      children: <p>{text4}</p>,
    },
  ];

  const items5 = [
    {
      key: "5",
      label: "Can you explain how the ranking system operates?",
      children: <p>{text5}</p>,
    },
  ];

  const items6 = [
    {
      key: "6",
      label: "What happens when all shares of a player are sold out?",
      children: <p>{text6}</p>,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollWidth = carouselRef.current.scrollWidth;
      const clientWidth = carouselRef.current.clientWidth;
      const scrollLeft = carouselRef.current.scrollLeft;

      if (scrollLeft + clientWidth >= scrollWidth) {
        carouselRef.current.scrollLeft = 0;
      }
    };

    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 0.5;
        handleScroll();
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-content">
      <div className="homepage-image-section">
        <img
          src={homepageImage}
          alt="nba-homepage"
          className="homepage-image"
        />
        <div className="homepage-image-text-overlay">
          <h1>Buy, sell trade and form collections</h1>
          <p>
            Trade NBA players like stocks. Buy, sell, and build your dream team
            by investing in your favorite players. Track performance, make
            strategic trades, and elevate your basketball experience. Join our
            marketplace today!
          </p>

          <Button
            type="default"
            size="large"
            className="homepage-start-button"
            // onClick={scrollToFAQ}
          >
            LEARN MORE
          </Button>
        </div>
      </div>
      <h1 className="homepage-second-section">There's value in being a fan.</h1>
      <div className="homepage-carousel-section" ref={carouselRef}>
        <div className="scrolling-images">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <img src={carousel1} alt="slide-1" className="carousel-image" />
              <img src={carousel2} alt="slide-2" className="carousel-image" />
              <img src={carousel3} alt="slide-3" className="carousel-image" />
              <img src={carousel4} alt="slide-4" className="carousel-image" />
              <img src={carousel5} alt="slide-5" className="carousel-image" />
              <img src={carousel6} alt="slide-6" className="carousel-image" />
              <img src={carousel7} alt="slide-7" className="carousel-image" />
              <img src={carousel8} alt="slide-8" className="carousel-image" />
              <img src={carousel9} alt="slide-9" className="carousel-image" />
              <img src={carousel10} alt="slide-10" className="carousel-image" />
              <img src={carousel11} alt="slide-11" className="carousel-image" />
              <img src={carousel12} alt="slide-12" className="carousel-image" />
              <img src={carousel13} alt="slide-13" className="carousel-image" />
              <img src={carousel14} alt="slide-14" className="carousel-image" />
              <img src={carousel15} alt="slide-15" className="carousel-image" />
              {/* Repeat images to create a continuous effect */}
              <img src={carousel1} alt="slide-1" className="carousel-image" />
              <img src={carousel2} alt="slide-2" className="carousel-image" />
              <img src={carousel3} alt="slide-3" className="carousel-image" />
              <img src={carousel4} alt="slide-4" className="carousel-image" />
              <img src={carousel5} alt="slide-5" className="carousel-image" />
              <img src={carousel6} alt="slide-6" className="carousel-image" />
              <img src={carousel7} alt="slide-7" className="carousel-image" />
              <img src={carousel8} alt="slide-8" className="carousel-image" />
              <img src={carousel9} alt="slide-9" className="carousel-image" />
              <img src={carousel10} alt="slide-10" className="carousel-image" />
              <img src={carousel11} alt="slide-11" className="carousel-image" />
              <img src={carousel12} alt="slide-12" className="carousel-image" />
              <img src={carousel13} alt="slide-13" className="carousel-image" />
              <img src={carousel14} alt="slide-14" className="carousel-image" />
              <img src={carousel15} alt="slide-15" className="carousel-image" />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="homepage-carousel-section-paragraph">
        <p>
          Keep an eye on player performance and market trends to sell your
          shares at the most profitable time.
        </p>
      </div>
      <div className="homepage-ranking-section">
        <h1>Climb the Leaderboard, Earn Your Glory!</h1>
        <img
          src={r1}
          alt="nba-homepage-ranking"
          className="homepage-image-r1"
        />
        <img src={r2} alt="nba-homepage-ranking" className="homepage-image-r" />
        <img src={r3} alt="nba-homepage-ranking" className="homepage-image-r" />
        <div className="ranking-testimonials">
          <h3>What Our Users Say</h3>
          <div className="ranking-testimonials-cards">
            <Card className="testimonial-card" bordered={false}>
              <blockquote>
                <p>
                  "The ranking system is incredibly motivating. It keeps me
                  engaged and striving to improve my trades every day 🤑 📈"
                </p>
                <footer>- Alex Johnson </footer>
              </blockquote>
            </Card>
            <Card className="testimonial-card" bordered={false}>
              <blockquote>
                <p>
                  "I love the weekly updates and the competition. It adds a
                  whole new level of excitement to the game! 😤"
                </p>
                <footer>- Samantha Lee </footer>
              </blockquote>
            </Card>
            <Card className="testimonial-card" bordered={false}>
              <blockquote>
                <p>
                  "The real-time updates and competition make the game much more
                  engaging."
                </p>
                <footer>- Michael Brown </footer>
              </blockquote>
            </Card>
          </div>
        </div>
        <Button
          type="default"
          className="homepage-ranking-button"
          onClick={handleNavigate}
        >
          View the Rankings
        </Button>
      </div>
      <div id="homepage-qa-section" className="homepage-qa-section">
        <h2>Frequently Asked Question</h2>
        <Collapse
          accordion
          className="homepage-custom-collapse"
          items={items1}
        />
        <Collapse
          accordion
          className="homepage-custom-collapse"
          items={items2}
        />
        <Collapse
          accordion
          className="homepage-custom-collapse"
          items={items3}
        />
        <Collapse
          accordion
          className="homepage-custom-collapse"
          items={items4}
        />
        <Collapse
          accordion
          className="homepage-custom-collapse"
          items={items5}
        />
        <Collapse
          accordion
          className="homepage-custom-collapse"
          items={items6}
        />
      </div>
    </div>
  );
};

export default HomePage;
