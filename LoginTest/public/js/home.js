const greeting = document.querySelector('.greeting');

window.onload = () => {
    if (!sessionStorage.email) {
        location.href = 'COMP6841/LoginTest/public/login';
    } else {
        greeting.innerHTML= `welcome`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.href = 'COMP6841SAP/LoginTest/public/login'
}

// Dropdown functionality
const dropdownBtnLevel = document.querySelector('.dropdown-btn-level');
const dropdownContentLevel = document.querySelector('.dropdown-content-level');
const dropdownBtnLearn = document.querySelector('.dropdown-btn-learn');
const dropdownContentLearn = document.querySelector('.dropdown-content-learn');

dropdownBtnLevel.onclick = () => {
    dropdownContentLevel.classList.toggle('show'); // Toggle the dropdown menu
};

dropdownBtnLearn.onclick = () => {
    dropdownContentLearn.classList.toggle('show'); // Toggle the dropdown menu
};

// Add click event listeners for dropdown items to navigate
const dropdownLevelLinks = dropdownContentLevel.querySelectorAll('li a');

dropdownLevelLinks.forEach(link => {
    link.onclick = () => {
        // Navigate to the link's href
        location.href = link.getAttribute('href');
    };
});

// Add click event listeners for dropdown items to navigate
const dropdownLearnLinks = dropdownContentLearn.querySelectorAll('li a');

dropdownLearnLinks.forEach(link => {
    link.onclick = () => {
        // Navigate to the link's href
        location.href = link.getAttribute('href');
    };
});

// Close the dropdown if the user clicks outside of it
window.onclick = (event) => {
    if (!event.target.closest('.dropdown-btn-level') && !event.target.closest('.dropdown-content-level') &&
        !event.target.closest('.dropdown-btn-learn') && !event.target.closest('.dropdown-content-learn')) {
        dropdownContentLevel.classList.remove('show');
        dropdownContentLearn.classList.remove('show');
    }
};