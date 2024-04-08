import host from "../util/config";

const expensesResponse = await axios.get(
  host + "/api/expenses/expenses/getDataBetweenDates/date",
  {}
);
