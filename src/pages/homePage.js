import React, { useEffect, useState } from "react";
import './../styles/homePage.css'
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import ApiHandler from "../apiHandler/apiHandler";
import BuyGiftCard from "../components/giftTabs/buyGiftCard";
import CheckBalance from "../components/giftTabs/checkBalance";
import ReloadCard from "../components/giftTabs/reloadCard";

export const HomePage = () => {
    let apiHandler = new ApiHandler();
    const [giftCardList, setGiftCardList] = useState([]);

    const getAllCards = () => {
        apiHandler.getAllGiftCards((data) => {
            setGiftCardList(data.giftcards)
        })
    }

    useEffect(() => {
        getAllCards()
    }, [])
    return (
        <div>
            <section className="gift_tabs_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tabs_container">
                                <div className="container mt-5">
                                    <ul className="nav nav-tabs" id="myTabs">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="buy-gift" data-bs-toggle="tab" href="#buy-gift-card">Buy Gift Card</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="check-balance-tab" data-bs-toggle="tab" href="#check-balance">Check Balance</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="reload-tab" data-bs-toggle="tab" href="#reload-card">Reload Card</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content mt-2">
                                        <div className="tab-pane fade show active" id="buy-gift-card">
                                            <BuyGiftCard giftCardList={giftCardList} />
                                        </div>
                                        <div className="tab-pane fade" id="check-balance">
                                            <CheckBalance />
                                        </div>
                                        <div className="tab-pane fade" id="reload-card">
                                            <ReloadCard giftCardList={giftCardList} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="social py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="social_box">
                                <h1>Let's Connect on social!</h1>
                                <ul className="social_list d-flex justify-content-center pt-4">
                                    <li><FaFacebookF size={32} /></li>
                                    <li> <FaTwitter size={32} /></li>
                                    <li><FaLinkedinIn size={32} /></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="social_box">
                                <ul className="image_list d-flex justify-content-center pt-4">
                                    <li>   <img src={require("./../assets/images/instagram-7.webp")} alt="Logo" /> </li>
                                    <li>  <img src={require("./../assets/images/instagram-8.webp")} alt="Logo" /></li>
                                    <li> <img src={require("./../assets/images/instagram-9.webp")} alt="Logo" /></li>
                                    <li> <img src={require("./../assets/images/instagram-10.webp")} alt="Logo" /></li>
                                    <li> <img src={require("./../assets/images/instagram-11.webp")} alt="Logo" /></li>
                                    <li> <img src={require("./../assets/images/instagram-12.webp")} alt="Logo" /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}





export default HomePage;