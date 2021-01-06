### 강의 정리 - 202. 고화질 비디오 부드럽게 처리하기 1

<br />

프레임 이미지를 이용한 비디오 처리 방법.

```html
<body class="before-load">
	<img class="sample-img" src="../video/002/IMG_7027.JPG">
  ...
  <script>
```

화면 첫 로드시 이미지가 보여야 하니 우선 첫번째 이미지를 미리 깔고 시작

```javascript
const imgElem = document.querySelector('.sample-img');
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

이미지 객체를 생성(imgElem)한 다음 소스를 불러온다.
그리고 이걸 push() 이용해서 videoImages 배열에 넣어준다.

\*/ push 메서드 :
push() 메서드는 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환.

[Array.prototype.push()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

<br />
``` javascript
function init() {
    document.body.classList.remove('before-load');

    window.addEventListener('scroll', function () {
        progress = pageYOffset / (document.body.offsetHeight - window.innerHeight);
        if (progress < 0) progress = 0; // 스크롤 위치가 마이너스일 때를 방지
        if (progress > 1) progress = 1;

        ...
        });
    });

}

window.addEventListener('load', init);
setImages();

```


```
