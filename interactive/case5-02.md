### 강의 정리 - 502. this와 이벤트 객체

<br />

![responsive_502](https://user-images.githubusercontent.com/75867748/102685115-805f1100-4221-11eb-82ff-7ae56eeef93d.png)

html >>

```html
<div class="charaters">
  <div class="ilbuni"></div>
  <div class="ilbuni"></div>
  <div class="ilbuni"></div>
  <div class="ilbuni"></div>
</div>
```

javascript>>>

```javascript
function() {
    const characters = document.querySelector('.charaters');

    function clickHandler(e) {
        console.log(this);
        console.log(e.currentTarget);
        console.log(e.target);
    }

    characters.addEventListener('click', clickHandler);
```

this와 e.currentTarget일 때는 그 어떤 부분을 클릭해도 characters 박스가 출력된다. 이 둘은 '##.addEventListener()'에서 ##을 인식하기 때문이다. 만약 클릭한 캐릭터가 출력되게 하고 싶다면, e.target 을 사용한다.
