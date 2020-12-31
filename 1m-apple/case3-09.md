---
title: '2020-12-18'
excerpt: '강의 정리 - 309. 이미지 블렌딩 1'
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

### 강의 정리 - 309. 이미지 블렌딩 1

<br />

캔버스가 상단에 붙은 다음에는 이미지 블렌딩을 할 차례이다.
그러기 위해서는 sceneInfo에 values를 추가해야한다. 블렌딩도 초기값과 최종값이 있는 애니메이션이니까. 애니메이션은 캔버스 바닥에서부터 올라오기 때문에 그 y좌표를 sceneInfo에 초기값과 최종값으로 등록하고, 구간 내 애니메이션을 calcValues 함수를 이용하여 값이 계산되도록 처리를 하자.

비디오 스크롤 때와 원리는 똑같다. 내가 원하는 정확한 스크롤 구간 안에서 어느 값부터 어느 값까지의 범위로 스크롤 하는 거에 따라 변화를 시킨다. 다만 비디오 스크롤 때는 html, DOM 요소에 css 값을 적용해준 것이고, 이번에는 캔버스에서 이미지를 그리는 Y좌표로 조종해주는 거고.

그러면 먼저 할 일은 이미지블렌드 되는 이미지들을 그릴 때 쓸 Y좌표를 sceneInfo의 values에 등록을 하겠다.

<br />

---

##### 1. 이미지 정보 등록

```javascript
    const sceneInfo() {
        ...
        values : {
            ...
            // 스크립트에서 값을 구해야 하므로 0으로 처리
            imageBlendY : [0, 0, start: 0, end: 0],
        }
    }
```

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

            objs.canvas.classList.add('sticky');
            objs.canvas.style.top = `-${ (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

            if () {
                step = 3;
            }
        }
```

그렇다면 우선 캔버스에서 그림을 어떻게 그리는지부터 살펴보자. 그래야 y좌표를 어떻게 할 지 계획을 세울 수 있으니까.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        let step = 0
        ...
        if (scrollRatio < values.rect1x[2].end) {
            step = 1;
            ...
        } else {
            // 상단에 닿은 이후
            step = 2;
            // 이미지 블렌드
            // imageBlendY: [0, 0, { start: 0, end: 0 }]
            objs.context.drawImage(img, x, y, width, height);

     ...
        }
```

\* objs.context.drawImage(img, ) :
첫번째 인자에는 무엇이든 들어올 수 있다. 이미지 (객체), 비디오, 또 다른 캔버스 등. 지금은 setCanvasImages() 가 실행할 때 세팅해놓은 이미지 객체가 들어간다.

```javascript
function setCanvasImages() {
    ...
    let imgElem3;
    for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++){
        imgElem3 = new Image();
        imgElem3.src = sceneInfo[3].objs.imagesPath[i];
        sceneInfo[3].objs.images.push(imgElem3);
    }
}
```

그럼 objs.images에 두번째 이미지에 접근을 하도록 하겠다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        let step = 0
        ...
        if (scrollRatio < values.rect1x[2].end) {
            step = 1;
            ...
        } else {
            // 상단에 닿은 이후
            step = 2;
            // 이미지 블렌드
            // imageBlendY: [0, 0, { start: 0, end: 0 }]
            objs.context.drawImage(objs.images[1], 0, 200);

         ...
        }
```

이렇게 되면 첫번째 캔버스가 상단에 닿아 고정이 되는 순간 두번째 이미지가 나타난다. 그림은 위에서부터 그려지는데 화면에서 짤린 부분은 바닥 부분이다. 반면에 원본 파일에서는 바닥에서부터 그려지며 위쪽이 짤려있다.

![apple_309](https://user-images.githubusercontent.com/75867748/102604791-0c146700-4168-11eb-9325-91eabc70e2ed.png)

그러면 canvas api를 좀더 살펴보자.

```
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

s는 source, d는 destination.
s는 원래 그릴 이미지이고, d는 '그래서 이건 이렇게 그릴거야' 라고 캔버스에서 실제 그리는 이미지이다. 원래 이미지에서 원하는 위치에서 원하는 크기에 해당하는 부분을, 캔버스에 원하는 위치에 원하는 크기로 옮길 수 있다는 것.

\*\* 참고
[CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

이걸 쓰는 이유는 우리는 아래에서부터 그리기 때문이다.

![apple_309-2](https://user-images.githubusercontent.com/75867748/102606578-47179a00-416a-11eb-8398-6fcc744802e6.png)

왼쪽 박스는 source image 이고 오른쪽 박스는 destination canvas이다. 우리는 아래에서부터 그림을 그릴 것이므로 밑에서부터 정보를 가져온다(파란창). sx는 0이고 sy는 파란색 화살표 끝에 닿는 좌표값일 것이고, sWidth는 100%, sHeight는 가져오는 높이만큼일 것이고. 그래서 이걸 그대로 캔버스에 카피한다.

스크롤을 좀 더 내리면 파란색 박스 크기가 더 늘어날 것이고, 결국은 그게 애니메이션 되면서 아래에서부터 그려지는 효과가 난다.

![apple_309-3](https://user-images.githubusercontent.com/75867748/102607737-25b7ad80-416c-11eb-8dcd-d6ac543e58f6.png)

가져올 때는 이전까지 그렸던 것을 포함해 다시 새롭게 그려진다. 즉 파란색 박스가 차례로 차곡차곡 쌓이는게 아니라 다음에는 초록색박스만큼 다시 처음부터 통째로 그려진다.

이런 방식으로 애니메이션이 진행될 때 변하는 값은 무엇이냐? 바로 y값과 height(빨간 표시)이다. 이 두 개에 변화를 주면서 연속적으로 스크롤에 따라 그림을 그리면 그게 애니메이션 처리가 되는 것이다. 그러면 우리가 calcValues 함수를 이용하여 스크롤에 따라 계산할 값들은 y와 height이다. 그런데 이 둘은 유기적인 관계라 하나만 구해도 다른 하나는 자연스레 구해진다. height를 구하면 캔버스 전체 높이에서 height만큼 빼면 y가 나오니까.

아까 sceneInfo의 values 에다 imageBlendY 속성을 만들어놨는데 이게 바로 height이다. (속성명을 더 직관적인 걸로 수정)
