---
title: '2020-12-18'
excerpt: '강의 정리 - 313. 마지막 문단 애니메이션'
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

### 강의 정리 - 313. 마지막 문단 애니메이션

<br />

마지막 문단은 그냥 scroll 되지 않는다. 이는 스크립트로 제어가 된다는 의미이다. sceneInfo에 canvasCaption 으로 미리 넣어놨었다. 이제 values로 가서 애니메이션의 초기값, 최종값, 타이밍을 넣어주자.

원본 파일을 보면 글씨가 점점 진해지면서 y축으로 translate이 일어난다. 애니메이션의 초기값과 최종값은 미리 세팅이 가능하지만 타이밍은 불가능하다. 앞에 있는 그림이 축소가 끝나면서(fixed가 풀릴 때) 마지막 문단이 시작되기 때문이다.

따라서 canvasCaption의 start는 캔버스의 fixed가 풀리는 시점으로 정하자.

```
values : {
    ...
    canvasCaption_opacity : [0, 1, {start: 0, end: 0}],
    canvasCaption_translateY: [20, 0, {start: 0, end: 0}],
    ...
}
```

세팅을 마쳤으니 애니메이션을 적용할 차례이다.

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
                objs.canvas.style.marginTop = 0;
            }

            if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0)
            {
                // sticky 클래스가 제거되는 시점에서 애니메이션 시작되므로 여기서 세팅
                objs.canvas.classList.remove('sticky');
                objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;


                <--! opacity -- >
                values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                // start 시점에서 일정 비율을 더해주는 방식으로
                values.canvasCaption_opacity[2].end = values.canvasCaption_opacity.start + 0.1;
                objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);

                <--! transform -- >
                 values.canvasCaption_translateY[2].start = values.canvas_scale[2].end;
                values.canvasCaption_trnaslateY[2].end = values.canvasCaption_opacity.start + 0.1;
                objs.canvasCaption.style.transform = `trnaslate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
            }
    }
```
