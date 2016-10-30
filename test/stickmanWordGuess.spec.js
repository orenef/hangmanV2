import StickmanWordLogic from '../src/controller/stickmanWordLogic';

describe("Stickman WordLogic", function () {

    describe("constructor method", function () {

        it("should create a stickmanWordGame element", () => {
            let stickmanWordLogic = new StickmanWordLogic();
            expect(stickmanWordLogic.guessingWord).toBeDefined();
            expect(stickmanWordLogic.wordGameElmenet).toBeDefined();
            expect(stickmanWordLogic.fullListOfWords).toBeDefined();
            expect(stickmanWordLogic.fullListOfWords.length).toBeGreaterThan(0);
        });
    });


    describe("addWordToGuess method", function () {
        let stickmanWordLogic;
        stickmanWordLogic = new StickmanWordLogic();

        it("Should add new word to list", () => {
            stickmanWordLogic.addWordToGuess("thisIsGood");
            let newListOfWords = stickmanWordLogic.fullListOfWords;
            expect(newListOfWords.indexOf("thisIsGood") != -1).toBe(true);
            expect(newListOfWords.indexOf("thisIsWrong") != -1).not.toBe(true);
        });

        it("Should not add invalid word - word not in typeof string", () => {
            let addWordStatus = stickmanWordLogic.addWordToGuess(null);
            expect(addWordStatus).toBe(false);
        });

        it("Should not add invalid word - word not in english", () => {
            let addWordStatus = stickmanWordLogic.addWordToGuess("אא");
            expect(addWordStatus).toBe(false);
            let newListOfWords = stickmanWordLogic.fullListOfWords;
            expect(newListOfWords.indexOf("אא") == -1).toBe(true);
        });
    });

    describe("isLetterExistsInWord method", function () {

        let stickmanWordLogic;
        stickmanWordLogic = new StickmanWordLogic();
        stickmanWordLogic.guessingWord = "bamba";

        it("for letter that is not appear, Should return empty array", () => {
            expect(stickmanWordLogic.isLetterExistsInWord("t").length).toBe(0);
            expect(stickmanWordLogic.isLetterExistsInWord("t")).toEqual([]);
        });
        it("for letter that appear once, Should return one index of the letter", () => {
            expect(stickmanWordLogic.isLetterExistsInWord("m").length).toBe(1);
            expect(stickmanWordLogic.isLetterExistsInWord("m")).toEqual([2]);
        });
        it("for letter that appear twice, Should return two indexes of the letter", () => {
            expect(stickmanWordLogic.isLetterExistsInWord("b").length).toBe(2);
            expect(stickmanWordLogic.isLetterExistsInWord("b")).toEqual([0, 3]);
            expect(stickmanWordLogic.isLetterExistsInWord("a")).toEqual([1, 4]);
        });
    });

    describe("createElementForWordWithEmptyLetters method", function () {

        let stickmanWordLogic;
        stickmanWordLogic = new StickmanWordLogic();
        stickmanWordLogic.guessingWord = "bamba";
        let wordElement = stickmanWordLogic.createElementForWordWithEmptyLetters();

        it("Should return wordGameElement - div object with span childes, span for each letter in the word to guess", () => {
            expect(wordElement.nodeName == 'DIV').toBe(true);
            expect(wordElement.childElementCount).toBe(5);

            let letterElementList = wordElement.childNodes;
            for (let i = 0; i < letterElementList.length; i++) {
                expect(letterElementList[i].nodeName == 'SPAN').toBe(true);
                expect(letterElementList[i].innerHTML == '&nbsp;&nbsp;').toBe(true);
            }
        });

    });

    describe("replaceEmptyLetterWithRealOne method", function () {

        let stickmanWordLogic;
        stickmanWordLogic = new StickmanWordLogic();
        stickmanWordLogic.guessingWord = "bamba";
        let wordElement = stickmanWordLogic.createElementForWordWithEmptyLetters();

        it("Should return wordGameElement after switch letter dummy with the real one", () => {
            stickmanWordLogic.replaceEmptyLetterWithRealOne("m");
            let letterElementList = wordElement.childNodes;
            expect(letterElementList[2].nodeName == 'SPAN').toBe(true);
            expect(letterElementList[2].innerHTML == 'm').toBe(true);
        });
        it("Should return wordGameElement after switch all letter dummy with the real one", () => {
            stickmanWordLogic.replaceEmptyLetterWithRealOne("b");
            let letterElementList = wordElement.childNodes;
            expect(letterElementList[0].innerHTML == 'b').toBe(true);
            expect(letterElementList[3].innerHTML == 'b').toBe(true);

        });

    });
});


