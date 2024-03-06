import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Attandance() {
  const [tableData, setTableData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setTableData(data);
      });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex flex-col items-center justify-center m-5 mx-auto">
      <input
        type="file"
        onChange={handleFileChange}
        className="px-4 py-2 border border-gray-300 rounded-lg mb-4"
      />
      <div className="overflow-x-auto w-full flex justify-center">
        <table className="table-auto border border-collapse border-gray-700">
          <thead>
            <tr className="bg-gray-200">
              {tableData.length > 0 &&
                tableData[0].map((cell, index) => (
                  <th key={index} className="px-4 py-2">{cell}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
