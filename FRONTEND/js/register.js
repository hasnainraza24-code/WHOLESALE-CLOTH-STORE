console.log("Register JavaScript is connected!");


const registerForm =
    document.getElementById("registerForm");

const registerMessage =
    document.getElementById("registerMessage");


registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password

        if (password !== confirmPassword) {

            registerMessage.textContent =
                "Passwords do not match.";

            registerMessage.style.color =
                "#8b5e52";

            return;
        }


        // Check password length

        if (password.length < 6) {

            registerMessage.textContent =
                "Password must contain at least 6 characters.";

            registerMessage.style.color =
                "#8b5e52";

            return;
        }


        // Get existing users

        const savedUsers =
            localStorage.getItem("users");


        let users = [];


        if (savedUsers) {

            users =
                JSON.parse(savedUsers);

        }


        // Check existing email

        const existingUser =
            users.find(function (user) {

                return user.email === email;

            });


        if (existingUser) {

            registerMessage.textContent =
                "An account with this email already exists.";

            registerMessage.style.color =
                "#8b5e52";

            return;
        }


        // Create new user

        const newUser = {

            name: name,

            email: email,

            password: password

        };


        users.push(newUser);


        // Save users

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        // Success message

        registerMessage.textContent =
            "Account created successfully!";

        registerMessage.style.color =
            "#66734a";


        // Clear form

        registerForm.reset();


        // Redirect to login

        setTimeout(
            function () {

                window.location.href =
                    "login.html";

            },
            1200
        );

    }
);