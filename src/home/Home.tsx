'use client'
import React from "react";
import "./App.css";

import {TopBanner} from "stare/home/views/TopBanner";
import {ChallengeView} from "stare/home/challenge/ChallengeView";
import {GamingSection} from "stare/home/gaming/GamingSection";

const Home: React.FC = () => {
    const searchRestaurants = () => window.open("https://www.google.com/search?q=restaurants+near+me", "_blank");
    const searchMovies = () => window.open("https://www.google.com/search?q=movies+near+me", "_blank");

    return (
        <div className={"main-container"}>
            <TopBanner/>
            <div className="container">
                <h1>
                    This Valentine {" "}
                    <a
                        href="https://twitter.com/intent/tweet?text=This%20Valentine%E2%80%99s%20Day%2C%20spend%20time%20that%20truly%20matters.%20Special%20offers%20await%20on%20StareAtYourWife.com.%20%23ValentinesDay%20%23StareAtYourWife"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="twitter-hashtag ml-1"
                    >
                        #StareAtYourWife
                    </a>
                </h1>

                <ChallengeView/>

                <div className={'twitter-tweet-container'}>
                    <blockquote className="twitter-tweet"><p lang="en" dir="ltr">This Valentine’s Day <a
                        href="https://twitter.com/hashtag/StareAtYourWife?src=hash&amp;ref_src=twsrc%5Etfw">#StareAtYourWife</a><br/><br/>It’s
                        14th January. <br/><br/>Exactly one month to Valentine’s Day. ❤️</p>&mdash; Ankur Raina
                        (@imankurraina) <a
                            href="https://twitter.com/imankurraina/status/1879046168203935880?ref_src=twsrc%5Etfw">January
                            14, 2025</a></blockquote>
                    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </div>

                <div className="text-section">
                    <h2>No Matter If You&#39;re In The Office Or At Home</h2>
                    <h3>Now You Have The Freedom To Stare At Your Partner For Hours</h3>
                    <h3>At StareAtYourWife.com, We Take Pride In Connecting People</h3>
                    <h3>And Making The World A Better Place</h3>
                    <h4>Give Us Some Love ❤️ & Share With Friends</h4>
                </div>

                <GamingSection/>

                <button onClick={searchRestaurants}>Find Restaurants Near Me</button>
                <button onClick={searchMovies}>Find Movies Near Me</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}} id={"videoContainer"}>
                <iframe
                    id={'videoiframe'}
                    src="https://www.youtube.com/embed/oYsadFe6iL4?si=VH_ddsJqYrZUIQhR"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>

            </div>
            <h4>
                <i>Note: All code is running on your browser & doesn&#39;t store any data or images</i>
            </h4>
            <h4>
                <i>
                    You can check, contribute or fork the <a href="https://github.com/Ankur10gen/stareatyourwife">code
                    on github here</a>
                </i>
            </h4>
        </div>
    );
};

export default Home;
