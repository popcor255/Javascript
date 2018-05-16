let object = "";
let obj_length;
var red, blue, green, blue, yellow, prompt;
//qn == quesion number
let qn = 0;

$.getJSON('./data.json', function(obj) {
    console.log(obj);
    object = obj;
});


$(document).ready(function() {
    red = $("#first")[0];
    blue = $("#second")[0];
    green = $("#third")[0];
    yellow = $("#fourth")[0];
    setQuestion();
    setChoices();
    setTime(object.questions[qn].time);
    obj_length = Object.keys(object.questions).length;
});

function nextQuestion(){
    if(qn < obj_length - 1){
        qn += 1;
        setTime(object.questions[qn].time);
        nextStage();
    }
    else{
        document.getElementById("question").innerText = "";
        togglePause();
    }  
}

function setQuestion(){
    prompt = document.getElementById("question");
    prompt.innerText = object.questions[qn].question;
}


function setChoices(){

    let high_length = "";

    const red_string = object.questions[qn].choices[0].text;
    const blue_string = object.questions[qn].choices[1].text;
    const green_string = object.questions[qn].choices[2].text;
    const yellow_string = object.questions[qn].choices[3].text;

    high_length = addSpacetoString(red_string, high_length);
    high_length = addSpacetoString(blue_string, high_length);
    high_length = addSpacetoString(green_string, high_length);
    high_length = addSpacetoString(yellow_string, high_length);

    red.innerHTML=  ParseString(red_string, high_length);
    blue.innerHTML = ParseString(blue_string, high_length);
    green.innerHTML = ParseString(green_string, high_length);
    yellow.innerHTML = ParseString(yellow_string, high_length);
}

function ParseString(str, value){
    let output = "";
    
    if(str.length < value.length){

        output = (  (""
                    + value.substring(0, (value.length - str.length) / 2)
                    + str
                    + value.substring((value.length - str.length) / 2, (value.length - str.length))
                    ).split(new RegExp('&', 'i')).join('&nbsp;&nbsp;')
                );
    }
    else{
        output = str;
    }

    return output;
}

function addSpacetoString(str, value){

    if(value.length < str.length){
        value = "";
        for(var i = 0; i < str.length; i++){
            value += "&";
        }
    }
    
    return value;
}

