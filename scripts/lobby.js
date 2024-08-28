
$(document).ready(function() {
    
    $.getJSON("../jsons/lobby.json", function(data) {
        if(!localStorage.getItem("currentUnit")) {
            localStorage.setItem("currentUnit", 1);
            localStorage.setItem("currentSection", 1);
            localStorage.setItem("currentPart", 0);
        }

        // load units
        $.each(data.units, function(i, unit) {
            $(".courses-container").append(unitHTML(unit, i+1));
            let sections = $(".courses-container").children().last().find(".section-container");
            $.each(unit.sections, function(j, section) {
                sections.append(sectionHTML(section, j+1));
            })
        })
        $(".unit-title").each(function() {
            $(this).css("color", color($(this).closest(".course-unit").data("unit")));
        })

        let currentUnit = localStorage.getItem("currentUnit");
        let currentSection = localStorage.getItem("currentSection");
        let currentPart = localStorage.getItem("currentPart");
        updateProgress(currentUnit, currentSection, currentPart);

        $(".course-section").filter(".current-section").on("click", function() {
            let chosenUnit = $(this).closest(".course-unit").data("unit");
            let chosenSection = $(this).data("section");
            localStorage.setItem("unit", chosenUnit);
            localStorage.setItem("section", chosenSection);
            localStorage.setItem("part", currentPart);
            window.location.href = "game.html";
        })
        $(".course-section").filter(".finished-section").on("click", function() {
            let chosenUnit = $(this).closest(".course-unit").data("unit");
            let chosenSection = $(this).data("section");
            localStorage.setItem("unit", chosenUnit);
            localStorage.setItem("section", chosenSection);
            localStorage.setItem("part", "review");
            window.location.href = "game.html";
        })
        $(".course-section").on("click", function() {
            if(!$(this).data("open")) {
                alert("尚未開放");
            }
        })

    })

})

function updateProgress(currentUnit, currentSection, currentPart) {
    // adjust progress
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
    if(currentPart == parts) {
        currentSection++;
        localStorage.setItem("currentSection", currentSection);
        if(currentSection > sections) {
            currentUnit++;
            localStorage.setItem("currentUnit", currentUnit);
            currentSection = 1;
            localStorage.setItem("currentSection", 1);
        }
        currentPart = 0;
        localStorage.setItem("currentPart", 0);
    }
    // change css
    $(".course-unit").each(function() {
        if($(this).data("unit") < currentUnit) {
            $(this).find(".section-name").css("background-color", color($(this).data("unit")));
            $(this).find(".section-name").css("color", "black");
            $(this).find(".section-name").css("cursor", "pointer");
            $(this).find(".course-section").addClass("finished-section");
            $(this).find(".section-progress").css("width", "100%");
        }
        else if($(this).data("unit") == currentUnit) {
            $(this).find(".course-section").each(function() {
                if($(this).data("section") <= currentSection && $(this).data("open")) {
                    $(this).find(".section-name").css("background-color", color($(this).closest(".course-unit").data("unit")));
                    $(this).find(".section-name").css("color", "black");
                    $(this).find(".section-name").css("cursor", "pointer");
                    if($(this).data("section") < currentSection) {
                        $(this).find(".section-progress").css("width", "100%");
                        $(this).addClass("finished-section");
                    }
                    else {
                        $(this).addClass("current-section");
                        let totalParts = $(this).find(".section-progress-bar").data("parts");
                        let progress = currentPart * 100 / totalParts;
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
    return `<div class="course-section" data-section="${num}" data-open="${section.isOpen}">
        <div class="section-name">${section.name}</div>
        <div class="section-progress-bar" data-parts="${section.partNum}">
            <div class="section-progress"></div>
        </div>
    </div>`
}

function color(unit) {
    if(unit % 4 == 1) {
        return "coral";
    }
    else if(unit % 4 == 2) {
        return "khaki";
    }
    else if(unit % 4 == 3) {
        return "yellowgreen";
    }
    else {
        return "lightskyblue";
    }
}