document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const primaryNav = document.getElementById('primaryNav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            primaryNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const savedTheme = localStorage.getItem('kropla_theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeLabel.textContent = 'Tryb dzienny';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('kropla_theme', 'light');
            themeLabel.textContent = 'Tryb nocny';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('kropla_theme', 'dark');
            themeLabel.textContent = 'Tryb dzienny';
        }
    });

    const brewMethod = document.getElementById('brewMethod');
    const waterAmount = document.getElementById('waterAmount');
    const waterOutput = document.getElementById('waterOutput');
    const coffeeDose = document.getElementById('coffeeDose');
    const bloomWater = document.getElementById('bloomWater');
    const recTemp = document.getElementById('recTemp');
    const recGrind = document.getElementById('recGrind');

    function updateCalculator() {
        const ratioPer100ml = parseFloat(brewMethod.value);
        const water = parseInt(waterAmount.value, 10);
        const selectedOption = brewMethod.options[brewMethod.selectedIndex];

        const grams = ((water / 100) * ratioPer100ml).toFixed(1);
        const bloom = Math.round(grams * 3);

        waterOutput.textContent = `${water} ml`;
        coffeeDose.textContent = `${grams} g`;
        bloomWater.textContent = `${bloom} ml`;
        recTemp.textContent = selectedOption.getAttribute('data-temp');
        recGrind.textContent = selectedOption.getAttribute('data-grind');
    }

    brewMethod.addEventListener('change', updateCalculator);
    waterAmount.addEventListener('input', updateCalculator);

    const filterBtns = document.querySelectorAll('.filter-btn');
    const methodCards = document.querySelectorAll('.method-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            methodCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    const accTriggers = document.querySelectorAll('.accordion-trigger');

    accTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            const content = trigger.nextElementSibling;

            trigger.setAttribute('aria-expanded', String(!expanded));
            content.hidden = expanded;
        });
    });

    const recipeForm = document.getElementById('recipeForm');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formStatus.textContent = '';

        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Podaj swoje imię (minimum 2 znaki).';
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Wprowadź poprawny adres e-mail.';
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Wiadomość powinna zawierać minimum 10 znaków.';
            isValid = false;
        }

        if (isValid) {
            formStatus.style.color = 'var(--accent)';
            formStatus.textContent = `Dziękujemy, ${nameInput.value.trim()}! Twój przepis został zapisany.`;
            recipeForm.reset();
        }
    });

    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 450) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
