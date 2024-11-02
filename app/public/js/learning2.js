// form loading animation
const form = [...document.querySelector('.study').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 100);
});

const returnBtn = document.querySelector('.return-btn');
const nextBtn = document.querySelector('.next-btn');

returnBtn.onclick = () => {
    location.href = '/COMP6841SAP/LoginTest/public/learning1.html';
}

nextBtn.onclick = () => {
    location.href = '/COMP6841SAP/LoginTest/public/learning3.html';
}