import React, { useEffect, useState } from "react";
import { groupByCustomerAndMonth } from "../Components/CalculateRewards";

const TransactionsApi = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')  // Fetching from the public folder
      .then(response => response.json())
      .then(fetchedData => {
        const groupedData = groupByCustomerAndMonth(fetchedData);  // Group data by customer and month
        setData(groupedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">     
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

export default TransactionsApi;


// import React, { useEffect, useState } from "react";
// import { fetchTransactions } from "../Components/RewardsPrograms"; 
// import { groupByCustomerAndMonth } from "../Components/CalculateRewards";
// import data from ".../"
// const TransactionsApi = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   fetchTransactions().then((transactions) => {
//   //     const groupedData = groupByCustomerAndMonth(transactions);
//   //     setData(groupedData);
//   //     setLoading(false);
//   //   });
//   // }, []);
//   useEffect(() => {
//     fetch('/data/data.json')
//       .then(response => response.json())
//       .then(fetchedData => setData(fetchedData))
//       .catch(error => console.error("Error fetching data:", error));
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="App">
//       <h1>Customer Rewards Program</h1>
//       {Object.entries(data).map(([customer, months]) => (
//         <div key={customer}>
//           <h2>Customer: {customer}</h2>
//           {Object.entries(months).map(([month, { points, transactions }]) => (
//             <div key={month}>
//               <h3>{month}</h3>
//               <p>Points: {points}</p>
//               <p>Transactions: {transactions.join(", ")}</p>
//             </div>
//           ))}
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TransactionsApi;
