export class Ranking{
    #_rankingBox
    #_topBox
    #_bottomBox
    #_leftBox
    #_rightBox
    #_rankingIcon
    #_rankingBoardText
    #_top5Mail
    #_top5Exp
    #_rankNum
    #_rankMail
    #_rankExp

    get top5Mail() {
        return this.#_top5Mail;
    }

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
        this.#_leftBox.setAttribute("id", "rankLeftBox");
        this.#_bottomBox.appendChild(this.#_leftBox);

        this.#_rightBox = document.createElement("div");
        this.#_bottomBox.appendChild(this.#_rightBox);

        this.#_rankingIcon = document.createElement("img");
        this.#_rankingIcon.setAttribute("src", "../image/ranking/ranking_icon.png");
        this.#_rankingIcon.setAttribute("id", "rankingIcon");
        this.#_topBox.appendChild(this.#_rankingIcon);

        this.#_rankingBoardText = document.createElement("div");
        this.#_rankingBoardText.textContent = "RANKING BOARD";
        this.#_rankingBoardText.setAttribute("class", "rankYellowText font extraBoldText small");
        this.#_topBox.appendChild(this.#_rankingBoardText);

        for(let i = 0; i < 5; i++) {
            const top5Box = document.createElement("div");
            top5Box.setAttribute("class", "flex alignCenter");
            this.leftBox.appendChild(top5Box);

            const rankingCircle = document.createElement("div");
            if(i == 0) rankingCircle.setAttribute("class", "rankYellow circle boxShadow rankCircle center");
            else rankingCircle.setAttribute("class", "rankBlue circle boxShadow rankCircle center");
            top5Box.appendChild(rankingCircle);

            const top5Num = document.createElement("div");
            top5Num.textContent = (i + 1).toString();
            top5Num.setAttribute("class", "top5Num font extraBoldText");
            rankingCircle.appendChild(top5Num);

            const top5InfoBox = document.createElement("div");
            top5InfoBox.setAttribute("id", "top5InfoBox");
            top5Box.appendChild(top5InfoBox);

            this.#_top5Mail = document.createElement("div");
            this.#_top5Mail.setAttribute("class", "rankBlueText font small");
            this.#_top5Mail.textContent = "o2o@o2o.kr" + (i + 1).toString();
            top5InfoBox.appendChild(this.#_top5Mail);

            this.#_top5Exp = document.createElement("div");
            this.#_top5Exp.setAttribute("class", "rankYellowText font small extraBoldText");
            this.#_top5Exp.textContent = "Exp" + (i + 1).toString();
            top5InfoBox.appendChild(this.#_top5Exp);
        }

        for(let i = 0; i < 8; i ++) {
            const rank8Box = document.createElement("div");
            this.rightBox.appendChild(rank8Box);

            const rankInfoCircle = document.createElement("div");
            rank8Box.appendChild(rankInfoCircle);

            this.#_rankNum = document.createElement("span");
            this.#_rankNum.textContent = (i+100).toString();
            this.#_rankNum.setAttribute("class", "font extraBoldText small rank8NumPadding");
            rankInfoCircle.appendChild(this.#_rankNum);

            this.#_rankMail = document.createElement("span");
            this.#_rankMail.textContent = "o2o@o2o.kr" + (i+100).toString();
            rankInfoCircle.appendChild(this.#_rankMail);

            this.#_rankExp = document.createElement("span");
            this.#_rankExp.textContent = "Exp " + (i+100).toString();
            this.#_rankExp.setAttribute("class", "font extraBoldText small rankYellowText rank8Exp");
            rankInfoCircle.appendChild(this.#_rankExp);


            if(i == 3) {
                rankInfoCircle.setAttribute("class", "rankRound boxShadow rankBlue flex alignCenter");
                this.#_rankMail.setAttribute("class", "rankYellowText font extraBoldText small rank8Mail")
            }
            else {
                rankInfoCircle.setAttribute("class", "rankRound rankBlueOpacity flex alignCenter");
                this.#_rankMail.setAttribute("class", "rankBlueText font small rank8Mail")
            }

        }


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