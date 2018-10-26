const MunroData = require('./models/munro_data.js');
const MunroView = require('./views/munro_view.js');
const MunroInfo = require('./views/munro_info.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded good');
  // create a new munros.js object
  const munroData = new MunroData();
  munroData.getData();

  const munroViewContainer = document.querySelector('div#map');
  const munroView = new MunroView(munroViewContainer);
  munroView.bindEvents();

  const munroInfoWindow = document.querySelector('div#container');
  const munroInfo = new MunroInfo(munroInfoWindow);
  munroInfo.bindEvents();
});
