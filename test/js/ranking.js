export class Ranking{
    #_rankingBox
    #_topBox
    #_bottomBox
    #_leftBox
    #_rightBox
    #_rankingIcon
    #_rankingBoardText

    constructor(container) {
        this.container = container;
        console.log("Setting Constructor");
    }

    doDisplay() {
        console.log("Ranking DoDisplay");
        const page = document.querySelector("#rankingBox");
        if(page.style.display == 'none')
            page.style.display = 'block';
    }

    doNoneDisplay() {
        console.log("Ranking DoNoneDisplay");
        const page = document.querySelector("#rankingBox");
        page.style.display = 'none';
    }

    init() {

        this.#_rankingBox = document.createElement("div");
        this.#_rankingBox.setAttribute("id", "rankingBox");
        this.container.appendChild(this.#_rankingBox);

        this.#_topBox = document.createElement("div");
        this.#_topBox.setAttribute("class", "center flexColumn topBox");
        this.#_rankingBox.appendChild(this.#_topBox);

        this.#_bottomBox = document.createElement("div");
        this.#_bottomBox.setAttribute("class", "flex");
        this.#_rankingBox.appendChild(this.#_bottomBox);

        this.#_leftBox = document.createElement("div");
        this.#_bottomBox.appendChild(this.#_leftBox);

        this.#_rightBox = document.createElement("div");
        this.#_rightBox.setAttribute("id", "rankRightBox");
        this.#_bottomBox.appendChild(this.#_rightBox);

        this.#_rankingIcon = document.createElement("img");
        this.#_rankingIcon.setAttribute("src", "../image/ranking/ranking_icon.png");
        this.#_rankingIcon.setAttribute("id", "rankingIcon");
        this.#_topBox.appendChild(this.#_rankingIcon);

        this.#_rankingBoardText = document.createElement("div");
        this.#_rankingBoardText.textContent = "RANKING BOARD";
        this.#_rankingBoardText.setAttribute("class", "rankYellowText font extraBoldText small");
        this.#_topBox.appendChild(this.#_rankingBoardText);
    }

    get rankingBox() {
        return this.#_rankingBox;
    }

    get topBox() {
        return this.#_topBox;
    }

    get leftBox() {
        return this.#_leftBox;
    }

    get rightBox() {
        return this.#_rightBox;
    }

    get rankingIcon() {
        return this.#_rankingIcon;
    }

    get rankingBoardText() {
        return this.#_rankingBoardText;
    }
}