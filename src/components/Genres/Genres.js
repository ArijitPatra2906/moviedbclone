/* eslint-disable react-hooks/exhaustive-deps */
import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  setGenres,
  genres,
  setPages,
}) => {
  const handleAdd = (c) => {
    setSelectedGenres([...selectedGenres, c]);
    setGenres(genres.filter((g) => g.id !== c.id));
    setPages(1);
  };

  const handleRemove = (c) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== c.id)
    );
    setContent([...genres, content]);
    setPages(1);
  };
  const [content, setContent] = useState([]);

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=934ce1dc70ce983437001c75e2deaab6&language=en-US`
    );
    setGenres(data.genres);
  };

  //   console.log(genres);
  useEffect(() => {
    fetchGenres();

    return () => {
      setContent({});
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((c) => (
          <Chip
            label={c.name}
            style={{ margin: 2 }}
            clickable
            color="primary"
            size="small"
            onDelete={() => handleRemove(c)}
            key={c.id}
          />
        ))}

      {genres &&
        genres.map((c) => (
          <Chip
            label={c.name}
            style={{ margin: 2 }}
            clickable
            onClick={() => handleAdd(c)}
            size="small"
            key={c.id}
          />
        ))}
    </div>
  );
};

export default Genres;
