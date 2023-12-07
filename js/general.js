/* <nav class="navbar nvb navbar-expand-md navbar-light p-0 m-0 w-100 shadow">
    <div class="container imagen">
        <a class="navbar-brand" href="/index.html"> <img src="/img/logo.png" width="300"
                class="img-fluid rounded-top logo" alt=""></a>
        <div class="container text-center d-flex align-items-end vw-100 justify-content-end ">
            <button type="button" class="btn btn-primary" id="btn-logearse"><a href="/LoginRegister/login.html">Login</a></button>
            <button type="button" class="btn btn-primary" id="btn-registros"><a
                    href="/LoginRegister/registro.html">Register</a></button>
            <button type="button" class="btn btn-primary d-none" id="btn-perfil"><a href="/Datos/perfil.html">Profile</a></button>
            <button type="button" class="btn btn-primary d-none" id="btn-mazo">My Maze</button>
            <button type="button" class="btn btn-primary d-none" id="btn-logout">Logout</button>
            <button type="button" class="btn btn-primary d-none" id="btn-favoritos"><a href="/Datos/favoritos.html">Favorites</a></button>
            <button type="button" class="btn btn-primary"><a href="/Datos/faq.html">FAQ</a></button>
        </div>
    </div>
</nav>*/

document.addEventListener('DOMContentLoaded', function () {
    let btnLogin = document.querySelector('#btn-logearse');
    let btnRegister = document.querySelector('#btn-registros');
    let btnLogout = document.querySelector('#btn-logout');
    let btnFavorites = document.querySelector('#btn-favoritos');
    let btnProfile = document.querySelector('#btn-perfil');
    let btnMaze = document.querySelector('#btn-mazo');

    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '../index.html';
    });

    if (localStorage.getItem('user')) {
        btnLogin.classList.add('d-none');
        btnRegister.classList.add('d-none');
        btnLogout.classList.remove('d-none');
        btnFavorites.classList.remove('d-none');
        btnProfile.classList.remove('d-none');
        btnMaze.classList.remove('d-none');
    } else {
        btnLogin.classList.remove('d-none');
        btnRegister.classList.remove('d-none');
        btnLogout.classList.add('d-none');
        btnFavorites.classList.add('d-none');
        btnProfile.classList.add('d-none');
        btnMaze.classList.add('d-none');
    }
});