Script to delete all X / Twitter tweets. (Credits go to ChatGPT, I didn't write any of this code)

### How to run:
- Open Chrome and go to your X profile (https://x.com/USERNAME/with_replies)
- Open Chrome Developer Console. Copy/Paste the code:

```
const deleteAllTweets = async () => {
  const processedButtons = new Set();
  const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const scrollToEnd = () => window.scrollTo(0, document.body.scrollHeight);

  const attemptDelete = async (button) => {
    processedButtons.add(button);
    button.click();
    await delay(250 + Math.random() * 250); // Adding some randomness to mimic human behavior

    const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
    const deleteOption = menuItems.find(item => item.textContent.includes('Delete'));

    if (deleteOption) {
      deleteOption.click();
      await delay(250 + Math.random() * 250);
      document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
      await delay(3000 + Math.random() * 1000);
    } else {
      const tweetContainer = button.closest('[data-testid="tweet"]');
      const unretweetButton = tweetContainer?.querySelector('[data-testid="unretweet"]');
      if (unretweetButton) {
        unretweetButton.click();
        await delay(250 + Math.random() * 250);
        document.querySelector('[data-testid="unretweetConfirm"]')?.click();
        await delay(3000 + Math.random() * 1000);
      }
    }
  };

  while (true) {
    const deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
    if (deleteButtons.length === 0) {
      scrollToEnd();
      await delay(5000); // Wait for more tweets to load
      if (getDeleteButtons().filter(button => !processedButtons.has(button)).length === 0) {
        break; // Exit if no new tweets are loaded
      } else {
        continue; // Otherwise, continue processing new tweets
      }
    }

    for (const button of deleteButtons) {
      await attemptDelete(button);
    }
  }

  console.log('All tweets deleted successfully!');
};

deleteAllTweets();
```
<img width="813" alt="Screenshot 2023-12-31 at 7 18 45 PM" src="https://github.com/techleadhd/XDelete/assets/61847557/473165c5-9b7c-4065-98fd-5856fcbfb3a8">
