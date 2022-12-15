var today = dayjs();
var formEl = $("#cityInput");
var btnEl = $(".btn");
var inputEl = $("#locationInput");
var todayWeatherCard = $(".todayWeather");
var key = "9c343e5b82dbaddad935bd1ba04a1d88";

var todayDate = today.format('MM/DD/YYYY')


//use data-location data attribute to create buttons for your searches so you can clikc them again and bring up the information review one has a good example

// create function that takes your input and stores them in a list. This is where you can add that data attriute so they can then be passed through again

// this function takes the input from the user and then puts it into the get location function
var locationFormHandler = function (event){
    event.preventDefault();
    var locationInput = inputEl.val().trim()
    localStorage.setItem("location", locationInput);
    if (locationInput){
        getlocation(locationInput);
        // inputEl.val() = '';

    }else{
        alert("Please enter a location");
    }
}

//This function takes the input from the user in the previous function
var getlocation = function (city){
    //this url uses the input location to grab the city information, including coordinates
    var locationURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + key;
    fetch(locationURL).then(function(response){
        //the response is used to grab the city coordinates and then put those into the weather function to grab weather info
        response.json().then(function(data){
            console.log(data)
            var coord1 = data[0].lat;
            var coord2 = data[0].lon;

            coord1 = JSON.stringify(coord1);
            coord2 = JSON.stringify(coord2);
            getWeather(coord1, coord2);
            getfiveDayWeatherForcast(coord1, coord2);
        })
    })
    .catch(function (error) {
        alert('Unable to connect to location services');
    });
}

//on submitting the location, the api will call the location info
formEl.on('submit', locationFormHandler);

//This function takes the lat and lon from the function above and grabs teh weather data for that location
var getWeather = function (lat, lon){
    var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+key;

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            console.log(data)
            var city = data.city.name;
            var tempK = data.list[0].main.temp;
            var wind = data.list[0].wind.speed;
            var humidity = data.list[0].main.humidity;
            var tempF = parseInt(1.8*(tempK-273)+32);
            console.log(city)
            console.log(tempK)
            console.log(tempF)
            todayWeatherInterface(city, tempF, wind, humidity)
        })
    })
    .catch(function (error) {
        alert('Unable to connect to weather services');
    });
}

function todayWeatherInterface(city, temp, wind, humid){
    var todayHeader = city + ": " + todayDate;
    var todayTemp = "Temp: " + temp;
    var todayWind = "Wind: " + wind;
    var todayHumidity = "Humidity: " + humid;
    $("#today").text(todayHeader);
    $("#temp").text(todayTemp);
    $("#wind").text(todayWind);
    $("#humidity").text(todayHumidity);
}

var getfiveDayWeatherForcast = function(lat, lon){

}

// you'll add an event handler here to handle the search location function 
//you might need a second event handler to handle the locations that were previously searched


