#### 1. Window 객체의 위치 및 크기 프로퍼티와 메소드

##### 1-1.윈도우 사이즈

- window.screen.width, height : 사용자의 모니터 사이즈
- window.screen.availWidth, availHeight : 작업 표시줄 제외한 모니터 사이즈
- window.outerWidth, outerHeight : 페이지를 넘어선 브라우저 전체 사이즈 (url, 탭 등 모두 포함)
- window.innerWidth, innerHeight : 웹페이지 + 스크롤
- document.documentElement.clientWidth, clientHeight : 순수 웹페이지(문서)만. 스크롤 제외
  <br />
  <br />
  > 참고 사이트  
  > [window ,document offset (프로퍼티와 메소드)](https://webclub.tistory.com/105?category=542066)

<br />
<br />

---

##### 1-2. 윈도우 좌표

- clientX, clientY : 현재 보이는 브라우저 화면을 기준
- pageX, pageY : 전체 문서의 원래 크기를 기준
- offsetX, offsetY : 이벤트 대상이 기준, 전체 문서 기준(스크롤 포함)
- screenX, screenY : 사용자의 모니터 화면 크기 기준
  <br />
  ![coor-01](https://user-images.githubusercontent.com/75867748/102371543-9ee6c180-4001-11eb-88a5-3b09cff9eeb9.png)
  ![coor-02](https://user-images.githubusercontent.com/75867748/102371547-9f7f5800-4001-11eb-8814-656223c9ee2c.png)
  ![coor-03](https://user-images.githubusercontent.com/75867748/102371548-9f7f5800-4001-11eb-97f7-248cf90b0b99.png)

  (출처: dreamcoding)
  <br />
  <br />

  > 참고 사이트
  > [clientX, offsetX, pageX, screenX의 차이](http://megaton111.cafe24.com/2016/11/29/clientx-offsetx-pagex-screenx%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90/) > [요소의 절대좌표 상대좌표 구하기](https://mommoo.tistory.com/85)

<br />
<br />

---

##### 1-3.윈도우 스크롤링

- scrollTo(posX, posY) : posX,posY 값으로 이동
- scrollBy(x,y) : 현재 위치에서 x,y 만큼씩 이동
- scrollIntoView() : 지정한 곳으로 이동
- ()안에 {}식으로 입력시, {behavior: 'smooth'} 입력 가능
  <br />
  <br />

---

#### 2. HTML Element 객체의 위치 및 크기 프로퍼티와 메소드

- offsetParent : offsetLeft, offsetTop의 기준이 되는 부모 엘리먼트
- offsetLeft, offsetTop : offsetParent(부모)를 기준으로 한 엘리먼트가 위치한 좌표
  <br/>
  <br/>

  > 참고사이트
  > [HTML Element 객체의 위치 및 크기 프로퍼티와 메소드](https://webclub.tistory.com/104?category=542066)

  <br />
  <br />

---

#### 3. 스크롤 거리 구하기

- document.documentElement.scrollTop, scrollLeft : x, y축 방향으로 스크롤한 거리
- document.body.scrollLeft, scrollTop : x. y 축 방향으로 스크롤한 거리
- window.pageXOffset, pageYOffset : x, y축 방향으로 스크롤한 거리
  <br/>
  <br/>

  > 참고사이트
  > [스크롤 거리 구하기](https://ju-note.tistory.com/14?category=778811)

  <br />
  <br />

---
