// import React, { useState, useEffect } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { scheduleData } from "../data/calendar";

// const locales = {
//   "en-US": require("date-fns/locale/en-US"),
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
//   getDay,
//   locales,
// });

// const posts = [
//   {
//     id: 1,
//     title: "Boost your conversion rate",
//     href: "#",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     date: "Mar 16, 2020",
//     datetime: "2020-03-16",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   // More posts...
// ];

// const Dashboard = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [currentWeek, setCurrentWeek] = useState(
//     startOfWeek(new Date(), { weekStartsOn: 1 })
//   );
//   const [activeSection, setActiveSection] = useState("timetable");

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000); // Update every second

//     return () => clearInterval(timer);
//   }, []);

//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case "timetable":
//         return (
//           <>
//             <Calendar
//               localizer={localizer}
//               events={scheduleData.map((event) => ({
//                 title: event.text,
//                 start: new Date(event.startDate),
//                 end: new Date(event.endDate),
//               }))}
//               startAccessor="start"
//               endAccessor="end"
//               defaultView="week"
//               defaultDate={currentWeek}
//               style={{ height: 450 }}
//             />
//             <DatePicker
//               selected={currentWeek}
//               onChange={(date) => setCurrentWeek(date)}
//               dateFormat="dd/MM/yyyy"
//               className="form-input"
//             />
//           </>
//         );
//       case "studyingSessions":
//         return (
//           <div className="bg-white py-24 sm:py-32">
//             <div className="mx-auto max-w-7xl px-6 lg:px-8">
//               <div className="mx-auto max-w-2xl lg:mx-0">
//                 <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                   YOUR CLASSES
//                 </h2>
//               </div>
//               <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//                 {posts.map((post) => (
//                   <article
//                     key={post.id}
//                     className="flex max-w-xl flex-col items-start justify-between"
//                   >
//                     <div className="flex items-center gap-x-4 text-xs">
//                       <time dateTime={post.datetime} className="text-gray-500">
//                         {post.date}
//                       </time>
//                       <a
//                         href={post.category.href}
//                         className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                       >
//                         {post.category.title}
//                       </a>
//                     </div>
//                     <div className="group relative">
//                       <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                         <a href={post.href}>
//                           <span className="absolute inset-0" />
//                           {post.title}
//                         </a>
//                       </h3>
//                       <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//                         {post.description}
//                       </p>
//                     </div>
//                     <div className="relative mt-8 flex items-center gap-x-4">
//                       <img
//                         alt=""
//                         src={post.author.imageUrl}
//                         className="h-10 w-10 rounded-full bg-gray-50"
//                       />
//                       <div className="text-sm leading-6">
//                         <p className="font-semibold text-gray-900">
//                           <a href={post.author.href}>
//                             <span className="absolute inset-0" />
//                             {post.author.name}
//                           </a>
//                         </p>
//                         <p className="text-gray-600">{post.author.role}</p>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
//       case "lessonSupport":
//         return <div>My Lesson Support sessions</div>;
//       case "teachingSupport":
//         return <div>My Teaching Support sessions</div>;
//       case "ea":
//         return <div>EA</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full h-full"
//       id="dashboard"
//     >
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
//           Dashboard
//         </h2>
//         <div className="flex space-x-2"></div>
//       </div>
//       <div className="mb-6 flex flex-wrap space-x-4">
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "timetable"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("timetable")}
//         >
//           Timetable
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "studyingSessions"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("studyingSessions")}
//         >
//           My Studying Sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "lessonSupport"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("lessonSupport")}
//         >
//           My Lesson Support sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "teachingSupport"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("teachingSupport")}
//         >
//           My Teaching Support sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "ea"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("ea")}
//         >
//           EA
//         </button>
//       </div>
//       <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
//         {renderActiveSection()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// ###########################################################################################################################

// import React, { useState, useEffect } from "react";
// import Scheduler, { Resource, View, AppointmentDragging } from "devextreme-react/scheduler";
// import 'devextreme/dist/css/dx.light.css';
// import { scheduleData } from "../data/calendar";


