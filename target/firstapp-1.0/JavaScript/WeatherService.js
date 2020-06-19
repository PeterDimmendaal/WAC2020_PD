var ding;
function initPage() {
    fetch('https://ipapi.co/json/')
        .then(function(response){
            return (response.json());
        })
        .then(function(data) {
            ding = data
            document.getElementById("Landcode").innerHTML = "Landcode: " + ding.country;
            document.getElementById("LandLoca").innerHTML = "Land: " + ding.country_name;
            document.getElementById("RegioLoca").innerHTML = "Regio: " + ding.region;
            document.getElementById("Stad").innerHTML = "Stad: " + ding.city;
            document.querySelector("#Stad").addEventListener("click", function(){
                showWeather(ding.latitude, ding.longitude, ding.city);
            });
            document.getElementById("Postcode").innerHTML = "Postcode: " + ding.postal;
            document.getElementById("Latitude").innerHTML = "Latitude: " + ding.latitude;
            document.getElementById("Longitude").innerHTML = "Longitude: " + ding.longitude;
            document.getElementById("IP").innerHTML = "IP: " + ding.ip;
            showWeather(ding.latitude, ding.longitude, ding.city)
            loadCountries()
        })
}

function hoi(){
    console.log('hoi');
}

function showWeather(latitude, longitude, city) {
    var d = Date.now();
    document.getElementById("Titel").innerHTML = "Het weer in " + city;
    if (window.sessionStorage.getItem(city + 'Time') === null || d - 600000 > window.sessionStorage.getItem(city + 'Time')) {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&APPID=5028d4adbc0654bfb3e3d9bf5340bf3b')
            .then (function(res){
                return (res.text());
            })
            .then(function(data) {
                var x = JSON.parse(data);
                window.sessionStorage.setItem(city, data)
                window.sessionStorage.setItem(city + 'Time', d);
                var zop = x.sys.sunrise;
                var date = new Date(zop * 1000);
                var zod = x.sys.sunset;
                var date2 = new Date(zod * 1000);

                document.getElementById("Temp").innerHTML = 'Temperatuur: ' + x.main.temp;
                document.getElementById("Lucht").innerHTML = 'Luchtvochtigheid: ' + x.main.humidity;
                document.getElementById("WindS").innerHTML = 'Windsnelheid: ' + x.wind.speed + 'm/s';
                document.getElementById("WindR").innerHTML = 'Windrichting: ' + degToCompass(x.wind.deg);
                document.getElementById("ZonOp").innerHTML = 'Zonsopgang: ' + date.toLocaleTimeString();
                document.getElementById("ZonOn").innerHTML = 'Zonsondergang: ' + date2.toLocaleTimeString();
            })
    }
    else {
        var y = JSON.parse(window.sessionStorage.getItem(city));
        var zop = y.sys.sunrise;
        var date = new Date(zop * 1000);
        var zod = y.sys.sunset;
        var date2 = new Date(zod * 1000);

        document.getElementById("Temp").innerHTML = 'Temperatuur: ' + y.main.temp;
        document.getElementById("Lucht").innerHTML = 'Luchtvochtigheid: ' + y.main.humidity;
        document.getElementById("WindS").innerHTML = 'Windsnelheid: ' + y.wind.speed + 'm/s';
        document.getElementById("WindR").innerHTML = 'Windrichting: ' + degToCompass(y.wind.deg);
        document.getElementById("ZonOp").innerHTML = 'Zonsopgang: ' + date.toLocaleTimeString();
        document.getElementById("ZonOn").innerHTML = 'Zonsondergang: ' + date2.toLocaleTimeString();
    }
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["Noord", "Noord Noord Oost", "Noord Oost", "Oost Noord Oost", "Oost", "Oost Zuid Oost", "Zuid Oost", "Zuid Zuid Oost", "Zuid", "Zuid Zuid West", "Zuid West", "West Zuid West", "West", "West Noord West", "Noord West", "Noord Noord West"];
    return arr[(val % 16)];
}

function deleteCountry(code) {
    fetch('restservices/countries/delete/' + code)
        .then (function(res){
            return (res.text());
        })
        .then (function(data){
            console.log(data);
        })
}


function openForm(code, name, capital, region, surface, population) {
    document.getElementById("update").style.display = "block";
    document.getElementById("code").defaultValue = code;
    document.getElementById("land").defaultValue = name;
    document.getElementById("hoofdstad").defaultValue = capital;
    document.getElementById("regio").defaultValue = region;
    document.getElementById("oppervlakte").defaultValue = surface;
    document.getElementById("inwoners").defaultValue = population;
}

function closeForm() {
    document.getElementById("update").style.display = "none";
}

function updateCountry() {
    var formData = new FormData(document.querySelector("#updateCountry"));
    var encData = new URLSearchParams(formData.entries());
    fetch('restservices/countries/update', { method : 'PUT', headers : { 'Authorization': 'Bearer ' +  window.sessionStorage.getItem("sessionToken") }, body : encData })
        .then (function(response){
            if (response.ok) {
                console.log('wijziging voltooid');
                closeForm();
                initPage();
            }
            else {
                console.log('eerst inloggen');
                closeForm();
                initPage();
            }
        })
}

function loadCountries(){
    fetch('restservices/countries')
        .then (function(res){
            return (res.text());
        })
        .then(function(data) {
            var countries = JSON.parse(data);
            var tabel = document.getElementById("tabel");
            tabel.innerHTML = "<tr><th>land</th><th>hoofdstad</th><th>regio</th><th>oppervlakte</th><th>inwoners</th></tr>"
            for (let country of countries) {

                var deletebutton = document.createElement("button");
                var deletetext = document.createTextNode("Delete");
                deletebutton.appendChild(deletetext);
                deletebutton.addEventListener("click", function(){
                    deleteCountry(country.code);
                    initPage();
                })

                var alterbutton = document.createElement("button");
                alterbutton.appendChild(document.createTextNode("wijzig"))
                alterbutton.addEventListener("click", function(){
                    openForm(country.code, country.name, country.capital, country.region, country.surface, country.population);
                })

                var tablerow = document.createElement("tr");
                tablerow.id = country.code;
                var gegevens = [country.name, country.capital, country.region, country.surface, country.population];
                tablerow.addEventListener("click", function(){
                    showWeather(country.lat, country.lng, country.capital);
                });
                for (var gegeven of gegevens) {
                    var tabled = document.createElement("td");
                    var text = document.createTextNode(gegeven);
                    tabled.appendChild(text);
                    tablerow.appendChild(tabled);
                }
                tablerow.appendChild(alterbutton);
                tablerow.appendChild(deletebutton);
                tabel.appendChild(tablerow);
            }
        })
    document.querySelector("#doUpdate").addEventListener("click", function(){
        updateCountry();
    })

    function login(event) {
        var inlog = new FormData(document.querySelector("#loginform"));
        var inlogEncData = new URLSearchParams(inlog.entries());

        fetch("restservices/authentication", { method: 'POST', body: inlogEncData })
            .then(function(response) {
                if (response.ok) return response.json();
                else throw "Wrong username/password";
            })
            .then(myJson => window.sessionStorage.setItem("sessionToken", myJson.JWT))
            .catch(error => console.log(error));
        //console.log(window.sessionStorage.getItem("sessionToken"));
    }

    document.querySelector("#login").addEventListener("click", login);


}