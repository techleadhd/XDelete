const deleteAllTweets = async () => {
  const noDeleteSet = new Set();

  const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));

  let deleteButtons = getDeleteButtons();

  while (deleteButtons.length - noDeleteSet.size > 0) {
    for (const button of deleteButtons) {
      if (noDeleteSet.has(button)) continue;

      button.click();
      await new Promise(resolve => setTimeout(resolve, 250));

      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
      const deleteOption = menuItems.find(item => item.textContent === 'Delete');

      if (deleteOption) {
        deleteOption.click();
        document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        button.click();
        noDeleteSet.add(button);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    deleteButtons = getDeleteButtons();
  }

  console.log('All tweets deleted successfully!');
};

deleteAllTweets();
