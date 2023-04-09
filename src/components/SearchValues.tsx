const SEARCH_VALUES_MAP = new Map<string, string[]>([
    ['Front End', ['Front', 'front', 'Frontend', 'frontend', 'Front End', 'front end']],
    ['Back End', ['Back End', 'BackEnd', 'Bankend', 'Back', 'back']],
    ['No Sponsorship', ['No Sponsorship', 'Sponsorship required']],
    ['Quant', ['Quant', 'quant']],
    ['Machine Learning', ['Machine Learning', 'machine learning']],
    ['Graduate', ['Graduate', 'graduate']],
    ['2023', ['2023']],
    ['2024', ['2024']],
]);

export default function searchValues(searchStrings: string[]): string[] {
    const finalSearchValues: string[] = [];

    for (const searchString of searchStrings) {
        for (const [searchKey, searchValues] of SEARCH_VALUES_MAP) {
            if (searchString.includes(searchKey)) {
                finalSearchValues.push(...searchValues);
            } 
        }
    }

    return finalSearchValues;
}
