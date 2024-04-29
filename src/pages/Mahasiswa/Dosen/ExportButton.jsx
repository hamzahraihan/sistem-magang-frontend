import * as xlsx from 'xlsx/xlsx.mjs';
import PropTypes from 'prop-types';

const ExportButton = ({ data = [], fileName }) => {
  return (
    <button
      className="bg-green-500 rounded-md p-2 text-white hover:bg-green-400 active:bg-green-600 duration-150"
      onClick={() => {
        if (Array.isArray(data) && data.length > 0) {
          const filteredData = data.map((item) => {
            const { first_name, last_name, email, role, nim, jurusan, angkatan, status, kelas, phone } = item;
            return { first_name, last_name, email, role, nim, jurusan, angkatan, status, kelas, phone };
          });

          const worksheet = xlsx.utils.json_to_sheet(filteredData);
          const workbook = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          xlsx.writeFile(workbook, fileName ? `${fileName}.xlsx` : 'data.xlsx');
        } else {
          console.error('Data is either not an array or is empty.');
        }
      }}
    >
      Export to Excel
    </button>
  );
};

ExportButton.propTypes = {
  data: PropTypes.array,
  fileName: PropTypes.string,
};

export default ExportButton;
