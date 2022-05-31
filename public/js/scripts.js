
const socket = io('/');

const getElementById = (id)=> document.getElementById(id) || null;



//* get DOM element

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_fomr');


function helloUser(){
    const userName = prompt('What is your name');
    //서버에서 클라이언트로 보낼때
    //클라이언트에서 서버로 보낼때 상관없음
    socket.emit("new_user",userName, (data)=>{
        console.log(data);
    });
    socket.on('hello_user',(data)=>{
        console.log(data);
    })
}

function init(){
    helloUser();
}

init();