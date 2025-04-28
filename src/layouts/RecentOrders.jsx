import React, { useContext, useEffect, useState } from "react";
import { HiEye, HiTrash, HiPencil } from "react-icons/hi";
import { FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/context/UserContext";

// Function to style the order status
function getOrderStatus(status) {
  switch (status) {
    case "Active":
      return (
        <span className="flex justify-center items-center capitalize  rounded-full text-xs font-bold text-green-500 bg-green-100 border border-green-500">
          {status}
        </span>
      );
    case "Deactivated":
      return (
        <span className="flex justify-center items-center capitalize  rounded-full text-xs font-bold text-red-500 bg-red-100 border border-red-500">
          {status}
        </span>
      );
    default:
      return (
        <span className="flex justify-center items-center capitalize  rounded-md text-xs font-bold text-gray-600 bg-gray-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}

// Function for alternate gray and white
function alternate(index) {
  if (index % 2 !== 0) {
    return "bg-white";
  }
}

// Dummy Values
const Customers = ({ data }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [authenticated] = useContext(UserContext);
  const sellerId = authenticated.user._id;
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  console.log(data);
  const [order, setOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const togglePopup = () => {
    setShowPopup(true);
  };

  // Sort Column
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  console.log(data, "dd");

  let sellerData = [];

  if (data) {
    data.map((item) => {
      if (item.userId === sellerId) {
        sellerData.push(item);
      }
    });
  }

  console.log(sellerData, "sed");

  // Pagination
  const totalPages = Math.ceil(sellerData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sellerData.length);
  const currentData = sellerData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="rounded-lg shadow lg:w-full ">
        <div className="flex flex-row w-full">
          <div className="pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="border-x border-gray-200 rounded-sm ">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b-2">
                    <th className="mytable">S. No.</th>
                    <th>
                      <div className="flex items-center">
                        Order No.
                        <FaSort
                          className=" hover:cursor-pointer"
                          onClick={() => {
                            sorting("order_no");
                          }}
                        />
                      </div>
                    </th>
                    <th>
                      <div className="flex items-center">
                        Customer Name
                        <FaSort
                          className="ml-2 hover:cursor-pointer"
                          onClick={() => {
                            sorting("customer_name");
                          }}
                        />
                      </div>
                    </th>

                    <th className="pr-52">E-Mail</th>
                    <th>
                      <div className="flex items-center justify-between">
                        Date
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => {
                            sorting("date");
                          }}
                        />
                      </div>
                    </th>
                    <th>Amount</th>
                    <th>
                      <div className="flex items-center justify-between">
                        Status
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => {
                            sorting("status");
                          }}
                        />
                      </div>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length < 0 ? (
                    <>
                    {currentData.map((d, index) => (
                    <tr
                      key={startIndex + d.id}
                      className={alternate(startIndex + index + 1)}
                    >
                      <td className="mytable">{startIndex + index + 1}</td>

                      <td>{d._id}</td>

                      <td>{d.userId?.name}</td>
                      <td className="pl-0">{d.userId?.email}</td>
                      <td>{new Date(d.orderDate).toLocaleDateString()}</td>
                      <td className="ms-2">{d.totalPrice}</td>
                      <td className="text-sm">{getOrderStatus(d.status)}</td>
                      <td className="">
                        <div className="flex justify-center items-center gap-2">
                          <HiEye
                            onClick={togglePopup}
                            name="eye-fill"
                            className="hover:cursor-pointer text-sm items-center justify-center flex"
                          ></HiEye>
                        </div>
                      </td>
                    </tr>
                  ))}
                    </>
                  ):
                  (
                    <>
                    <p>Data not Found</p>
                    </>
                  )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        {
          data.length < 0 &&(
            <div className="flex justify-between items-center ml-4 mr-4 mb-10">
          <div className="font-semibold">
            Showing {startIndex + 1}-{Math.min(endIndex, data.length)} entries
          </div>
          <div className="flex">
            {/* Previous Page Button */}
            <button
              className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700"
              onClick={() =>
                handlePageChange(
                  currentPage === 1 ? totalPages : currentPage - 1
                )
              }
            >
              &lt;
            </button>
            {/* Page Number Button */}
            <button className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700">
              Page {currentPage} of {totalPages}
            </button>
            {/* Next Page Button */}
            <button
              className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700"
              onClick={() =>
                handlePageChange(
                  currentPage === totalPages ? 1 : currentPage + 1
                )
              }
            >
              &gt;
            </button>
          </div>
        </div>
          )
        }
        
      </div>
    </>
  );
};

export default Customers;
