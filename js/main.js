let cards = document.querySelectorAll(".card"),
    counter = 0,
    correct = 0,
    indexes = [],
    shuffled = [],
    selected = [];

while (indexes.length < 20) {
    let num = Math.floor(Math.random() * 20);
    if (!indexes.includes(num)) {
        indexes.push(num);
    }
}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
        if (this.dataset.status == "correct") return;
        this.classList.add("active");
        new Audio("./assets/card.wav").play();
        selected.push(this);
        counter++;
        if (counter == 2) {
            checkSelection();
        }
    });
    cards[i].style.order = indexes[i] + 1;
}

function checkSelection() {
    let firstCard = selected[selected.length - 1],
        secondCard = selected[selected.length - 2];
    if (
        firstCard.dataset.name == secondCard.dataset.name &&
        firstCard !== secondCard
    ) {
        firstCard.dataset.status = "correct";
        secondCard.dataset.status = "correct";
        new Audio("./assets/correct.wav").play();
        correct++;
        if (correct == 10) {
            document.getElementById("winner").style.opacity = 1;
            new Audio("./assets/winner.wav").play();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("active");
            secondCard.classList.remove("active");
        }, 500);
    }
    counter = 0;
}
