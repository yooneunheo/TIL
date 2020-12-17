### 강의 정리 - 302. 블렌딩 캔버스 크기 계산

<br />
우선 캔버스를 추가해주자.

##### 0. 캔버스 생성

html>>

```html
<section class="scroll-section" id="scroll-section-3">
  <p class="mid-message">...</p>
  <canvas class="image-blend-canvas" width="1920" height="1080"></canvas>
  <p class="canvas-caption></p>
  ...
</section>
```

순서상으로 캔버스가 canvas-caption 앞에 등장했기 때문에 그 순서에 맞게 넣는다.

<br />

---

##### 1. 캔버스 정보 넣기

다음으로 sceneInfo에 캔버스 정보를 넣는다.

```javascript
const sceneInfo = [
    { // 3
    objs: {
            container: document.querySelector('#scroll-section-3'),
            canvasCaption: document.querySelector('.canvas-caption'),
            canvas: document.querySelector('.image-blend-canvas'),
            context: document.querySelector('.image-blend-canvas').getContext('2d');
        },
        values: {
        }
    }
]
```

<br />

---

##### 2. 캔버스 사이즈 조정

위에서 만들었던 캔버스는 화면의 height만 꽉 차면 캔버스의 좌우가 남아돈다 하더라도 가운데 정렬을 하면 되니 별 상관이 없었다. 하지만 이번 캔버스의 경우 전체 화면으로 꽉 채워야 되므로 화면에 정확히 피트 되게끔 설정해야 한다. 따라서 화면 크기나 비율에 따라 scale을 유동적으로 적용할 필요가 있다.

이번에는 이전의 캔버스들 처럼 setLayout에서 세팅하는 게 아니라 playAnimation 함수에서 스크롤 하면서 세팅해줘야 한다.

(스크롤에 따라 다양한 수치가 계산되어 유동적으로 움직이다보니, 애플의 경우 너무 화면이 납작하면 효과를 없애버렸다. 하지만 우리는 어떤 해상도에도 대응할 수 있게 만들 것이다.)

<br />
크기 조절을 어떻게 할 거냐면,

1. 캔버스와 브라우저 간의 비율 구하기
2. 브라우저에 맞춰 캔버스 비율 정하기

- 일단 캔버스 원래 넓이에 대한 브라우저의 폭의 비율, 캔버스의 원래 높이에 대한 브라우저의 높이의 비율을 구한다.
- 그 다음, 브라우저 창에 맞춰 브라우저에 최적화되는 방식을 캔버스 비율로 삼는다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        // 가로, 세로 모두 꽉 차게 하기 위해 여기서 세팅(계산필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;
```

width의 비율과 height의 비율을 비교했을 때 height 비율이 더 크다면 이 말인즉슨, 원래 캔버스(1920\*1080, 16:9)가 화면보다 더 납작한 형태라는 뜻이다. 다시 말해 화면이 더 홀쭉하다. 브라우저 화면에 맞춰야 하므로 값이 더 많은 곳(=높이)에 맞춰야 비는 곳 없이 화면이 꽉 찬다.

따라서 넓이 비율과 높이 비율을 비교하였을 때 같거나 더 높으면 heightRatio를 따르고, 아니면 widthRatio를 따른다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
            //캔버스보다 브라우저 창이 홀쭉한 경우,
            canvasScaleRatio = heightRatio;
        } else {
            // 캔버스보다 브라우저 창이 납작한 경우
            canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;


            break;
```

<br />

---

##### 3. 캔버스 위치 정렬

이제 화면 사이즈를 정했으니 이제 가운데 정렬을 해서 화면에 제대로 위치 시킨다. 하지만 position을 absolute로 할 수 없다. 처음에는 스크롤에 따라 움직이다가 나중에 fixed되는 형식이기 때문이다. 그래서 container을 flex로 설정하고 안에 있는 내용을 가운데 정렬하자.

css >>

```css
#scroll-section-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

flex는 기본적으로 가로 배치이므로 flex-direction을 이용하여 세로 배치로 바꾼다. 그리고 이제 센터 정렬을 해야하는데 지금 column으로 배치되어 있기 때문에 그 수직축이 가운데 정렬되어야 한다. 캔버스보다 화면이 약간 더 납작한데 높이에 맞춰 세팅을 했기 때문에 캔버스가 바깥 양옆으로 살짝 더 삐져나와있을 것이다. 아무튼 대략적인 크기는 맞춰졌으니 이제 그림을 그리도록 하자.

<br />

---

##### 4. 이미지 정보입력

이제 첫번째 이미지를 캔버스에 그려보자. 그러기 위해서는 앞에서 한 것 처럼 '이미지 정보 입력 -> 이미지 세팅 -> 그리기' 순서로 일을 처리해야 한다.

우선 sceneInfo로 가서 이미지 정보들을 담아보자. 일단 이미지 경로에 대한 정보인 imagesPath를 입력한다. 그리고 앞에서 비디오 시퀀스를 담은 빈 배열을 만들어서 그걸 통해 캔버스에 연속적으로 그림을 그려 비디오 처리를 했던 것처럼 images라는 빈 배열을 만든다. 이 배열에 이미지 객체들을 push해서 넣으면 된다.

```javascript
const sceneInfo = [
  {
    // 3
    objs: {
      ...
      imagesPath: [
        '../images/blend-image-1.jpg',
        '../images/blend-image-2.jpg',
      ],
      images: []
    },
    ...
```

---

##### 5. 이미지 세팅

sceneInfo[3]에 들어갈 내용을 다 채웠으니, 캔버스에 쓰이는 이미지를 세팅하는 함수 setCanvasImages을 통해 이미지를 세팅하자.

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

<br />

---

##### 6. 이미지 그리기

이제 이미지를 세팅했으니 그림을 그릴 차례이다. playAnimation 함수로 이동하자.

<br />

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
            //캔버스보다 브라우저 창이 홀쭉한 경우,
            canvasScaleRatio = heightRatio;
        } else {
            // 캔버스보다 브라우저 창이 납작한 경우
            canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.drawImage(objs.images[0], 0, 0);


            break;

    }
}
```

context.drawImage 첫번째 인자에 이미지 객체(첫번째 이미지)를 넣는다. 그리고 캔버스의 x, y좌표 위치에 넣는다.

<br />
<br />
<br />
이제 화면에 핏 되게 이미지가 그려졌다.

---

<br />

\*\* 정리 (질문의 답변 참조) :
화면과 캔버스의 비율이 같지 않기 때문에
그 상태에서 높이를 꽉 채우고 가로로 가운데 정렬을 하기 위함이라고 생각하시면 됩니다.
화면 비율이 어떻든 캔버스 자체가 1920x1080으로 가로보다 세로가 작기 때문에
풀 스크린 효과가 나도록 세로를 화면 높이에 꽉 채우는거죠~
세로를 채우면 화면의 양 끝은 캔버스의 양끝과는 다른 위치가 되고(영상에 그림으로 설명하는 부분)
우리는 캔버스의 양 끝이 아닌 화면의 양 끝에 맞추어 그려야하기 때문에 X 위치도 따로 계산해주는 것이고요^^

이런 부분은 디자인 형태에 따라 계산의 기준이 달라지는거라,디자인 형태에 따라 또 다른 계산식이 필요할지도 모르고요!
