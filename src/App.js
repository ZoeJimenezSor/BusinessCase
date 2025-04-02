import React, { useEffect, useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

const query = `
  query Images($title: String) {
      images(title: $title) {
        nodes {
          author
          id
          liked
          likesCount
          picture
          price
          title
        }
      }
    }
  `;

  const likeMutation = `
  mutation LikeImage($imageId: ID!) {
    likeImage(input: { imageId: $imageId }) {
      image {
        id
        liked
        likesCount
      }
    }
  }
`;


  const fetchImages = async (title) => {
    try {
      const response = await fetch("https://sandbox-api-test.samyroad.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: {
            title: title || null,
          },
        }),
      });

      const json = await response.json();
      setImages(json.data.images.nodes); 
    } catch (error) {
      setError("Error fetching images");
      console.error("Error fetching images:", error);
    }
  };

  const likeImage = async (imageId) => {
    try {
      const response = await fetch("https://sandbox-api-test.samyroad.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: likeMutation,
          variables: {
            imageId: imageId, 
          },
        }),
      });

      const json = await response.json();
      const updatedImage = json.data.likeImage.image;

      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === imageId
            ? { ...image, likesCount: updatedImage.likesCount, liked: updatedImage.liked }
            : image
        )
      );
    } catch (error) {
      console.error("Error liking the image:", error);
    }
  };

  useEffect(() => {
    fetchImages(""); 
  }, []); 
  
  useEffect(() => {
    fetchImages(searchTitle); 
  }, [searchTitle]); 

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <img src="https://elreferente.es/wp-content/uploads/2021/04/SAMY.png" alt="Logo" className="logo" />
          <div className="search-container">
          <input
              type="text"
              placeholder="You're looking for something?"
              className="search-input"
              value={searchTitle}
              onChange={handleSearchChange}
            />
            <span className="search-icon"></span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="card-container" id="card-container">
          {error ? (
            <p>{error}</p>
          ) : (
            images.map((item, i) => (
              <div className="card" key={i}>
                <div className="card-image">
                  <img src={item.picture} />
                  {/* Triángulo de precio */}
                  <div className="price-tag">
                    <div className="price-text">
                      {parseFloat(item.price).toFixed(2)}€
                    </div>
                  </div>
                    <div className="interactions">
                      <div className="likes">
                      <span
                        className="like-icon"
                        style={{
                          backgroundImage: `url(${item.liked ? '/like.svg' : '/dislike.svg'})`,
                          cursor: 'pointer',
                        }}
                        onClick={() => likeImage(item.id)} 
                      >
                      </span>
                        <span className="like-count">{item.likesCount}</span>
                      </div>
                      <div className="shares">
                        <span className="share-icon"></span>
                        <span className="share-count">0</span>
                      </div>
                    </div>
                </div>
                <div className="card-details">
                  <div className="card-texts">
                    <div className="title line-clamp-1">{item.title}</div>
                    <div className="subtitle">
                      <span style={{ color: "#BFBFBE" }}>by</span>{" "}
                      { item.author}
                    </div>
                  </div>
                </div>
                <div className="interactions-mobile">
                <div className="interaction-column">
                  <span
                    className="like-icon"
                    style={{
                      backgroundImage: `url(${item.liked ? '/like.svg' : '/dislike.svg'})`,
                      cursor: 'pointer',
                    }}
                    onClick={() => likeImage(item.id)} 
                  />
                  <span className="like-count">{item.likesCount}</span>
                </div>

                {/* Columna de Shares */}
                <div className="interaction-column">
                  <span className="share-icon"></span>
                  <span className="share-count">0</span>
                </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
