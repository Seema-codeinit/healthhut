import React, { useState } from 'react'
import ApiHandler from '../../apiHandler/apiHandler';

export default function BuyGiftCard(props) {
    let apiHandler = new ApiHandler();
    const { giftCardList } = props
    const [selectedAmountToSend, setSelectedAmountToSend] = useState('');
    const [customInput, setCustomInput] = useState(false);
    const [error, setError] = useState('')

    const initialFormValues = {
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
        gift_card_code_To_Send: ''
    };

    const [formValues, setFormValues] = useState(initialFormValues);

    const handleInputChange = (field, value) => {
        setFormValues((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const sendGiftCard = (e) => {
        e.preventDefault();
        if(!formValues.customAmountToSend || !formValues.amountToSend ){
            setError('Please select amount to continue')
            return;
        }
        apiHandler.sendGiftCard(formValues, (data) => {
            console.log(data.giftcards);
            setFormValues(initialFormValues);
            setError('')
        });
    }
    return (
        <div className="row py-5">
            <div className="col-lg-6">
                <div className="leftBox">
                    <h1>Give the <span className="perfect">Perfect</span><span className="gift"> Gift</span></h1>
                    <p>Get a voucher for yourself or gift one to a friend</p>
                    <div className="imageBox">
                        <img src={require("../../assets/images/gift.webp")} alt="Logo" />
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
                    {error && (<p className='pt-3' style={{color: 'red'}}>{error}</p>)}
                    <div className="form_box">
                        <form acton={''} onSubmit={(e) => { sendGiftCard(e) }} className="form_section" method="post">
                            {customInput && (<div className="form-one">
                                <label htmlFor="form" className="form-label">Custom Amount</label>
                                <input required type="number" className={'form-control mb-3'} placeholder="Custom Amount" id="from" aria-describedby="from" value={formValues.customAmountToSend} onChange={(e) => { handleInputChange('customAmountToSend', e.target.value); handleInputChange('amountToSend', '') }} />
                            </div>)
                            }

                            <div className="form-one">
                                <label htmlFor="form" className="form-label">From</label>
                                <input required type="text" className="form-control mb-3" placeholder="First Name" id="from" aria-describedby="from" value={formValues.purchaser_first_name} onChange={(e) => { handleInputChange('purchaser_first_name', e.target.value) }} />
                                <input required type="text" className="form-control mb-3" placeholder="Last Name" id="from" aria-describedby="from" value={formValues.purchaser_last_name} onChange={(e) => { handleInputChange('purchaser_last_name', e.target.value) }} />
                                <input required={true} type="email" className="form-control my-4" placeholder="Email Address" id="from" aria-describedby="from" value={formValues.purchaser_email} onChange={(e) => { handleInputChange('purchaser_email', e.target.value) }} />
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
                            <button type="submit" className="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
