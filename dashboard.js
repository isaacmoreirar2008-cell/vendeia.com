// dashboard.js

// Verificar se usuário está logado
const userData = localStorage.getItem('vendeiaUser');
if (!userData) {
    window.location.href = 'auth.html'; // redireciona se não houver
} else {
    const user = JSON.parse(userData);

    // Preencher dados na tela
    document.getElementById('userName').innerText = user.nomeCompleto || 'Usuário';
    document.getElementById('userPlan').innerText = user.plano ? user.plano.charAt(0).toUpperCase() + user.plano.slice(1) : 'Starter';
    document.getElementById('companyName').innerText = user.empresa || '';
    document.getElementById('infoEmpresa').innerText = user.empresa || '—';
    document.getElementById('infoNicho').innerText = user.nicho || '—';
    document.getElementById('infoEmail').innerText = user.email || '—';
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    // Remove apenas a sessão (mantém o remember se existir)
    // Se quiser esquecer completamente, pode remover o remember também
    // localStorage.removeItem('vendeiaRemember');
    window.location.href = 'auth.html';
});

// Partículas e cursor (mesmo código do auth.js)
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

const cursor = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});