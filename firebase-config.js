// ===================== Firebase 設定 =====================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBFb3KnTBNJRk2gXYR-L8YjuL4f6H8hXl4",
  authDomain: "interview-for-system.firebaseapp.com",
  databaseURL: "https://interview-for-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "interview-for-system",
  storageBucket: "interview-for-system.firebasestorage.app",
  messagingSenderId: "405444605375",
  appId: "1:405444605375:web:e112b7006732d6ab251d0a"
};

// ===================== 老師資料 =====================
const TEACHERS = {
  "7665": { name: "黃祥熙", room: "CM316", type: "interview", label: "面試老師" },
  "7668": { name: "陳慧萍", room: "CM316", type: "interview", label: "面試老師" },
  "7663": { name: "蔡登茂", room: "CM216", type: "practical", label: "術科老師" },
  "7709": { name: "吳繼澄", room: "CM216", type: "practical", label: "術科老師" },
  "7772": { name: "洪宗乾", room: "CM214", type: "practical", label: "術科老師" },
  "7987": { name: "黃育信", room: "CM214", type: "practical", label: "術科老師" },
  "7673": { name: "何正斌", room: "CM212", type: "practical", label: "術科老師" },
  "7661": { name: "徐彬偉", room: "CM212", type: "practical", label: "術科老師" },
  // 管理員密碼已移至 Firebase teachers 節點，請在管理後台新增 type=admin 的帳號
};

const PRACTICAL_ROOMS = ["CM216", "CM214", "CM212"];

// ===================== 共用搜尋函式 =====================
// 輸入純數字時：精確比對序號末三碼（002 只匹配末三碼恰為 002 的考生）
// 輸入文字時：姓名模糊搜尋
function matchSearch(c, q) {
  if (!q) return true;
  q = q.trim();
  const nameMatch = (c.name || '').toLowerCase().includes(q.toLowerCase());
  const regStr = String(c.regNo || '');
  let regMatch = false;
  if (/^\d+$/.test(q)) {
    regMatch = regStr.slice(-q.length) === q && regStr.length >= q.length;
  } else {
    regMatch = regStr.includes(q);
  }
  return nameMatch || regMatch;
}

// ===================== 導覽列 CSS =====================
const NAV_CSS = `
  .sys-nav{background:#010409;border-bottom:1px solid #21262d;position:sticky;top:0;z-index:999;font-family:'Noto Sans TC',sans-serif}
  .sys-nav-inner{max-width:1200px;margin:0 auto;padding:0 16px;display:flex;align-items:center;height:46px}
  .sys-nav-logo{font-size:13px;font-weight:700;color:#58a6ff;padding-right:12px;border-right:1px solid #30363d;margin-right:10px;white-space:nowrap;text-decoration:none}
  .sys-nav-links{display:flex;gap:2px;flex:1;overflow-x:auto;scrollbar-width:none}
  .sys-nav-links::-webkit-scrollbar{display:none}
  .sys-nav-link{color:#8b949e;text-decoration:none;font-size:12px;padding:5px 9px;border-radius:6px;white-space:nowrap;transition:.12s}
  .sys-nav-link:hover{color:#e6edf3;background:#161b22}
  .sys-nav-link.active{color:#e6edf3;background:#161b22;font-weight:600}
  .sys-nav-right{display:flex;align-items:center;gap:8px;margin-left:8px;flex-shrink:0}
  .sys-nav-dot{width:6px;height:6px;border-radius:50%;background:#3fb950;display:inline-block;animation:navdot 2s infinite}
  @keyframes navdot{0%,100%{opacity:1}50%{opacity:.3}}
  .sys-nav-user{font-size:11px;color:#8b949e;white-space:nowrap}
  .sys-nav-logout{background:transparent;border:1px solid #30363d;color:#8b949e;border-radius:6px;padding:3px 10px;font-size:11px;cursor:pointer;transition:.12s;font-family:inherit}
  .sys-nav-logout:hover{border-color:#f85149;color:#f85149}
`;

// ===================== 導覽列產生器 =====================
function buildNav(currentPage, userName, logoutFn) {
  const p = location.pathname;
  const base = location.origin + p.substring(0, p.lastIndexOf('/') + 1);
  const pages = [
    { id: 'index',          label: '🏠 管理後台', href: base + 'index.html' },
    { id: 'interview-scan', label: '🎤 面試掃碼', href: base + 'interview-scan.html' },
    { id: 'scan',           label: '📱 術科掃碼', href: base + 'scan.html' },
    { id: 'interview',      label: '🎤 面試評分', href: base + 'interview.html' },
    { id: 'practical',      label: '✏️ 術科評分', href: base + 'practical.html' },
    { id: 'results',        label: '📊 成績總表', href: base + 'results.html' },
  ];
  const links = pages.map(pg =>
    `<a href="${pg.href}" class="sys-nav-link${pg.id === currentPage ? ' active' : ''}">${pg.label}</a>`
  ).join('');
  return `<nav class="sys-nav"><div class="sys-nav-inner">
    <a href="${base}index.html" class="sys-nav-logo">評分系統</a>
    <div class="sys-nav-links">${links}</div>
    <div class="sys-nav-right">
      <span class="sys-nav-dot"></span>
      ${userName ? `<span class="sys-nav-user">${userName}</span>` : ''}
      ${logoutFn ? `<button class="sys-nav-logout" onclick="${logoutFn}">登出</button>` : ''}
    </div>
  </div></nav>`;
}
