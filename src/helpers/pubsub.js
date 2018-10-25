const PubSub = {
  publish: function (channel, payload) {
    const event = new CustomEvent(channel, {
      detail: payload
    });
    // console.log(`Publish Channel: ${channel}`)
    document.dispatchEvent(event);
  },

  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);
    // console.log(`${callback} subbed to ${channel}`)
  }
};

module.exports = PubSub;
