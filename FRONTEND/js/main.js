console.log("Main JavaScript is connected!");



/* =========================================
   DYNAMIC LOGIN / PROFILE LINK
   (desktop nav + mobile sidebar nav)
   ========================================= */

function updateAuthLink(nav, linkClass) {

    if (!nav) {
        return;
    }


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


            newProfileLink.className =
                linkClass;


            newProfileLink.innerHTML =
                '<i class="fa-solid fa-user"></i><span>Profile</span>';


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


            newLoginLink.className =
                linkClass;


            newLoginLink.innerHTML =
                '<i class="fa-solid fa-user"></i><span>Login</span>';


            nav.appendChild(
                newLoginLink
            );

        }

    }

}


const desktopNav =
    document.querySelector(".navbar .main-nav");

const sidebarNav =
    document.querySelector(".sidebar-nav");


updateAuthLink(desktopNav, "nav-link");
updateAuthLink(sidebarNav, "sidebar-link");



/* =========================================
   MOBILE HAMBURGER / SIDEBAR
   ========================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileSidebar =
    document.getElementById("mobileSidebar");

const sidebarCloseButton =
    document.getElementById("sidebarCloseButton");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


if (
    mobileMenuButton &&
    mobileSidebar &&
    sidebarOverlay
) {

    function openSidebar() {

        mobileSidebar.classList.add(
            "active"
        );

        sidebarOverlay.classList.add(
            "active"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "sidebar-open"
        );

    }


    function closeSidebar() {

        mobileSidebar.classList.remove(
            "active"
        );

        sidebarOverlay.classList.remove(
            "active"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "sidebar-open"
        );

    }


    mobileMenuButton.addEventListener(
        "click",
        openSidebar
    );


    if (sidebarCloseButton) {

        sidebarCloseButton.addEventListener(
            "click",
            closeSidebar
        );

    }


    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );


    document
        .querySelectorAll(".sidebar-link")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeSidebar
            );

        });


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeSidebar();

            }

        }
    );

}
