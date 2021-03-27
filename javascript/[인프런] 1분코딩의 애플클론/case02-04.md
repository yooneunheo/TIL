### 강의 정리 - 204. 비디오 인터랙션 적용 1

<br />
##### 0. 캔버스 세팅
우선 로드 시 화면에 바로 나올 첫 번째 캔버스를 생성해보도록 하자. 0번째 스크롤 섹션에서 생성한다. 일단 화면이 고정되어 있고 스크롤 하면서 재생이 되는 방식이므로 sticky-elem 클래스를 넣어준다.

```html
<section class="scroll-section" id="scroll-section-0">
  <h1>AirMug Pro</h1>
  <div class="sticky-elem sticky-elem-canvas">
    <canvas id="video-canvas-0" width="1920" height="1080"></canvas>
  </div>
  ...
</section>
```

캔버스가 화면에 꽉 차는 방식이므로 sticky-elem-canvas 클래스를 따로 준 다음, css에서 top: 0;를 하면 위로 올라 붙어 화면 전체가 가득차게 된다. 그런데 메뉴를 가리게 되므로 메뉴의 z-index 처리하여 위로 올라오게 한다.
<br />

---

이제 캔버스를 세팅했으니 그림을 그릴 차례이다. 캔버스에 이미지를 그리기 위해서는, '이미지 정보 입력 -> 이미지 세팅 -> 그리기' 순서로 처리해야 한다.
<br />

---

##### 1. 이미지 정보 입력

우선 캔버스에서 그려질 이미지를, 애니메이션 정보를 모은 sceneInfo 배열에 넣는다.

```javascript
objs: {
        ...
        canvas : document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages : [] // push메소드를 이용해 이미지 시퀀스들을 여기에 넣음.
    },
    values: {
        videoImageCount: 300,
        imageSequence : [0, 299],
        ...
    }
```

우선 objs에 애니메이션에 사용할 html 객체를 넣는다. (canvas, context, vedioImages) 그리고 values에는 css처리를 위해 이미지의 갯수와 이미지의 순서값의 변화[초기값, 최종값]를 넣는다.

<br />

---

##### 2. 이미지 세팅

이제 이미지를 세팅할 차례다. 함수를 이용해 videoImages 배열에 이미지 객체들을 넣어보자.

```javascript
function setCanvasImages() {
  // 캔버스에 그릴 이미지를 여기에 세팅
  for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {}
}
```

변수를 하나 만들어서 이미지 객체를 만들자. 이미지 객체를 생성후 for문을 돌려 이미지 소스들을 객체의 src 프로퍼티에 넣는다. 그리고 이 이미지 객체들을 videoImages 배열에 넣는다.

```javascript
function setCanvasImages() {
  let imgElem;
  for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `../video/001/IMG_${6726 + i}.JPG`;
    sceneInfo[0].objs.videoImages.push(imgElem);
  }
}

setCanvasImages();
```

배열에 이미지 객체를 넣은 이유는, 캔버스에서 이미지를 그릴 때 갖다 쓰려고 배열에 넣음. 이제 이미지를 세팅했으니 그림을 그리는 것은 playAnimation 함수에서 한다.
<br />

---

##### 3. 이미지 그리기 - 1

텍스트 효과는 특정 구간에 따라 등장하기 때문에 if(scrollRatio <= 0.22) 라고 조건을 걸어야했지만 비디오는 현재씬이 시작해서 끝날 때까지 쭉 이어지므로 따로 구간에 대한 조건을 걸 필요 없다. 그래서 values에서도 start와 end값의 정보가 있는 2번째 인덱스 없이 [0, 299]만 넣은 것.

이제 values의 imageSequence를 이용하여 똑같이 calcValues 함수에서 계산해서 애니메이션 적용한다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        // 여기에 canvas 관련 내용 삽입
        case 0:
            if (scrollRatio <= 0.22) {
                //in
            } else {
                //out
            }
            break;
```

(이어서)
