### 강의 정리 - 704. 객체 4 : prototype

<br />

```javascript
// 생성자 함수
function Person(nickname, age) {
  this.nickname = nickname;
  this.age = age;
  this.introduce = function() {
        console.log (`${this.nickname}, ${this.age});
  }
}

const person1 = new Person('일분이', 10);
const person2 = new Person('이분이', 8);

person1.introduce();
person2.introduce();
```

nickname과 age는 각 인스턴스마다 다른 값을 가지고 있다. 하지만 introduce 메소드는 동일한 구조를 지니고 있다. 그런데 위와 같은 방식에서는 매 인스턴스마다 각각의 introduce 메소드를 생성하는 꼴이므로 매우 비효율적이다. 그러므로 딱 하나만 따로 빼둔 다음 개별 인스턴스들이 공유를 할 수 있게 해두자.

<br />
다시 말해, 공통으로 사용하는 메소드는 공유를 하도록 한다.

```javascript
// 생성자 함수
function Person(nickname, age) {
  this.nickname = nickname;
  this.age = age;
}

Person.prototype.introduce = function() {
    console.log (`${this.nickname}, ${this.age});
}

const person1 = new Person('일분이', 10);
const person2 = new Person('이분이', 8);

person1.introduce();
person2.introduce();
```

<br />
prototype은 생성자 함수마다 쌍으로 딱 하나만 존재한다. 그리고 개별 객체(인스턴스)들이 prototype을 통해 속성이나 메소드들을 공유한다.

<br/>
<br/>

##### 정리

정리하자면, nickname과 age같이 각 인스턴스 객체들마다 다른 값으로 개별적으로 세팅되어야 하는 프로퍼티는 생성자 함수 안에 this.\*\* 로 만들어주고, introduce 메소드처럼 똑같이 공유하는 프로퍼티는 prototype에 정의해주면 된다.
<br />

---

##### 예시

```javascript
function Card(num, color) {
  this.num = num;
  this.color = color;
}

Card.prototype.width = 100;
Card.prototype.height = 150;

const card1 = new Card(1, 'green');
const card2 = new Card(7, 'blue');

console.log(card1);
```

< br />
객체 리터럴 방식으로도 표현할 수 있다.

![responsive_704](https://user-images.githubusercontent.com/75867748/102706063-e905c680-42d1-11eb-9149-8a9f2fb1c3da.png)

console.log(card1) 했을 때 콘솔창은 다음과 같다. \_\_proto\_\_(빨간 표시) 는 Card.prototype을 나타낸다. 그리고 \_\_proto\_\_를 열어보면 constructor가 있는데 이게 가리키는 것이 Card 생성자 함수인 것을 알 수 있다. 이 말은 객체 리터럴 형태로 프로토타입을 세팅할 때, 다시 말해 'Card.prototype = {}' 처럼 아예 새로운 객체를 생성할 때 constructor을 세팅해줘야한다.

```javascript
function Card(num, color) {
  this.num = num;
  this.color = color;
}

// Card.prototype.width = 100;
// Card.prototype.height = 150;
Card.prototype = {
  // 생성자를 따로 세팅해줘야 한다
  constructor: Card,
};

const card1 = new Card(1, 'green');
const card2 = new Card(7, 'blue');
```

<br />

```javascript
<style>
    .card {
        display: inline-flex; //div로 만들어서 block이니까 나란히 배치하게
        align-items: center;
        justfy-content: center;
        width: 100px;
        height: 150px;
        border: 2px solid black;
        border-radious: 10px;
    }
<style>
...

function Card(num, color) {
  this.num = num;
  this.color = color;
  this.init();
}

Card.prototype = {
  constructor: Card,
  init: function () {
    const mainElem = document.creatElement('div');
    mainElem.style.color = this.color;
    mainElem.innerHTML = this.num;
    mainElem.classList.add('card'); //css
    document.body.appendChild(mainElem); //html body에 붙이기
  },
};

const card1 = new Card(1, 'green');
const card2 = new Card(7, 'blue');
```
