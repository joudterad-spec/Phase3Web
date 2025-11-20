document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");

    // لو ما فيه زر تغيير ثيم في الصفحة، نطلع بهدوء
    if (!btn) return;

    // استرجاع الثيم المحفوظ
    const savedTheme = localStorage.getItem("hujjah-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        btn.textContent = "ثيم فاتح";
    } else {
        // لايت هو الديفولت
        document.body.classList.remove("dark-theme");
        btn.textContent = "ثيم غامق";
    }

    // عند الضغط على الزر
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("hujjah-theme", "dark");
            btn.textContent = "ثيم فاتح";
        } else {
            localStorage.setItem("hujjah-theme", "light");
            btn.textContent = "ثيم غامق";
        }
    });
});

// =======================
// Back to top (محمي بشرط)
// =======================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// =======================
// real time clock (محمي بشرط)
// =======================
function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    let ampm = hours >= 12 ? "م" : "ص";
    hours = hours % 12 || 12;

    clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();
