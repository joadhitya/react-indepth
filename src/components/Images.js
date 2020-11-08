import Axios from "axios";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useDebounce from "../utils/hooks/useDebounce";
import useFetchImage from "../utils/hooks/useFetchImage";
// import useScroll from "../utils/hooks/useScroll";
import Image from "./Image";
import Loading from "./Loading";

export default function Images() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [images, setImages, errors, isLoading] = useFetchImage(
    page,
    searchTerm
  );
  // const scrollPosition = useScroll();

  // useEffect(() => {
  //   console.log(scrollPosition)
  //   if (scrollPosition >= document.body.offsetHeight - window.innerHeight) {
  //     console.log(document.body.offsetHeight - window.innerHeight)
  //   }
  // }, [scrollPosition]);

  // useEffect(() => {
  //   if (scrollPosition >= document.body.offsetHeight - window.innerHeight) {
  //     setPage(page + 1);
  //   }
  // }, [scrollPosition]);

  const [newImageUrl, setNewImageUrl] = useState("");

  // const inputRef = useRef(null);

  // const varRef = useRef(images.length);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  function ShowImage() {
    const [showPreview, setShowPreview] = useState(false);
    return (
      <AnimateSharedLayout type="switch">
        <InfiniteScroll
          dataLength={images.length}
          next={() => setPage(page + 1)}
          hasMore={true}
          className="flex flex-wrap"
        >
          {images.map((img, index) => (
            <motion.div
              className="w-1/5 p-1 border flex justify-center"
              key={index}
              layoutId={img.urls.regular}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Image
                show={() => setShowPreview(img.urls.regular)}
                image={img.urls.regular}
                handleRemove={handleRemove}
                index={index}
              />
            </motion.div>
          ))}
        </InfiniteScroll>

        <AnimatePresence>
          {showPreview && (
            <motion.section
              layoutId={showPreview}
              exit={{ opacity: 0, rotate: 360, transition:{duration: 1} }}
              className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-40"
              onClick={() => setShowPreview(false)}
            >
              <div className="bg-white">
                <img
                  src={showPreview}
                  className="rounded"
                  width="300"
                  height="auto"
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    );
  }

  const debounce = useDebounce();
  function handleInput(e) {
    const text = e.target.value;
    debounce(() => setSearchTerm(text), 1000);
  }

  function handleAdd() {
    if (newImageUrl !== "") {
      setImages([...images, newImageUrl]);
      setNewImageUrl("");
    }
    ShowImage();
  }

  function handleChange(event) {
    setNewImageUrl(event.target.value);
  }

  function handleRemove(index) {
    // setImages(images.filter((image, i) => i !== index));
    setImages([
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ]);
  }

  return (
    <section>
      <div className="my-5">
        <input
          type="text"
          onChange={handleInput}
          className="w-full border rounded shadow p-2"
          placeholder="Search Photo Here"
        />
      </div>
      {errors.length > 0 && (
        <div className="flex h-screen">
          <p className="m-auto">{errors[0]}</p>
        </div>
      )}
      {/* style={{ columnCount: 5 }} */}
      <ShowImage />

      {/* {errors.length == 0 && (
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Load More
        </button>
      )} */}

      {/* <div className="flex justify-center my-5">
        <div className="w-full">
          <input
          id="inputBox"
          type="text"
          ref={inputRef}
          className="p-2 border border-gray-800 shadow rounded w-full"
          onChange={handleChange}
          value={newImageUrl}
          />
          </div>
          <div className="">
          <button
          disabled={newImageUrl === ""}
          className={`p-2  text-white ml-2 ${
            newImageUrl !== "" ? "bg-green-600" : "bg-green-200"
          }`}
          onClick={handleAdd}
          >
          Add
          </button>
        </div>
      </div> */}
      {isLoading && <Loading />}
    </section>
  );
}
