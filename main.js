const deleteAllTweets = async () => {
  // Keep track of tweets that don't have a delete option
  const noDeleteSet = new Set();

  let deleteButtons = Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));

  while (deleteButtons.length > 0) {
    for (const button of deleteButtons) {
      // Check if this tweet has already been identified as not having a delete option
      if (noDeleteSet.has(button)) {
        continue; // Skip this one
      }

      button.click();
      await new Promise(resolve => setTimeout(resolve, 250));

      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
      const deleteOption = menuItems.find(item => item.textContent === 'Delete'); // Adjust the text 'Delete' if it's labeled differently

      if (deleteOption) {
        deleteOption.click();
        document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        // Close the menu by clicking the button again or another method to ensure closing
        button.click(); // or use another method to ensure the menu is closed
        noDeleteSet.add(button); // Mark this tweet as not having a delete option
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait a bit longer for any animations or updates
      }
    }

    // Refresh the list of delete buttons
    deleteButtons = Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));
  }

  console.log('All tweets deleted successfully!');
};

deleteAllTweets();
