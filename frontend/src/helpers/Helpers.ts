import Moment from "moment";

export const formatDate: any = (date: any, format: string) => {
    return (Moment(date).format(format));
};