
const PORT = process.env.PORT || 9191;
const FB_PAGE_TOKEN = 'EAAZAXZAcQxCAsBABD7nCVby8n7eI5NjzDDNYCNNnXrKZBsL0nAaLmA28PzjRLovOL7B5QyupRaFFbMTirZAtccJIdpTVaDThieg2TjNoMwGBU41ZBw5NgmbsyR3CgQrki1Am1eF167NY7Q5phV4YtIQHTeVuhEgTn60zv5ZCoxLtYbO3EoZCtoB';
const VERIFY_TOKEN = 'SIMPLE_VERIFY_TOKEN';
const WAITING_BEFORE_PROMPT = 5000; // 5 secondes
const SF_LOGIN = 'mahdi@syoumi.ma';
const SF_PASSWORD = '27022008m';

var waitingForAnswer = false;

var setWaiting = () => {
  waitingForAnswer = true;
};

var setNotWaiting = () => {
  waitingForAnswer = false;
};

var getWaiting = () => waitingForAnswer;

module.exports = {
  VERIFY_TOKEN,
  FB_PAGE_TOKEN,
  PORT,
  WAITING_BEFORE_PROMPT,
  setWaiting,
  setNotWaiting,
  getWaiting
}
