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

    useEffect(() => {
        if (config.app.LOAD_MOCK_JSON) {
            console.log("Loading Mock Data from MOCK_DATA.JSON file");
            setInternships(MOCK_DATA.reverse());
        } 
        else {
            let internships_endpoint: string = config.app.INTERNSHIPS_ENDPOINT;
            if (config.app.LOAD_FROM_LOCALHOST) {
                internships_endpoint = config.app.INTERNSHIPS_LOCALHOST_ENDPOINT;
                console.log("Loading from localhost");
            } else {
                console.log("Loading from dev server");
            }
            console.log("internships_endpoint", internships_endpoint);
            fetch(encodeURI(internships_endpoint)).then(resp => {
                return resp.json();
            }).then(data => {
                setInternships(data.reverse());
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