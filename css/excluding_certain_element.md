##### 특정 요소만 제외하고 싶을 때

```html
<div class="local-nav-links">
  <a href="#" class="product-name">AirMug Pro</a>
  <a href="#">개요</a>
  <a href="#">제품사양</a>
  <a href="#">구입하기</a>
</div>
```

```css
.local-nav-links a:not(.product-name) {
  margin-left: 2em;
  font-size: 0.8rem;
}
```

.product-name을 제외한 모든 a에 css 처리를 하고 싶다면, :not()를 쓴다.
<br/>
(참고 : 1분코딩 애플 클론 강좌 '메뉴 스타일링2' 편, 5:06 ~)
