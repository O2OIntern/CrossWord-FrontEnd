import {Common} from "./common.js";
import {MainFrame} from "./mainFrame.js";
import {StageSelect} from "./stageSelect.js";
import {Shop} from "./shop.js";
import {Setting} from "./Setting.js";
import {DifficultySelect} from "./difficultySelect.js";
import {Result} from "./result.js";
import {Welcome} from "./welcome.js";
import {Ranking} from "./ranking.js";


const Timer = (function () {
    let intervalId = null;
    let timerHeightBox = 0;
    let gameTimerText = 0;
    let timerHeight = 0;
    let timerText = 0;
    let plusHeight = 0;
    let timerStart = 0;
    let percent = 0;
    let plusPercent = 0;
    let gameTimerTextBox;

    function setTimer(remainTime, remainHeight) { //시간을 정함.
        timerHeight = remainHeight; //gameTimer 의 높이
        timerText = remainTime; //timeLimit == 이 판의 제한시간(80s .. )
        plusHeight = remainHeight / remainTime; //gameTimer 의 높이를 제한시간으로 나눔??
        timerStart = 0;
        percent = 0;
        plusPercent = 100 / remainTime;
        console.log(plusHeight);
    }

    function initTimer() { //초기 타이머 설정
        timerHeightBox = document.querySelector("#remainTime");
        gameTimerText = document.querySelector("#gameTimerText");
        gameTimerTextBox = document.querySelector("#gameTimerTextBox");
        if (timerHeightBox == null && timerTextBox == null) {
            throw "Element does not exists!";
        }
    }

    function update() { //setInterval(update, 1000) 을 통해 1000ms(1초) 간격으로 호출
        //console.log(timer);
        gameTimerText.textContent = timerText; //제한시간 출력
        timerHeightBox.style.height = timerStart + "px"; //계속해서 남은 시간을 표시하는 바의 높이가 늘어나도록
        timerHeightBox.style.backgroundImage = "linear-gradient(to top, #fed61a, #54e7f5 " + percent + "%)";
        timerText -= 1; //1초에 1씩 줄어들도록
        timerStart += plusHeight; //gameTimer 의 높이를 제한시간만큼 나눈 것 == 1초에 늘어나야하는 높이
        percent += plusPercent;

        if (timerText < 0) { //&& timerHeight = 0
            stopTimer();
            window.canvas.sendTextQuery("get fail result");
        }
    }

    function startTimer() {
        if (intervalId !== null) {
            throw "Timer is already running!";
        }
        intervalId = setInterval(update, 1000);
    }

    function stopTimer() {
        if (intervalId === null) {
            throw "Timer is not running!";
        }
        clearInterval(intervalId);
        intervalId = null;
        gameTimerTextBox.style.animationPlayState = "paused";
    }

    function resumeTimer() {
        if (intervalId !== null) {
            throw "Timer is already running";
        }
        intervalId = setInterval(update, 1000);
        gameTimerTextBox.style.animationPlayState = "running";
        console.log("게임 재실행");
    }
    
    function isRunning() {
        return intervalId !== null;
    }

    return {
        'setter': setTimer,
        'init': initTimer,
        'start': startTimer,
        'stop': stopTimer,
        'resume': resumeTimer,
        'running': isRunning
    };
})();

function main() {
    window.canvas.sendTextQuery("start");
}

//상점으로 가는 함수
function shop() {
    window.canvas.sendTextQuery("store");
}

//setting으로 가는 함수
function setting() {
    window.canvas.sendTextQuery("setting");
}

function home() {
    window.canvas.sendTextQuery("home");
}

//ranking으로 가는 함수
function ranking() {
    window.canvas.sendTextQuery("ranking");
}

//main에서 continue눌렀을 때
function continuebutton() {
    window.canvas.sendTextQuery("continue game");
}

//main에서 viewall 눌렀을 때
function viewallButton() {
    window.canvas.sendTextQuery("choose level");
}

//result화면에서 retry눌렀을 때
function retry() {
    window.canvas.sendTextQuery("retry");
}

//result화면에서 next 눌렀을 때
function next() {
    window.canvas.sendTextQuery("keep going");
}

function easyGame() {
    window.canvas.sendTextQuery("easy");
}

function mediumGame() {
    window.canvas.sendTextQuery("medium");
}

function hardGame() {
    window.canvas.sendTextQuery("hard");
}

function remove_welcome() {
    const pages = document.querySelectorAll("#playbutton");
    console.log("count: " + pages.length);
    for (let page of pages) {
        console.log("remove_welcome function()" + page.textContent);
        page.parentNode.removeChild(page);
    }
}

function coin(num) {
    if(num.toString().length > 6) {
        if(num.toString().length > 9) num = num.toString().slice(0, -9) + "b";
        else num = num.toString().slice(0, -6) + "m";
        return num;
    }//million billion
    else {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ',');
    }
}

/**
 * This class is used as a wrapper for Google Assistant Canvas Action class
 * along with its callbacks.
 */
export class Action {

