---
title: '2020-12-18'
excerpt: '강의 정리 - 312. 스크롤에 따른 포지션 변경 시 정확한 위치 설정하기'
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

### 강의 정리 - 312. 스크롤에 따른 포지션 변경 시 정확한 위치 설정하기

<br />

scale로 축소가 되고 나면 스크롤 했을 때 화면이 올라간다. 즉 position 이 더이상 fixed가 아니란 의미이다. 스크롤 섹션 1번처럼 아무런 세팅을 하지 않고 그냥 스크롤 되면 올라가게 만들어야 된다. 이걸 어떻게 바꿀까?

1. 시점을 정한 다음
2. fixed 해제

1번은 캔버스가 완전히 축소되었을 때를 나타낸다. 이 값을 구해보자.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...
            // 블렌드 이미지 처리가 끝난 다음에
            if (scrollRatio > values.blendHeight[2].end) {
                values.canvas_scale[0] = canvasScaleRatio;
                values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                values.canvas_scale[2].start = values.blendHeight[2].end;
                values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
            }

            // 구간을 또 나누기, 스크롤 시작.
            if (scrollRatio > values.canvas_scale[2].end) {}
        }
```

그런데 바로 이 상태에서 시작하면 동작이 제대로 되지 않는다. values.canvas_scale[2].end가 아직 작동 되지 않아 0이기 때문이다. 따라서 위에 있는 if가 실행된 후에 다음 if가 실행되어야 하므로 또 다른 조건을 추가해야한다.

```
    if (scrollRatio > values.canvas_scale[2].end
        && values.canvas_scale[2].end > 0)
```

values~end가 세팅이 되고 0이 아닌 순간이 오면 실행

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...
            if (scrollRatio > values.blendHeight[2].end) {
                values.canvas_scale[0] = canvasScaleRatio;
                values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                values.canvas_scale[2].start = values.blendHeight[2].end;
                values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
            }

            // 스크롤 시작.
            if (scrollRatio > values.canvas_scale[2].end
        && values.canvas_scale[2].end > 0) {
            // fixed 된 걸 static으로 되돌리기
        }
    }
```

fixed로 잠겨있는 이유는 sticky라는 클래스가 붙어있기 때문이다. 클래스를 없애자. 그러면 바로 사라지기 때문에 위치를 다시 잡아줘야 한다. fixed 인채로 이미 스크롤을 많이 내려버렸기 때문에 static이 되었을 때는 저~어기 위에 위치하게 된다. 따라서 margin-top을 줘서 다시 화면 중간에 오게 하자.

그러면 margin-top을 얼만큼 줘야할까? fixed가 해제되기 직전까지 스크롤을 얼마나 내렸는지를 구해 margin-top 으로 넣어주면 된다. 그게 얼만큼인가? 이미지가 블렌드되고 축소되었을 때의 구간이므로 scrollHeight의 0.4.

```javascript
if (
  scrollRatio > values.canvas_scale[2].end &&
  values.canvas_scale[2].end > 0
) {
  // fixed 된 걸 static으로 되돌리기
  objs.canvas.classList.remove('sticky');
  // margin-top
  objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;
}
```

축소까지는 완료하였다. 그런데 스크롤을 다시 올리면 그림이 사라진다. 다시 말해 static에서 fixed로 바뀌는 순간에 사라진다. position이 전환되면서 sticky 클래스가 다시 붙었을 때도 margin-top이 적용되기 때문이다. 따라서 sticky일 땐 margin-top을 0으로 하자.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...
            if (scrollRatio > values.blendHeight[2].end) {
                values.canvas_scale[0] = canvasScaleRatio;
                values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                values.canvas_scale[2].start = values.blendHeight[2].end;
                values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                // margin-top: 0
                objs.canvas.style.marginTop = 0;
            }

            // 스크롤 시작.
            if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0)
            {
                objs.canvas.classList.remove('sticky');
                objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;
            }
    }
```
