import React from 'react';
import Name from '../practice/jsx';
import List from '../practice/list';
import Todo from '../practice/Todolist';
import Packing from '../practice/condition';
import Array from '../practice/Array';
import Filter from '../practice/filter';
import App from '../practice/button';
import Pages from '../practice/page';
import Save from '../practice/api';
import { Link } from "react-router-dom";


function Practice() {
    return (
        <>
            <Pages />
            <Name />
            <App />
            <List />
            <Todo />
            <Packing />
            <Array />
            <Filter />
            <Save />

            <Link to="/dashboard">Back to dashboard page</Link><br />

        </>
    )
}

export default Practice;