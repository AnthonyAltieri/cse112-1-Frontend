import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import {
  isUsernameValid,
  updateUsernameSchema,
  getUsernameSchema,
} from './api/UsernameValidation';

class SingleForm  extends React.Component {
	render() {
    return (
        <label>
          {this.props.setName}
          <input type="text" onChange={this.props.handleChange} />
        </label>
    );
  }
}
/**
* A parameter list of the aspects of a username schema that a user can change
*/
class ParamList extends React.Component {
	render() {
    return (
    	<div>
	    	<h1>Parameters</h1>
	    	<ul>
          <li>Minimum Length: {this.props.minLen}</li>
          <li>Maximum Length: {this.props.maxLen}</li>
          <li>Banned Characters: {this.props.bannedChars}</li>
			</ul>
		</div>
    );
  }
}

/**
* The default state of the username schema
*/
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    	username: '',
      usernameMinLength: '',
      usernameMaxLength: '',
      usernameBannedChars: [],
      minLen: 'NOT DEFINED',
      maxLen: 'NOT DEFINED',
      bannedChars: 'NOT DEFINED',
    };

  }


  /**
  * Checks whether the username schema has changes and if it has it will update it
  */
  async componentDidMount() {
    try {
      const result = await getUsernameSchema();
      console.log('result', result);

      const {
        usernameMinLength,
        usernameMaxLength,
        usernameBannedChars,
      } = result;

      if (typeof usernameMinLength !== 'undefined') {
        this.state.minLen = usernameMinLength;
      }
      if (typeof usernameMaxLength !== 'undefined') {
        this.state.maxLen = usernameMaxLength;
      }
      if (typeof usernameBannedChars !== 'undefined') {
        this.state.bannedChars = '' + usernameBannedChars;
      }
      console.log('state', this.state);
      this.forceUpdate();
    } catch (e) {
    }
  }

  /**
  * The HTML structure of the forms for the isUsernameValid and setUsernameSchema
  */
  render() {
    return (
    <div>
    	<h1>Username Checker</h1>
    	<div>
	    	<div >
		      <SingleForm 
		      	setName = "Check Username:"
		      	handleChange = {(e) => {
		      	  this.state.username = e.target.value;
		      	  console.log('this.state.username', this.state.username);
            }}
          />
		      <a
            className="submitButton"
            onClick={async () => {
              try {
                const payload = await isUsernameValid(this.state.username);
                const { isValid, reason } = payload;
                if (!isValid) {
                  alert(reason);
                  return;
                }
                alert('Username is valid');
              } catch (e) {
                alert('An error occurred, please try again');
              }

            }}
          >
            Submit
          </a>
	      	</div>
      	</div>

      	<div className = "paramList">
      		<ParamList 
      			minLen = {this.state.minLen || 'Undefined'}
      			maxLen = {this.state.maxLen || 'Undefined'}
      			bannedChars = {
      			  this.state.bannedChars.length === 0
                ? '[]'
                :  '[' + this.state.bannedChars + ']'
      			}
          />
      	</div>
      	<div className = "setInputs">
	    	<form onSubmit={this.handleSubmitParams}>
		      <SingleForm 
		      	setName = "Set Min Length:"
		      	handleChange={(e) => {
		      	  this.state.usernameMinLength = e.target.value;
              console.log('this.state.usernameMinLength', this.state.usernameMinLength);
		      	}}
          />
		      <SingleForm 
		      	setName = "Set Max Length:"
		      	handleChange = {(e) => {
		      	  this.state.usernameMaxLength = e.target.value;
              console.log('this.state.usernameMaxLength', this.state.usernameMaxLength);
            }}
          />
		      <SingleForm 
		      	setName = "Set Banned Characters:"
		      	handleChange = {(e) => {
		      	  this.state.usernameBannedChars = e.target.value;
              console.log('this.state.usernameBannedChars', this.state.usernameBannedChars);
            }}
          />
          <a
            className="submitButton"
            onClick={ async() => {
              try {
                const payload = await updateUsernameSchema({
                  usernameMinLength: this.state.usernameMinLength,
                  usernameMaxLength: this.state.usernameMaxLength,
                  usernameBannedChars: this.state.usernameBannedChars,
                });
                let didMinChange = this.state.usernameMinLength !== '';
                let didMaxChange = this.state.usernameMaxLength !== '';
                let didBannedChange = this.state.usernameBannedChars != '';
                const {success, error} = payload;
                if (error) {
                  alert('There was a problem with the submitted schema');
                  return;
                }
                if (didMinChange) {
                  this.state.minLen = this.state.usernameMinLength;
                }
                if (didMaxChange) {
                  this.state.maxLen = this.state.usernameMaxLength;
                }
                if (didBannedChange) {
                  this.state.bannedChars = '' + this.state.usernameBannedChars.split('');
                }
                alert('Username Schema successfully updated');
                this.forceUpdate();
              } catch (e) {
                console.log('error', e);
                alert('An error occurred, please try again');
              }
            }}
          >
            Submit
          </a>
	      	</form>
      	</div>
     </div>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);