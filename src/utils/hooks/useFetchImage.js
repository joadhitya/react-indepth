import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

const api = process.env.REACT_APP_UNSPLASH_API;
const secret = process.env.REACT_APP_UNSPLASH_KEY;
export default function useFetchImage(page, searchTerm) {
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiProd = `${api}/search/photos?client_id=${secret}&page=${page}&query=${searchTerm}`;
  const apiDev = process.env.REACT_APP_UNSPLASH_LOCAL;

  function fetch() {
    const url =
      searchTerm === null ? "photos?" : `search/photos?query=${searchTerm}&`;
    Axios.get(`${api}/${url}client_id=${secret}&page=${page}`)
      .then((res) => {
        if (searchTerm === null) {
          fetchRandom(res);
        } else {
          fetchSearch(res);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setErrors(["Unable to get Image"]);
        setIsLoading(false);
      });
  }

  function fetchSearch(res) {
    if (page > 1) {
      setImages([...images, ...res.data.results]);
    } else {
      setImages([...res.data.results]);
    }
  }

  function fetchRandom(res) {
    setImages([...images, ...res.data]);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch();
    // const url = searchTerm === null ? "/photos" : "/search/photos";
  }, [page, searchTerm]);

  // useEffect(() => {
  //   if (searchTerm === null) return;
  //   setIsLoading(true);
  //   fetch();
  // }, [searchTerm]);
  return [images, setImages, errors, isLoading];
}
