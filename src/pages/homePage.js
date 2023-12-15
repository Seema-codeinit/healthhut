import React from "react";
import './../styles/homePage.css'
import gift from './../assets/images/gift.webp';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export const HomePage = () => {
    return (
        <div>
            <section className="tabs_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tabs_container">
                            <div className="container mt-5">
                                <ul className="nav nav-tabs" id="myTabs">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-bs-toggle="tab" href="#contact">Contact</a>
                                    </li>
                                </ul>

                                <div className="tab-content mt-2">
                                    <div className="tab-pane fade show active" id="home">
                                       <div className="row">
                                        <div className="col-lg-6">
                                            <div className="leftBox">
                                                <h1>Give the <span className="perfect">Perfect</span><span className="gift"> Gift</span></h1>
                                                <p>Get a voucher for yourself or gift one to a friend</p>
                                                <div className="imageBox">
                                                <img src={require("./../assets/images/gift.webp")} alt="Logo"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form_container">
                                                <h4>EGIFT CARD AMOUNT</h4>
                                                <ul className="button_list">
                                                    <li className="active"><button className="btn btn-success btn_first">$15.00</button></li>
                                                    <li><button className="btn">$25.00</button></li>
                                                    <li><button className="btn">$50.00</button></li>
                                                    <li><button className="btn">$100.00</button></li>
                                                    <li><button className="btn">CUSTOM</button></li>
                                                </ul>
                                                <div className="form_box">
                                                    <form className="form_section">
                                                        <div className="from_1">
                                                            <label for="from" class="form-label">From</label>
                                                            <input type="text" class="form-control mb-3" placeholder="First Name" id="from" aria-describedby="from" />
                                                            <input type="text" class="form-control mb-3" placeholder="Last Name" id="from" aria-describedby="from" />
                                                            <input type="email" class="form-control my-4" placeholder="Email Address" id="from" aria-describedby="from" />
                                                        </div>
                                                   
                                                    <div className="checkbox d-flex align-itens-center">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <label class="form-check-label ps-3" for="exampleCheck1">I want to send it to myself</label>
                                                    </div>
                                                    <div className="from_1 mt-3">
                                                        <label for="from" class="form-label">To</label>
                                                        <input type="text" class="form-control mb-3" placeholder="First Name" id="from" aria-describedby="from" />
                                                        <input type="text" class="form-control mb-3" placeholder="Last Name" id="from" aria-describedby="from" />
                                                        <input type="email" class="form-control my-4" placeholder="Email Address" id="from" aria-describedby="from" />
                                                        <label for="exampleFormControlTextarea1" class="form-label">PERSONAL MESSAGE (Optional)</label>
                                                        <textarea class="form-control mb-5" placeholder="Message" id="exampleFormControlTextarea1" rows="5"></textarea>
                                                    </div>
                                                   
                                                    <button type="submit" class="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                       </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile">
                                        
                                        <div className="row d-flex justify-content-center pt-5">
                                            <div className="col-md-7">
                                            <h1 className=" text-center">Enter your gift card number to check your balance.</h1>
                                            <form className="form_section">
                                            <div className="from_1">
                                                <label for="from" class="form-label">Gift Card ID</label>
                                                <input type="text" class="form-control mb-3" placeholder="Card Id" id="from" aria-describedby="from" />
                                            </div>
                                            <button type="submit" class="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                                        </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="contact">
                                    <div className="row d-flex justify-content-center pt-5">
                                        <div className="col-md-7">
                                            <h1 className="text-center"><span className="money">Add money</span> to your gift card.</h1>
                                            <form className="form_section">
                                                <div className="from_1">
                                                    <label for="from" class="form-label">Gift Card ID</label>
                                                    <input type="text" class="form-control mb-3" placeholder="Card Id" id="from" aria-describedby="from" />
                                                </div>
                                            <button type="submit" class="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                                            <div className="btn_section pt-4">
                                            <h4>EGIFT CARD AMOUNT</h4>
                                                <ul className="button_list pt-4">
                                                    <li className="active"><button className="btn btn-success btn_first">$15.00</button></li>
                                                    <li><button className="btn">$25.00</button></li>
                                                    <li><button className="btn">$50.00</button></li>
                                                    <li><button className="btn">$100.00</button></li>
                                                    <li><button className="btn">CUSTOM</button></li>
                                                </ul>
                                            </div>
                                           
                                            </form>
                                        </div>
                                    </div>
                                       
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
                                    <li>   <img src={require("./../assets/images/instagram-7.webp")} alt="Logo"/> </li>
                                    <li>  <img src={require("./../assets/images/instagram-8.webp")} alt="Logo"/></li>
                                    <li> <img src={require("./../assets/images/instagram-9.webp")} alt="Logo"/></li>
                                    <li> <img src={require("./../assets/images/instagram-10.webp")} alt="Logo"/></li>
                                    <li> <img src={require("./../assets/images/instagram-11.webp")} alt="Logo"/></li>
                                    <li> <img src={require("./../assets/images/instagram-12.webp")} alt="Logo"/></li>
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