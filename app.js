const image_locations = [
    "memory_game_images/christopher_waller.jpg",
    "memory_game_images/jerome_powell.jpg",
    "memory_game_images/lael_brainard.jpg",
    "memory_game_images/lisa_cook.jpg",
    "memory_game_images/michael_barr.jpg",
    "memory_game_images/michelle_bowman.jpg",
    "memory_game_images/philip_jefferson.jpg"
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

const image_locations_2x = [];

for (let i = 0; i < image_locations.length * 2; i++) {
    image_locations_2x[i] = image_locations[Math.floor(i / 2)]
}

const image_locations_2x_random_order = [];

let index_of_new_array = 0;

while (image_locations_2x.length != 0) {
    let random_number_for_index_of_original_array = Math.floor(Math.random() * image_locations_2x.length);
    image_locations_2x_random_order[index_of_new_array] = image_locations_2x[random_number_for_index_of_original_array];
    image_locations_2x.splice(random_number_for_index_of_original_array, 1);
    index_of_new_array++;
}

let number_of_clicks = 0;

let black_boxes = document.querySelectorAll(".black-box");

const remove_image_from_black_box = function(div_element) {
    if (!div_element.classList.contains("matched-box")) {
        div_element.style.backgroundColor = "black";
        div_element.style.removeProperty("background-image");
    }
}

const remove_images_from_all_black_boxes = function() {
    for (let i = 0; i < black_boxes.length; i++) {
        let black_box = black_boxes[i];
        remove_image_from_black_box(black_box);
    }
}

const add_image_to_black_box = function(div_element, image_location) {
    div_element.style.removeProperty("background-color");
    div_element.style.backgroundImage = "url(" + image_location + ")";
    div_element.style.backgroundSize = "100% 100%";
}

let first_image_selection;
let second_image_selection;

const react_to_user_clicks = function(div_element, image_location) {
    if (number_of_clicks === 0) {
        add_image_to_black_box(div_element, image_location);
        number_of_clicks++;
        first_image_selection = image_location;
        div_element.classList.add("first-selected");
    } else if (number_of_clicks === 1) {
        add_image_to_black_box(div_element, image_location);
        number_of_clicks++;
        second_image_selection = image_location;
        if (first_image_selection === second_image_selection && !div_element.classList.contains("first-selected")) {
            div_element.classList.add("matched-box");
            div_element.classList.remove("black-box");
            for (let i = 0; i < black_boxes.length; i++) {
                if (black_boxes[i].classList.contains("first-selected")) {
                    black_boxes[i].classList.add("matched-box");
                    black_boxes[i].classList.remove("first-selected");
                    black_boxes[i].classList.remove("black-box");
                }
            }
        } else {
            first_image_selection = "";
            second_image_selection = "";
            for (let i = 0; i < black_boxes.length; i++) {
                if (black_boxes[i].classList.contains("first-selected")) {
                    black_boxes[i].classList.remove("first-selected");
                }
            }
        }
    } else {
        remove_images_from_all_black_boxes();
        number_of_clicks = 0;
    }
}

for (let i = 0; i < black_boxes.length; i++) {
    let black_box = black_boxes[i];
    black_box.addEventListener("click", function() {
        react_to_user_clicks(this, image_locations_2x_random_order[i]);
    });
}

console.log(image_locations_2x_random_order);