// auth.js

// Capturar parâmetros da URL
const params = new URLSearchParams(window.location.search);
const plan = params.get('plan') || 'starter';
const tab = params.get('tab') || 'login';

// Mostrar plano no card
const planInfo = document.getElementById('planInfo');
if (planInfo) {
    const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
    planInfo.innerHTML = `Você está contratando o plano <strong>${planName}</strong>`;
}

// Ativar a aba correta
if (tab === 'register') {
    showRegister();
} else {
    showLogin();
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

// Verificar "lembrar sempre"
window.addEventListener('load', function() {
    const remember = localStorage.getItem('vendeiaRemember');
    if (remember === 'true') {
        const user = JSON.parse(localStorage.getItem('vendeiaUser'));
        if (user && user.email) {
            document.getElementById('loginEmail').value = user.email || '';
            document.getElementById('loginPassword').value = user.senha || '';
            document.getElementById('loginRemember').checked = true;
        }
    }
});

// Links de checkout do Stripe por plano
const checkoutLinks = {
    starter: 'https://buy.stripe.com/test_9B6aEW1MI1pqfgy1poaMU00',
    pro: 'https://buy.stripe.com/test_3cIfZg7721pq9We5FEaMU01',
    turbo: 'https://buy.stripe.com/test_5kQfZg1MI6JK3xQ0lkaMU02'
};

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

    localStorage.setItem('vendeiaUser', JSON.stringify(userData));

    if (document.getElementById('regRemember').checked) {
        localStorage.setItem('vendeiaRemember', 'true');
    } else {
        localStorage.removeItem('vendeiaRemember');
    }

    // Redirecionar para o checkout do plano escolhido
    window.location.href = checkoutLinks[plan];
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

        // Redirecionar para o checkout do plano escolhido
        window.location.href = checkoutLinks[plan];
    } else {
        document.getElementById('authError').innerText = 'Email ou senha inválidos.';
    }
});

// ===== Efeitos visuais (cópia do site principal) =====
// ... (código de partículas e cursor que já existia, mantido igual)
