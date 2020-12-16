### 강의 정리 - 스크롤 애니메이션 구현 1

<br />
이제 스크롤 애니메이션을 구현할 차례이다.

그러기 위해서는 우선 애니메이션에 필요한 정보를 모아놓은 배열 sceneInfo에 접근해야 한다. 그 중 objs 속성에 우리가 조작할 DOM 객체들을 넣을 것이다. 우선 애니메이션이 들어갈 요소들을 js로 가져와야 된다. sticky-elem의 nth 순서로 가져와도 되지만, 클래스를 추가하여 a, b, c, d 이렇게 가져오겠다.
(클래스 명으로 사용하기 부적절하지 않느냐고 생각할 수 있겠지만, ".main-message.a" 이런 식으로 사용할 거라 괜찮음)

html>>

```html
<section class="scroll-section" id="scroll-section-0">
  <h1>AirMug Pro</h1>
  <div class="sticky-elem main-message a">
    <p>온전히 빠져들게 하는<br />최고급 세라믹</p>
  </div>
  <div class="sticky-elem main-message b">
    <p>주변 맛을 느끼게 해주는<br />주변 맛 허용 모드</p>
  </div>
  <div class="sticky-elem main-message c">
    <p>온종일 편안한<br />맞춤형 손잡이</p>
  </div>
  <div class="sticky-elem main-message d">
    <p>새롭게 입가를 찾아온 매혹</p>
  </div>
</section>
```

js>>

```javascript
const sceneInfo = [
    {
    // 0
    ...
    objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        }
    values: {}
    }
...
];
```

.main-message는 범용적으로 쓰이기 때문에 혹시나 중복될 것을 방지하기 위해 앞에 '#scroll-section-\*' 이라고 특정시킬 필요가 있다.
<br />

---

애니메이션으로 조작할 요소들을 html에서 가져왔다. 이제 이 요소들이 "<b>어느 시점(위치)에 등장하고 빠질지(애니, css)</b>"에 대한 정보를 처리할 차례이다. 이를 위해 다음과 같은 정보들이 필요하다.

1. 위치 : 하나의 씬 내에서 어느 구간에 각 애니메이션 요소를 배치할 지
2. 애니메이션(css) : 각 애니메이션 요소에 css로 어떻게 애니메이션 처리를 할지
   <br />

---

##### 1. 위치 처리

하나의 씬 안에 어느 구간에서 각 애니메이션 요소들이 배치되어야 할지를 세팅하기 전에 앞서 해야할 작업이 있다. 씬이 처음 시작될 때 애니메이션 요소도 함께 시작되면서 씬이 끝날 때 같이 끝나는 걸 우선 구현해야 한다.

애니메이션 요소들은 스크롤을 하면서 튀어나오므로 위치는 scroll과 연관되어 있고, scroll과 연관된 함수는 scrollLoop이므로 여기서 처리를 해야 한다. 그런데 scrollLoop가 너무 복잡해지니 위치 관련된 정보는 여기서 처리를 하고 애니메이션 처리를 하는 건 따로 함수를 만들자. 이제 애니메이션이 진행되는 건 playAnimation 함수에서 처리된다.

```javascript
function scrollLoop() {
  ...
  for () {}

  if () {}

  if () {}

  playAnimation();
}
```

원활한 성능을 위해, 애니메이션은 currentScene에 있는 것만 작동하도록 만들어야 된다. switch문을 사용하면 currentScene에 있는 애니메이션 요소들만 작동하게 된다.

```javascript
function playAnimation() {
    // 애니메이션 진행 함수
    switch (currentScene)
        case 0:
            break;

        case 1:
            break;

        case 2:
            break;

        case 3:
            break;
}
```

<br />

---

##### 2. 애니메이션 처리

다시 sceneInfo 배열로 돌아가보자. values에는 각 애니메이션 요소마다 어떤 css를 넣을지에 대한 정보값이 들어간다. 일단 들어갈 애니메이션은 다음과 같다.

1. 투명도 (opacity가 0에서 1로)
2. y축 위치 (아래서 위로 올라왔다가, 완전히 위로 올라가면서 사라짐)

```javascript
const sceneInfo = [
    {
        // 0
        ...
        values: {
            messageA_opacity: [0, 1]
        }
    },
```

opacity의 시작값은 0, 끝값은 1이다. css의 값변화에 대한 정보를 배열 형식으로 넣자. [시작값, 끝값]. 이를 통해 css를 제어할 것이다. 이제 css를 제어하는데 필요한 값들을 계산하는 함수를 만들어보자.
