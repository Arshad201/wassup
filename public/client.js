const socket = io();

let name;
let textArea = document.querySelector('.input');
const msges = document.querySelector('.msges');
const typing = document.querySelector('.typing');


do {
    name = prompt('Enter your name : ');
} while (!name);

textArea.addEventListener('keyup', (e)=>{

    if(e.target.value.length!=0){

        if(e.key == 'Enter'){

            sendMessage(e.target.value)
            e.target.value = '';
        }

    }

    sendTypingMessage();

})

textArea.addEventListener('keydown', (e)=>{
    typing.innerHTML = '';
})
function sendMessage(message){

    let msg = {
        user : name,
        message : message
    }

    appendMessage(msg, 'outgoing');

    //Send message to server!
    socket.emit('message', msg);

}

function sendTypingMessage(){

    let typingUser = {
        message : `${name} is typing...` 
    }

    //Typing message to server!
    socket.emit('typing', typingUser);

}

function appendMessage(msg, type){
    
    const create = document.createElement('div');
    create.classList.add('msgBox', `${type}Box`)
    create.innerHTML = `<span class="userName">${msg.user}</span>
    <span class="msg ${type}Msg">${msg.message}</span>`
    
    // console.log(msges)
    msges.appendChild(create);

    scrollToBottom();

}

function scrollToBottom(){
    msges.scrollTop = msges.scrollHeight;
}
//Receive Msg from server!
socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming');
})

let timeId = null;
function debounce(myfun, timer){
    
    if(timeId){
        clearTimeout(timeId);
    }

    timeId = setTimeout(() => {
        myfun();
    }, timer);
}
socket.on('typing', (msg)=>{
    typing.innerHTML = msg.message;

    debounce(()=>{
        typing.innerHTML = ''
    }, 1000)
})

