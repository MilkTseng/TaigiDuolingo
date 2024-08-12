
$(document).ready(function() {
    $.getJSON("./unit1.json", function(data) {
        let questionNum = data.section1.length; // total number of questions
        let currentNum = -1; // the current number of question
        $(".next").on("click", function() {
            currentNum++;
            console.log(currentNum);
            console.log(questionNum);
            removeQuestion();
            if(currentNum < questionNum) {
                let question = data.section1[currentNum];
                loadQuestion(question);
                loadAnswer(question);
                $(".content").fadeIn();
            }
        })
        $(".answer-section").on("click", ".text-sound-button", function() {
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

function removeQuestion() {
    $(".content").fadeOut();
    $(".question-section").find(":not(p)").remove();
    $(".answer-section").children().remove();
}

function loadQuestion(q) {
        $(".question").text(q.question);
        if(q.questionType == "sound button") {
            let dataAnswer = `data-answer="${q.answer.number}"`;
            let soundFile = `/sounds0/${q.answer.tailo}${q.answer.index}.mp3`;
            let questionHTML = soundButtonHTML(soundFile, dataAnswer);
            $(".question-section").append(questionHTML);
        }
}

function loadAnswer(q) {
    if(q.answerType == "text sound option") {
        $.each(q.options, function(i, option) {
            let dataNumber = `data-number="${option.number}"`;
            let soundFile = `/sounds0/${option.tailo}${option.index}.mp3`;
            let optionHTML = textSoundButtonHTML(option.zhuin, soundFile, dataNumber);
            $(".answer-section").append(optionHTML);
        })
    }
}

function soundButtonHTML(soundFile, otherAttr) {
    return `<button class="sound-button" data-sound=${soundFile} ${otherAttr}>
                <i class="fa-solid fa-volume-high"></i>
            </button>`;
}

function textSoundButtonHTML(text, soundFile, otherAttr) {
    return `<button class="text-sound-button" data-sound=${soundFile} ${otherAttr}>${text}</button>`;
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