const greeting = document.querySelector('.greeting');

window.onload = () => {
    if (!sessionStorage.email) {
        location.href = 'login.html';
    } else {
        greeting.innerHTML= `welcome`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.href = 'login.html'
}

const dropdownBtnLevel = document.querySelector('.dropdown-btn-level');
const dropdownContentLevel = document.querySelector('.dropdown-content-level');
const dropdownBtnLearn = document.querySelector('.dropdown-btn-learn');
const dropdownContentLearn = document.querySelector('.dropdown-content-learn');

dropdownBtnLevel.onclick = () => {
    dropdownContentLevel.classList.toggle('show');
};

dropdownBtnLearn.onclick = () => {
    dropdownContentLearn.classList.toggle('show');
};

const dropdownLevelLinks = dropdownContentLevel.querySelectorAll('li a');

dropdownLevelLinks.forEach(link => {
    link.onclick = () => {
        location.href = link.getAttribute('href');
    };
});

const dropdownLearnLinks = dropdownContentLearn.querySelectorAll('li a');

dropdownLearnLinks.forEach(link => {
    link.onclick = () => {
        location.href = link.getAttribute('href');
    };
});

window.onclick = (event) => {
    if (!event.target.closest('.dropdown-btn-level') && !event.target.closest('.dropdown-content-level') &&
        !event.target.closest('.dropdown-btn-learn') && !event.target.closest('.dropdown-content-learn')) {
        dropdownContentLevel.classList.remove('show');
        dropdownContentLearn.classList.remove('show');
    }
};