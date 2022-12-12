$("button").click(function(e){ //when submit button is clicked
    e.preventDefault(); //prevents default behaviour of button reloading the page

    var latitude = $("#lat").val(); //gets latitude from text field
    var longitude = $("#lon").val(); //gets longitude from text field
    var queryURL = "https://api.weather.gov/points/"+latitude+","+longitude; //creates API URL 
    $.ajax({
        url:queryURL //queries API URL for location info
    }).then(function(data){
        $('#location').text(data.properties.relativeLocation.properties.city+', '+data.properties.relativeLocation.properties.state);//sets location info from query data 
        let office = data.properties.forecast; //gets URL for next API call
        $.ajax({
            url:office //queries API URL for wqeather info
        }).then(function(data){
            $('#weather').text(data.properties.periods[0].detailedForecast); //sets weather info from query data
            $('#temp').text(data.properties.periods[0].temperature+data.properties.periods[0].temperatureUnit); //sets temperature info from query data
        });
    });
});

