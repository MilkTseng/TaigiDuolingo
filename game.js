let haveResult = false;

$(document).ready(function() {
    $.getJSON("./unit1.json", function(data) {
        let questionNum = data.section1.length; // total number of questions
        let currentNum = 0; // the current number of question
        let progress = (currentNum + 1)*100/questionNum; // to change the progress bar
        let sequence = randomSequence(questionNum); // an array with random sequence of number
        let index = sequence[currentNum]; // the question number in json
        let question = data.section1[index];
        loadQuestion(question);
        loadAnswer(question);
        $(".content").fadeIn(200);
        $(".result-section").on("click",".next", function() {
            $(".content").fadeOut(200, function() {
                currentNum++;
                index = sequence[currentNum];
                removeQuestion();
                if(currentNum < questionNum) {
                    let question = data.section1[index];
                    loadQuestion(question);
                    loadAnswer(question);
                    $(".content").fadeIn(200);
                }
            })
        })
        $(".answer-section").on("click", ".text-sound-button", function() {
            if(!haveResult) {
                progress = (currentNum + 1)*100/questionNum;
                console.log(progress);
                checkAnswer($(this), progress);
            }
                
        })
        $(".answer-section").on("click", ".sound-button", function() {
            if(!haveResult)
                chooseOption($(this));
        })
        $(".result-section").on("click", ".confirm", function() {
            if(!haveResult) {
                progress = (currentNum + 1)*100/questionNum;
                console.log(progress);
                checkAnswer($(".choose"), progress);
            }
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
    $(".question-section").find(":not(.question)").remove();
    $(".answer-section").children().remove();
    $(".result").text("");
    $(".result").removeClass("correct, wrong");
    $(".result-button").removeClass("next");
    $(".result-button").addClass("unactive");
    haveResult = false;
}

function loadQuestion(q) {
        $(".question").text(q.question);
        $(".question").data("answer", q.answer.number);
        let type = q.questionType;
        console.log(type);
        if(type == "sound button" || type == "text sound button" || type == "text sound button and text") {
            console.log("soundsound");
            let dataAnswer = `data-answer="${q.answer.number}"`;
            let soundFile = `/unit1/sounds/${q.answer.sound}.mp3`;
            let questionHTML = "";
            if(type == "sound button") {
                questionHTML = soundButtonHTML(soundFile, dataAnswer);
            }
            else {
                let text = q.answer.buttonText;
                questionHTML = textSoundButtonHTML(text, soundFile, dataAnswer);
            }
            $(".question-section").append(questionHTML);
            playSound($(".sound-button"));
            playSound($(".text-sound-button"));
        }
        if(type == "text" || type == "text sound button and text") {
            console.log("texttext");
            $(".question-section").append(`<p class="question-text">${q.answer.text}</p>`)
        }
}

function loadAnswer(q) {
    let type = q.answerType;
    let optionHTML = "";
    if(type == "text sound option" || type == "sound option") {
        $.each(q.options, function(i, option) {
            let dataNumber = `data-number="${option.number}"`;
            let soundFile = `/unit1/sounds/${option.sound}.mp3`;
            if(type == "sound option") {
                optionHTML = soundButtonHTML(soundFile, dataNumber);
            }
            else {
                let text = option.text;
                optionHTML = textSoundButtonHTML(text, soundFile, dataNumber);
            }
            //randomly arrange options
            if(Math.random() < 0.5) {
                $(".answer-section").append(optionHTML);
            }
            else {
                $(".answer-section").prepend(optionHTML);
            }
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

function checkAnswer(button, progress) {
    answer = $(".question").data("answer");
    choose = button.data("number");
    console.log(answer);
    console.log(choose);
    $(".result-button").removeClass("confirm");
    $(".result-button").removeClass("unactive");
    $(".answer-section").find(".text-sound-button, .sound-button").each(function() {
        if($(this).data("number") == answer) {
            $(this).addClass("correct-option");
        }
    })
    if(choose == answer) {
        console.log("correct");
        $(".result").text("答對了！");
        $(".result").addClass("correct");
    }
    else {
        console.log("wrong");
        $(".result").text("答錯了！");
        $(".result").addClass("wrong");
        button.addClass("wrong-option");
    }
    $(".result-button").addClass("next");
    $(".result-button").text("繼續");
    $(".progress").css("width", progress + "%");
    haveResult = true;
}

function chooseOption(button) {
    button.closest(".answer-section").children().removeClass("choose");
    button.addClass("choose");
    $(".result-button").text("確定");
    $(".result-button").removeClass("unactive");
    $(".result-button").addClass("confirm");
}

function randomSequence(n) {
    let array = [];
    for(let i = 0; i < n; i++) {
        if(Math.random() < 0.5) {
            array.push(i);
        }
        else {
            array.unshift(i);
        }
    }
    return array;
}