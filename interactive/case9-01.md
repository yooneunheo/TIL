### 강의 정리 - 901. Transition 이벤트

<br />
transition의 자바스크립트 이벤트에 대해 살펴보도록 하겠다.

트랜지션으로 움직이는 엘리먼트에 이벤트핸들러를 움직여보자

```javascript
...
window.addEventListener('click', function (e) {
  elem.style.transform = 'translate()';
});

elem.addEventListener('transitionend', function () {
  console.log(e.elapsedTime); // 트랜지션 경과 시간(=duration)
  console.log(e.propertyName); // 애니메이션 이름
});
```

transitionend : 트랜지션이 끝나고 나서 발생하는 이벤트
trnasitionstart : 트랜지션이 시작되자마자 발생하는 이벤트
