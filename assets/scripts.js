var today = dayjs();
var formEl = $("#cityInput");
var btnEl = $(".btn");
var inputEl = $("#locationInput")
var key = "9c343e5b82dbaddad935bd1ba04a1d88";


//use data-location data attribute to create buttons for your searches so you can clikc them again and bring up the information review one has a good example

// create function that takes your input and stores them in a list. This is where you can add that data attriute so they can then be passed through again
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


var getlocation = function (city){
    var locationURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + key;
    fetch(locationURL).then(function(response){
        response.json().then(function(data){
            console.log(data)
            // console.log(response)
            var coord1 = data[0].lat;
            var coord2 = data[0].lon;
            // console.log(JSON.stringify(coord1))
            // console.log(JSON.stringify(coord2))
            coord1 = JSON.stringify(coord1)
            coord2 = JSON.stringify(coord2)
            getWeather(coord1, coord2)
        })
    })
    .catch(function (error) {
        alert('Unable to connect to location services');
    });
}

formEl.on('submit', locationFormHandler);

// 39.739236
//-104.984862

var getWeather = function (lat, lon){
    var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+key;

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            console.log(data)
            var temp = data.list[0].main.temp;
            var wind = data.list[0].wind.speed;
            var humidity = data.list[0].main.humidity;
            console.log(temp)
            console.log(wind)
            console.log(humidity)
        })
    })
    .catch(function (error) {
        alert('Unable to connect to weather services');
    });
}



function buildWeatherInterface(){
    //you will pull the data that you get from the getWEather function into this function to build your interface
}

// you'll add an event handler here to handle the search location function 
//you might need a second event handler to handle the locations that were previously searched


