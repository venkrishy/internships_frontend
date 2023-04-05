/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateInternHiveInput = {
  id?: string | null,
  name: string,
  location: string,
  notes: string,
};

export type ModelInternHiveConditionInput = {
  name?: ModelStringInput | null,
  location?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelInternHiveConditionInput | null > | null,
  or?: Array< ModelInternHiveConditionInput | null > | null,
  not?: ModelInternHiveConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type InternHive = {
  __typename: "InternHive",
  id: string,
  name: string,
  location: string,
  notes: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateInternHiveInput = {
  id: string,
  name?: string | null,
  location?: string | null,
  notes?: string | null,
};

export type DeleteInternHiveInput = {
  id: string,
};

export type ModelInternHiveFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  location?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelInternHiveFilterInput | null > | null,
  or?: Array< ModelInternHiveFilterInput | null > | null,
  not?: ModelInternHiveFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelInternHiveConnection = {
  __typename: "ModelInternHiveConnection",
  items:  Array<InternHive | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionInternHiveFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  notes?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInternHiveFilterInput | null > | null,
  or?: Array< ModelSubscriptionInternHiveFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateInternHiveMutationVariables = {
  input: CreateInternHiveInput,
  condition?: ModelInternHiveConditionInput | null,
};

export type CreateInternHiveMutation = {
  createInternHive?:  {
    __typename: "InternHive",
    id: string,
    name: string,
    location: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateInternHiveMutationVariables = {
  input: UpdateInternHiveInput,
  condition?: ModelInternHiveConditionInput | null,
};

export type UpdateInternHiveMutation = {
  updateInternHive?:  {
    __typename: "InternHive",
    id: string,
    name: string,
    location: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteInternHiveMutationVariables = {
  input: DeleteInternHiveInput,
  condition?: ModelInternHiveConditionInput | null,
};

export type DeleteInternHiveMutation = {
  deleteInternHive?:  {
    __typename: "InternHive",
    id: string,
    name: string,
    location: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetInternHiveQueryVariables = {
  id: string,
};

export type GetInternHiveQuery = {
  getInternHive?:  {
    __typename: "InternHive",
    id: string,
    name: string,
    location: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListInternHivesQueryVariables = {
  filter?: ModelInternHiveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInternHivesQuery = {
  listInternHives?:  {
    __typename: "ModelInternHiveConnection",
    items:  Array< {
      __typename: "InternHive",
      id: string,
      name: string,
      location: string,
      notes: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateInternHiveSubscriptionVariables = {
  filter?: ModelSubscriptionInternHiveFilterInput | null,
};

export type OnCreateInternHiveSubscription = {
  onCreateInternHive?:  {
    __typename: "InternHive",
    id: string,
    name: string,
    location: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInternHiveSubscriptionVariables = {
  filter?: ModelSubscriptionInternHiveFilterInput | null,
};

export type OnUpdateInternHiveSubscription = {
  onUpdateInternHive?:  {
    __typename: "InternHive",
    id: string,
    name: string,
    location: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInternHiveSubscriptionVariables = {
  filter?: ModelSubscriptionInternHiveFilterInput | null,
};

export type OnDeleteInternHiveSubscription = {
  onDeleteInternHive?:  {
    __typename: "InternHive",
    id: string,
    name: string,
    location: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
