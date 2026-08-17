console.log("Main JavaScript is connected!");



/* =========================================
   DYNAMIC LOGIN / PROFILE LINK
   ========================================= */

const nav =
    document.querySelector(".navbar nav");


if (nav) {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");


    const loginLink =
        nav.querySelector(
            'a[href="login.html"]'
        );


    const profileLink =
        nav.querySelector(
            'a[href="profile.html"]'
        );


    if (
        isLoggedIn === "true"
    ) {

        // Remove Login link

        if (loginLink) {

            loginLink.remove();

        }


        // Add Profile link

        if (!profileLink) {

            const newProfileLink =
                document.createElement("a");


            newProfileLink.href =
                "profile.html";


            newProfileLink.textContent =
                "Profile";


            nav.appendChild(
                newProfileLink
            );

        }

    } else {

        // Remove Profile link

        if (profileLink) {

            profileLink.remove();

        }


        // Add Login link

        if (!loginLink) {

            const newLoginLink =
                document.createElement("a");


            newLoginLink.href =
                "login.html";


            newLoginLink.textContent =
                "Login";


            nav.appendChild(
                newLoginLink
            );

        }

    }

}