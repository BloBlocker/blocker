(function () {
  var LANG_KEY = "blocker-lang";
  var THEME_KEY = "blocker-theme";
  var els = document.querySelectorAll("[data-en][data-ar]");
  var toggle = document.getElementById("langToggle");
  var themeToggle = document.getElementById("themeToggle");

  function setLang(lang) {
    var isAr = lang === "ar";
    els.forEach(function (el) {
      el.textContent = el.getAttribute("data-" + (isAr ? "ar" : "en"));
    });
    document.documentElement.lang = isAr ? "ar" : "en";
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    toggle.textContent = isAr ? "English" : "العربية";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function setTheme(theme) {
    var isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "Light" : "Dark";
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  var saved = null;
  var savedTheme = null;
  try {
    saved = localStorage.getItem(LANG_KEY);
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (e) {}

  var preferred = saved ||
    ((navigator.language || "en").toLowerCase().indexOf("ar") === 0 ? "ar" : "en");
  var preferredTheme = savedTheme ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  setLang(preferred);
  setTheme(preferredTheme);

  toggle.addEventListener("click", function () {
    setLang(document.documentElement.lang === "ar" ? "en" : "ar");
  });

  themeToggle.addEventListener("click", function () {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
})();