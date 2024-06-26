var bcrypt = dcodeIO.bcrypt;

const defaultEmail = 'vivianeoliver805@gmail.com';

function checkLogin() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
        window.location.href = 'agenda.html';
    }
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email === defaultEmail) {
        const storedHash = localStorage.getItem(email);
        if (storedHash) {
            bcrypt.compare(senha, storedHash, function(err, result) {
                if (result) {
                    localStorage.setItem('loggedIn', true);
                    window.location.href = 'agenda.html';
                } else {
                    alert('Email ou senha incorretos. Tente novamente.');
                }
            });
        } else {
            alert('Usuário não encontrado.');
        }
    } else {
        alert('Email incorreto. Utilize o email padrão para fazer login.');
    }
}

function forgotPassword(event) {
    event.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('reset-password-form').style.display = 'block';
}

function resetPassword(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const checkmail = document.getElementById('checkmail').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (checkmail !== defaultEmail) {
        alert('Você não tem permissão para redefinir a senha para este email.');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('As senhas digitadas não coincidem. Por favor, tente novamente.');
        return;
    }

    bcrypt.hash(newPassword, 10, function(err, hash) {
        if (err) {
            console.error(err);
            return;
        }
        localStorage.setItem(email, hash);

        const allKeys = Object.keys(localStorage);
        allKeys.forEach(key => {
            if (key === email) {
                localStorage.setItem(key, hash);
            }
        });

        alert('Sua senha foi redefinida com sucesso.');
        window.location.href = 'index.html';
    });
}

document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('forgot-password').addEventListener('click', forgotPassword);
document.getElementById('resetPasswordForm').addEventListener('submit', resetPassword);

checkLogin();
