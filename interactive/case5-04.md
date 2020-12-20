### 강의 정리 - 504. 이벤트 위임

<br />

저번 시간(503)에서 했던 것을 약간 수정해보자.

```javascript
for (let i = 0; i < ilbuniGroup.length; i++) {
  ilbuniGroup[i].addEventListener('click', clickHandler);
}
```

이거는 addEventListener를 3번 호출한 셈인데 성능에 좋지 않다. 이벤트 위임을 통해 성능 개선을 해보자. 이벤트 위임이란 이벤트 처리를 누군가(부모)에게 위임하는 것이다.

e.target을 이용하면 내가 딱 클릭한 부분을 가리킨다. 그런데 stage부분을 클릭하면 에러가 생기니 내가 클릭한 게 자식 클래스인 일분이일 경우에만 removeChild 시키자.

class 여부도 classList가 관여한다. contains 속성은 해당 클래스를 가지고 있는지를 true/false 불리언 값으로 반환한다.

```javascript
(function () {
  // 이벤트 위임
  const stage = document.querySelector('.stage');

  function clickHandler(e) {
    if (e.target.classList.contains('ilbuni')) {
      stage.removeChild(e.target);
    }
  }

  stage.addEventListener('click', clickHandler);
})();
```

<br />

---

##### 이벤트 위임을 사용하기 좋은 또 다른 이유

요즘 sns들을 보면 스크롤을 할 때마다 아래에 새로운 포스팅들이 나타난다. 기존에 정보를 미리 다 불러오고 나서 페이지 별로 이동을 하면 정보를 보는 방식이 아니다.

예를 들어 페이스북의 경우, 각각의 포스트마다 좋아요 버튼 등이 있고, 그 버튼 안에 addEventListener 함수를 처리했을 것이다. 그런데 스크롤을 내릴 때마다 새로운 포스트들이 생겨나는데 그만큼 addEventListener 함수도 계속 생성이 될 것이므로 성능에 좋지 않을 것이다.

![responsive_504](https://user-images.githubusercontent.com/75867748/102685117-81903e00-4221-11eb-88af-1ac233e390a6.png)

따라서 각각의 포스트가 아닌 이들을 감싸는 부모에다가 이벤트 위임으로 처리한다면 단 한 번의 addEventLister 만으로도 처리가 가능해진다.
