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



const loggedOutLinks= document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const contentView = document.querySelectorAll('.content');

const setUpFrontEnd = (user) =>{
    if (user){
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display='none');
        contentView.forEach(item => item.style.display='block');
    }else{
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display='block');
        contentView.forEach(item => item.style.display='none');
    }
}
/////////// end of log in code
var mymap = L.map('mapid').setView([51.458179,-0.114981], 13);// init with lat lon zoom


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoidGVzdGFjYzEiLCJhIjoiY2s1Z3N6djl5MDkweDNubXBwbHc5bGhiNCJ9.TUdGQk7n0swbE-bnEOy26A'
}).addTo(mymap);
//(51.456146, -0.108147)

var container = L.DomUtil.create('div');
var popup = L.popup();
var marker = L.marker();

var getCords;

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString() + "\n  see below for more options...")
        .openOn(mymap)
        getCords = e.latlng;
        document.getElementById("testBox").value = getCords;
    marker
        .setLatLng(e.latlng)
        .bindPopup(document.getElementById('testBox').value).openPopup()
        .addTo(mymap)
}
mymap.on('click', onMapClick);

function pinsToMap(pinInfo) {  // IMPORTANT! => pinInfo is a DocumentSnapshot

    const pinName = pinInfo.data().name
    const pinCoOrds = pinInfo.data().coOrds
    const pinToMapInfo = pinInfo.data().Info
 
    //pinCoOrds is a JavaScript Array with two elements
    ID21712721 = new L.marker([pinCoOrds[0],pinCoOrds[1]]).addTo(mymap).bindPopup('Pin Name: '+pinName+'<br>'+'Information : '+pinToMapInfo).openPopup()
 }
 db.collection('Pins').get().then(snapshot => {
    snapshot.forEach(pinInfo => {
         pinsToMap(pinInfo)
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Pins').add({
        name: form.name.value,
        Info: form.Info.value,
        coOrds: form.coOrds.value.replace("LatLng(", "").replace(")", "").split(',')
    });
    form.name.value = '';
    form.Info.value = '';
    form.coOrds.value = '';
});
//===== API CODE=====
//Making a Popup with the info from the API
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.OWNER) {
    layer.bindPopup(feature.properties.OWNER+' <br> Park name: '+feature.properties.PARK_NAME+'<br> Park Postcode:'+feature.properties.POSTCODE+'<br> Park status: '+feature.properties.PARK_STATUS);
     }
    }
    //Setting the API
    const apiG_url='https://ee61dab8-6bcf-42be-a64e-cb86f4693e9f.mock.pstmn.io?GreenSpaces=7845';

    //GreenSpaces 
    async function getGreenSpaces(){
        const response = await fetch(apiG_url);
        const data= await response.json();
        console.log(data);
        //Use this code to put out all the polygons in Wycombe
        L.geoJSON(data).addTo(mymap);
        
        L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(mymap);


    };

    getGreenSpaces();

    const api_url='https://ee61dab8-6bcf-42be-a64e-cb86f4693e9f.mock.pstmn.io?Buildings=545158';
          
            //This Will be the Buildings polygons 
            async function getBrixton(){
                const response = await fetch(api_url);
                const data= await response.json();
                console.log(data);
                //Use this code to put out all the polygons in Brixton
                var PropertyLayer = L.geoJSON().addTo(mymap);
                PropertyLayer.addData(data);

                L.geoJSON(data, {
                 onEachFeature: onEachFeature
                }).addTo(mymap);
            };
           getBrixton();