(function() {
    let message = 'Hey there world !!';
    let ind = 0;
    const messageArray = Array(5).fill(message);
    const inputElement = document.querySelector('[aria-label="Type a message"][contenteditable="true"]');
    const sendButtonParentElement = document.querySelector('[data-tab="11"]').parentElement;

    const mutationCallback = ([,newRecord]) => {
        try {
            const [sendButton] = newRecord.addedNodes;
            // send Button ==> input has text message
            if(sendButton && sendButton.ariaLabel === 'Send') {
                console.log(ind)
                sendButton.click();
            // send voice message ==> Input has been cleared
            } else {
                ind++;
                sendMessage(messageArray[ind], ind);
            }
        } catch (e) {
            console.log(e.message, e);
        }
    }

    const observer = new MutationObserver(mutationCallback);
    observer.observe(sendButtonParentElement, { childList: true });

    function sendMessage(msg, msgInd) {
        if(msgInd >= messageArray.length) {
            observer.disconnect();
            return;
        }

        inputElement.dispatchEvent(new InputEvent('input', {
            _lexicalHandled: true,
            bubbles: true,
            composed: true,
            data: msg,
            inputType: "insertText",
        }));
    }

    sendMessage(messageArray[ind], ind);
})();
