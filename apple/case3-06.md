---
title: '2020-12-18'
excerpt: '강의 정리 - 306. 캔버스 드로우 애니메이션 2'
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

### 강의 정리 - 306. 캔버스 드로우 애니메이션 2

<br />
자, 그렇담 rectStartY 값으로 무엇을 가져올까? 바로 offsetTop을 가져올 것이다. 그럼 진작에 이걸 쓸 것이지? 하지만 얘는 getBoundingClientRect처럼 계산이 복잡하기 때문에 먼저 그 예시를 보여준 것이다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...

        if (!values.rectStartY) {
          values.rectStartY = objs.canvas.offsetTop;
        }
        ...
    }
}
```

offsetTop은 객체가 위로부터 얼마나 떨어져있는가에 대한 값이다. getBoundingClientRect의 경우, (스크롤 속도에 따라 값이 차이나긴 했지만) 브라우저를 기준으로 했을 때의 top값이라면, offsetTop은 문서를 기준으로 한다. 고정된 값이기 때문에 스크롤 속도에 영향을 받지 않는다.

이제 이걸로 캔버스의 위치를 구해보자. 현재 캔버스 위치에서 이전씬 전체의 height값을 빼는 (offsetTop - prevScrollHeight) 방식으로 구할 수 있지 않느냐고 생각할 수 있겠다. 하지만 우리는 3번씬 내에 캔버스가 얼마나 떨어져 있는지에 대한 값이 필요하다(start, end값이 필요하니까). 이를 위해 offsetTop의 기준을 바꾸도록 하자. css에서 position 속성을 바꾸면 된다.

postion:relative를 하면 자기 위치는 변하지 않으면서 안에 있는 요소들의 위치의 기준점이 된다.

css >>

```css
.scroll-section {
  // 다른 섹션에도 영향을 안 주니 괜찮다. 범용성 차원에서 이렇게 처리한 것. scroll-section-3에 특정 지어서 해도 됨
  position: relative;
}
```

이제 3번씬 내에서 캔버스의 위치를 찾아냈다. 그런데 애니메이션이 원래보다 빠르게 동작한다. 이 말인즉슨 offsetTop가 원래 값보다 작게 나왔다는 의미이다. 그 이유는 캔버스가 원래 자기 크기가 아니라 scale로 인해 줄어든 크기이기 때문이다. 어느 정도로 줄었느냐? 화면 높이에 딱 맞게 줄어들었다.

transform으로 scale(크기)나 translate(위치이동)을 시킨 건 원래 요소의 크기나 위치에 영향을 안 주면서 자기 혼자 변형되는 거다. 다시 말해 본래 자기 영역은 변하지 않은 채 시각적인 요소만 바뀐다. 따라서 우리가 구한 offsetTop 값은 원래 크기의 canvas를 기준으로 한 것이다.

그렇다면 scale이 조정된 캔버스의 offsetTop값을 구해보자.

![apple_306](https://user-images.githubusercontent.com/75867748/102567887-c6cf4580-4125-11eb-912d-cf65fde8085f.png)

검은창은 브라우저, 빨간창은 원래 크기의 캔버스, 초록창은 scale이 적용된 캔버스이다. 우리가 구해야 하는 건 브라우저로부터 떨어진 초록창의 거리(2번 화살표)이다. 이걸 어떻게 구할까? 원래 캔버스의 offsetTop값(1번 화살표)에다 검은색 화살표 구간만큼 더해주면 나온다. 검은색 화살표 구간은 '(빨간창 높이 - 초록창 높이) / 2' 이다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...

        if (!values.rectStartY) {
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
        }
        ...
    }
}
```

드디어 제대로 동작한다!
이제 하얀박스 색상 변경을 해보자.

```javascript
objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
objs.context.fillStyle = 'white';
objs.context.drawImage(objs.images[0], 0, 0);
```

<br />

---

근데 애니메이션이 너무 일찍 시작된다. 애플의 경우 중간쯤 왔을 때 애니메이션이 시작되는데, 지금은 3번씬이 시작되자마자 애니메이션이 시작되므로 이걸 수정해보도록 하겠다.

창 사이즈의 절반쯤 왔을 때 시작하도록 만들자.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...

        if (!values.rectStartY) {
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }
        ...
    }
}
```
