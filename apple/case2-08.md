### 강의 정리 - 208. 두번째 스크롤 비디오 처리

<br />

##### 0. 캔버스 생성

스크롤 섹션 2에도 캔버스를 불러오자. 이 때 id는 video-canvas-2 가 아니라 1이다. 두 번째 캔버스이기 때문에.

```html
<section class="scroll-section" id="scroll-section-2">
  <h1>AirMug Pro</h1>
  <div class="sticky-elem sticky-elem-canvas">
    <canvas id="video-canvas-1" width="1920" height="1080"></canvas>
  </div>
  ...
</section>
```

<br />

---

##### 1. canvas 정보 넣기

sceneInfo 에서도 canvas 정보들을 넣자.

```javascript
const sceneInfo = [
    { // 2
    objs: {
            ...
            canvas : document.querySelector('#video-canvas-1'),
            context: document.querySelector('#video-canvas-1').getContext('2d'),
            videoImages : []
        },
        values: {
            videoImageCount: 960,
            imageSequence : [0, 959],
            canvas_opacity: [1, 0, {start: 0.9, end: 1}]
            ...
        }
    }
]
```

<br />

---

##### 2. 캔버스 위치 정렬

이제 화면을 구현해보자. setLayout에서 캔버스 화면을 조절하므로 여기에다가 두번째 캔버스도 추가한다.

```javascript
function setLayout() {
    ...
    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
}
```

<br />

---

##### 3. 이미지 세팅

다음으로 이미지를 세팅해주자.

```javascript
function setCanvasImages() {
  let imgElem;
  for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `../video/001/IMG_${6726 + i}.JPG`;
    sceneInfo[0].objs.videoImages.push(imgElem);
  }
  let imgElem2;
  for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
    imgElem2 = new Image();
    imgElem2.src = `../video/002/IMG_${7027 + i}.JPG`;
    sceneInfo[2].objs.videoImages.push(imgElem);
  }
}

setCanvasImages();
```

<br />

---

##### 4. 이미지 그리기

playAnimation 함수도 처리한다. 이때 sequence라는 변수가 반복되는데 블럭으로 감싼 게 아니라 같은 공간에 있으므로 case 0에서 정의해놓은 sequence에 겹칠 수 있으니 뒤에 2를 붙여 구분을 해준다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 2:
            let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
            objs.context.drawImage(objs.videoImages[sequence2], 0 , 0);
            objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

            if (scrollRatio <= 0.22) {
                //in
            } else {
                //out
            }
            break;
```

이제 투명도 처리를 해보자. 첫번째 씬에는 마지막에 사라질 때만 부드럽게 opacity 처리를 하면 되었는데, 세번째 씬에서는 등장할 때도 부드럽게 등장해야 하므로 이것도 추가해야 한다.

```javascript
const sceneInfo = [
    { // 2
    objs: {
            ...
            canvas : document.querySelector('#video-canvas-1'),
            context: document.querySelector('#video-canvas-1').getContext('2d'),
            videoImages : []
        },
        values: {
            videoImageCount: 960,
            imageSequence : [0, 959],
            canvas_opacity_in: [0, 1, {start: 0, end: 0.1}]
            canvas_opacity_out: [1, 0, {start: 0.95, end: 1}]
            ...
        }
    }
]
```

이번에는 텍스트 애니메이션 때처럼 스크롤 비율에 따라 나눠서 처리해야한다. 어느 구간에서는 애니메이션을 이렇게 처리하고 다른 구간에서는 저렇게 처리하고.. 이런 방식이기 때문에.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        ...
        case 2:
            let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
            objs.context.drawImage(objs.videoImages[sequence2], 0 , 0);

            if(scrollRatio <= 0.5) {
                // in
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
            } else {
                // out
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
            }
            ...
```
