const fetchPokemon = (name) => {
  if (name != "") {
    let url = "https://pokeapi.co/api/v2/pokemon/" + name;

    fetch(url)
      .then((res) => {
        if (res.status!=200){
            const label = document.getElementById('label_nombre'); 
            label.textContent = 'Not Found';
            const img = document.getElementById('imagen');
            img.src = 'pokeball.jpg';
        }  
        return res.json();
      })
      .then((data) => {
        
        let img = data.sprites.front_default;
        let nombre = data.species.name;
        let tipo = data.types[0].type.name;
        let stats = [];
        for(let i=0; i<6; i++){
            stats.push(data.stats[i].base_stat);
        }
        
        let weight = (data.weight)*.1;
        let height = (data.height)*.1;
        console.log(weight)
        apply(img, nombre, tipo, stats, weight, height);

      });
  }
};

const boton = () => {
  const input = document.getElementById("input");
  let name = input.value.toLowerCase();
  fetchPokemon(name);
  console.log("nombre" + name);
};

const apply = (url, nombre, tipo, stats, weight, height) => {
  const imagen = document.getElementById("imagen");
  imagen.src = url;
  const nom = document.getElementById('label_nombre')
  nom.textContent = nombre;
  const tip = document.getElementById('tipo');
  tip.textContent = tipo;
  let vector = ['ha1', 'ha2', 'ha3', 'ha4', 'ha5', 'ha6'];
  for(let i=0; i<6; i++){
    let vara = vector[i]
    let v = document.getElementById(vara);
    v.textContent = stats[i]; 
  }
  const w = document.getElementById('weight');
  w.textContent = weight;
  const h = document.getElementById('height');
  h.textContent = height;
};

