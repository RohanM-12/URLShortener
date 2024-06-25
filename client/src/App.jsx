import { Alert, Button, Input } from "antd";
import "./App.css";
import { XOutlined, LinkedinOutlined, GithubOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API;
function App() {
  const [url, setUrl] = useState("");
  const [shortURL, setShortURL] = useState("");
  const handleSubmit = async () => {
    try {
      if (url.length == 0) return toast.error("Please enter URL");
      console.log(url.substring(0, 8));
      if (url.substring(0, 8) !== "https://")
        return toast.error("Please provide a valid https:// URL");
      const { data } = await axios.post("/url", {
        redirectURL: url,
      });

      if (data) {
        setShortURL(data?.id);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen flex justify-center items-center">
        <div className="p-10 border-blue-200 border-2 rounded-xl bg-teal-100 drop shadow-2xl ">
          <div className="text-center font-bold font-mono text-3xl text-blue-400 drop-shadow-2xl  ">
            URL SHORTENER
          </div>
          <div className="my-2 ">
            <Input
              className="w-96 text-center"
              size="large"
              onChange={(e) => {
                console.log(e.target.value);
                setUrl(e.target.value);
              }}
              placeholder="Paste your URL"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm p-5 my-5 text-center me-2 mb-2 "
            >
              Shorten URL
            </Button>
          </div>
          {shortURL.length > 0 && (
            <div className="my-3">
              <Alert
                message={`${import.meta.env.VITE_REACT_APP_API}${shortURL}`}
                type="success"
                showIcon
              />
            </div>
          )}
          <div className="  flex justify-center slide-up my-5 ">
            <span className="bg-blue-100 m-0 p-1 rounded-xl w-72 text-center">
              <p className="text-black font-bold my-1">Connect With Me </p>

              <GithubOutlined
                className="mx-2 text-2xl "
                onClick={() =>
                  (window.location.href = "https://github.com/RohanM-12")
                }
              />
              <LinkedinOutlined
                className="mx-2 text-2xl "
                onClick={() =>
                  (window.location.href =
                    "https://www.linkedin.com/in/rohan-m1212/")
                }
              />
              <XOutlined
                className="mx-2 text-2xl "
                onClick={() =>
                  (window.location.href = "https://twitter.com/Rohan_M1212")
                }
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
