
var currentDay = $("#currentDay")
var today = dayjs();

currentDay.text(today.format('MMM D, YYYY'));

//use data-location data attribute to create buttons for your searches so you can clikc them again and bring up the information review one has a good example

// create function that takes your input and stores them in a list. This is where you can add that data attriute so they can then be passed through again

function searchLocation(event, location){
    event.preventDefault();


}

var getWeather = function (){
    // you'll pass your search location through this to grab the weather data. You will need to build the weather elements to store the data
    // you can use the structure you already have
    var apiURL ='api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=9c343e5b82dbaddad935bd1ba04a1d88'
    var locationURL = 
    //you will add the api URL above

    fetch(apiURL).then(function(response){
        if (response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data)
                //you'll create a function here that dispalys the data and you'll call your inputs 
            })

        }else{
            alert("error " + response.statusText);
        }

    })
}

// you'll add an event handler here to handle the search location function 
//you might need a second event handler to handle the locations that were previously searched