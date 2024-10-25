import React from 'react';

const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
];

function List() {
    const listitems = products.map(product =>
        <li
            key={product.id}>{product.title}</li>
    );
    return (
        <div>
            {listitems}
        </div>
    )
}
export default List;
