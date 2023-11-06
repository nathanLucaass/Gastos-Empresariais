import React, { useContext, useEffect, useState } from "react";
import UserInfoContext from "../context/UserInfoContext";
import SideBar from "../components/SideBar";
import { getAllEarnings, postEarning } from "../services/earningsService";

function EarningsPage() {
  const [unformattedDate, setUnformattedDate] = useState("");
  const [description, setDescription] = useState("");
  const [valueString, setValueString] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const { userId } = useContext(UserInfoContext);
  const { setIsLoading, earnings, setEarnings } = useContext(UserInfoContext);
  const [isLoadingBills, setIsLoadingBills] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      const responseBills = await getAllEarnings(userId);
      setEarnings(responseBills);
      setIsLoadingBills(false);
      setIsLoading(false);
    }

    fetchData();
  }, [setEarnings]);

  const getTotalEarnings = () => {
    const total = earnings.reduce((acc, curr) => acc + curr.value, 0);
    setTotalEarnings(total);
  };

  useEffect(() => {
    getTotalEarnings();
  }, [earnings]);

  const handleDateChange = (event) => {
    setUnformattedDate(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleValueChange = (event) => {
    setValueString(event.target.value);
  };

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = formatDateToDDMMYYYY(unformattedDate);
    const user_id = userId;
    const value = Number(valueString);
    const response = await postEarning(date, description, value, user_id);
    console.log(response);
    setIsLoadingBills(true);
    const responseBills = await getAllEarnings(userId);
    setEarnings(responseBills);
    setIsLoadingBills(false);
  };

  return (
    <div className="flex relative bg-slate-100">
      <SideBar className="fixed h-full" />
      <div className="bg-white p-4 mx-auto border rounded shadow text-center flex">
        <div className="flex-1">
          <h2 className="text-4xl text-blue-500 font-semibold mb-5">Entrada</h2>
          {isLoadingBills ? (
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold">Carregando...</h2>
            </div>
          ) : (
            <div>
              <h1 className="text-lg font-semibold border border-blue-500 w-1/5 rounded-l  ">
                <span className="bg-blue-500 p-1 text-white rounded-l">
                Entradas Totais:
                </span>
                {' '}
                <span className=" focus:ring-blue-500">
                 R${totalEarnings.toFixed(2)}
                 </span>
              </h1>
              <div className="border-blue-500 mt-3">
              <h1 className="text-3xl bg-blue-500 text-white rounded-t-lg mb-5">Nova Entrada</h1>
              <form className="flex">
                <label
                  htmlFor="date-input"
                  className="block text-lg font-semibold mr-4"
                >
                  Data:
                  <input
                    id="date-input"
                    className="ml-2 p-2 border rounded"
                    type="date"
                    value={unformattedDate}
                    onChange={handleDateChange}
                  />
                </label>

                <label
                  htmlFor="description-input"
                  className="block text-lg font-semibold mr-4"
                >
                  Descrição:
                  <input
                    id="description-input"
                    className="ml-2 p-2 border rounded"
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </label>

                <label
                  htmlFor="value-input"
                  className="block text-lg font-semibold mr-4"
                >
                  Valor:
                  <input
                    id="value-input"
                    className="ml-2 p-2 border rounded"
                    type="number"
                    value={valueString}
                    onChange={handleValueChange}
                  />
                </label>

                <button
                  className="ml-4 bg-blue-500 text-white p-2 rounded"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Enviar
                </button>
              </form>
              </div>
              <table className="w-full mt-4 rounded-t-lg">
                <thead >
                  <tr className="bg-blue-500 text-white ">
                    <th className="p-2 border text-2xl font-semibold">Data</th>
                    <th className="p-2 border text-2xl font-semibold">Descrição</th>
                    <th className="p-2 border text-2xl font-semibold">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings.map((earning) => (
                    <tr key={earning.id}>
                      <td className="p-2 border">{earning.date}</td>
                      <td className="p-2 border">{earning.description}</td>
                      <td className="p-2 border">
                        R$ {earning.value.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EarningsPage;
