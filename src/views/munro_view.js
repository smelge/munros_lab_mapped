const PubSub = require('../helpers/pubsub.js');

const MunroView = function(container){
  this.container = container;
}

MunroView.prototype.bindEvents = function(){
  PubSub.subscribe('Munro_Data:munro-data-ready',(evt)=>{
    const munro = evt.detail;
    // console.log('Munros: ',munro);
    // const munroMapper = [];
    munro.forEach((munroData,index)=>{
      console.log(munroData.name)
      PubSub.publish('MunroView:add-marker', munroData)
    })
  });
  console.log('Munros: ',MunroView)


  function initMap() {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    function initialize() {
      var home = { lat: 57.2208866, lng: -5.1720024 };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: home
      });

      PubSub.subscribe('MunroView:add-marker',(evt)=>{
        const newMarker = evt.detail;
        // console.log('New: ',newMarker.name);

        var content = `<div id='content'>"
            "<div id='siteNotice'>"
            "</div>"
            "<h1 id='firstHeading' class='firstHeading'>"${newMarker.name}</h1>"
            "<div id='bodyContent'>"
            "<p>${newMarker.meaning}</p>"
            "</div>"
            "</div>"`;

        var infowindow = new google.maps.InfoWindow({
          content: content
        });

        var marker = new google.maps.Marker({
          position: {lat:newMarker.latlng_lat,lng:newMarker.latlng_lng},
          map: map,
          title: newMarker.name
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

      });

    }
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  initMap();
}

MunroView.prototype.render = function(munro,index){
  const munroContainer = document.createElement('div');
  munroContainer.setAttribute('id',munro.name);
  // var div = document.getElementById(munro.name);

  const munroName = document.createElement('h2');
  munroName.textContent = munro.name;
  munroContainer.appendChild(munroName);

  const munroList = document.createElement('ul');
  munroList.setAttribute('id',munro.gridref_northings);
  munroContainer.appendChild(munroList);
  // var ul = document.getElementById(munro.gridref_northings);

  const munroHeight = document.createElement('li');
  munroHeight.textContent = `Height: ${munro.height}m`;
  munroList.appendChild(munroHeight);

  const munroMeaning = document.createElement('li');
  munroMeaning.textContent = `Meaning: ${munro.meaning}`;
  munroList.appendChild(munroMeaning);
  this.container.appendChild(munroContainer);
}


module.exports = MunroView;
