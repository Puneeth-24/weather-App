const city=document.querySelector(".search").firstElementChild;
const weatherIcon=document.querySelector(".weather-icon")
const tempDisplay=document.querySelector(".temp")
const humidDisplay=document.querySelector(".humidDisplay")
const windSpeedDisplay=document.querySelector(".windSpeedDisplay")
const displayCityName=document.querySelector(".cityName");
const weatherDisciptEle=document.querySelector(".weather-discript");

const apiKey="31a1dd0ff1dcdc5a9741222d620975b9";
    
async function getWeatherInfo(){
    const cityName=city.value.toLowerCase();
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    const resolve=await fetch(apiUrl);
    
        if(!resolve.ok){
            weatherIcon.src=" ";
            weatherIcon.style.display="none";
            weatherIcon.style.border="none";
            weatherIcon.style.visibility="hidden";
            tempDisplay.textContent="---";
            humidDisplay.textContent="---";
            windSpeedDisplay.textContent="---";
            displayCityName.textContent="Please Enter A Vlaid City Name"
        }
        else{
            const weatherData=await resolve.json();
            const {temp,humidity}=weatherData.main;
            const [{icon:iconID,description:weatherDiscipt}]=weatherData.weather;
            const {speed:windSpeed}=weatherData.wind;
            showCityName(cityName);
            displayIcon(iconID,weatherDiscipt);
            showTemp(temp);
            showHumidity(humidity);
            showWindSpeed(windSpeed);
            
        }
            
    
    

}

function displayIcon(iconId,weatherDiscipt){
   
    weatherIcon.src=`https://openweathermap.org/img/wn/${iconId}@2x.png`;
    weatherIcon.classList.add("showIcon");
    if(weatherDiscipt.includes(" ")){
        weatherDisciptEle.textContent=`${weatherDiscipt.charAt(0).toUpperCase()+weatherDiscipt.slice(1,weatherDiscipt.indexOf(" "))+" "+weatherDiscipt.charAt(weatherDiscipt.indexOf(" ")+1).toUpperCase()+weatherDiscipt.slice(weatherDiscipt.indexOf(" ")+2)}`
    }
    else{
        weatherDisciptEle.textContent=`${weatherDiscipt.charAt(0).toUpperCase()+weatherDiscipt.slice(1)}`
    }


}
function showCityName(cityName){
    if(cityName.includes(" ")){
        displayCityName.textContent=`${cityName.charAt(0).toUpperCase()+cityName.slice(1,cityName.indexOf(" "))+" "+cityName.charAt(cityName.indexOf(" ")+1).toUpperCase()+cityName.slice(cityName.indexOf(" ")+2)}`
    }
    else{
        displayCityName.textContent=`${cityName.charAt(0).toUpperCase()+cityName.slice(1)}`
    }

}

function showTemp(temp){

    tempDisplay.textContent=`${(temp-273.15).toFixed(2)}°C`

}

function showHumidity(humidity){
    humidDisplay.textContent=`${humidity}%`;
}

function showWindSpeed(windSpeed){
    windSpeedDisplay.textContent=`${(windSpeed*3.6).toFixed(2)} Kmph`
}


