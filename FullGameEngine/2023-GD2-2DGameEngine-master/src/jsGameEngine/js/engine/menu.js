// Define a class called Menu
class Menu {
    // Method to toggle the visibility of a screen element
    toggleScreen(id, toggle) {
        // Get the element by its id
        let element = document.getElementById(id);
        // Set the display property based on the toggle value
        let display = (toggle) ? "block" : "none";
        element.style.display = display;
    }
}

// Export the Menu class as the default export
export default Menu;