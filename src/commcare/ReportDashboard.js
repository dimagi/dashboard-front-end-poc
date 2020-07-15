import React, {useState, useEffect}  from 'react';
import {fetchCommCareApi} from "./Client";

function ReportDashboard(props) {
  const aggregateReport = process.env.REACT_APP_COMMCARE_AGGREGATE_REPORT;
  const listReport = process.env.REACT_APP_COMMCARE_LIST_REPORT;

  const [aggregateData, setAggregateData] = useState({});
  const [listData, setListData] = useState({});

  useEffect(() => {
    fetchCommCareApi(
      aggregateReport, props.username, props.apiKey, {
        onSuccess: setAggregateData,
      }
    );
    fetchCommCareApi(
      listReport, props.username, props.apiKey, {
        onSuccess: setListData,
      }
    );
  }, []);

  return (
    <div className="ReportDashboard">
      <h2>Aggregate data</h2>
      <ListView {...aggregateData} />
      <h2>List data</h2>
      <ListView {...listData} />

      <h2>Debug data</h2>
      <pre>{ JSON.stringify(aggregateData, null, 2) }</pre>
      <pre>{ JSON.stringify(listData, null, 2) }</pre>
    </div>
  )
}

function ListView(props) {
  console.log(props);
  return (
    <table>
      <thead>
      <tr>
        {props.columns ? props.columns.map(item => {
          return <th>{item.header}</th>
        }) : <th>No data</th>}
      </tr>
      </thead>
      <tbody>
      {props.data ? props.data.map(row => {
        console.log('row', row);
        return (
          <tr>
            { Object.keys(row).map(item => {
              return <td>{row[item]}</td>
            })}
          </tr>
        )
      }) : <tr><td>No data</td></tr>}
      </tbody>
    </table>
  )
}


export default ReportDashboard;
