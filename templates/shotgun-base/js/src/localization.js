function userLocale() {
  if (window.global_locale !== undefined) {
    return window.global_locale;
  }
  var locale;
  if (typeof HelpCenter !== "undefined") {
    locale = HelpCenter.user.locale;
  }
  if (typeof locale === "undefined") {
    urlParts = window.location.href.split("/");
    if (urlParts[3] === "hc") {
      locale = urlParts[4].split("?")[0].split("#")[0];
    } else {
      locale = "en-us";
    }
  }
  window.global_locale = locale;
  return locale;
}

function baseURL() {
  var zdURL = "https://support.shotgunsoftware.com/hc/" + userLocale() + "/";
  return zdURL;
}

// localization strings
function i18n(key, locale) {
  var translations = {
    "actions": {
      "en-us": "Actions",
      "ja": "アクション",
      "ko": "액션",
      "zh-cn": "动作"
    },
    "automotive": {
      "en-us": "Automotive",
      "ja": "Automotive",
      "ko": "Automotive",
      "zh-cn": "Automotive" 
    },
    "client-priority": {
      "en-us": "Client Priority",
      "ja": "クライアントの優先順位",
      "ko": "클라이언트 우선순위",
      "zh-cn": "客户优先级"
    },
    "detailed-status": {
      "en-us": "Detailed Status",
      "ja": "詳細ステータス",
      "ko": "세부 상태",
      "zh-cn": "详细状态"
    },
    "enterprise": {
      "en-us": "Enterprise",
      "ja": "エンタープライズ",
      "ko": "엔터프라이즈",
      "zh-cn": "企业"
    },
    "faq": {
      "en-us": "FAQ",
      "ja": "FAQ",
      "ko": "FAQ",
      "zh-cn": "常见问题解答"
    },
    "find-anything": {
      "en-us": "Find anything (like tutorials, time logs, or task templates)",
      "ja": "検索語句を入力(チュートリアル、時間ログ、タスク テンプレートなど)",
      "ko": "원하는 항목 찾기(튜토리얼, 시간 로그, 태스크 템플릿 등)",
      "zh-cn": "查找任何内容（如教程、时间日志或任务模板）"
    },
    "follow-updates": {
      "en-us": "Follow Updates",
      "ja": "更新をフォロー",
      "ko": "업데이트 소식 팔로우",
      "zh-cn": "跟进更新"
    },
    "my-contributions": {
      "en-us": "My Contributions",
      "ja": "自分の投稿",
      "ko": "내 기여",
      "zh-cn": "我的文稿"
    },
    "my-follow-settings": {
      "en-us": "My Follow Settings",
      "ja": "マイ フォローの設定",
      "ko": "내 팔로우 설정",
      "zh-cn": "我的关注设置"
    },
    "my-requests": {
      "en-us": "My Requests",
      "ja": "マイ リクエスト",
      "ko": "내 요청",
      "zh-cn": "我的请求"
    },
    "organization-requests": {
      "en-us": "Organization Requests",
      "ja": "組織のリクエスト",
      "ko": "조직 요청",
      "zh-cn": "组织请求"
    },
    "search-requests": {
      "en-us": "Search Requests...",
      "ja": "リクエストを検索...",
      "ko": "요청 검색...",
      "zh-cn": "搜索请求..."
    },
    "sign-in": {
      "en-us": "Sign In",
      "ja": "サインイン",
      "ko": "로그인",
      "zh-cn": "登录"
    },
    "studio": {
      "en-us": "Studio",
      "ja": "スタジオ",
      "ko": "스튜디오",
      "zh-cn": "工作室 "
    },
    "submit-a-new-request": {
      "en-us": "Submit A New Request",
      "ja": "新しいリクエストを送信",
      "ko": "새 요청 제출",
      "zh-cn": "提交新的请求"
    },
    "submit-a-request": {
      "en-us": "Submit A Request",
      "ja": "リクエストを送信",
      "ko": "요청 제출",
      "zh-cn": "提交请求"
    },
    "tutorials": {
      "en-us": "Tutorials",
      "ja": "チュートリアル",
      "ko": "튜토리얼",
      "zh-cn": "教程"
    },
    "videos": {
      "en-us": "Videos",
      "ja": "ビデオ",
      "ko": "동영상",
      "zh-cn": "视频"
    }
  }

  if (locale === undefined) {
    locale = userLocale();
  }
  if (!(key in translations)) {
    console.log("Translation key not found: " + key);
    return "";
  }
  if (!(locale in translations[key])) {
    console.log("No " + [locale] + " key found for: " + key + ". Using English as default.");
    return translations[key]["en-us"];
  }
  return translations[key][locale];
}
