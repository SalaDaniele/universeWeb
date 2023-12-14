async function fetchJson(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Errore nella richiesta');
		}
		return await response.json();
	} catch (error) {
		let toast = new bootstrap.Toast("#toast1");
        toast.show();
	}
}

function updateTimer() {
	if (seconds < 100) {
		seconds++;
		if (window.location.href.includes("it-IT")) {
			document.querySelector('#updatetext').textContent = `Ultimo aggiornamento ${seconds} secondi fa`;
		} else {
			document.querySelector('#updatetext').textContent = `Last updated ${seconds} seconds ago`;
		}
	} else {
		button.click();
	}
}
let barra = document.querySelector("nav");
let header = document.querySelector("#header");
const map = document.querySelector("#map");
if (window.innerHeight - (barra.clientHeight + header.clientHeight) < (window.innerWidth - 250)) {
	map.style.height = "calc(100vh - " + (barra.clientHeight + header.clientHeight) + "px)";
} else {
	map.style.height = window.innerWidth;
}
let seconds = 0;
let timer;
let button = document.querySelector("#updatebutton");
button.addEventListener('click', () => {
	if (timer) {
		clearInterval(timer);
		timer = null;
		seconds = 0;
		initMap();
	}
	timer = setInterval(updateTimer, 1000);
})
button.click();

function initMap() {
	const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';
	console.log("ca")
	fetchJson(apiUrl)
	.then(data => {
		console.log('Dati ottenuti:', data);
		let coordinates = {
			lat: data['latitude'],
			lng: data['longitude']
			};
		let map = new google.maps.Map(document.getElementById('map'), {
			center: coordinates,
			zoom: 3
		});

		let marker = new google.maps.Marker({
			position: coordinates,
			map: map,
			title: 'Posizione Specifica'
		});
		document.querySelector("#speedtext").textContent = `${Math.floor(data['velocity'])} km/h`;
		document.querySelector("#alttext").textContent = `${Math.floor(data['altitude'])} km`;
		document.querySelector("#lattext").textContent = data['latitude'];
		document.querySelector("#longtext").textContent = data['longitude'];
	});
}