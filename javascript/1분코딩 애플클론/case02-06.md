### 강의 정리 - 206. 캔버스를 창 사이즈에 맞추기

<br />

캔버스 크기를 조정하는 방법은 두 가지이다.

1. 캔버스의 width, height를 스크립트로 조절
2. css로 scale을 조절

쉽고 성능에 도움되는 것은 2번이다. 애플에서도 이 방법을 차용한다. 캔버스 크기는 html에서 정한 것처럼 1920\*1080으로 고정되어 있고 scale로 조절.

<br />

---

화면을 꽉 채우기 위해, height를 100으로 하고 가로는 가운데 정렬을 하면 애플의 방식과 최대한 비슷해진다.

![apple_206](https://user-images.githubusercontent.com/75867748/102446908-3126ae00-4072-11eb-9c71-9963644e54ac.png)

캔버스의 크기 조절도 결국 레이아웃과 관련있고 이는 layout 함수가 관장하는 것이므로 여기서 처리를 한다.

```javascript
function setLayout() {
    ...
    sceneInfo[0].objs.canvas.style.transform = `scale(${})`;
}
```

<br />
${} 에는 비율이 들어가야 한다. 이제 비율을 계산해야 하는데 높이를 기준으로 잡기로 했으니 캔버스의 높이와 브라우저의 innerheight를 비교하면 된다.

```javascript
function setLayout() {
    ...
    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `scale(${heightRatio})`;
}
```

<br />

---

이제 크기를 맞췄으니 가운데 정렬과 함께 상단에 붙게 하면 된다.

그런데 사실 canvas는 이미 top: 0 이 되어 있다. 위로 안 붙는 이유는 scale 효과 때문이다. transform은 원래 자기 위치는 고정되어(차지하고) 있고 그 상태에서 자기 크기만 바뀌는 것이기 때문. 따라서 가로와 세로가 센터 정렬이 되도록 한다. canvas 자체의 top과 left를 50%로 한다음 translate 이용하여 -50%(자기크기의 절반만큼)씩 땡겨준다.

css >>

```
.sticky-elem-canvas {
    top : 0;
    height : 100%; //canvas의 top 위치가 올바르게 되려면 부모의 높이가 꽉 차야 하므로 (100vh도 가능)
}
.sticky-elem-canvas canvas {
    position : absolute;
    top: 50%;
    left: 50%;
}
```

javascript >>

```javascript
function setLayout() {
    ...
    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
}
```

<br />
