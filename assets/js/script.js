let el = document.querySelector('#check-termos');
const modal = document.getElementById('modal');

el.addEventListener('click', () => {
    let showModal = document.querySelector('#check-termos').checked;
    if (showModal) {
        showPermissionModal();
    } else {
        modal.style.display = 'none';
    }
});




document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o navegador suporta a API de geolocalização
    if ('geolocation' in navigator) {
        // Verificar se o usuário já deu permissão de localização
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
            if (permissionStatus.state === 'granted') {
                // Usuário já deu permissão
                navigator.geolocation.getCurrentPosition(showPosition);
                modal.style.display = 'none';
                //location.href = "https://www.google.com";
            } else if (permissionStatus.state === 'prompt' || permissionStatus.state === 'denied') {
                // Usuário ainda não tomou uma decisão; mostrar o modal
                /* let showModal = document.querySelector('#check-termos').checked;
                if(showModal) {
                  showPermissionModal();
                } */


            } else {
                // Permissão negada
                alert('Permissão negada. O usuário precisa conceder permissão para acessar a localização.');
                console.log(permissionStatus.state);

            }
        });
    } else {
        // Navegador não suporta geolocalização
        alert('Seu navegador não suporta geolocalização.');
    }
});

function showPermissionModal() {
    const modal = document.getElementById('modal');
    const allowButton = document.getElementById('allowButton');
    const denyButton = document.getElementById('denyButton');

    modal.style.display = 'block';

    allowButton.addEventListener('click', () => {
        // Fechar o modal e solicitar permissão de localização
        modal.style.display = 'none';
        navigator.geolocation.getCurrentPosition(
             () => {
                alert('Permissão concedida!');
                location.reload();
            },
            () => {
                alert('Falha ao obter localização. O usuário pode ter negado a permissão.');
                location.reload();
            }
        );
    });

    denyButton.addEventListener('click', () => {
        // Fechar o modal e lidar com a recusa do usuário
        modal.style.display = 'none';
        alert('Permissão negada. O usuário precisa conceder permissão para acessar a localização.');
        location.reload();
    });
}

function showPosition(position) {
    const x = document.getElementById("demo");
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    if (latitude == "34.9044598" && longitude == "136.9908376") {
        location.href = "https://www.google.com";
    } else {
        document.getElementById('termo').innerHTML = `<p>Não é possível acessar o cardápio fora das dependências do Roots grill.</p>`;
    }

}
