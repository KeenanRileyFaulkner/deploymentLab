const subscribeBtn = document.getElementsByClassName('subscribe-button')[0];
const unsubscribeBtn = document.getElementsByClassName('unsubscribe-button')[0];
const email = document.getElementsByClassName('email-input')[0];
const baseURL = 'https://kf017036-landing-page.herokuapp.com/emails'

subscribeBtn.addEventListener('click', () => {
    //get the text in input element
    if(email.value === '') {
        return;
    }
    if(validateAddress(email.value)) {
        const emailToSend = email.value.toLowerCase();
        let body = {
            email: emailToSend;
        }

        axios.post(baseURL, body).then(responseCallback).catch(errCallback);
    } else {
        alert('Invalid email');
        email.value = '';
    }
});

unsubscribeBtn.addEventListener('click', () => {
    if(validateAddress(email.value)) {
        const emailToSend = email.value.toLowerCase();
        let body = {
            email: emailToSend
        }

        axios.put(baseURL, body).then(responseCallback).catch(errCallback);
    } else {
        alert('Please enter the email you wish to unsubscribe from the list');
        email.value = '';
    }
})

const validateAddress = (email) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(email);
}

const responseCallback = res => {
    alert(`${res.data}`)
    email.value = ''
}

const errCallback = err => console.log(err);