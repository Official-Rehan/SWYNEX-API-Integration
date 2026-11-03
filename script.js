/* =========================
   API CONFIGURATION
========================= */

const API_URL =
    "https://randomuser.me/api/?results=12";


/* =========================
   STATE
========================= */

let users = [];

let filteredUsers = [];


/* =========================
   ELEMENTS
========================= */

const userGrid =
    document.getElementById("userGrid");

const loading =
    document.getElementById("loading");

const errorBox =
    document.getElementById("error");

const errorMessage =
    document.getElementById("errorMessage");

const usersSection =
    document.getElementById("usersSection");

const searchInput =
    document.getElementById("searchInput");

const refreshBtn =
    document.getElementById("refreshBtn");

const retryBtn =
    document.getElementById("retryBtn");

const resultCount =
    document.getElementById("resultCount");

const noResults =
    document.getElementById("noResults");


/* =========================
   FETCH API DATA
========================= */

async function fetchUsers() {

    showLoading();

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                `API request failed with status ${response.status}`
            );

        }


        const data =
            await response.json();


        users = data.results;

        filteredUsers = [...users];


        renderUsers();

        hideLoading();

    }

    catch (error) {

        console.error(error);

        showError(
            "Unable to load users. Please check your internet connection and try again."
        );

    }

}


/* =========================
   RENDER USERS
========================= */

function renderUsers() {

    userGrid.innerHTML = "";


    resultCount.textContent =
        `${filteredUsers.length} users`;


    if (filteredUsers.length === 0) {

        noResults.style.display =
            "block";

        return;

    }


    noResults.style.display =
        "none";


    filteredUsers.forEach(function (user) {

        const card =
            document.createElement("article");


        card.className =
            "user-card";


        const fullName =
            `${user.name.first} ${user.name.last}`;


        card.innerHTML = `

            <div class="user-top">

                <img
                    class="user-image"
                    src="${user.picture.large}"
                    alt="${fullName}"
                >

                <div>

                    <div class="user-name">
                        ${escapeHTML(fullName)}
                    </div>

                    <div class="user-username">
                        @${escapeHTML(user.login.username)}
                    </div>

                </div>

            </div>


            <div class="user-info">

                <div class="info-row">
                    <span class="info-icon">✉</span>
                    <span>
                        ${escapeHTML(user.email)}
                    </span>
                </div>


                <div class="info-row">
                    <span class="info-icon">☎</span>
                    <span>
                        ${escapeHTML(user.phone)}
                    </span>
                </div>


                <div class="info-row">
                    <span class="info-icon">⌖</span>
                    <span>
                        ${escapeHTML(user.location.city)},
                        ${escapeHTML(user.location.country)}
                    </span>
                </div>


                <div class="info-row">
                    <span class="info-icon">●</span>
                    <span>
                        ${escapeHTML(user.gender)}
                    </span>
                </div>

            </div>

        `;


        userGrid.appendChild(card);

    });

}


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    function () {

        const query =
            this.value.trim().toLowerCase();


        filteredUsers =
            users.filter(function (user) {

                const fullName =
                    `${user.name.first} ${user.name.last}`
                    .toLowerCase();


                const email =
                    user.email.toLowerCase();


                return (
                    fullName.includes(query)
                    ||
                    email.includes(query)
                );

            });


        renderUsers();

    }
);


/* =========================
   REFRESH
========================= */

refreshBtn.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        fetchUsers();

    }
);


/* =========================
   RETRY
========================= */

retryBtn.addEventListener(
    "click",
    function () {

        fetchUsers();

    }
);


/* =========================
   LOADING STATE
========================= */

function showLoading() {

    loading.style.display =
        "block";

    errorBox.style.display =
        "none";

    usersSection.style.display =
        "none";

}


function hideLoading() {

    loading.style.display =
        "none";

    errorBox.style.display =
        "none";

    usersSection.style.display =
        "block";

}


/* =========================
   ERROR STATE
========================= */

function showError(message) {

    loading.style.display =
        "none";

    usersSection.style.display =
        "none";

    errorBox.style.display =
        "block";

    errorMessage.textContent =
        message;

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================
   START APPLICATION
========================= */

fetchUsers();