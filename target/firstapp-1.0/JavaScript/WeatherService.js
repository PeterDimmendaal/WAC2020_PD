
function initpage(){
fetch("https://ipapi.co/json")
  .then(response => response.json())

  .then(function(myJson){
  	var country = document.createTextNode(myJson.country);
    var countryname = document.createTextNode(myJson.country_name);
    var region = document.createTextNode(myJson.region);
    var city = document.createTextNode(myJson.city);
    var postal = document.createTextNode(myJson.postal);
    var latitude = document.createTextNode(myJson.latitude);
    var longitude = document.createTextNode(myJson.longitude);
    var ip = document.createTextNode(myJson.ip);



    document.querySelector("#landcode").append(country);
    document.querySelector("#land").append(countryname);
    document.querySelector("#regio").append(region);
    document.querySelector("#stad").append(city);
    document.querySelector("#postcode").append(postal);
    document.querySelector("#latitude").append(latitude);
    document.querySelector("#longitude").append(longitude);
    document.querySelector("#ip").append(ip);
    
    if(window.sessionStorage.getItem('username') == null){
        document.querySelector("#h1").innerHTML = "Ingelogd als";
    }else{
        document.querySelector("#h1").innerHTML = "Ingelogd als " + window.sessionStorage.getItem('username');
    }


    weatherInfo(myJson.city);
    loadCountries();
    weizigLand();
    toevoegenLand();
    login();
  });
}
function weatherInfo(city){
	

	    if(window.localStorage.getItem(city) != null && JSON.parse(window.localStorage.getItem(city)).name === city && JSON.parse(window.localStorage.getItem(city)).time > new Date().getTime()){
	        
	    	var weerdata = JSON.parse(window.localStorage.getItem(city));

	        console.log("INFORMATIE UIT LOCALSTORAGE");
	        var sunriseM = new Date((weerdata.sys.sunrise) * 1000);
	        var sunsetM = new Date((weerdata.sys.sunset) * 1000);

	        var sunset = sunsetM.getHours() + ":" + sunsetM.getMinutes() + ":" + sunsetM.getSeconds();
	        var sunrise = sunriseM.getHours() + ":" + sunriseM.getMinutes() + ":" + sunriseM.getSeconds();
	        
	        var windrichting = weerdata.wind.deg;
	        var windrichingen 
	        
	        if(windrichting > 247 && windrichting < 290){
	        	windrichtingen = "West"
	        }
	        else if(windrichting > 201 && windrichting < 247){
	        	windrichtingen = "Zuid West"
	        }
	        else if(windrichting > 157 && windrichting < 202){
	        	windrichtingen = "Zuid"
	        }
	        else if(windrichting > 111 && windrichting < 157){
	        	windrichtingen = "Zuid Oost"
	        }
	        else if(windrichting > 67 && windrichting < 111){
	        	windrichtingen = "Oost"
	        }
	        else if(windrichting > 21 && windrichting < 67){
	        	windrichtingen = "Noord Oost"
	        }
	        else if(windrichting > 337 && windrichting < 21){
	        	windrichtingen = "Noord"
	        }
	        else if(windrichting > 292 && windrichting < 337){
	        	windrichtingen = "Noord West"
	        }
	       
	        var temperatuur = (weerdata.main.temp - 273.15).toFixed(1);

	        document.querySelector("#temperatuur").innerHTML = temperatuur;
	        document.querySelector("#luchtvochtigheid").innerHTML = weerdata.main.humidity;
	        document.querySelector("#windsnelheid").innerHTML = weerdata.wind.speed;
	        document.querySelector("#windrichting").innerHTML = windrichtingen;
	        document.querySelector("#zonsopgang").innerHTML = sunrise;
	        document.querySelector("#zonsondergang").innerHTML = sunset;
	        document.querySelector("#h2").innerHTML = "Het weer in " + weerdata.name;

	    }else{
	fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=208f85213b9c300d1b445708c11a9d80")
	        .then(response => response.json())
	        .then(function(weerdata) {
	        console.log("INFORMATIE OP HALEN");

	        weerdata["time"] = new Date().getTime() + 600000;
	        console.log(weerdata["time"]);
	        window.localStorage.setItem(city, JSON.stringify(weerdata));
	        var sunriseM = new Date((weerdata.sys.sunrise) * 1000);
	        var sunsetM = new Date((weerdata.sys.sunset) * 1000);

	        var sunset = sunsetM.getHours() + ":" + sunsetM.getMinutes() + ":" + sunsetM.getSeconds();
	        var sunrise = sunriseM.getHours() + ":" + sunriseM.getMinutes() + ":" + sunriseM.getSeconds();

	        var temperatuur = (weerdata.main.temp - 273.15).toFixed(1);

	        document.querySelector("#temperatuur").innerHTML = temperatuur;
	        document.querySelector("#luchtvochtigheid").innerHTML = weerdata.main.humidity;
	        document.querySelector("#windsnelheid").innerHTML = weerdata.wind.speed;
	        document.querySelector("#windrichting").innerHTML = weerdata.wind.deg;
	        document.querySelector("#zonsopgang").innerHTML = sunrise;
	        document.querySelector("#zonsondergang").innerHTML = sunset;
	        document.querySelector("#h2").innerHTML = "Het weer in " + weerdata.name;
	        });
	    }
	}


