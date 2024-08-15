
$(document).ready(function() {
    loadButtons();
    $("#tailo").on("change", tailoSwitch);
    $(".buttons").on("click", ".button", function() {
        playSound($(this));
    });
    $(".fa-solid").on("click", function() {
        playSound($(this));
    });
    $(".description-box").on("click", "dt", function() {
        showDescription($(this).closest(".description-box"));
    })
    $("#show-all").on("change", function() {
        if($("#show-all").prop("checked")) {
            $(".description-box").find("dd").slideDown();
        }
        else {
            $(".description-box").find("dd").slideUp();
        }
    });
})

function buttonHTML(zhuin, tailo, index, type) {
    if(tailo == ""){
        return `<div class="empty"></div>`;
    }
    else {
        return`
        <button data-sound="sounds0/${tailo}${index}.mp3" data-zhuin="${zhuin}" data-tailo="${tailo}" class="button ${type}">
            <span class="big-letter">${zhuin}</span>
            <span class="small-letter">${tailo}</span>
        </button>`
    }
}

function tailoSwitch() {
    let isTailo = $("#tailo").prop("checked");
    $(".button").each(function() {
        let bigLetter = isTailo? $(this).data("tailo"): $(this).data("zhuin");
        let smallLetter = isTailo? $(this).data("zhuin"): $(this).data("tailo");
        $(this).find(".big-letter").text(bigLetter);
        $(this).find(".small-letter").text(smallLetter);
    });
}

function playSound(element) {
    let soundFile = element.data("sound");
    let audio = new Audio(soundFile);
    audio.play();
}

function loadButtons() {
    $.getJSON("./alphabets.json", function(data) {
        $.each(data.consonants, function(i, letter)  {
            let HTML = buttonHTML(letter.zhuin, letter.tailo, letter.index, "consonant");
            $("#consonants").append(HTML);
        })
        $.each(data.vowels, function(i, letter)  {
            let HTML = buttonHTML(letter.zhuin, letter.tailo, letter.index, "vowel");
            $("#vowels").append(HTML);
        })
        $.each(data.tones, function(i, letter)  {
            let HTML = buttonHTML(letter.zhuin, letter.tailo, letter.index, "tone");
            $("#tones").append(HTML);
        })
    })
}

function showDescription(element) {
    let isShowAll = $("#show-all").prop("checked");
    if(!isShowAll){
        element.find("dd").slideToggle(200);
    }
}