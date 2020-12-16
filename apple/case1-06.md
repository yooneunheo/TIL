### 강의 정리 - 현재 활성 씬 반영하기

<br />
css >>
```css
#show-scene-0 #scroll-section-0 .sticky-elem,
#show-scene-1 #scroll-section-1 .sticky-elem,
#show-scene-2 #scroll-section-2 .sticky-elem,
#show-scene-3 #scroll-section-3 .sticky-elem {
  display: block;
}
```

이렇게 각 씬에 해당하는 애니메이션만 보이도록 미리 css 처리를 해놨었다. 이제 자바스크립트를 통해 body에 #show-scene 이 옆에 붙게 처리를 해주자.

```javascript
function scrollLoop() {
    //활성화 시킬 씬의 번호 결정
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if( yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        currentScene++;
    }

    if( yOffset < prevScrollHeight) {
        if(currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
        currentScene--;
    }

    document.body.setAttribute('id'. `show-scene-${currentScene}`); //body에 id 붙여주기
}
```

이제 스크롤을 하면 다음과 같이 body 옆에 id가 붙는다.

![img](../img/apple_106-1.png)

그런데 지금은 스크롤 할 때마다 id가 갱신이 되는데, 원래라면 아래와 같이 코드가 작성되어야 한다. 스크롤 됐을 때마다가 아닌 scene이 바뀔 때마다 갱신이 되어야 하므로.

```javascript
function scrollLoop() {
  //활성화 시킬 씬의 번호 결정
  prevScrollHeight = 0;
  for (let i = 0; i < currentScene; i++) {
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }

  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    currentScene++;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (yOffset < prevScrollHeight) {
    if (currentScene === 0) return;
    currentScene--;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  // document.body.setAttribute('id', `show-scene-${currentScene}`);
}
```

하지만 지금 이렇게 바로 넣어버리면 다음과 같은 버그가 생긴다.

1. 처음 load됐을 때 body 옆에 아무것도 안 붙다가 '스크롤'을 해서 scene1까지 와야 비로소 옆에 id가 세팅됨 (load직후 scene0 일때는 id가 안 붙음)
2. 이전 글에서도 언급했듯이 f5를 누르면 body의 id가 제대로 인식되지 않음
   <br />

- 1번 버그의 원인은 currentscene이 바뀌었을 때(++, --) id가 붙도록 처리했기 때문에 첫 로드 직후의 0에는 id가 붙지 않는 것이다.
- 2번 버그의 원인은 이제까지는 'scroll을 했을 때'의 상황만 세팅했기 때문이다. 다시말해 scrollLoop()에서만 id 세팅을 작성했기 때문이다.
  <br/>

우선 버그 때문에 임시로 다시 코드를 되돌리자. 버그를 수정하고 나면 원래 자리에 넣을 것이다.

```javascript
function scrollLoop() {
  //활성화 시킬 씬의 번호 결정
  prevScrollHeight = 0;
  for (let i = 0; i < currentScene; i++) {
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }

  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    currentScene++;
    // document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (yOffset < prevScrollHeight) {
    if (currentScene === 0) return;
    currentScene--;
    // document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  document.body.setAttribute('id', `show-scene-${currentScene}`);
}
```

<br />
이제부터 문서가 load 됐을 때도 현재 스크롤 위치에 따라 id가 정확히 세팅되도록 만들어 주자.

---

setLayout() 은 레이아웃을 잡아주는(=각 스크롤 섹션의 높이 세팅) 함수이므로 여기서 잡아준다.
<br />
\*\* 여기서 정리

초기화 할 때 실행되는 setLayout은 currentScene이 정해지지 않은 상태에서 currentScene을 구하는 것이고,
스크롤 할 때마다 실행되는 scrollLoop는 현재 활성화된 currentScene 까지의 스크롤양(prevScrollHeight)을 기준으로 일정량의 스크롤이 지나갔을 때 currentScene을 +1 또는 -1 하는 것이다. 혼동하지 말자.

```javascript
function setLayout() {}
function scrollLoop() {}

window.addEventListener('resize', setLayout);
window.addEventListener('scroll', () => {
  yOffset = window.yOffset;
  scrollLoop();
});

setLayout();
```

우선 setLayout()은 현재 바로 호출되어 있는 상태이다. 그런데 이 함수는 문서와 css, 비디오 등 모든 것이 다 완료가 된 상태에서 실행되어야 의미 있으므로 window가 load 되었을 때 나타나도록 만들자. 그리고 resize 되어도 다시 레이아웃을 잡아주게 해주자.

```javascript
window.addEventListener('load', setLayout);
window.addEventListener('resize', setLayout);
```

<br />

---

자 이제 setLayout에서도 현재 스크롤 위치에 맞춰 currentScene 을 세팅해주는 걸로 하자. 그러기 위해선 setLayout에 currentScene을 자동으로 세팅하는 기능을 넣어야 한다.

totalScrollHeight 값을 구해 현재 스크롤 위치와 비교를 하여 currentScene을 세팅할 것이다.

<br />

![img](../img/apple_106-2.png)

현재씬이 2씬이라고 가정해보자. 지금 이 상태에서 새로고침을 누른다. 그러면 다시 load가 되면서 현재 스크롤 위치와 totalScrollHeight를 비교할 것이다. 일단 for문이 돌아가면서 차례로 0씬의 높이, 1씬의 높이를 차차 더해간다. 그런데 끝까지 더하는게 아니라 현재씬까지의 높이를 구해야 하므로 현재씬을 가리키는 i번째(이 예시에서는 i=2)에 for문을 빠져나와야 한다.

그렇다면 현재씬이 2씬인 경우는 언제일까? 바로 핑크색 박스(0~2씬의 스크롤 합)밑 부분이 초록색 선에 닿는 순간까지이다. 즉, 이 둘이 닿으면 씬2는 비로소 끝나게 된다. 다시 말해, 0~2번까지의 스크롤 합(핑크색)이 현재 스크롤(yOffset)보다 크거나 같을 때까지가 씬2가 현재씬이 되는 것이다. 이를 식으로 나타내면 'totalScrollHeight >= yOffset' 일 때 브레이크를 걸어 for문을 빠져나오고 i를 currentScene 값으로 넣어준다.

```javascript
function setLayout() {
    ...

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++ ) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
}
```

이렇게 하면 새로고침을 해도 body에 id가 제대로 세팅이 된다.

\*\* 참고로 pageYOffset은 동일한 것을 가리키는 변수 yOffset로 치환하였다. yOffset은 js파일 제일 상단에 0으로 초기화 되어있고 scroll 이벤트일 때 그 값을 정했기 때문에 setLayout에서도 yoffset의 값을 따로 지정해야한다. scrollLoop의 경우 이미 이벤트리스너로 들어가있어서 굳이 또 "yOffset = window.pageYOffset; " 할 필요가 없다.

```javascript
window.addEventListener('scroll', () => {
  yOffset = window.pageYOffset;
  scrollLoop();
});
```

<br />
자 이제 정상작동 되는 것을 확인했으니 scrollLoop()도 수정하자.

```javascript
function scrollLoop() {
  prevScrollHeight = 0;
  for (let i = 0; i < currentScene; i++) {
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }

  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    currentScene++;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (yOffset < prevScrollHeight) {
    if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
    currentScene--;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }
}
```
