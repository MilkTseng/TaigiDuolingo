$(document).ready(function() {
    let unit = localStorage.getItem("unit");
    let section = localStorage.getItem("section");
    let part = localStorage.getItem("part");
    part++; // move to the next part
    $(".content").load(`unit${unit}/${section}-${part}.html`);
    $(".content").on("click", ".fa-solid", function() {
        playSound($(this));
    });
    $(".start-button").on("click", function() {
        window.location.href = "game.html";
    })
    $(".leave-button").on("click", function() {
        window.location.href = "lobby.html";
    })
})

function playSound(element) {
    let soundFile = element.data("sound");
    let audio = new Audio(soundFile);
    audio.play();
}