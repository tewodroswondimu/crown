import React from 'react'; 

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles'

// with spinner is a higher order component that takes in a component
const withSpinner = WrappedComponent => {
    // spinner is an anonymous function that takes in a Boolean isLoading
    // and all other props belonging to WrappedComponent
    const Spinner = ({ isLoading, ...otherProps }) => {
        // if isLoading is true, then the spinner is displayed
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : 
        // else the wrapped component is displayed without the spinner
        ( <WrappedComponent {...otherProps} /> )
    }
    return Spinner; 
}

export default withSpinner; 