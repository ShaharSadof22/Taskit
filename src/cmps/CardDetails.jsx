import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { FaCheckCircle, FaUserCircle, FaFileImage, FaTrashAlt } from "react-icons/fa";

import TextField from '@material-ui/core/TextField';

// date picker
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




import { ColorModal } from './ColorModal'
import { boardService } from '../services/boardService'
import { AddImg } from './AddImg'
import { Checklist } from './Checklist'
import { updateBoard } from '../store/actions/boardActions'

export class _CardDetails extends Component {

    state = {
        card: null,
        isAddImgModalShown: false,
        isDescriptionEdit: false,
        isTimeEdit: false,
        isLabelesEdit: false
    }
    componentDidMount() {
        const card = boardService.getCardById(this.props.board, this.props.groupId, this.props.cardId)
        this.setState({ card })
        // this.updateLocalCard('dueDate', new Date())
    }
    updateState = (key, val) => {
        this.setState({ [key]: val })
    }
    onRmoveModal = () => {
        this.saveCard()
        this.props.updateState('isDetailsShown', false)
    }
    onHandleRemove = () => {
        this.props.updateState('isDetailsShown', false)
        this.props.onRemoveCard(this.state.card.id)
    }

    onRemoveImg = () => {
        const card = this.state.card
        delete card.imgUrl
        this.setState({ card })
    }
    saveCard = () => {
        this.updateState('isDescriptionEdit', false)
        var cardId = this.state.card.id;
        const newBoard = { ...this.props.board }
        const group = newBoard.groups.find(group => group.id === this.props.groupId);
        const cardIdx = group.cards.findIndex(card => card.id === cardId);
        group.cards.splice(cardIdx, 1, this.state.card)
        this.props.updateBoard(newBoard)
    }
    doneEdit = () => {
        this.updateState('isDescriptionEdit', false)
        this.saveCard()
    }
    updateLocalCard = (key, val) => {
        console.log("updateLocalCard -> val", val)
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                [key]: val
            }
        }))
    }
    onRemoveDuedate = () => {
        this.updateState('isTimeEdit', false)
        const card = this.state.card
        delete card.dueDate
        this.setState({ card })
        this.saveCard()
    }
    convert = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    onSaveDuedate = (selectedDate) => {


        console.log("111111111111", selectedDate)

        selectedDate = this.convert(selectedDate)

        console.log("222222222222", selectedDate)

        selectedDate = new Date(selectedDate).getTime() / 1000

        console.log("333333333", selectedDate)

        this.updateState('isTimeEdit', false)
        this.updateLocalCard('dueDate', selectedDate)
        this.saveCard()
    }
    onSaveLabels = (val) => {
        this.setState({ isLabelesEdit: false })
        var labels = [val]
        if (this.state.card.labels) {
            labels = this.state.card.labels
            labels.push(val)
        }
        this.updateLocalCard('labels', labels)
    }
    onRemoveLabel = (label) => {
        const labels = this.state.card.labels
        const labelIdx = labels.indexOf(label);
        labelIdx > -1 && labels.splice(labelIdx, 1);
        this.updateLocalCard('labels', labels)
    }
    onOpenDuedate = () => {
        this.updateLocalCard('dueDate', new Date())
        this.setState({ isTimeEdit: true })
    }
    saveChecklist=(checklists)=>{
        this.updateTextCard('checklists',checklists)
        this.saveCard()
    }
    onOpenLabelModal = () => {
        if (this.state.card.labels) {
            if (this.state.card.labels.length < 6) {
                this.setState({ isLabelesEdit: true })
            }
        } else {
            this.setState({ isLabelesEdit: true })
        }
    }


    render() {
        if (!this.state.card) return <div>Loading...</div>
        const { card } = this.state
        return (
            <div className="card-modal flex align-center">

                <div className="empty-modal" onClick={this.onRmoveModal}></div>

                <div className="details-modal" >

                    <header className="card-header flex space-between">
                        <h3>{card.title}</h3>
                        <button className="btn btn-card-remove" onClick={this.onRmoveModal}>X</button>
                    </header>
                    <div className="flex space-between">
                        <div className="modal-details-left">

                            <div className="flex">
                                <button className="btn btn-invite" > <FaUserCircle style={{ marginRight: "5px" }} /> Invite</button>
                                {(card.members && card.members.length > 0) &&
                                    <div>
                                        <p className="small-header">Members</p>
                                        <section className="avatar-members flex">
                                            {card.assignedMembers &&
                                                <AvatarGroup max={3}>
                                                    {card.assignedMembers.map(member => {
                                                        return member.imgUrl ?
                                                            <Avatar key={member._id} asrc={member.imgUrl}></Avatar>
                                                            :
                                                            <Avatar key={member._id} src={member.imgUrl}>{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
                                                    }
                                                    )}
                                                </AvatarGroup>
                                            }
                                        </section>
                                    </div>}
                                {(card.labels && card.labels.length > 0) &&
                                    <div>
                                        <p className="small-header">Labels</p>
                                        <div className="flex">
                                            {card.labels.map(label => <div key={label} onClick={() => this.onRemoveLabel(label)} className="small-label" style={{ backgroundColor: label }} />)}
                                        </div>
                                    </div>
                                }
                            </div>

                            {(this.state.isTimeEdit || card.dueDate) &&
                                <div>
                                    <DatePicker
                                        selected={new Date()}
                                        // selected={card.dueDate ? new Date(card.dueDate) : new Date() }
                                        onChange={selected => this.onSaveDuedate(selected)}
                                        showTimeSelect
                                        dateFormat="Pp"
                                    />

                                    <button onClick={this.onRemoveDuedate} className="btn">X</button>
                                </div>
                            }
                            <div>
                                <div className="edit-header flex">
                                    <p>description</p>
                                    <button className="btn" onClick={() => this.updateState('isDescriptionEdit', true)}>Edit</button>
                                </div>
                                {this.state.isDescriptionEdit ?
                                    <div >
                                        <TextField
                                            multiline
                                            rows={5}
                                            defaultValue={this.state.card.description}
                                            variant="outlined"
                                            className="edit-card-description"
                                            onChange={ev => this.updateLocalCard('description', ev.target.value)}
                                        />
                                        <button onClick={this.saveCard} className="btn">Save</button>
                                    </div>
                                    :
                                    <div
                                        className="not-edit-card-description"
                                        onClick={() => this.updateState('isDescriptionEdit', true)}>{this.state.card.description ? this.state.card.description : "Add a more details description..."}
                                    </div>
                                }
                            </div>

                             { this.state.card.checklists && <Checklist saveChecklist={this.saveChecklist} checklists={this.state.card.checklists}/>}


                            {card.imgUrl &&
                                <div>
                                    <img className="card-img" src={card.imgUrl} alt="Loading" />
                                    <button onClick={this.onRemoveImg} className="btn"><FaTrashAlt style={{ marginRight: "5px" }} /> Remove Image</button>
                                </div>
                            }
                        </div>

                        <div className="side-bar-details-right flex column">
                            <button className="btn" onClick={() => this.updateState('isAddImgModalShown', true)}><FaFileImage style={{ marginRight: "3px" }} />Cover Image</button>
                            <button onClick={this.onHandleRemove} className="btn"> <FaTrashAlt style={{ marginRight: "5px" }} />Delete Card</button>
                            <button className="btn"> <FaCheckCircle style={{ marginRight: "5px" }} />Checklist</button>
                            <button onClick={this.onOpenDuedate} className="btn">Due Date</button>
                            <button onClick={this.onOpenLabelModal} className="btn">Labels</button>
                            {this.state.isLabelesEdit &&
                                <ColorModal onSaveLabels={this.onSaveLabels} labels={card.labels}/>}
                        </div>

                    </div>
                    {this.state.isAddImgModalShown && <AddImg card={card} updateState={this.updateState} />}
                </div >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard
    }
}
const mapDispatchToProps = {
    updateBoard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
