const MunroData = require('./models/munro_data.js');
const MunroView = require('./views/munro_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded good');
  // create a new munros.js object
  const munroData = new MunroData();
  munroData.getData();

  const munroViewContainer = document.querySelector('div#container');
  const munroView = new MunroView(munroViewContainer);
  munroView.bindEvents();
});
