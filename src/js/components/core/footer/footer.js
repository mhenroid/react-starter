import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <footer id="footer" className="navbar-fixed-bottom">
                <section className="footer-body">
                    <ul className='list-inline'>
                        <li><a href='#'>Link 1</a></li>
                        <li><a href='#'>Link 2</a></li>
                        <li><a href='#'>Link 3</a></li>
                        <li><a href='#'>Link 4</a></li>
                        <li><a href='#'>Link 5</a></li>
                        <li><a href='#'>Link 6</a></li>
                        <li><a href='#'>Link 7</a></li>
                    </ul>
                    <div id="footer-logo">
                        <a href="#"></a>
                    </div>
                </section>
            </footer> 
        );
    }
}