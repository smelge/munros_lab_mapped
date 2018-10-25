const Request = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pubsub.js');

const MunroData = function(){
  this.data = null;
};

MunroData.prototype.getData = function(munroInfo){
  // console.log('We are here');
  const url = 'https://munroapi.herokuapp.com/api/munros';
  const request = new Request(url);
  request.get()
    .then((data)=>{
      this.data = data
      // console.log('Data Retrieved: ',data);
      PubSub.publish('Munro_Data:munro-data-ready',this.data);
    })
    .catch((error)=>{
      PubSub.publish('Munro_Data:error',error);
    })
}
module.exports = MunroData;
