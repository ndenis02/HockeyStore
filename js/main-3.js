document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.myForm2');

    let storedCartTotal = JSON.parse(localStorage.getItem('cartTotal'));

    let totalPurchaseInput = document.querySelector('input[readonly]');

    if(storedCartTotal !== null){
        totalPurchaseInput.value = `$${storedCartTotal.toFixed(2)}`;
    }
    else{
        console.log('No stored cartTotal found in local storage');
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrors();

        if (validateForm()) {
            alert("Order is placed. Thank you for shopping at Sticks and Skates");
            window.location.href = "./home.html";
        }
    });

    function validateForm() {
        let isValid = true;

        
        const cardType = form.elements['cardType'].value;
        const cardNumber = form.elements['cardNumber'].value;

        if (cardType === 'visa' && !cardNumber.match(/^\d{15}$/)) {
            displayError('numberError', 'Please enter a valid 15-digit Visa card number.');
            isValid = false;
        } else if ((cardType === 'mastercard' || cardType === 'amex') && !cardNumber.match(/^\d{16}$/)) {
            displayError('numberError', `Please enter a valid 16-digit card number.`);
            isValid = false;
        }
     
        const cvc = form.elements['cvc'].value;
        if (!cvc.match(/^\d{3}$/)) {
            displayError('cvcError', 'Please enter a valid 3-digit CVC.');
            isValid = false;
        }
 
        const cardName = form.elements['cardName'].value;
        if (!cardName.trim()) {
            displayError('cardNameError', 'Please enter the name on the card.');
            isValid = false;
        }
      
        const expiration = form.elements['expiration'].value;
        if (!expiration.match(/^(0[1-9]|1[0-2])\/(1[9-9]|20)\d{2}$/)) {
            displayError('expirationDateError', 'Please enter a valid expiration date (MM/YYYY).');
            isValid = false;
        }

        const buyerName = form.elements['buyerName'].value;
        if (!buyerName.trim()) {
            displayError('buyerNameError', 'Please enter your name.');
            isValid = false;
        }

        const address = form.elements['address'].value;
        if (!address.trim()) {
            displayError('addressError', 'Please enter your address.');
            isValid = false;
        }

        const city = form.elements['city'].value;
        if (!city.trim()) {
            displayError('cityError', 'Please enter your city.');
            isValid = false;
        }

        const postalCode = form.elements['postalCode'].value;
        if (!postalCode.match(/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/)) {
            displayError('postalCodeError', 'Please enter a valid postal code.');
            isValid = false;
        }

        const province = form.elements['province'].value;
        if (!province.trim()) {
            displayError('provinceError', 'Please enter your province.');
            isValid = false;
        }

        const country = form.elements['country'].value;
        if (!country.trim()) {
            displayError('countryError', 'Please enter your country.');
            isValid = false;
        }

        const tosCheckbox = form.querySelector('input[name="agreeToTerms"]');
        if(!tosCheckbox.checked){
            displayError('tosError', 'Please agree to Terms and Conditions');
            isValid = false;
        }

        return isValid;
    }

    function displayError(elementId, message) {
        const errorElement = form.querySelector(`#${elementId}`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        const errorElements = form.querySelectorAll('.box2 p');
        errorElements.forEach(function (errorElement) {
            errorElement.textContent = '';
        });
    }

    const clearButton = document.getElementById('clearForm');
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            form.reset();
            clearErrors();
        });
    }
});
