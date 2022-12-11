const users = [];
const addUser = ({ Name, userId, roomId, host, presenter, socketId }) => {
  const user = { Name, userId, roomId, host, presenter, socketId };

  users.push(user);
  return users.filter((user) => user.roomId === roomId);
};
//remove user
const removeUser = (id) => {
  const index = users.findIndex((user) => user.socketId === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//get a user from the list
const getUser = (id) => {
  return users.find((user) => user.socketId === id);
};

//get all the users from the room
const getUsersInRoom = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

//get room
const getRoom = (roomId) => {
  return users.find((user) => user.roomId === roomId);
};


module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRoom };
