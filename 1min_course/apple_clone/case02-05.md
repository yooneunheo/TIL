### 강의 정리 - 205. 비디오 인터랙션 적용 2

<br />
##### 3. 이미지 그리기 - 2
앞서 텍스트 애니메이션을 만들 때 calcValues 함수를 이용해 텍스트 효과 정보값을 계산한 것처럼 해주면 된다. 이미지 시퀀스값과 현재 스크롤 값을 넣어서 "정수"(사진 제목이 정수이므로)로 시퀀스 순서를 계산한다.

그리고 context 객체를 이용해 convas에 그림을 그리자. 첫번째 인자에는 지금 그릴 이미지 객체를 넣는다.

```javascript
function playAnimation() {
    ...
    switch (currentScene) {
        case 0:
            let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
            objs.context.drawImage(objs.videoImages[sequence], 0 , 0);

            if (scrollRatio <= 0.22) {
                //in
            } else {
                //out
            }
            break;
```
