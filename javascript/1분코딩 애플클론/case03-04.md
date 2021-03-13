### 강의 정리 - 304. 좌우 흰색 영역 위치 및 크기 잡기

<br />

박스를 만들기 위해,

1. 화면에 핏된 캔버스 크기를 다시 구한 다음,
2. 여기에 맞는 innerheight값과 innerwidth 값을 구한다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...
        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const recalculateInnerWidth = window.innerWidth / canvasScaleRatio;
        const recalcualtedInnerheight = window.innerHeight / canvasScaleRatio;

        // 하얀 박스의 폭 : 화면의 15%
        const whiteRectWidth =  recalculateInnerWidth * 0.15;

        break;

    }
}
```

<br />

---

완성버전을 보면 흰색 박스가 화면 밖으로 사라진다. 즉 x위치가 옮겨진다. 스크롤 하면서 애니메이션(translateX)이 되는 것이므로 이것도 sceneInfo에 흰색 박스의 애니메이션 정보들을 배열에 넣어야 한다.

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
    values : {
        // 값을 세팅하지 않은 이유는 화면에 따라 변동되기 때문에 미리 알 수 없어서이다. 스크롤 할 때 계산됨
        rect1X : [0, 0, {start: 0, end: 0}],
        rect2X : [0, 0, {start: 0, end: 0}]
    }
    ...
```

<br />

---

이제 애니메이션을 위한 계산을 해보자.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...
        // rect1의 애니메이션 시작값
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        // rect1의 애니메이션 끝값
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
         // rect2의 애니메이션 시작값
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
         // rect2의 애니메이션 끝값
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
        ...
    }
}
```

<br />
##### 1. rect1의 애니메이션 시작값

![apple_304](https://user-images.githubusercontent.com/75867748/102474621-34cf2a80-409c-11eb-9d4a-34262ad6cc14.png)

첫번째 흰색 박스(왼쪽)는 노란색으로 표시한 지점에 있어야 한다. 그 지점을 구하는 방법은 다음과 같다. 원래 캔버스 width에서 핏된 캔버스 width를 빼고 이를 반으로 나누면 노란색으로 표시한, 흰색 박스를 배치시켜야 할 위치가 나온다.

다시 이해를 돕기 위해 그림을 그렸다. 위의 그림에 나온 모든 것들을 왼쪽으로 몰아 넣었다고 생각해보자. 캔버스의 넓이(빨간선) - 핏된 캔버스의 넓이(검은선) 이면 초록색 바탕 부분이 남는다. 이들을 반으로 나눈 넓이를 원래 캔버스 쪽으로 땡겨보자. 옮겨진 박스의 오른쪽 끝 부분(✔)이 우리가 구하고자 하는 width 부분이다.

![apple_304-2](https://user-images.githubusercontent.com/75867748/102474626-36005780-409c-11eb-8f46-06ba6e10ba5c.png)

이를 식으로 나타내면,
values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;

<br />
##### 2. rect1의 애니메이션 최종값

![apple_304-3](https://user-images.githubusercontent.com/75867748/102475417-2f261480-409d-11eb-9cae-a233b6e3edc8.png)

이제 모니터 바깥쪽으로 사라져야 한다. 흰색박스의 width만큼 이동하면 모니터에서 사라지게 된다.

이를 식으로 나타내면,
values.rect1X[1] = values.rect1X[0] - whiteRectWidth;

<br />
##### 3. rect2의 애니메이션 시작값

![apple_304-4](https://user-images.githubusercontent.com/75867748/102476177-23871d80-409e-11eb-8dc0-50a802b6cd8e.png)

rect1의 시작값 좌표에서 핏된 화면 width만큼 이동한다. 그리고 흰색박스의 width만큼 빼주면 구하고자 하는 위치(핑크)가 나온다.

이를 식으로 나타내면,
values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;

<br />
##### 4. rect2의 애니메이션 최종값

자기 폭만큼 이동하면 화면에서 사라진다.

이를 식으로 나타내면,
values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

<br />

---

이렇게 각 박스의 x좌표가 세팅되었다. 이제 이걸 이용해서 박스를 그려보자.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 3:
        ...
      // 좌우 흰색 박스 그리기 (x, y, width, height)
      // 현재 정지상태(추후 수정)
      objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), recalculatedInnerHeight);
      objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), recalculatedInnerHeight);
    }
}
```

parseInt 로 정수처리를 하면 캔버스 내에서 성능이 조금 더 좋아진다(옵션).

<br />
이제 박스가 양옆에 그려졌다. 색깔이 검은색인 건 디폴트값이어서 그렇다. 따로 흰색으로 처리하면 된다.
