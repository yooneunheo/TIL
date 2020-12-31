### 강의 정리 - 203. 고화질 비디오 부드럽게 처리하기 2

<br />
애플이 사용한 방식은 캔버스를 이용한 방식이다.

css >>

```css
.sample-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
```

ja >>

```javascript
<body class="before-load">
    <canvas class="sample-canvas" width="1920" height="1080"></canvas>
```

캔버스 사이즈가 1920\*1080 사이즈지만 css에서 width=100% 처리를 하였으므로 브라우저에 맞춰 조절이 된다.

```javascript
const videoImages = [];
let totalImagesCount = 960;
let progress;
let currentFrame;

function setImages() {
  for (let i = 0; i < totalImagesCount; i++) {
    let imgElem = new Image();
    imgElem.src = `../video/002/IMG_${7027 + i}.JPG`;
    videoImages.push(imgElem);
  }
}
```

변수 imgElem를 선언하고 이미지 객체를 생성한 다음 대입한다. 그리고 이미지들의 소스를 imgElem 소스에 대입한다. push() 이용해서 imgElem에 저장한 내용들을 videoImages 배열에 넣는다.

\*/ push 메서드 :
push() 메서드는 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환.
<br />

---

```javascript
function init() {
document.body.classList.remove('before-load');
context.drawImage(videoImages[0], 0, 0);
// 로드했을 때 화면에 첫번째 이미지가 보여야 하므로 이건 미리 그려주고 시작

    ...
    context.drawImage(videoImages[currentFrame], 0, 0);

}
...
```

context.drawImage를 이용하여 그림을 캔버스판에 그려준다
그림을 그릴 이미지 객체를 첫번째 인자로 넣어주고 각각 x좌표, y좌표를 넣어준다. 그 다음 인자로 width와 height를 지정할 수 있다.(옵션임)

```

```
