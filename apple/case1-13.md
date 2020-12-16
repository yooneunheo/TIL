### 강의 정리 - 자잘한 수정사항들 처리

<br />

##### type에 대한 처리

우선 setLayout. 각 스크롤 섹션의 높이를 세팅하는 함수였는데 타입이 normal인 경우, 처리할 애니메이션이 없기 때문에 스크롤을 임의로 높게 잡을 필요가 없다. 그래서 원래 자기 사이즈만큼 스크롤 가지게 해준다.

```javascript
for (let i = 0; i < sceneInfo.length; i++) {
  if (sceneInfo[i].type === 'sticky') {
    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
  } else if (sceneInfo[i].type === 'normal') {
    sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
  }
  sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
}
```

\*\* offset이란?
offsetHeight는 html 객체가 원래 가지고 있는 속성으로, 높이값이다.
[scrollHeight, clientHeight, offsetHeight 각각의 의미](https://jwizard.tistory.com/10)

---

<br />

##### 변수 처리 수정

```javascript
switch (currentScene) {
    case 0:
        // let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
        // let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
        // let messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
        // let messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
        if (scrollRatio <= 0.22) {
            // in
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
            objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
        } else {
            // out
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
            objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
        }

        break;
```

case 0이라 해놓고 모든 계산을 구해놓음. 근데 scrollRatio가 0.22인 것을 기준으로 어떨 때는 in을 쓰고 아니면 out을 쓰는데 굳이 모든 것을 다 구해놓을 필요가 있을까? 약간의 연산을 줄이기 위해 쓸 거만 계산하도록 만든다.
