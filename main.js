const moment = require('moment');

let date = moment();



const Chart = require('chart.js');

const ctx = document.getElementById('myChart');
const ct = document.getElementById('mChart');

const dayWorks = document.querySelectorAll('.weekday__input');
const dayWorkButtons = document.querySelectorAll('.daywork__button');
let hours = document.getElementById('hours');

if (dayWorks.length > 0) {
    initDayWorks();
}

function initDayWorks() {
    for (let i = 0; i < dayWorks.length; i++) {

        const dayWork = dayWorks[i];
        const dayWorkButton = dayWorkButtons[i];


        function setDayWorkToLocalStorage() {

            if (localStorage.getItem(dayWork.id) != 0 || localStorage.getItem(dayWork.id) == NaN) {
                localStorage.setItem(dayWork.id, (parseInt(localStorage.getItem(dayWork.id))) + +dayWork.value);
                // localStorage.setItem(dayWork.id, dayWork.value);
            } else {
                localStorage.setItem(dayWork.id, 0);
                // localStorage.setItem(dayWork.id, +dayWork.value);
                localStorage.setItem(dayWork.id, (parseInt(localStorage.getItem(dayWork.id))) + +dayWork.value);
            }

        }

        dayWorkButton.addEventListener('click', function () {

            setDayWorkToLocalStorage();
            renewDayWork();
            dayWork.value = '';
        })
    }
}

function renewDayWork() {
    location.reload();
}

document.querySelector('#count__button').addEventListener('click', function countDayWork() {

    let sum = +localStorage.getItem('mon_work') + +localStorage.getItem('tue_work') + +localStorage.getItem('wed_work') + +localStorage.getItem('thu_work') + +localStorage.getItem('fri_work') + +localStorage.getItem('sat_work');
    console.log(sum);

    hours.innerHTML = sum;

    const mChart = new Chart(ct, {
        type: 'bar',
        data: {
            labels: ['Минимум часов', 'Потрачено', 'Максимум часов'],
            datasets: [{
                label: 'кол-во часов',
                data: [`10`, `${sum}`, `20`],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})

document.querySelector('#weekday__button').addEventListener('click', function clearDayWork() {

    localStorage.setItem(`mon_work`, +0);
    localStorage.setItem(`tue_work`, +0);
    localStorage.setItem(`wed_work`, +0);
    localStorage.setItem(`thu_work`, +0);
    localStorage.setItem(`fri_work`, +0);
    localStorage.setItem(`sat_work`, +0);


    renewDayWork();
})

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        datasets: [{
            label: 'кол-во часов',
            data: [`${localStorage.getItem(`mon_work`)}`, `${localStorage.getItem(`tue_work`)}`, `${localStorage.getItem(`wed_work`)}`, `${localStorage.getItem(`thu_work`)}`, `${localStorage.getItem(`fri_work`)}`, `${localStorage.getItem(`sat_work`)}`],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

