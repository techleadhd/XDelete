const deleteAllTweets = async () => {
  const noDeleteSet = new Set();

  const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  while (true) {
    const deleteButtons = getDeleteButtons().filter(button => !noDeleteSet.has(button));

    if (deleteButtons.length === 0) break;

    for (const button of deleteButtons) {
      button.click();
      await delay(250);

      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
      const deleteOption = menuItems.find(item => item.textContent === 'Delete');

      if (deleteOption) {
        deleteOption.click();
        document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
        await delay(3000);
      } else {
        noDeleteSet.add(button);

        const tweetContainer = button.closest('[data-testid="tweet"]');
        const unretweetButton = tweetContainer?.querySelector('[data-testid="unretweet"]');

        if (unretweetButton) {
          unretweetButton.click();
          await delay(250);
          document.querySelector('[data-testid="unretweetConfirm"]')?.click();
          await delay(3000);
        }
      }
    }
  }

  console.log('All tweets deleted successfully!');
};

deleteAllTweets();
