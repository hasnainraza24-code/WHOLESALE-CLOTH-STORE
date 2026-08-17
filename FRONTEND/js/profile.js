console.log("Profile JavaScript is connected!");


const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const logoutButton =
    document.getElementById("logoutButton");


// Check login status

const isLoggedIn =
    localStorage.getItem("isLoggedIn");

const currentUser =
    localStorage.getItem("currentUser");


if (
    isLoggedIn !== "true" ||
    !currentUser
) {

    window.location.href =
        "login.html";

} else {

    const user =
        JSON.parse(currentUser);


    // Display user information

    profileName.textContent =
        user.name;

    profileEmail.textContent =
        user.email;

}


// Logout

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "isLoggedIn"
        );

        localStorage.removeItem(
            "currentUser"
        );


        window.location.href =
            "login.html";

    }
);