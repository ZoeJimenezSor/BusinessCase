document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    for (let i = 0; i < 6; i++) {
        const cardHTML = `
            <div class="card">
                <div class="card-image">
                    <img src="https://via.placeholder.com/400x360" alt="Card Image ${i + 1}">
                </div>
                <div class="card-details">
                    <div class="card-texts">
                        <div class="title">COLLECTION</div>
                        <div class="subtitle">by underground</div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.innerHTML += cardHTML;
    }
});