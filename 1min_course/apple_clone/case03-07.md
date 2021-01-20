---
title: '2020-12-18'
excerpt: '강의 정리 - 307. 다른 씬의 캔버스 처리하기'
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

### 강의 정리 - 307. 다른 씬의 캔버스 처리하기

<br />

캔버스는 3번씬으로 넘어갈 때 생성이 된다. 그래서 스크롤이 2씬에서 3씬으로 넘어갈 때 캔버스가 갑자기 툭 하고 나온다. 캔버스를 3씬이 시작될 때가 아니라, 2씬이 끝나갈 때 ~ 3씬이 시작되기 직전에 캔버스를 미리 생성하면 나중에 3씬이 화면에 나올 때 캔버스가 미리 그려져있을 것이다.

3번 내용이 생성되는 걸 2번에서도 처리하게 하자.
2번씬의 스크롤 비율이 0.9를 넘어섰을 때 캔버스를 그리려고 한다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 2:
        ...

        // currentScene 3 에서 쓰는 캔버스를 미리 그려주기 시작
        if (scrollRatio > 0.9 ) {
        // case 3에서 적은 내용 복붙.
        }
}
```

간결성을 위해 case 3 내용을 함수로 따로 빼서 쓰는 방법이 나을 거라고 생각할 것이다. 하지만 만약 함수로 처리했을 때, 씬2일 때와 씬3일 때의 경우를 따로 나눠서 다시 코드를 짜야하고, 또 중간에 지워질 부분들이 많아서 복잡해진다.

그런데 그대로 복붙하면 변수 충돌이 생길 수 있다. 예를 들어 scrollRatio, scrollHeight는 이름이 같은 변수지만 각 씬마다 다른 값을 가지고 있기 때문에 영역을 보호해줘야 한다. 변수명을 다시 설정하는 방법도 있겠지만, 마침 지금 코드에서는 if(){} 으로 감싸져있고 그 안에서 다시 변수를 선언해도 {}블럭 안에서만 한정되기 때문에 충돌을 걱정할 필요가 없다. objs와 values만 따로 3씬임을 지정해주면 된다

```javascript
if (scroll > ratio > 0.9) {
    // 3번씬임을 지정
    const objs = sceneInfo[3].objs;
    const values = sceneInfo[3].values;
    // 이 이후로는 case 3 그대로 복붙해서 필요없는 부분은 삭제.
    ...

```

<br />
   2씬은 애니메이션 시점을 정하는 것과 관련되어 있으므로 애니메이션을 주는 부분은 지우자.

```javascript
//    if(!values.rectStartY) {...}
```

<br />
 calcValues로 계산된 부분이 수정되어야 한다. 지금은 캔버스를 생성하는데에 관한 내용만 다루므로 굳이 애니메이션이 동작하는 계산이 들어갈 필요가 없다. 애니메이션은 정지된 상태, 다시 말해 초기값을 갖고 있는 상태로 바꾸자.

```javacript
     ...
    switch (currentScene) {
        case 3:
        ...
    // 좌우 흰색 박스 그리기 (x, y, width, height)
    objs.context.fillRect(parseInt(values.rect1X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height);
    objs.context.fillRect(parseInt(values.rect1x[0]), 0, parseInt(whiteRectWidth), objs.canvas.height);
    }
}
```
