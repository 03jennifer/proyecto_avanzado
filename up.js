
    const backToTopButton = document.getElementById("back-to-top");

  
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) { 
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

   
    backToTopButton.addEventListener("click", (e) => {
        e.preventDefault(); 
        window.scrollTo({
            top: 0, 
            behavior: "smooth" 
        });
    });
