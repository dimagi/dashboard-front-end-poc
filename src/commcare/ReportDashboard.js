import React, {useState, useEffect}  from 'react';
import {fetchCommCareApi} from "./Client";

function ReportDashboard(props) {
  const aggregateReport = process.env.REACT_APP_COMMCARE_AGGREGATE_REPORT;
  const listReport = process.env.REACT_APP_COMMCARE_LIST_REPORT;
  const [aggregateData, setAggregateData] = useState({});
  const [listData, setListData] = useState({});

  const ALL = 'all';
  const choiceFilterOptions = [ALL, "hiking", "running", "surfing"];
  const [selectedChoice, setSelectedChoice] = useState(choiceFilterOptions[0]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const params = {};
    if (selectedChoice !== ALL) {
      params.activity_name_077ac727_string_1 = selectedChoice;
    }
    fetchCommCareApi(
      aggregateReport, props.username, props.apiKey, {
        onSuccess: setAggregateData,
        urlParams: params,
      }
    );
    fetchCommCareApi(
      listReport, props.username, props.apiKey, {
        onSuccess: setListData,
      }
    );
  }, [selectedChoice]);

  return (
    <div className="ReportDashboard">
      <h2>Filters</h2>
      <p>Type</p>
      <select onChange={(event) => setSelectedChoice(event.target.value)}>
        {choiceFilterOptions.map((choice, index) => {
          return <option key={index} value={choice} >{choice}</option>
        })}
      </select>
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
  return (
    <table>
      <thead>
      <tr>
        {props.columns ? props.columns.map((item, index) => {
          return <th key={index}>{item.header}</th>
        }) : <th>No data</th>}
      </tr>
      </thead>
      <tbody>
      {props.data ? props.data.map((row, index) => {
        return (
          <tr key={index}>
            { Object.keys(row).map((item, index) => {
              return <td key={index}>{row[item]}</td>
            })}
          </tr>
        )
      }) : <tr><td>No data</td></tr>}
      </tbody>
    </table>
  )
}


export default ReportDashboard;
