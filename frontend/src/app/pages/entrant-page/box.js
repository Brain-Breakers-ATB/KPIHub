function expandBox(buttonNumber) {
  // Get the element by its button class based on the buttonNumber
  const button = document.querySelector(`.button-${buttonNumber}`);

  // Check if the button element exists
  if (button) {
    // Add the "expanded" class to change the style
    button.classList.add('expanded');

    // Update the text content of the box
    button.textContent = "Expanded Box Text";
  } else {
    // If the button element does not exist, you can handle the error or perform some other action.
    console.log(`Button ${buttonNumber} not found.`);
  }
}
