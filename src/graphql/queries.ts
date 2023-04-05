/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInternHive = /* GraphQL */ `
  query GetInternHive($id: ID!) {
    getInternHive(id: $id) {
      id
      name
      location
      notes
      createdAt
      updatedAt
    }
  }
`;
export const listInternHives = /* GraphQL */ `
  query ListInternHives(
    $filter: ModelInternHiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInternHives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        location
        notes
      }
      nextToken
    }
  }
`;
