### 강의 정리 - 스크롤 애니메이션 구현 4

<br />

씬이 바뀌는 순간 투명도 값이 마이너스가 되는 현상 발견. 따라서 씬이 바뀌는 순간에는 애니메이션이 작동되지 않도록 처리하자. 그러면 currentscene ++이나 --를 관장하는 함수에서 처리하면 된다.

변수를 만들어서 true가 되면 새로운 씬에 들어간 순간이고 그 이후 스크롤 시에는 false 처리가 되게 하면 된다.

```javascript
let enterNewScene = false; // 새로운 scene이 시작된 순간 true

function scrollLoop() {
  enterNewScene = false; //스크롤 될 때마다 기본적으로는 false였다가
  prevScrollHeight = 0;
  for (let i = 0; i < currentScene; i++) {
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }

  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    enterNewScene = true; // 씬이 바뀐 순간은 true가 되게
    currentScene++;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (yOffset < prevScrollHeight) {
    enterNewScene = true; // 씬이 바뀐 순간은 true가 되게
    if (currentScene === 0) return;
    currentScene--;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }
  playAnimation();
}
```
