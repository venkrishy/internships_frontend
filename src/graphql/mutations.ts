/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInternHive = /* GraphQL */ `
  mutation CreateInternHive(
    $input: CreateInternHiveInput!
    $condition: ModelInternHiveConditionInput
  ) {
    createInternHive(input: $input, condition: $condition) {
      id
      name
      location
      notes
      createdAt
      updatedAt
    }
  }
`;
export const updateInternHive = /* GraphQL */ `
  mutation UpdateInternHive(
    $input: UpdateInternHiveInput!
    $condition: ModelInternHiveConditionInput
  ) {
    updateInternHive(input: $input, condition: $condition) {
      id
      name
      location
      notes
      createdAt
      updatedAt
    }
  }
`;
export const deleteInternHive = /* GraphQL */ `
  mutation DeleteInternHive(
    $input: DeleteInternHiveInput!
    $condition: ModelInternHiveConditionInput
  ) {
    deleteInternHive(input: $input, condition: $condition) {
      id
      name
      location
      notes
      createdAt
      updatedAt
    }
  }
`;
