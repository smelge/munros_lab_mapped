const PubSub = require('../helpers/pubsub.js');

const MunroInfo = function(container){
  this.container = container;
}

MunroInfo.prototype.bindEvents = function(){
  PubSub.subscribe('Location:location-ready',(evt)=>{
    const munroInfo = evt.detail;
    console.log('Munro Info: ',munroInfo);
    this.render(munroInfo);
  });
};

MunroInfo.prototype.render = function(hillInfo){
  this.container.innerHTML = ''
  const munroName = document.createElement('h3');
  munroName.textContent = hillInfo.name;
  this.container.appendChild(munroName);

  const munroHeight = document.createElement('p');
  munroHeight.textContent = `Height: ${hillInfo.height}m`;
  this.container.appendChild(munroHeight);

  const munroLocation = document.createElement('p');
  munroLocation.textContent = `Location: ${hillInfo.latlng_lat}, ${hillInfo.latlng_lng}`;
  this.container.appendChild(munroLocation);

  const munroRegion  = document.createElement('p');
  munroRegion.textContent = `Region: ${hillInfo.region}`;
  this.container.appendChild(munroRegion);

  const munroMeaning = document.createElement('p');
  munroMeaning.textContent = hillInfo.meaning;
  this.container.appendChild(munroMeaning);
}

module.exports = MunroInfo;
