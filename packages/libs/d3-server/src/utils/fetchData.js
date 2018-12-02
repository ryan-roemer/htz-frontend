import fetch from 'node-fetch';

const prepareBody = (type, time, assetId) => ({
  query: `
    query FinanceGraph($type: String!, $time: String!, $assetId: String!) {
      financeGraph(type: $type, time: $time, assetId: $assetId) {
        startTime
        endTime
        dataSource {
          ... on LineGraphData {
            time
            value
            yieldSpread
            change
            volume
            name
            symbol
          }
          ... on ScatterGraphData {
            x
            y
            name
            symbol
          }
          ... on AreaGraphData {
            time
            value
            peRatio
          }
        }
      }
    }
  `,
  variables: { type, time, assetId, },
});

export default ({ type, time, assetId, }) =>
  new Promise((resolve, reject) =>
    fetch('http://eran.haaretz.co.il:4004/', {
      method: 'POST',
      body: JSON.stringify(prepareBody(type, time, assetId)),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
  );
