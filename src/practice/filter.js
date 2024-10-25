const people = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
}, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
}, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
}, {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',
}, {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
}];

function Filter() {
    const chemist = people.filter(people => people.profession == "chemist")
    const listitems = chemist.map(chemist => <li>{chemist.name}</li>)
    return (
        <>
            <ul>{listitems}</ul>
            {/* <button>
                Go to next page
            </button> */}
        </>
    )
}

export default Filter;