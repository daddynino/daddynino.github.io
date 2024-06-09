function checkGoogle() {
    const textbox = document.getElementById("GoogleSearch");
    if (textbox.value.length > 0) {
        window.open('https://google.com/search?q=' + encodeURIComponent(textbox.value), '_blank');
    } else {
        alert("Please enter a search value");
        return false;
    }
}

function checkYouTube() {
    const textbox = document.getElementById("youtubeSearch");
    if (textbox.value.length > 0) {
        window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(textbox.value), '_blank');
    } else {
        alert("Please enter a search value");
        return false;
    }
}