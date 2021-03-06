import React, { Component } from 'react';
import { PacmanLoader } from 'react-spinners';

import './SigIn.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSubmit = () => {
        this.setState({ isLoading: true })
        fetch('https://face-recognition-brain-api-gu0q.onrender.com/signin', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                user.id && this.props.onRouteChange('home')
                this.setState({ isLoading: false })
            })
            .catch(console.log)
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.onSubmit();
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='sign-in-container'>
                {this.state.isLoading
                    ? <PacmanLoader className='loading-spinner' color="#66F1FF" />
                    : <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                        <main className='pa4 black-80 w-100'>
                            <div className='measure'>
                                <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                                    <legend className='f2 fw6 ph0 mh0'>
                                        Sign In
                                    </legend>
                                    <div className='mt3'>
                                        <label
                                            className='db fw6 lh-copy f6'
                                            htmlFor='email-address'
                                        >
                                            Email
                                        </label>
                                        <input
                                            className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                                            type='email'
                                            name='email-address'
                                            id='email-address'
                                            onChange={this.onEmailChange}
                                            onKeyDown={this.handleKeyPress}
                                        />
                                    </div>
                                    <div className='mv3'>
                                        <label
                                            className='db fw6 lh-copy f6'
                                            htmlFor='password'
                                        >
                                            Password
                                        </label>
                                        <input
                                            className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                                            type='password'
                                            name='password'
                                            id='password'
                                            onChange={this.onPasswordChange}
                                            onKeyDown={this.handleKeyPress}
                                        />
                                    </div>
                                </fieldset>
                                <div>
                                    <input
                                        className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-100'
                                        type='submit'
                                        value='Sign in'
                                        onClick={this.onSubmit}
                                    />
                                </div>
                                <div className='lh-copy mt3'>
                                    <span
                                        className='f6 link dim black db pointer'
                                        onClick={() => onRouteChange('register')}
                                    >
                                        Register
                                    </span>
                                </div>
                            </div>
                        </main>
                    </article>
                }
            </div>
        );
    }
};

export default SignIn;
