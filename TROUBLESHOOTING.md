# Lessons Learned / Troubleshooting (오답 노트)

> 에이전시·프로젝트 간 반복 실수 방지를 위한 버그 해결 기록

---

## Bug 1: Ghosting Caption (무한 증식 버그)

### 증상
- 이미지 캡션 입력 시 캡션 요소가 무한히 복제·증식되는 현상
- 에디터에서 글자 입력 시마다 캡션이 중복 삽입됨

### 원인
- `onChange` 핸들러에서 **DOM을 직접 조작**하면서 Quill의 Delta 엔진과 충돌
- Quill은 내부 Delta를 기반으로 콘텐츠를 관리하는데, 외부 DOM 조작이 이를 무시하고 덮어쓰면서 동기화 꼬임 발생

### 해결
- **React 상태와 Quill 업데이트를 분리**
- 캡션 입력은 **로컬 React state만** 업데이트 (`setImageTooltip`)
- 실제 DOM/Quill 반영은 **"적용" 버튼 클릭 또는 Enter 키** 시점에만 수행
- Quill API(`deleteText`, `insertText`) 또는 `editor.root.innerHTML` 동기화를 통해 일괄 반영

### 적용
- `components/PostEditor.tsx` — `handleTooltipCaptionChange`는 state만 업데이트, `applyCaption`에서 일괄 반영

---

## Bug 2: Keystroke Leakage (키보드 이벤트 누수)

### 증상
- 이미지 툴팁(Alt/Caption 입력) 내부에서 타이핑할 때 키 입력이 **하단 Quill 에디터로 새어 나감**
- 플로팅 툴팁 input에 포커스가 있어도 입력 문자가 Quill 본문에 삽입됨

### 원인
- React-Quill / Quill.js는 **document 레벨 또는 캡처 단계**에서 키보드 이벤트를 수신
- 따라서 개별 input에서 **버블 단계(bubble phase)** `e.stopPropagation()`만 적용하면, 이벤트가 이미 캡처 단계에서 Quill에게 도달한 뒤이므로 **차단 효과 없음**

### ❌ 실패한 접근 (v2.06)
- 각 `<input>` 태그에 `onKeyDown`, `onKeyPress`, `onPointerDown`의 **버블 단계** `stopPropagation` 적용
- **결과:** Quill의 전역 포커스 관리 및 캡처 단계 리스너가 이벤트를 먼저 가로채므로 **무효**

### ✅ 올바른 해결 — Capture Phase Hard Isolation (v2.07)
1. **캡처 단계 격리:** 툴팁 컨테이너 `<div>`에 `onKeyDownCapture`, `onKeyUpCapture`, `onKeyPressCapture`, `onPointerDownCapture`, `onMouseDownCapture` 핸들러를 등록하여 **캡처 단계에서 이벤트 전파를 즉시 차단**
2. **Quill blur 강제:** 툴팁 input의 `onFocus` 시 `quill.blur()`를 호출하여 에디터의 포커스 상태를 명시적으로 해제 → Quill이 키 입력을 자기 것으로 인식하는 것을 원천 차단
3. **적용 후 포커스 보호:** `applyCaption()` 실행 시에도 `editor.blur()`를 호출하여 DOM 동기화 직후 에디터가 포커스를 되찾아 커서가 점프하는 현상 방지

### 구조적 교훈
- React-Quill 위에 오버레이/팝오버를 띄울 때는 반드시 **캡처 단계**(onXxxCapture)에서 이벤트를 차단해야 함
- 버블 단계 stopPropagation은 Quill처럼 전역 이벤트 리스너를 사용하는 라이브러리에 **구조적으로 무효**
- 추가로 `quill.blur()`를 호출하여 에디터의 "활성 상태"를 끊어주는 것이 belt-and-suspenders 안전 장치

### 적용
- `components/PostEditor.tsx` — 툴팁 컨테이너 div에 Capture Phase 이벤트 핸들러, input에 onFocus blur 추가

---

## 참고: 유사 패턴 시 체크리스트

- [ ] **Quill/리치 에디터 위에 오버레이/팝오버가 있는가?** → 컨테이너에 **캡처 단계**(onXxxCapture) `stopPropagation` 적용. 버블 단계만으로는 부족!
- [ ] **에디터 콘텐츠를 DOM으로 직접 수정하는가?** → React state + Quill API로 일괄 반영
- [ ] **키보드 이벤트가 의도치 않은 컴포넌트로 전달되는가?** → 캡처 vs 버블 단계 확인, 전역 리스너 존재 여부 점검
- [ ] **팝오버 input에 포커스 시 에디터가 키를 가로채는가?** → `onFocus`에서 `editor.blur()` 호출

---

*최종 업데이트: 2026-02-27 (v2.07)*
