import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#205081'
  },
  appBar: {
    height: 40
  },
});

export default class Header extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <AppBar title="React Starter" className="appBar" />
            </MuiThemeProvider>
        );
    }
}