function loadCountries(){
   fetch("restservices/countries/")
    .then(response => response.json())

    .then(function(landen){


      for( const land of landen){
        var row = document.createElement("tr");        
        	row.className = "hoofdstad";

        row.setAttribute("id", land.capital);
        row.addEventListener("click",function(){
        	weatherChange(this.id);
        	weatherInfo(this.id);

        	
          
        });

        var codeColumn = document.createElement("td");
        var codeText = document.createTextNode(land.code);
        codeColumn.appendChild(codeText);
        row.appendChild(codeColumn);
        
        var countryColumn = document.createElement("td");
        var countryText = document.createTextNode(land.countries);
        countryColumn.appendChild(countryText);
        row.appendChild(countryColumn);

        var capitalColumn = document.createElement("td");
        var capitalText = document.createTextNode(land.capital);
        capitalColumn.setAttribute("id", land.capital);
        capitalColumn.appendChild(capitalText);
        row.appendChild(capitalColumn);

        var regionColumn = document.createElement("td");
        var regionText = document.createTextNode(land.regio);
        regionColumn.appendChild(regionText);
        row.appendChild(regionColumn);

        var surfaceColumn = document.createElement("td");
        var surfaceText = document.createTextNode(land.surface);
        surfaceColumn.appendChild(surfaceText);
        row.appendChild(surfaceColumn);

        var populationColumn = document.createElement("td");
        var populationText = document.createTextNode(land.populatie);
        populationColumn.appendChild(populationText);
        row.appendChild(populationColumn);

        var updateColumn = document.createElement("td");
        var update = document.createElement("button");
        update.innerHTML = 'wijzig';
        update.setAttribute = ('id', land.capital);
        row.appendChild(updateColumn);
        updateColumn.appendChild(update);
        
        var verwijderColumn = document.createElement("td");
        var verwijder = document.createElement("button");
        verwijder.innerHTML = 'delete';
        update.setAttribute = ('id', land.capital);
        row.appendChild(verwijderColumn);
        verwijderColumn.appendChild(verwijder);
        
        row.appendChild(verwijderColumn);
        
        document.querySelector("#countryList").appendChild(row);
        
        update.addEventListener("click", function (){
          document.querySelector("#code").setAttribute("value", land.code)
      	  document.querySelector("#Land").setAttribute("value", land.countries);
      	  document.querySelector("#hoofdstad").setAttribute("value", land.capital);
      	  document.querySelector("#region").setAttribute("value", land.regio);
      	  document.querySelector("#oppervlakte").setAttribute("value", land.surface);
      	  document.querySelector("#inwoners").setAttribute("value", land.populatie);
      	  
        })
        
      	verwijder.addEventListener("click", function(){
      		 var id = land.code;
      		 
      		var fetchoptions = {method: 'DELETE', headers: {'Authorization' : 'Bearer ' + window.sessionStorage.getItem("sessionToken")}};
      		
      		 console.log(id);
          	  fetch("restservices/countries/" + id, fetchoptions)
          	  .then(function(response){
          		  if(response.ok)
          			  console.log("Land verwijderd"),
          			  location.reload();
          		  else if (response.status == 404)
          			  console.log("Land niet gevonden");
          		  else console.log("kan land niet verwijderen");
          	  })

          });

        
      }
      
      
    });
}