// const posts = [
//   {
//     id: 1,
//     title: "Boost your conversion rate",
//     href: "#",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     date: "Mar 16, 2020",
//     datetime: "2020-03-16",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   // More posts...
// ];

// const Dashboard = () => {
//   const [events, setEvents] = useState(
//     scheduleData.map((event) => ({
//       text: event.text,
//       startDate: new Date(event.startDate),
//       endDate: new Date(event.endDate),
//     }))
//   );
//   const [activeSection, setActiveSection] = useState("timetable");

//   useEffect(() => {
//     const validEvents = scheduleData.map((event) => ({
//       text: event.Subject || "No title",
//       startDate: event.StartTime || new Date(),
//       endDate: event.EndTime || new Date(),
//     }));

//     setEvents(validEvents);
//   }, []);

//   const onAppointmentAdded = (e) => {
//     const newEvent = {
//       text: e.appointmentData.text,
//       startDate: e.appointmentData.startDate,
//       endDate: e.appointmentData.endDate,
//     };
//     setEvents([...events, newEvent]);
//   };

//   const onAppointmentUpdated = (e) => {
//     const updatedEvents = events.map((event) =>
//       event.startDate === e.oldData.startDate && event.endDate === e.oldData.endDate
//         ? e.newData
//         : event
//     );
//     setEvents(updatedEvents);
//   };

//   const onAppointmentDeleted = (e) => {
//     const updatedEvents = events.filter(
//       (event) =>
//         event.startDate !== e.appointmentData.startDate ||
//         event.endDate !== e.appointmentData.endDate
//     );
//     setEvents(updatedEvents);
//   };

//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case "timetable":
//         return (
//           <Scheduler
//             dataSource={events}
//             defaultCurrentView="week"
//             defaultCurrentDate={new Date()}
//             startDayHour={8}
//             height={600}
//             onAppointmentAdded={onAppointmentAdded}
//             onAppointmentUpdated={onAppointmentUpdated}
//             onAppointmentDeleted={onAppointmentDeleted}
//           >
//             <View type="day" />
//             <View type="week" />
//             <View type="month" />
//             <AppointmentDragging
//               group={true}
//               onAdd={onAppointmentAdded}
//               onRemove={onAppointmentDeleted}
//             />
//           </Scheduler>
//         );
//       case "studyingSessions":
//         return (
//           <div className="bg-white py-24 sm:py-32">
//             <div className="mx-auto max-w-7xl px-6 lg:px-8">
//               <div className="mx-auto max-w-2xl lg:mx-0">
//                 <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                   YOUR CLASSES
//                 </h2>
//               </div>
//               <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//                 {posts.map((post) => (
//                   <article
//                     key={post.id}
//                     className="flex max-w-xl flex-col items-start justify-between"
//                   >
//                     <div className="flex items-center gap-x-4 text-xs">
//                       <time dateTime={post.datetime} className="text-gray-500">
//                         {post.date}
//                       </time>
//                       <a
//                         href={post.category.href}
//                         className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                       >
//                         {post.category.title}
//                       </a>
//                     </div>
//                     <div className="group relative">
//                       <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                         <a href={post.href}>
//                           <span className="absolute inset-0" />
//                           {post.title}
//                         </a>
//                       </h3>
//                       <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//                         {post.description}
//                       </p>
//                     </div>
//                     <div className="relative mt-8 flex items-center gap-x-4">
//                       <img
//                         alt=""
//                         src={post.author.imageUrl}
//                         className="h-10 w-10 rounded-full bg-gray-50"
//                       />
//                       <div className="text-sm leading-6">
//                         <p className="font-semibold text-gray-900">
//                           <a href={post.author.href}>
//                             <span className="absolute inset-0" />
//                             {post.author.name}
//                           </a>
//                         </p>
//                         <p className="text-gray-600">{post.author.role}</p>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
//       case "lessonSupport":
//         return <div>My Lesson Support sessions</div>;
//       case "teachingSupport":
//         return <div>My Teaching Support sessions</div>;
//       case "ea":
//         return <div>EA</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full h-full"
//       id="dashboard"
//     >
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
//           Dashboard
//         </h2>
//         <div className="flex space-x-2"></div>
//       </div>
//       <div className="mb-6 flex flex-wrap space-x-4">
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "timetable"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("timetable")}
//         >
//           Timetable
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "studyingSessions"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("studyingSessions")}
//         >
//           My Studying Sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "lessonSupport"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("lessonSupport")}
//         >
//           My Lesson Support sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "teachingSupport"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("teachingSupport")}
//         >
//           My Teaching Support sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "ea"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("ea")}
//         >
//           EA
//         </button>
//       </div>
//       <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
//         {renderActiveSection()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// ###########################################################################################################################

