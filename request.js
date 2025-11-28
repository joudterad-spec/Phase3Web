document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".my-form");
    const service = document.querySelector("select[name='service-type']");
    const nameInput = document.querySelector(".field-name input");
    const dateInput = document.querySelector(".field-date input");
    const descInput = document.querySelector("textarea");
    const container = document.getElementById("requests-container");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // التحقق من الخدمة
        if (service.value === "") {
            alert(" يرجى اختيار نوع الخدمة.❗");
            return;
        }

        // التحقق من الاسم
        const fullName = nameInput.value.trim();
        const nameRegex = /^[\u0600-\u06FF\s]{5,}$/;

        if (!nameRegex.test(fullName) || !fullName.includes(" ")) {
            alert(" يرجى إدخال الاسم الكامل بدون أرقام أو رموز.❗");
            return;
        }

        // التحقق من التاريخ
        if (dateInput.value === "") {
            alert(" يرجى اختيار تاريخ التنفيذ.❗");
            return;
        }

        const dueDate = new Date(dateInput.value);
        const today = new Date();
        const diff = (dueDate - today) / (1000 * 60 * 60 * 24);

        if (diff < 3) {
            alert("تاريخ التنفيذ قريب جداً. يجب أن يكون بعد 3 أيام على الأقل.❗");
            return;
        }

        // التحقق من الوصف
        if (descInput.value.trim().length < 100) {
       alert("يرجى كتابة وصف واضح ومفصل للطلب — الحد الأدنى 100 حرف.❗");

            return;
        }

        const stay = confirm("✓ تم إرسال الطلب بنجاح!\nهل ترغب بالبقاء في هذه الصفحة؟");

        if (!stay) {
            window.location.href = "customer-dashboard.html";
            return;
        }

        // إنشاء بطاقة الطلب
        const card = document.createElement("div");
        card.classList.add("request-card");

        card.innerHTML = `
            <h3>الخدمة: ${service.value}</h3>
            <p><strong>اسم العميل:</strong> ${fullName}</p>
            <p><strong>تاريخ التنفيذ:</strong> ${dateInput.value}</p>
            <div class="separator"></div>
            <p><strong>الوصف:</strong> ${descInput.value}</p>
        `;

        container.appendChild(card);

        form.reset();
    });

});
