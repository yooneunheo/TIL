---
title: '2020-12-18'
excerpt: '강의 정리 - 310. 이미지 블렌딩 2'
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

### 강의 정리 - 310. 이미지 블렌딩 2

<br />
``` javascript
const sceneInfo () {
    ...
    values : {
        ...
        // 속성명 변경 : imageBlendY → blendHeight
        blendHeight : [0, 0, {start: 0, end: 0}],
    }
}
```
처음엔 백지였다가 스크롤하면서 그림이 그려지는 것이므로 초기값은 0, 최종값은 height 이다. 타이밍, 그러니까 애니메이션이 언제 시작해서 언제 끝나는지는 어떻게 구할까?

이미지 블렌드가 start 되는 순간은 첫번째 캔버스가 상단에 닿아 fixed로 바뀌는 순간이다. end는 내가 정한다. 어차피 최종값은 캔버스 높이 꽉 차는 걸로 정했으니, end는 어느 속도로 올라가는지에 대한 내용이다. end를 작게 잡으면 스크롤이 훅 올라가니 빠르고, 크게 잡으면 스크롤을 많이 해야해서 느려진다. 전체 scrollHeight가 1이니까 20% 비율로 잡아보자. start에서 시작된 거에서 0.2를 더한다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        let step = 0
        ...
        if (scrollRatio < values.rect1x[2].end) {
            step = 1;
            objs.canvas.classList.remove('sticky');
        } else {
            // 상단에 닿은 이후
            step = 2;
            // 이미지 블렌드
            // 초기값은 0
            values.blendHeight[0] = 0;
            // 최종값은 height
            values.blendHeight[1] = objs.canvas.height;
            // start는 캔버스가 상단에 닿을 때
            values.blendHeight[2].start = values.rect1x[2].end
            // end는 사용자가 정하기
            values.blendHeight[2].end = values.blendHeight[2].start + 0.2;

            objs.canvas.classList.add('sticky');
            objs.canvas.style.top = `-${ (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

            if () {
                step = 3;
            }
        }
```

이제 blendHeight 관련된 값이 전부 세팅되었다. 이걸 이용하여 그릴 때 반영을 하자. x좌표는 처음부터 고정되어있으니 0, y좌표는 전체 캔버스 높이에서 height를 뺀 만큼이며, width 또한 캔버스 넓이이고(캔버스와 이미지가 크기가 같기 때문), height는 위에서 구했다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        let step = 0
        ...
        if (scrollRatio < values.rect1x[2].end) {
            step = 1;
            objs.canvas.classList.remove('sticky');
        } else {
            step = 2;
            values.blendHeight[0] = 0;
            values.blendHeight[1] = objs.canvas.height;
            values.blendHeight[2].start = values.rect1x[2].end
            values.blendHeight[2].end = values.blendHeight[2].start + 0.2;

            // 캔버스 그리기
            // source image에서 가져오는 부분
            objs.context.drawImage(objs.images[1],
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
            // destination canvas : 캔버스에서 가져오는 부분. 원래 캔버스 크기와 이미지 크기를 똑같이 세팅했으므로 값을 그대로 가져온다.
            objs.context.drawImage(objs.images[1],
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight);


            objs.canvas.classList.add('sticky');
            objs.canvas.style.top = `-${ (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

            if () {
                step = 3;
            }
        }
```

그런데 방금 작성한 식의 blendHeight는 sceneInfo에 등록해놓은 values.blendHeight와 다르다. 이건 변수이므로 아직 안 만들어서 우리가 다시 계산할 것이다. blendHeight에는 values.blendHeight를 계산한 결과가 들어가야된다. calcValues 이용해서.

```
...
const blendHeight = calcValues(values.blendHeight, currentYOffset);
...
```
