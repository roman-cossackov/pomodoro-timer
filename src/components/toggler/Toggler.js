import React, {useContext} from 'react';
import styled from 'styled-components'

import {MoonIcon} from '@heroicons/react/solid'

import ThemeContext from './ThemeContext.js'

const StyledLabel = styled.label`
    input{
        position: fixed;
        left: -999999px;
    }
    input ~ div {
        width: 43px;
        height: 23px;
        background: #eee;
        border-radius: 14px;
        position: relative;
        left: 20px;
        top: 5px;
    }
    svg {
        height: 21px;
        color: #fff;
        background-color: #ccc;
        border-radius: 10px;
        position: absolute;
        top: 1px;
        left: 1px;
        transition: all .4s ease;
    }
    input:checked ~ div{
        background: #668;
        svg {
            background-color: #224;
            left: 19px
        }
    }
`;

const Toggler = () => {
    const theme = useContext(ThemeContext)
    return (
        <StyledLabel>
            <input
                type="checkbox"
                checked={theme.darkMode}
                onChange={() => theme.setDarkMode(prevMode => !prevMode)}
            />
            <div>
                <MoonIcon />
            </div>
        </StyledLabel>
    )
}

export default Toggler;