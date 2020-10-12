export class StageSelect {
    #stepBox;
    #stepButton;
    #nextPage;
    #lastPage;

    //Display Function
    doDisplay() {
        console.log("stageSelect DoDisplay");
        const page = document.querySelector("#stepBox");
        page.style.display = 'flex';
    }//doDisplay
    doNoneDisplay() {
        console.log("stageSelect doNoneDisplay");
        const page = document.querySelector("#stepBox");
        page.style.display = 'none';
    }//doDisplay

    constructor(container) {
        this.container = container;
        console.log("StageSelect Constructor");
    }//constructor

    init() {
        // if (step > 10) {
        //     //nextPage,lastPage onClick Function
        // }
        this.#stepBox = document.createElement("div");
        this.#stepBox.setAttribute("id", "stepBox");
        this.container.appendChild(this.#stepBox);
        this.#stepButton = document.createElement("div");
        this.#stepButton.setAttribute("id", "stepButton");
        this.#stepBox.appendChild(this.#stepButton);
        this.#nextPage = document.createElement("img");
        this.#nextPage.setAttribute("id", "nextPage");
        this.#nextPage.setAttribute("src", "../image/btn-arrow-right.png");
        this.#nextPage.style.visibility="hidden";
        this.#stepBox.appendChild(this.#nextPage);
        this.#lastPage = document.createElement("img");
        this.#lastPage.setAttribute("id", "lastPage");
        this.#lastPage.setAttribute("src", "../image/btn-arrow-left.png");
        this.#lastPage.style.visibility="hidden";
        this.#stepBox.appendChild(this.#lastPage);
    }

    stepLock(step) {
        while (this.#stepButton.hasChildNodes()) {
            this.#stepButton.removeChild(this.#stepButton.firstChild);
        }
        const totalStep = 10;
        let stepNum = 0;
        for (let row = 0; row < 2; row++) {
            const stepRow = document.createElement("div");
            stepRow.setAttribute("id", "stepRow");
            this.#stepButton.appendChild(stepRow);
            for (let col = 0; col < 5; col++) {
                if (stepNum == totalStep) return;
                stepNum++;
                const underBox = document.createElement("div");
                if (step < stepNum) { //disable
                    const disableBox = document.createElement("div");
                    disableBox.setAttribute("id", "disableBox");
                    stepRow.appendChild(disableBox);
                    underBox.setAttribute("id", "disableUnderBox");
                    const upperBox = document.createElement("img");
                    upperBox.setAttribute("id", "upperBox");
                    upperBox.setAttribute("id", "upperBox");
                    upperBox.setAttribute("src", "../image/ico-rock.png");
                    disableBox.appendChild(underBox);
                    underBox.appendChild(upperBox);
                } else {
                    const num = stepNum;
                    console.log("open : " + num);
                    const ableBox = document.createElement("div");
                    ableBox.setAttribute("id", "ableBox");
                    stepRow.appendChild(ableBox);
                    underBox.setAttribute("id", "ableUnderBox");
                    underBox.addEventListener("click", function () {
                        window.canvas.sendTextQuery("level" + num);
                    });
                    const stepText = document.createElement("div");
                    stepText.setAttribute("id", "stepText");
                    stepText.textContent = num;
                    ableBox.appendChild(underBox);
                    underBox.appendChild(stepText);
                }
            }
        }
    }

}