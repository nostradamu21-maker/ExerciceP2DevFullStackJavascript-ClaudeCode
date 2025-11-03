// Variables globales
let data = [];
let chart = null;

// Chargement des données
fetch('olympic-data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        init();
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

// Initialisation
function init() {
    // Gestion du routing basique
    window.addEventListener('popstate', function() {
        handleRoute();
    });

    handleRoute();
}

// Gestion des routes
function handleRoute() {
    const path = window.location.pathname;
    const app = document.getElementById('app');

    if (path === '/' || path === '/index.html') {
        // Affichage du dashboard
        app.innerHTML = '<div id="dashboard"></div>';
        showDashboard();
    } else if (path.includes('/country/')) {
        // Extraction de l'ID depuis l'URL
        const id = parseInt(path.split('/country/')[1]);
        app.innerHTML = '<div id="country-detail"></div>';
        showCountryDetail(id);
    }
}

// Affichage du dashboard
function showDashboard() {
    const container = document.getElementById('dashboard');

    // Titre
    let html = '<h2>Tableau des Médailles</h2>';

    // Graphique
    html += '<div class="chart-container"><canvas id="myChart"></canvas></div>';

    // Liste des pays
    html += '<div class="countries-list">';

    // Boucle pour afficher chaque pays
    for (let i = 0; i < data.length; i++) {
        const country = data[i];

        // Calcul du total de médailles
        let total = 0;
        for (let j = 0; j < country.participations.length; j++) {
            total += country.participations[j].medalsCount;
        }

        html += '<div class="country-card" onclick="goToCountry(' + country.id + ')">';
        html += '<h3>' + country.name + '</h3>';
        html += '<p>Total médailles: ' + total + '</p>';
        html += '</div>';
    }

    html += '</div>';

    container.innerHTML = html;

    // Création du graphique
    const ctx = document.getElementById('myChart');

    // Préparation des données pour le graphique
    let labels = [];
    let values = [];
    let colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

    for (let i = 0; i < data.length; i++) {
        labels.push(data[i].name);

        // Calcul du total
        let total = 0;
        for (let j = 0; j < data[i].participations.length; j++) {
            total += data[i].participations[j].medalsCount;
        }
        values.push(total);
    }

    // Destruction du graphique précédent s'il existe
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Navigation vers un pays
function goToCountry(id) {
    history.pushState({}, '', '/country/' + id);
    handleRoute();
}

// Affichage du détail d'un pays
function showCountryDetail(id) {
    const container = document.getElementById('country-detail');

    // Recherche du pays
    let country = null;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            country = data[i];
            break;
        }
    }

    if (!country) {
        container.innerHTML = '<p>Pays non trouvé</p>';
        return;
    }

    // Calcul des statistiques
    let totalMedals = 0;
    let totalAthletes = 0;
    for (let i = 0; i < country.participations.length; i++) {
        totalMedals += country.participations[i].medalsCount;
        totalAthletes += country.participations[i].athleteCount;
    }

    // Construction du HTML
    let html = '<button onclick="goBack()" class="back-button">← Retour</button>';
    html += '<h2>' + country.name + '</h2>';

    html += '<div class="stats-grid">';
    html += '<div class="stat-card">';
    html += '<h3>Participations</h3>';
    html += '<p class="stat-value">' + country.participations.length + '</p>';
    html += '</div>';

    html += '<div class="stat-card">';
    html += '<h3>Total Médailles</h3>';
    html += '<p class="stat-value">' + totalMedals + '</p>';
    html += '</div>';

    html += '<div class="stat-card">';
    html += '<h3>Total Athlètes</h3>';
    html += '<p class="stat-value">' + totalAthletes + '</p>';
    html += '</div>';
    html += '</div>';

    // Graphique d'évolution
    html += '<div class="chart-container"><canvas id="evolutionChart"></canvas></div>';

    // Tableau des participations
    html += '<h3>Historique des participations</h3>';
    html += '<table class="participations-table">';
    html += '<thead><tr><th>Année</th><th>Ville</th><th>Médailles</th><th>Athlètes</th></tr></thead>';
    html += '<tbody>';

    for (let i = 0; i < country.participations.length; i++) {
        const p = country.participations[i];
        html += '<tr>';
        html += '<td>' + p.year + '</td>';
        html += '<td>' + p.city + '</td>';
        html += '<td>' + p.medalsCount + '</td>';
        html += '<td>' + p.athleteCount + '</td>';
        html += '</tr>';
    }

    html += '</tbody></table>';

    container.innerHTML = html;

    // Création du graphique d'évolution
    const ctx = document.getElementById('evolutionChart');

    // Préparation des données
    let years = [];
    let medals = [];

    for (let i = 0; i < country.participations.length; i++) {
        years.push(country.participations[i].year);
        medals.push(country.participations[i].medalsCount);
    }

    // Destruction du graphique précédent
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Nombre de médailles',
                data: medals,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Retour au dashboard
function goBack() {
    history.pushState({}, '', '/');
    handleRoute();
}
