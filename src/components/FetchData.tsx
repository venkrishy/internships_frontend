import { API } from "aws-amplify";
import { ListInternHivesQuery } from "src/API";
import searchValues from "./SearchValues";
import {listInternHives} from '../graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import InternshipType from "./InternshipType";

export default async function fetchData(searchStrings: string[], callback: React.Dispatch<React.SetStateAction<InternshipType[]>>) {
    const finalSearchValues = searchValues(searchStrings);

    const filter = {
        or: finalSearchValues.map((value) => ({ notes: { contains: value } })),
    };

    const limit = 1000;

    const { data } = await API.graphql<GraphQLQuery<ListInternHivesQuery>>({
        query: listInternHives,
        variables: { filter, limit },
    });

    console.log("filters OR Query. filter=", filter);

    const transformedData = transformData(data);

    callback(transformedData)
}

function transformData(data: GraphQLQuery<ListInternHivesQuery> | undefined) {
    const transformedData = (data?.listInternHives?.items ?? []).map((item) => ({
        name: item?.name ?? '',
        location: item?.location ?? '',
        notes: item?.notes ?? '',
    }));
    return transformedData;
}