function Item({isPacked,name}){
    if (isPacked) {
        return <li className="item">{name} ✅</li>;
      }
      return <li className="item">{name}</li>;
}

function Packing(){
    return(
        <section>
            <h1>Sallys Rides packing list</h1>
            <ul>
                <Item isPacked={true} name="Space suit"/>
                <Item isPacked={false} name="Photo of tam"/>


            </ul>
        </section>
    )
}
export default Packing;