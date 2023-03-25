interface href_type {
    anchor_text: string,
    link_target: string
}
interface InternshipType { name: string, name_html: string, location: string, location_html: string, closed: boolean, notes: string, notes_html: string, notes_hrefs: href_type[] };

export { InternshipType as default}
