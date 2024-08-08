$(document).ready(function() {
    $(".sound-button, .option-button").on("click", function() {
        playSound($(this));
    });
})

function playSound(element) {
    let soundFile = element.data("sound");
    let audio = new Audio(soundFile);
    audio.play();
}