### 강의 정리 - 605. 3개의 문 5

<br />

이벤트 리스너는 최대한 단순하게 만들어야 한다. 구체적인 기능을 하는 것은 따로 함수로 빼놓고 이벤트리스너 안에는 함수 실행만 넣는다. 저번 시간(604)에 작성했던 이벤트리스너에는 활성화와 비활성화하는 기능이 들어가있다. 이걸 수정해보자.

```javascript
(function () {
  const stageElem = document.querySelector('.stage');
  // 현재 활성화된 아이템 저장할 변수 생성
  let currentItem = undefined;

  // 활성화
  // 어떤 요소(elem)가 들어오든간에 거기에 클래스 붙이고 활성화 시킨다.
  function activate(elem) {
    elem.classList.add('door-opened');
    currentItem = elem;
  }

  // 비활성화
  function inactivate(elem) {
    currentItem.classList.remove('door-opened');
  }

  function doorHandler(e) {
    const targetElem = e.target;

    // 이미 활성화된 게 있으면 비활성화 시킴
    if (currentItem) {
      inactivate(currentItem);
    }

    // 지금 우리가 클릭한 door-body의 부모를 실행
    if (targetElem.classList.contains('door-body')) {
      activate(targetElem.parentNode);
    }
  }

  stageElem.addEventListener('click', doorHandler);

  // 처음 load 됐을 때 하나는 미리 실행시켜준다 (디폴트)
  activate(document.querySelector('.door:nth-child(1)'));
})();
```
