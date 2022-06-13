
const socket = io('/11');

const getElementById = (id)=> document.getElementById(id) || null;



//* get DOM element

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');


//* event callback functions 
const handleSubmit = (event)=>{
   event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if(inputValue !== ''){
      //빈값이 아닐때 
      socket.emit('submit_chat', inputValue);
      //화면에다가 그리기 
      drawNewChat(`me: ${inputValue}`)
       event.target.elements[0].value = "";
  }
}

//* draw functions

const drawHelloStranger = (username) => {
    helloStrangerElement.innerText = `Hello ${username} Stranger :)`;
}

const drawNewChat = (message) => {
    const wrapperChatBox = document.createElement('div');
    const chatBox = `<div>${message}</div>`
    wrapperChatBox.innerHTML = chatBox;
    chattingBoxElement.append(wrapperChatBox)
}


//* global socket handler
socket.on('user_connected',(username)=>{
   drawNewChat(`${username}님이 채팅방에 입장했습니다.`)
})
socket.on("new_chat",(data)=>{
     const{chat, username} = data;
     drawNewChat(`${username}:${chat}`)
})
function helloUser(){
    const userName = prompt('What is your name');
    // //서버에서 클라이언트로 보낼때
    // //클라이언트에서 서버로 보낼때 상관없음
    socket.emit("new_user",userName, (data)=>{
        drawHelloStranger(data)
    })
    
}

function init(){
    helloUser();
    //이벤트 연결 
    formElement.addEventListener('submit',handleSubmit);
}

init();