import React, { useEffect, useState } from "react";
import Rect1 from "../images/Rectangle 59.png";
import Rect2 from "../images/Rectangle 60.png";
import Rect3 from "../images/Group 38.png";
import axios from "axios";

const Box = () => {
  const COLORS = ["#4F46E5", "#DC2626", "#9333EA", "#16A34A", "#EAB308"];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/activity/recent`
      );
      console.log("object ", response.data);
      const transformedData = response.data.data.map((item, index) => ({
        time: item.orderDate,
        color: COLORS[index % COLORS.length],
        activity: item.status,
      }));

      setData(transformedData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <div className="p-4  w-7/10 lg:w-64 bg-white ml-4 rounded-md shadow-lg text-sm">
      <strong>Recent Activity</strong>
      {data.map((d, index) => (
        <div className="flex text-xs  items-center" key={index}>
          <strong className="w-12 pr-3 gap-14">
            {new Date(d.time).toLocaleString("en-IN", options)}
          </strong>
          <div className="flex flex-col mt-3 justify-center items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="gap-14 relative"
                cx="14"
                cy="14"
                r="11"
                stroke={d.color}
                strokeWidth="5"
              />
            </svg>
            {index < data.length - 1 && (
              <div
                className={` hr-container ${
                  index === 2 || index === 3 ? "w-7 mt-2 " : "w-4"
                }`}
              >
                <hr
                  className="justify-center items-center mt-3"
                  style={{
                    transform: "rotate(90deg)",
                    borderColor: "black",
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p
              className={`${index === 2 || index === 3 ? "mt-8" : "mt-0"} pl-3`}
            >
              {d.activity}
            </p>
            {(index === 2 || index === 3) && (
              <div className="flex pt-2 ">
                <img
                  src={Rect1}
                  alt="Image 1"
                  className="w-8 h-8 rounded-full ml-2"
                />
                <img
                  src={Rect2}
                  alt="Image 2"
                  className="w-8 h-8 rounded-full ml-2"
                />
                <img
                  src={Rect3}
                  alt="Image 3"
                  className="w-8 h-8 rounded-full ml-2"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Box;
