//So to get current weather for London:
// JSON:
//  http://api.weatherapi.com/v1/current.json?key=59fa5fea3962408c80c133644232210&q=London

//  API Key 59fa5fea3962408c80c133644232210
//TRIAL Ends on 05/Nov/2023
//https://www.weatherapi.com/my/  

//------------------------------------------------------------------
const apiKey = `59fa5fea3962408c80c133644232210`;

//Элементы на странице
const header = document.querySelector('.header')
const form = document.querySelector('.form')
const input = document.querySelector('.input');

function removeCard() {
  //Удвляем предыдущую карточку
  const prefCard = document.querySelector('.card');
  if (prefCard) prefCard.remove();
}

function showError(errorMessage) {
  //Отображаем карточку с ошибкой
  const html = `<div class="card">${errorMessage}</div>`

  //Отображаем карточку на странице
  header.insertAdjacentHTML('beforeend', html)
}

function showCard({name,country,temp_c,condition}) {
  //Разметка для карточки
  const html = `<div class="card">
<div class="card-siti">
  <h2 class="card-citi">${name}<span class="span">${country}</span></h2>
  
</div>

<div class="card-weather">
  <div class="cadr-value">${temp_c}<sup>°c</sup></div>
  <img src="./img/8 1.png" alt="Weather" class="card-img">
</div>
<div class="card-deccription">${condition}</div>
</div>`
  //Отображаем карточку на странице
  header.insertAdjacentHTML('beforeend', html)
}

async function getWeather(citi){
  //Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${citi}`;
  const response = await fetch(url);
  const data = await response.json();
   console.log(data);
   return data;
  }

//Слушаем отправку формы
form.onsubmit = async function (e) {

  //Отменяем отправку формы
  e.preventDefault();

  //Берем значение из инпута, обрезая пробелы
  let citi = input.value.trim();

  //Делаем запрос на сервер
   const data = await getWeather(citi);
   if (data.error) {
    //Если есть ошибка - выводим ее.
    removeCard();
    showError(data.error.message);
  } else {
    // Если ошибки нет - выводим карточку.
    //Отображаем полученные данные в карточку
    removeCard();
const watherData ={
  name:data.location.name,
  country:data.location.country,
  temp_c:data.current.temp_c,
  condition:data.current.condition.text
}

    showCard(watherData);
  }
}


