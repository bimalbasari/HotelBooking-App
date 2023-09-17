import { FaCalendarAlt } from "react-icons/fa"

const getdateFormat = (mydate) => {
    const date = new Date(mydate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: `short` });
    return `${year}-${month}-${day}-${dayOfWeek}`
}
export const getDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    const days = Math.abs(Math.floor(daysDifference));
    if (days == 0) { return 1 } else { return days }
};
const BookingDate = ({ checkOut, checkIn }) => {
    return (
        <div className="flex gap-1 items-center">
            <FaCalendarAlt /> <span>{getDays(checkOut, checkIn)} Night's</span>
            <FaCalendarAlt /> <span>{getdateFormat(checkIn)}</span>
            <FaCalendarAlt /> <span>{getdateFormat(checkOut)}</span>
        </div>
    )
}

export default BookingDate