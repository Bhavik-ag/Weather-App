const locationTimezone = document.getElementById("location-timezome");
const temperatureDegree = document.getElementById("degree");
const tempDescription = document.getElementById("temperature-description");
const feelsLike = document.getElementById("feels-like");
const tempMin = document.getElementById("temp-min");
const tempMax = document.getElementById("temp-max");
const humidity = document.getElementById("humidity");

window.addEventListener('load',()=>{
    let longitude;
    let latitude;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c15989a079627f1b591eab3befa75ed8`
            fetch(api).then((response)=>{
                if(response.status === 200){
                    return response.json();
                }
                else{
                    throw Error("Unable to fetch data")
                }
                console.log(response)
            }).then((data)=>{
                const {temp,feels_like,temp_max,temp_min} = data.main;
                locationTimezone.textContent = data.name;
                let temps = `${temp-273.15.toFixed(2)}`;
                temperatureDegree.textContent = temps.substring(0,5);
                tempDescription.textContent =  data.weather[0].description.toUpperCase();
                feelsLike.textContent = "Feels Like: " + `${(feels_like-273.15).toFixed(2)}`.substring(0,5) + " C";
                tempMin.innerText = "Min Temp: " + `${(temp_min-273.15).toFixed(2)}`.substring(0,5) + " C";
                tempMax.innerText = "Max Temp: " + `${(temp_max-273.15).toFixed(2)}`.substring(0,5) + " C";
            }).catch((err)=>{
                window.alert("Unable to fetch data!!");
            })
        })
    }
    else{
        window.alert("Unable to fetch location. Allow it from your Chrome Settings!!");
    }
})