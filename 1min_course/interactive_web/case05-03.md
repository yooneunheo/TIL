### 강의 정리 - 503. 움직이는 캐릭터를 예제로 클릭 이벤트 익혀보기

<br />

```css
.stage {
  width: 100vw;
  height: 75vw;
}
```

꼭 height에는 vh가 들어갈 필요가 없다. 말 그대로 vw는 브라우저 창의 넓이, vh는 브라우저 창의 높이를 의미해서 원하는 대로 사용하면 된다. 지금 이 예제에서는 100:75 비율로 화면이 늘어나는 대로 같은 비율을 유지하면서 화면 사이즈 조절되는 것.

```css
.ilbuni {
...
background-repeat: no-repeat;
background-position: 50% 50%; // 가운데에 오게
background-size: contain;
...
}
```

background-size: contain 은 이미지가 짤리지 않으면서 화면에 꽉 차게 하는 것이고, cover은 화면에 꽉차게 하는 거라 이미지가 짤릴 수 있다.
<br />

---

html >>

```html
<div class="stage">
  <div class="ilbuni"></div>
  <div class="ilbuni"></div>
  <div class="ilbuni"></div>
</div>
```

css >>

```css
.stage {
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 75vw;
  background-color: #fff000;
}

@keyframes moving {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(90vw);
  }
}

.ilbuni {
  position: absolute;
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  animation: moving infinite alternate;
  // alternative : 애니메이션 다시 되돌아옴
}

.ilbuni:nth-of-type(1) {
  left: 5%;
  bottom: 5%;
  background-image: url('images/ilbuni_0.png');
  animation-duration: 2s;
}

.ilbuni:nth-of-type(2) {
  left: 10%;
  bottom: 3%;
  background-image: url('images/ilbuni_1.png');
  animation-duration: 3s;
}

.ilbuni:nth-of-type(3) {
  left: 7%;
  bottom: 10%;
  background-image: url('images/ilbuni_2.png');
  animation-duration: 4s;
}
```

javascript >>

```javascript
(function () {
  const ilbuniGroup = document.querySelectorAll('.ilbuni');
  const stage = document.querySelector('.stage');

  function clickHandler(e) {
    stage.removeChild(this);
  }

  for (let i = 0; i < ilbuniGroup.length; i++) {
    ilbuniGroup[i].addEventListener('click', clickHandler);
  }
})();
```

전역 스코프 충돌을 방지하기 위해 바로 실행하는 함수로 감싼다. this나 e.currentTarget 은 ilbuniGroup[i] 를 가리킨다. 그리고 클릭한 요소를 없애고 싶다면 removeChild 이용한다. 그런데 removeChild는 자식요소를 없애는 것이므로 부모 클래스인 stage를 가져와서 적용

(+) 꼭 부모의 클래스명을 가져올 필요없다.

```javascript
function clickHandler(e) {
  // stage.removeChild(this);
  this.parentNode.removeChild(this);
}
```
