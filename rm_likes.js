const removeLikes = async () => {
    const processedButtons = new Set();
    const getLikeButtons = () => Array.from(document.querySelectorAll('[data-testid="like"]'));
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (true) {
        const likeButtons = getLikeButtons().filter(button => !processedButtons.has(button));

        if (likeButtons.length === 0) break;

        for (const button of likeButtons) {
            processedButtons.add(button);
            button.click();
            await delay(3000);

            const undoLikeButton = document.querySelector('[data-testid="unlike"]');

            if (undoLikeButton) {
                undoLikeButton.click();
                await delay(3000);
            }
        }
    }

    console.log('All likes removed successfully!');
};

removeLikes();  