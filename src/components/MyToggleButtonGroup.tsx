import React from "react"
import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const MyToggleButtonGroup = () => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleButtonToggle = (
        event: React.MouseEvent<HTMLElement>,
        newSelectedButton: string | null,
    ) => {
        setSelectedButton(newSelectedButton);
    };

    const buttonStyle = {
        border: 'none',
        borderRadius: '20px',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    return (

        <ToggleButtonGroup
            value={selectedButton}
            onChange={handleButtonToggle}
        >
            <ToggleButton
                value="Front End"
                sx={{
                    ...buttonStyle,
                    backgroundColor:
                        selectedButton === 'FrontEnd' ? 'gray' : 'white',
                    boxShadow:
                        selectedButton === 'FrontEnd'
                            ? `inset 0 0 5px rgba(0, 0, 0, 0.5)`
                            : '',
                }}
            >
                {selectedButton === 'FrontEnd' ? 'Selected FrontEnd' : 'FrontEnd'}
            </ToggleButton>
            <ToggleButton
                value="Back End"
                sx={{
                    ...buttonStyle,
                    backgroundColor:
                        selectedButton === 'Backend' ? 'gray' : 'white',
                    boxShadow:
                        selectedButton === 'Backend'
                            ? `inset 0 0 5px rgba(0, 0, 0, 0.5)`
                            : '',
                }}
            >
                {selectedButton === 'Backend' ? 'Selected Backend' : 'Backend'}
            </ToggleButton>
            <ToggleButton
                value="No Sponsership"
                sx={{
                    ...buttonStyle,
                    backgroundColor:
                        selectedButton === 'NoSponsership' ? 'gray' : 'white',
                    boxShadow:
                        selectedButton === 'NoSponsership'
                            ? `inset 0 0 5px rgba(0, 0, 0, 0.5)`
                            : '',
                }}
            >
                {selectedButton === 'NoSponsership'
                    ? 'Selected No Sponsership'
                    : 'No Sponsership'}
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