// import React, { useState, useRef } from "react";
// import Calendar from "@toast-ui/react-calendar"; // Import TUI Calendar
// import "tui-calendar/dist/tui-calendar.css"; // Import TUI Calendar styles
// import { scheduleData } from "../data/calendar";

// const posts = [
//   {
//     id: 1,
//     title: "Boost your conversion rate",
//     href: "#",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     date: "Mar 16, 2020",
//     datetime: "2020-03-16",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   // More posts...
// ];

// const Dashboard = () => {
//   const [events, setEvents] = useState(
//     scheduleData.map((event, index) => ({
//       id: String(index + 1),
//       calendarId: "1",
//       title: event.text,
//       category: "time",
//       start: event.startDate,
//       end: event.endDate,
//     }))
//   );

//   const [activeSection, setActiveSection] = useState("timetable");
//   const calendarRef = useRef();

//   const handleDateClick = (event) => {
//     const title = prompt("Enter event title:");
//     if (title) {
//       const newEvent = {
//         id: String(events.length + 1),
//         calendarId: "1",
//         title: title,
//         category: "time",
//         start: event.date + "T00:00:00",
//         end: event.date + "T23:59:59",
//       };
//       setEvents([...events, newEvent]);
//       calendarRef.current.calendarInst.createSchedules([newEvent]);
//     }
//   };

//   const handleEventClick = (event) => {
//     const newTitle = prompt("Enter new event title:", event.schedule.title);
//     if (newTitle) {
//       const updatedEvents = events.map((ev) =>
//         ev.id === event.schedule.id ? { ...ev, title: newTitle } : ev
//       );
//       setEvents(updatedEvents);
//       calendarRef.current.calendarInst.updateSchedule(
//         event.schedule.id,
//         event.schedule.calendarId,
//         { title: newTitle }
//       );
//     }
//   };

