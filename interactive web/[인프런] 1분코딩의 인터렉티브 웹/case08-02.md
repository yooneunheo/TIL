### 강의 정리 - 802. 스크롤 위치에 따라 오브젝트 조작하기

<br />

![responsive_802](https://user-images.githubusercontent.com/75867748/102707878-22463280-42e2-11eb-80d5-6e3e50589ba9.png)

스크롤 하면 오브젝트가 움직이는 걸 구현해보자. 우선 캐릭터의 위치를 구해보자.

<br />
##### 브라우저로부터 오브젝트의 위치 구하기
```javascript
(function () {
  const outputElem = document.querySelector('.output');
  const ilbuniElem = document.querySelector('.ilbuni');

window.addEventListener('scroll', function () {
outputElem.innerHTML = ilbuniElem.offsetTop;
});
})();

````

offsetTop은 브라우저창에서 캐릭터가 떨어져있는 정도이다. 그런데 이 값은 처음 위치만 나타낸다. 스크롤될 때마다 캐릭터의 위치가 갱신되는 것을 알고싶다면,

``` javascript
outputElem.innerHTML = ilbuniElem.getBoundingClientRect().top;
````

이때 개발자도구를 열어서보면 다양한 게 있는데 x,y 와 top, left는 각각 값이 동일하다. 둘 중 아무거나 쓰면 되는데 ie에서는 top, left만 지원하므로 이걸 쓰자.

이제 스크롤을 할 때마다 값이 갱신된다.
<br />

---

##### 스크롤했을 때 캐릭터에 애니메이션 적용

이제 스크롤을 하면 캐릭터가 전체 화면의 1/4 위치에 고정되게 만들자.

```javascript
(function () {
    const outputElem = document.querySelector('.output');
    const ilbuniElem = document.querySelector('.ilbuni');

    function showValue() {
        let posY = ilbuniElem.getBoundingClientRect().top;
        outputElem.innerHTML = posY;

        if (posY < window.innerHeight * 0.2) {
            ilbuniElem.classList.add('zoom');
        } else {
            ilbuniElem.classList.remove('zoom');
        }
    }

    window.addEventListener('scroll', function(){
        showValue();
    });
    // showValue();  // 함수를 따로 만들었으니 이렇게 호출도 가능
)();
```
