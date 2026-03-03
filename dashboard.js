// dashboard.js

// Recupera dados do usuário
let user = JSON.parse(localStorage.getItem('vendeiaUser'));
if (!user) {
    window.location.href = 'auth.html';
} else {
    // Verificar se veio de um checkout (parâmetro plan na URL)
    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan');
    if (planFromUrl) {
        user.plano = planFromUrl;
        localStorage.setItem('vendeiaUser', JSON.stringify(user));
    }

    // Preencher na tela
    document.getElementById('userName').innerText = user.nomeCompleto || 'Usuário';
    document.getElementById('userPlan').innerText = user.plano ? user.plano.charAt(0).toUpperCase() + user.plano.slice(1) : 'Starter';
    document.getElementById('companyName').innerText = user.empresa || '';
}

// Elemento onde o conteúdo será injetado
const contentDiv = document.getElementById('dashboardContent');

// Funções de renderização de cada seção
function renderDashboard() {
    const user = JSON.parse(localStorage.getItem('vendeiaUser'));
    contentDiv.innerHTML = `
        <div class="welcome-card">
            <h2>Informações da sua conta</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Empresa</span>
                    <span class="info-value">${user.empresa || '—'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Nicho</span>
                    <span class="info-value">${user.nicho || '—'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Email</span>
                    <span class="info-value">${user.email || '—'}</span>
                </div>
            </div>
            <a href="#" class="btn-primary dashboard-cta">Começar a usar a IA</a>
        </div>
    `;
}

function renderMarketingIA() {
    contentDiv.innerHTML = `
        <div class="welcome-card">
            <h2>Marketing IA</h2>
            <p class="subhead">Gerador de conteúdo automático para suas redes sociais.</p>
            <div style="margin-top:30px;">
                <div class="form-group">
                    <label>Ideia de post:</label>
                    <input type="text" placeholder="Ex: Promoção de fim de semana" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid #333; border-radius:8px; color:white;">
                </div>
                <button class="btn-primary" style="margin-top:15px;">Gerar sugestão</button>
            </div>
            <div style="margin-top:30px; background:rgba(25,195,125,0.1); padding:20px; border-radius:16px;">
                <h3>Exemplo de post gerado:</h3>
                <p>"🔥 Promoção relâmpago! 20% off em todos os serviços hoje. Agende já!"</p>
            </div>
        </div>
    `;
}

function renderPromocoes() {
    contentDiv.innerHTML = `
        <div class="welcome-card">
            <h2>Promoções inteligentes</h2>
            <p class="subhead">Crie promoções personalizadas com base no seu nicho.</p>
            <div style="margin-top:30px;">
                <div class="form-group">
                    <label>Tipo de promoção:</label>
                    <select style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid #333; border-radius:8px; color:white;">
                        <option>Desconto percentual</option>
                        <option>Leve 2 pague 1</option>
                        <option>Brinde na compra</option>
                    </select>
                </div>
                <button class="btn-primary" style="margin-top:15px;">Gerar promoção</button>
            </div>
        </div>
    `;
}

function renderConfiguracoes() {
    const user = JSON.parse(localStorage.getItem('vendeiaUser'));
    contentDiv.innerHTML = `
        <div class="welcome-card">
            <h2>Configurações da conta</h2>
            <div style="margin-top:30px;">
                <div class="form-group">
                    <label>Nome completo</label>
                    <input type="text" value="${user.nomeCompleto || ''}" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid #333; border-radius:8px; color:white;">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="${user.email || ''}" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid #333; border-radius:8px; color:white;">
                </div>
                <div class="form-group">
                    <label>Empresa</label>
                    <input type="text" value="${user.empresa || ''}" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid #333; border-radius:8px; color:white;">
                </div>
                <div class="form-group">
                    <label>Nicho</label>
                    <input type="text" value="${user.nicho || ''}" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid #333; border-radius:8px; color:white;">
                </div>
                <button class="btn-primary" style="margin-top:15px;">Salvar alterações</button>
            </div>
        </div>
    `;
}

// Função para alternar abas e atualizar classe active
function setActiveLink(linkId) {
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    const link = document.getElementById(linkId);
    if (link) link.classList.add('active');
}

// Configurar event listeners para os links da sidebar (apenas se existirem)
const linkDashboard = document.getElementById('linkDashboard');
if (linkDashboard) {
    linkDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveLink('linkDashboard');
        renderDashboard();
    });
}

const linkMarketing = document.getElementById('linkMarketing');
if (linkMarketing) {
    linkMarketing.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveLink('linkMarketing');
        renderMarketingIA();
    });
}

const linkPromocoes = document.getElementById('linkPromocoes');
if (linkPromocoes) {
    linkPromocoes.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveLink('linkPromocoes');
        renderPromocoes();
    });
}

const linkConfig = document.getElementById('linkConfig');
if (linkConfig) {
    linkConfig.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveLink('linkConfig');
        renderConfiguracoes();
    });
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'auth.html';
    });
}

// Carregar dashboard inicial ao abrir a página
renderDashboard();

// ===== PARTÍCULAS E CURSOR (código adaptado da home) =====
(function initEffects() {
    // Cursor glow
    const cursor = document.getElementById('cursor-glow');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    }

    // Partículas
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
})();
