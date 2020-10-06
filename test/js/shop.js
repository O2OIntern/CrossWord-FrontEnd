export class Shop{
    #_shopBox;
    #_hintBox;
    #_hintIcon;
    #_hintText;
    #_hintX3Text;
    #_miniCoinIcon1;
    #_buyHintText;
    #_coin300cText;
    #_coinBox;
    #_coinIcon;
    #_coinText;
    #_coin500Text;
    #_miniCoinIcon2;
    #_watchAdsText;
    #_freeText;
    #_hintCircle
    #_hintButton
    #_hintTextBox
    #_buyHintBox
    #_coinButton
    #_coinCircle
    #_coinTextBox
    #_watchAdsBox
    #_watchAdsTextBox
    #_buyHintTextBox


    constructor(container) {
        this.container = container;
        console.log("Shop Constructor");
    }

    doDisplay() {
        console.log("Shop DoDisplay");
        const page = document.querySelector("#shopBox");
        page.style.display = 'flex';
    }

    doNoneDisplay() {
        console.log("Shop DoNoneDisplay");
        const page = document.querySelector("#shopBox");
        page.style.display = 'none';
    }

    init() {
        this.#_shopBox = document.createElement("div");
        this.#_shopBox.setAttribute("id", "shopBox");
        // this.#_shopBox.setAttribute("class", "pages");
        this.container.appendChild(this.#_shopBox);

        this.#_hintBox = document.createElement("div");
        this.#_hintBox.setAttribute("class", "shopTwoBox");
        this.#_shopBox.appendChild(this.#_hintBox);

        this.#_hintButton = document.createElement("div");
        this.#_hintBox.appendChild(this.#_hintButton);

        this.#_hintCircle = document.createElement("div");
        this.#_hintCircle.setAttribute("class", "circle shopCircle green");
        this.#_hintButton.appendChild(this.#_hintCircle);

        this.#_hintIcon = document.createElement("img");
        this.#_hintIcon.setAttribute("class", "shopIcon");
        this.#_hintIcon.setAttribute("src", "../image/shop/hint_icon.png");
        this.#_hintCircle.appendChild(this.#_hintIcon);

        this.#_hintTextBox = document.createElement("div");
        this.#_hintTextBox.setAttribute("class", "shopTextBox");
        this.#_hintBox.appendChild(this.#_hintTextBox);

        this.#_hintText = document.createElement("span");
        this.#_hintText.setAttribute("class", "font textShadow shopText")
        this.#_hintText.textContent = "HINT";
        this.#_hintTextBox.appendChild(this.#_hintText);

        this.#_hintX3Text = document.createElement("span");
        this.#_hintX3Text.setAttribute("class", "font textShadow extraBoldText greenText shopText");
        this.#_hintX3Text.textContent = "X3";
        this.#_hintTextBox.appendChild(this.#_hintX3Text);

        this.#_buyHintBox = document.createElement("div");
        this.#_buyHintBox.setAttribute("class", "lowerTextBox");
        this.#_hintBox.appendChild(this.#_buyHintBox);

        this.#_miniCoinIcon1 = document.createElement("img");
        this.#_miniCoinIcon1.setAttribute("class", "miniCoinIcon");
        this.#_miniCoinIcon1.setAttribute("src", "../image/shop/coin_icon.png");
        this.#_buyHintBox.appendChild(this.#_miniCoinIcon1);

        this.#_buyHintTextBox = document.createElement("div");
        this.#_buyHintTextBox.setAttribute("class", "shopSmallText small font textShadow");
        this.#_buyHintBox.appendChild(this.#_buyHintTextBox);

        this.#_buyHintText = document.createElement("span");
        this.#_buyHintText.setAttribute("class", "font textSpace");
        this.#_buyHintText.textContent = "BUY HINT";
        this.#_buyHintTextBox.appendChild(this.#_buyHintText);

        this.#_coin300cText = document.createElement("span");
        this.#_coin300cText.setAttribute("class", "font textShadow blackText extraBoldText");
        this.#_coin300cText.textContent = "300c";
        this.#_buyHintTextBox.appendChild(this.#_coin300cText);


        this.#_coinBox = document.createElement("div");
        this.#_coinBox.setAttribute("class", "shopTwoBox");
        this.#_shopBox.appendChild(this.#_coinBox);

        this.#_coinButton = document.createElement("div");
        this.#_coinBox.appendChild(this.#_coinButton);

        this.#_coinCircle = document.createElement("div");
        this.#_coinCircle.setAttribute("class", "circle shopCircle yellow");
        this.#_coinButton.appendChild(this.#_coinCircle);

        this.#_coinIcon = document.createElement("img");
        this.#_coinIcon.setAttribute("class", "shopIcon");
        this.#_coinIcon.setAttribute("src", "../image/shop/coin_icon.png");
        this.#_coinCircle.appendChild(this.#_coinIcon);

        this.#_coinTextBox = document.createElement("div");
        this.#_coinTextBox.setAttribute("class", "shopTextBox");
        this.#_coinBox.appendChild(this.#_coinTextBox);

        this.#_coinText = document.createElement("span");
        this.#_coinText.setAttribute("class", "font textShadow shopText");
        this.#_coinText.textContent = "COIN";
        this.#_coinTextBox.appendChild(this.#_coinText);

        this.#_coin500Text = document.createElement("span");
        this.#_coin500Text.setAttribute("class", "font textShadow shopText extraBoldText yellowText");
        this.#_coin500Text.textContent = "500";
        this.#_coinTextBox.appendChild(this.#_coin500Text);

        this.#_watchAdsBox = document.createElement("div");
        this.#_watchAdsBox.setAttribute("class", "lowerTextBox");
        this.#_coinBox.appendChild(this.#_watchAdsBox);

        this.#_miniCoinIcon2 = document.createElement("img");
        this.#_miniCoinIcon2.setAttribute("class", "miniCoinIcon");
        this.#_miniCoinIcon2.setAttribute("src", "../image/shop/coin_icon.png");
        this.#_watchAdsBox.appendChild(this.#_miniCoinIcon2);

        this.#_watchAdsTextBox = document.createElement("div");
        this.#_watchAdsTextBox.setAttribute("class", "shopSmallText font small textShadow");
        this.#_watchAdsBox.appendChild(this.#_watchAdsTextBox);

        this.#_watchAdsText = document.createElement("span");
        this.#_watchAdsText.setAttribute("class", "font textSpace textShadow");
        this.#_watchAdsText.textContent = "WATCH ADS";
        this.#_watchAdsTextBox.appendChild(this.#_watchAdsText);

        this.#_freeText = document.createElement("span");
        this.#_freeText.setAttribute("class", "font blackText extraBoldText textShadow");
        this.#_freeText.textContent = "FREE";
        this.#_watchAdsTextBox.appendChild(this.#_freeText);


    }


    get shopBox() {
        return this.#_shopBox;
    }

    get hintButton() {
        return this.#_hintButton;
    }

    get coinButton() {
        return this.#_coinButton;
    }

}