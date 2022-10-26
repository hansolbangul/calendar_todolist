### 프로젝트 개요

본 프로젝트는 캘린더를 통해 to do list를 일정별로 관리하기 위해 제작된 웹 페이지 입니다.

### 프로젝트 실행하는 방식

npm install or npm install --legacy-peer-deps  => 필요한 패키지를 설치합니다.

npm run start => react 프로젝트를 오픈합니다. [http://localhost:3000](http://localhost:3000)

### 사용된 라이브러리

- typescript -> react 프로젝트에 type을 지정하여 좀 더 편리한 타입정의와 오류를 줄이기 위해 사용하였습니다.
- react-router-dom -> 페이지 이동, Link 태그를 사용하기 위해 사용하였습니다.
- recoil -> redux보다 hook 문법에 가깝고 편리하기에 일정관리 저장을 위해 사용하였습니다.
- recoil-persist -> 일정관리가 새로고침, 페이지 종료 시 삭제되는 것을 방지하기 위해 사용하였습니다. 해당 라이브러리를 사용하면 스토리지에 저장이 됩니다.
- styled-components -> 태그의 style을 설정하기 위해 사용하였습니다.
- react-icons -> 아이콘을 사용하기 위해 설치하였습니다.

### 간단한 기능 정리

본 페이지는 웹 환경에서 정상동작 합니다.
- 본 페이지는 반응형 웹으로 핸드폰에서도 정상동작합니다.

1. 본 페이지는 캘린더를 통해 일정관리를 할 수 있는 페이지로 왼쪽은 캘린더, 오른쪽은 일정으로 나뉘어져 있습니다.
2. 오른쪽 하단에 있는 달 모양을 통해 다크모드, 라이트모드로 전환할 수 있습니다.
3. 캘린더는 총 6줄로 되어 있으며, 앞에 빈 공간은 직전 달의 마지막 날, 뒤에 빈 공간은 다음달의 날 들을 보여줍니다.
4. 일정이 있는 날은 설정한 카테고리의 색상으로 된 동그라미가 캘린더 일자에 표시됩니다.
5. 캘린더를 선택 시 해당 날짜에 해당하는 일정을 오른쪽 화면을 통해 몰아볼 수 있습니다.
6. 오른쪽 리스트 상단의 < > 를 통해 연도, 월을 변경할 수 있습니다.
7. TODAY 에서 선택된 날의 일정을 확인할 수 있습니다.
8. 오른쪽 아래 + 버튼을 통해 신규 일정을 추가할 수 있습니다.
9. 생성된 일정은 recoil로 관리되며 로컬 스토리지에 저장됩니다.
10. 일정 리스트에 마우스를 대면 일정이 뒤집히며 수정, 삭제할 수 있는 버튼이 생성됩니다.
11. 수정 아이콘을 눌러 일정을 수정할 수 있습니다.
12. 삭제 아이콘을 눌러 일정을 삭제할 수 있습니다.

### 파일 설명

* src
  - component : 재사용할 필요성이 있는 파일들을 담는 폴더
    + AddModal.tsx : 일정 추가, 수정 시 사용되는 모달
    + Calendar.tsx : 캘린더 컴포넌트
    + Todo.tsx : 하나의 일정을 표현하는 컴포넌트
    + TodoList.tsx : 일정 리스트를 보여주는 컴포넌트
  - DB : 목업데이터를 저장하는 폴더
    + TodoDb.ts : 일정 목업 데이터 파일
    + TypeDb.js : 카테고리 목업 데이터 파일
  - eventBus : 이벤트 버스 소스를 저장하는 폴더
    + bus.js : 이벤트 버스 생성 코드 파일
  - nav : Header, Footer, Sidebar 등을 담는 폴더
    + FootToggle.tsx : 다크모드, 라이트모드 제공해주는 토글
  - routes : 페이지를 구성하는 파일들을 담는 폴더
    + Home.tsx : / 경로의 페이지
  - ts : 정의가 필요한 ts들을 담는 폴더
    + styled.ts : 자주 사용할 스타일 태그 저장 파일
    + interface.ts : 전역으로 사용할 타입을 지정해주는 파일
  - atoms.ts : recoil 설정 파일
  - styled.d.ts : theme의 타입을 지정해주는 파일
  - theme.ts : 다크모드, 라이트모드를 제공해주기 위해 색을 지정해주는 파일


### 간단한 이미지 [웹]

#### 전체화면 라이트 / 다크모드
<p align="center">
<img width="1840" alt="전체화면" src="https://user-images.githubusercontent.com/71314689/198047440-6cb62ad4-ca9a-4586-8807-d03a293c96e4.png">
<img width="1840" alt="전체화면 (다크)" src="https://user-images.githubusercontent.com/71314689/198047520-76159532-2933-4506-a358-1151e4d122e8.png">
</p>
  
#### 생성화면 라이트 / 다크
<p align="center">
<img width="599" alt="마우스 호버" src="https://user-images.githubusercontent.com/71314689/198047477-1caad2cc-0b29-427a-a6d7-4c6d34858012.png">
<img width="584" alt="마우스 호버 (다크)" src="https://user-images.githubusercontent.com/71314689/198047538-98b027ed-0859-41b4-b11a-9f2632e1f553.png">
</p>

#### 생성화면 라이트 / 다크
<p align="center">
<img width="1840" alt="생성화면" src="https://user-images.githubusercontent.com/71314689/198047490-bf5959b7-06a2-4af6-99df-109a07bb325e.png">
<img width="1840" alt="생성화면 (다크)" src="https://user-images.githubusercontent.com/71314689/198047556-f525f5e7-f6e4-4536-9940-66f8432d7ab3.png">
</p>

#### 수정화면 라이트 / 다크
<p align="center">
<img width="1840" alt="수정화면" src="https://user-images.githubusercontent.com/71314689/198047503-2dac8031-1773-4ab6-b704-ff3231de90a0.png">
<img width="1840" alt="수정화면 (다크)" src="https://user-images.githubusercontent.com/71314689/198047573-9fd7de79-6532-4de9-be2e-f8c1c9812f94.png">
</p>

