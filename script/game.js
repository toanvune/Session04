import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";
import { Card } from "./components/Card.js";
import { Label } from "./core/Label.js";

class Game extends Node {

    constructor() {
        super();
        this.canClick = false;
        this.firstCard = null;
        this.secondCard = null;
        this._init();
        this.alpha = Math.floor(this.score / 10);
        this.canClick = false;
    }
    _init() {
        this.score = 100;
        this.x = 0;
        this.y = 0;
        this.width = 800;
        this.height = 600;
        this.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)";
        this._createBtnPlay();
        this._createScore();
        this.showThis();
        
    }

    _createCards() {
        this.cards = [];
        this.cardValue = [];
        for (let index = 0; index < 20; index++) {
            let card = new Card(index);
            card.x = 400 / 2;
            card.y = 250 / 2;
            card.elm.addEventListener("click", this.onClickCard.bind(this, card));
            this.cards.push(card);   
            this.addChild(card);        
        }
        this.countAndMoveCard();
        this.shuffleValueInCard(this.cards);
        
        setTimeout(() => {
            this.canClick = true;
        }, 6000);
        //this.addCard();
    }

    shuffleValueInCard(array) {
        const rndValue = [];
        for(let i = 0; i < 10; i++) {
            rndValue.push(i);
            rndValue.push(i);
        }
        //* rndValue.sort(function() {
        //*     return Math.random() - 0.5;
        //* });
        array.forEach((element, index) => {
            const value = rndValue[index];
            console.log(element, value);
            element.setValue(value);
        });
    }

    countAndMoveCard() {
        const tl = gsap.timeline();
        for(let i = 19; i >= 0; i--) {
            tl.to(this.cards[i], { x: 200, y: 250/2, opacity: 0, duration: 0.1 })
                .to(this.cards[i].cover.elm, { display: "block", duration: 0.1}) 
                           
        }
        tl.play();
        tl.call(() => {
            this.move()
        });  
    }

    move() {
        
        for (let i = 0; i <= 19 ; i++) {
            this.cards[i].opacity = 1;
            let row = i % 5;
            let col = Math.floor(i / 5);
            TweenMax.to(this.cards[i], 0.3, {
                ease: Back.easeOut.config(5), 
                x: row * 110,
                y: col * 110,
                delay: i * 0.1
            });
            
        };

        
        
    }

    showThis() {
        console.log(this);
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

            this.compareCard();

        }
    }

    compareCard() {
        console.log(this.firstCard.index, this.firstCard.value);
        console.log(this.secondCard.index, this.secondCard.value);
        if (this.firstCard.value === this.secondCard.value) {
            this.success();
            // this.score += this.alpha;
            
            this.winGame();
        } else {
            this.failed();
            // this.score -= this.alpha;
            
            this.loseGame();
        }
        setTimeout(() => {
            this.canClick = true;
            this.firstCard = null;
            this.secondCard = null;
            console.log("reset var");
        }, 3000);
    }

    

    plusScore() {
        TweenLite.to(this, 1, {score: "+=10", roundProps: "score", onUpdate: ()=>{
            this.updateText();
        }});
    }

    minusScore() {
        TweenLite.to(this, 1, {score: "-=10", roundProps: "score", onUpdate: ()=>{
            this.updateText();
        }});
        console.log(this.score);
    }

    updateText() {
        // console.log(this.score);
        this.lblScore.text = "Score: " + this.score;

        
    }

    failed() {
        console.log('failed');
        setTimeout(() => {
            this.firstCard.close();
            this.secondCard.close();
            this.minusScore();
        }, 500);
    }

    success() {
        console.log('success');

        setTimeout(() => {
            this.firstCard.hide();
            this.secondCard.hide();
            this.plusScore();
            setTimeout(() => {
                this.removeChild(this.firstCard);
                this.removeChild(this.secondCard);
            }, 500);
        }, 500);
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