//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case "timetable":
//         return (
//           <>
//             <Calendar
//               ref={calendarRef}
//               height="800px"
//               view="week"
//               schedules={events}
//               useDetailPopup={true}
//               useCreationPopup={true}
//               onClickSchedule={handleEventClick}
//               onClickDayname={handleDateClick}
//               week={{
//                 daynames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//                 startDayOfWeek: 1,
//                 narrowWeekend: true,
//               }}
//               month={{
//                 daynames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//                 startDayOfWeek: 1,
//               }}
//             />
//           </>
//         );
//       case "studyingSessions":
//         return (
//           <div className="bg-white py-24 sm:py-32">
//             <div className="mx-auto max-w-7xl px-6 lg:px-8">
//               <div className="mx-auto max-w-2xl lg:mx-0">
//                 <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                   YOUR CLASSES
//                 </h2>
//               </div>
//               <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//                 {posts.map((post) => (
//                   <article
//                     key={post.id}
//                     className="flex max-w-xl flex-col items-start justify-between"
//                   >
//                     <div className="flex items-center gap-x-4 text-xs">
//                       <time dateTime={post.datetime} className="text-gray-500">
//                         {post.date}
//                       </time>
//                       <a
//                         href={post.category.href}
//                         className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                       >
//                         {post.category.title}
//                       </a>
//                     </div>
//                     <div className="group relative">
//                       <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                         <a href={post.href}>
//                           <span className="absolute inset-0" />
//                           {post.title}
//                         </a>
//                       </h3>
//                       <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//                         {post.description}
//                       </p>
//                     </div>
//                     <div className="relative mt-8 flex items-center gap-x-4">
//                       <img
//                         alt=""
//                         src={post.author.imageUrl}
//                         className="h-10 w-10 rounded-full bg-gray-50"
//                       />
//                       <div className="text-sm leading-6">
//                         <p className="font-semibold text-gray-900">
//                           <a href={post.author.href}>
//                             <span className="absolute inset-0" />
//                             {post.author.name}
//                           </a>
//                         </p>
//                         <p className="text-gray-600">{post.author.role}</p>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
//       case "lessonSupport":
//         return <div>My Lesson Support sessions</div>;
//       case "teachingSupport":
//         return <div>My Teaching Support sessions</div>;
//       case "ea":
//         return <div>EA</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full h-full"
//       id="dashboard"
//     >
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
//           Dashboard
//         </h2>
//         <div className="flex space-x-2"></div>
//       </div>
//       <div className="mb-6 flex flex-wrap space-x-4">
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "timetable"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("timetable")}
//         >
//           Timetable
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "studyingSessions"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("studyingSessions")}
//         >
//           My Studying Sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "lessonSupport"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("lessonSupport")}
//         >
//           My Lesson Support sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "teachingSupport"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("teachingSupport")}
//         >
//           My Teaching Support sessions
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeSection === "ea"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 dark:text-white"
//           } rounded-md`}
//           onClick={() => setActiveSection("ea")}
//         >
//           EA
//         </button>
//       </div>
//       <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
//         {renderActiveSection()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useContext } from "react";
import CalendarHeader from "./calendar/CalendarHeader.js";
import CreateEventButton from "./calendar/CreateEventButton.js";
import Month from "./calendar/Month.js";
import Sidebar from "./calendar/Sidebar.js";
import ContextWrapper from "./calendar/ContextWrapper.js";
import EventModal from "./calendar/EventModal.js";
import GlobalContext from "./calendar/GlobalContext.js"
import {getMonth} from "./calendar/util.js"

import Calendar from "./calendar/Calendar.js"

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];

const Dashboard = () => {
  // const [currentTime, setCurrentTime] = useState(new Date());
  // const [currentWeek, setCurrentWeek] = useState(
  //   startOfWeek(new Date(), { weekStartsOn: 1 })
  // );
  const [activeSection, setActiveSection] = useState("timetable");

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000); // Update every second

  //   return () => clearInterval(timer);
  // }, []);
  
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "timetable":
      return (
        // <React.Fragment>
        //   {showEventModal && <EventModal />}

        //   <div className="h-screen flex flex-col">
        //     <CalendarHeader />
        //     <div className="flex flex-1">
        //       <Sidebar />
        //       <Month month={currenMonth} />
        //     </div>
        //   </div>
        // </React.Fragment>
          <React.StrictMode>
          <ContextWrapper>
          <Calendar/>
          </ContextWrapper>
          </React.StrictMode>
      );
      case "studyingSessions":
        return (
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  YOUR CLASSES
                </h2>
              </div>
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime} className="text-gray-500">
                        {post.date}
                      </time>
                      <a
                        href={post.category.href}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post.category.title}
                      </a>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.description}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        alt=""
                        src={post.author.imageUrl}
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        );
      case "lessonSupport":
        return <div>My Lesson Support sessions</div>;
      case "teachingSupport":
        return <div>My Teaching Support sessions</div>;
      case "ea":
        return <div>EA</div>;
      default:
        return null;
    }
  };

  return (
    <div
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full h-full"
      id="dashboard"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Dashboard
        </h2>
        <div className="flex space-x-2"></div>
      </div>
      <div className="mb-6 flex flex-wrap space-x-4">
        <button
          className={`px-4 py-2 ${
            activeSection === "timetable"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("timetable")}
        >
          Timetable
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "studyingSessions"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("studyingSessions")}
        >
          My Studying Sessions
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "lessonSupport"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("lessonSupport")}
        >
          My Lesson Support sessions
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "teachingSupport"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("teachingSupport")}
        >
          My Teaching Support sessions
        </button>
        <button
          className={`px-4 py-2 ${
            activeSection === "ea"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } rounded-md`}
          onClick={() => setActiveSection("ea")}
        >
          EA
        </button>
      </div>
      <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default Dashboard;