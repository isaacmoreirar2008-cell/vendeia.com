// dashboard.js

// Recupera dados do usuário
const userData = localStorage.getItem('vendeiaUser');
if (!userData) {
    window.location.href = 'auth.html';
} else {
    const user = JSON.parse(userData);
    const userNameSpan = document.getElementById('userName');
    if (userNameSpan) userNameSpan.innerText = user.nomeCompleto || 'Usuário';
    const userPlanSpan = document.getElementById('userPlan');
    if (userPlanSpan) userPlanSpan.innerText = user.plano ? user.plano.charAt(0).toUpperCase() + user.plano.slice(1) : 'Starter';
    const companyNameSpan = document.getElementById('companyName');
    if (companyNameSpan) companyNameSpan.innerText = user.empresa || '';

    // Variável global com o plano
    window.currentPlan = user.plano || 'starter';
}

const contentDiv = document.getElementById('dashboardContent');

// Funções de renderização para cada plano
function renderStarterDashboard() {
    contentDiv.innerHTML = `
        <div class="welcome-card">
            <h2>Dashboard Starter</h2>
            <p>Bem-vindo ao plano Starter! Aqui estão seus benefícios:</p>
            <ul style="margin-top:20px; list-style:none;">
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Marketing básico com IA</li>
                <li><i class="fas fa-check" style="color:var(--verde);"></i> 5 posts por semana</li>
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Suporte por email</li>
            </ul>
            <div style="margin-top:30px;">
                <button class="btn-primary" onclick="alert('Gerador de posts básico (simulação)')">Gerar post</button>
            </div>
        </div>
    `;
}

function renderProDashboard() {
    contentDiv.innerHTML = `
        <div class="welcome-card">
            <h2>Dashboard Pro</h2>
            <p>Bem-vindo ao plano Pro! Aqui estão seus benefícios:</p>
            <ul style="margin-top:20px; list-style:none;">
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Tudo do Starter</li>
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Posts ilimitados</li>
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Análise de concorrência</li>
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Suporte prioritário</li>
            </ul>
            <div style="margin-top:30px;">
                <button class="btn-primary" onclick="alert('Análise de concorrência (simulação)')">Analisar concorrência</button>
                <button class="btn-primary" style="margin-left:10px;" onclick="alert('Gerador de posts ilimitado')">Gerar post</button>
            </div>
        </div>
    `;
}

function renderTurboDashboard() {
    contentDiv.innerHTML = `
        <div class="welcome-card">
            <h2>Dashboard Turbo</h2>
            <p>Bem-vindo ao plano Turbo! Todos os recursos disponíveis:</p>
            <ul style="margin-top:20px; list-style:none;">
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Tudo do Pro</li>
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Estratégias avançadas</li>
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Integração com Instagram</li>
                <li><i class="fas fa-check" style="color:var(--verde);"></i> Consultor IA dedicado</li>
            </ul>
            <div style="margin-top:30px;">
                <button class="btn-primary" onclick="alert('Estratégia avançada gerada (simulação)')">Gerar estratégia</button>
                <button class="btn-primary" style="margin-left:10px;" onclick="alert('Integração com Instagram (simulação)')">Conectar Instagram</button>
            </div>
        </div>
    `;
}

// Função para escolher o dashboard correto
function renderDashboardByPlan() {
    switch (window.currentPlan) {
        case 'pro':
            renderProDashboard();
            break;
        case 'turbo':
            renderTurboDashboard();
            break;
        default:
            renderStarterDashboard();
    }
}

// Navegação nas abas (mantendo a funcionalidade de trocar conteúdo)
function setActiveLink(linkId) {
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    const link = document.getElementById(linkId);
    if (link) link.classList.add('active');
}

// Event listeners para os links da sidebar
document.getElementById('linkDashboard').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink('linkDashboard');
    renderDashboardByPlan(); // sempre volta para o dashboard principal do plano
});

document.getElementById('linkMarketing').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink('linkMarketing');
    contentDiv.innerHTML = `<div class="welcome-card"><h2>Marketing IA</h2><p>Funcionalidade em desenvolvimento para seu plano.</p></div>`;
});

document.getElementById('linkPromocoes').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink('linkPromocoes');
    contentDiv.innerHTML = `<div class="welcome-card"><h2>Promoções</h2><p>Funcionalidade em desenvolvimento para seu plano.</p></div>`;
});

document.getElementById('linkConfig').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink('linkConfig');
    contentDiv.innerHTML = `<div class="welcome-card"><h2>Configurações</h2><p>Edite seus dados aqui.</p></div>`;
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'auth.html';
});

// Inicializar com o dashboard correto
renderDashboardByPlan();

// ===== Cursor e partículas (igual ao site principal) =====
(function initEffects() {
    const cursor = document.getElementById('cursor-glow');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    }

    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];
        function initParticles() {
            width = window.innerWidth; height = window.innerHeight;
            canvas.width = width; canvas.height = height;
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
                p.x += p.speedX; p.y += p.speedY;
                if (p.x < 0 || p.x > width) p.speedX *= -1;
                if (p.y < 0 || p.y > height) p.speedY *= -1;
            });
            requestAnimationFrame(animateParticles);
        }
        window.addEventListener('resize', initParticles);
        initParticles();
        animateParticles();
    }
})();
