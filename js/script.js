/* =====================================================
   STUDENTHUB
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });



    /* =================================================
       MOBILE MENU
    ================================================= */

    const header = document.querySelector(".header");
    const nav = document.querySelector("nav");

    if (header && nav) {

        const menuButton =
            document.createElement("button");

        menuButton.className = "mobile-menu-btn";

        menuButton.innerHTML = "☰";

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        header.insertBefore(
            menuButton,
            nav
        );

        menuButton.addEventListener(
            "click",
            function () {

                nav.classList.toggle("mobile-open");

            }
        );

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    nav.classList.remove(
                        "mobile-open"
                    );

                }
            );

        });

    }



    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    const scrollLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    scrollLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (targetId === "#") {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });



    /* =================================================
       HERO BUTTON ANIMATION
    ================================================= */

    const buttons =
        document.querySelectorAll(
            ".btn-primary, .btn-secondary, .login-btn"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "mouseenter",
            function () {

                button.style.transition =
                    "0.25s ease";

            }
        );

    });



    /* =================================================
       FEATURE CARD ANIMATION
    ================================================= */

    const cards =
        document.querySelectorAll(
            ".feature, .dashboard-card, .event-card, .profile-stat-card"
        );

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show-card"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    cards.forEach(function (card) {

        observer.observe(card);

    });



    /* =================================================
       PROFILE FORM
    ================================================= */

    const profileForm =
        document.querySelector(
            ".profile-card form"
        );

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                showMessage(
                    "Profile updated successfully!",
                    "success"
                );

            }
        );

    }



    /* =================================================
       FEEDBACK FORM
    ================================================= */

    const feedbackForm =
        document.querySelector(
            ".feedback-card form"
        );

    if (feedbackForm) {

        feedbackForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                showMessage(
                    "Thank you! Your feedback has been submitted.",
                    "success"
                );

                feedbackForm.reset();

            }
        );

    }



    /* =================================================
       LOGIN FORM
    ================================================= */

    const loginForm =
        document.querySelector(
            ".auth-card form"
        );

    if (
        loginForm &&
        document.title.toLowerCase().includes("login")
    ) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const email =
                    loginForm.querySelector(
                        'input[type="email"]'
                    );

                const password =
                    loginForm.querySelector(
                        'input[type="password"]'
                    );


                if (
                    !email ||
                    !password
                ) {

                    return;

                }


                if (
                    email.value.trim() === "" ||
                    password.value.trim() === ""
                ) {

                    showMessage(
                        "Please enter your email and password.",
                        "error"
                    );

                    return;

                }


                showMessage(
                    "Login successful! Welcome to StudentHub.",
                    "success"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    1000
                );

            }
        );

    }



    /* =================================================
       REGISTER FORM
    ================================================= */

    const registerForm =
        document.querySelector(
            ".register-container form"
        );

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const password =
                    registerForm.querySelector(
                        'input[type="password"]'
                    );


                const terms =
                    registerForm.querySelector(
                        ".terms input"
                    );


                if (
                    password &&
                    password.value.length < 6
                ) {

                    showMessage(
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    return;

                }


                if (
                    terms &&
                    !terms.checked
                ) {

                    showMessage(
                        "Please accept the terms and conditions.",
                        "error"
                    );

                    return;

                }


                showMessage(
                    "Account created successfully!",
                    "success"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    1000
                );

            }
        );

    }



    /* =================================================
       EVENT SEARCH
    ================================================= */

    const eventSearch =
        document.querySelector(
            "#eventSearch"
        );

    const eventCards =
        document.querySelectorAll(
            ".event-card"
        );


    if (
        eventSearch &&
        eventCards.length > 0
    ) {

        eventSearch.addEventListener(
            "input",
            function () {

                const searchText =
                    eventSearch.value
                        .toLowerCase()
                        .trim();


                eventCards.forEach(
                    function (card) {

                        const text =
                            card.textContent
                                .toLowerCase();


                        if (
                            text.includes(
                                searchText
                            )
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }



    /* =================================================
       CURRENT YEAR
    ================================================= */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(
        function (element) {

            element.textContent =
                new Date().getFullYear();

        }
    );



    /* =================================================
       BACK TO TOP BUTTON
    ================================================= */

    const backToTop =
        document.createElement("button");

    backToTop.innerHTML = "↑";

    backToTop.className =
        "back-to-top";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(
        backToTop
    );


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 400) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =================================================
       MESSAGE FUNCTION
    ================================================= */

    function showMessage(
        message,
        type
    ) {

        const oldMessage =
            document.querySelector(
                ".js-message"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        const messageBox =
            document.createElement("div");


        messageBox.className =
            "js-message " + type;


        messageBox.textContent =
            message;


        document.body.appendChild(
            messageBox
        );


        setTimeout(
            function () {

                messageBox.classList.add(
                    "hide"
                );

            },
            3000
        );


        setTimeout(
            function () {

                messageBox.remove();

            },
            3500
        );

    }

});
