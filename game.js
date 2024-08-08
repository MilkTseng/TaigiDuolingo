
$(document).ready(function() {
    let questionNum = questionCnt(1, 1);
    let currentNum = 0;
    $(".next").on("click", function() {
        console.log(currentNum);
        console.log(questionNum);
        if(currentNum < questionNum) {
            currentNum++;
            loadQuestion(currentNum);
           
        }
    })
    
    $(".sound-button, .option-button").on("click", function() {
        playSound($(this));
    });
})

function playSound(element) {
    let soundFile = element.data("sound");
    let audio = new Audio(soundFile);
    audio.play();
}

function loadQuestion(number) {
    $.getJSON("./unit1.json", function(data) {
        if(data.section1[number].type == "listen and choose") {
            listenAndChoose(data.section1);
        }
    })
}

function listenAndChoose(q) {
    $(".question").text("你聽到什麼？");
    let html = soundButtonHTML(q.question, `/sounds0/${q.question}0.mp3`)
    $(".question-section").append(html);

}

function soundButtonHTML(word, soundFile) {
    return `<button class="sound-button" data-word=${word} data-sound=${soundFile}>
                <i class="fa-solid fa-volume-high"></i>
            </button>`
}

function questionCnt(unit, section) {
    $.getJSON(`./unit${unit}.json`, function(data) {
        questionCnt = data[`section${section}`].length;
        return questionCnt;
    })
}