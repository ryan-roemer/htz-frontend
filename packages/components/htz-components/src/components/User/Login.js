import React from 'react';
import PropTypes from 'prop-types';
import { UserService, } from '@haaretz/htz-user-utils';
import UserDispenser from './UserDispenser';

const propTypes = {
  render: PropTypes.func.isRequired,
};
const defaultProps = {};

class Login extends React.Component {
  getLoginFunction = (user, plantImages, handleImgOnload) => function login(username, password) {
    const userService = new UserService({
      plantImagesCallback: plantImages,
      onImageLoadCallback: handleImgOnload,
    });
    return userService.login({ username, password, user, });
  };

  render() {
    return (
      <UserDispenser
        render={({ isLoggedIn, user, plantImages, handleImgOnload, }) => this.props.render({
          login: this.getLoginFunction(user, plantImages, handleImgOnload),
        })
        }
      />
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
