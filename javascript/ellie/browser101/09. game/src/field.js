"use strict";

import * as sound from "./sound.js";
const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug"
});
export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();

    /* 
    클래스 안의 함수가 콜백인자로 전달될 때, 그 함수가 포함되어 있는 클래스의 정보가 사라진다. 따라서 클래스 정보를 무시하고 싶지 않다면 this 바인딩을 해야한다. 직접 바인딩(bind)을 하거나 arrow function을 이용할 수도 있다. 

    1. 직접 바인딩
    this.onClick = this.onClick.bind(this);
    this.field.addEventListener("click", this.onClick);

    2. arrow function 이용 1
    - 한번 더 콜백으로 감싸주기
    - arrow function은 this가 유지된다.
    - 일반 함수를 콜백으로 전달하게 되면 this 정보가   
      사라지지만, arrow function은 함수 외부의 정보도 함께 캡쳐해서 보관하기 때문에 클래스의 this 정보를 함께 가지고 전달된다.
    this.field.addEventListener("click", (event) => this.onClick(event));

    3. arrow function 이용 2 
    - 해당 함수를 멤버변수로 변경해서 사용
    - 아래 주석 참고 (55번)
    */
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  /* 
  3. arrow function 이용 2 
  
  Q. 모든 함수를 arrow function으로?
  A. 선호도에 맡겨둘께요. 다만 arrow functions을 쓸때 일반 함수들에서 할 수 없는 (동적으로 호출시점의 환경을 기억하는) 한계점을 이해하고 쓰시면 좋을 듯. 
  */
  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
