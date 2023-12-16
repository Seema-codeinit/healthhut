import React, { useEffect, useState } from "react";
import './../styles/homePage.css'
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import ApiHandler from "../apiHandler/apiHandler";

export const HomePage = () => {
    let apiHandler = new ApiHandler();
    const [giftCardList, setGiftCardList] = useState([]);
    const [availableBalance, setAvailableBalance] = useState('');
    const [remainingBalance, setRemainingBalance] = useState('');
    const [selectedAmountReload, setSelectedAmountReload] = useState('');
    const [selectedAmountToSend, setSelectedAmountToSend] = useState('');
    const [customInput, setCustomInput] = useState(false);
    const [customInput1, setCustomInput1] = useState(false);
    const [formValues, setFormValues] = useState({
        customAmountToSend: '',
        customAmountForReload: '',
        amountForReload: '',
        amountToSend: '',
        purchaser_first_name: '',
        purchaser_last_name: '',
        purchaser_email: '',
        recipient_first_name: '',
        recipient_last_name: '',
        recipient_email: '',
        giftToSelf: false,
        gift_card_code_To_Check: '',
        gift_card_code_To_Reload: '',
        gift_card_message: '',
        gift_card_code_To_Send: 'gift_card_code_To_Send'
    });

    const handleInputChange = (field, value) => {
        setFormValues((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };


    const getAllCards = () => {
        apiHandler.getAllGiftCards((data) => {
            setGiftCardList(data.giftcards)
        })
    }

    const sendGiftCard = (e) => {
        e.preventDefault();
        apiHandler.sendGiftCard(formValues, (data) => {
            setGiftCardList(data.giftcards)
        })
    }

    const checkBalance = (e) => {
        e.preventDefault();
        apiHandler.checkBalance(formValues, (data) => {
            setAvailableBalance(data.giftcard.gift_card_amount)
        })
    }

    const reloadGift = (e) => {
        e.preventDefault();
        apiHandler.addBalanceToGiftCard(formValues, (data) => {
            console.log(data)
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
                                            <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home">Buy Gift Card</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile">Check Balance</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="contact-tab" data-bs-toggle="tab" href="#contact">Reload Card</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content mt-2">
                                        <div className="tab-pane fade show active" id="home">
                                            <div className="row py-5">
                                                <div className="col-lg-6">
                                                    <div className="leftBox">
                                                        <h1>Give the <span className="perfect">Perfect</span><span className="gift"> Gift</span></h1>
                                                        <p>Get a voucher for yourself or gift one to a friend</p>
                                                        <div className="imageBox">
                                                            <img src={require("./../assets/images/gift.webp")} alt="Logo" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form_container">
                                                        <h4>EGIFT CARD AMOUNT</h4>
                                                        <ul className="button_list">
                                                            {
                                                                giftCardList?.map((_val, i) => (
                                                                    <li key={_val.id} onClick={() => { handleInputChange('amountToSend', _val.gift_card_amount); handleInputChange('gift_card_code_To_Send', _val.gift_card_code); setSelectedAmountToSend(_val.id); setCustomInput(false) }}>
                                                                        <button className={selectedAmountToSend == _val.id && !customInput ? "btn btn-success btn_first" : "btn"}>${_val.gift_card_amount}</button>
                                                                    </li>
                                                                ))
                                                            }
                                                            <li><button type="button" className={customInput ? "btn btn-success btn_first" : "btn"} onClick={() => { setCustomInput(true) }}>CUSTOM</button></li>
                                                        </ul>
                                                        <div className="form_box">
                                                            <form acton={''} onSubmit={(e) => { sendGiftCard(e)}} className="form_section" method="post">
                                                                {customInput && (<div className="form-one">
                                                                    <label htmlFor="form" className="form-label">Custom Amount</label>
                                                                    <input required type="number" className="form-control mb-3" placeholder="Custom Amount" id="from" aria-describedby="from" value={formValues.customAmountToSend} onChange={(e) => { handleInputChange('customAmountToSend', e.target.value); handleInputChange('amountToSend', '') }} />
                                                                </div>)
                                                                }

                                                                <div className="form-one">
                                                                    <label htmlFor="form" className="form-label">From</label>
                                                                    <input required type="text" className="form-control mb-3" placeholder="First Name" id="from" aria-describedby="from" value={formValues.purchaser_first_name} onChange={(e) => { handleInputChange('purchaser_first_name', e.target.value) }} />
                                                                    <input required type="text" className="form-control mb-3" placeholder="Last Name" id="from" aria-describedby="from" value={formValues.purchaser_last_name} onChange={(e) => { handleInputChange('purchaser_last_name', e.target.value) }} />
                                                                    <input required={true}  type="email" className="form-control my-4" placeholder="Email Address" id="from" aria-describedby="from" value={formValues.purchaser_email} onChange={(e) => { handleInputChange('purchaser_email', e.target.value) }} />
                                                                </div>

                                                                <div className="checkbox d-flex align-itens-center">
                                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" value={formValues.giftToSelf} onChange={(e) => { handleInputChange('giftToSelf', !formValues.giftToSelf) }} />
                                                                    <label className="form-check-label ps-3" htmlFor="exampleCheck1">I want to send it to myself</label>
                                                                </div>
                                                                {!formValues.giftToSelf && (<div className="form-one">
                                                                    <label htmlFor="form" className="form-label">To</label>
                                                                    <input required type="text" className="form-control mb-3" placeholder="First Name" id="from" aria-describedby="from" value={formValues.recipient_first_name} onChange={(e) => { handleInputChange('recipient_first_name', e.target.value) }} />
                                                                    <input required type="text" className="form-control mb-3" placeholder="Last Name" id="from" aria-describedby="from" value={formValues.recipient_last_name} onChange={(e) => { handleInputChange('recipient_last_name', e.target.value) }} />
                                                                    <input required type="email" className="form-control my-4" placeholder="Email Address" id="from" aria-describedby="from" value={formValues.recipient_email} onChange={(e) => { handleInputChange('recipient_email', e.target.value) }} />
                                                                </div>)
                                                                }
                                                                <div className="form-one">
                                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">PERSONAL MESSAGE (Optional)</label>
                                                                    <textarea className="form-control mb-5" placeholder="Message" id="exampleFormControlTextarea1" rows="5" value={formValues.gift_card_message} onChange={(e) => { handleInputChange('gift_card_message', e.target.value) }}></textarea>
                                                                    </div>
                                                                <button type="submit"  className="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile">
                                            <div className="row d-flex justify-content-center py-5">
                                                <div className="col-md-7">
                                                    <h1 className=" text-center">Enter your gift card number to check your balance.</h1>
                                                    <form  acton={''} onSubmit={(e) => { sendGiftCard(e)}} className="form_section" method="post">
                                                        <div className="from_1">
                                                            <label htmlFor="form" className="form-label">Gift Card ID</label>
                                                            <input required type="text" className="form-control mb-3" placeholder="Card Id" id="from" aria-describedby="from" value={formValues.gift_card_code_To_Check} onChange={(e) => { handleInputChange('gift_card_code_To_Check', e.target.value) }} />
                                                        </div>
                                                        <button type="button" onClick={(e) => { checkBalance(e) }} className="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                                                        {availableBalance && (<h6 className="mt-3">Your Avilable Balance -: ${availableBalance}</h6>)}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="contact">
                                            <div className="row d-flex justify-content-center py-5">
                                                <div className="col-md-7">
                                                    <h1 className="text-center"><span className="money">Add money</span> to your gift card.</h1>
                                                    <form  acton={''} onSubmit={(e) => { sendGiftCard(e)}} className="form_section" method="post">
                                                        <div className="from_1 py-3">
                                                            <label htmlFor="form" className="form-label">Gift Card ID</label>
                                                            <input required type="text" className="form-control mb-3" placeholder="Card Id" id="from" aria-describedby="from" value={formValues.gift_card_code_To_Reload} onChange={(e) => { handleInputChange('gift_card_code_To_Reload', e.target.value) }} />
                                                        </div>
                                                        <button onClick={(e) => { reloadGift(e) }} className="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                                                        <div className="btn_section mt-4">
                                                            {remainingBalance && (<h6>Remaining Balance Balance-: ${remainingBalance}</h6>)}
                                                            <h4 className="pt-2">AMOUNT TO ADD TO CARD</h4>
                                                            <ul className="button_list">
                                                                {
                                                                    giftCardList?.map((_val, i) => (
                                                                        <li key={_val.id} onClick={() => { handleInputChange('amountForReload', _val.gift_card_amount); setSelectedAmountReload(_val.id); setCustomInput1(false) }}>
                                                                            <button type="button" className={selectedAmountReload == _val.id && !customInput1 ? "btn btn-success btn_first" : "btn"}>${_val.gift_card_amount}</button>
                                                                        </li>
                                                                    ))
                                                                }
                                                                <li>
                                                                    <button type="button" className={customInput1 ? "btn btn-success btn_first" : "btn"} onClick={() => { setCustomInput1(true) }}>CUSTOM</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        {customInput1 && (<div className="form-one">
                                                            <label htmlFor="form" className="form-label">Custom Amount</label>
                                                            <input required type="number" className="form-control mb-3" placeholder="Custom Amount" id="from" aria-describedby="from" value={formValues.customAmountForReload} onChange={(e) => { handleInputChange('customAmountForReload', e.target.value); handleInputChange('amountForReload', '') }} />
                                                        </div>)
                                                        }

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