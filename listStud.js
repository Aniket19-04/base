import React from 'react'
import axios from 'axios'
class ListStud extends React.Component {
    state = {
        students: [],
        ufirstname: '',
        ulastname: '',
        uplace: '',
        uid: '',
    }
    getStud = () => {
        axios.get(`http://localhost:5000/`)
            .then(res => {
                console.log(res);
                this.setState({ students: res.data });
            })
    }
    componentDidMount = () => {
        this.getStud();
    }
    handleDelete = (id) => {
        axios.delete(`http://localhost:5000/student${id}`)
            .then(res => {
                console.log(res);
                window.location = '/';
            })
    }
    handleUpdate = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleModalUpdate = (e) => {
        axios.put(`http://localhost:5000/student/${this.state.uid}`, { teamname: this.state.uteamname, leadername: this.state.leadername, size: this.state.usize, leadercontact: this.state.leadercontact, year: this.state.year })
            .then(res => {
                console.log(res);
                this.setState({ uteamname: '', uleadername: '', usize: '', uleadercontact: '', uyear: '' })
                window.location = '/';
            })
    }
    getStud = () => {
        axios.get('http://localhost:5000/')
            .then(res => {
                console.log(res);
                this.setState({ students: res.data });
            })
    }
    componentDidMount = () => {
        this.getStud();
    }
    render() {
        return (
            <div>{
                this.state.students.map(student => (
                    <div key={student._id} className='card' style={{ marginLeft: '15px', marginTop: '20px' }}>
                        <div className='card-body' style={{ display: 'inline-block' }}>
                            <h3>Team Name:{student.teamname}</h3>
                            <h3>Leader Name:{student.leadername}</h3>
                            <h3>Size:{student.size}</h3>
                            <h3>Leader Contact No.:{student.leadercontact}</h3>
                            <h3>Place:{student.place}</h3>
                        </div>
                        <div className='container' style={{ display: 'inline-block' }}>
                            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onClick={() => { this.setState({ ufirstname: student.firstname, ulastname: student.lastname, uplace: student.place, uid: student._id }) }}>UPDATE</button>
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal" onClick={this.handleDelete(student._id)}>DELETE</button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">UPDATE</h4>
                                        </div>
                                        <div class="modal-body">
                                            <input name='ufirstname' value={this.state.ufirstname} onChange={(e) =>
                                                this.handleUpdate(e)} placeholder='First Name' className='form-control' style={{ marginBottom: '20px' }} />
                                            <input name='ulastname' value={this.state.ulastname} onChange={(e) =>
                                                this.handleUpdate(e)} placeholder='Last Name' className='form-control' style={{ marginBottom: '20px' }} />
                                            <input name='uplace' value={this.state.uplace} onChange={(e) =>
                                                this.handleUpdate(e)} placeholder='Place' className='form-control' style={{ marginBottom: '20px' }} />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={(e) => { this.handleModalUpdate(e) }}>UPDATE</button>
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => { this.setState({ ufirstname: '', ulastname: '', uplace: '' }) }}>CLOSE</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        );
    }
}

export default ListStud;