const people = [
    'Creola Katherine Johnson: mathematician',
    'Mario José Molina-Pasquel Henríquez: chemist',
    'Mohammad Abdus Salam: physicist',
    'Percy Lavon Julian: chemist',
    'Subrahmanyan Chandrasekhar: astrophysicist'
];

function Array() {
    const listitems = people.map(person => <li>{person}</li>)
    return (
        <>
            {listitems}
        </>
    )
}

export default Array;