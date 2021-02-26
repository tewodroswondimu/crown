import React from 'react'; 
import HomePage from '../../pages/homepage/homepage.component';
import MenuItem from '../menu-item/menu-item.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selector';

import './directory.styles.scss'

// we use class here because we want to pass in the menu items
const Directory = ({ sections }) => {
    return (
        <div className='directory-menu'>
        {
            sections.map(({id, ...otherSectionProps}) => (
                    <MenuItem key={id} {...otherSectionProps}/>
                )
            )
        }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory); 