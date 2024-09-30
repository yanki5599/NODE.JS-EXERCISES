const joinPage = document.getElementById("joinPage");
const chatPage = document.getElementById("chatPage");
const usersList = document.getElementById("usersList");
const messageList = document.getElementById("messageList");

const joinForm = joinPage.querySelector("form");

const messageForm = document.getElementById("messageForm");

let username;

const local = "put local ip for local host";
const host = "http://localhost";
const port = "3000";
//===============================================
const socket = io(host + ":" + port, {
  withCredentials: false,
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("connected to the server");

  // declare other events
  socket.on("message", (data) => {
    console.log("message received", data);

    const message = document.createElement("li");
    message.innerText = `${data.message}`;
    messageList.appendChild(message);
  });

  socket.on("join", (users) => {
    console.log("someone joinned", users);
    usersList.innerHTML = "";
    updateUsersList(users);
  });

  socket.on("leave", (users) => {
    console.log("someone left");
    updateUsersList(users);
  });

  socket.on("disconnect", () => {
    console.log("disconnected from server");

    // send disconnect event to server with username
    if (username !== null) {
      socket.emit("leave", username);
    }
  });

  socket.on("userExist", () => {
    console.log("user already exist");
    username = null;
    alert("user already exist");
    socket.close();
    window.location.reload();
  });
});

function updateUsersList(users) {
  usersList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    usersList.appendChild(li);
  });
}

socket.on("connect_error", (error) => {
  console.log("connection error", error);
});

//===============================================

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const request = {
    username: joinForm["username"].value,
    roomId: joinForm["roomId"].value,
  };

  socket.emit("join", request);

  localStorage.setItem("username", request.username);
  username = request.username;
  localStorage.setItem("roomId", request.roomId);

  joinPage.style.display = "none";
  chatPage.style.display = "flex";
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = {
    username: username,
    text: messageForm["message"].value,
  };
  socket.emit("message", message);
  messageForm["message"].value = "";
});

// disconnect socket when page is closed or refreshed
window.onbeforeunload = () => {
  socket.emit("leave", username);
  socket.close();
};
