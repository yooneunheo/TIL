### 강의 정리 - 스크롤 애니메이션 구현 3

<br />

```javascript
function calcValues(values, currentYOffset) {
  let rv;

  return rv;
}
```

나중에 playAnimation 함수에서 사용할 수 있도록 리턴시킬 값을 생성하자.
<br />

---

리턴되는 값 rv를 구하기 위해서는 다음과 같은 정보가 필요하다.

1. 현재씬에서의 스크롤 범위
2. css 변화값의 범위

첫째로 현재씬에서 스크롤 된 범위를 알아야 하는데 그냥 값보다는 '비율'로 하면 계산이 한결 수월해진다. 현재씬 스크롤값에 현재씬 전체의 높이를 나누면 현재 얼만큼 스크롤을 했는지 그 비율이 나온다.

```javascript
function calcValues(values, currentYOffset) {
  let rv;
  // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
  let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

  rv = scrollRatio * (values[1] - values[0]) + values[0];

  return rv;
}
```

현재씬의 스크롤 범위에다가 css 값의 범위를 곱한 값이 rv이다. 이렇게 하면 스크롤을 할 때 그에 맞는 css의 정보값이 계산된다.

예를 들어, values:{ messageA_opacity: [0, 1] } 일 때, css 변화값의 범위, 다시 말해 opacity의 범위가 0 ~ 1 이므로 절반쯤 스크롤 했을 때(0.5) css인 opacity값이 0.5가 된다.

또 다른 예로 x축으로 0에서 100으로 이동하는 css 범위, values: { messageA_translateX: [0, 100] } 를 현재 스크롤 범위와 곱했을 경우- 스크롤 비율이 10% 일 때는 x축으로 이동값이 10이고, 절반 왔을 시점(0.5)에는 50이다.

\* 참고:
랜덤한 숫자를 만들 때 '( Math.random() \_ ( 최대값 - 최소값 ) ) + 최소값' 이런 방식을 이용하는 것과 비슷하다고 생각하면 된다.

<br />

---

이제 css에 적용할 계산값을 구했으니 playAnimation 함수에 적용시키자. 0calcValues의 첫번째 매개변수에는 css 범위 정보를 넣는다.

```javascript
function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
        case 0:
            // 텍스트 메시지가 fade_in(등장)할 때
            let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
            objs.messageA.style.opacity = messageA_opacity_in;
            break;
```

calcValues에서 계산된 값은 css의 투명도에 대한 '정보'이고 이걸 style에 실제 적용해야 비로소 애니메이션이 바뀐다.

<br />

---

이제 스크롤을 하면 점점 진해진다. 하지만 원본에서는 현재씬의 전체 범위에서 움직이는 게 아니라 중간에서부터 텍스트(애니메이션 요소)가 등장한다. 즉 전체 범위 내 어느 구체적인 시점 사이에서 움직이는데 이럴 땐 keyframe 개념을 이용해야 한다. 애니메이션에서 진행 중에 변화가 있는 지점을 keyframe이라고 한다. 예를 들어 첫번째 애니메이션 요소가 scrollRatio가 0.2일 때 등장해서 0.35일 때 사라진다던가 하는 방식으로 할 때 keyframe 이용.
