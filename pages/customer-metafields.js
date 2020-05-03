import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Page,
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
 } from '@shopify/polaris';
import '../components/Styles.css'; 
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import * as PropTypes from 'prop-types';

const GET_CUSTOMER_INFO = gql`
 query ($id: ID!){
  customer(id: $id) {
    id
    firstName
    lastName
    email
    metafields(first: 20) {
      edges {
        node {
          id
          namespace
          key
          value
        }
      }
    }
    phone
    state
    totalSpent
    validEmailAddress
    verifiedEmail
  }
}
`;

class ResourceListWithCustomers extends React.Component {

  render() {
    return (
      <Page>
      <Query query={GET_CUSTOMER_INFO} variables={{ id: store.get('id') }}>
        {({ data, loading, error }) => {
          if (loading) { return <div>Loading…</div>; }
          if (error) { return <div>{error.message}</div>; }
          console.log(data);
          return (
            <Card sectioned>
              <h1>{data.customer.firstName} {data.customer.lastName}</h1>
              <p><strong>Email</strong>: {data.customer.email}</p>

              {data.customer.metafields.edges[0] && <p>1. <strong>{data.customer.metafields.edges[0].node.key}</strong>: {data.customer.metafields.edges[0].node.value}</p>}
              {data.customer.metafields.edges[1] && <p>2. <strong>{data.customer.metafields.edges[1].node.key}</strong>: {data.customer.metafields.edges[1].node.value}</p>}
              {data.customer.metafields.edges[2] && <p>3. <strong>{data.customer.metafields.edges[2].node.key}</strong>: {data.customer.metafields.edges[2].node.value}</p>}
              {data.customer.metafields.edges[3] && <p>4. <strong>{data.customer.metafields.edges[3].node.key}</strong>: {data.customer.metafields.edges[3].node.value}</p>}
              {data.customer.metafields.edges[4] && <p>5. <strong>{data.customer.metafields.edges[4].node.key}</strong>: {data.customer.metafields.edges[4].node.value}</p>}
              {data.customer.metafields.edges[5] && <p>6. <strong>{data.customer.metafields.edges[5].node.key}</strong>: {data.customer.metafields.edges[5].node.value}</p>}
              {data.customer.metafields.edges[6] && <p>7. <strong>{data.customer.metafields.edges[6].node.key}</strong>: {data.customer.metafields.edges[6].node.value}</p>}
              {data.customer.metafields.edges[7] && <p>8. <strong>{data.customer.metafields.edges[7].node.key}</strong>: {data.customer.metafields.edges[7].node.value}</p>}
              {data.customer.metafields.edges[8] && <p>9. <strong>{data.customer.metafields.edges[8].node.key}</strong>: {data.customer.metafields.edges[8].node.value}</p>}
              {data.customer.metafields.edges[9] && <p>10. <strong>{data.customer.metafields.edges[9].node.key}</strong>: {data.customer.metafields.edges[9].node.value}</p>}
              {data.customer.metafields.edges[10] && <p>11. <strong>{data.customer.metafields.edges[10].node.key}</strong>: {data.customer.metafields.edges[10].node.value}</p>}
              {data.customer.metafields.edges[11] && <p>12. <strong>{data.customer.metafields.edges[11].node.key}</strong>: {data.customer.metafields.edges[11].node.value}</p>}
              {data.customer.metafields.edges[12] && <p>13. <strong>{data.customer.metafields.edges[12].node.key}</strong>: {data.customer.metafields.edges[12].node.value}</p>}
              {data.customer.metafields.edges[13] && <p>14. <strong>{data.customer.metafields.edges[13].node.key}</strong>: {data.customer.metafields.edges[13].node.value}</p>}
              {data.customer.metafields.edges[14] && <p>15. <strong>{data.customer.metafields.edges[14].node.key}</strong>: {data.customer.metafields.edges[14].node.value}</p>}
              {data.customer.metafields.edges[15] && <p>16. <strong>{data.customer.metafields.edges[15].node.key}</strong>: {data.customer.metafields.edges[15].node.value}</p>}
              {data.customer.metafields.edges[16] && <p>17. <strong>{data.customer.metafields.edges[16].node.key}</strong>: {data.customer.metafields.edges[16].node.value}</p>}
              {data.customer.metafields.edges[17] && <p>18. <strong>{data.customer.metafields.edges[17].node.key}</strong>: {data.customer.metafields.edges[17].node.value}</p>}
              {data.customer.metafields.edges[18] && <p>19. <strong>{data.customer.metafields.edges[18].node.key}</strong>: {data.customer.metafields.edges[18].node.value}</p>}
              {data.customer.metafields.edges[19] && <p>20. <strong>{data.customer.metafields.edges[19].node.key}</strong>: {data.customer.metafields.edges[19].node.value}</p>}
            </Card>
          );
        }}
      </Query>
      </Page>
    );
  }
}

export default ResourceListWithCustomers;