const data = [
    {
        title: "COLLECTION",
        subtitle: "underground",
        price: "28€",
        image: "https://via.placeholder.com/400x360"
    },
    {
        title: "COOL HAT",
        subtitle: "Stylefresh",
        price: "30€",
        image: "https://via.placeholder.com/400x360"
    },
    {
        title: "ART BOOK",
        subtitle: "brush",
        price: "28€",
        image: "https://via.placeholder.com/400x360"
    },
    {
        title: "COLLECTION",
        subtitle: "underground",
        price: "28€",
        image: "https://via.placeholder.com/400x360"
    },
    {
        title: "COLLECTION",
        subtitle: "underground",
        price: "28€",
        image: "https://via.placeholder.com/400x360"
    },
    {
        title: "COLLECTION",
        subtitle: "underground",
        price: "28€",
        image: "https://via.placeholder.com/400x360"
    }
];
document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    data.forEach((item, i) => {
        const cardHTML = `
            <div class="card">
            <div class="card-image">
                <img src="${item.image}" alt="Card Image ${i + 1}">
                ${i === 0 || i === 1 || i === 3 || i===5 ? `
                <!-- Triángulo de precio -->
                <div class="price-tag">
                <div class="price-text">${parseFloat(item.price).toFixed(2)}€</div>
                </div>
                ${i === 0 ? `
                    <!-- Div con me gusta y compartir -->
                    <div class="interactions">
                    <div class="likes">
                        <span class="like-icon"></span>
                        <span class="like-count">123</span>
                    </div>
                    <div class="shares">
                        <span class="share-icon"></span>
                        <span class="share-count">45</span>
                    </div>
                    </div>
                    ` : ''}
                ` : ''}
            </div>
            <div class="card-details">
                <div class="card-texts">
                <div class="title">${item.title}</div>
                <div class="subtitle"><span style="color:  #BFBFBE;">by</span> ${item.subtitle}</div>
                </div>
            </div>
            </div>
        `;
        cardContainer.innerHTML += cardHTML;
    });
});