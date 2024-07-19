

function Alphebet(zhuin, tailo, index){
    this.zhuin = zhuin;
    this.tailo = tailo;
    this.index = index;
}
let consonants = [
    new Alphebet("ㄅ", "p", 0),
    new Alphebet("ㄆ", "ph", 0),
    new Alphebet("ㄇ", "m", 0),
    new Alphebet("ㆠ", "b", 0),
    new Alphebet("", ""),
    new Alphebet("ㄉ", "t", 0),
    new Alphebet("ㄊ", "th", 0),
    new Alphebet("ㄋ", "n", 0),
    new Alphebet("ㄌ", "l", 0),
    new Alphebet("", ""),
    new Alphebet("ㄍ", "k", 0),
    new Alphebet("ㄎ", "kh", 0),
    new Alphebet("ㄏ", "h", 0),
    new Alphebet("ㆣ", "g", 0),
    new Alphebet("ㄫ", "ng", 0),
    new Alphebet("ㄐ", "ts", 0),
    new Alphebet("ㄑ", "tsh", 0),
    new Alphebet("ㄒ", "s", 0),
    new Alphebet("ㆢ", "j", 0),
    new Alphebet("", ""),
    new Alphebet("ㄗ", "ts", 1),
    new Alphebet("ㄘ" ,"tsh", 1),
    new Alphebet("ㄙ", "s", 1),
    new Alphebet("ㆡ", "j", 1),
    new Alphebet("", ""),
]

let vowels = [
    new Alphebet("ㄧ", "i", 0),
    new Alphebet("ㄨ", "u", 0),
    new Alphebet("ㆪ", "inn", 0),
    new Alphebet("ㆫ", "unn", 0),
    new Alphebet("", ""),
    new Alphebet("", ""),
    new Alphebet("ㄚ", "a", 0),
    new Alphebet("ㆦ", "oo", 0),
    new Alphebet("ㄜ", "o", 0),
    new Alphebet("ㆤ", "e", 0),
    new Alphebet("ㄞ", "ai", 0),
    new Alphebet("ㄠ", "au", 0),
    new Alphebet("ㆩ", "ann", 0),
    new Alphebet("ㆧ", "onn", 0),
    new Alphebet("", ""),
    new Alphebet("ㆥ", "enn", 0),
    new Alphebet("ㆮ", "ainn", 0),
    new Alphebet("ㆯ", "aunn", 0),
    new Alphebet("ㆬ", "m", 1),
    new Alphebet("ㆰ", "am", 0),
    new Alphebet("ㆱ", "om", 0),
    new Alphebet("ㄢ", "an", 0),
    new Alphebet("ㄣ", "n", 1),
    new Alphebet("", ""),
    new Alphebet("ㆭ", "ng", 1),
    new Alphebet("ㄤ", "ang", 0),
    new Alphebet("ㄥ", "ng", 2),
    new Alphebet("ㆲ", "ong", 0),
    new Alphebet("", ""),
    new Alphebet("", ""),

]

let tones = [
    new Alphebet("ㄚ", "a", 1),
    new Alphebet("ㄚ˫", "ā", 7),
    new Alphebet("ㄚ˪", "à", 3),
    new Alphebet("ㄚˋ", "á", 2),
    new Alphebet("ㄚˊ", "â", 5),
]

document.addEventListener('DOMContentLoaded', function() {
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
            <button data-sound="sounds0/${consonants[i].tailo}${consonants[i].index}.mp3" class="button consonant">
                <span class="big-letter">${isTailo? consonants[i].tailo:consonants[i].zhuin}</span>
                <span class="small-letter consonant-letter">${isTailo? consonants[i].zhuin:consonants[i].tailo}</span>
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
            <button data-sound="sounds0/${vowels[i].tailo}${vowels[i].index}.mp3" class="button vowel">
                <span class="big-letter">${isTailo? vowels[i].tailo:vowels[i].zhuin}</span>
                <span class="small-letter vowel-letter">${isTailo? vowels[i].zhuin:vowels[i].tailo}</span>
            </button>
            `;
        }
        
    }
    for(i = 0; i < tones.length; i++){
        tonesHtml +=`
        <p class="tone-term">第 ${tones[i].index} 調</p>
        <button data-sound="sounds0/${tones[i].tailo}${tones[i].index}.mp3" class="button tone">
            <span class="big-letter">${isTailo? tones[i].tailo:tones[i].zhuin}</span>
            <span class="small-letter tone-letter">${isTailo? tones[i].zhuin:tones[i].tailo}</span>
        </button>
        `;
        
    }

    
    
    document.querySelector("#consonants").innerHTML = consonantsHtml;
    document.querySelector("#vowels").innerHTML = vowelsHtml;
    document.querySelector("#tones").innerHTML = tonesHtml;
    
}