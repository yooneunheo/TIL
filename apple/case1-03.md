### 강의 정리 - 스크롤 높이 세팅

<br />

1. 즉시 호출함수를 사용 (전역변수 사용을 피하기 위해)
2. 모든 애니메이션에 대한 정보를 담는 배열을 생성
3. 배열 안에는 4개의 객체를 담는다. (스크롤 영역이 4개이므로)
4. 객체에 담을 것 >>
   1. type
   2. scrollHeight : 스크롤 높이
   - 재생속도와 연관
   - 높이는 스크립트로 결정 (미리 정하지 않음. 스크린의 몇배수)
   3. heightNum : n
   - 브라우저 높이의 n배로 scrollheight 세팅
   - 애니메이션 동작 요소가 sticky 인지 normal인지
   4. objs
   - objs에 html 객체들을 모아놓음.
   - html의 scroll-section 은 스크롤 구간의 컨테이너 역할을 하므로 애니메이션과 연관되어 있어 배열에 넣음.
     <br />

```javascript
(() => {
  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
      },
    },
    {
      // 1
      type: 'normal',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];
})();
```

<br />
<br />

```javascript
function setLayout() {
  // 각 스크롤 섹션의 높이 세팅
  for (let i = 0; i < sceneInfo.length; i++) {
    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
    // 이제 구한 scrollHeight 값을 실제 html에 적용하기
    sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
  }
}

// 사이즈가 바뀔때마다 높이 세팅 바꾸기
window.addEventListener('resize', setLayout);
```
