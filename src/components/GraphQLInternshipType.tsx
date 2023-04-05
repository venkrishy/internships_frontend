interface href_type {
    anchor_text: string,
    link_target: string
}
export type GraphQLInternshipType = {
    listInternHives?:  {
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