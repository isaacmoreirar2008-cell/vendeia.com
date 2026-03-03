// auth.js

// Capturar parâmetro ?plan=...
const params = new URLSearchParams(window.location.search);
const plan = params.get('plan') || 'starter'; // padrão starter

// Mostrar plano no card
const planInfo = document.getElementById('planInfo');
if (planInfo) {
    const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
    planInfo.innerHTML = `Você está contratando o plano <strong>${planName}</strong>`;
}

// Controle de abas
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('tabLogin').classList.add('active');
    document.getElementById('tabRegister').classList.remove('active');
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('tabRegister').classList.add('active');
    document.getElementById('tabLogin').classList.remove('active');
}

// Verificar se há usuário logado (lembrar sempre)
window.addEventListener('load', function() {
    const remember = localStorage.getItem('vendeiaRemember');
    if (remember === 'true') {
        const user = JSON.parse(localStorage.getItem('vendeiaUser'));
        if (user && user.email) {
            // Preenche login automaticamente
            document.getElementById('loginEmail').value = user.email || '';
            document.getElementById('loginPassword').value = user.senha || '';
            document.getElementById('loginRemember').checked = true;
        }
    }
});

// Cadastro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const userData = {
        nomeCompleto: document.getElementById('regNome').value,
        email: document.getElementById('regEmail').value,
        senha: document.getElementById('regPassword').value,
        empresa: document.getElementById('regEmpresa').value,
        nicho: document.getElementById('regNicho').value,
        plano: plan
    };

    // Salva no localStorage
    localStorage.setItem('vendeiaUser', JSON.stringify(userData));

    // Lembrar sempre?
    if (document.getElementById('regRemember').checked) {
        localStorage.setItem('vendeiaRemember', 'true');
    } else {
        localStorage.removeItem('vendeiaRemember');
    }

    // Redireciona para dashboard
    window.location.href = 'dashboard.html';
});

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginPassword').value;
    const remember = document.getElementById('loginRemember').checked;

    const storedUser = localStorage.getItem('vendeiaUser');
    if (!storedUser) {
        document.getElementById('authError').innerText = 'Usuário não encontrado. Crie uma conta.';
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === email && user.senha === senha) {
        // Atualiza plano (caso venha da URL)
        user.plano = plan;
        localStorage.setItem('vendeiaUser', JSON.stringify(user));

        if (remember) {
            localStorage.setItem('vendeiaRemember', 'true');
        } else {
            localStorage.removeItem('vendeiaRemember');
        }

        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('authError').innerText = 'Email ou senha inválidos.';
    }
});

// Partículas e cursor (copiados do site principal para manter)
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    function initParticles() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(25, 195, 125, ${Math.random() * 0.3})`
            });
        }
    }
    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
        });
        requestAnimationFrame(animateParticles);
    }
    window.addEventListener('resize', initParticles);
    initParticles();
    animateParticles();
}

// Salvar dados do usuário (já feito)
// Obter plano da URL (já temos)
// Redirecionar para o link de checkout correspondente
const checkoutLinks = {
  starter: 'https://buy.stripe.com/test_9B6aEW1MI1pqfgy1poaMU00',
  pro: 'https://buy.stripe.com/test_3cIfZg7721pq9We5FEaMU01',
  turbo: 'https://buy.stripe.com/test_5kQfZg1MI6JK3xQ0lkaMU02'
};
window.location.href = checkoutLinks[plan];

// Cursor glow
const cursor = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
