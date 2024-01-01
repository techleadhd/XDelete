Script to delete all X / Twitter tweets. (Credits go to ChatGPT, I didn't write any of this code)

### How to run:
- Open Chrome and go to your X profile (https://x.com/USERNAME/with_replies)
- Open Chrome Developer Console. Copy/Paste the code:

```
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
```
<img width="813" alt="Screenshot 2023-12-31 at 7 18 45 PM" src="https://github.com/techleadhd/XDelete/assets/61847557/473165c5-9b7c-4065-98fd-5856fcbfb3a8">
