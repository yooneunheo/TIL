### 강의 정리 - 902. Animation 이벤트

<br />
transition의 자바스크립트 이벤트에 대해 살펴보도록 하겠다.

트랜지션으로 움직이는 엘리먼트에 이벤트핸들러를 움직여보자

```javascript
@keyframes ball-ani {}

...
window.addEventListener('click', function (e) {
  elem.style.animation = 'ball-ani 1s 3 forwards';
});

elem.addEventListener('animationend', function (){});

elem.addEventListener('animationstart', function (){});

elem.addEventListener('animationiteration', function (){});
```

transitionend : 애니메이션이 끝나고 나서 발생하는 이벤트
trnasitionstart : 애니메이션이 시작되자마자 발생하는 이벤트
animationiteration : 애니메이션이 중간에 반복될 때 발생하는 이벤트
