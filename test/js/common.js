export class Common {

    /**
     * 좌측 사용자 레벨, 경험치
     * @type {HTMLDivElement}
     */

    #_higherBox
    #_levelBox
    #_backCircle
    #_levelText
    #_userLevel
    #_expBox
    #_userExp
    #_expBar
    #_levelFullExp
    #_progressBar
    /**
     * 우측 상단에
     * 힌트와 코인
     * @type {HTMLDivElement}
     */
    #_userInfoBox
    #_hintBox
    #_hintIcon
    #_hintText
    #_hintPlus
    #_hintPlusIcon
    #_coinBox
    #_coinIcon
    #_coinText
    #_coinPlus
    #_coinPlusIcon
    #_accountBox
    #_accountText
    #_inGameHintBox
    #_inGameHintIcon
    #_inGameHintNumBox
    #_inGameHintNumText
    /**
     * 우측 하단에
     * 메인, 랭킹, 설정
     * @type {HTMLDivElement}
     */

    #_leftLowerBox
    #_lowerBox
    #_bottomCommon
    #_mainButton
    #_rankingButton
    #_settingButton

    /**
     * 기존 태그 display 속성 값
     * @param container
     */
    display = []
    isDisplay = new Boolean(true);

    constructor(container) {
        this.container = container;
        console.log("Common Constructor");
    }//constructor

    doDisplay() {
        console.log("Common DoDisplay");
        const pages = document.querySelectorAll(" #higherBox, #lowerBox");
        let i = 0;
        for (let page of pages) {
            if(!this.isDisplay){ //화면에 보여지지 않는다면 -> 보여주도록
                console.log("this.display: "+i+this.display[i]);
                page.style.display = "flex";
            }
            // else{ //화면에 보인다면 -> 보이지 않도록
            //     page.style.display = "none"
            // }
        }
        this.isDisplay = !this.isDisplay //상태 변경

        const page = document.querySelector("#inGameHintBox");
        page.style.visibility = "hidden";

        console.log(this.isDisplay.toString());
    }

    displayHigherBox() {
        console.log("Display higher box");
        const page = document.querySelector("#higherBox");
        if (page.style.visibility = "hidden")
            page.style.visibility = "visible";
    }

    notDisplayHigherBox() {
        console.log("Do not display higher box");
        const page = document.querySelector("#higherBox");
        if (page.style.visibility = "visible")
            page.style.visibility = "hidden";
    }

    doNoneDisplay() {
        console.log("Common DoNoneDisplay");
        const pages = document.querySelectorAll("#higherBox, #lowerBox");
        let i = 0;
        for (let page of pages) {
            page.style.display = "none"
        }
        this.isDisplay = !this.isDisplay

        console.log(this.isDisplay.toString());
    }

    init() {
        console.log("Common init()");
        const pages = document.querySelectorAll("#higherBox, #lowerBox");
        for (let page of pages) {
            this.display.push(page.style.display);

        }
        /**
         * 좌측 사용자 레벨, 경험치
         * @type {HTMLDivElement}
         */


        this.#_higherBox = document.createElement("div");
        this.#_higherBox.setAttribute("id", "higherBox");
        this.container.appendChild(this.#_higherBox);

        this.#_levelBox = document.createElement("div");
        this.#_levelBox.setAttribute("id", "levelBox");
        this.#_higherBox.appendChild(this.#_levelBox);

        this.#_backCircle = document.createElement("div");
        this.#_backCircle.setAttribute("id", "backCircle");
        this.#_levelBox.appendChild(this.#_backCircle);

        this.#_levelText = document.createElement("div");
        this.#_levelText.setAttribute("id", "levelText");
        this.#_levelText.textContent = "Level";
        this.#_backCircle.appendChild(this.#_levelText);

        this.#_userLevel = document.createElement("div");
        this.#_userLevel.setAttribute("id", "userLevel");
        //this.#userLevel.textContent = level;
        this.#_backCircle.appendChild(this.#_userLevel);

        this.#_progressBar = document.createElement("div");
        this.#_progressBar.setAttribute("id", "progress");
        this.#_levelBox.appendChild(this.#_progressBar);

        this.#_expBox = document.createElement("div");
        this.#_expBox.setAttribute("id", "expBox");
        this.#_levelBox.appendChild(this.#_expBox);

        this.#_userExp = document.createElement("span");
        this.#_userExp.setAttribute("id", "userExp");
        //this.#userExp.textContent = exp;
        this.#_expBox.appendChild(this.#_userExp);

        this.#_expBar = document.createElement("span");
        this.#_expBar.setAttribute("id", "expBar");
        this.#_expBox.appendChild(this.#_expBar);

        this.#_levelFullExp = document.createElement("span");
        this.#_levelFullExp.setAttribute("id", "levelFullExp");
        //this.#levelFullExp.textContent = fullExp;
        this.#_expBox.appendChild(this.#_levelFullExp);

        /**
         * 우측 상단에
         * 힌트와 코인
         * @type {HTMLDivElement}
         */
        this.#_userInfoBox = document.createElement("div");
        this.#_userInfoBox.setAttribute("id", "userInfoBox");
        this.#_higherBox.appendChild(this.#_userInfoBox);
        this.#_hintBox = document.createElement("div");
        this.#_hintBox.setAttribute("id", "hintBox");
        this.#_userInfoBox.appendChild(this.#_hintBox);

        this.#_hintIcon = document.createElement("i");
        this.#_hintIcon.setAttribute("class", "fa fa-search");
        this.#_hintIcon.setAttribute("id", "hintIcon");
        this.#_hintBox.appendChild(this.#_hintIcon);

        this.#_hintText = document.createElement("div");
        this.#_hintText.setAttribute("id", "hintText");
        //this.#hintText.textContent = myHint;
        this.#_hintBox.appendChild(this.#_hintText);

        this.#_hintPlus = document.createElement("div");
        this.#_hintPlus.setAttribute("id", "hintPlus");
        this.#_hintBox.appendChild(this.#_hintPlus);
        //this.#_hintPlus.onclick = shop;

        this.#_hintPlusIcon = document.createElement("i");
        this.#_hintPlusIcon.setAttribute("class", "fa fa-plus");
        this.#_hintPlusIcon.setAttribute("id", "hintPlusIcon");
        this.#_hintPlus.appendChild(this.#_hintPlusIcon);
        //this.#_hintPlusIcon.onclick = shop;


        this.#_coinBox = document.createElement("div");
        this.#_coinBox.setAttribute("id", "coinBox");
        this.#_userInfoBox.appendChild(this.#_coinBox);

        this.#_coinIcon = document.createElement("img");
        this.#_coinIcon.setAttribute("id", "coinIcon");
        this.#_coinIcon.setAttribute("src", "../image/common/coin_icon.png");
        this.#_coinBox.appendChild(this.#_coinIcon);

        this.#_coinText = document.createElement("div");
        this.#_coinText.setAttribute("id", "coinText");
        //this.#coinText.textContent = myCoin;
        this.#_coinBox.appendChild(this.#_coinText);

        this.#_coinPlus = document.createElement("div");
        this.#_coinPlus.setAttribute("id", "coinPlus");
        this.#_coinBox.appendChild(this.#_coinPlus);
        //this.#_coinPlus.onclick = shop;

        this.#_coinPlusIcon = document.createElement("i");
        this.#_coinPlusIcon.setAttribute("class", "fa fa-plus");
        this.#_coinPlusIcon.setAttribute("id", "coinPlusIcon");
        this.#_coinPlus.appendChild(this.#_coinPlusIcon);
        //this.#_coinPlusIcon.onclick = shop;


        this.#_accountBox = document.createElement("div");
        this.#_accountBox.setAttribute("id", "accountBox");
        this.#_userInfoBox.appendChild(this.#_accountBox);

        this.#_accountText = document.createElement("div");
        this.#_accountText.setAttribute("id", "accountText");
        //this.#accountText.textContent = userEmail;
        this.#_accountBox.appendChild(this.#_accountText);


        /**
         * 우측 하단에
         * 메인, 랭킹, 설정
         * @type {HTMLDivElement}
         */

        this.#_lowerBox = document.createElement("div");
        this.#_lowerBox.setAttribute("id", "lowerBox");
        this.container.appendChild(this.#_lowerBox);

        this.#_leftLowerBox = document.createElement("div");
        this.#_leftLowerBox.setAttribute("id", "leftLowerBox");
        this.#_lowerBox.appendChild(this.#_leftLowerBox);

        this.#_inGameHintBox = document.createElement("div");
        this.#_inGameHintBox.setAttribute("id", "inGameHintBox");
        this.#_leftLowerBox.appendChild(this.#_inGameHintBox);

        this.#_inGameHintIcon = document.createElement("i");
        this.#_inGameHintIcon.setAttribute("id", "inGameHintIcon");
        this.#_inGameHintIcon.setAttribute("class", "fa fa-search");
        this.#_inGameHintBox.appendChild(this.#_inGameHintIcon);

        this.#_inGameHintNumBox = document.createElement("div");
        this.#_inGameHintNumBox.setAttribute("id", "inGameHintNumBox");
        this.#_inGameHintBox.appendChild(this.#_inGameHintNumBox);

        this.#_inGameHintNumText = document.createElement("div");
        this.#_inGameHintNumText.setAttribute("id", "inGameHintNumText");
        //this.#inGameHintNumText.textContent = myHint;
        this.#_inGameHintNumBox.appendChild(this.#_inGameHintNumText);

        this.#_bottomCommon = document.createElement("div");
        this.#_bottomCommon.setAttribute("id", "bottomCommon");
        this.#_leftLowerBox.appendChild(this.#_bottomCommon);

        this.#_mainButton = document.createElement("img");
        this.#_mainButton.setAttribute("src", "../image/common/home_icon.png");
        this.#_mainButton.setAttribute("onmouseover", "this.src='../image/common/home_hvicon.png';");
        this.#_mainButton.setAttribute("onmouseout", "this.src='../image/common/home_icon.png';");
        this.#_mainButton.setAttribute("id", "main");
        //this.#_mainButton.onclick = home;
        this.#_bottomCommon.appendChild(this.#_mainButton);

        this.#_rankingButton = document.createElement("img");
        this.#_rankingButton.setAttribute("src", "../image/common/rank_icon.png");
        this.#_rankingButton.setAttribute("onmouseover", "this.src='../image/common/rank_hvicon.png';");
        this.#_rankingButton.setAttribute("onmouseout", "this.src='../image/common/rank_icon.png';");
        this.#_rankingButton.setAttribute("id", "ranking");
        //this.#_rankingButton.onclick = ranking;
        this.#_bottomCommon.appendChild(this.#_rankingButton);

        this.#_settingButton = document.createElement("img");
        this.#_settingButton.setAttribute("src", "../image/common/setting_icon.png");
        this.#_settingButton.setAttribute("onmouseover", "this.src='../image/common/setting_hvicon.png';");
        this.#_settingButton.setAttribute("onmouseout", "this.src='../image/common/setting_icon.png';");
        this.#_settingButton.setAttribute("id", "setting");
        //this.#_settingButton.onclick = setting;
        this.#_bottomCommon.appendChild(this.#_settingButton);

    }

    /**
     * @Function Getter
     */
    get levelBox() {
        return this.#_levelBox;
    }

    get backCircle() {
        return this.#_backCircle;
    }

    get levelText() {
        return this.#_levelText;
    }

    get userLevel() {
        return this.#_userLevel;
    }

    get expBox() {
        return this.#_expBox;
    }

    get userExp() {
        return this.#_userExp;
    }

    get expBar() {
        return this.#_expBar;
    }

    get levelFullExp() {
        return this.#_levelFullExp;
    }

    get userInfoBox() {
        return this.#_userInfoBox;
    }

    get hintBox() {
        return this.#_hintBox;
    }

    get hintIcon() {
        return this.#_hintIcon;
    }

    get hintText() {
        return this.#_hintText;
    }

    get hintPlus() {
        return this.#_hintPlus;
    }

    get hintPlusIcon() {
        return this.#_hintPlusIcon;
    }

    get coinBox() {
        return this.#_coinBox;
    }

    get coinIcon() {
        return this.#_coinIcon;
    }

    get coinText() {
        return this.#_coinText;
    }

    get coinPlus() {
        return this.#_coinPlus;
    }

    get coinPlusIcon() {
        return this.#_coinPlusIcon;
    }

    get accountBox() {
        return this.#_accountBox;
    }

    get accountText() {
        return this.#_accountText;
    }

    get inGameHintBox() {
        return this.#_inGameHintBox;
    }

    get inGameHintIcon() {
        return this.#_inGameHintIcon;
    }

    get inGameHintNumBox() {
        return this.#_inGameHintNumBox;
    }

    get inGameHintNumText() {
        return this.#_inGameHintNumText;
    }

    get bottomCommon() {
        return this.#_bottomCommon;
    }

    get mainButton() {
        return this.#_mainButton;
    }

    get rankingButton() {
        return this.#_rankingButton;
    }

    get settingButton() {
        return this.#_settingButton;
    }

    get progressBar() {
        return this.#_progressBar;
    }


    get higherBox() {
        return this.#_higherBox;
    }

    get lowerBox() {
        return this.#_lowerBox;
    }
}//class Common
