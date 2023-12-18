import React, { useState } from 'react'
import ApiHandler from '../../apiHandler/apiHandler';

export default function ReloadCard(props) {
    let apiHandler = new ApiHandler();
    const { giftCardList } = props
    const [remainingBalance, setRemainingBalance] = useState('');
    const [selectedAmountReload, setSelectedAmountReload] = useState('');
    const [customInput1, setCustomInput1] = useState(false);
    const [error , setError] = useState('');

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

    const reloadGift = (e) => {
        e.preventDefault();
        if(!formValues.amountForReload || !formValues.customAmountForReload ){
            setError('Please select amount to continue')
            return;
        }
        apiHandler.addBalanceToGiftCard(formValues, (data) => {
            setRemainingBalance(data.remainingAmount);
            setFormValues(initialFormValues);
            setError('')
        });
    }
    return (
        <div className="row d-flex justify-content-center py-5">
            <div className="col-md-7">
                <h1 className="text-center"><span className="money">Add money</span> to your gift card.</h1>
                <form acton={''} onSubmit={(e) => { reloadGift(e) }} className="form_section" method="post">
                    <div className="from_1 py-3">
                        <label htmlFor="form" className="form-label">Gift Card ID</label>
                        <input required type="text" className="form-control mb-3" placeholder="Card Id" id="from" aria-describedby="from" value={formValues.gift_card_code_To_Reload} onChange={(e) => { handleInputChange('gift_card_code_To_Reload', e.target.value) }} />
                    </div>
                    {remainingBalance && (<h6>Your Remaining Balance-: ${remainingBalance}</h6>)}
                    <button type='submit' className="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                    {error && (<p className='pt-3' style={{color: 'red'}}>{error}</p>)}
                    <div className="btn_section mt-4">
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
    )
}
