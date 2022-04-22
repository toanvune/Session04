import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";
import { Card } from "./components/Card.js";
import { Label } from "./core/Label.js";

class Game extends Node {

    constructor() {
        super();
        this.canClick = true;
        this.firstCard = null;
        this.secondCard = null;

        this._init();
        this.alpha = Math.floor(this.score / 10);

    }
    _init() {
        this.score = 100;
        this.x = 0;
        this.y = 0;
        this.width = 800;
        this.height = 600;
        console.log(this);
        this.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)";
        this._createBtnPlay();
        this._createScore();
    }

    _createCards() {
        this.cards = [];
        for (let index = 0; index < 20; index++) {
            let card = new Card(index);
            this.cards.push(card);
            card.setValue(index % 10);

        }
        this.cards = this.cards.sort(function () {
            return Math.random() - 0.5
        });

        this.cards.forEach((card, index) => {
            let row = index % 5;
            let col = Math.floor(index / 5);
            card.x = row * 110;
            card.y = col * 110;
            card.elm.addEventListener("click", this.onClickCard.bind(this, card))
            this.addChild(card);
        });
    }
    _createScore() {
        this.lblScore = new Label();
        this.lblScore.text = 'score: ' + this.score;
        this.lblScore.fontsize = 30;
        this.lblScore.width = 50;
        this.lblScore.height = 50;
        this.lblScore.x = 600;
        this.lblScore.y = 10;
        this.lblScore.color = "white";
        this.addChild(this.lblScore);
    }

    _createBtnPlay() {
        this.btnPlaygame = new Label();
        this.btnPlaygame.elm.innerHTML = 'Play game';
        this.btnPlaygame.fontsize = 40;
        this.btnPlaygame.x = 600;
        this.btnPlaygame.y = 150;
        this.btnPlaygame.color = "#578C91";
        this.btnPlaygame.elm.addEventListener("click", () => {
            this.resetGame();
            this._createCards();
            this.btnPlaygame.text = "Replay"
        });
        this.addChild(this.btnPlaygame);
    }

    onClickCard(card) {
        if (!this.canClick) return;

        if (card === this.firstCard) return;

        if (this.firstCard === null) {

            // open card
            this.firstCard = card;
            this.firstCard.open();


        } else {
            this.canClick = false;
            this.secondCard = card;
            this.secondCard.open();
            // console.log(card)
            // open card
            setTimeout(() => {
                this.compareCard();
                this.firstCard = null;
            }, 1000)
        }
    }

    compareCard() {
        // console.log('fValue: ', this.firstCard.value);
        // console.log(' sValue: ', this.secondCard.value);
        if (this.firstCard.value === this.secondCard.value) {
            this.success();
            this.animationScore("+");
            this.winGame();
        } else {
            this.failed();
            this.animationScore("-");
            this.loseGame();
        }
    }

    animationScore(whatMath) {
        if (startScore === endScore) return;
        const range = endScore - startScore;
        let current = startScore;
        const increment = endScore > startScore ? 1 : -1;
        const stepTime = Math.abs(Math.floor(1000 / range));
        let timeAnimateScore = setInterval(() => {
            current += increment
            this.lblScore.text = "Score: " + current;
            if (this.score === endScore) {
                clearInterval(timeAnimateScore);
            }
        }, 100);
    }

    failed() {
        console.log('failed');      
        this.firstCard.close();
        this.secondCard.close();
        this.canClick = true;
    }

    success() {
        console.log('success');
        this.canClick = true;
        this.firstCard.hide();
        this.secondCard.hide();
        this.removeChild(this.firstCard);
        this.removeChild(this.secondCard);
    }
    resetGame() {
        document.getElementsByTagName("div")[0].innerHTML = "";
        this._init();

    }
    winGame() {
        if (document.getElementsByTagName("div")[0].childElementCount <= 2 && this.score > 0) {
            alert('Winner winner chicken diner');
            this.btnPlaygame.text = 'Play again';
        }
    }
    loseGame() {
        if (document.getElementsByTagName("div")[0].childElementCount > 2 && this.score <= 0) {
            alert('Tệ');
            this.resetGame();
            this.btnPlaygame.text = 'Play again';
        }
    }

}


let game = new Game();
document.body.appendChild(game.elm);