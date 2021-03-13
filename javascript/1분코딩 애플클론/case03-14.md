---
title: '2020-12-18'
excerpt: '강의 정리 - 314. 스크롤에 반응하는 메뉴'
toc: true
toc_sticky: true
toc_label: 'On this page'

categories:
  - TIL
tags:
  - apple
  - clone-coding
last_modified_at: 2020-12-18T08:06:00-05:00
---

### 강의 정리 - 314. 스크롤에 반응하는 메뉴

<br />

스크롤을 하면 global-menu는 위로 올라가고 local-menu만 위에 딱 달라붙는다.

우선 css 처리부터 하자. local 메뉴가 상단에 안 붙었을 때와 붙었을 때로 구분해서 클래스를 지정할 것이다. 그리고 스크립트에서는 yoffset(문서 전체에서 현재 스크롤 된 위치)을 체크해서 클래스를 넣었다 뺐다 하면 된다.

css >>

```css
.local-nav-sticky .local-nav {
  position: fixed;
  top: 0;
  background: rgba(255, 255, 255, 0.1);
  // 뿌옇게 처리
  backdrop-filter: saturate(180%) blur(15px);
}
```

local-nav 는 global-nav가 스크롤이 다 된만큼 올라가면 sticky 처리한다.

```javascript
function checkMenu() {
  if (yOffset > 44) {
    document.body.classList.add('local-nav-sticky');
  } else {
    document.body.classList.remove('local-nav-sticky');
  }
}
```

이제 scroll 될 때 함수 실행시킨다.

```javascript
window.addEventListenr('scroll', () => {
    ...
    checkMenu();
});
```
