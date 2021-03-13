---
title: '2020-12-18'
excerpt: '강의 정리 - 311. 이미지 블렌딩 후 캔버스 스케일 조정하기'
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

### 강의 정리 - 311. 이미지 블렌딩 후 캔버스 스케일 조정하기

<br />
이미지 블렌드가 끝나고 나면 축소가 되면서 스크롤 되어 올라간다. 이제 이 단계를 해보자. 축소하는 것도 스크롤에 따라 움직이므로 calcValue 함수를 이용하자. 캔버스의 scale을 어떻게 조절할 것인지 계산을 해야한다.

일단은 sceneInfo에 캔버스 scale을 속성으로 만들자.

```javascript
    ...
    canvas_scale: [0, 0, {start: 0, end: 0}],
```

이제 자바스크립트로 값을 구할 것이다.

## <br />

scale이 축소되는 시점은 블렌드 처리가 끝난 직후이다. 즉, blendHeight의 end 시점보다 스크롤을 더 할 때.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        let step = 0
        ...
            if (scrollRatio > values.blendHeight[2].end) {
                // step = 3;
                // canvas의 scale 세팅
            }
        }
```

( ★★★★★ 이 부분 이해 안 감)
우선 초기값을 구해보자. 초기값일 때의 상태는,
![apple_311](https://user-images.githubusercontent.com/75867748/102613838-94016d80-4176-11eb-9242-c1bffcad6bf2.png)

인데 이때의 화면 비율은 앞에서 미리 구해놨다.

```
let canvasScaleRatio;
```

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        let step = 0
        ...
            if (scrollRatio > values.blendHeight[2].end) {
                values.canvas_scale[0] = canvasScaleRatio;
            }
        }
```

다음으로 최종값. 축소되는 최종 크기는 이렇다.

![apple_311-2](https://user-images.githubusercontent.com/75867748/102614706-0de62680-4178-11eb-96b9-41bb385844fc.png)

초기값보다 약간 작은 상태. 디자인적으로 만족스러울 만한 크기는 브라우저의 폭보다 작아야 됨. 즉, 캔버스 비율의 기준은 브라우저의 폭이 관여를 하게끔 해줘야 한다.

```
values.canvas_scale[1] = document.body.offsetWidth / objs.canvas.width;
```

아직도 만족스러울만큼 화면이 줄어들지 않았다. 비율을 줄이려면 분모를 크게 해서 값을 줄이자.

```
values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
```

<br />
<br />

이제 초기값과 최종값이 정해졌으니 start와 end를 구해보자.
start는 애니메이션이 시작될 시점.

```
values.canvas_scale[2].start = values.blendHeight[2].end;
```

end는, 위에서 blendHeight를 조종했을 때처럼 시작된(start) 이후로 얼마나 재생될지를 duration을 결정해준다.

```
values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;
```

이러면 씬 전체 스크롤 height의 20%의 구간 동안 재생이 된다.

<br />

위에 블렌드 되는 애니메이션까지 두 개를 합치면 총 40%. 즉, 이미지 블렌드 되고 축소되는 범위가 총 40%.
<br />

---

이제 지금까지 구한 값들을 이용해 calcValues 함수로 계산해서 캔버스에 적용해보자.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        let step = 0
        ...
            if (scrollRatio > values.blendHeight[2].end) {
                values.canvas_scale[0] = canvasScaleRatio;
                values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                values.canvas_scale[2].start = values.blendHeight[2].end;
                values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                // 캔버스 적용
                objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
            }
        }
```
