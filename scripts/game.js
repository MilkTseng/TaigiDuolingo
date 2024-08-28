let haveResult = false; // whether the result is out
let isFirstWrong = true; //whether it is the first wrong answer

$(document).ready(function() {
    let unit = localStorage.getItem("unit");
    let section = localStorage.getItem("section");
    let part = localStorage.getItem("part");
    if(part != "review") {
        part++; // move to the next part
    }
    $.getJSON(`../unit${unit}/section${section}.json`, function(data) {
        let questions;
        if(part != "review") {
            questions = data[`part${part}`];
        }
        else {
            questions = data.review;
        }
        let questionNum = questions.length; // the total number of questions
        let currentNum = 0; // the current number of question
        let sequence = randomSequence(questionNum); // an array with random sequence of number
        let index = sequence[currentNum]; // the question number in json
        let question = questions[index];
        loadQuestion(question);
        loadAnswer(question);
        $(".content").fadeIn(200);

        $(".result-section").on("click",".correct-next, .wrong-next", function() {
            $(".content").fadeOut(200, function() {
                removeQuestion();
                currentNum++;
                questionNum = sequence.length;
                index = sequence[currentNum];
                if(index == -1) {
                    $(".question").text("複習錯題");
                    $(".result-button").removeClass("unactive");
                    $(".result-button").addClass("correct-next");
                    $(".content").fadeIn(200);
                }
                else if(currentNum < questionNum) {
                    question = questions[index];
                    loadQuestion(question);
                    loadAnswer(question);
                    $(".content").fadeIn(200);
                }
                else {
                    if(part != "review") {
                        localStorage.setItem("currentPart", part);
                    }
                    window.location.href = "lobby.html";
                }
            })
        })
        $(".answer-section").on("click", ".text-sound-button", function() {
            if(!haveResult) {
                checkAnswer($(this), currentNum, questionNum, index, sequence);
            }
                
        })
        $(".answer-section").on("click", ".sound-button", function() {
            if(!haveResult)
                chooseOption($(this));
        })
        $(".result-section").on("click", ".confirm", function() {
            if(!haveResult) {
                checkAnswer($(".choose"), currentNum, questionNum, index, sequence);
            }
        })
    })
    
    $(".question-section, .answer-section").on("click", ".sound-button, .text-sound-button", function() {
        playSound($(this));
    });

    $(".close-button").on("click", function() {
        let sureToLeave = confirm("確定離開？");
        if(sureToLeave) {
            window.location.href = "lobby.html";
        }
    })
    
})

function playSound(element) {
    let soundFile = element.data("sound");
    let audio = new Audio(soundFile);
    audio.play();
}

function playSoundFile(soundFile) {
    let audio = new Audio(soundFile);
    audio.play();
}

function removeQuestion() {
    $(".question-content").children().remove();
    $(".answer-section").children().remove();
    $(".result").text("");
    $(".result").removeClass("correct wrong");
    $(".result-button").removeClass("correct-next wrong-next");
    $(".result-button").addClass("unactive");
    haveResult = false;
}

function loadQuestion(q) {
        $(".question").text(q.question);
        $(".question").data("answer", q.answer.number);
        let type = q.questionType;
        if(type == "sound button" || type == "text sound button" || type == "text sound button and text") {
            let dataAnswer = `data-answer="${q.answer.number}"`;
            let soundFile = `unit1/sounds/${q.answer.sound}.mp3`;
            let questionHTML = "";
            if(type == "sound button") {
                questionHTML = soundButtonHTML(soundFile, dataAnswer);
            }
            else {
                let text = q.answer.buttonText;
                questionHTML = textSoundButtonHTML(text, soundFile, dataAnswer);
            }
            $(".question-content").append(questionHTML);
            playSound($(".sound-button"));
            playSound($(".text-sound-button"));
        }
        if(type == "text" || type == "text sound button and text") {
            $(".question-content").append(`<p class="question-text">${q.answer.text}</p>`)
        }
}

function loadAnswer(q) {
    let type = q.answerType;
    let optionHTML = "";
    if(type == "text sound option" || type == "sound option") {
        $.each(q.options, function(i, option) {
            let dataNumber = `data-number="${option.number}"`;
            let soundFile = `unit1/sounds/${option.sound}.mp3`;
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

function checkAnswer(button, currentNum, questionNum, index, sequence) {
    let isCorrect = checkOptionAnswer(button);
    let progress = 0;
    if(!isCorrect) {
        if(isFirstWrong) {
            sequence.push(-1); // add a page to separate the wrong questions
            isFirstWrong = false;
        }
        sequence.push(index);
        questionNum++;
    }
    progress = (currentNum + 1)*100/questionNum;
    $(".progress").css("width", progress + "%");
}

function checkOptionAnswer(button) {
    let isCorrect = false;
    let answer = $(".question").data("answer");
    let choose = button.data("number");
    $(".result-button").removeClass("confirm");
    $(".result-button").removeClass("unactive");
    $(".answer-section").find(".text-sound-button, .sound-button").each(function() {
        if($(this).data("number") == answer) {
            $(this).addClass("correct-option"); // add green border
        }
    })
    if(choose == answer) {
        isCorrect = true;
        $(".result").text("答對了！");
        $(".result").addClass("correct");
        $(".result-button").addClass("correct-next");
    }
    else {
        isCorrect = false;
        $(".result").text("答錯了！");
        $(".result").addClass("wrong");
        button.addClass("wrong-option"); // add red border
        $(".result-button").addClass("wrong-next");
    }
    
    $(".result-button").text("繼續");
    haveResult = true;
    return isCorrect;
}

function chooseOption(button) {
    $(".answer-section").children().removeClass("choose");
    button.addClass("choose"); // add blue border
    $(".result-button").text("確定");
    $(".result-button").removeClass("unactive");
    $(".result-button").addClass("confirm");
}

function randomSequence(n) {
    let array = [];
    for(let i = 0; i < n; i++) {
        array.push(i);
    }
    // Fisher Yates Method
    for (let i = array.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
    console.log(array);
    return array;
}