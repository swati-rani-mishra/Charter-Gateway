export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100);
    amount = 100;
  }
  if (amount > 50) {
    points += 1 * (amount - 50);
  }
  return points;
};

export const groupByCustomerAndMonth = (transactions) => {
  const groupedData = {};

  transactions.forEach(({ customer, amount, date }) => {
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const points = calculatePoints(amount);

    if (!groupedData[customer]) {
      groupedData[customer] = {};
    }

    if (!groupedData[customer][month]) {
      groupedData[customer][month] = { points: 0, transactions: [] };
    }
    groupedData[customer][month].points += points;
    groupedData[customer][month].transactions.push(amount);
  });

  return groupedData;
};
