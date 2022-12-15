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
            todayWeatherInterface(city, tempF, wind, humidity)
        })
    })
    .catch(function (error) {
        alert('Unable to connect to weather services');
    });
}

function todayWeatherInterface(city, temp, wind, humid){
    var todayHeader = city + ": " + todayDate;
    var todayTemp = "Temp: " + temp + " °F";
    var todayWind = "Wind: " + wind + " %";
    var todayHumidity = "Humidity: " + humid + " MPH";
    $("#today").text(todayHeader);
    $("#todayTemp").text(todayTemp);
    $("#todayWind").text(todayWind);
    $("#todayHumidity").text(todayHumidity);
}

var getfiveDayWeatherForcast = function(lat, lon){
    var fiveDay = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+key;
    fetch(fiveDay).then(function(response){
        response.json().then(function(data){
            //Day 2
            var dayHeader2 = todayDate
            var tempK2 = data.list[8].main.temp;
            var wind2 = data.list[8].wind.speed;
            var humidity2 = data.list[8].main.humidity;
            var tempF2 = parseInt(1.8*(tempK2-273)+32);
            $("#daytwo").text(dayHeader2);
            $("#temp2").text("Temp: " + tempF2 + " °F");
            $("#wind2").text("Wind: " + wind2 + " %");
            $("#hum2").text("Humidity: " + humidity2 + " MPH");
       
            //Day 3
            var dayHeader3 = todayDate
            var tempK3 = data.list[16].main.temp;
            var wind3 = data.list[16].wind.speed;
            var humidity3 = data.list[16].main.humidity;
            var tempF3 = parseInt(1.8*(tempK3-273)+32);
            $("#daythree").text(dayHeader2);
            $("#temp3").text("Temp: " + tempF3 + " °F");
            $("#wind3").text("Wind: " + wind3 + " %");
            $("#hum3").text("Humidity: " + humidity3 + " MPH");

            //Day 4
            var dayHeader4 = todayDate
            var tempK4 = data.list[24].main.temp;
            var wind4 = data.list[24].wind.speed;
            var humidity4 = data.list[24].main.humidity;
            var tempF4 = parseInt(1.8*(tempK4-273)+32);
            $("#dayfour").text(dayHeader4);
            $("#temp4").text("Temp: " + tempF4 + " °F");
            $("#wind4").text("Wind: " + wind4 + " %");
            $("#hum4").text("Humidity: " + humidity4 + " MPH");

            //Day 5
            var dayHeader5 = todayDate
            var tempK5 = data.list[32].main.temp;
            var wind5 = data.list[32].wind.speed;
            var humidity5 = data.list[32].main.humidity;
            var tempF5= parseInt(1.8*(tempK5-273)+32);
            $("#dayfive").text(dayHeader5);
            $("#temp5").text("Temp: " + tempF5 + " °F");
            $("#wind5").text("Wind: " + wind5 + " %");
            $("#hum5").text("Humidity: " + humidity5 + " MPH");

            //Day 6
            var dayHeader6 = todayDate
            var tempK6 = data.list[39].main.temp;
            var wind6 = data.list[39].wind.speed;
            var humidity6 = data.list[39].main.humidity;
            var tempF6 = parseInt(1.8*(tempK6-273)+32);
            $("#daysix").text(dayHeader6);
            $("#temp6").text("Temp: " + tempF6 + "°F");
            $("#wind6").text("Wind: " + wind6 + "%");
            $("#hum6").text("Humidity: " + humidity6 + "MPH");
        })
    })

}

// you'll add an event handler here to handle the search location function 
//you might need a second event handler to handle the locations that were previously searched


