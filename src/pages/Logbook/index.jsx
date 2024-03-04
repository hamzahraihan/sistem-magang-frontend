import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import SidebarLogbook from './SidebarLogbook';
import LogbookCard from './LogbookCard';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/formatDate';

const Logbook = () => {
  const [startDate, setStartDate] = useState('2023-9-20');
  const [endDate, setEndDate] = useState('2024-1-30');
  const [weeks, setWeeks] = useState([]);

  const generateWeeksBetweenDates = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const weeksArray = [];

    let currentWeek = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      currentWeek.push(new Date(currentDate));

      // Jika hari ini adalah hari Minggu atau hari terakhir dalam bulan, tambahkan array minggu ke dalam array hasil
      if (currentDate.getDay() === 0 || currentDate.getMonth() !== new Date(currentDate).getMonth()) {
        weeksArray.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setWeeks(weeksArray);
  };

  useEffect(() => {
    generateWeeksBetweenDates();
  }, []);

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
          <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <p className="text-base font-bold">
            Periode magang: {formatDate(startDate)} - {formatDate(endDate)}
          </p>
          {weeks.map((weekLog, index) => (
            <LogbookCard key={index} index={index} weekLog={weekLog} />
          ))}
        </div>
        <SidebarLogbook />;
      </div>
    </div>
  );
};

export default Logbook;
