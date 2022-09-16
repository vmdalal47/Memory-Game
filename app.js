const image_locations = [
    "memory_game_images/christopher_waller.jpeg",
    "memory_game_images/jerome_powell.jpeg",
    "memory_game_images/lael_brainard.jpeg",
    "memory_game_images/lisa_cook.jpeg",
    "memory_game_images/michael_barr.jpeg",
    "memory_game_images/michelle_bowman.jpeg",
    "memory_game_images/philip_jefferson.jpeg"
]

const image_container = document.getElementById("image-container");
const number_of_images = image_locations.length;

const populate_row_of_empty_boxes = function(row_number_class) {
    let row_container = document.createElement("div");
    
    for (let i = 0; i < number_of_images; i++) {
        let black_box = document.createElement("div");
        black_box.classList = "black-box";
        black_box.classList.add(row_number_class);
        row_container.appendChild(black_box);
    }
    image_container.appendChild(row_container);
}

populate_row_of_empty_boxes("row_one");

populate_row_of_empty_boxes("row_two");

