import React, { useEffect, useState } from "react";
import { fetchTransactions } from "./Transactions";
import { groupByCustomerAndMonth } from "./Rewards";

const MainComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions().then((transactions) => {
      const groupedData = groupByCustomerAndMonth(transactions);
      setData(groupedData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Customer Rewards Program</h1>
      {Object.entries(data).map(([customer, months]) => (
        <div key={customer}>
          <h2>Customer: {customer}</h2>
          {Object.entries(months).map(([month, { points, transactions }]) => (
            <div key={month}>
              <h3>{month}</h3>
              <p>Points: {points}</p>
              <p>Transactions: {transactions.join(", ")}</p>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default MainComponent;
