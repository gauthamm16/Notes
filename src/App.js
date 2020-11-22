import React from 'react';
import './App.css';
import db from './firebase';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import firebase from 'firebase';
import 'firebase/firestore';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    }
  }



  render(){
    return(
      <div className="app-container">
        <SidebarComponent selectedNoteIndex={this.state.selectedNoteIndex} notes={this.state.notes} deleteNote={this.deleteNote} newNote={this.newNote} selectNote={this.selectNote}></SidebarComponent>
        {
          this.state.selectedNote ? <EditorComponent noteUpdate={this.noteUpdate} selectedNote={this.state.selectedNote} notes={this.state.notes} selectedNoteIndex={this.state.selectedNoteIndex}></EditorComponent> : null
        }
      </div>
    )
  }

  selectNote = (note, index) =>   this.setState({ selectedNoteIndex: index, selectedNote: note });


  componentDidMount = () => {
    db.collection("notes").onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      })
      // console.log(" THESE ARE NOTES >> ",notes);
      this.setState({
        notes: notes
      })
    })
  }

  noteUpdate = (id,noteObj) => {
    db.collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await db.collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }


  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    db.collection('notes').doc(note.id).delete();
  }

}

export default App;
