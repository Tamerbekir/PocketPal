import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/calendar.css';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  theme: 'light' | 'dark'
}

export default function UserCalendar({ theme }: Props) {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div 
    className={`calendar-container ${theme === 'dark' ? 'light' : 'dark'}`}>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}