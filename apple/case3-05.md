---
title: '2020-12-18'
excerpt: '강의 정리 - 305. 캔버스 드로우 애니메이션 1'
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

### 강의 정리 - 305. 캔버스 드로우 애니메이션 1

<br />
박스를 그렸으니 이제 애니메이션을 적용할 차례이다.

```javascript
const sceneInfo = [
  {
    // 3
   ...
    values : {
        // 값을 미리 세팅하지 않은 이유는 화면에 따라 변동되기 때문에 미리 알 수 없어서이다. 스크롤 할 때 계산됨
        rect1X : [0, 0, {start: 0, end: 0}],
        rect2X : [0, 0, {start: 0, end: 0}]
    }
    ...
```

애니메이션 시작값과 끝값은 이전 시간(304)에 구해놨다. 이제 타이밍을 구할 차례이다. 앞에서 말했듯이, 정확한 값을 미리 지정할 수 없기 때문에 values가 아닌 애니메이션이 구현되는 playAnimation 함수에서 정보값을 구해 구현해보도록 한다.

<br />
우선 애니메이션의 타이밍을 살펴보자. 3번씬이 시작하면 애니메이션이 시작되다가, 캔버스가 상단에 '정확히' 닿으면 박스들이 완전히 사라지면서 애니메이션도 끝나게 된다.

<br />우선 start되는 지점은 3번씬이 시작될 때로 할 것이다. 3번씬이 시작될 때는 3번씬의 padding-top이 상단에 닿았을 때이다. 그런데 실제 완성 파일에서는 3번씬이 되자마자 애니메이션이 바로 시작되는 게 아니라 약간 중간쯤 왔을 때부터 시작된다. 근데 지금은 복잡하니 나중에 적용시키고 일단은 3번씬이 시작되는 지점을 기준으로 잡겠다. 그러면 start: 0 이다.

<br /> end가 되는 지점은 캔버스가 상단에 닿았을 때이다. '정확히' 닿았을 때이다. 정확하게 닿지 않는다면 화면이 어긋나게 보일 수 있다. 그렇다면 이 시점을 어떻게 구해야 할까?

![apple_305](https://user-images.githubusercontent.com/75867748/102481246-ce023f00-40a4-11eb-9fe4-2bb4401e7e39.png)

3번씬 시작 지점부터 캔버스 시작 지점까지의 구간을 구한 다음(빨간 화살표), 3번씬 전체 구간에 대한 비율로 구해서 이걸 end 지점으로 삼으면 된다.

<br />
그렇다면 캔버스의 y축 좌표는 어떻게 구해야 할까?

<br />

---

일단 직관적으로 떠오르는 방법이 하나 있다.

\* getBoundingClientRect() : 화면에 있는 오브젝트의 크기와 위치를 가져올 수 있는 메소드.

이걸 이용해보자.

캔버스의 y값(혹은 top값)을 기준으로 하는데, 스크롤을 할 때마다 y값이 갱신되므로 값이 계속 바뀌어서 이를 기준으로 삼기에 무리가 있다. 애니메이션이 정확히 시작되는 시점을 설정하려면 처음에 얻었던 y값이 변하면 안 된다. 애니메이션이 처음에 시작될 때의 y위치 딱 하나만 가져오게 하자. 그리고 이 값이 보존되어야 하니 sceneInfo에 넣자.

```javascript
const sceneInfo = [
  {
    // 3
   ...
    values : {
        rect1X : [0, 0, {start: 0, end: 0}],
        rect2X : [0, 0, {start: 0, end: 0}],
        rectStartY : 0,
    }
    ...
```

rectStartY값을 일단 0으로 둔다. 그리고 나중에 계산이 되면은 대입한다. 앞에서 말했듯이 y위치는 처음에 나오는 값만 취하고 그 이후로는 취하면 안 되기 때문에, 값이 한번 입력되면 그 이후로는 갱신되어도 대입이 안 되게 설정을 해야 한다. 다시 말해, 값이 세팅이 안 됐을 때만 값이 들어가게 한다. 한번만 스크롤해도 값이 들어가니까 그 다음에는 세팅이 안 될 것이다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...

        if (!values.rectStartY) {
          values.rectStartY = objs.canvas.getBoundingClientRect().top;
        }
        ...

    }
}
```

그렇다면 이 값을 그대로 쓰면 될까? 안 된다. 스크롤 속도에 따라 찍히는 y값이 다르게 출력된다. 그 이유는 이 값은 정확한 타이밍에 캔버스 위치를 잡아내는 아이라 스크롤 이벤트가 발생하는 순간에 딱 집어낸다. 그래서 스크롤 속도에 따라 값이 변한다. 따라서 정확한 기준점으로 삼기에 무리가 있다.

그래도 일단 이걸 기준으로 계산을 해보겠다.
<br />

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...

        // 좌우 흰색 박스 그리기 (수정)
        objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
        objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);

    }
}
```

여기서 살펴볼 수 있는 또 다른 문제점은 스크롤바이다. 위에서 innerwidth를 이용해 화면 크기를 구했는데 크롬의 경우 스크롤바 영역을 따로 차지하고 있기 때문에 계산에 착오가 생긴다. innerwidth는 스크롤바까지 포함한 영역이다. 하지만 현재 스크롤 바가 영향을 미치고 있기 때문에 스크롤 바를 제외한 폭을 구하는게 맞다. 따라서 innerwidth대신 offsetWidth로 바꾸자.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...
        // 캔버스 사이즈에 맞춰 가정한 화면 폭
        const recalculateInnerWidth = window.offsetWidth / canvasScaleRatio;
        const recalcualtedInnerheight = window.innerHeight / canvasScaleRatio;
        ...
    }
}
```

아무튼 스크롤 속도에 따라 top 인식이 달라진다. 결론은 getBoundingClinentRect()의 top값을 가져오지 않을 것이다. 다른 방법을 찾아보자.
