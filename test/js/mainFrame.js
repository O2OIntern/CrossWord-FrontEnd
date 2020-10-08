export class MainFrame {

    /**
     * 중앙에 이어하기, 단계 선택 버튼
     * @type {HTMLDivElement}
     */
    #_continue_stageButton;
    #_continueButton;
    #_continueText;
    #_stageButton;
    #_stageText;

    constructor(container) {
        this.container = container;
        console.log("MainFrame Constructor");
    }//constructor

    doDisplay() {
        console.log("MainFrame DoDisplay");
        const page = document.querySelector("#continue_stageButton");
        page.style.display = 'flex';
    }

    doNoneDisplay() {
        console.log("MainFrame DoNoneDisplay");
        const page = document.querySelector("#continue_stageButton");
        page.style.display = 'none';

    }

    init() {
        /**
         * 중앙에 이어하기, 단계 선택 버튼
         * @type {HTMLDivElement}
         */

        this.#_continue_stageButton = document.createElement("div")
        this.#_continue_stageButton.setAttribute("id", "continue_stageButton")
        this.container.appendChild(this.#_continue_stageButton);

        this.#_continueButton = document.createElement("div");
        this.#_continueButton.setAttribute("id", "continueButton");
        //this.#_continueButton.onclick = continuebutton;
        this.#_continueText = document.createElement("p");
        this.#_continueText.textContent = "CONTINUE";
        this.#_continueButton.appendChild(this.#_continueText);
        this.#_continue_stageButton.appendChild(this.#_continueButton);

        this.#_stageButton = document.createElement("div");
        this.#_stageButton.setAttribute("id", "stageButton");
        //this.#_stageButton.onclick = viewallButton;
        this.#_stageText = document.createElement("p");
        this.#_stageText.textContent = "SELECT STAGE";
        this.#_stageButton.appendChild(this.#_stageText);
        this.#_continue_stageButton.appendChild(this.#_stageButton);
    }

    get continue_stageButton() {
        return this.#_continue_stageButton;
    }

    get continueButton() {
        return this.#_continueButton;
    }

    get continueText() {
        return this.#_continueText;
    }

    get stageButton() {
        return this.#_stageButton;
    }

    get stageText() {
        return this.#_stageText;
    }
}//class MainFrame
