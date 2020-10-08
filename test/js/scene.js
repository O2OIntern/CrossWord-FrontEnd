export class Scene {

    #_playButton;
    constructor() {
        console.log("Scene Constructor");
        // 화면 크기를 콘솔에 출력
        const view = document.getElementById("screen");
        //view.style.backgroundImage = "url('../image/bg.png')";
        this.ratio = window.devicePixelRatio;
        console.log("width : " + view.clientWidth + ", height : " + view.clientHeight);

        this.#_playButton = document.createElement("div");
        this.#_playButton.setAttribute("id", "playbutton");
        this.#_playButton.textContent = "start"
        view.appendChild(this.#_playButton);

        const copyright = document.createElement("span");
        copyright.setAttribute("id", "copyright");
        copyright.textContent = "COPYRIGHT O2O.INC. ALL RIGHT RESERVED";
        view.appendChild(copyright);

        const o2ologo = document.createElement("span");
        o2ologo.setAttribute("id", "o2ologo");
        o2ologo.textContent = "O2OCI";
        view.appendChild(o2ologo);
    }

    get playButton() {
        return this.#_playButton;
    }
}//class scene