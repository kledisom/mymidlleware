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

    verificarLocalizacao(latitude, longitude);

    /*   if (latitude == "34.9044598" && longitude == "136.9908376") {
          location.href = "https://www.google.com";
      } else {
          document.getElementById('termo').innerHTML = `<p>Não é possível acessar o cardápio fora das dependências do Roots grill.</p>`;
      } */

}

function calcularDistancia(lat1, lon1, lat2, lon2) {
    // Função para calcular a distância entre dois pontos usando a fórmula haversine
    // Retorna a distância em metros
    const R = 6371e3; // Raio da Terra em metros
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
}

function verificarLocalizacao(latUsuario, lonUsuario) {
    // Coordenadas do estabelecimento
    const latEstabelecimento = 34.9044598;
    const lonEstabelecimento = 136.9908376;

    // Defina o raio permitido (em metros)
    const raioPermitido = 10000; // Ajuste conforme necessário

    // Calcule a distância entre o usuário e o estabelecimento
    const distancia = calcularDistancia(latUsuario, lonUsuario, latEstabelecimento, lonEstabelecimento);

    // Verifique se a distância está dentro do raio permitido
    if (distancia <= raioPermitido) {
        // Usuário está dentro do raio permitido, permita o acesso
        console.log("Usuário dentro do raio permitido. Acesso permitido.");
        location.href = "https://seashell-app-s8r4y.ondigitalocean.app/storeorderclients.html";
    } else {
        // Usuário está fora do raio permitido, negue o acesso
        console.log("Usuário fora do raio permitido. Acesso negado.");
        document.getElementById('termo').innerHTML = `<p>Não é possível acessar o cardápio fora das dependências do Roots grill.</p>`;
    }
}
