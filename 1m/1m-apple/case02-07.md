### 강의 정리 - 207. 첫번째 스크롤 섹션 마무리

<br />
이제 창 사이즈 조절까지 완료하였다. 하지만 load 됐을 때는 화면에 canvas가 뜨지 않을 것이다. 스크롤 시 애니메이션이 동작하는 것만 처리했기 때문이다. 그래서 스크롤 했을 때만이 아니라 처음 로드 됐을 때도 나타나도록 처리하자.

load 이벤트 핸들러에서 처리하면 되겠다.

```javascript
window.addEventListener('load', () => {
  setLayout();
  // 다른 초기화 작업
  sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
});
```

이제 로드하면 첫 장면(videoImages[0])이 그려지게 될 것이다.

<br />

---

그런데 스크롤을 하면 제일 첫 텍스트인 h1 이 사라진다.
왜냐하면 캔버스와 다른 텍스트 애니메이션들은 클래스가 sticky-elem이기 때문에 position:absolute이 적용되서 제대로 화면에 출력된다. 하지만 h1은 .sticky-elem이 아니라서 position이 디폴트값인 static 이다. 기본적으로 static은 absolute 보다 아래에 깔린다. 그래서 밀리는 것이다. z-index를 쓰려면 어쨌든 position이 static이면 안 되기 때문에 relative로 바꾼다. 굳이 위치 조정을 할 필요는 없어서 absolute는 안 쓴다.

css >>

```css
#scroll-section-0 h1 {
  position: relative;
  z-index: 5;
}
```

<br />

---

첫번째 스크롤 섹션이 끝날 때 캔버스가 부드럽게 사라진다. 이 처리를 해주도록 하자.

이것도 부분 애니메이션을 적용하여 캔버스의 opacity를 제어하자.

우선 애니메이션 정보를 넣어야 한다. sceneInfo에 캔버스의 opacity 값을 적용해주자.

```javascript
values: {
        videoImageCount: 300,
        imageSequence : [0, 299],
        canvas_opacity : [1, 0, {start: 0.9, end: 1}],
        ...
    }
},
```

이제 playAnimation 함수를 이용하여 실제 css 적용이 되도록 만들자.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 0:
            let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
            objs.context.drawImage(objs.videoImages[sequence], 0 , 0);
            objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

            if (scrollRatio <= 0.22) {
                //in
            } else {
                //out
            }
            break;
```
