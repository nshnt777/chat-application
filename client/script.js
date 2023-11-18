console.log("script started");

const msgDabba = document.getElementById('msg-container')

// const sendButton = document.getElementById('send-button');
const msgInput = document.getElementById('msg-input');

const joinRoomButton = document.getElementById('room-button');
const roomInput = document.getElementById('room-id');

const formElement = document.getElementById('form');

const socket = io('http://localhost:3000'); //connects the client to the server passed as url

socket.on('connect', ()=>{
    console.log("Connected to server");
    displayID(socket.id)
});
//connect event is throws by server when connection is established

socket.on('recieve-msg', (message)=>{
    displayMessage(message);
});

function displayID(ID){
    const roomID = document.getElementById('your-id');
    roomID.innerHTML = "You are connected with ID = "+ID;
}

function displayMessage(msg){
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = msg;
    msgDabba.appendChild(msgDiv);
}

formElement.addEventListener("submit", (event)=>{
    event.preventDefault();
    const message = msgInput.value;
    const room = roomInput.value;
    
    if(message == ""){
        return;
    }
    displayMessage(message);
    socket.emit('send-msg', message, room);
    //throw out a send-msg named custom event with any amount/type of data

    msgInput.value = "";
});

joinRoomButton.onclick = joinRoom;

function joinRoom(){
    const room = roomInput.value;
    socket.emit('join-room', room, (message)=>{
        displayMessage(message);
    });
}
