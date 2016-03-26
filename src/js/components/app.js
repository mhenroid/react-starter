import React from 'react';
import {Link} from 'react-router';
import Header from './core/header/header';
import Footer from './core/footer/footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftNavOpen: false
        };
    }
    
    render() {
        return (
            <div>
                <Header />
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                <Footer />
            </div>
        );
    }
}

export default App;
