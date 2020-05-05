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
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';


const GET_CUSTOMERS = gql`
  query {
  customers(first:250,){
    edges{
      node{
        id
        firstName
        lastName
      }
    }
  }
}
`;


class ResourceListWithCustomers extends React.Component {
  static contextType = Context;

  render() {
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/customer-metafields',
      );
    };

    return (
      <Page>
      <Query query={GET_CUSTOMERS}>
        {({ data, loading, error }) => {
          if (loading) { return <div>Loading…</div>; }
          if (error) { return <div>{error.message}</div>; }
          console.log("data", data);

          return (
            <Card>
              <ResourceList
                showHeader
                resourceName={{ singular: 'Customer', plural: 'Customers' }}
                items={data.customers.edges}
                renderItem={(item) => {
                  const {id, firstName, lastName} = item;

                  return (
                    <ResourceList.Item
                      id={item.node.id}
                      accessibilityLabel={`View metafields for ${item.node.firstName} ${item.node.lastName}`}
                      onClick={() => {
                        store.set('item', item);
                        store.set('id', item.node.id);
                        console.log('item.node.id: ', item.node.id);
                        redirectToProduct();
                      }}
                    >
                      <Stack>
                        <Stack.Item fill>
                          <h3>
                            <TextStyle variation="strong">
                              {item.node.firstName} {item.node.lastName}
                            </TextStyle>
                          </h3>
                        </Stack.Item>
                      </Stack>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          );
        }}
      </Query>
      </Page>
    );
  }
}

export default ResourceListWithCustomers;
