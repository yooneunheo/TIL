---
title: '2020-12-18'
excerpt: '강의 정리 - 308. 스크롤에 따른 캔버스 포지션 변경'
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

### 강의 정리 - 308. 스크롤에 따른 캔버스 포지션 변경

<br />

첫번째 이미지는 처음에 스크롤이 된다(position: static 상태) 그러다가 상단이 화면에 닿아 화면이 가득채워지게 되면 화면이 고정되면서 position이 fixed가 된다. 이는 sticky-elem이 되는 것과 같은 상태다. 따라서 이 때 sticky-elem 클래스를 붙여주면 된다. 여기서 스크롤을 더 하면 이제 두번째 이미지로 블랜드 된다. 그리고 이미지 블렌드가 끝나게 되면 두번째 이미지가 완전히 화면을 가득 채우게 된다. 그 다음 scale이 점점 줄어들다가 일정 크기에 멈추고 스크롤이 올라간다.

이를 단계로 정리해보자

1. 3번씬이 시작되면서 첫 번째 이미지가 점점 넓어져 full 이미지가 되기 직전
2. 첫 번째 이미지가 full이 되고 나서 이미지 블렌딩
3. 이미지 블렌딩이 끝나고 scale이 줄어들다가 멈추고 다시 스크롤 되기 직전

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        // step 변수 선언
        let step = 0
        ...
        /*
        if (캔버스가 브라우저 상단에 닿지 않았다면) {
            step = 1;
        } else {
            // 상단에 닿은 이후
            step = 2;
            // 이미지 블렌드

            //3번 스텝은 2번 스텝이 일어난 이후, 그러니까 캔버스 상단이 화면에 닿은 이후에 일어나므로 여기에서 처리
            if () {
                step = 3;
            }
        }

        */

```

우선 캔버스가 브라우저 상단에 닿지 않았다는 말은 흰색박스가 좌우로 사라지는 애니메이션이 끝나기 전과 같다. 다시 말해 스크롤 된 지점이 애니메이션이 끝나는 지점인 values.rectX[2].end에 아직 닿지 않았을 때의 시점이다. 이를 식으로 나타내면,

```javascript
if (scrollRatio < values.rect1x[2].end) {
  step = 1;
}
```

<br />

상단에 닿았다면 캔버스는 sticky-elem이 되야 한다. 없을 때는 클래스 제거

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

            if () {
                step = 3;
            }
        }
```

그런데 마지막 씬의 sticky-elem은 비디오 스크롤 때의 sticky-elem과 약간 다르니 따로 'sticky' 라는 클래스를 만들어서 사용하자.

css >>

```css
.image-blend-canvas.sticy {
  position: fixed;
  top: 0;
}
```

<br />
scale 때문에 top:0를 해도 위에 딱 붙지 않는다. 저번에 한 것처럼 조절된 캔버스의 위치를 기준으로 top 값을 지정하자.

![apple_308](https://user-images.githubusercontent.com/75867748/102593222-ea12e880-4157-11eb-8c94-0b94b9d41720.png)

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
