import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import CameraIcon from '@material-ui/icons/Camera';


import Movies from '../Movies/Movies';
import Directors from '../Directors/Directors';

import withHocs from './TabsHoc';

const TabContainer = ({ children, dir, value, index, ...other }) => (
    <Typography
        component="div"
        dir={dir}
        hidden={value !== index}
        style={{ padding: 8 * 3 }}
        {...other}
    >
        {children}
    </Typography>
);

class SimpleTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => { this.setState({ value }); };

    render() {
        const { classes, theme } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                        <Tab label="Movies" icon={<CameraIcon />} />
                        <Tab label="Directors" icon={<MovieCreationIcon />} />
                    </Tabs>
                </AppBar>
                <TabContainer dir={theme.direction} value={value} index={0}><Movies /></TabContainer>
                <TabContainer dir={theme.direction} value={value} index={1}><Directors /></TabContainer>
            </div>
        );
    }
}

export default withHocs(SimpleTabs);
