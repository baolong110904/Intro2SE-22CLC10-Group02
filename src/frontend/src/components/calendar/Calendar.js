import React, {useState, useContext, useEffect} from "react";
// import ContextWrapper from "./ContextWrapper";
import Sidebar from "./Sidebar"
import Month from "./Month"
import CalendarHeader from "./CalendarHeader"
import {getMonth} from "./util"
import GlobalContext from "./GlobalContext"
import EventModal from "./EventModal"

export default function Calendar(){
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);
    
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
      }, [monthIndex]);
    
    return (
        <React.Fragment>
          {showEventModal && <EventModal />}
    
          <div className="h-screen flex flex-col">
            <CalendarHeader />
            <div className="flex flex-1">
              <Sidebar />
              <Month month={currenMonth} />
            </div>
          </div>
        </React.Fragment>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();