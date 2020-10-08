export class MainFrame {

    /**
     * 중앙에 이어하기, 단계 선택 버튼
     * @type {HTMLDivElement}
     */
    #_playBox
    #_gameContinueText
    #_gameText
    #_continueText
    #_gameContinueBox
    #_gameContinueCircle
    #_gameContinueIcon
    #_chooseText
    #_levelText
    #_chooseLevelText
    #_chooseLevelCircle
    #_chooseLevelBox
    #_chooseLevelIcon
    #_gameContinueButton
    #_chooseLevelButton

    constructor(container) {
        this.container = container;
        console.log("MainFrame Constructor");
    }//constructor

    doDisplay() {
        console.log("MainFrame DoDisplay");
        const page = document.querySelector("#playBox");
        page.style.display = 'flex';
    }

    doNoneDisplay() {
        console.log("MainFrame DoNoneDisplay");
        const page = document.querySelector("#playBox");
        page.style.display = 'none';
    }

    init() {
        /**
         * 중앙에 이어하기, 단계 선택 버튼
         * @type {HTMLDivElement}
         */

        this.#_playBox = document.createElement("div");
        this.#_playBox.setAttribute("id", "playBox");
        // this.#_playBox.setAttribute("class", "pages");
        this.container.appendChild(this.#_playBox);


        this.#_gameContinueBox = document.createElement("div");
        this.#_gameContinueBox.setAttribute("class", "mainTwoBox");
        this.#_playBox.appendChild(this.#_gameContinueBox);

        this.#_gameContinueText = document.createElement("div");
        this.#_gameContinueText.setAttribute("class", "font textShadow mainText");
        this.#_gameContinueBox.appendChild(this.#_gameContinueText);

        this.#_gameText = document.createElement("span");
        this.#_gameText.textContent = "GAME";
        this.#_gameContinueText.appendChild(this.#_gameText);

        this.#_continueText = document.createElement("span");
        this.#_continueText.setAttribute("class", "extraBoldText");
        this.#_continueText.textContent = "CONTINUE";
        this.#_gameContinueText.appendChild(this.#_continueText);

        this.#_gameContinueButton = document.createElement("div");
        this.#_gameContinueBox.appendChild(this.#_gameContinueButton);

        this.#_gameContinueCircle = document.createElement("div");
        this.#_gameContinueCircle.setAttribute("id", "gameContinueCircle");
        this.#_gameContinueCircle.setAttribute("class", "mainCircle");
        this.#_gameContinueButton.appendChild(this.#_gameContinueCircle);

        this.#_gameContinueIcon = document.createElement("img");
        this.#_gameContinueIcon.setAttribute("id", "gameContinueIcon");
        this.#_gameContinueIcon.setAttribute("class", "mainIcon");
        this.#_gameContinueIcon.setAttribute("src", "../image/mainFrame/continue_icon.png");
        this.#_gameContinueCircle.appendChild(this.#_gameContinueIcon);


        this.#_chooseLevelBox = document.createElement("div");
        this.#_chooseLevelBox.setAttribute("class", "mainTwoBox");
        this.#_playBox.appendChild(this.#_chooseLevelBox);

        this.#_chooseLevelText = document.createElement("div");
        this.#_chooseLevelText.setAttribute("class", "font textShadow mainText");
        this.#_chooseLevelBox.appendChild(this.#_chooseLevelText);

        this.#_chooseText = document.createElement("span");
        this.#_chooseText.textContent = "CHOOSE";
        this.#_chooseLevelText.appendChild(this.#_chooseText);

        this.#_levelText = document.createElement("span");
        this.#_levelText.setAttribute("class", "extraBoldText");
        this.#_levelText.textContent = "LEVEL";
        this.#_chooseLevelText.appendChild(this.#_levelText);

        this.#_chooseLevelButton = document.createElement("div");
        this.#_chooseLevelBox.appendChild(this.#_chooseLevelButton);

        this.#_chooseLevelCircle = document.createElement("div");
        this.#_chooseLevelCircle.setAttribute("id", "chooseLevelCircle");
        this.#_chooseLevelCircle.setAttribute("class", "mainCircle");
        this.#_chooseLevelButton.appendChild(this.#_chooseLevelCircle);

        this.#_chooseLevelIcon = document.createElement("img");
        this.#_chooseLevelIcon.setAttribute("id", "chooseLevelIcon");
        this.#_chooseLevelIcon.setAttribute("class", "mainIcon");
        this.#_chooseLevelIcon.setAttribute("src", "../image/mainFrame/chooseLv_icon.png");
        this.#_chooseLevelCircle.appendChild(this.#_chooseLevelIcon);
    }

    get gameContinueBox() {
        return this.#_gameContinueBox;
    }

    get gameContinueIcon() {
        return this.#_gameContinueIcon;
    }

    get chooseLevelBox() {
        return this.#_chooseLevelBox;
    }

    get chooseLevelIcon() {
        return this.#_chooseLevelIcon;
    }

    get playBox() {
        return this.#_playBox;
    }

    get gameContinueText() {
        return this.#_gameContinueText;
    }

    get gameText() {
        return this.#_gameText;
    }

    get continueText() {
        return this.#_continueText;
    }

    get gameContinueCircle() {
        return this.#_gameContinueCircle;
    }

    get chooseText() {
        return this.#_chooseText;
    }

    get levelText() {
        return this.#_levelText;
    }

    get chooseLevelText() {
        return this.#_chooseLevelText;
    }

    get chooseLevelCircle() {
        return this.#_chooseLevelCircle;
    }

    get gameContinueButton() {
        return this.#_gameContinueButton;
    }

    get chooseLevelButton() {
        return this.#_chooseLevelButton;
    }
}//class MainFrame
