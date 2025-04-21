import React, { useState } from 'react'
import arrowIcon from './images/icon-arrow.svg'
import { useEffect ,useRef} from 'react'

const App = () => {

  //Audio 
  const audioRef = useRef(null)
  useEffect(() => {
    audioRef.current = new Audio('bell.mp3')
    audioRef.current.load(); 
  }, []);

  const [day,setDay] = useState('')
  const [month,setMonth] = useState('')
  const [year,setYear] = useState('')

  const [isCalculated, setIsCalculated] = useState(false);


  const [errors, setErrors] = useState({
      day: '',
      month: '',
      year: '',
    });

    const [age, setAge] = useState({
      years: '--',
      months: '--',
      days: '--',
    });

    const validateDate = (day, month, year) => {
      console.log(`${day}/${month}/${year}`);
      let newErrors = { day: '', month: '', year: '' };
      let hasError = false;
    
      const d = parseInt(day, 10);
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);
    
      if (day.trim() === '') {
        newErrors.day = 'This field is required';
        hasError = true;
      }
      if (month.trim() === '') {
        newErrors.month = 'This field is required';
        hasError = true;
      }
      if (year.trim() === '') {
        newErrors.year = 'This field is required';
        hasError = true;
      }
    
      if (!hasError) {
        if (isNaN(m) || m < 1 || m > 12) {
          newErrors.month = 'Must be a valid month';
          hasError = true;
        }
    
        if (isNaN(y) || y < 1000 || y > 9999) {
          newErrors.year = 'Must be a valid year';
          hasError = true;
        }
    
        const date = new Date(y, m - 1, d);
        if (
          isNaN(date.getTime()) ||
          date.getDate() !== d ||
          date.getMonth() !== (m - 1) ||
          date.getFullYear() !== y
        ) {
          newErrors.day = 'Must be a valid date';
          hasError = true;
        }
    
        const now = new Date();
        if (!isNaN(date.getTime()) && date > now) {
          newErrors.year = 'Must be in the past';
          hasError = true;
        }
    
        if (!hasError) {
          calculateAge(date);
          setIsCalculated(true);
        }
      }
    
      if (hasError) {
        setAge({ years: '--', months: '--', days: '--' });
      }
    
      setErrors(newErrors);
    };

  const calculateAge = (birthDate) => {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today < thisYearBirthday)
    {
      years--;
    }

    // 🔔 Play preloaded audio
    if (audioRef.current) 
    {
      audioRef.current.currentTime = 0; // rewind
      audioRef.current.play();
    }

    setAge({ years, months, days });
  };

  return (
    <div className='container'>
      <form action="" onSubmit={(e)=> e.preventDefault()}>

        <div className="one">
            <div>
              <label htmlFor=""
              style={errors.day ? {color:'hsl(0, 100%, 67%)'}:{}}
              >Day</label>
              <input type="tel" min="1" max="31" maxLength={2} placeholder='DD'
              value={day} 
              onChange={(e) => setDay(e.target.value)}
              style={errors.day ? {border:'1px solid red'}:{}}
              />
              <span 
              className='error monthError'>{errors.day}</span>
            </div>

            <div>
              <label htmlFor=""
              style={errors.month ? {color:'hsl(0, 100%, 67%)'}:{}}
              >Month</label>
              <input type="tel" min="1" max="31" maxLength={2} placeholder='MM' 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={errors.month ? {border:'1px solid red'}:{}}
              />
              <span 
              className='error monthError'>{errors.month}</span>
            </div>

            <div>
              <label htmlFor=""
              style={errors.year ? {color:'hsl(0, 100%, 67%)'}:{}}
              >Year</label>
              <input type="tel" min="1" max="31" maxLength={4} placeholder='YYYY' 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={errors.year ? {border:'1px solid red'}:{}}
              />
              <span 
              className='error monthError'>{errors.year}</span>
            </div>

            <div className='three'>
                 <button
                 onClick={()=> validateDate(day,month,year)}
                 ><img src={arrowIcon} alt="arrow" /></button>
            </div>
        </div>

      </form>

      <div className='two'>
        <h1><span style={isCalculated ? {letterSpacing:'0px', color:'hsl(259, 100%, 65%)',marginRight:"10px"}: {}}>{age.years}</span>{age.years === 1 ? 'year':'years'}</h1>
        <h1><span style={isCalculated ? {letterSpacing:'0px', color:'hsl(259, 100%, 65%)',marginRight:"10px"}: {}}>{age.months}</span>{age.months === 1 ? 'month':'months'}</h1>
        <h1><span style={isCalculated ? {letterSpacing:'0px', color:'hsl(259, 100%, 65%)',marginRight:"10px"}: {}}>{age.days}</span>{age.days === 1 ? 'day':'days'}</h1>
      </div>
    </div>
  )
}

export default App
