import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


class EditorComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            text: '',
            title: '',
            id: '',
        }
    }

    componentDidUpdate = () => {
        if(this.props.selectedNote.id != this.state.id){
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            });
        }
    }

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        });
    }

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input type="text" placeholder="Enter title" className={classes.titleInput} value={this.state.title ? this.state.title : ''} onChange={(e) => this.updateTitle(e.target.value)}/>
                <ReactQuill 
                    value={this.state.text} 
                    onChange={this.updateBody}>
                </ReactQuill>

            </div>
        )
       
    }

    updateTitle = async (e) => {
        await this.setState({title: e})
        this.update();
    }

    updateBody = async (e) => {
        await this.setState({text:e});
        this.update();
    };

    update = debounce(() => {
        this.props.noteUpdate(this.state.id, {
            title: this.state.title,
            body: this.state.text
          })
        }, 1500);
}

export default withStyles(styles)(EditorComponent);