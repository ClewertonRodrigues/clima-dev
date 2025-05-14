const form = document.getElementById("form");
const input = document.getElementById("input-cidade");
const content = document.getElementById("content");
const msgErro = document.getElementById("erro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (input.value === "") {
    alert("Preencha o campo!!");
  } else {
    buscarDados();
  }
});

async function buscarDados() {
  const key = "b986697bc707ecfe0b188b4468f3becb";
  const cidade = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=${key}&units=metric&lang=pt_br`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        content.classList.remove("hidden");
        msgErro.classList.add("hidden");

        document.getElementById("nome-cidade").innerHTML = `${data.name}`;

        document.getElementById("temperatura").innerHTML = `${data.main.temp.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
        document.getElementById("img-tempo").setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        document.getElementById("info-tempo").innerHTML = data.weather[0].description;

        document.getElementById("temp-max").innerHTML = `${data.main.temp_max.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
        document.getElementById("temp-min").innerHTML = `${data.main.temp_min.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
        document.getElementById("umidade").innerHTML = `${data.main.humidity}%`;
        document.getElementById("vento").innerHTML = `${data.wind.speed.toFixed(1)} km/h`;
      } else {
        content.classList.add("hidden");
        msgErro.classList.remove("hidden");
      }

      input.value = "";
    });
}
