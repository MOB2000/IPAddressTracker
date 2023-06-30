
var map = null;

document.addEventListener("DOMContentLoaded", function() {
    // Code to be executed after the DOM content has finished loading
    map = L.map('map');console.log("DOM content loaded");
  }); 

function submitForm() {
    var error = document.getElementById("error");
    error.innerHTML = "";

    var input = document.getElementById("ipInput");
    var ipInput = input.value;
    console.log("ipInput " + ipInput);
    if (ipInput === "") { error.innerHTML = "Enter Ip Address"; return; }
    if (!isValidIPAddress(ipInput)) { error.innerHTML = "Not valid IP Address"; return; }

    var apiKey = "at_c32qKTIiGwJaoj6hzSJx53iJpteyN";

    var url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipInput}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var ip = document.getElementById("ip");
            ip.innerHTML = data.ip;
            var location = document.getElementById("location");
            location.innerHTML = data.location.region;
            var timezone = document.getElementById("timezone");
            timezone.innerHTML = data.location.timezone;
            var isp = document.getElementById("isp");
            isp.innerHTML = data.isp;
         
            map.setView([data.location.lat, data.location.lng], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([data.location.lat, data.location.lng]).addTo(map);


        })
        .catch(error => {
            error.value = error;
            console.log("Error:", error);
        });

}


function isValidIPAddress(ipAddress) {
    var pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!pattern.test(ipAddress)) {
        return false;
    }

    var octets = ipAddress.split(".");
    for (var i = 0; i < octets.length; i++) {
        var octet = parseInt(octets[i]);
        if (octet < 0 || octet > 255) {
            return false;
        }
    }

    return true;
}
