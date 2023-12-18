import React, { useState } from 'react'
import ApiHandler from '../../apiHandler/apiHandler';

export default function CheckBalance() {

    let apiHandler = new ApiHandler();
    const [availableBalance, setAvailableBalance] = useState('');

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

    const checkBalance = (e) => {
        e.preventDefault();
        apiHandler.checkBalance(formValues, (data) => {
            setAvailableBalance(data.giftcard.gift_card_amount);
            setFormValues(initialFormValues);
        });
    }

    return (
        <div className="row d-flex justify-content-center py-5">
            <div className="col-md-7">
                <h1 className=" text-center">Enter your gift card number to check your balance.</h1>
                <form acton={''} onSubmit={(e) => { checkBalance(e) }} className="form_section" method="post">
                    <div className="from_1">
                        <label htmlFor="form" className="form-label">Gift Card ID</label>
                        <input required type="text" className="form-control mb-3" placeholder="Card Id" id="from" aria-describedby="from" value={formValues.gift_card_code_To_Check} onChange={(e) => { handleInputChange('gift_card_code_To_Check', e.target.value) }} />
                    </div>
                    <button type="submit" className="btn btn-success mt-3 w-100 submit_btn">Continue</button>
                    {availableBalance && (<h6 className="mt-3">Your Avilable Balance -: ${availableBalance}</h6>)}
                </form>
            </div>
        </div>
    )
}
