const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 100);
});

const returnBtn = document.querySelector('.return-btn');

returnBtn.onclick = () => {
    location.href = 'index.html';
}

const username = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', () => {
    fetch('/login-level-2', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        validateData(data);
    })
})

const validateData = (data) => {
    if (!data.email) {
        alertBox(data);
    } else {
        sessionStorage.email = data;
        location.href = 'index.html';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

dropdownBtn.onclick = () => {
    dropdownContent.classList.toggle('show');
};

window.onclick = (event) => {
    if (!event.target.closest('.dropdown-btn') && !event.target.closest('dropdown-content')) {
        dropdownContent.classList.remove('show');
    }
};