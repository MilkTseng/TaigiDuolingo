

function Alphebet(zhuin, tailo){
    this.zhuin = zhuin;
    this.tailo = tailo;
}
let consonants = [
    new Alphebet("ㄅ", "p"),
    new Alphebet("ㄆ", "ph"),
    new Alphebet("ㄇ", "m"),
    new Alphebet("ㆠ", "b"),
    new Alphebet("", ""),
    new Alphebet("ㄉ", "t"),
    new Alphebet("ㄊ", "th"),
    new Alphebet("ㄋ", "n"),
    new Alphebet("ㄌ", "l"),
    new Alphebet("", ""),
    new Alphebet("ㄍ", "k"),
    new Alphebet("ㄎ", "kh"),
    new Alphebet("ㄏ", "h"),
    new Alphebet("ㆣ", "g"),
    new Alphebet("ㄫ", "ng"),
    new Alphebet("ㄐ", "ts"),
    new Alphebet("ㄑ", "tsh"),
    new Alphebet("ㄒ", "s"),
    new Alphebet("ㆢ", "j"),
    new Alphebet("", ""),
    new Alphebet("ㄗ", "ts"),
    new Alphebet("ㄘ" ,"tsh"),
    new Alphebet("ㄙ", "s"),
    new Alphebet("ㆡ", "j"),
    new Alphebet("", ""),
]

let vowels = [
    new Alphebet("ㄧ", "i"),
    new Alphebet("ㄨ", "u"),
    new Alphebet("ㆪ", "inn"),
    new Alphebet("ㆫ", "unn"),
    new Alphebet("", ""),
    new Alphebet("", ""),
    new Alphebet("ㄚ", "a"),
    new Alphebet("ㆦ", "oo"),
    new Alphebet("ㄜ", "o"),
    new Alphebet("ㆤ", "e"),
    new Alphebet("ㄞ", "ai"),
    new Alphebet("ㄠ", "au"),
    new Alphebet("ㆩ", "ann"),
    new Alphebet("ㆧ", "onn"),
    new Alphebet("", ""),
    new Alphebet("ㆥ", "enn"),
    new Alphebet("ㆮ", "ainn"),
    new Alphebet("ㆯ", "aunn"),
    new Alphebet("ㆬ", "m"),
    new Alphebet("ㆰ", "am"),
    new Alphebet("ㆱ", "om"),
    new Alphebet("ㄢ", "an"),
    new Alphebet("ㄣ", "n"),
    new Alphebet("", ""),
    new Alphebet("ㆭ", "ng"),
    new Alphebet("ㄤ", "ang"),
    new Alphebet("ㄥ", "ng"),
    new Alphebet("ㆲ", "ong"),
    new Alphebet("", ""),
    new Alphebet("", ""),

]



document.addEventListener('DOMContentLoaded', function() {
    tailoSwitch();
    loadAlphebet(false);
    buttonSound();
});

function buttonSound(){
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const soundSrc = button.getAttribute('data-sound');
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
    for(i = 0; i < consonants.length; i++){
        if(consonants[i].tailo == ""){
            consonantsHtml +=`<div class="empty"></div>`;
        }
        else{
            consonantsHtml +=`
            <button data-sound="sounds/${consonants[i].tailo}.wav" class="consonant">
                <span class="big-letter">${isTailo? consonants[i].tailo:consonants[i].zhuin}</span>
                <span class="consonant-small-letter">${isTailo? consonants[i].zhuin:consonants[i].tailo}</span>
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
            <button data-sound="sounds/${vowels[i].tailo}.wav" class="vowel">
                <span class="big-letter">${isTailo? vowels[i].tailo:vowels[i].zhuin}</span>
                <span class="vowel-small-letter">${isTailo? vowels[i].zhuin:vowels[i].tailo}</span>
            </button>
            `;
        }
        
    }

    
    
    document.querySelector("#consonants").innerHTML = consonantsHtml;
    document.querySelector("#vowels").innerHTML = vowelsHtml;
    
}