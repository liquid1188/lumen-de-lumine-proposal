(function () {
  // Mobile menu
  var t = document.querySelector(".nav-toggle"), n = document.getElementById("nav");
  if (t && n) {
    t.addEventListener("click", function () {
      var o = n.classList.toggle("open"); t.setAttribute("aria-expanded", o);
      document.body.style.overflow = o ? "hidden" : "";
    });
    n.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () {
      n.classList.remove("open"); t.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
    }); });
  }

  // Header turns solid after scrolling
  var hd = document.getElementById("siteHeader");
  var onScroll = function () { hd.classList.toggle("scrolled", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("in"); }); }

  // View desktop version toggle (mobile)
  var KEY = "forceDesktop", vp = document.querySelector('meta[name="viewport"]'), btn = document.getElementById("desktopToggle");
  function apply(on) {
    vp.setAttribute("content", on ? "width=1200" : "width=device-width, initial-scale=1");
    if (btn) btn.textContent = on ? btn.dataset.mobile : btn.dataset.desktop;
  }
  var on = false; try { on = localStorage.getItem(KEY) === "1"; } catch (e) {}
  apply(on);
  if (btn) { if (on) btn.style.display = "inline"; btn.addEventListener("click", function () {
    on = !on; try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {} apply(on); btn.style.display = "inline";
  }); }

  // Copy buttons (bank details)
  document.querySelectorAll(".copy").forEach(function (c) {
    c.addEventListener("click", function () {
      var el = document.querySelector(c.dataset.copy); if (!el || !navigator.clipboard) return;
      var label = c.textContent;
      navigator.clipboard.writeText(el.textContent.replace(/\s+/g, "")).then(function () {
        c.textContent = c.dataset.done; setTimeout(function () { c.textContent = label; }, 1600);
      });
    });
  });

  // Forms go to Web3Forms with the Foundation's own key. Until that key is set, they only show a notice.
  document.querySelectorAll("form.form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      var s = f.querySelector(".form-status"), b = f.querySelector("button[type=submit]");
      var key = f.querySelector('[name="access_key"]').value;
      if (!key || key.indexOf("YOUR-") === 0) { s.textContent = f.dataset.notConnected; return; }
      b.disabled = true; s.textContent = f.dataset.sending;
      fetch(f.action, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) })
        .then(function (res) { return res.json(); })
        .then(function (d) {
          if (d.success) { f.reset(); s.textContent = f.dataset.thanks; }
          else { s.textContent = d.message || f.dataset.error; }
          b.disabled = false;
        })
        .catch(function () { s.textContent = f.dataset.error; b.disabled = false; });
    });
  });
})();
