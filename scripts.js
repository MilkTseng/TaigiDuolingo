
$(document).ready(function() {
    loadButtons();
    $("#tailo").on("change", tailoSwitch);
    $(".buttons").on("click", ".button", function() {
        playSound($(this));
    });
    $(".fa-solid").on("click", function() {
        playSound($(this));
    });
    $(".description-box").on("mouseenter mouseleave", function() {
        showDD($(this));
    })
    $("#show-all").on("change", function() {
        $(".description-box").find("dd").slideToggle();
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

function showDD(element) {
    let isShowAll = $("#show-all").prop("checked");
    if(!isShowAll){
        element.find("dd").slideToggle();
    }
}

/*document.addEventListener('DOMContentLoaded', function() {
    tailoSwitch();
    loadAlphebet(false);
    buttonSound();
});

function buttonSound(){
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const soundSrc = button.getAttribute('data-sound');
            const audio = new Audio(soundSrc);
            audio.play();
        });
    });

    const sounds = document.querySelectorAll('.fa-solid');

    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            const soundSrc = sound.getAttribute('data-sound');
            const audio = new Audio(soundSrc);
            audio.play();
        });
    });
}

function tailoSwitch(){
    let isTailo = false;
    const tailo = document.getElementById('tailo');

    tailo.addEventListener('change', function() {
        if (tailo.checked){
            isTailo = true;
        }
        else{
            isTailo = false;
        }
        loadAlphebet(isTailo);
        buttonSound();
    });
    
}

function loadAlphebet(isTailo){
    let consonantsHtml = "";
    let vowelsHtml = "";
    let tonesHtml = "";
    for(i = 0; i < consonants.length; i++){
        if(consonants[i].tailo == ""){
            consonantsHtml +=`<div class="empty"></div>`;
        }
        else{
            consonantsHtml +=`
            <button data-sound="sounds0/${consonants[i].tailo}${consonants[i].index}.mp3" data-zhuin="${consonants[i].zhuin}" data-tailo="${consonants[i].tailo}" class="button consonant">
                <span class="big-letter"></span>
                <span class="small-letter"></span>
            </button>
            `;
        }
        
    }
    for(i = 0; i < vowels.length; i++){
        if(vowels[i].tailo == ""){
            vowelsHtml += `<div class="empty"></div>`;
        }
        else{
            vowelsHtml +=`
            <button data-sound="sounds0/${vowels[i].tailo}${vowels[i].index}.mp3" data-zhuin="${vowels[i].zhuin}" data-tailo="${vowels[i].tailo}" class="button vowel">
                <span class="big-letter"></span>
                <span class="small-letter"></span>
            </button>
            `;
        }
        
    }
    for(i = 0; i < tones.length; i++){
        tonesHtml +=`
        <p class="tone-term">第 ${tones[i].index} 調</p>
        <button data-sound="sounds0/${tones[i].tailo}${tones[i].index}.mp3" data-zhuin="${tones[i].zhuin}" data-tailo="${tones[i].tailo}" class="button tone">
            <span class="big-letter"></span>
            <span class="small-letter"></span>
        </button>
        `;
        
    }

    
    
    document.querySelector("#consonants").innerHTML = consonantsHtml;
    document.querySelector("#vowels").innerHTML = vowelsHtml;
    document.querySelector("#tones").innerHTML = tonesHtml;
    
}*/