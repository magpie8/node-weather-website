const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From Javascript'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //Prevent reloading of page after submitting form

    const location = search.value

    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `Location: ${data.searchLocation}`
                messageTwo.textContent =  `Temperature : ${data.forecastData.temperature}, Humidity : ${data.forecastData.humidity}, Wind : ${data.forecastData.wind}`
            }
        })
    })
})