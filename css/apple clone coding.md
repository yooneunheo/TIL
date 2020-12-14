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
(참고 : '메뉴 스타일링2' 편, 5:06 ~)
<br/>
<br/>

---

##### rem과 em을 적절히 활용하는 법

```css
.local-nav-links a:not(.product-name) {
  margin-left: 2em;
  font-size: 0.8rem;
}
```

폰트 사이즈는 rem이나 vw을 사용하고 margin이나 line-height는 em으로 한다. 현재 설정한 자신의 폰트를 기준으로 em의 사이즈가 결정되기 때문이다. 만약 자신의 사이즈를 결정하지 못했다면 그 부모의 사이즈를 기준으로 한다.
<br/>
(참고 : '페이지 내용 css 작성1' 편, 11:30 ~)
<br/>
<br/>

---
