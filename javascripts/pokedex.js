let inpSearch = document.querySelector('.pokemon_input');
let btnSearch = document.querySelector('.search_pokemon');
let screen_container = document.querySelector('.pokedex_screen_container')
let data_container = document.querySelector('.pokedex-info_container')
let nextBtn = document.querySelector('.pokedex-btn-next');
let backBtn = document.querySelector('.pokedex-btn-back');
let homeBtn = document.querySelector('.pokedex-btn-home');
console.log(homeBtn);
// Declaramos de forma global estas dos variables para que cuando las elimine en el if de la funcion agregar no salte el error de que no existe dicha variabla
let div_img;
let div_data;

// Boton Next and Back
let id = 0;


btnSearch.addEventListener('click', () => {
    let input_value = inpSearch.value
    let ruta = `https://pokeapi.co/api/v2/pokemon/${input_value}`;
    peticion(ruta)
})

homeBtn.addEventListener('click', () => {
    if (id > 0) {
        id = 1
        let ruta_home = `https://pokeapi.co/api/v2/pokemon/${id}`
        peticion(ruta_home)
    }
})

nextBtn.addEventListener('click', () => {
    if (id == 898) {
        id = 0
    }else {
        id += 1
        let ruta_id = `https://pokeapi.co/api/v2/pokemon/${id}`
        peticion(ruta_id)
    }
})

backBtn.addEventListener('click', () => {
    if (id > 0) {
        id -= 1
        let ruta_id = `https://pokeapi.co/api/v2/pokemon/${id}`
        peticion(ruta_id)
    }else if (id == 0){
        id == 1
    }
})

function peticion(path) {
    fetch(path)
        .then(resp => resp.json())
        .then(data => {
            id = data.id
            agregar(data, screen_container, data_container)
        })
}

function agregar(objeto, container_img, container_data) {
    
    if (container_img.childNodes.length > 1) {
        container_img.removeChild(div_img)
        container_data.removeChild(div_data)
    }

    div_img = document.createElement('div')
    container_img.appendChild(div_img)
    div_img.innerHTML = `
                <h3>${objeto.name}</h3>
                <img src="${objeto.sprites.front_default}" alt="">`;

    let stats = objeto.stats;
    
    div_data = document.createElement('div')
    div_data.innerHTML = `<p>Id: ${objeto.id}</p>`
    div_data.classList = 'div_data'
    container_data.appendChild(div_data)
    
    stats.forEach(element => {                
        let p = document.createElement('p')
        div_data.appendChild(p)
        p.innerHTML = `
        ${element.stat.name}: ${element.base_stat}`
    }); 

}


