let setAlarmButton = document.getElementById('set-alarm-button');
let activeTimersDiv = document.getElementById('active-timers');
let idGiver = 1; // to give unique ids
let intervalIdMap = new Map(); // map to take intervalid related to a  div
setAlarmButton.addEventListener('click',() => {
    document.getElementById('warning').style.display = 'none';
     let timerDiv = document.createElement('div');
     let timerDivId = idGiver++;
     timerDiv.setAttribute('id',timerDivId); // setting id of timerdiv
     timerDiv.setAttribute('class','active-timer') 
     let hrs = parseInt(document.getElementById('hours').value, 10);// base 10 values
     let mins = parseInt(document.getElementById('minutes').value, 10);
     let seconds = parseInt(document.getElementById('seconds').value, 10);

     if(isNaN(hrs) || isNaN(mins) || isNaN(seconds)){
        return; // is user enter other than number then we will not do anything
     }

     document.getElementById('hours').value = "";
     document.getElementById('minutes').value= "";
     document.getElementById('seconds').value = "";
     let time = hrs * 60 * 60 + mins * 60 + seconds; // calculating time in seconds
     time = time * 1000; // making it according to setTime and setInterval functions
 
     // making timer div dynamically and appending it to active timer div
     timerDiv.innerHTML = 
     `
     <h5>Time Left :</h5>
     <div class="active-timer-input-section">
          <span id="hrs">${hrs}</span>
          <span>:</span>
          <span id="mn">${mins}</span> 
          <span>:</span>
         <span id="ss">${seconds}</span>
     </div>
     <button class="btndelete" onclick="deleteActiveTimer(${timerDivId})">Delete</button>
     <button class="btnstop" onclick="deleteActiveTimer(${timerDivId})">Stop</button>
      `

     activeTimersDiv.appendChild(timerDiv);
     setTimer(timerDivId,time); // calling setTimer function to set timer of this div
     
})

function sayHello(timerDivId) {
    let timerDiv = document.getElementById(timerDivId); // getting div
    let timerDiveChildren = timerDiv.children[1]; // second element which is 'active-timer-input-section'
    const spans = timerDiveChildren.getElementsByTagName("span"); //getting all the spans
    let hrs = parseInt(spans[0].textContent); // taking textContent inside each span
    let mins = parseInt(spans[2].textContent);
    let seconds = parseInt(spans[4].textContent);
    let time = hrs * 60 * 60 + mins * 60 + seconds; // calculating current time
    time-=1; // decreamenting time by one each time after every second
    if(time === 0){
        // if time == 0 that means our timer has finished so we will change our div
        timerDiveChildren.innerHTML = "Timer is Up!"
        timerDiv.children[0].innerHTML = '';
        timerDiv.style.backgroundColor='yellow'
        timerDiv.children[1].style.color='black'
        let finishButton = timerDiv.children[2];
        finishButton.style.display = 'none';
        let stopButton = timerDiv.children[3];
      
        stopButton.style.display = 'block';
        stopButton.style.backgroundColor = '#34344A';
        stopButton.style.color = 'white';
        playNotificationSound();
        let intervalId = setInterval(() => {
          if(timerDiv.style.backgroundColor === 'yellow'){
            timerDiv.style.backgroundColor = 'red'
          }else{
            timerDiv.style.backgroundColor = 'yellow'
          }
        },1000)
        setTimeout(() => {
           clearInterval(intervalId)
        },4000)
       

    }
    else{
        // if the timer is not 0 then we will set updated time
        hrs = Math.floor(time / (60 * 60));
        time = time % (60 * 60);
        mins = Math.floor(time / (60));
        time = time % 60;
        seconds = time;
        spans[0].innerText = hrs;
        spans[2].innerText = mins;
        spans[4].innerText = seconds;
    }

}

function deleteActiveTimer(divId) {
    const parentElement = document.getElementById('active-timers');
    const divToRemove = document.getElementById(divId);
    let intervalId = intervalIdMap.get(divId); // getting unique setInterval id related to this timer div
    intervalIdMap.delete(divId);
    if (divToRemove) {
        // Remove the div element from its parent
        parentElement.removeChild(divToRemove);
        clearInterval(intervalId);

    } else {
        console.log("The specified div doesn't exist.");
    }
    
   if(intervalIdMap.size === 0){
    document.getElementById('warning').style.display = 'block';
   }
    
    
}
function FinishTimer(intervalId,timerDivId){
    clearInterval(intervalId);
}


function setTimer(timerDivId,time){
    const intervalId = setInterval(sayHello, 1000,timerDivId);
    intervalIdMap.set(timerDivId,intervalId);
    let timerDiv = document.getElementById('timerDivId');
    setTimeout(FinishTimer,time,intervalId,timerDivId)
}


function playNotificationSound() {
    var audio = document.getElementById('notificationSound');
    audio.play();
}
