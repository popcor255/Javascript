let delay;
let minutes;
let seconds;

let pause = false;
 
function timeHandler(){
    let time_input = document.getElementById("time_input");
    let index = time_input.innerText.indexOf(":");
    minutes = time_input.innerText.substring(0, index);
    seconds = time_input.innerText.substring(index + 1, time_input.innerText.length);
    time_input.innerText = " ";
    changeTime();
}

function setTime(input){
    clearTimeout(delay);
    let time_input = document.getElementById("time_input");
    let index = input.indexOf(":");
    minutes = input.substring(0, index);
    seconds = input.substring(index + 1, input.length);
    time_input.innerText = " ";
    changeTime();
}

function togglePause(){
    let quiz = document.getElementById("quiz_content");
    let tint = document.getElementById("film_bg");
    if(pause == false){
        quiz.style.pointerEvents = "none";
        animateOpacity(tint, 0.6);
    }
    else{
        quiz.style.pointerEvents = "initial";
        animateOpacity(tint, 0);
    }
    pause = !pause;
}

function animateOpacity(element, to){
    element.style.opacity = to;
}


function changeTime(){
    if(pause == true){
        delay = setTimeout(function(){changeTime()}, 1000);
    }
    else if(minutes > -1){
        if(delay != undefined){
            clearTimeout(delay);
        }

        let timer = document.getElementById("timer_text");
    
        if(0 == seconds && 0 == minutes){
            seconds = 0;
            minutes = 0;
            enter();
            nextQuestion();
        }
        else if(0 < seconds){
            seconds -= 1;

            timer.innerText = numberFormat(minutes, "##") + ":" + numberFormat(seconds, "##");
            delay = setTimeout(function(){changeTime()}, 1000);
        }
        else{
            seconds = 59;
            minutes -= 1;

            timer.innerText = numberFormat(minutes, "##") + ":" + numberFormat(seconds, "##");
            delay = setTimeout(function(){changeTime()}, 1000);
        }
    }
    
}

function numberFormat(x,rp){
    let value = "";
    const ph = x + "";

    if(rp.includes(".") == false){
        if(ph.length == rp.length){
            value = ph;
        }   
        else if(ph.length > rp.length){
            value = ph.substring(0, rp.length);
        } 
        else if(ph.length < rp.length){
            for(var j = ph.length; j < rp.length; j++){
                value += "0";
            }
            value += ph;
        }
    }
    
    return value;
}