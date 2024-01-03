const deleteAllPostsAndReposts = async () => {
    const processedButtons = new Set();
    const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));
    const getUnretweetButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="unretweet"]'));
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (true) {
        const deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
        const unretweetButtons = getUnretweetButtons().filter(button => !processedButtons.has(button));

        if (deleteButtons.length === 0 && unretweetButtons.length === 0) break;

        for (const button of deleteButtons) {
            processedButtons.add(button);
            button.click();
            await delay(250);

            const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
            const deleteOption = menuItems.find(item => item.textContent === 'Delete');

            if (deleteOption) {
                deleteOption.click();
                document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
                await delay(3000);
            }
        }

        for (const button of unretweetButtons) {
            processedButtons.add(button);
            button.click();
            await delay(250);
            document.querySelector('[data-testid="unretweetConfirm"]')?.click();
            await delay(3000);
        }
    }

    console.log('All posts and reposts deleted successfully!');
};

deleteAllPostsAndReposts();  