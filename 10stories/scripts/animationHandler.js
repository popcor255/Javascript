let answer_prompted = false;
let gone = true;
let holder = false;
let set = "";
let prev_element = "none";
let prev_button = "none";
var current_animation = setTimeout(function(){/*empty*/}, 0);

function animationHandler(){
    let prompt_container = document.getElementById("prompt_container");
    prompt_container.style.top = "0%";
    gone = false;
}

function enterRaw(time){

    clearTimeout(current_animation);
    prompt_container.style.display = "initial";

    setTimeout(function(){
        let prompt_container = document.getElementById("prompt_container");
        prompt_container.style.top = "200%";
        transitionInverse();
        animationHandler();
    }, time);
}

function enter(){

    let time_delay = 100;

    if(gone == false){
        exit();
        time_delay = 100 + 800;
    }

    if(holder == false){
        enterRaw(time_delay);
    }
    else{
        setTimeout(function(){ enter();}, 800);
    }
}

function nextStage(){
    setTimeout(function(){ StageIntervalContainer(); }, 1200)
}

function StageIntervalContainer(){
    if(holder == false){
        setQuestion();
        setChoices();
    }
    else{
        setTimeout(function(){ StageIntervalContainer(); }, 1200)
    }
}

function exit(){

    let prompt_container = document.getElementById("prompt_container");
    prompt_container.style.top = "200%";
    current_animation = setTimeout(function(){
        let prompt_container = document.getElementById("prompt_container");
        prompt_container.style.display = "none";
        gone = true; 
    }, 800);
}

function animate(element){
    showAnswer(element);
    if(answer_prompted == true){
        enter();
        nextQuestion();
        answer_prompted = false;
    }
    else{
        answer_prompted = true;
    }
}

//CA == Click Answer Element
function animateCAE(element){

    if(prev_element.id == element.id){
        animate(element);
        return null;
    }
    else if(prev_element != "none"){
        prev_element.style.padding = "6%";
    }

    element.style.padding = "8%";
    prev_element = element;
}

function transition(){
    for(var i = 1; i < 5; i++){
        getElementByIndex(i).style.padding = "0%";
        getElementByIndex(i).innerHTML = "";
    }
}

function transitionInverse(){
    for(var i = 1; i < 5; i++){
        getElementByIndex(i).style.padding = "6%";
        getElementByIndex(i).innerHTML = getInputText();
    }
}

function setInputText(input){
    set = input;
}

function getInputText(){
    return set;
}

function showAnswer(element){
    let placeholder = element.innerHTML;

    transition();

    setTimeout(function(){
        element.style.padding = "8%";
        element.style.margin = "2%";
        element.innerHTML = placeholder;
    }, 500);
}


function getElementByIndex(index){
    let ele = "none";

    if(1 == index){
        ele = document.getElementById("first");
    }
    else if(2 == index){
        ele = document.getElementById("second");
    }
    else if(3 == index){
        ele =  document.getElementById("third");
    }
    else if(4 == index){
        ele =  document.getElementById("fourth");
    }

    return ele;
}