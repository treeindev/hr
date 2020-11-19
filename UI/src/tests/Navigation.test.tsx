import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import { createMemoryHistory } from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import { Navigation } from '../components';

const renderNavigation = () => {
    const history = createMemoryHistory()
    render(
        <Router history={history}>
            <Navigation />
        </Router>
    );
}

test('Menu element gets rendered on navigation component', async () => {
    renderNavigation();
    expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
});

test('Multiple navigation allows to change view', async () => {
    const history = createMemoryHistory()
    render(
        <Router history={history}>
            <App />
        </Router>
    );
    userEvent.click(screen.getByTestId('navigation-employee-new'), { button: 0 });
    userEvent.click(screen.getByTestId('navigation-employee-list'), { button: 0 });
    expect(screen.getByTestId('view-employees')).toBeInTheDocument();
});
