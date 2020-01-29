// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  });
  
// set up pin list
const pinList = document.querySelector('#pin-list');
const form = document.querySelector('#add-pin-form');
// create element & render pin
function renderPin(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let Info = document.createElement('span');
    let coOrds = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    Info.textContent = doc.data().Info;
    coOrds.textContent = doc.data().coOrds;
    cross.textContent = 'X';

    li.appendChild(name);
    li.appendChild(Info);
    li.appendChild(coOrds);
    li.appendChild(cross);
    pinList.appendChild(li);

// deelte event
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Pins').doc(id).delete();
    });
}


var mymap = L.map('mapid').setView([51.458179,-0.114981], 13);// init with lat lon zoom


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoidGVzdGFjYzEiLCJhIjoiY2s1Z3N6djl5MDkweDNubXBwbHc5bGhiNCJ9.TUdGQk7n0swbE-bnEOy26A'
}).addTo(mymap);
//(51.456146, -0.108147)
