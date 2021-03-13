### 강의 정리 - 101. 캔버스 라이브 강좌 1

<br />

```html
<style>
.canvas {
    width: 500px;
    height: 300px;
    background: #eee;
}

<body>
    <canvas class="canvas" width="500" height="300"></canvas>
    <canvas class="canvas canvas2" width="1000" height="600"></canvas>

<script>
    const canvas = document.querySelector('.canvas');
    const canvas2 = document.querySelector('.canvas2');
    const context = canvas.getContext('2d');
    const context2 = canvas2.getContext('2d');

    context.arc(100, 100, 50, 0, Math.PI*2, false);
    context2.arc(100, 100, 50, 0, Math.PI*2, false);
    context.fill();
    context2.fill();
</style>
</body>
```

<br >

![canvas01](https://user-images.githubusercontent.com/75867748/103007356-9ac52180-4576-11eb-94e9-25753f5efa6f.png)

1번은 원래 사이즈, 2번은 캔버스 사이즈를 2배로 한 다음, css를 통해 억지로 1배 사이즈로 줄인 것이다. 따라서 위치가 다르다.

고해상도의 이미지를 원하는 경우, 캔버스의 크기를 윈도우 크기의 2배로 한 다음, css를 통해 100%로 줄이면 된다. 대신 계산이 복잡해져 성능이 떨어진다.

---

##### canvas에 도형 그리기

```html
<style>
  canvas {
    background: #eee;
  }
</style>

<body>
  <script>
    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');

    // 시작점, width, height
    context.fillRect(50, 50, 100, 100);
    // css (색상 등)
    context.fillStyle = '#ff0000';
    context.fillRect(0, 0, 100, 100); // 여기에만 색상 적용
  </script>
</body>
```

<br >
직선 그리기

```html
<script>
  const canvas = document.querySelector('.canvas');
  const context = canvas.getContext('2d');
  context.beginPath(); // 패스 만들기
  context.moveTo(100, 100); // 점 찍을 위치로 이동
  context.lineTo(300, 200); // 선을 그을 위치
  context.stroke(); // 선 그려짐
  context.closePath(); // 작성 끝나면 닫아주기 //
  context.fill(); // 색 채우기 (면일 경우)
</script>
```

<br >

호 그리기

```html
<script>
  const canvas = document.querySelector('.canvas');
  const context = canvas.getContext('2d');
  // 중심점 위치 x, y, 반지름 길이, 시작각도, 끝각도
  context.arc(300, 200, 50, 0, 360);
</script>
```

1라디안 = 180도
