### 강의 정리 - 특정 타이밍 스크롤 애니메이션 적용하기

<br />

이제 스크롤 하면 사라지는 효과까지 적용해보자. 그냥 values를 추가만 하면 된다.

<br />
(변경 : messageA_opacty_in -> messageA_opacty_in)
```javascript
switch (currentScene) {
    case 0:
        let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
        objs.messageA.style.opacity = messageA_opacity_in;
        break;

````

``` javascript
values: {
        messageA_opacity_in : [0, 1, {start: 0.1, end: 0.2}],
        messageB_opacity_in : [0, 1, {start: 0.3, end: 0.4}],
        messageA_opacity_out : [1, 0, {start: 0.25, end: 0.3}],
    }
````

messageB 가 0.3일 때 나타나기 때문에 messageA가 사라질 땐 0.3.
그리고 0.2일 때 opacity가 완전히 1이 되고 한동안 유지하다가 0.25일 때 사라지기 시작하면서 0.3일 때 완전히 사라짐.

<br />

---

그런데 in일 때는 0.2 시점 이후부터 opacity를 1로 유지하라는 코드와, out일 때는 0.25 이후부터 opacity가 줄어드는 코드가 충돌하게 된다.
따라서 in의 범위에서는 in에 적용된 애니메이션이 등장하고 out의 범위에서는 out에 적용된 애니메이션이 등장하게 해야한다.

![img](../img/apple_112-1.png)

중간값인 0.22를 기준으로 그 전에는 in의 애니메이션이, 그 이후에는 out의 애니메이션이 적용되게 한다.

```javascript
function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    // 현재씬에서 얼마만큼 스크롤이 되었는지
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
        case 0:
            let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
            let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);

            if (scrollRatio <= 0.22) {
                // in
                objs.messageA.style.opacity = messageA_opacity_in;
            } else {
                // out
                objs.messageA.style.opacity = messageA_opacity_out;
            }

            break;
    }
```

<br />

---

이제 스크롤에 따른 opacity까지는 완성하였다. 이제 keyframe을 이용하여 y축 움직임에 대한 css를 추가하도록 하자.
살짝 아래에 있다가 위로 올라오니까 translateY 20%에서 0%으로 올라간다.
(기준은 자기 높이만큼.)

![img](../img/apple_112-2.png)

그리고 사라질 때는 위로 올라가니까 -20% 만큼 이동함.

```javascript
values: {
        messageA_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
        // messageB_opacity: [0, 1, {start: 0.3, end: 0.4}],
        messageA_translateY_in: [20, 0, {start: 0.1, end: 0.2}],

        messageA_opacity_out: [1, 0, {start: 0.25, end: 0.3}],
        messageA_translateY_out: [0, -20, {start: 0.25, end: 0.3}],
    }
```

```javascript
switch (currentScene) {
    case 0:
        let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
        let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
        let messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
        let messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);

        if (scrollRatio <= 0.22) {
            // in
            objs.messageA.style.opacity = messageA_opacity_in;
            objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else {
            // out
            objs.messageA.style.opacity = messageA_opacity_out;
            objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        }

        break;
```
