import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { Switch } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { env_data } from "../../config/config";

const Deposit = () => {
  useEffect(() => {
    getHistory();
  }, []);

  const [resData, setResData] = useState([]);

  const getHistory = async () => {
    const respo3 = await axios
      .get(`${env_data.base_url}/GetAllWithdrawal`)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:GetAllWithdrawal", res.data.withdrawals);
        setDepositDetails(res.data.withdrawals);
      });
    console.log("🚀 ~ GetAllWithdrawal ~ respo3:", respo3);
  };
  const [depositDetails, setDepositDetails] = useState([]);

  const handleRowToggle = async (itemId, isChecked) => {
    // Implement your logic to handle the toggle action
    console.log(
      `Toggled item with id ${itemId?.id}. New checked status: ${isChecked}`
    );
    try {
      //   setWait(true);
      const res = await axios.put(`${env_data.base_url}/UpdateWithdrawal`, {
        status: isChecked,
        id: itemId?.id,
      });
      console.log("🚀 ~ handleRowToggle ~ res:", res);
      getHistory();
    } catch (error) {}
    // You might want to update the state or perform other actions here
  };
  return (
    <div className="w-full bg-[#1E1E1E] h-full fixed right-0 flex flex-col ">
      <div className="res-body lg:ml-[300px] md:ml-[100px] flex flex-col">
        <div
          className="flex flex-col dash-body w-full h-screen sm:p-8 p-3 overflow-y-scroll pt-[66px] "
          id="style-6"
        >
          <h2 className="text-[24px] font-semibold text-white">Withdrawals</h2>

          <div className="w-full rounded-md border-[1px] border-[#565656] h-auto flex flex-col mt-5 p-5 bg-[#151515]">
            <div className="w-full justify-end items-center flex flex-row">
              Deposits
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
                </th>
                {/* <th className="uppercase text-[12px] text-white p-2">MORE</th> */}
                <tbody>
                  {depositDetails?.map((item, index) => (
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
                        {/* Use item.amount here */}
                        {item.status ? "Approved" : "Pending"}
                      </td>
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
                              label={item?.status ? "Apprrove" : "Reject"}
                              className="text-[#ffa524]"
                            />
                          </FormGroup>
                        </div>
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
