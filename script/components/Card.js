import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";
import { Label } from "../core/Label.js";

export class Card extends Node {
    constructor(index) {
        super();
        this.index = index;
        this.value = null;
        this._createSprite();
        this._createCover();
        this._createLabel(this.index);
        this.width = 100;
        this.height = 100;
    }
    _createSprite() {
        this.sprite = new Sprite();
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.addChild(this.sprite);
    }
    _createCover() {
        let cover = new Node();
        cover.width = 100;
        cover.height = 100;
        cover.elm.style.backgroundColor = "orange";
        cover.elm.style.border = "solid 1px blue";
        this.cover = cover;
        this.addChild(this.cover);
    }
    _createLabel(index) {
        this.label = new Label();
        this.label.text = index + 1;
        this.label.x = Math.floor(this.cover.width / 2.222);
        this.label.y = Math.floor(this.cover.height / 2.222);
        this.addChild(this.label);
    }

    setValue(value) {
        this.value = value;
        this.sprite.path = "./images/trucxanh" + value + ".jpg";
    }
    open() {
        const tl = gsap.timeline({ pause: true });
        tl.to(this, { scaleX: 0, duration: 0.3 });
        tl.call(() => {
            this.cover.elm.style.background = "none";
            this.label.elm.style.display = "none";
        })
        tl.to(this, { scaleX: 1, duration: 0.3 });
        tl.play();
    }
    close() {
        const tl = gsap.timeline();
        tl.delay(0.3);
        tl.to(this.elm, { x: "+=10", yoyo: true, repeat: 1, duration: 0.03 });
        tl.to(this.elm, { x: "-=10", yoyo: true, repeat: 1, duration: 0.03 });
        tl.to(this.elm, { x: "+=10", yoyo: true, repeat: 1, duration: 0.03 });
        tl.to(this.elm, { x: "-=10", yoyo: true, repeat: 1, duration: 0.03 });
        tl.to(this.elm, { x: "+=10", yoyo: true, repeat: 1, duration: 0.03 });
        tl.to(this.elm, { x: "-=10", yoyo: true, repeat: 1, duration: 0.03 });
        tl.to(this, { scaleX: 0, duration: 0.3 });
        tl.call(() => {
            this.cover.elm.style.background = "orange";
            this.label.elm.style.display = "block";
        })
        tl.to(this, { scaleX: 1, duration: 0.3 });


    }
    hide() {
        const tl = gsap.timeline();
        tl.to(this.elm, { zIndex: 1, scale: 1.5, duration: 0.3, delay: 0.3 });
        tl.to(this.elm, { zIndex: 1, scale: 0, duration: 0.3 });
    }

}
