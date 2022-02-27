let showContacts = false;
$("#contactBubbleLink").onclick = (e => {
    showContacts = !showContacts
    $("#contactPage").classList.toggle("open")
    $("#contactPage").classList.toggle("closed")
    $("body").classList.toggle("nonscrollable")
    $("#contactBubbleLink").classList.toggle("open")
})