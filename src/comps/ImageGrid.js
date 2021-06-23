import { motion } from "framer-motion";
import useFetch from "./service/useFetch";
import { useState, useEffect } from "react";
import { div } from "prelude-ls";

export const ImageGrid = ({ setSelectedImg, setData }) => {
  const { data, isPending, error } = useFetch(
    "https://jsonplaceholder.typicode.com/albums/1/photos"
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (favorite) => {
    console.log(favorite);
    setFavorites(favorite);
    if (
      !favorites.some((alreadyFavorite) => alreadyFavorite.id == favorite.id)
    ) {
      setFavorites([...favorites, favorite]);
    }
  };

  //this improve search result with Regex
  let checkName = (name, str) => {
    var pattern = str
      .split("")
      .map((x) => {
        return `(?=.*${x})`;
      })
      .join("");
    var regex = new RegExp(`${pattern}`, "g");
    return name.match(regex);
  };

  // i'm using filter() method to filter array
  useEffect(() => {
    setFilter(
      data &&
        data.filter((images) => {
          var searchImg = search.toLowerCase().substring(0, 3);
          var dataImg = images.title.substring(0, 3).toLowerCase();
          return (
            images.title.toLowerCase().includes(search.toLowerCase()) ||
            checkName(dataImg, searchImg)
          );
        })
    );
  }, [search, data]);
  console.log(favorites);
  return (
    <>
      <input
        type="text"
        placeholder=" Search image"
        className="searchbox"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="img-grid">
        {error && <div style={{ color: "skyblue" }}>{error}</div>}
        {isPending && <div style={{ color: "skyblue" }}>Loading...</div>}
        {filter &&
          filter.map((img) => (
            <div>
              <motion.div
                layout
                whileHover={{ opacity: 0.5 }}
                onClick={() => setSelectedImg(img.url) & setData(img)}
                key={img.id}
                className="img-wrap"
              >
                <motion.img
                  src={img.thumbnailUrl}
                  alt="Img"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
              </motion.div>
              <button onClick={() => addFavorite(img)}>Add to Favorites</button>
            </div>
          ))}
      </div>
      <h1 style={{ color: "white" }}>Favorite Image</h1>
      {favorites &&
        favorites.map((img, index) => (
          <div>
            <div>{img.title}</div>
            <motion.div
              layout
              whileHover={{ opacity: 0.5 }}
              onClick={() => setSelectedImg(img.url) & setData(img)}
              key={img.id + index}
              className="img-wrap"
            >
              <motion.img
                src={img.thumbnailUrl}
                alt="Img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          </div>
        ))}
    </>
  );
};
