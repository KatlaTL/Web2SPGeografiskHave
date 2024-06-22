export const formatDateRange = (dateArr) => {
    if (Array.isArray(dateArr)) {
        const startDate = dateArr[0] && new Date(dateArr[0]);
        const endDate = dateArr[1] && new Date(dateArr[1]);

        console.log(startDate)
        console.log(endDate)

        if (!endDate) {
            return `D. ${startDate.getDate()}. ${startDate.toLocaleString("da-DK", { month: "long" })} ${startDate.getFullYear()}`;
        }

        if (startDate?.getFullYear() != endDate.getFullYear()) {
            return `D. ${startDate.getDate()} ${startDate.toLocaleString("da-DK", { month: "long" })} ${startDate.getFullYear()} - ${endDate.getDate()} ${endDate.toLocaleString("da-DK", { month: "long" })} ${endDate.getFullYear()}`;
        }

        if (startDate?.getMonth() === endDate?.getMonth()) {
            return `D. ${startDate.getDate()} - ${endDate.getDate()}. ${startDate.toLocaleString("da-DK", { month: "long" })} ${startDate.getFullYear()}`;
        } else {
            return `D. ${startDate.getDate()} ${startDate.toLocaleString("da-DK", { month: "long" })} - ${endDate.getDate()} ${endDate.toLocaleString("da-DK", { month: "long" })} ${startDate.getFullYear()}`;
        }
    }
}