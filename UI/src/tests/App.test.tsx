import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import { createMemoryHistory } from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'

const renderApp = () => {
    const history = createMemoryHistory()
    render(
        <Router history={history}>
            <App />
        </Router>
    );
}

test('App component renders the layout element', async () => {
    renderApp();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
});

test('Navigation element gets rendered', async () => {
    renderApp();
    expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
});

test('Application content changes after user navigates via router', async () => {
    renderApp();
    userEvent.click(screen.getByTestId('navigation-deparments'), { button: 0 });
    expect(screen.getByTestId('view-departments')).toBeInTheDocument();
});

test('404 error shows for bad routing page', async () => {
    const history = createMemoryHistory()
    history.push('/invalid-route')
    render(
        <Router history={history}>
            <App />
        </Router>
    );
    expect(screen.getByTestId('view-404')).toBeInTheDocument();
});
