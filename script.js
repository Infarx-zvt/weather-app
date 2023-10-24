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


//Слушаем отправку формы
form.onsubmit = function (e) {

  //Отменяем отправку формы
  e.preventDefault();

  //Берем значение из инпута, обрезая пробелы
  let citi = input.value.trim();

  //Делаем запрос на сервер
  //Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${citi}`;

  //Выполняем запрос
  fetch(url).then((Response) => {
    return Response.json()
  }).then((data) => {
    
    // console.log(data.location.name);
    // console.log(data.location.country)
    // console.log(data.current.temp_c)
    // console.log(data.current.condition.text)

    //Проверка на ошибку

    if (data.error) {
      //Если есть ошибка - выводим ее.
      //Удвляем предыдущую карточку
      const prefCard = document.querySelector('.card');
      if (prefCard) prefCard.remove();

      //Отображаем карточку с ошибкой
      const html = `<div class="card">${data.error.message}</div>`

         //Отображаем карточку на странице
         header.insertAdjacentHTML('beforeend', html)


    } else {
      // Если ошибки нет - выводим карточку.

      //Отображаем полученные данные в карточку
      const prevCard = document.querySelector('.card')
      if (prevCard) prevCard.remove();
      //Разметка для карточки
      const html = `<div class="card">
                  <div class="card-siti">
                      <h2 class="card-citi">${data.location.name}<span class="span">${data.location.country}</span></h2>
                      
                    </div>

                    <div class="card-weather">
                      <div class="cadr-value">${data.current.temp_c}<sup>°c</sup></div>
                      <img src="./img/8 1.png" alt="Weather" class="card-img">
                    </div>
                    <div class="card-deccription">${data.current.condition.text}</div>
                </div>`
     //Отображаем карточку на странице
     header.insertAdjacentHTML('beforeend', html)
    }
 
  })
}