    /**
     * @param {*} scene which serves as a container of all visual elements
     */
    constructor(scene) {
        console.log("Action Constructor");

        // index.html 안의 <div id="screen"></div>
        const container = document.querySelector("#screen"); // container

        //헤더 높이 구하기
        const headerheight = async () => {
            return await window.interactiveCanvas.getHeaderHeightPx();
        };
        headerheight().then(function (result) {
            console.log(result);
            document.body.setAttribute("style","height:" + (window.innerHeight - result) + "px; width: " + window.innerWidth + "px");
            container.setAttribute("style", "margin-top: " + result + "px; " + "height:" + (window.innerHeight - result) + "px; width: " + window.innerWidth + "px");
            console.log(window.innerHeight - result);
            console.log(window.innerWidth);
        });
        container.setAttribute("class", "container");

        /**
         *
         * User Info
         */
            //main, stageselect, difficultyselect에서 사용
        let level = 0;
        let exp = 0;
        let myHint = 0;
        let myCoin = 0;
        let fullExp = 0;

        //difficultyselect, ingame에서 사용
        let betMoney1 = 0;
        let betMoney2 = 0;
        let betMoney3 = 0;

        //ingame, correct에서 사용
        let cnt = 0;
        let usedHint = 0;
        let usedHintList = new Array();
        let topHint = 0;
        //main -> 공통 화면
        let userEmail = "";


        const correctAudio = document.createElement("audio");
        correctAudio.setAttribute("src", "https://actions.o2o.kr/devsvr1/audio/correct_sound.mp3");
        correctAudio.canPlayType("audio/mp3");
        correctAudio.volume = 1.0;

        const wrongAudio = document.createElement("audio");
        wrongAudio.canPlayType("audio/mp3");
        wrongAudio.setAttribute("src", "https://actions.o2o.kr/devsvr1/audio/wrong_sound.mp3");
        wrongAudio.volume = 1.0;

        const successAudio = document.createElement("audio");
        successAudio.canPlayType("audio/mp3");
        successAudio.setAttribute("src", "https://actions.o2o.kr/devsvr1/audio/success_sound.mp3");
        successAudio.volume = 1.0;


        const failAudio = document.createElement("audio");
        failAudio.canPlayType("audio/mp3");
        failAudio.setAttribute("src", "https://actions.o2o.kr/devsvr1/audio/fail_sound.mp3");
        failAudio.volume = 1.0;

        const bgMusic = document.createElement("audio");
        bgMusic.canPlayType("audio/mp3");
        bgMusic.setAttribute("src", "../audio/bg_music.mp3");
        bgMusic.volume = 0.5;


        /**
         * Display Class Variable
         */
        const shopPage = new Shop(container);
        const settingPage = new Setting(container);
        const rankingPage = new Ranking(container);
        const welcome = new Welcome(container);
        const common = new Common(container);
        const mainFrame = new MainFrame(container);
        const stageSelect = new StageSelect(container);
        const difficultySelect = new DifficultySelect(container);
        const resultDisplay = new Result(container);

        welcome.init();

        //First Frame Test
        //remove_welcome();
        // document.body.style.backgroundImage = "url('')";
        // console.log(container);
        // container.style.backgroundImage = "url('../image/scene/default_bg.png')";
        // console.log(container);

        //window.open("../image/scene/default_bg.png");
        //welcome.setGameBackGround();

        common.init();
        common.doNoneDisplay();

        mainFrame.init();
        mainFrame.doNoneDisplay();


        settingPage.init();
        settingPage.doNoneDisplay();

        shopPage.init();
        shopPage.doNoneDisplay();

        rankingPage.init();
        rankingPage.doNoneDisplay();

        stageSelect.init();
        stageSelect.doNoneDisplay();

        difficultySelect.init();
        difficultySelect.doNoneDisplay();

        resultDisplay.init();
        resultDisplay.doNoneDisplay();

        bgMusic.load();
        bgMusic.autoplay = true;
        bgMusic.loop = true;

        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");
                console.log(data);
                console.log(data.inputemail);

                userEmail = data.inputemail;

                scene.playButton.onclick = main;
            },
            MAIN: function (data) {
                console.log("실행 : main");
                //welcome button, copyright, o2ologo remove
                remove_welcome();
                document.body.style.backgroundImage = "url('')";
                container.style.backgroundImage = "url('../image/scene/default_bg.png')";

                //inGame 화면에서 main(home)으로 바로 나온 경우
                if(Timer.running()) Timer.stop();

                if (document.querySelector("#inGameBox") != null) {
                    common.lowerBox.removeChild(document.querySelector("#inGameBox"));
                }
                if (document.querySelector("#hintButtonBox") != null) {
                    container.removeChild(document.querySelector("#hintButtonBox"));
                }

                common.doDisplay();
                common.displayUserInfoBox();
                common.displayHigherBox();
                mainFrame.doDisplay();
                stageSelect.doNoneDisplay();
                difficultySelect.doNoneDisplay();
                resultDisplay.doNoneDisplay();
                settingPage.doNoneDisplay();
                rankingPage.doNoneDisplay();
                shopPage.doNoneDisplay();

                document.querySelector("#main").style.display = "none"; //main 화면이므로 main 아이콘 빼기
                document.querySelector("#ranking").style.display = "block"; //ranking 아이콘 보이기
                document.querySelector("#setting").style.display = "block"; //setting 아이콘 보이기

                /**
                 * 메인 화면에서 보여줄 사용자의
                 * 레벨, 경험치, 힌트, 코인
                 */
                if (data.level != null) {
                    level = data.level;
                }
                if (data.myExp != null) {
                    exp = data.myExp;
                }
                if (data.myHint != null) {
                    myHint = data.myHint;
                }
                if (data.myCoin != null) {
                    myCoin = data.myCoin;
                }
                if (data.fullExp != null) {
                    fullExp = data.fullExp;
                }

                /**
                 *
                 * Display Setting
                 */

                common.lowerBox.appendChild(mainFrame.playBox);

                //set TextContent
                common.userLevel.textContent = level;
                common.userExp.textContent = exp;
                common.levelFullExp.textContent = fullExp;
                common.hintText.textContent = myHint;
                common.coinText.textContent = coin(myCoin);
                if(userEmail.length>15){
                    common.accountText.textContent = userEmail.slice(0,15)+"...";
                }
                else{
                    common.accountText.textContent = userEmail;
                }

                //set onClick Function
                // common.hintPlus.onclick = shop;
                // common.hintPlusIcon.onclick = shop;
                // common.coinPlus.onclick = shop;
                // common.coinPlusIcon.onclick = shop;
                common.mainButton.onclick = home;
                common.rankingButton.onclick = ranking;
                common.settingButton.onclick = setting;

                $('#progress').circleProgress({
                    size: 50, //수정필요
                    //그래프 크기
                    startAngle: -Math.PI / 2,
                    //시작지점 (기본값 Math.PI)
                    value: exp / fullExp,
                    //그래프에 표시될 값
                    animation: true,
                    //그래프가 그려지는 애니메이션 동작 여부
                    fill: {gradient: ['#7cbf5a', '#f9d118']},
                    //채워지는 색
                    emptyFill: "rgba(0, 0, 0, 0.0)",
                    //빈칸 색
                    lineCap: 'round',
                    //그래프 끝
                    thickness: 5 //수정필요
                    //그래프 두께
                });

                /**
                 * 중앙에 이어하기, 단계 선택 버튼
                 * @type {HTMLDivElement}
                 */

                mainFrame.gameContinueButton.onclick = continuebutton;
                mainFrame.chooseLevelButton.onclick = viewallButton;


            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");

                /**
                 * 메인 화면, 중앙에 생성했던
                 * continue, view all 버튼 제거
                 */
                //container.removeChild(document.querySelector("#continue_stageButton"));
                common.doDisplay();
                common.displayUserInfoBox();
                common.displayHigherBox();
                mainFrame.doNoneDisplay();
                stageSelect.doDisplay();
                difficultySelect.doNoneDisplay();
                resultDisplay.doNoneDisplay();

                document.querySelector("#main").style.display = "block"; //main 아이콘 보이기
                document.querySelector("#ranking").style.display = "none"; //ranking 아이콘 숨기기
                document.querySelector("#setting").style.display = "block"; //setting 아이콘 보이기

                /**
                 * 중앙에
                 * 선택할 수 있는 단계 보여줌
                 * @type {HTMLDivElement}
                 */
                stageSelect.stepLock(level); //단계 버튼 생성(10개)
            },
            DIFFICULTYSELECT: function (data) {
                console.log("실행 : difficulty");

                let winMoney1 = 0;
                let winMoney2 = 0;
                let winMoney3 = 0;
                let timeLimit1 = 0;
                let timeLimit2 = 0;
                let timeLimit3 = 0;
                /**
                 * 단계 선택, 중앙에 생성했던
                 * 단계 버튼 제거
                 */
                common.doDisplay();
                common.displayUserInfoBox();
                common.displayHigherBox();
                mainFrame.doNoneDisplay();
                stageSelect.doNoneDisplay();
                difficultySelect.doDisplay();
                resultDisplay.doNoneDisplay();

                document.querySelector("#main").style.display = "block"; //main 아이콘 보이기
                document.querySelector("#ranking").style.display = "none"; //ranking 아이콘 숨기기
                document.querySelector("#setting").style.display = "block"; //setting 아이콘 보이기

                /**
                 * 배팅머니, 획득머니, 시간제한 등을 fulfillment에서 가져옴
                 * 변동사항이 있으면 안되므로 상수 선언
                 */
                if (data.winMoney1 != null) {
                    winMoney1 = data.winMoney1;
                }
                if (data.winMoney2 != null) {
                    winMoney2 = data.winMoney2;
                }
                if (data.winMoney3 != null) {
                    winMoney3 = data.winMoney3;
                }
                if (data.betMoney1 != null) {
                    betMoney1 = data.betMoney1;
                }
                if (data.betMoney2 != null) {
                    betMoney2 = data.betMoney2;
                }
                if (data.betMoney3 != null) {
                    betMoney3 = data.betMoney3;
                }
                if (data.timeLimit1 != null) {
                    timeLimit1 = data.timeLimit1;
                }
                if (data.timeLimit2 != null) {
                    timeLimit2 = data.timeLimit2;
                }
                if (data.timeLimit3 != null) {
                    timeLimit3 = data.timeLimit3;
                }
                /**
                 * 몇 단계를 선택했는지 표시 -> fulfillment에서 가져와야 함
                 */
                /**
                 * 난이도별 경험치 표시해야 함
                 * @type {HTMLDivElement}
                 */

                for (let i = 1; i <= 3; i++) {
                    difficultySelect.feeText[i - 1].textContent = eval("betMoney" + i) + "c";
                    difficultySelect.timeText[i - 1].textContent = eval("timeLimit" + i) + "s";
                    difficultySelect.boxItem[i - 1].addEventListener("click", function () {
                        window.canvas.sendTextQuery(difficultySelect.difficulty[i - 1]);
                    })
                }

                //level 선택했는지 확인
            },
            INGAME: function (data) {

                document.querySelector("#ranking").style.display = "none";
                document.querySelector("#main").style.display = "block";
                document.querySelector("#setting").style.display = "block";

                //setting 에서 돌아와서 기억하고 있던 정보로 다시 resume 해야함
                if(document.querySelector("#inGameBox") != null) { //setting 에서 돌아왔을 경우
                    console.log("실행 : setting -> inGame");

                    settingPage.doNoneDisplay();
                    common.displayHigherBox();
                    container.style.backgroundImage = "url('../image/inGame/bg_" + container.getAttribute("value") + ".png')";
                    document.querySelector("#inGameBox").style.display = "flex";
                    document.querySelector("#hintButtonBox").style.display = "block";

                    Timer.resume();
                } else { //일반적으로 difficulty select 이후에 넘어왔을 경우
                    console.log("실행 : inGame");

                    common.doDisplay();
                    common.notDisplayUserInfoBox();
                    mainFrame.doNoneDisplay();
                    settingPage.doNoneDisplay();
                    rankingPage.doNoneDisplay();
                    shopPage.doNoneDisplay();
                    stageSelect.doNoneDisplay();
                    difficultySelect.doNoneDisplay();
                    resultDisplay.doNoneDisplay();


                    /**
                     * 게임판, 게임판 행과 열, 시간제한, 맞춰야 할 모든 단어 수는 변경되면 안 되서 상수 선언
                     * 맞춰야 하는 단어 수는 변경되어야 하므로 let 선언 -> correct에서도 사용할 변수
                     */
                    const board = data.board;
                    const boardRow = data.board[0].length; //열
                    const boardCol = data.board.length; //행
                    // const timeLimit = data.timeLimit;
                    const timeLimit = 900;
                    const totalWord = data.totalWord;
                    // data.difficulty -> easy : 1, medium : 2, hard : 3
                    const difficulty = difficultySelect.difficulty[data.difficulty - 1]; //easy, medium, hard
                    console.log("board : " + board);
                    console.log("boardRow : " + boardRow);
                    console.log("boardCol : " + boardCol);
                    console.log("timeLimit : " + timeLimit);
                    console.log("totalWord : " + totalWord);
                    console.log("difficulty : " + difficulty);
                    cnt = 0;

                    //난이도별 설정
                    container.style.backgroundImage = "url('../image/inGame/bg_" + difficulty + ".png')";
                    container.setAttribute("value", difficulty);


                    const inGameBox = document.createElement("div");
                    inGameBox.setAttribute("id", "inGameBox");
                    common.lowerBox.appendChild(inGameBox);

                    const gameBoardBox = document.createElement("div");
                    gameBoardBox.setAttribute("id", "gameBoardBox");
                    gameBoardBox.setAttribute("class", "inGameBoxMargin");
                    inGameBox.appendChild(gameBoardBox);

                    //main의 게임판 좌측에 타이머 배치
                    const gameTimerBox = document.createElement("div");
                    gameTimerBox.setAttribute("id", "gameTimerBox");
                    gameBoardBox.appendChild(gameTimerBox);

                    const gameTimer = document.createElement("div");
                    gameTimer.setAttribute("id", "gameTimer");
                    console.log(gameTimer.style.height);
                    gameTimerBox.appendChild(gameTimer);

                    const remainTime = document.createElement("div");
                    remainTime.setAttribute("id", "remainTime");
                    remainTime.setAttribute("class", "center");
                    gameTimer.appendChild(remainTime);

                    const gameTimerTextBox = document.createElement("div");
                    gameTimerTextBox.setAttribute("id", "gameTimerTextBox");
                    gameTimerTextBox.setAttribute("class", "circle center");
                    gameTimerTextBox.style.animationDuration = timeLimit + "s";
                    remainTime.appendChild(gameTimerTextBox);

                    const gameTimerText = document.createElement("div");
                    gameTimerText.setAttribute("id", "gameTimerText");
                    gameTimerTextBox.appendChild(gameTimerText);

                    const remainHeight = document.querySelector("#gameTimer").clientHeight;
                    const gameTimerHeight = document.querySelector("#gameTimer").style.height;
                    console.log(gameTimerHeight);
                    console.log(remainHeight);
                    Timer.setter(timeLimit, remainHeight);
                    Timer.init();
                    Timer.start();

                    const gameBoard = document.createElement("div");
                    gameBoard.setAttribute("id", "gameBoard");


                    /* data 로부터 선택한 level 받아오는 설정 필요 */
                    if (timeLimit <= 90) {
                        gameBoard.style.gridTemplateColumns = "repeat(6, 1fr)";
                        gameBoard.style.gridTemplateRows = "repeat(6, 1fr)";
                    } else if (timeLimit <= 120 && timeLimit >= 95) {
                        gameBoard.style.gridTemplateColumns = "repeat(7, 1fr)";
                        gameBoard.style.gridTemplateRows = "repeat(7, 1fr)";
                    } else {
                        gameBoard.style.gridTemplateColumns = "repeat(8, 1fr)";
                        gameBoard.style.gridTemplateRows = "repeat(8, 1fr)";
                    }


                    gameBoardBox.appendChild(gameBoard);

                    for (let col = 0; col < boardCol; col++) {
                        for (let row = 0; row < boardRow; row++) {

                            //알파벳 이미지 담을 배경(네모박스)
                            const alphabetBox = document.createElement("div");
                            alphabetBox.setAttribute("class", "alphabetBox");

                            alphabetBox.setAttribute("id", "box" + col + "," + row);
                            alphabetBox.setAttribute("value", board[col][row].toLowerCase());
                            gameBoard.appendChild(alphabetBox);

                            //알파벳 이미지
                            const alphabet = document.createElement("img");
                            alphabet.setAttribute("src", "../image/inGame/alphabet/" + board[col][row].toLowerCase() + ".png");
                            alphabet.setAttribute("class", "alphabet");
                            alphabetBox.appendChild(alphabet);
                        }
                    }
                    //좌측 힌트 버튼 생성
                    const hintButtonBox = document.createElement("div");
                    hintButtonBox.setAttribute("id", "hintButtonBox");
                    container.appendChild(hintButtonBox);

                    const hintClickBox = document.createElement("div");
                    hintClickBox.setAttribute("id", "hintClickBox");
                    hintButtonBox.appendChild(hintClickBox);
                    hintClickBox.addEventListener("click", function () {
                        window.canvas.sendTextQuery("open hint");
                    });

                    const hintBoxIcon = document.createElement("img");
                    hintBoxIcon.setAttribute("id", "hintBoxIcon");
                    hintBoxIcon.setAttribute("src", "../image/ico-hint@3x.png");
                    hintClickBox.appendChild(hintBoxIcon);

                    const hintCountBox = document.createElement("div");
                    hintCountBox.setAttribute("id", "hintCountBox");
                    hintButtonBox.appendChild(hintCountBox);

                    const hintCountText = document.createElement("div");
                    hintCountText.setAttribute("id", "hintCountText");
                    hintCountBox.appendChild(hintCountText);
                    hintCountText.textContent = myHint;

                    //우측 힌트 리스트 생성
                    const gameProgress_HintBox = document.createElement("div");
                    gameProgress_HintBox.setAttribute("id", "gameProgress_HintBox");
                    inGameBox.appendChild(gameProgress_HintBox);

                    const gameProgressBox = document.createElement("div");
                    gameProgressBox.setAttribute("id", "gameProgressBox");
                    gameProgressBox.setAttribute("class", "inGameBoxMargin");
                    gameProgress_HintBox.appendChild(gameProgressBox);

                    //힌트 캐러셀 리스트 생성
                    const hintListBox = document.createElement("div");
                    hintListBox.setAttribute("id", "hintListBox");
                    gameProgress_HintBox.appendChild(hintListBox);
                    const hintArrowUpButton = document.createElement("img");
                    hintArrowUpButton.setAttribute("id", "hintArrowUpButton");
                    hintArrowUpButton.setAttribute("src", "../image/arrow-up.png");
                    hintListBox.appendChild(hintArrowUpButton);
                    const hintCarousel = document.createElement("div");
                    hintCarousel.setAttribute("id", "hintCarousel");
                    hintListBox.appendChild(hintCarousel);
                    const hintArrowDownButton = document.createElement("img");
                    hintArrowDownButton.setAttribute("id", "hintArrowDownButton");
                    hintArrowDownButton.setAttribute("src", "../image/arrow-down.png");

                    hintListBox.appendChild(hintArrowDownButton);

                    //default hintItems Create
                    for (let i = 0; i < 5; i++) {
                        const hintItem = document.createElement("div");
                        hintItem.setAttribute("class", "hintItem");
                        hintItem.classList.add(container.getAttribute("value"));
                        hintCarousel.appendChild(hintItem);
                        const hintItemIcon = document.createElement("img");
                        hintItemIcon.setAttribute("id", "hintItemIcon");
                        hintItemIcon.setAttribute("src", "../image/ico-hint.png");
                        hintItem.appendChild(hintItemIcon);
                        const hintItemText = document.createElement("div");
                        hintItemText.setAttribute("id", "hintItemText");
                        hintItem.appendChild(hintItemText);
                    }


                    // const usedHint = document.createElement("div");
                    // usedHint.setAttribute("id", "usedHint");
                    // usedHint.setAttribute("class", "inGameBoxMargin");
                    // gameProgress_HintBox.appendChild(usedHint);
                    //
                    // const hint = document.createElement("p");
                    // hint.textContent = "HINT";
                    // usedHint.appendChild(hint);
                    // usedHint.appendChild(document.createElement("hr"));
                    //
                    // const hintScrollBox = document.createElement("div");
                    // hintScrollBox.setAttribute("id", "hintScrollBox");
                    // usedHint.appendChild(hintScrollBox);


                    hintListBox.style.height = (gameBoard.clientHeight * 3 / 5) + "px";
                    gameProgressBox.style.width = hintListBox.clientWidth + "px";
                    //게임보드에 높이 맞추기
                    // usedHint.style.height = (gameBoard.clientHeight * 3 / 5) + "px";
                    // gameProgressBox.style.width = usedHint.clientWidth + "px";
                    //  0 0 0 0 0 형식
                    for (let i = 0; i < totalWord; i++) {
                        const gameProgress = document.createElement("img");
                        gameProgress.setAttribute("src", "../image/inGame/count.png");
                        // gameProgress.style.width = gameProgressBox.clientWidth / totalWord + "px";
                        gameProgress.setAttribute("id", "progress" + i);
                        gameProgress.setAttribute("class", "gameProgress");
                        gameProgress.style.opacity = "0.1";
                        gameProgressBox.appendChild(gameProgress);
                    }
                }

            },
            CORRECT: function (data) {
                console.log("실행 : correct");

                // 게임 종료 여부를 받아옴, 변경되면 안되므로 상수 선언
                const finish = data.finish;
                console.log(finish);

                const difficulty = container.getAttribute("value");

                correctAudio.load();
                correctAudio.autoplay = true;

                const correctOne = document.querySelector("#progress" + cnt);
                console.log(correctOne);
                console.log(correctOne.src);
                correctOne.src = "../image/inGame/star.png";
                correctOne.style.opacity = "1";
                console.log(correctOne.src);
                cnt++;

                const matchedWord = data.matchpoint;
                console.log("matchedWord : " + matchedWord);
                console.log("matchedWord[0] : " + matchedWord[0]);
                for (let i = 0; i < matchedWord.length; i++) {
                    const alphabetBox = document.getElementById("box" + matchedWord[i]);
                    if (difficulty == "easy") alphabetBox.style.backgroundImage = "linear-gradient(to top, #516afb, #a1efc8)";
                    else if (difficulty == "medium") alphabetBox.style.backgroundImage = "linear-gradient(to top, #278336, #d8db48)";
                    else alphabetBox.style.backgroundImage = "linear-gradient(to top, #563fcb, #cb93ff)";
                    alphabetBox.style.boxShadow = "-5.6px 8.3px 20px 0 rgba(0, 0, 0, 0.35)";
                    console.log(alphabetBox.getAttribute("value"));
                    alphabetBox.firstChild.src = "../image/inGame/hover/" + alphabetBox.getAttribute("value") + ".png";
                }

                //다 맞추면 fulfillment로 textQuery 전송
                if (finish) {
                    setTimeout(function () {
                        Timer.stop();
                        console.log("get success result");
                        window.canvas.sendTextQuery("get success result");
                    }, 1000);

                }
            },
            WRONG: function (data) {
                console.log("실행 : wrong");
                /**
                 * 틀렸다는 팝업창보다는 소리가 나도록 하거나 게임판을 좌우로 흔드는 쪽으로 -> 한 번만 흔들림, 소리 재생되지 않음
                 */

                wrongAudio.load();
                wrongAudio.autoplay = true;
                const gameBoard = document.querySelector("#gameBoard");
                gameBoard.classList.remove("shake");
                void gameBoard.offsetWidth;
                gameBoard.classList.add("shake");
            },
            OPENHINT: function (data) {
                console.log("실행 : openHint");
                container.classList.add("overlay");
                /**
                 * hint = data.hint -> fulfillment에서 보내주는 hint
                 * 게임판을 가리고 힌트를 보여줌
                 * 타이머가 잠시 멈춤
                 */
                const hint = data.hint;

                const backgroundModal = document.createElement("div");
                backgroundModal.setAttribute("class", "backgroundModal");
                backgroundModal.setAttribute("id", "backgroundModal");
                container.appendChild(backgroundModal);

                //힌트를 열면 타이머를 잠시 멈춤
                // Timer.stop(); //demo를 위함


                document.querySelector("#hintArrowDownButton").addEventListener("click", function () {
                    console.log("click");
                    if (topHint + 5 < usedHint) {
                        let content = document.getElementsByClassName("hintItem");
                        topHint += 1;
                        let k = 0;
                        for (let i = topHint; i < topHint + 5; i++) {
                            content[k++].querySelector("#hintItemText").textContent = usedHintList[i];
                        }
                    }
                });
                document.querySelector("#hintArrowUpButton").addEventListener("click",  function () {
                    console.log("click");
                    if (topHint > 0) {
                        let content = document.getElementsByClassName("hintItem");
                        topHint -= 1;
                        let k = 0;
                        for (let i = topHint; i < topHint + 5; i++) {
                            content[k++].querySelector("#hintItemText").textContent = usedHintList[i];
                        }
                    }
                });


                // const contentModal = document.createElement("div");
                // contentModal.setAttribute("class", "contentModal");
                // contentModal.style.height = document.querySelector("#gameBoard").clientHeight + "px";
                // contentModal.style.width = document.querySelector("#gameBoard").clientWidth + "px";
                // backgroundModal.appendChild(contentModal);
                // const hintModalText = document.createElement("p");
                // hintModalText.textContent = "HINT";
                // contentModal.appendChild(hintModalText);
                // contentModal.appendChild(document.createElement("br"));
                // contentModal.appendChild(document.createElement("hr"));
                // contentModal.appendChild(document.createElement("br"));
                //사용자의 힌트 개수가 1개 이상인지 체크
                if (myHint >= 1) {
                    //힌트3 일 경우
                    if (hint.length == 1) {
                        backgroundModal.style.display = "none";
                        console.log(hint);
                        for (let i = 0; i < document.getElementsByClassName("alphabetBox").length; i++) {
                            console.log(document.getElementsByClassName("alphabetBox")[i].getAttribute("value"));
                            if (document.getElementsByClassName("alphabetBox")[i].getAttribute("value") === hint)
                                document.getElementsByClassName("alphabetBox")[i].style.backgroundColor = "#ffffff";
                        }
                        setTimeout(function () {
                            /*글자가 다시 원상태로 돌아오록 함, usedHint에 추가 "first alphabet : A"*/
                            //Timer.resume();
                            for (let i = 0; i < document.getElementsByClassName("alphabetBox").length; i++)
                                document.getElementsByClassName("alphabetBox")[i].style.backgroundColor = "rgba(67, 67, 67, 0.1)";
                            //힌트리스트박스에 추가
                            const content = document.getElementsByClassName("hintItem");
                            usedHintList.push("first alphabet is \"" + hint.toUpperCase() + "\"");
                            if (usedHint < 5) {
                                content[usedHint].querySelector("#hintItemIcon").style.opacity = "1";
                                content[usedHint].setAttribute("id", "hintItemFocus");
                                for (let i = topHint; i <= usedHint; i++) {
                                    content[i].querySelector("#hintItemText").textContent = usedHintList[i];
                                }
                            } else {
                                topHint = usedHint - 4;
                                let k = 0;
                                for (let i = topHint; i < topHint + 5; i++) {
                                    content[k++].querySelector("#hintItemText").textContent = usedHintList[i];
                                }
                            }

                            console.log(hint);
                            usedHint++;
                            if (usedHint == 5) {
                                document.querySelector("#hintArrowDownButton").style.visibility = "visible";
                                document.querySelector("#hintArrowUpButton").style.visibility = "visible";
                            }
                        }, 5000);

                        //사용자의 남은 힌트를 보여줌
                        if (myHint > 0) myHint--;
                        document.getElementById("hintCountText").textContent = myHint;

                    } else if (hint.length > 1) {
                        backgroundModal.style.display = "block";

                        //힌트 모달 생성
                        const hintModalBox = document.createElement("div");
                        hintModalBox.setAttribute("id", "hintModalBox");
                        container.appendChild(hintModalBox);
                        const hintModal = document.createElement("div");
                        hintModal.setAttribute("id", "hintModal");
                        hintModalBox.appendChild(hintModal);
                        const hintModalIcon = document.createElement("img");
                        hintModalIcon.setAttribute("id", "hintModalIcon");
                        hintModalIcon.setAttribute("src", "../image/ico-hint-modal.png");
                        hintModalBox.appendChild(hintModalIcon);
                        const hintTopBox = document.createElement("div");
                        hintTopBox.setAttribute("id", "hintTopBox");
                        hintModal.appendChild(hintTopBox);
                        const hintBottomBox = document.createElement("div");
                        hintBottomBox.setAttribute("id", "hintBottomBox");
                        hintModal.appendChild(hintBottomBox);
                        const hintTopBoxText = document.createElement("div");
                        hintTopBoxText.setAttribute("id", "hintTopBoxText");
                        hintTopBox.appendChild(hintTopBoxText);
                        hintTopBoxText.textContent = "HINT";
                        const hintNotifyText = document.createElement("div");
                        hintNotifyText.setAttribute("id", "hintNotifyText");
                        hintBottomBox.appendChild(hintNotifyText);


                        Timer.stop();

                        if (hint != "noHint") {
                            hintNotifyText.textContent = hint;
                            console.log(hint);

                            //사용자의 남은 힌트를 보여줌
                            if (myHint > 0) myHint--;
                            document.getElementById("hintCountText").textContent = myHint;

                        } else if (hint == "noHint") {
                            hintNotifyText.textContent = "Please charge your hint";
                        }

                        setTimeout(function () {
                            backgroundModal.style.display = "none";
                            container.removeChild(hintModalBox);
                            Timer.resume();
                            //힌트 리스트 박스에 추가
                            if (hint != "noHint") {
                                console.log("usedHint" + usedHint.toString());
                                const content = document.getElementsByClassName("hintItem");
                                usedHintList.push(hint);
                                if (usedHint < 5) {
                                    content[usedHint].querySelector("#hintItemIcon").style.opacity = "1";
                                    content[usedHint].setAttribute("id", "hintItemFocus");
                                    for (let i = topHint; i <= usedHint; i++) {
                                        content[i].querySelector("#hintItemText").textContent = usedHintList[i];
                                    }
                                } else {
                                    topHint = usedHint - 4;
                                    let k = 0;
                                    for (let i = topHint; i < topHint + 5; i++) {
                                        console.log(usedHintList[i] + k);
                                        content[k++].querySelector("#hintItemText").textContent = usedHintList[i];
                                    }
                                }
                                console.log(hint);
                                usedHint++;
                                if (usedHint == 5) {
                                    document.querySelector("#hintArrowDownButton").style.visibility = "visible";
                                    document.querySelector("#hintArrowUpButton").style.visibility = "visible";
                                }
                            }
                        }, 5000);
                    }
                } else if (myHint <= 0) {
                    //힌트 모달 생성
                    const hintModalBox = document.createElement("div");
                    hintModalBox.setAttribute("id", "hintModalBox");
                    container.appendChild(hintModalBox);
                    const hintModal = document.createElement("div");
                    hintModal.setAttribute("id", "hintModal");
                    hintModalBox.appendChild(hintModal);
                    const hintModalIcon = document.createElement("img");
                    hintModalIcon.setAttribute("id", "hintModalIcon");
                    hintModalIcon.setAttribute("src", "../image/ico-hint-modal.png");
                    hintModalBox.appendChild(hintModalIcon);
                    const hintTopBox = document.createElement("div");
                    hintTopBox.setAttribute("id", "hintTopBox");
                    hintModal.appendChild(hintTopBox);
                    const hintBottomBox = document.createElement("div");
                    hintBottomBox.setAttribute("id", "hintBottomBox");
                    hintModal.appendChild(hintBottomBox);
                    const hintTopBoxText = document.createElement("div");
                    hintTopBoxText.setAttribute("id", "hintTopBoxText");
                    hintTopBox.appendChild(hintTopBoxText);
                    hintTopBoxText.textContent = "HINT";
                    const hintNotifyText = document.createElement("div");
                    hintNotifyText.setAttribute("id", "hintNotifyText");
                    hintBottomBox.appendChild(hintNotifyText);

                    //사용자의 남은 힌트가 없다면 힌트를 보여주지 않음
                    hintNotifyText.textContent = "Please charge your hint";
                    backgroundModal.style.display = "block";
                    setTimeout(function () {
                        backgroundModal.style.display = "none";
                        Timer.resume();
                    }, 5000);
                    container.removeChild(hintModalBox);
                }
            },
            RESULT: function (data) {
                console.log("실행 : result");
                topHint = 0;
                usedHintList.length = 0;
                usedHint = 0;
                // document.querySelector("#coinBox").style.visibility = "visible";
                bgMusic.pause();

                container.style.backgroundImage = "url('../image/scene/default_bg.png')";

                if (document.querySelector("#inGameBox") != null) {
                    common.lowerBox.removeChild(document.querySelector("#inGameBox"));
                }
                if (document.querySelector("#hintButtonBox") != null) {
                    container.removeChild(document.querySelector("#hintButtonBox"));
                }

                common.doDisplay();
                common.notDisplayHigherBox();
                common.notDisplayUserInfoBox();
                mainFrame.doNoneDisplay();
                stageSelect.doNoneDisplay();
                difficultySelect.doNoneDisplay();
                resultDisplay.doDisplay();
                settingPage.doNoneDisplay();

                document.querySelector("#ranking").style.display = "block";

                const result = data.result;
                let islevelup = false;
                //레벨값 세팅
                if (level < data.level) {
                    islevelup = true;
                }
                //게임 후 내 레벨과 현재 힌트 갯수
                level = data.level;
                myHint = data.myHint;
                //맞춘 단어와 맞추지 못한 단어 LIST
                const matchedList = data.correctList;
                const unmatchedList = data.wrongList;

                //결과 값과 현재 레벨 텍스트 설정
                console.log(result.toUpperCase());
                resultDisplay.resultText.textContent = result.toUpperCase();
                resultDisplay.resultText.setAttribute("class", result.toUpperCase());
                if (islevelup) {
                    resultDisplay.resultText.textContent = "LEVEL UP";
                    resultDisplay.resultText.setAttribute("class", "LEVELUP");
                }
                resultDisplay.resultLevelText.textContent = "Lv." + level;
                resultDisplay.gainCoinInnerText.textContent = "";
                resultDisplay.gainExpInnerText.textContent = "";

                //결과 값에 따른 아이콘 변경
                if (islevelup) {
                    resultDisplay.resultIcon.setAttribute("src", "../image/ico-" + "levelup" + ".png");
                } else {
                    resultDisplay.resultIcon.setAttribute("src", "../image/ico-" + result + ".png");
                }

                if (islevelup) {
                    const levelUpBox = document.createElement("div");
                    levelUpBox.setAttribute("id", "levelUpBox");
                    resultDisplay.resultBox.appendChild(levelUpBox);
                    const levelUpIcon = document.createElement("img");
                    levelUpIcon.setAttribute("id", "levelUpIcon");
                    levelUpBox.appendChild(levelUpIcon);
                    const levelUpEffectText = document.createElement("div");
                    levelUpEffectText.setAttribute("id", "levelUpEffectText");
                    levelUpBox.appendChild(levelUpEffectText);
                    const levelUpText = document.createElement("div");
                    levelUpText.setAttribute("id", "levelUpText");
                    levelUpBox.appendChild(levelUpText);

                    levelUpEffectText.textContent = (level * 1000 - 100).toString();
                    levelUpText.textContent = (level * 1000 - 100).toString();
                    resultDisplay.intervalLevelUpFunc(levelUpIcon, levelUpEffectText, levelUpText);

                }

                //내 코인 및 exp 설정
                resultDisplay.resultCoinText2.textContent = data.myCoin;
                resultDisplay.resultExpText2.textContent = data.myExp;

                //결과에 따른 설정
                //성공
                if (result == "success") {
                    //Audio Play
                    successAudio.load();
                    successAudio.autoplay = true;

                    //레벨업 여부에 따른 gain 효과
                    if (islevelup) {
                        resultDisplay.intervalFunc(data.myCoin - myCoin, data.fullExp - exp);
                    } else {
                        resultDisplay.intervalFunc(data.myCoin - myCoin, data.myExp - exp);
                        //resultDisplay.intervalFunc(200,90);

                    }

                    //실패
                } else if (result == "fail") {
                    //Audio Play
                    failAudio.load();
                    failAudio.autoplay = true;


                }

                //단어 grid 설정 전 초기화 부분
                resultDisplay.wordBoxItem.length = 0;
                while (resultDisplay.resultWordBox.hasChildNodes()) {
                    resultDisplay.resultWordBox.removeChild(resultDisplay.resultWordBox.firstChild);
                }

                //단어 grid 설정
                let totalSize = matchedList.length + unmatchedList.length;
                if (totalSize <= 5)
                    resultDisplay.resultWordBox.style.gridTemplateColumns = "repeat(" + totalSize + ",1fr)";
                else
                    resultDisplay.resultWordBox.style.gridTemplateColumns = "repeat(" + 5 + ",1fr)";

                for (let i = 0; i < totalSize; i++) {
                    const resultWordItem = document.createElement("div");
                    resultWordItem.setAttribute("id", "resultWordItem");
                    resultDisplay.resultWordBox.appendChild(resultWordItem);
                    resultWordItem.textContent = "blank";
                    resultDisplay.wordBoxItem.push(resultWordItem);
                }
                //단어 맞춘 현황 설정
                let wordCnt = 0;
                for (let i = 0; i < matchedList.length; i++) {
                    resultDisplay.wordBoxItem[wordCnt].setAttribute("class", "resultWordItem_matched");
                    resultDisplay.wordBoxItem[wordCnt].textContent = matchedList[i];
                    wordCnt++;
                }
                for (let i = 0; i < unmatchedList.length; i++) {
                    resultDisplay.wordBoxItem[wordCnt].setAttribute("class", "resultWordItem_unmatched");
                    resultDisplay.wordBoxItem[wordCnt].textContent = unmatchedList[i];
                    wordCnt++;
                }

                //coin, exp 설정
                exp = data.myExp;
                fullExp = data.fullExp;
                myCoin = data.myCoin;

            },
            SETTING: function (data) {
                console.log("실행 : setting");

                container.style.backgroundImage = "url('../image/scene/default_bg.png')";

                settingPage.setDisplayDefault();

                resultDisplay.doNoneDisplay();
                mainFrame.doNoneDisplay();
                rankingPage.doNoneDisplay();
                shopPage.doNoneDisplay();

                settingPage.doDisplay();

                common.notDisplayHigherBox();
                common.notDisplayUserInfoBox();

                common.lowerBox.appendChild(settingPage.settingBox);

                document.querySelector("#main").style.display = "block"; //main 아이콘 보이기
                document.querySelector("#ranking").style.display = "none"; //ranking 아이콘 숨기기
                document.querySelector("#setting").style.display = "none"; //setting 아이콘 숨기기

                /*
                 * inGame 에서 setting 으로 넘어왔을 경우
                 * Timer 시간이 흐르고 있음 -> 멈춤
                 * 게임 화면 가림
                 * 돌아가기(resume) 버튼 만들고 거기에 sendTextQuery 붙임
                 */
                if(Timer.running()) {

                    console.log("실행 : inGame -> Setting");

                    Timer.stop();
                    settingPage.setDisplayFromInGame();

                    document.querySelector("#inGameBox").style.display = "none"; //inGame 화면 가리기
                    document.querySelector("#main").style.display = "none"; //main 아이콘 숨기기
                    document.querySelector("#hintButtonBox").style.display = "none"; //inGame 내 hint box 숨기기

                    settingPage.gameResetButton.addEventListener("click", function () {
                        console.log("게임으로 돌아가기");
                        window.canvas.sendTextQuery(container.getAttribute("value"));
                    })
                }


                let backgroundsoundeffect = data.backgroundsound; //켜져있음 == 1 ==> 수정 필요함
                let soundeffect = data.soundeffect; //1

                console.log("bg sound : " + backgroundsoundeffect);
                console.log("sound effect : " + soundeffect);

                settingPage.accountText.textContent = userEmail;

                //기초설정대로 보여주기
                if (soundeffect == 1) {
                    settingPage.effectSound.checked = true;
                } else {
                    settingPage.effectSound.checked = false;
                }
                if (backgroundsoundeffect == 1) {
                    settingPage.bgSound.checked = true;
                } else {
                    settingPage.bgSound.checked = false;
                }


                /**
                 * 초기화
                 */
                // const ResetButton = document.createElement("button");
                // ResetButton.setAttribute("id", "ResetButton");
                // ResetButton.textContent = "RESET";
                // SettingBox.appendChild(ResetButton);
            },
            SETTINGSELECT: function (data) {
                console.log("실행: settingselect");
                let sound = data.sound; //1. soundEffect 2.background sound
                let onoff = data.onoff; //1.  0오면 off/1오면 on

                if ((onoff == "0") && (sound == "SoundEffect")) {
                    console.log("soundEffect off");
                    correctAudio.volume = 0;
                    wrongAudio.volume = 0;
                    successAudio.volume = 0;
                    failAudio.volume = 0;
                    settingPage.effectSound.checked = false;
                }
                if ((onoff == "1") && (sound == "SoundEffect")) {
                    console.log("soundEffect on");
                    correctAudio.volume = 1;
                    wrongAudio.volume = 1;
                    successAudio.volume = 1;
                    failAudio.volume = 1;
                    settingPage.effectSound.checked = true;
                }
                if ((onoff == "0") && (sound == "BackGround")) {
                    console.log("backgroundMusic off");
                    bgMusic.volume = 0;
                    settingPage.bgSound.checked = false;
                }
                if ((onoff == "1") && (sound == "BackGround")) {
                    console.log("backgroundMusic on");
                    bgMusic.volume = 1;
                    settingPage.bgSound.checked = true;
                }
            },
            RANKING: function (data) {
                console.log("실행 : ranking");
                let totalRank = data.totalRank;
                let myRank = data.myRank;
                console.log("totalRank : " + totalRank); //list.json
                console.log("totalRank length : " + totalRank.length);
                console.log("myRank : " + myRank);

                function Mail(mail) { //mail 텍스트 정제
                    mail = mail.replace(/"/gi, "");
                    let id = mail.split("@")[0].toString();

                    var maskingId = function(id) {
                        if (id.length > 2) {
                            var originId = id.split('');
                            originId.forEach(function(name, i) {
                                if (i === 0 || i === originId.length - 1) return;
                                originId[i] = '*';
                            });
                            var joinId = originId.join();
                            return joinId.replace(/,/g, '');
                        } else {
                            var pattern = /.$/; // 정규식
                            return id.replace(pattern, '*');
                        }
                    };

                    if(userEmail != mail) { //userEmail 이 없다면? trial 의 경우 고려 해야함
                        mail = maskingId(id) + "@" + mail.split("@")[1];
                    }

                    if(mail.length > 23) {
                        mail = mail.slice(0,20)+"...";
                    }
                    return mail;
                }

                rankingPage.doDisplay();
                resultDisplay.doNoneDisplay();
                mainFrame.doNoneDisplay();
                shopPage.doNoneDisplay();
                settingPage.doNoneDisplay();
                difficultySelect.doNoneDisplay();
                stageSelect.doNoneDisplay();
                common.notDisplayHigherBox();
                common.notDisplayUserInfoBox();

                document.querySelector("#main").style.display = "block"; //main 아이콘 보이기
                document.querySelector("#ranking").style.display = "none"; //ranking 아이콘 숨기기
                document.querySelector("#setting").style.display = "block"; //setting 아이콘 보이기

                common.lowerBox.appendChild(rankingPage.rankingBox);

                if (document.querySelector("#bottomBox") != null) {
                    rankingPage.rankingBox.removeChild(document.querySelector("#bottomBox"));
                }

                const bottomBox = document.createElement("div");
                bottomBox.setAttribute("id", "bottomBox");
                bottomBox.setAttribute("class", "flex");
                rankingPage.rankingBox.appendChild(bottomBox);

                const leftBox = document.createElement("div");
                bottomBox.appendChild(leftBox);

                const rightBox = document.createElement("div");
                rightBox.setAttribute("id", "rankRightBox");
                bottomBox.appendChild(rightBox);


                for (let i = 0; i < 5; i++) {
                    const top5Box = document.createElement("div");
                    top5Box.setAttribute("class", "flex alignCenter");
                    leftBox.appendChild(top5Box);

                    const rankingCircle = document.createElement("div");
                    if (i == 0) rankingCircle.setAttribute("class", "rankYellow circle boxShadow rankCircle center");
                    else rankingCircle.setAttribute("class", "rankBlue circle boxShadow rankCircle center");
                    top5Box.appendChild(rankingCircle);

                    const top5Num = document.createElement("div");
                    top5Num.textContent = (i + 1).toString();
                    top5Num.setAttribute("class", "top5Num font extraBoldText");
                    rankingCircle.appendChild(top5Num);

                    const top5InfoBox = document.createElement("div");
                    top5InfoBox.setAttribute("id", "top5InfoBox");
                    top5Box.appendChild(top5InfoBox);

                    const top5Mail = document.createElement("div");
                    top5Mail.setAttribute("class", "rankBlueText font small");
                    top5Mail.textContent = Mail(totalRank[i][0]);
                    top5InfoBox.appendChild(top5Mail);

                    const top5Exp = document.createElement("div");
                    top5Exp.setAttribute("class", "rankYellowText font small extraBoldText");
                    top5Exp.textContent = "Exp " + totalRank[i][1];
                    top5InfoBox.appendChild(top5Exp);
                }

                for (let i = 0; i < 8; i++) {
                    const rank8Box = document.createElement("div");
                    rightBox.appendChild(rank8Box);

                    const rankInfoCircle = document.createElement("div");
                    rank8Box.appendChild(rankInfoCircle);

                    const rankNum = document.createElement("span");
                    // rankNum.textContent = (i+100).toString();
                    rankNum.setAttribute("class", "font extraBoldText small rank8NumPadding");
                    rankInfoCircle.appendChild(rankNum);

                    const rankMail = document.createElement("span");
                    // rankMail.textContent =
                    rankInfoCircle.appendChild(rankMail);

                    const rankExp = document.createElement("span");
                    // rankExp.textContent = "Exp " + (i+100).toString();
                    rankExp.setAttribute("class", "font extraBoldText small rankYellowText rank8Exp");
                    rankInfoCircle.appendChild(rankExp);

                    if (myRank <= 5) { //내가 상위 5위 안 일때
                        rankNum.textContent = (i + 6).toString(); //6~13위 출력
                        rankMail.textContent = Mail(totalRank[i+5][0]); //6~13위의 mail
                        rankExp.textContent = "Exp " + totalRank[i + 5][1]; //6~13위의 exp
                        //진한 박스 없이(내가 상위5위 안이므로) 투명 박스만 8개(6~13위)
                        rankInfoCircle.setAttribute("class", "rankRound rankBlueOpacity flex alignCenter");
                        rankMail.setAttribute("class", "rankBlueText font small rank8Mail")
                    } else if (myRank > 5 && myRank <= 8) { //내가 6~8등일 때
                        rankNum.textContent = (i + 6).toString(); //6~13위 출력
                        rankMail.textContent = Mail(totalRank[i + 5][0]); //6~13위의 mail
                        rankExp.textContent = "Exp " + totalRank[i + 5][1]; //6~13위의 exp
                        //내 순위 진한 박스 1개, 내 위 아래로 투명 박스 7개
                        if (i == (myRank - 6)) { //0, 1, 2
                            rankInfoCircle.setAttribute("class", "rankRound boxShadow rankBlue flex alignCenter");
                            rankMail.setAttribute("class", "rankYellowText font extraBoldText small rank8Mail")
                        } else {
                            rankInfoCircle.setAttribute("class", "rankRound rankBlueOpacity flex alignCenter");
                            rankMail.setAttribute("class", "rankBlueText font small rank8Mail")
                        }
                    } else if (myRank >= (totalRank.length - 3) && myRank <= totalRank.length) { //내가 꼴등~꼴등-3 일때
                        rankNum.textContent = (totalRank.length - 7 + i).toString(); //꼴등-7~꼴등 위부터 출력
                        rankMail.textContent = Mail(totalRank[totalRank.length - 7 + i - 1][0]); //꼴등-7 ~ 꼴등의 mail
                        rankExp.textContent = "Exp " + totalRank[totalRank.length - 7 + i - 1][1]; //꼴등-7 ~ 꼴등의 exp
                        //내 순위 진한 박스 1개, 내 위 아래로 투명 박스 7개
                        if (i == (myRank - (totalRank.length - 7))) { //4, 5, 6, 7
                            rankInfoCircle.setAttribute("class", "rankRound boxShadow rankBlue flex alignCenter");
                            rankMail.setAttribute("class", "rankYellowText font extraBoldText small rank8Mail")
                        } else {
                            rankInfoCircle.setAttribute("class", "rankRound rankBlueOpacity flex alignCenter");
                            rankMail.setAttribute("class", "rankBlueText font small rank8Mail")
                        }
                    } else { //그외 default
                        rankNum.textContent = (myRank - 3 + i).toString(); //나+3위 부터 출력
                        rankMail.textContent = Mail(totalRank[myRank - 3 + i - 1][0]);
                        rankExp.textContent = "Exp " + totalRank[myRank - 3 + i - 1][1];
                        //내 순위 진한 박스 1개, 내 위 아래로 투명 박스 7개
                        if (i == 3) {
                            rankInfoCircle.setAttribute("class", "rankRound boxShadow rankBlue flex alignCenter");
                            rankMail.setAttribute("class", "rankYellowText font extraBoldText small rank8Mail")
                        } else {
                            rankInfoCircle.setAttribute("class", "rankRound rankBlueOpacity flex alignCenter");
                            rankMail.setAttribute("class", "rankBlueText font small rank8Mail")
                        }
                    }

                }

            },
            SHOP: function (data) {
                common.displayHigherBox();
                common.displayUserInfoBox();
                shopPage.doDisplay();
                mainFrame.doNoneDisplay();
                settingPage.doNoneDisplay();
                rankingPage.doNoneDisplay();

                document.querySelector("#main").style.display = "block"; //main 아이콘 보이기
                document.querySelector("#ranking").style.display = "none"; //ranking 아이콘 숨기기
                document.querySelector("#setting").style.display = "block"; //setting 아이콘 보이기

                common.lowerBox.appendChild(shopPage.shopBox);

                console.log("실행 : shop");
                // document.querySelector("#coinBox").style.visibility = "visible";
                /**
                 * 상점은
                 * 뒤로 가기
                 * (광고 보기 -> 코인 지급)
                 * 코인 충전
                 * 힌트 충전
                 */
            },
        };
    }

    /*
     * Register all callbacks used by Interactive Canvas
     * executed during scene creation time.
     */
    setCallbacks() {
        const that = this;
        // declare interactive canvas callbacks
        const callbacks = {
            onUpdate(data) {
                try {
                    console.log(data);
                    // command가 전부 대문자가 되어서 Action.commands에 들어감
                    that.commands[data.command.toUpperCase()](data);
                    console.log("onUpdate : " + data.command);
                } catch (e) {
                    // AoG 입력값을 매칭하지 못했을 경우
                    console.log("error : " + e);
                }
            },
        };
        // called by the Interactive Canvas web app once web app has loaded to
        // register callbacks
        this.canvas.ready(callbacks);
        console.log("setCallbacks READY");
    }
}