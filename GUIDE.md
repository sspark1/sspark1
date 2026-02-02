# OpenClaw 설치 및 사용 가이드

이 문서는 OpenClaw의 설치 및 사용 방법을 설명합니다. 현재 사용자 시스템에는 Docker가 설치되어 있지 않으며, Node.js는 설치되어 있습니다.

## 1. 환경 확인

- **Node.js**: 설치됨 (v25.5.0)
- **Docker**: **설치되지 않음** (OpenClaw 실행을 위해 권장됨)

## 2. 설치 방법 선택

OpenClaw를 실행하기 위해 두 가지 방법 중 하나를 선택할 수 있습니다. 가장 권장되는 방법은 Docker를 사용하는 것입니다.

### 방법 A: Docker 설치 후 실행 (권장)

OpenClaw는 복잡한 의존성을 가지고 샌드박스 환경에서 실행되므로 Docker를 사용하는 것이 가장 안정적입니다.

1.  **Docker Desktop 설치**:
    - [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)에서 Apple Silicon 또는 Intel 칩에 맞는 버전을 다운로드하여 설치합니다.
    - 설치 후 Docker 앱을 실행합니다.

2.  **OpenClaw 실행**:
    터미널에서 다음 명령어를 실행하여 설치 및 설정을 진행합니다.
    ```bash
    curl -fsSL https://openclaw.bot/install.sh | bash
    ```

### 방법 B: npm을 통한 설치 (Docker 없이 시도)

Docker 설치가 어려운 경우 `npm`을 통해 직접 설치할 수 있습니다.

1.  **OpenClaw CLI 전역 설치**:
    ```bash
    npm install -g openclaw@latest
    ```

2.  **설정 마법사 실행**:
    ```bash
    openclaw onboard --install-daemon
    ```



## 3. Google Gemini (OAuth) 설정

사용자는 Google 계정을 통해 Gemini 모델을 인증하고 사용할 수 있습니다.

1.  **OpenClaw 설정 시작**:
    - 터미널에서 다음 명령어를 실행하여 설정 마법사를 시작합니다.
    ```bash
    openclaw setup
    ```

2.  **AI Provider 선택**:
    - 메뉴에서 **Google**을 선택합니다.
    - 인증 방식으로 **Google Antigravity OAuth**를 사용합니다.
    - **주의**: "Antigravity version not supported" 오류가 발생할 수 있습니다.
    - **해결법**: `openclaw` 내부 파일의 `User-Agent`를 `antigravity/1.15.8` 이상으로 수정해야 합니다. (현재 설치는 수정 완료됨)
    - 만약 문제가 지속된다면 **Google Gemini API Key** 방식을 사용하세요.

3.  **모델 선택**:
    - 인증이 완료되면 사용 가능한 모델 목록이 표시됩니다.
    - 원하는 모델(예: `google-antigravity/gemini-3-pro-high`)을 선택합니다.



## 4. Discord 연동 설정

OpenClaw를 Discord 봇으로 연결하여 사용할 수 있습니다.

1.  **Discord 봇 생성 및 토큰 발급**:
    - [Discord Developer Portal](https://discord.com/developers/applications)에 접속하여 새 애플리케이션을 생성합니다.
    - **Bot** 메뉴에서 봇을 추가하고 **Token**을 복사해 둡니다. (이 토큰은 절대 유출되지 않도록 주의하세요)
    - **OAuth2** > **URL Generator**에서 `bot` 스코프를 선택하고, 필요한 권한(예: `Send Messages`, `Read Message History` 등)을 체크하여 초대 링크를 생성합니다.
    - 초대 링크를 통해 봇을 원하는 서버에 초대합니다.

2.  **OpenClaw 설정**:
    - OpenClaw 설치 과정(Onboarding Wizard)에서 메시징 채널 설정 시 **Discord**를 선택합니다.
    - 앞서 복사한 **Discord Bot Token**을 입력합니다.
    - 설치가 완료되면 봇이 온라인 상태가 되며, 해당 서버에서 OpenClaw와 대화할 수 있습니다.


## 5. 보안 강화 (Security Hardening) 하커 방지

해커의 침입을 방지하고 안전하게 OpenClaw를 운영하기 위한 필수 보안 설정을 안내합니다.

1.  **방화벽 설정 (Firewall)**:
    - 외부에서 불필요한 포트로 접속하지 못하도록 방화벽을 설정합니다.
    - OpenClaw 대시보드(기본 18789 포트)는 가급적 로컬 네트워크나 VPN을 통해서만 접근하도록 제한합니다.
    - 예시 (macOS): 설정 > 네트워크 > 방화벽 켜기

2.  **API 키 및 토큰 관리**:
    - `OPENCLAW_GATEWAY_TOKEN`, `DISCORD_BOT_TOKEN`, `ANTHROPIC_API_KEY` 등 모든 비밀 키는 절대 외부에 노출하지 않습니다.
    - GitHub 등에 코드를 올릴 때 `.env` 파일이 포함되지 않도록 `.gitignore`에 반드시 추가합니다.

3.  **권한 최소화 (Least Privilege)**:
    - Docker 컨테이너 실행 시 root 권한이 아닌 별도의 제한된 사용자로 실행하는 것이 좋습니다.
    - Discord 봇 권한 설정 시에도 관리자(Administrator) 권한보다는 필요한 권한(메시지 읽기/쓰기 등)만 부여합니다.

4.  **입력 데이터 검증**:
    - 해커가 프롬프트 인젝션(Prompt Injection) 공격을 시도할 수 있으므로, OpenClaw가 실행 가능한 도구(Tool)를 제한합니다.
    - 예: 시스템 명령어 실행(Shell execution) 등의 위험한 도구는 비활성화하거나 신중하게 사용합니다.

5.  **정기적인 업데이트**:
    - OpenClaw와 Docker, Ollama를 최신 버전으로 유지하여 보안 취약점을 패치합니다.

## 6. 소스 코드

OpenClaw의 소스 코드는 다음 경로에 클론되어 있습니다.
- 경로: `Projects/02_openclaw/openclaw`

추가적인 개발이나 기여를 원하시면 해당 폴더 내의 `README.md`를 참고하세요.

## 7. 문제 해결 및 패치 내역 (Troubleshooting & Patches)

안정적인 운영을 위해 다음 두 가지 시스템 패치가 적용되었습니다.

### 7.1. Google 인증 갱신 오류 해결 (Fixed)
- **증상**: 1시간마다 봇이 응답을 멈춤 (Token Expired)
- **원인**: 토큰 갱신 시 `User-Agent` 헤더 누락으로 Google 서버가 요청 차단
- **패치**: `openclaw` 내부 OAuth 모듈(`google-antigravity.js`)에 `User-Agent: antigravity/1.15.8` 헤더 강제 주입

### 7.2. Discord 연결 로그 안정화 (Fixed)
- **증상**: 로그에 `WebSocket connection closed (code 1005/1006)` 에러가 빈번하게 발생
- **원인**: 모바일 환경 등에서 인터넷 연결이 일시적으로 변경될 때 발생하는 자연스러운 현상이나, 로그가 너무 시끄러움
- **패치**: `gateway-logging.js`를 수정하여 1005, 1006 코드는 로그아웃하지 않고 조용히 재접속하도록 변경

---
**유지보수 참고**: `npm install -g openclaw`로 업데이트 시 위 패치 내용이 초기화될 수 있습니다. 문제 재발 시 동일하게 수정이 필요합니다.
