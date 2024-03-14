// Memilih elemen-elemen dari halaman HTML
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// Menambahkan event listener pada tombol pencarian
search.addEventListener("click", () => {
  // Mengatur kunci API OpenWeatherMap
  const apiKey = "ea967d3695eb1cfc61ff41deb887fb4e";
  // Mengambil nilai dari input kota
  const city = document.querySelector(".search-box input").value;

  // Jika input kota kosong, tidak ada tindakan lebih lanjut
  if (city == "") return;

  // Mengambil data cuaca dari API OpenWeatherMap
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // Jika kota tidak ditemukan (kode status 404)
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }
      // Jika kota ditemukan
      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      // Menampilkan informasi cuaca
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // Mengganti gambar berdasarkan kondisi cuaca
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
