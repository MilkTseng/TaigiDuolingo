
$(document).ready(function() {
    localStorage.setItem("currentUnit", 2);
    localStorage.setItem("currentSection", 1);
    localStorage.setItem("currentPart", 5);
    $.getJSON("./lobby.json", function(data) {
        // load units
        $.each(data.units, function(i, unit) {
            $(".courses-container").append(unitHTML(unit, i+1));
            let sections = $(".courses-container").children().last().find(".section-container");
            $.each(unit.sections, function(j, section) {
                sections.append(sectionHTML(section, j+1));
            })
        })
        let currentUnit = localStorage.getItem("currentUnit");
        let currentSection = localStorage.getItem("currentSection");
        let currentPart = localStorage.getItem("currentPart");
        adjustProgress(currentUnit, currentSection, currentPart);
        currentUnit = localStorage.getItem("currentUnit");
        currentSection = localStorage.getItem("currentSection");
        currentPart = localStorage.getItem("currentPart");
        updateProgress(currentUnit, currentSection, currentPart);
        $(".course-section").filter(".finished-section, .current-section").on("click", function() {
            let chosenUnit = $(this).closest(".course-unit").data("unit");
            let chosenSection = $(this).data("section");
            let part = $(this).find(".section-progress").data("part");
            let parts = $(this).find(".section-progress-bar").data("parts")
            localStorage.setItem("unit", chosenUnit);
            localStorage.setItem("section", chosenSection);
            /*if(part < parts) {
                localStorage.setItem("part", part);
            }
            else {
                localStorage.setItem("part", "review");
            }*/
            window.location.href = "game.html";
        })
    })

})

function adjustProgress(currentUnit, currentSection, currentPart) {
    let unit;
    $(".course-unit").each(function() {
        if($(this).data("unit") == currentUnit)
            unit = $(this);
    })
    let sections = unit.data("sections");
    let section;
    unit.find(".course-section").each(function() {
        if($(this).data("section") == currentSection)
            section = $(this);
    })
    let parts = section.find(".section-progress-bar").data("parts");
   //let part = section.find(".section-progress").data("part");
   let part = currentPart;
    console.log(part);
    console.log(parts);
    if(part == parts) {
        currentSection++;
        localStorage.setItem("currentSection", currentSection);
        if(currentSection > sections) {
            currentUnit++;
            localStorage.setItem("currentUnit", currentUnit);
            localStorage.setItem("currentSection", 1);
        }
        localStorage.setItem("currentPart", 0);
    }
}

function updateProgress(currentUnit, currentSection, currentPart) {
    $(".course-unit").each(function() {
        if($(this).data("unit") < currentUnit) {
            $(this).find(".section-name").css("background-color", "coral");
            $(this).find(".section-name").css("color", "black");
            $(this).find(".section-name").css("cursor", "pointer");
            $(this).find(".course-section").addClass("finished-section");
            $(this).find(".section-progress").css("width", "100%");
        }
        else if($(this).data("unit") == currentUnit) {
            $(this).find(".course-section").each(function() {
                if($(this).data("section") <= currentSection) {
                    $(this).find(".section-name").css("background-color", "coral");
                    $(this).find(".section-name").css("color", "black");
                    $(this).find(".section-name").css("cursor", "pointer");
                    if($(this).data("section") < currentSection) {
                        $(this).find(".section-progress").css("width", "100%");
                        $(this).addClass("finished-section");
                    }
                    else {
                        $(this).addClass("current-section");
                        let totalPart = $(this).find(".section-progress-bar").data("parts");
                        let part = currentPart;
                        let progress = part * 100 / totalPart;
                        $(this).find(".section-progress").css("width", progress + "%");
                    }
                }
                
            })
        }
    })
}


function unitHTML(unit, num) {
    let sectionNum = unit.sections.length;
    return `<div class="course-unit" data-unit="${num}" data-sections=${sectionNum}>
        <div class="unit-title">${unit.unitName}</div>
        <div class="section-container">
            
        </div>
    </div>`
}

function sectionHTML(section, num) {
    return `<div class="course-section" data-section="${num}">
        <div class="section-name">${section.name}</div>
        <div class="section-progress-bar" data-parts="${section.partNum}">
            <div class="section-progress" data-part="0"></div>
        </div>
    </div>`
}