export class Result {

    #_resultWordBox
    #_resultBox;
    #_resultLevelText;
    #_resultText;
    #_resultIcon;
    #_resultCoinText2;
    #_resultExpText2;
    #_wordBoxItem = [];
    #_gainCoinText1;
    #_gainCoinText2;

    #_gainExpText1;
    #_gainExpText2;


    #_gainCoin;
    #_gainExp;

    //Display Function
    doDisplay() {
        console.log("Result DoDisplay");
        const page = document.querySelector("#resultBox");
        page.style.display = 'flex';
    }//doDisplay
    doNoneDisplay() {
        console.log("Result doNoneDisplay");
        const page = document.querySelector("#resultBox");
        page.style.display = 'none';
    }//doDisplay


    //UI Function
    intervalCoin(a){
        console.log("log: "+a);
        document.querySelector("#gainCoinText1").childNodes[0].textContent = "+" + a;
    }
    intervalExp(a){
        console.log("log: "+a);
        document.querySelector("#gainExpText1").childNodes[0].textContent = "+" + a;
    }


    constructor(container) {
        this.container = container;
        this.#_gainCoin = 0;
        this.#_gainExp = 0;
        console.log("Result Constructor");
    }//constructor

    init() {
        this.#_resultBox = document.createElement("div");
        this.#_resultBox.setAttribute("id", "resultBox");
        this.container.appendChild(this.#_resultBox);
        //resultNotifyBox
        const resultNotifyBox = document.createElement("div");
        resultNotifyBox.setAttribute("id", "resultNotifyBox");
        this.#_resultBox.appendChild(resultNotifyBox);
        this.#_resultIcon = document.createElement("img");
        this.#_resultIcon.setAttribute("id", "resultIcon");
        this.#_resultIcon.setAttribute("src", "../image/ico-sucess.png");
        resultNotifyBox.appendChild(this.#_resultIcon);
        this.#_resultText = document.createElement("div");
        this.#_resultText.setAttribute("id", "resultText");
        this.#_resultText.textContent = "SUCCESS";
        resultNotifyBox.appendChild(this.#_resultText);
        //resultLevelBox
        const resultLevelBox = document.createElement("div");
        resultLevelBox.setAttribute("id", "resultLevelBox");
        this.#_resultBox.appendChild(resultLevelBox);
        this.#_resultLevelText = document.createElement("div");
        this.#_resultLevelText.setAttribute("id", "resultLevelText");
        this.#_resultLevelText.textContent = "Level " + "3";
        resultLevelBox.appendChild(this.#_resultLevelText);
        //resultCoinBox
        const resultCoinBox = document.createElement("div");
        resultCoinBox.setAttribute("id", "resultCoinBox");
        this.#_resultBox.appendChild(resultCoinBox);
        const resultCoinText1 = document.createElement("div");
        resultCoinText1.setAttribute("id", "resultCoinText1");
        resultCoinText1.textContent = "COIN";
        resultCoinBox.appendChild(resultCoinText1);
        this.#_resultCoinText2 = document.createElement("div");
        this.#_resultCoinText2.setAttribute("id", "resultCoinText2");
        this.#_resultCoinText2.textContent = "5400";
        resultCoinBox.appendChild(this.#_resultCoinText2);
        this.#_gainCoinText1 = document.createElement("div");
        this.#_gainCoinText1.setAttribute("id", "gainCoinText1");
        this.#_gainCoinText1.textContent = "+" + this.#_gainCoin;
        resultCoinBox.appendChild(this.#_gainCoinText1);
        // const gainCoinBox = document.createElement("div");
        // gainCoinBox.setAttribute("id","gainCoinBox");
        // this.#_gainCoinText1.appendChild(gainCoinBox);
        this.#_gainCoinText2 = document.createElement("div");
        this.#_gainCoinText2.setAttribute("id", "gainCoinText2");
        this.#_gainCoinText2.textContent = "" + this.#_gainCoin;
        this.#_gainCoinText1.appendChild(this.#_gainCoinText2);

        //resultExpBox
        const resultExpBox = document.createElement("div");
        resultExpBox.setAttribute("id", "resultExpBox");
        this.#_resultBox.appendChild(resultExpBox);
        const resultExpText1 = document.createElement("div");
        resultExpText1.setAttribute("id", "resultExpText1");
        resultExpText1.textContent = "EXP";
        resultExpBox.appendChild(resultExpText1);
        this.#_resultExpText2 = document.createElement("div");
        this.#_resultExpText2.setAttribute("id", "resultExpText2");
        this.#_resultExpText2.textContent = "1230";
        resultExpBox.appendChild(this.#_resultExpText2);
        this.#_gainExpText1 = document.createElement("div");
        this.#_gainExpText1.setAttribute("id", "gainExpText1");
        this.#_gainExpText1.textContent = "+" + this.#_gainExp;
        resultExpBox.appendChild(this.#_gainExpText1);
        this.#_gainExpText2 = document.createElement("div");
        this.#_gainExpText2.setAttribute("id", "gainExpText2");
        this.#_gainExpText2.textContent = "" + this.#_gainExp;
        this.#_gainExpText1.appendChild(this.#_gainExpText2);
        //resultWordBox
        this.#_resultWordBox = document.createElement("div");
        this.#_resultWordBox.setAttribute("id", "resultWordBox");
        this.#_resultBox.appendChild(this.#_resultWordBox);
        // for (let i = 0; i < 10; i++) {
        //     const resultWordItem = document.createElement("div");
        //     resultWordItem.setAttribute("id", "resultWordItem");
        //     resultWordBox.appendChild(resultWordItem);
        //     resultWordItem.textContent = "blank";
        //     this.#_wordBoxItem.push(resultWordItem);
        // }
        //resultContinueBox
        const resultContinueBox = document.createElement("div");
        resultContinueBox.setAttribute("id", "resultContinueBox");
        this.#_resultBox.appendChild(resultContinueBox);
        const resultContinueText = document.createElement("div");
        resultContinueText.setAttribute("id", "resultContinueText");
        resultContinueText.textContent = "CONTINUE";
        resultContinueBox.appendChild(resultContinueText);
        const resultContinueIcon = document.createElement("img");
        resultContinueIcon.setAttribute("id", "resultContinueIcon");
        resultContinueIcon.setAttribute("src", "../image/ico-play.png");
        resultContinueBox.appendChild(resultContinueIcon);


    }
    test(){
        console.log("이게왜;");
    }
    //GETTER METHOD

    get resultBox() {
        return this.#_resultBox;
    }

    get resultLevelText() {
        return this.#_resultLevelText;
    }

    get resultText() {
        return this.#_resultText;
    }

    get resultCoinText2() {
        return this.#_resultCoinText2;
    }

    get resultExpText2() {
        return this.#_resultExpText2;
    }

    get resultWordBox() {
        return this.#_resultWordBox;
    }


    get wordBoxItem() {
        return this.#_wordBoxItem;
    }

    get resultIcon() {
        return this.#_resultIcon;
    }

    get gainCoinText1() {
        return this.#_gainCoinText1;
    }

    get gainCoinText2() {
        return this.#_gainCoinText2;
    }

    get gainExpText1() {
        return this.#_gainExpText1;
    }

    get gainExpText2() {
        return this.#_gainExpText2;
    }

    get gainExp() {
        return this.#_gainExp;
    }


    intervalFunc(gainCoin,gainExp) {
        let intervalGainCoin = null;
        let intervalGainExp = null;
        let Coin =0;
        let Exp =0;
        let rst = new Result();

        intervalGainCoin=setInterval(() => {
            rst.intervalCoin(Coin++);
            if (Coin === gainCoin) {
                // 현재 진행되고 있는 inter 란 이름을 가진 setInterval 메소드를 제거합니다.
                clearInterval(intervalGainCoin);
            }
        }, 10);
        intervalGainExp=setInterval(() => {
            rst.intervalExp(Exp++);
            if (Exp === gainExp) {
                // 현재 진행되고 있는 inter 란 이름을 가진 setInterval 메소드를 제거합니다.
                clearInterval(intervalGainExp);
            }
        }, 10);
        let intervalCoinZoom = null;
        let scale = 1.0;
        intervalCoinZoom=setInterval(() => {
            scale += 0.004;
            console.log("gain"+self.gainCoinText2.textContent);
            self.gainCoinText2.textContent = "+" + (Coin - 1);
            self.gainCoinText2.style.zoom = scale;
            self.gainExpText2.textContent = "+" + (Exp - 1);
            self.gainExpText2.style.zoom = scale;
            if (scale >= 2.12) {
                // 현재 진행되고 있는 inter 란 이름을 가진 setInterval 메소드를 제거합니다.
                clearInterval(intervalCoinZoom);
            }
        }, 1);
    }


}