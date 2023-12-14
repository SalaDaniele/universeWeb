async function fetchJson(url) {
	return fetch(url)
	.then(response => {
		if (!response.ok) {
			throw new Error('Errore nella richiesta');
		}
		return response.json();
	})
	.catch(() => {
		let toast = new bootstrap.Toast("#toast1");
    toast.show() ;
	});
}

let titolo = document.querySelector("#titolo");
let data = new Date();
titolo.textContent = `${titolo.textContent} ${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;

const items = [];
const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-12-13&end_date=2023-12-13&api_key=5DJhCE1vuxpdxuYxddIZ0chv65HVrVf7WGN5hou0';
fetchJson(apiUrl)
.then(data => {
	let lista = [];
	const dates = Object.keys(data.near_earth_objects);
	dates.forEach((date) => {
		const collection = data.near_earth_objects[date];
		collection.forEach((asteroid) => {
			let oggetto = {
				nome: asteroid.name.replace(/\)/g, "").replace(/\(/g, ""),
				id: asteroid.id,
				diametro: Math.floor(asteroid.estimated_diameter.meters.estimated_diameter_max),
				velocita: Math.floor(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour),
				distanza: Math.floor(asteroid.close_approach_data[0].miss_distance.kilometers)
			}
			lista.push(oggetto);
		});
		lista.sort((a, b) => b.distanza - a.distanza);
		let div = document.createElement("div");
		div.classList.add("container");
		let ul = document.createElement("ul");
		ul.classList.add("ulclass");
		lista.forEach((ogg) => {
			let li = document.createElement("li");
			li.classList.add("liclass");
			let div1 = document.createElement("div");
			div1.classList.add("container");
			let nome = document.createElement("h4");
			nome.textContent = ogg.nome;
			let distanza = document.createElement("h5");
			let info = document.createElement("ul");
			let vel = document.createElement("li");
			let diam = document.createElement("li");
			let id = document.createElement("li");
			if (window.location.href.includes("it-IT")) {
				vel.textContent = `Velocità: ${ogg.velocita} km/h`;
				diam.textContent = `Diametro: ${ogg.diametro} m`;
				id.textContent = `ID: ${ogg.id}`;
				distanza.textContent = `${ogg.distanza.toLocaleString("it-IT")} km dalla terra`;
			} else {
				vel.textContent = `Speed: ${ogg.velocita} km/h`;
				diam.textContent = `Diameter: ${ogg.diametro} m`;
				id.textContent = `ID: ${ogg.id}`;
				distanza.textContent = `${ogg.distanza.toLocaleString("it-IT")} km from earth`;
			}
			info.appendChild(id);
			info.appendChild(vel);
			info.appendChild(diam);
			div1.appendChild(nome);
			div1.appendChild(distanza);
			div1.appendChild(info)
			li.appendChild(div1);
			ul.appendChild(li);
			items.push(li);
		})
		div.appendChild(ul);
		document.body.appendChild(div);
		let footer = document.createElement("footer");
		let img = document.createElement("img");
		img.classList.add("w-100", "img-fluid");
		img.src = "../images/terra.png";
		footer.appendChild(img);
		document.body.appendChild(footer);
		callbackFunc();
	});
});

console.log(items);

function isItemInView(item) {
	let rect = item.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function callbackFunc() {
	for (var i = 0; i < items.length; i++) {
		if (isItemInView(items[i])) {
			items[i].classList.add("show");
		}
	}
}

window.addEventListener("load", callbackFunc);
window.addEventListener("resize", callbackFunc);
window.addEventListener("scroll", callbackFunc);