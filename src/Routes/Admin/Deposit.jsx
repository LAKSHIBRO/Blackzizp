import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ModalImage from "react-modal-image";
import { Switch } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { env_data } from "../../config/config";
import "./style.css";

export const Modal = ({ src, alt, caption, onClose }) => {
  return (
    <div className="modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <img className="modal-content" src={src} alt={alt} />
      {caption.length > 0 && <div className="caption">{caption}</div>}
    </div>
  );
};
const Deposit = () => {
  useEffect(() => {
    getHistory();
  }, []);
  const openURL = (item) => {
    console.log("🚀 ~ openURL ~ item:", `${env_data.base_url / item}`);
    window.open(
      `${env_data.base_url}/${item.replace("uploads/", "")}`,
      "_blank"
    ); // Opens in a new tab/window
  };
  const [resData, setResData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => setIsOpen(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getHistory = async () => {
    const respo3 = await axios
      .get(`${env_data.base_url}/GetDepositDetails`)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res.data.deposits);
        setDepositDetails(res.data.deposits);
      });
    console.log("🚀 ~ getHistoryWal ~ respo3:", respo3);
  };
  const [depositDetails, setDepositDetails] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});
  const [selectedRowCount, setSelectedRowCount] = useState(10);

  // const handleRowToggle = async (rowId, newValue) => {
  //   console.log("Before toggle - Checked Rows:", rowId, newValue);
  //   // UpdateRecharge
  //   const responseWithdrawal = await axios.put(
  //     `${env_data.base_url}/UpdateRecharge`,
  //     {
  //       id: rowId,
  //       status: newValue,
  //     }
  //   );
  //   console.log(
  //     "🚀 ~ handleRowToggle ~ responseWithdrawal:",
  //     responseWithdrawal
  //   );
  //   getHistory();
  //   setCheckedRows((prevCheckedRows) => ({
  //     ...prevCheckedRows,
  //     [rowId]: !prevCheckedRows[rowId],
  //   }));

  //   setTimeout(() => {
  //     const selectedItem = depositDetails.find((item) => item.id === rowId);
  //     console.log("Item ID:", selectedItem.id);
  //     console.log("Item Status:", selectedItem.status);
  //   }, 0);
  // };
  const handleRowToggle = async (itemId, isChecked) => {
    // Implement your logic to handle the toggle action
    console.log(
      `Toggled item with id ${itemId?.id}. New checked status: ${isChecked}`
    );
    try {
      //   setWait(true);
      const res = await axios.put(`${env_data.base_url}/UpdateRecharge`, {
        status: isChecked,
        id: itemId?.id,
      });
      console.log("🚀 ~ handleRowToggle ~ res:", res);
      getHistory();
    } catch (error) {}
    // You might want to update the state or perform other actions here
  };
  const limitedTableData = depositDetails
    ?.slice(0, selectedRowCount)
    .map((row) => ({
      ...row,
      checked: checkedRows[row.id] || false,
    }));

  return (
    <div className="w-full bg-[#1E1E1E] h-full fixed right-0 flex flex-col ">
      <div className="res-body lg:ml-[300px] md:ml-[100px] flex flex-col">
        <div
          className="flex flex-col dash-body w-full h-screen sm:p-8 p-3 overflow-y-scroll pt-[66px] "
          id="style-6"
        >
          <h2 className="text-[24px] font-semibold text-white">Deposits</h2>
          {isOpen && (
            <Modal
              src="https://source.unsplash.com/NQSWvyVRIJk/800x599"
              alt="snow"
              caption="caption"
              onClose={() => setIsOpen(false)}
            />
          )}
          <div className="w-full rounded-md border-[1px] border-[#565656] h-auto flex flex-col mt-5 p-5 bg-[#151515]">
            <div className="w-full justify-end items-center flex flex-row">
              <div className="flex flex-row justify-center items-center space-x-3">
                <span className="text-white font-normal text-[12px] ">
                  Search
                </span>
                <div className="sm:w-[200px] sm:h-[44px] bg-[#565656] bg-opacity-10 rounded-[3px] relative flex justify-between items-center">
                  <input
                    type="text"
                    className="bg-transparent oultine-none sm:w-[200px] border-none p-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="dash-table mt-5 w-full  overflow-x-auto">
              <table className="w-full border-[1px] border-[#565656] ">
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px]  border-opacity-40">
                  User
                </th>
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px] border-opacity-40">
                  Price
                </th>
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px] border-opacity-40">
                  status
                </th>
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px] border-opacity-40">
                  ON HOLD STATUS
                </th>{" "}
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px] border-opacity-40">
                  Recipt
                </th>
                {/* <th className="uppercase text-[12px] text-white p-2">MORE</th> */}
                <tbody>
                  {limitedTableData?.map((item, index) => (
                    <tr key={index} className="w-full">
                      {/* Add the appropriate data from the item to each <td> */}
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                        {/* Use item.packageId here */}
                        {item.username}
                      </td>
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                        {/* Use item.amount here */}
                        {item.amount}
                      </td>{" "}
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                      {item.status? "Approved" : "Pending"}
                      </td>{" "}
                      <td className=" text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a] justify-center  items-center">
                        <div className="mx-auto text-[12px] justify-center items-center p-2">
                        <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  checked={item.status}
                                  onChange={(event) =>
                                    handleRowToggle(item, event.target.checked)
                                  }
                                />
                              }
                              label={
                                item?.status? "Apprrove" : "Reject"
                              }
                              className="text-[#ffa524]"
                            />
                          </FormGroup>
                        </div>
                      </td>
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                        <button
                          onClick={() => openURL(item.imagePath)}
                          className="w-full rounded-[6px] uppercase text-[#151515] font-semibold h-[44px] bg-gradient-to-r from-[#FFA524] to-[#FFDC4A] flex flex-row justify-center items-center mt-5"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
