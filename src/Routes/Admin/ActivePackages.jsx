import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { Switch } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { env_data } from "../../config/config";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ActivePackages = () => {
  const buyPackagesData = [
    { id: 1, packageId: "gold", amount: 100, active: 1 },
    { id: 2, packageId: "gold", amount: 250, active: 0 },
    { id: 3, packageId: "gold", amount: 500, active: 1 },
    { id: 4, packageId: "platinum", amount: 1000, active: 0 },
    { id: 5, packageId: "platinum", amount: 2500, active: 0 },
    { id: 6, packageId: "platinum", amount: 5000, active: 0 },
    { id: 7, packageId: "Diamond", amount: 10000, active: 0 },
    { id: 8, packageId: "Diamond", amount: 25000, active: 0 },
    { id: 9, packageId: "Diamond", amount: 50000, active: 0 },
    { id: 10, packageId: "vip", amount: 100000, active: 0 },
  ];

  useEffect(() => {
    getHistory();
  }, []);
  const contentRef = useRef(null);

  const [resData, setResData] = useState([]);

  const getHistory = async () => {
    const response = await axios.get(`${env_data.base_url}/GetAllByPackages`);

    const packages = response.data.packages;

    const resultArray = packages.map((item) => {
      const correspondingBuyPackage = buyPackagesData.find(
        (buyPackage) => buyPackage.id === item.packageId
      );

      if (correspondingBuyPackage) {
        return {
          packageName: correspondingBuyPackage.packageId,
          amount: correspondingBuyPackage.amount,
          createdAt: item.createdAt,
          userName: item.userName,
          userId: item.userId,
          id: item.id,
          status: item.status,
        };
      }

      return null; // Handle the case where there is no match
    });

    const filteredResultArray = resultArray.filter((item) => item !== null);

    console.log(filteredResultArray);
    setResData(filteredResultArray);

    const result = packages
      .map((packageDetail) => {
        const buyPackage = buyPackagesData.find(
          (buyPackageData) => buyPackageData.id === packageDetail.packageId
        );
        console.log("buyPackage", buyPackage);
        if (buyPackage) {
          return {
            packageName: buyPackage.packageId,
            amount: buyPackage.amount,
            userName: buyPackage.userName,
            createdAt: packageDetail.createdAt,
          };
        }

        return null; // Handle the case where there is no matching buy package data
      })
      .filter((item) => item !== null);

    console.log("result latest arr", result);
  };
  const handleRowToggle = async (itemId, isChecked) => {
    // Implement your logic to handle the toggle action
    console.log(
      `Toggled item with id ${itemId?.id}. New checked status: ${isChecked}`
    );
    try {
      //   setWait(true);
      const res = await axios.put(`${env_data.base_url}/UpdatePackage`, {
        status: isChecked,
        userName: itemId.userName,
        amount: itemId.amount,
        id: itemId?.id,
      });
      console.log("🚀 ~ handleRowToggle ~ res:", res);
      getHistory();
    } catch (error) {}
    // You might want to update the state or perform other actions here
  };

  const handleExportPDF = async (refr) => {
    const content = refr.current;

    if (!content) {
      console.error("Content not found.");
      return;
    }

    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();

    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("dashboard.pdf");
  };
  return (
    <div className="w-full bg-[#1E1E1E] h-full fixed right-0 flex flex-col ">
      <div className="res-body lg:ml-[300px] md:ml-[100px] flex flex-col">
        <div
          className="flex flex-col dash-body w-full h-screen sm:p-8 p-3 overflow-y-scroll pt-[66px] "
          id="style-6"
        >
          <h2 className="text-[24px] font-semibold text-white">
            Active Packages
          </h2>

          <div className="w-full rounded-md border-[1px] border-[#565656] h-auto flex flex-col mt-5 p-5 bg-[#151515]">
            <div className="w-full justify-end items-center flex flex-row">
              <button
                style={{
                  width: "30%",
                  height: "44px",
                  marginTop: "5px",
                  borderRadius: "4px",
                  marginRight: "20px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#151515",
                  backgroundImage:
                    "linear-gradient(to right, #ffd62d, #ffa524)",
                  // cursor: !controls?.make_deposits ? 'not-allowed' : 'pointer',
                }}
                onClick={() => handleExportPDF(contentRef)}
              >
                Export to PDF
              </button>
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

            <div
              ref={contentRef}
              className="dash-table mt-5 w-full  overflow-x-auto"
            >
              <table
                style={{ backgroundColor: "black" }}
                className="w-full border-[1px] border-[#565656] "
              >
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px]  border-opacity-40">
                  User Name
                </th>{" "}
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px]  border-opacity-40">
                  Package
                </th>
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px] border-opacity-40">
                  Price
                </th>
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px] border-opacity-40">
                  Date Requested
                </th>
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px] border-opacity-40">
                  Status
                </th>
                <th className="uppercase text-[12px] text-white p-2 border-[#565656] border-r-[1px] border-opacity-40">
                  ON HOLD STATUS
                </th>
                {/* <th className="uppercase text-[12px] text-white p-2">MORE</th> */}
                <tbody>
                  {resData?.map((item, index) => (
                    <tr key={index} className="w-full">
                      {/* Add the appropriate data from the item to each <td> */}
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                        {/* Use item.packageId here */}
                        {item.userName}
                      </td>
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                        {/* Use item.packageId here */}
                        {item.packageName}
                      </td>
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                        {/* Use item.amount here */}
                        {item.amount}
                      </td>{" "}
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                        {/* Use item.amount here */}
                        {item.createdAt}
                      </td>{" "}
                      <td className="text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a]">
                        {/* Use item.amount here */}
                        {item.status === 1 ? "Approved" : "Pending"}
                      </td>
                      <td className=" text-[12px] text-white p-2 border-[#565656] border-[1px] border-opacity-40 bg-[#1a1a1a] justify-center  items-center">
                        <div className="mx-auto text-[12px] justify-center items-center p-2">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  checked={item.status===1}
                                  onChange={(event) =>
                                    handleRowToggle(item, event.target.checked)
                                  }
                                />
                              }
                              label={
                                item?.status === 1 ? "Apprrove" : "Reject"
                              }
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

export default ActivePackages;
