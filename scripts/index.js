// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  });



var mymap = L.map('mapid').setView([51.458179,-0.114981], 13);// init with lat lon zoom


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoidGVzdGFjYzEiLCJhIjoiY2s1Z3N6djl5MDkweDNubXBwbHc5bGhiNCJ9.TUdGQk7n0swbE-bnEOy26A'
}).addTo(mymap);
//(51.456146, -0.108147)
