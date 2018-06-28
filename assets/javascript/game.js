//ARRAY FOR WORD LIST
var wordList = [
    { movie: "COMMANDO", character: "JOHN MATRIX", coStar: "ALYSSA MILANO" },
    { movie: "TERMINATOR", character: "TERMINATOR", coStar: "LINDA HAMILTON" },
    { movie: "TWINS", character: "JULIUS BENEDICT", coStar: "DANNY DEVITO" },
    { movie: "CONAN THE BARBARIAN", character: "CONAN", coStar: "JAMES EARL JONES" },
    { movie: "TOTAL RECALL", character: "DOUGLAS QUAID", coStar: "SHARON STONE" },
    { movie: "PREDATOR", character: "DUTCH", coStar: "JESSE VENTURA" },
    { movie: "RUNNING MAN", character: "BEN RICHARDS", coStar: "JESSE VENTURA" },
    { movie: "KINDERGARTEN COP", character: "KIMBLE", coStar: "LINDA HUNT" },
    { movie: "TRUE LIES", character: "HARRY TASKER", coStar: "JAIME LEE CURTIS" },
    { movie: "LAST ACTION HERO", character: "JACK SLATER", coStar: "CHARLES DANCE" },
]

//STARTING VARIABLES
var wins = 0;
var losses = 0;
var wordSelection = newGame();
var guesses = [];
var guessesRight = [];
var guessesRemaining = 6;
var lastWin = false;

// hint(wordSelection);
document.onkeyup = function (event) {
    //GAME OVER IF GUESSES REMAINING ARE 0, SEND MESSAGE TO USER TO START ANOTHER GAME
    if (guessesRemaining == 0) {
        document.getElementById("wordBoard").innerHTML = "Game Over";
        document.getElementById("message").innerHTML = "Please press '2' to start another game.";


    }
    lastWin = false;


    var key = event.key;

    //CHECK FOR SPECIFIC GAME FUNCITONS (START NEW GAME OR GET A HINT)
    if (key == 1) {
        hint(wordSelection);
    }
    if (key == 2) {
        wordSelection = newGame();
    }
    key = key.toUpperCase();


    //TEST TO SEE IF A LETTER IS PRESSED
    if (key.match(/[A-Z]/) && guessesRemaining > 0) {


        //TEST TO SEE IF LETTER IS IN WORD 
        if ((wordSelection.includes(key)) && guessesRight.includes(key) == false) {
            console.log(key + " is in " + wordSelection);
            guessesRight = guessesRight + key;

            //UPDATE WORD BOARD

            

            //DON'T DO ANYTHING IF THE LETTER HAS ALREADY BEEN PREVIOUSLY GUESSED RIGHT
        } else if (guessesRight.includes(key)) {

            //TEST TO SEE IF THE LETTER IS IN INCORRECT GUESSES AND ADDS TO LETTERBOARD IF NOT PREVIOUSLY GUESSED
        } else if ((key.match(/[A-Z]/)) && (guesses.includes(key) == false)) {
            guesses = guesses + "&ensp;" + key;
            document.getElementById("letterBoard").innerHTML = guesses;
            guessesRemaining--;

            //UPADATE LETTER BOARD
            document.getElementById("guessesRemaining").innerHTML = guessesRemaining + " Guesses Remaining";
        }
    }
}

function newGame() {
    //UPDATE SCORE BOARD ON LOSS, PREVENTS USER FROM JUST STARTING A NEW GAME TO GET AROUND LOSS.
    if (lastWin == false) {
        losses++;
        document.getElementById("losses").innerHTML = "Losses: " + losses;
        //ADD LOST SOUND HERE

    }
    //ZERO OUT PREVIOUS GUESSES
    guesses = [];
    guessesRight = [];
    guessesRemaining = 6;

    //RANDOMIZE GETTING A WORD, NEEDS TO BE ARRAY.LENGTH, SETTLED FOR HARD NUMBER OF ARRAY LENGTH.
    var movieSelection = Math.floor(Math.random() * Math.floor(10));
    var categorySelection = Math.floor(Math.random() * Math.floor(3));
    var wordSelection;
    if (categorySelection == 0) {
        wordSelection = wordList[movieSelection].movie;
        document.getElementById("category").innerHTML = "Category: Movie";
    } else if (categorySelection == 1) {
        wordSelection = wordList[movieSelection].character;
        document.getElementById("category").innerHTML = "Category: Character";
    } else {
        wordSelection = wordList[movieSelection].coStar;
        document.getElementById("category").innerHTML = "Category: CoStar";
    }
    console.log(wordSelection);

    //CREATE WORD BOARD FOR WORD SELECTION
    var wordArray = [];
    for (var x in wordSelection) {
        //HANDLE SPACES
        if (wordSelection[x] == " ") {
            wordArray.push({ l: wordSelection[x], tf: true })
        } else {
            wordArray.push({ l: wordSelection[x], tf: false })
        }
    }
    console.log(wordArray);
    var wordArrayToString = "";
    for (var i = 0; i < wordArray.length; i++) {
        //HANDLE SPACES
        if (wordArray[i].l == " ") {
            wordArrayToString = wordArrayToString + "&emsp;"
        } else {
            if (wordArray[i].tf == true) {
                wordArrayToString = wordArrayToString + wordArray[i].l
            } else {
                wordArrayToString = wordArrayToString + " _ "
            }
        }
    }







    //UPDATED GAME BOARD
    document.getElementById("wordBoard").innerHTML = wordArrayToString;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining + " Guesses Remaining";
    document.getElementById("message").innerHTML = "Please make your first guess";
    document.getElementById("hints").innerHTML = "If you would like some hints, please press '1'";

    //RETURN WORDSELECTION TO BE USED IN OTHER PARTS OF THE GAME
    return wordSelection;
}

//FUNCTION TO PROVIDE A HINT TO THE USER BASED ON LOCATION WITHIN THE WORD ARRAY
function hint(wordSelection) {
    for (x in wordList) {

        var findWord = wordList[x].movie
        if (wordSelection == findWord) {
            document.getElementById("hints").innerHTML = "Character: " + wordList[x].character + "&emsp; Costar: " + wordList[x].coStar
        }
        var findWord = wordList[x].character
        if (wordSelection == findWord) {
            document.getElementById("hints").innerHTML = "Movie: " + wordList[x].movie + "&emsp; Costar: " + wordList[x].coStar
        }
        var findWord = wordList[x].coStar
        if (wordSelection == findWord) {
            document.getElementById("hints").innerHTML = "Movie: " + wordList[x].movie + "&emsp; Character: " + wordList[x].character
        }

    }
}
