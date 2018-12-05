function countSyllables() {
    $(document).ready(
        function() {
            $("#syllables").text(syllableCount($("#word").val()))
        }
    )
}

function getBySyl(goal, text) {
    startingPoint = Math.floor(Math.random() * text.split(" ").length/3)
    textChunk = text.split(" ").slice(startingPoint)
    newText = ""
    progress = 0
    for (let word of textChunk) {
        if (progress + syllableCount(word) <= goal) {
            newText += " " + word
            progress += syllableCount(word)
        }
    }

    return newText

}

function getQuotes() {
    $(document).ready(
        function() {
            $.ajax({
                url : "https://en.wikiquote.org/w/api.php",
                data : {
                    "action" : "parse",
                    "format" : "json",
                    "page" : $("#author").val(),
                    "prop" : "text",
                    "section" : 1,
                },

                dataType : "jsonp",
                success : function(data) {
                    var pageText = data.parse.text["*"]
                    var html = $.parseHTML(pageText)
                    var quotes = $(html).find("ul > li").not("ul > li > ul > li")
                    showHaiku(quotes)
                }
            })
        }
    )
}

function makeHaiku(quotes) {
    data = {}
    lines = []
    fullQuotes = []
    citations = []
    for (i = 0; i < 3; i++) {
        randQuote = $(randElement(quotes)).text().split("\n")
        quoteText = randQuote[0];
        quoteSrc = randQuote[1]

        if (i == 0 || i == 2) {
            syllables = 5
        }

        if (i == 1) {
            syllables = 7
        }

        line = getBySyl(syllables, quoteText)
        if (quoteSrc == undefined) {
            quoteSrc = "unknown"
        }

        data[`${i}`] = {
            "line" : line.toLowerCase(), 
            "quoteText" : quoteText, 
            "quoteSrc" : quoteSrc
        }

    }

    return data
}

function randElement (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function showHaiku(quotes) {
    data = makeHaiku(quotes)
    $("#haiku").text("")
    $("#source-container").text("")
    for (i = 0; i < 3; i++) {
        $("#haiku").append(`<p>${data[i].line}</p>`)
        $("#source-container").append(`<p>${data[i].quoteText} <br><p id="citation">– ${data[i].quoteSrc}</p></p>`)
    }
}

function syllableCount(word) {
    word = word.toLowerCase();
    if(word.length <= 3) { 
        return 1; 
    }

    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    if (word.match(/[aeiouy]{1,2}/g) == null) {
        return 1
    }
    return word.match(/[aeiouy]{1,2}/g).length;
}