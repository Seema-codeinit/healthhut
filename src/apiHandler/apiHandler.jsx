class ApiHandler {
  constructor() {
    this._url = 'http://localhost:4000/api';
  }
  getResult = (url, method = "GET", data = null, headers = null, success = () => { }, faild = () => { }) => {
    let parameters = {};
    parameters.method = method;
    if (data) {
      parameters.body = data;
    } if (headers) {
      parameters.headers = headers;
    }
    try {
      fetch(this._url + url, parameters)
        .then(response => response.json())
        .then(response => {
          success(response);
        }
        ).catch((error) => {
          console.log(error)
          faild(error.message);
        }
        );
    } catch (error) {
      faild(error.message);
    }

  }

  getAllGiftCards = (success = () => { }, failure = () => { }) => {
    this.getResult("/giftcards", "GET", null, '', (response) => {
      success(response);
    }, failure);
  }


  sendGiftCard = (formValues, success = () => { }, failure = () => { }) => {
    const {customAmountToSend, amountToSend, purchaser_first_name, purchaser_last_name, purchaser_email, recipient_first_name, recipient_last_name, recipient_email, gift_card_message, gift_card_code_To_Send} = formValues

    const body = JSON.stringify({
      "date_purchased": "2023-12-12 12:32:16.000000",
      "transaction_id": "213124124",
      "gift_card_code": gift_card_code_To_Send,
      "purchaser_name":  purchaser_first_name + '' + purchaser_last_name,
      "purchaser_email": purchaser_email,
      "recipient_name": formValues.giftToSelf !== true ? recipient_first_name + '' + recipient_last_name : purchaser_first_name + '' + purchaser_last_name,
      "recipient_email": formValues.giftToSelf !== true ? recipient_email : purchaser_email,
      "gift_card_type": "1",
      "gift_card_message": gift_card_message,
      "gift_card_amount": amountToSend == '' ? customAmountToSend : amountToSend,
      "gift_card_redemption": "10",
      "gift_card_active": "1"
    })

    const headers = {
      'Content-Type': 'application/json',
    }

    this.getResult("/giftcards/create", "POST", body, headers, (response) => {
      console.log(response);
    }, failure);
  }




  checkBalance = (formValues, success = () => { }, failure = () => { }) => {
    this.getResult("/giftcards/" + formValues.gift_card_code_To_Check, "GET", null, '', (response) => {
      if (response.success === false) {
        failure(response.msg)
      } else if (response.success === true) {
        success(response);
      } else {
        failure("something went wrong");
      }
    }, failure);
  }




  addBalanceToGiftCard = (formData, success = () => { }, failure = () => { }) => {
    const body =  JSON.stringify({
      "gift_card_code": formData.gift_card_code_To_Reload,
      "amount": formData.amountForReload == '' ? Number(formData.customAmountForReload) : Number(formData.amountForReload)
    })

    const headers = {
      'Content-Type': 'application/json',
    }

    this.getResult("/giftcards/reload_gift_card", "PATCH", body, headers, (response) => {
      if (response.success === false) {
        failure(response.msg)
      } else if (response.success === true) {
        success(response);
      } else {
        failure("something went wrong");
      }
      success(response);
    }, failure);
  }
}

export default ApiHandler