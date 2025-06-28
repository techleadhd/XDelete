Script to delete all X / Twitter tweets. (Credits go to ChatGPT, I didn't write any of this code)

### How to run:
- Open Chrome and go to your X profile (https://x.com/USERNAME/with_replies)
- Open Chrome Developer Console. Copy/Paste the code:

```
const deleteAllTweets = async () => {
  const processed = new Set();
  const selectors = {
    tweet: '[data-testid="tweet"]',
    caret: '[data-testid="caret"]',
    menuItem: '[role="menuitem"]',
    deleteConfirm: '[data-testid="confirmationSheetConfirm"]',
    unretweet: '[data-testid="unretweet"]',
    unretweetConfirm: '[data-testid="unretweetConfirm"]'
  };

  const delay = ms => {
    const jitter = ms * 0.25;
    const actual = ms + (Math.random() * jitter * 2 - jitter);
    return new Promise(resolve => setTimeout(resolve, actual));
  };

  const getButtons = () =>
    Array.from(document.querySelectorAll(`${selectors.tweet} ${selectors.caret}`))
      .filter(b => !processed.has(b));

  const scrollToEnd = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  const attemptDelete = async button => {
    try {
      processed.add(button);
      button.click();
      await delay(250);

      const menuItems = Array.from(document.querySelectorAll(selectors.menuItem));
      const deleteOption = menuItems.find(item => item.textContent.includes('Delete'));

      if (deleteOption) {
        deleteOption.click();
        await delay(250);
        const confirm = document.querySelector(selectors.deleteConfirm);
        if (confirm) {
          confirm.click();
          await delay(2000);
          return true;
        }
      }

      const tweet = button.closest(selectors.tweet);
      const unretweet = tweet?.querySelector(selectors.unretweet);
      if (unretweet) {
        unretweet.click();
        await delay(250);
        const confirm = document.querySelector(selectors.unretweetConfirm);
        if (confirm) {
          confirm.click();
          await delay(2000);
          return true;
        }
      }
    } catch (err) {
      console.error('Error attempting to delete/unretweet:', err);
    }
    return false;
  };

  while (true) {
    const buttons = getButtons();
    if (!buttons.length) {
      scrollToEnd();
      await delay(5000);
      if (!getButtons().length) break;
      continue;
    }

    for (const button of buttons) {
      await attemptDelete(button);
      await delay(500); // brief cooldown between deletions
    }

    scrollToEnd();
    await delay(2000); // help load more tweets
  }

  console.log('All tweets processed (deleted or unretweeted).');
};

deleteAllTweets().catch(err => console.error('Script failed:', err));
```
<img width="813" alt="Screenshot 2023-12-31 at 7 18 45 PM" src="https://github.com/techleadhd/XDelete/assets/61847557/473165c5-9b7c-4065-98fd-5856fcbfb3a8">
