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

const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=5DJhCE1vuxpdxuYxddIZ0chv65HVrVf7WGN5hou0';
fetchJson(apiUrl)
.then(data => {
	//console.log('Dati ottenuti:', data);
	let image = document.querySelector("#apodimg");
	document.querySelector("#expandedapod").src = data['hdurl'];
	document.querySelector("#title").textContent = data['title'];
	document.querySelector("#expandedtitle").textContent = data['title'];
	image.src = data['hdurl'];
	document.querySelector("#openlink").href = data['hdurl'];
    const size = 700;
	let rapportoProporzioni = image.naturalWidth / image.naturalHeight;
	if (rapportoProporzioni > 1) {
		image.width = size;
		image.height = size / rapportoProporzioni;
	} else if (rapportoProporzioni < 1) {
		image.height = size;
		image.width = size * rapportoProporzioni;
	} else {
        image.width=size;
        image.height=size;
	}
	let descrizione = document.createElement("p");
	descrizione.classList.add("text-white","text-center","mt-4");
	descrizione.id = "desc";
	if(window.location.href.includes("it-IT")){
		const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=it&dt=t&q=${encodeURI(data['explanation'])}`;
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				let descrizioneTrad = json[0].map((item) => item[0]).join("");
				descrizione.textContent = descrizioneTrad;
			})
			.catch(() => {
			let toast = new bootstrap.Toast("#toast2");
			toast.show() ;
		});
	}
	else
	{
		descrizione.textContent = data['explanation'];
	}
	document.querySelector("#descdiv").appendChild(descrizione);
});