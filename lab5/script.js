const players = [
  { name: "Joel Embiid", team: "PHI", points: 33, rebounds: 10.8, assists: 5.7 },
  { name: "Jalen Brunson", team: "NYK", points: 32.4, rebounds: 3.3, assists: 7.5 },
  { name: "Shai Gilgeous-Alexander", team: "OKC", points: 30.2, rebounds: 7.2, assists: 6.4 },
  { name: "Tyrese Maxey", team: "PHI", points: 29.8, rebounds: 5.2, assists: 6.8 },
  { name: "Donovan Mitchell", team: "CLE", points: 29.6, rebounds: 5.4, assists: 4.7 }
];

const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const darkBtn = document.getElementById("darkBtn");

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(player => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.team}</td>
      <td>${player.points}</td>
      <td>${player.rebounds}</td>
      <td>${player.assists}</td>
    `;

    row.addEventListener("mouseover", () => {
      row.style.backgroundColor = "#ddd";
    });

    row.addEventListener("mouseout", () => {
      row.style.backgroundColor = "";
    });

    tableBody.appendChild(row);
  });
}

renderTable(players);

search.addEventListener("input", applyFilters);
filter.addEventListener("change", applyFilters);

function applyFilters() {
  let result = players;

  const searchValue = search.value.toLowerCase();
  const filterValue = filter.value;

  result = result.filter(player =>
    player.name.toLowerCase().includes(searchValue)
  );

  if (filterValue !== "all") {
    result = result.filter(player =>
      player.team === filterValue
    );
  }

  renderTable(result);
}

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});