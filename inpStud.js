import React from 'react'
import axios from 'axios'
import team from '../components/media/team.jpg'

class InpStud extends React.Component {
    state = {
        teamname: "",
        leadername: "",
        place: ""
    }
    handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = () => {
        if (this.state.teamname !== '' && this.state.leadername !== '' && this.state.size !== '' && this.state.leadercontact !== '' && this.state.year !== '') {
            axios.post('http://localhost:5000/student', this.state)
                .then(res => {
                    console.log('Successfully  Submitted');
                    this.setState({ teamname: '', leadername: '', place: '' });
                });
            window.location = '/';
        }
    }
    render() {
        return (
            <div className='row text-center'>
                <div className='col-md-4'>
                    <form onSubmit={() => this.handleSubmit()}>
                        <input required onChange={(e) => this.handleChange(e)} name='teamname' value={this.state.teamname} style={{ marginLeft: '50px', borderRadius: '15px', marginTop: '20px' }} placeholder='Team Name' className='form-control' />
                        <input required onChange={(e) => this.handleChange(e)} name='leadername' value={this.state.leadername} style={{ marginLeft: '50px', borderRadius: '15px', marginTop: '20px' }} placeholder='Leader Name' className='form-control' />
                        <input required onChange={(e) => this.handleChange(e)} name='size' value={this.state.size} style={{ marginLeft: '50px', borderRadius: '15px', marginTop: '20px' }} placeholder='Team Size' className='form-control' />
                        <input required onChange={(e) => this.handleChange(e)} name='leadercontact' value={this.state.leadercontact} style={{ marginLeft: '50px', borderRadius: '15px', marginTop: '20px' }} placeholder='Leader Contact No.' className='form-control' />
                        <input required onChange={(e) => this.handleChange(e)} name='year' value={this.state.year} style={{ marginLeft: '50px', borderRadius: '15px', marginTop: '20px' }} placeholder='Year' className='form-control' />
                        <button style={{ color: 'white', backgroundColor: '#000066', borderRadius: '15px', marginLeft: '50px', marginTop: '20px', width: '400px' }} className='btn btn-primary'>Create</button>

                    </form>
                </div>
                <div className='col-md-8'>
                    <img src={team} />
                </div>

            </div>
        );
    }
}
export default InpStud;


