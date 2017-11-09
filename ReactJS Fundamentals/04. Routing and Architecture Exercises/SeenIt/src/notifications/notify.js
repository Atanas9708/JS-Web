let notify = (() => {

    function showInfo(message) {
        let infoBox = document.getElementById('infoBox');
        infoBox.textContent = message;
        infoBox.style.display = 'block';
        setTimeout(() => infoBox.style.display = 'none', 5000);
    }

    function showError(message) {
        let errorBox = document.getElementById('errorBox');
        errorBox.textContent = message;
        errorBox.style.display = 'block'
        setTimeout(() => errorBox.style.display = 'none', 5000);
    }

    function handleError(err) {
        showError(err.description);
    }

    return {
        showInfo,
        showError,
        handleError
    }

})();

export default notify;