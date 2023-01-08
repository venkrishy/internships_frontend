import React, { useEffect, useState } from "react";
import useConfig from "./useConfig";
import ReactDOM from 'react-dom';
import MOCK_DATA from './MOCK_DATA.json';

interface href_type {
    anchor_text: string,
    link_target: string
}
interface InternshipType { name: string, name_html: string, location: string, location_html: string, closed: boolean, notes: string, notes_html: string, notes_hrefs: href_type[] };

const generateKey = (internship: InternshipType) => {
    return `${internship.name}_${new Date().getTime()}`;
}

const getInternshipsToRenderer = (internships: InternshipType[]) => {
    if (!internships) {
        console.log("internships is null");
        return;
    }
    let output = (
        <div id="internships">
            <table id="internships_table" className="table is-striped">
                <thead>
                    <tr>
                        <th className="has-text-centered">Name</th>
                        <th className="has-text-centered">Location</th>
                        <th className="has-text-centered">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows(internships)}
                </tbody>
            </table>
        </div>
    );
    return output;
};

const createRows = (internships: InternshipType[] ) => {
    if (!internships) {
        console.log("internships is null");
        return;
    }
    return internships.map((internship: InternshipType, idx: number) => {
        var name_html = { __html: internship.name_html }
        var notes_html = { __html: internship.notes_html }
        var location_html = { __html: internship.location_html }
        return (
            <tr key={idx + "_" + generateKey(internship)}>
                <td><div dangerouslySetInnerHTML={name_html} /></td>
                <td><div dangerouslySetInnerHTML={location_html} /></td>
                <td><div dangerouslySetInnerHTML={notes_html} /></td>
            </tr>
        )
    });
};

const InternshipsComponent = function() {
    const config = useConfig();
    const [internships, setInternships] = useState<InternshipType[] | undefined>(undefined);
    const href_record : href_type = {anchor_text: "string", link_target: "string"}
    const href_records: href_type[] = [href_record]
    const record: InternshipType = { name: "", name_html: "name_html", location: "string", location_html: "location_html", closed: false, notes: "string", notes_html: "notes_html", notes_hrefs: href_records };
    const records: InternshipType[] = [record];

    useEffect(() => {
        if (config.app.IS_LOCAL) {
            console.log("Loading Mock Data from MOCK_DATA.JSON file");
            setInternships(MOCK_DATA.reverse());
        } else {
            console.log("config.app.INTERNSHIPS_ENDPOINT", config.app.INTERNSHIPS_ENDPOINT);
            fetch(encodeURI(config.app.INTERNSHIPS_ENDPOINT)).then(resp => {
                return resp.json();
            }).then(data => {
                setInternships(records.reverse());
            }).catch(error => {
                console.log(error);
            });
        }
    }, [])
    return (
        <div className="internships">
            {internships && getInternshipsToRenderer(internships) }
        </div>
    )
}

export {InternshipsComponent as default}