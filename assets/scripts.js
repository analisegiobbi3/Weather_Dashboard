var today = dayjs();
var formEl = $("#cityInput");
var btnEl = $(".btn");
var inputEl = $("#locationInput");
var todayWeatherCard = $(".todayWeather");
var searchHistoryEl = $("#searchHistory");
var todayDate = today.format('MM/DD/YYYY')
//api key to get into weather api
var key = "9c343e5b82dbaddad935bd1ba04a1d88";
//array to store saved cities
var cityArray = [];

// this function takes the input from the user and then puts it into the get location function
var locationFormHandler = function (event){
    event.preventDefault();
    var locationInput = inputEl.val().trim()
    //stores the location
    localStorage.setItem("location", locationInput);
    //if a proper location is entered, it is taken and put into the location function
    if (locationInput){
        getlocation(locationInput);


    }else{
        alert("Please enter a location");
    }
    //adds the location to the city array
    createCityArray()
    inputEl.text = '';
}

//this function creates the buttons for the saved locations
function locationListHandler(){
    searchHistoryEl.innerHTML='';
    searchHistoryEl.empty();
    for (var i=0; i<cityArray.length; i++){
        var createButton = $("<button>");
        createButton.addClass("cityHistoryEl")
        createButton.text(cityArray[i])
        createButton.attr('data-name', cityArray[i])
        $("#searchHistory").append(createButton)
    }
}

//takes the stored locations and puts them into the city array
function createCityArray(){
    var cityItem =  localStorage.getItem("location");
    if (cityItem != null){
        cityArray.push(cityItem)
    }
    locationListHandler()
}

var savedLocationButtonHandler = function(event){
    // var savedLocation = event.target.attr('data-name');
    var savedLocation = event.target.innerHTML;
    getlocation(savedLocation);
}

searchHistoryEl.on('click', savedLocationButtonHandler);


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
            // var weatherIcon = data.list[0].weather[0].icon;
            // var weatherIconURL = 'https://openweathermap.org/img/wn/'+weatherIcon+'@2x.png';
            var tempF = parseInt(1.8*(tempK-273)+32);
            todayWeatherInterface(city, tempF, wind, humidity)
        })
    })
    .catch(function (error) {
        alert('Unable to connect to weather services');
    });
}

//creates the main today weather display
function todayWeatherInterface(city, temp, wind, humid, icon){
    var todayHeader = city + ": " + todayDate;
    var todayTemp = "Temp: " + temp + " °F";
    var todayWind = "Wind: " + wind + " %";
    var todayHumidity = "Humidity: " + humid + " MPH";
    $("#today").text(todayHeader);
    $("#todayTemp").text(todayTemp);
    $("#todayWind").text(todayWind);
    $("#todayHumidity").text(todayHumidity);
    // $("#weatherIcon1").attr('src', icon)
}

//creates the 5 day weather forecast display
var getfiveDayWeatherForcast = function(lat, lon){
    var fiveDay = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+key;
    fetch(fiveDay).then(function(response){
        response.json().then(function(data){
            //Day 2
            var dayHeader2 = today.add(1, 'day')
            dayHeader2 = dayHeader2.format('ddd, MMM D, YYYY')
            var weatherIcon = data.list[8].weather[0].icon;
            var weatherIconURL = 'https://openweathermap.org/img/wn/'+weatherIcon+'@2x.png';
            var tempK2 = data.list[8].main.temp;
            var wind2 = data.list[8].wind.speed;
            var humidity2 = data.list[8].main.humidity;
            var tempF2 = parseInt(1.8*(tempK2-273)+32);
            $("#daytwo").text(dayHeader2);
            $("#temp2").text("Temp: " + tempF2 + " °F");
            $("#wind2").text("Wind: " + wind2 + " %");
            $("#hum2").text("Humidity: " + humidity2 + " MPH");
            $("#weatherIcon2").attr('src', weatherIconURL)
       
            //Day 3
            var dayHeader3 = today.add(2, 'day')
            dayHeader3 = dayHeader3.format('ddd, MMM D, YYYY')
            var weatherIcon = data.list[16].weather[0].icon;
            var weatherIconURL = 'https://openweathermap.org/img/wn/'+weatherIcon+'@2x.png';
            var tempK3 = data.list[16].main.temp;
            var wind3 = data.list[16].wind.speed;
            var humidity3 = data.list[16].main.humidity;
            var tempF3 = parseInt(1.8*(tempK3-273)+32);
            $("#daythree").text(dayHeader3);
            $("#temp3").text("Temp: " + tempF3 + " °F");
            $("#wind3").text("Wind: " + wind3 + " %");
            $("#hum3").text("Humidity: " + humidity3 + " MPH");
            $("#weatherIcon3").attr('src', weatherIconURL)

            //Day 4
            var dayHeader4 = today.add(3, 'day')
            dayHeader4 = dayHeader4.format('ddd, MMM D, YYYY')
            var weatherIcon = data.list[24].weather[0].icon;
            var weatherIconURL = 'https://openweathermap.org/img/wn/'+weatherIcon+'@2x.png';
            var tempK4 = data.list[24].main.temp;
            var wind4 = data.list[24].wind.speed;
            var humidity4 = data.list[24].main.humidity;
            var tempF4 = parseInt(1.8*(tempK4-273)+32);
            $("#dayfour").text(dayHeader4);
            $("#temp4").text("Temp: " + tempF4 + " °F");
            $("#wind4").text("Wind: " + wind4 + " %");
            $("#hum4").text("Humidity: " + humidity4 + " MPH");
            $("#weatherIcon4").attr('src', weatherIconURL)

            //Day 5
            var dayHeader5 = today.add(4, 'day')
            dayHeader5 = dayHeader5.format('ddd, MMM D, YYYY')
            var weatherIcon = data.list[32].weather[0].icon;
            var weatherIconURL = 'https://openweathermap.org/img/wn/'+weatherIcon+'@2x.png';
            var tempK5 = data.list[32].main.temp;
            var wind5 = data.list[32].wind.speed;
            var humidity5 = data.list[32].main.humidity;
            var tempF5= parseInt(1.8*(tempK5-273)+32);
            $("#dayfive").text(dayHeader5);
            $("#temp5").text("Temp: " + tempF5 + " °F");
            $("#wind5").text("Wind: " + wind5 + " %");
            $("#hum5").text("Humidity: " + humidity5 + " MPH");
            $("#weatherIcon5").attr('src', weatherIconURL)

            //Day 6
            var dayHeader6 = today.add(5, 'day') 
            dayHeader6 = dayHeader6.format('ddd, MMM D, YYYY')
            var weatherIcon = data.list[39].weather[0].icon;
            var weatherIconURL = 'https://openweathermap.org/img/wn/'+weatherIcon+'@2x.png';
            var tempK6 = data.list[39].main.temp;
            var wind6 = data.list[39].wind.speed;
            var humidity6 = data.list[39].main.humidity;
            var tempF6 = parseInt(1.8*(tempK6-273)+32);
            $("#daysix").text(dayHeader6);
            $("#temp6").text("Temp: " + tempF6 + "°F");
            $("#wind6").text("Wind: " + wind6 + "%");
            $("#hum6").text("Humidity: " + humidity6 + "MPH");
            $("#weatherIcon6").attr('src', weatherIconURL)
        })
    })

}




