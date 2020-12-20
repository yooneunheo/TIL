### 강의 정리 - 604. 3개의 문 4

<br />

여러 개 중 내가 선택한 영역 하나만 활성화 시키는 패턴

```javascript
(function () {
  const stageElem = document.querySelector('.stage');
  // 현재 활성화된 아이템 저장할 변수 생성
  let currentItem = undefined;

  function doorHandler(e) {
    const targetElem = e.target;

    // 이미 활성화 된 아이템이 있다면 비활성화 시키기
    if (currentItem) {
      currentItem.classList.remove('door-opened');
    }

    if (targetElem.classList.contains('door-body')) {
      // 지금 클릭한 거에 door-opend이란 클래스 붙여주면서 활성화 시킴
      targetElem.parentNode.classList.add('door-opened');
      currentItem = targetElem.parentNode;
    }
  }

  stageElem.addEventListener('click', doorHandler);
})();
```