function weizigLand(){
	document.querySelector("#opslaan").addEventListener("click", function(){
  	  var land = document.querySelector("#code").value;
  	  var formData = new FormData(document.querySelector("#updateform"));
  	  var encData = new URLSearchParams(formData.entries());
  	  
  	  var fetchoptions = {method: 'PUT', body:encData, headers: {'Authorization' : 'Bearer ' + window.sessionStorage.getItem("sessionToken")}};

  	  fetch ("restservices/countries/" + land, fetchoptions)
  	  .then (response => response.json())
  	  .then (function(myJson){ console.log(myJson); location.reload; })
    })
}

function toevoegenLand(){
	  document.querySelector("#toevoegen").addEventListener("click", function (){
      var formData = new FormData(document.querySelector("#toevoegform"));
      var encData = new URLSearchParams(formData.entries());
      
      var fetchoptions = {method: 'POST', body:encData, headers: {'Authorization' : 'Bearer ' + window.sessionStorage.getItem("sessionToken")}};
      
      fetch("restservices/countries/", fetchoptions)
      .then(response => response.json())
      .then(function(myJson){ console.log(myJson); });
      
      location.reload();
      
	})
}



function weatherChange(city){
	 var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d6aa861e299de982958d6d096764a496";
	  fetch(url)
	    .then(response => response.json())

	    .then(function(myJson){

	      var sunset1 = new Date((myJson.sys.sunset) * 1000);
	      var sunrise1 = new Date((myJson.sys.sunrise )* 1000);

	      var sunset = sunset1.getHours() + ":" + sunset1.getMinutes() + ":" + sunset1.getSeconds();
	      var sunrise = sunrise1.getHours() + ":" + sunrise1.getMinutes() + ":" + sunrise1.getSeconds();

	      var windrichting = weerdata.wind.deg;
	        var windrichingen 
	        
	        if(windrichting > 247 && windrichting < 290){
	        	windrichtingen = "West"
	        }
	        else if(windrichting > 201 && windrichting < 247){
	        	windrichtingen = "Zuid West"
	        }
	        else if(windrichting > 157 && windrichting < 202){
	        	windrichtingen = "Zuid"
	        }
	        else if(windrichting > 111 && windrichting < 157){
	        	windrichtingen = "Zuid Oost"
	        }
	        else if(windrichting > 67 && windrichting < 111){
	        	windrichtingen = "Oost"
	        }
	        else if(windrichting > 21 && windrichting < 67){
	        	windrichtingen = "Noord Oost"
	        }
	        else if(windrichting > 337 && windrichting < 21){
	        	windrichtingen = "Noord"
	        }
	        else if(windrichting > 292 && windrichting < 337){
	        	windrichtingen = "Noord West"
	        }
	       

	      document.querySelector("#temperatuur").innerHTML= myJson.main.temp - 273 ;
	      document.querySelector("#luchtvochtigheid").innerHTML= myJson.main.humidity;
	      document.querySelector("#zonsopgang").innerHTML=sunset;
	      document.querySelector("#zonsondergang").innerHTML= sunrise;
	      document.querySelector("#windrichting").innerHTML=myJson.wind.deg;
	      document.querySelector("#windsnelheid").innerHTML=myJson.wind.speed;
	      
	      document.querySelector("#h2").innerHTML = "Het weer in "  + city;
	      
	  })
}


function login(event){
    document.querySelector("#login").addEventListener("click", function(){

	 var username = document.querySelector("#username").value;
	 var password = document.querySelector("#password").value;
	 window.sessionStorage.setItem('username', username);
	 window.sessionStorage.setItem('password', password);

	 var formData = new FormData(document.querySelector("#loginform"));
	 var encData = new URLSearchParams(formData.entries());
	 

	 fetch("restservices/authentication", { method : 'POST', body: encData})
	        .then(function(response){
	         if(response.ok){
	            location.reload();
	            alert("U bent succesvol ingelogd");
	            return response.json();
	          }else{
	                alert("Wrong username/password");
	                throw "Wrong username/password";
	    }})

	            .then(myToken => window.sessionStorage.setItem("sessionToken", myToken.JWT))
	            .catch(error => console.log(error));
	    });
}


initpage();
