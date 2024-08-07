const jwt = require('jsonwebtoken');

const API_KEY = "a5c14263-4e84-42f6-93f3-c9d7807e8b4d";
const SECRET = "94ca7b2fc7535afe4b0e65c0c0506b8d3c28d2ebdc83390faf16c8eabc41de3b";

const options = {
  expiresIn: '120m',
  algorithm: 'HS256'
};
const payload = {
  apikey: API_KEY,
  permissions: [`allow_join`], // `ask_join` || `allow_mod`
  version: 2, //OPTIONAL
  roomId: `2kyv-gzay-64pg`, //OPTIONAL
  participantId: `lxvdplwt`, //OPTIONAL
  // roles: ['crawler', 'rtc'], //OPTIONAL
};

// const token = jwt.sign(payload, SECRET, options);
// console.log(token);

const createMeeting = async ({token}) => {
  const url = `https://api.videosdk.live/v2/rooms`;
  const options = {
    method: "POST",
    headers: {Authorization: token, "Content-Type": "application/json"},
  };

  const response = await fetch(url, options)
  const data = await response.json()
  console.log(data)
  if (data.roomId) {
    return {meetingId: data.roomId, err: null}
  } else {
    return {meetingId: null, err: data.error}
  }
};

const handleCreateMeeting = async () => {
  const token = await jwt.sign(payload, SECRET, options);
  console.log(token)
  const {meetingId, err} = await createMeeting({token});
  if (meetingId) {
    console.log(`Meeting created with meetingId: ${meetingId}`);
  } else {
    console.log(`Error: ${err}`);
  }
};

handleCreateMeeting();

