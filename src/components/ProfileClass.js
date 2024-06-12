import React from 'react';

class Profile extends React.Component {
    constructor(props){
        super(props);
        //Create State
        this.state = {
            name: "dummy name",
            location: "dummy location",
        };
        console.log("Child constructors " + this.props.name); //call first
    }
    async componentDidMount(){
        this.timer = setInterval(()=>{
            console.log("hello");
        },1000);
        console.log("Child componentDidMount " + this.props.name); //called at last
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.count !== prevState.count || 
            this.state.count !== prevState.count
            ){
                //code render after every change in count
        }
        console.log("Component Did Update");
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        console.log("Component Will UnMount");
    }
    render(){
        console.log("Child render " + this.props.name); //call second
        return (
            <div>
                <h4>Profile Class Component</h4>
                <img src={this.state.avatar_url} />
                <h4>Name: {this.state.name}</h4>
                <h4>Location: {this.state.location}</h4>
            </div>
        )
    }
}

export default Profile;