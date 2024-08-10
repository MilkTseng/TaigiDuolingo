
$(document).ready(function() {
    $.getJSON("./unit1.json", function(data) {
        let questionNum = data.section1.length; // total number of questions
        let currentNum = -1; // the current number of question
        $(".next").on("click", function() {
            currentNum++;
            console.log(currentNum);
            console.log(questionNum);
            if(currentNum < questionNum) {
                loadQuestion(data, currentNum);
            }
        })
        $(".answer-section").on("click", ".option-button", function() {
            checkAnswer($(this));
        })
    
    })
    
    $(".question-section, .answer-section").on("click", ".sound-button, .text-sound-button", function() {
        playSound($(this));
    });
})

function playSound(element) {
    let soundFile = element.data("sound");
    let audio = new Audio(soundFile);
    audio.play();
}

function loadQuestion(data, currentNum) {
        let q = data.section1[currentNum];
        if(q.type == "listen and choose") {
            listenAndChoose(q);
        }
}

function listenAndChoose(q) {
    $(".question").text("你聽到什麼？");
    let answer = `data-answer="${q.answer.number}"`;
    let soundFile = `/sounds0/${q.question.tailo}${q.question.index}.mp3`;
    let questionHTML = soundButtonHTML(soundFile, answer);
    $(".question-section").append(questionHTML);
    $.each(q.options, function(i, option) {
        let number = `data-number="${option.number}"`;
        let soundFile = `/sounds0/${option.tailo}${option.index}.mp3`;
        let optionHTML = textSoundButtonHTML(option.zhuin, soundFile, number);
        $(".answer-section").append(optionHTML);
    })
    $(".answer-section").find("button").addClass("option-button");
    

}

function soundButtonHTML(soundFile, otherProp) {
    return `<button class="sound-button" data-sound=${soundFile} ${otherProp}>
                <i class="fa-solid fa-volume-high"></i>
            </button>`;
}

function textSoundButtonHTML(text, soundFile, otherProp) {
    return `<button class="text-sound-button" data-sound=${soundFile} ${otherProp}>${text}</button>`;
}

function checkAnswer(button) {
    answer = button.closest(".content").find(".question-section").find(".sound-button").data("answer");
    choose = button.data("number");
    console.log(answer);
    console.log(choose);
    if(choose == answer) {
        console.log("correct");
    }
    else {
        console.log("wrong");
    }
}