export class DifficultySelect {

    #_difficultyBox;
    #_boxItem = [];
    #_timeText = [];
    #_feeText = [];
    #_difficulty = ["easy", "medium", "hard"];

    doDisplay() {
        console.log("difficulty DoDisplay");
        const page = document.querySelector("#difficultyBox");
        page.style.display = 'grid';
    }//doDisplay
    doNoneDisplay() {
        console.log("difficulty doNoneDisplay");
        const page = document.querySelector("#difficultyBox");
        page.style.display = 'none';
    }//doDisplay

    constructor(container) {
        this.container = container;
        console.log("DifficultySelect Constructor");
    }//constructor


    init() {
        /**
         * 몇 단계를 선택했는지 표시 -> fulfillment에서 가져와야 함
         */
        /**
         * 난이도별 경험치 표시해야 함
         * @type {HTMLDivElement}
         */
        this.#_difficultyBox = document.createElement("div");
        this.#_difficultyBox.setAttribute("id", "difficultyBox");
        this.container.appendChild(this.#_difficultyBox);

        for (let i = 0; i < 3; i++) {
            const boxItem = document.createElement("div");
            boxItem.setAttribute("id", "boxItem");
            this.#_boxItem.push(boxItem)
            this.#_difficultyBox.appendChild(boxItem);
            const button = document.createElement("div");
            button.setAttribute("class", "difficultyButton circle boxShadow alignCenter flexColumn flex button" + (i + 1).toString());
            boxItem.appendChild(button);
            const difficultyIcon = document.createElement("img");
            difficultyIcon.setAttribute("class", "difficultyIcon");
            difficultyIcon.setAttribute("src", "../image/ico-" + this.#_difficulty[i] + ".png");
            button.appendChild(difficultyIcon);
            const difficultyText = document.createElement("div");
            difficultyText.setAttribute("class", "difficultyText font");
            difficultyText.textContent=this.#_difficulty[i].toUpperCase();
            button.appendChild(difficultyText);
            const expTextBox = document.createElement("div");
            expTextBox.setAttribute("id", "expTextBox");
            boxItem.appendChild(expTextBox);
            const expText1 = document.createElement("div");
            expText1.setAttribute("class", "expText font textShadow");
            expText1.textContent = "EXP";
            expTextBox.appendChild(expText1);
            const expText2 = document.createElement("div");
            expText2.setAttribute("class", "expText extraBoldText textShadow font expText2_" + (i + 1).toString());
            expText2.textContent = "X" + (i + 1);
            expTextBox.appendChild(expText2);
            const timeBox = document.createElement("div");
            timeBox.setAttribute("class", "flex alignCenter difficultyMargin relative");
            boxItem.appendChild(timeBox);
            const timeIcon = document.createElement("img");
            timeIcon.setAttribute("class", "difficultyTimeFeeIcon");
            timeIcon.setAttribute("src", "../image/ico-time.png");
            timeBox.appendChild(timeIcon);
            const timeText1 = document.createElement("div");
            timeText1.setAttribute("class", "difficultySmallText font");
            timeText1.textContent = "Time Limit";
            timeBox.appendChild(timeText1);
            const timeText2 = document.createElement("div");
            timeText2.setAttribute("class", "numberText difficultySmallText font blackText extraBoldText");
            timeText2.textContent = "0s";
            this.#_timeText.push(timeText2);
            timeBox.appendChild(timeText2);
            const feeBox = document.createElement("div");
            feeBox.setAttribute("class", "flex alignCenter relative");
            boxItem.appendChild(feeBox);
            const feeIcon = document.createElement("img");
            feeIcon.setAttribute("class", "difficultyTimeFeeIcon");
            feeIcon.setAttribute("src", "../image/ico-entryfee.png");
            feeBox.appendChild(feeIcon);
            const feeText1 = document.createElement("div");
            feeText1.setAttribute("class", "difficultySmallText font");
            feeText1.textContent = "Entry Fee";
            feeBox.appendChild(feeText1);
            const feeText2 = document.createElement("div");
            feeText2.setAttribute("class", "numberText difficultySmallText font blackText extraBoldText");
            feeText2.textContent = "0c";
            this.#_feeText.push(feeText2);
            feeBox.appendChild(feeText2);
        }
    }

    //GETTER

    get difficultyBox() {
        return this.#_difficultyBox;
    }

    get boxItem() {
        return this.#_boxItem;
    }

    get timeText() {
        return this.#_timeText;
    }

    get feeText() {
        return this.#_feeText;
    }

    get difficulty() {
        return this.#_difficulty;
    }
}