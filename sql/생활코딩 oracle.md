#### 06. 테이블 생성

![602](https://user-images.githubusercontent.com/75867748/107976067-539a6080-6ffc-11eb-944f-2c7a0c09c665.png)

<BR>

---

<BR>

#### 07. 행 추가

![603](https://user-images.githubusercontent.com/75867748/107976987-bc360d00-6ffd-11eb-980b-31afb411f43e.png)

- SYSDATE : 현재 시간
- COMMIT : 수정작업을 하면 꼭 입력해야

<BR>

---

<BR>

#### 08. SQL이란?

##### 장점

- 스프레드 시트는 행 추가에 한계가 있지만, 데이터 베이스에는 한계가 없음
- 데이터 처리 속도도 매우 빠름
- 명령어를 통해서 데이터 베이스를 제어할 수 있다

---

<BR>

#### 09-01. 행 읽기 - Select 문의 기본 형식

topic
![09](https://user-images.githubusercontent.com/75867748/107977829-21d6c900-6fff-11eb-8a27-596a1a5bb54e.png)

<br>

SELECT \* FROM topic

<br>

![09-1](https://user-images.githubusercontent.com/75867748/107978000-6a8e8200-6fff-11eb-9752-620bc92785d3.png)

<BR>

---

<BR>

#### 09-02. 행 읽기 - 행과 컬럼 제한하기

topic
![902](https://user-images.githubusercontent.com/75867748/107978423-146e0e80-7000-11eb-9ca9-2cdf68361bc5.png)

<br>

SELECT id, title, created FROM topic

<br>

![903](https://user-images.githubusercontent.com/75867748/107978572-60b94e80-7000-11eb-81c2-29c00610ec1f.png)

<br>

SELECT \* FROM topic WHERE id = 1;
: id가 1인 행만 출력

SELECT \* FROM topic WHERE id > 1;
: : id가 1 이상인 행 출력

...

---

<BR>

#### 09-03. 행 읽기 - 정렬과 페이징

SELECT \* FROM topic ORDER BY id DESC(↔ASC)
: id를 내림차순으로 해서 topic 테이블의 모든 자료를 출력

SELECT \* FROM topic ORDER BY title DESC(↔ASC)
: title을 알파벳 내림차순으로 모두 출력

SELECT \* FROM topic OFFSEST 1 ROWS
: 0번째 이후로 나오는 행들을 가져온다
(컴퓨터는 0부터 카운팅함. 0, 1, 2 중 1, 2만 가져옴)

SELECT \* FROM topic OFFSEST 2 ROWS
: 1번째 이후로 나오는 행들을 가져온다
(0, 1, 2 중 2만 가져옴)

SELECT \* FROM topic OFFSEST 0 ROWS FETCH NEXT 1 ROWS ONLY;
: 0번째 이후로 하나의 행만 가지고 온다
(0, 1, 2 중 1만 가져옴)

SELECT \* FROM topic OFFSEST 1 ROWS FETCH NEXT 1 ROWS ONLY;
: 1번째 이후로 하나의 행만 가지고 온다
(0, 1, 2 중 2만 가져옴)

<BR>

---

<BR>

#### 10. 행 수정

![10-3](https://user-images.githubusercontent.com/75867748/107981663-dc69ca00-7005-11eb-9485-c4f3a04a854c.png)

id가 3인 행에서 title과 description을 변경하고자 함.
(SQL Server -> MSSQL)

<bR>

UPDATE topic SET title = 'MSSQL', descript = 'MSSQL is..'
: 이렇게하면 topic 테이블의 모든 행에 업데이트 된다. UPDATE나 DELETE를 쓸 땐 반드시 where의 유무를 확인할 것. (+commit도 잊지말고 하기)

UPDATE topic SET title = 'MSSQL', descript = 'MSSQL is..' WHERE id = 3;
: ![10-2](https://user-images.githubusercontent.com/75867748/107981591-b3493980-7005-11eb-967e-3a50ed28e453.png)

<BR>

---

<BR>

#### 11. 행 삭제

DELETE FROM topic WHERE id = 3;
: id가 3인 행 삭제. UPDATE나 DELETE를 쓸 땐 반드시 where의 유무를 확인할 것. (+commit도 필수)

<BR>

---

<BR>

#### 12. PRIMARY KEY (기본키)

기본키를 설정할 때

- 처음부터 테이블 생성할 때 지정
- alter 명령을 통해 추가
  가급적 테이블 생성할 때부터 설정하는 게 좋음

<BR>

![12](https://user-images.githubusercontent.com/75867748/107983202-c578a700-7008-11eb-95fe-5f41ea452705.png)

- DROP TABLE : 테이블 자체를 지우기 (commit 필요 X)

<br>

![12-2](https://user-images.githubusercontent.com/75867748/107983542-5485bf00-7009-11eb-8b33-35fe4915eb6a.png)

- CONSTRAINT : 제약조건. 존재하지 않는 값만 넣도록 제약.
- PK_TOPIC : PRIMARY KEY의 고유 이름 (사용자 지정)
- PRIMARY KEY(id): id를 기본키로 지정함. 기본키를 가진 id는 유일무이한 값만 가진다.

<BR>

---

<BR>

#### 13. SEQUENCE

다음 행에 값을 추가할 때 시퀀스 이용하면, 오라클이 다음 행의 위치를 알아서 처리할 수 있다.

시퀀스를 통해 자동으로 PRIMARY KEY 값이 1씩 증가되게 만들 수 있다.

CREATE SEQUENCE SEQ_TOPIC(시퀀스 이름);

![13](https://user-images.githubusercontent.com/75867748/107985027-a1b76000-700c-11eb-8710-4e9817808c1a.png)

<BR>

SELECT SEQ_TOPIC.CURRVAL FROM topic;
: 시퀀스의 현재값을 알고 싶을 때. 단, 테이블에 있는 데이터 갯수만큼 반복해서 출력됨.

SELECT SEQ_TOPIC.CURRVAL FROM DUAL;
: 값을 하나만 받고 싶을 때

![13-2](https://user-images.githubusercontent.com/75867748/107987439-58b5da80-7011-11eb-8dcd-61c8b532a468.png)

<BR>

---

<BR>

#### 16-02. 테이블의 분해 조립 - 조립하기

![16-2](https://user-images.githubusercontent.com/75867748/107991572-40968900-701a-11eb-8ca3-f06c6b0eefaf.png)
