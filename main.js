const deleteAllTweets = async () => {
  let deleteButtons;

  while ((deleteButtons = document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]')).length > 0) {
    for (const button of deleteButtons) {
      button.click();
      await new Promise(resolve => setTimeout(resolve, 250));
      document.querySelector('[role="menuitem"]')?.click();
      document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('All tweets deleted successfully!');
};

deleteAllTweets();
