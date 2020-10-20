export class Welcome {


    constructor(container) {
        console.log("Welcome Constructor()");
        this.container = container;
    }

    init(){
        this.setWelcomeBackGround();
    }

    setWelcomeBackGround(){
        console.log("Welcome setWelcomeBackGround()");
        this.container.style.backgroundImage="url('../image/welcome/bg.png')";
    }

}