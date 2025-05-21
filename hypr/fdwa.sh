#!/bin/bash

########### THIS ONLY WORKS WITH SWWW ############

# Set the directory path
directory="/home/bear/Downloads/wps"

# Loop through all image files in the directory
for file in "$directory"/*.jpg "$directory"/*.png "$directory"/*.gif; do
    # Extract the filename without path
    filename="${file##*/}"
    # Use the filename as the display text and the file path as the icon
    echo -en "${filename}\0icon\x1fthumbnail://${file}\n"
done | rofi -dmenu -show-icons -p "Select Image:" | while read selected_image; do
    # Execute the command with the selected image path
    swww img "/home/bear/Downloads/wps/${selected_image}"
done





