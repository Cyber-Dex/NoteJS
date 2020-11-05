class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "X",
            note: "X",
            notes : [
                {
                    id : '1',
                    title : 'The first',
                    note : 'Just my first Note'
                },
                {
                    id : '2',
                    title : 'The second One Aww',
                    note : 'Ow, my second note'
                }
            ]
        }
    }
    handleSubmit = event => {
        event.preventDefault()
        this.setState(state => {
            const newNote = {
                id : Math.max(...state.notes.map(id => id.id))+1,
                title : event.target.name.value,
                note : event.target.note.value
            }
            localStorage.setItem(newNote.id.toString(), JSON.stringify(newNote));
            return {
                notes : [...state.notes,newNote ],
            }
        })
    }
    handleLoad = () => {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }

        values.map( note => (
            this.setState(state => {
                return {
                    notes : [...state.notes, note],
                }
            })
        ))

        return {
            notes : [...state.notes, values],
        }
    }

    handleChange = event => {
        if( event.target.name === "name" ) this.setState({ name : event.target.value })

        if( event.target.name === "note" ) this.setState({ note : event.target.value })
    }
    handleDelete = note => {
        localStorage.removeItem(note.id.toString());
        this.setState(state => {
            return {
               notes: state.notes.filter(item => item !== note)
            }
        })
    }
    notesList = () => {
        return this.state.notes.map( note => (
            <li onClick={() => this.handleDelete(note)} key={note.id} >{note.title}
                {note.title.split(' ').length > 3 && (
                    <strong> Cool note!</strong>
                )}
                <br/>
                <small>{note.note}</small>
            </li>
        ))
    }
    render() {
        //this.handleLoad()
        return (
            <div>
                <ul className="theList">{this.notesList()}</ul>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder={'Put title'} className={'std-inp'} type={'text'} name={'name'}  onChange={this.handleChange}/>
                    <br/>
                    <input placeholder={'Put quick note'} className={'std-inp'} type={'text'} name={'note'}  onChange={this.handleChange}/>
                    <br/>
                    <input className={'std-inp std-sub'} type={'submit'} name={'submit'}/>
                </form>
                <div className={'activeWatch'}>
                    <h2>{this.state.name}</h2>
                    <h3>{this.state.note}</h3>
                </div>
            </div>
        )
    }
}
ReactDOM.render(< App />, document.getElementById("app"));
