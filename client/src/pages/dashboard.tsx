/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { columns } from "../utils/faker";
import Table, { Data } from "../components/table";
import {
  IoIosSpeedometer,
  IoMdPeople,
  IoIosNotifications,
} from "react-icons/io";

import showToast from "../utils/errorToasts";
import axios from "axios";
import { baseUrl } from "../utils/axios.util";
import { useAuth } from "../context/AuthContext";
import { DashboardProvider } from "../context/DashboardContext";

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
      <div className="flex flex-row w-full h-screen">
        <SideBar />
        <div className="h-[100%] w-[15%]"></div>
        <div className="w-[85%] h-[100%] flex flex-col justify-center items-center">
          {/* Dashboard */}
          <div className="flex justify-around w-full mb-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center justify-center w-64 p-6 bg-white rounded-lg shadow-md">
              <IoIosSpeedometer className="mb-4 text-4xl text-blue-500" />
              <p className="text-2xl font-bold">Total Books Type</p>
              <p className="text-xl">{totalBooksType}</p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center justify-center w-64 p-6 bg-white rounded-lg shadow-md">
              <IoMdPeople className="mb-4 text-4xl text-green-500" />
              <p className="text-2xl font-bold">Total Books</p>
              <p className="text-xl">{totalBooks}</p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center justify-center w-64 p-6 bg-white rounded-lg shadow-md">
              <IoIosNotifications className="mb-4 text-4xl text-red-500" />
              <p className="text-2xl font-bold">Available for lent</p>
              <p className="text-xl">{totalBooks}</p>
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
