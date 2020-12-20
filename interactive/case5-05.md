### 강의 정리 - 505. 이벤트 위임 보강 영상

<br />

html >>

```html
<div class="menu">
  <button class="menu-btn">
    <img class="icon" src="#" />
    <span class="btn-label">일분이 1</span>
  </button>
  <button class="menu-btn">
    <img class="icon" src="#" />
    <span class="btn-label">일분이 2</span>
  </button>
  <button class="menu-btn">
    <img class="icon" src="#" />
    <span class="btn-label">일분이 3</span>
  </button>
</div>
```

js >>

```javascript
const menu = document.querySelector('.menu');

function clickHandler(e) {
  // e.target
}

menu.addEventListener('click', clickHandler);
```

버튼이 3개가 있다. 버튼마다 addEventListener 을 사용하면 성능이 떨어지므로 부모 menu에다가 addEvnentLister을 주고 거기서 제어를 할 것이다. e.target을 사용하면 클릭한 버튼에 제어가 가능하다. 하지만 엄밀하게 말하자면 버튼 부분에 이미지를 클릭하면 버튼의 이미지 부분만 선택될 것이고, span 부분을 클릭하면 버튼의 span 부분만 선택될 것이다. 그런데 우리는 버튼 전체가 선택되길 바란다.

그렇다면 어떻게 처리를 해야할까?
<br />

---

html을 약간 수정해보겠다. 'data-'는 사용자가 임의로 속성을 부여할 수 있게 해준다. 버튼에 'data-value' 를 넣어보자. 버튼을 클릭했을 때 data-value 를 체크해서 1인지 2인지 등을 판별할 수 있게 하겠다.

```html
<div class="menu">
  <button class="menu-btn" data-value="1">
    <img class="icon" src="#" />
    <span class="btn-label">일분이 1</span>
  </button>
  <button class="menu-btn" data-value="2">
    <img class="icon" src="#" />
    <span class="btn-label">일분이 2</span>
  </button>
  <button class="menu-btn" data-value="3">
    <img class="icon" src="#" />
    <span class="btn-label">일분이 3</span>
  </button>
</div>
```

'data-'는 getAttribute를 이용해 가져올 수 있다. e.target.getAttribute('data-value') 를 이용해 값을 가져오자. 그러면 문제가 생기는게, 버튼을 클릭했을 때는 정상적으로 1, 2, 3 이 출력되지만 버튼 속 이미지나 span을 클릭하면 null이 나온다. data-value를 넣지 않았기 때문이다.

일차원적인 해결 방법은 모든 요소에 일일이 'data-value'를 넣는 방법이다. 하지만 권장할 사항은 아니다.
<br />

---

다른 방법으로 2가지가 있다.

##### 1. css로 이벤트를 안 할 요소들에게 따로 세팅을 해준다.

- img 와 span이 click 이벤트를 받지 않게 한다

```
.btn img,
.btn span {
    pointer-events : none;
}
```

이렇게 하면 img나 span을 클릭해도 1, 2, 3이 찍힌다. 다만 주의할 점이 pointer-events를 사용하면 하위 요소도 target으로 잡을 수 없다.

<br />
##### 2. 자바스크립트로 타겟(현재 클릭된 요소)이 내가 원하는 요소(menu-btn)인지를 판별해서 처리
   - 지금 내가 어떤 요소를 클릭했는지 분석한 다음 내가 원하는 요소에 닿을 때까지 부모 요소를 판별
   - 예를 들어, 나는 btn을 클릭하기 바라는데 btn의 하위 요소가 클릭되면 btn에 닿을 때까지 그 클릭한 요소의 부모를 계속 타고 올라간다

```javascript
const menu = document.querySelector('.menu');

function clickHandler(e) {
  console.log(e.target.dataset);
}

menu.addEventListener('click', clickHandler);
```

3번째 버튼을 클릭하고 콘솔창을 확인하면 DOMStringMap {'value: 3'} 이 뜬다. '3'은 data-value="3"에서 나온 값이다. 다시 말해 속성이 value이고 속성값이 3인 dataset 객체가 생긴다. 이 말인 즉슨 e.target.getAttribute('data-value') 나 e.target.dataset.value나 똑같다는 의미이다. 물론 여전히 img 나 span을 누르면 null이 나온다.

일단 변수를 만들어서 target을 넣어준다. 그리고 변수가 내가 원하는 요소의 클래스를 가지고 있다면 그대로 클릭을 진행하고, 아니라면(하위 요소라면) 부모의 정보로 원하는 게 나올 때까지 계속 위로 올라가 찾는다.

그런데 menu-btn와 형제 관계거나 부모인 요소를 클릭할 경우에도, menu-btn의 클래스를 가진 부모를 찾을 때까지 계속 거슬러 올라 body까지 닿는 현상이 발생한다. 따라서 이를 방지하자. body일 때 종료하는 것으로 한다.

```javascript
const menu = document.querySelector('.menu');

function clickHandler(e) {
  let elem = e.target;
  // 클릭한 게 menu-btn의 하위 요소일 때
  while (!elem.classList.contains('menu-btn')) {
    elem = elem.parentNode;

    // 클릭한 게 menu-btn의 형제나 상위 요소일 때
    if (elem.nodeName === 'BODY') {
      elem = null; // 값을 비우고
      return; // 종료
    }
  }
}

menu.addEventListener('click', clickHandler);
```

nodeName 속성 자체가 태그 이름을 대문자로 갖고 있어서 body를 대문자로 써준다. 이제 이렇게 하면 하위 요소일 때는 menu-btn 까지 거슬로 올라와 제대로 menu-btn이 출력이 되고, 형제나 상위 요소를 클릭했을 때는 아무 일도 안 일어나게 된다.

<br />

---

이벤트 위임이 또 좋은 이유는, 자식 요소가 동적으로 생성될 때 자동으로 이벤트 처리가 되기 때문이다. 그냥 자식들을 감싸는 부모에 이벤트를 처리하면 자식들이 생성될 때마다 저절로 이벤트가 처리되기 때문에 자식들에게 일일이 처리를 할 필요가 없어 편리하다.

<br />

---

\*\* 참고 :
parentNode는 부모 엘리먼트를 의미하고,
nodeName은 태그 이름을 문자열로 갖고 있는 속성이에요.

<section class="a">
    <p class="b">Lorem ipsum</p>
</section>
이런 코드가 있다면,
.b 문단의 parentNode는 .a 섹션이고,
.b 문단의 nodeName은 "P"가 되는거지요~
