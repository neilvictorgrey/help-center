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
      "zh-cn": "动作",
    },
    "client-priority": {
      "en-us": "Client Priority",
      "ja": "クライアントの優先順位",
      "zh-cn": "客户优先级",
    },
    "detailed-status": {
      "en-us": "Detailed Status",
      "ja": "詳細ステータス",
      "zh-cn": "详细状态",
    },
    "enterprise": {
      "en-us": "Enterprise",
      "ja": "エンタープライズ",
      "zh-cn": "企业"
    },
    "faq": {
      "en-us": "FAQ",
      "ja": "FAQ",
      "zh-cn": "常见问题解答"
    },
    "find-anything": {
      "en-us": "Find anything (like tutorials, time logs, or task templates)",
      "ja": "検索語句を入力(チュートリアル、時間ログ、タスク テンプレートなど)",
      "zh-cn": "查找任何内容（如教程、时间日志或任务模板）"
    },
    "follow-updates": {
      "en-us": "Follow Updates",
      "ja": "更新をフォロー",
      "zh-cn": "跟进更新"
    },
    "my-contributions": {
      "en-us": "My Contributions",
      "ja": "自分の投稿",
      "zh-cn": "我的文稿"
    },
    "my-follow-settings": {
      "en-us": "My Follow Settings",
      "ja": "マイ フォローの設定",
      "zh-cn": "我的关注设置"
    },
    "my-requests": {
      "en-us": "My Requests",
      "ja": "マイ リクエスト",
      "zh-cn": "我的请求"
    },
    "organization-requests": {
      "en-us": "Organization Requests",
      "ja": "組織のリクエスト",
      "zh-cn": "组织请求"
    },
    "search-requests": {
      "en-us": "Search Requests...",
      "ja": "リクエストを検索...",
      "zh-cn": "搜索请求..."
    },
    "sign-in": {
      "en-us": "Sign In",
      "ja": "サインイン",
      "zh-cn": "登录"
    },
    "studio": {
      "en-us": "Studio",
      "ja": "スタジオ",
      "zh-cn": "工作室 "
    },
    "submit-a-new-request": {
      "en-us": "Submit A New Request",
      "ja": "新しいリクエストを送信",
      "zh-cn": "提交新的请求"
    },
    "submit-a-request": {
      "en-us": "Submit A Request",
      "ja": "リクエストを送信",
      "zh-cn": "提交请求"
    },
    "tutorials": {
      "en-us": "Tutorials",
      "ja": "チュートリアル",
      "zh-cn": "教程"
    },
    "videos": {
      "en-us": "Videos",
      "ja": "ビデオ",
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
