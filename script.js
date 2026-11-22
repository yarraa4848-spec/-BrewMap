// Abha & Khamis Mushait Cafés Data
let cafes = [
  {
    id: 1,
    name: "Fog & Bean Roasters",
    area: "Al Manhal, Abha",
    rating: "4.9",
    category: "outdoor",
    tag: "Outdoor Seating",
    hours: "7:00 AM - 12:30 AM",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Highland Study Lounge",
    area: "Al Mahalah, Abha",
    rating: "4.8",
    category: "study",
    tag: "Study-Friendly",
    hours: "24 Hours",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Asir Pour-Over Lab",
    area: "King Abdullah Rd, Khamis Mushait",
    rating: "4.9",
    category: "v60",
    tag: "V60 / Pour-Over",
    hours: "6:30 AM - 12:00 AM",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Boulevard Brew & Co.",
    area: "Khamis Mushait Boulevard",
    rating: "4.7",
    category: "outdoor",
    tag: "Outdoor Seating",
    hours: "4:00 PM - 2:00 AM",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Quiet Cup Workspace",
    area: "Al Shifa Rd, Abha",
    rating: "4.8",
    category: "study",
    tag: "Study-Friendly",
    hours: "7:30 AM - 11:30 PM",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Qimma Specialty Coffee",
    area: "Al Raqi, Khamis Mushait",
    rating: "4.9",
    category: "v60",
    tag: "V60 / Pour-Over",
    hours: "6:00 AM - 12:00 AM",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
  }
];

let favorites = JSON.parse(localStorage.getItem("brewmap_favs")) || [];
let currentFilter = "all";

const cafesGrid = document.getElementById("cafes-grid");
const searchInput = document.getElementById("search-input");
const filterBtns = document.querySelectorAll(".filter-btn");
const resultsCount = document.getElementById("results-count");
const favCount = document.getElementById("fav-count");

// Render Cafés
function renderCafes() {
  const query = searchInput.value.toLowerCase();

  const filtered = cafes.filter(cafe => {
    const matchesCategory = currentFilter === "all" || cafe.category === currentFilter;
    const matchesSearch = cafe.name.toLowerCase().includes(query) ||
                          cafe.area.toLowerCase().includes(query) ||
                          cafe.tag.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  resultsCount.textContent = `Showing ${filtered.length} café(s)`;
  cafesGrid.innerHTML = "";

  filtered.forEach(cafe => {
    const isSaved = favorites.includes(cafe.id);
    const card = document.createElement("div");
    card.className = "cafe-card";
    card.innerHTML = `
      <img src="${cafe.image}" alt="${cafe.name}" class="cafe-img">
      <div class="cafe-body">
        <div class="cafe-top">
          <h3>${cafe.name}</h3>
          <span class="rating"><i class="fa-solid fa-star"></i> ${cafe.rating}</span>
        </div>
        <p class="cafe-location"><i class="fa-solid fa-location-dot"></i> ${cafe.area} • ${cafe.hours}</p>
        <span class="badge">${cafe.tag}</span>
        <div class="card-actions">
          <a href="https://instagram.com" target="_blank" class="ig-link">
            <i class="fa-brands fa-instagram"></i> View Page
          </a>
          <button class="fav-btn ${isSaved ? 'saved' : ''}" onclick="toggleFavorite(${cafe.id})" title="Save to Favorites">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
