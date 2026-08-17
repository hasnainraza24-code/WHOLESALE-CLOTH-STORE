console.log("Login JavaScript is connected!");


const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        // Get registered users

        const savedUsers =
            localStorage.getItem("users");


        let users = [];


        if (savedUsers) {

            users =
                JSON.parse(savedUsers);

        }


        // Find user

        const user =
            users.find(function (item) {

                return (
                    item.email === email &&
                    item.password === password
                );

            });


        // Login successful

        if (user) {

            loginMessage.textContent =
                "Login successful!";

            loginMessage.style.color =
                "#66734a";


            // Save login status

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            // Redirect

            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                1000
            );


        } else {

            loginMessage.textContent =
                "Invalid email or password.";

            loginMessage.style.color =
                "#8b5e52";

        }

    }
);