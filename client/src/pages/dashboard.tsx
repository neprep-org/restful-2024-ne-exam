/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { columns } from "../utils/faker";
import Table, { Data } from "../components/table";
import { IoIosBook } from "react-icons/io";

import showToast from "../utils/errorToasts";
import axios from "axios";
import { baseUrl } from "../utils/axios.util";
import { useAuth } from "../context/AuthContext";
import { DashboardProvider } from "../context/DashboardContext";
import { FaBook } from "react-icons/fa";
import { BiBook } from "react-icons/bi";

const Dashboard = () => {
  const [books, setBooks] = useState<Data[]>();
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalBooksType, setTotalBooksType] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/books/all`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = response.data.data;
        setBooks(data.books);
        setTotalBooksType(data.totalBooksType);
        setTotalBooks(data.totalBooks);
      } catch (error: any) {
        if (error.response) {
          showToast(error.response.data.message, "error");
        } else {
          showToast(error.message, "error");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardProvider>
      <div className="flex flex-row w-full h-scree">
        <SideBar />
        <div className="h-[100%] w-[15%]"></div>
        <div className="w-full md:w-[85%] h-[100%] flex flex-col justify-center items-center">
          {/* Dashboard */}
          <div className="flex w-[90%] flex-col min-[700px]:flex-row items-center justify-around  gap-4 p-4 mb-8 -fulflex">
            {/* Card 1 */}
            <div className="flex flex-col items-center justify-center w-full min-[700px]:w-[50%] p-6 bg-white rounded-lg shadow-md">
              <FaBook className="mb-4 text-4xl text-blue-500" />
              <p className="text-2xl font-bold min-[580px]:text-xl">
                Book Types
              </p>
              <p className="text-xl">{totalBooksType}</p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg shadow-md">
              <IoIosBook className="mb-4 text-4xl text-green-500" />
              <p className="text-2xl font-bold min-[580px]:text-xl">
                Total Books
              </p>
              <p className="text-xl">{totalBooks}</p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg shadow-md">
              <BiBook className="mb-4 text-4xl text-red-500" />
              <p className="text-2xl font-bold min-[580px]:text-xl">For rent</p>
              <p className="text-xl">{totalBooks - totalBooksType}</p>
            </div>
          </div>

          {/* Table */}
          <div className="w-[90%]">
            <Table data={books ?? []} columns={columns} />{" "}
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
