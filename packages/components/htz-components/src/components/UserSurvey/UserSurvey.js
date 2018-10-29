import React from 'react';

import USER_INFO from './UserInfo';
import Query from '../ApolloBoundary/Query';
import UserDispenser from '../User/UserDispenser';
import UserSurveyInner from './UserSurveyInner';

export default function UserSurvey() {
  const isOptOut = userInfo =>
    userInfo.articlePageSurvey !== null && userInfo.articlePageSurvey.isOptOut;

  const isSubmitted = userInfo =>
    userInfo.articlePageSurvey !== null &&
    userInfo.articlePageSurvey.isSubmitted;

  return (
    <UserDispenser
      render={({ isLoggedIn, user, }) =>
        (!isLoggedIn ? null : (
          <Query query={USER_INFO} variables={{ id: user.id, }}>
            {({ data, error, loading, }) => {
              if (error || loading) return null;

              const hide =
                data.userInfo.pageCount < 3 ||
                isOptOut(data.userInfo) ||
                isSubmitted(data.userInfo);
              return (
                <UserSurveyInner
                  userInfo={data.userInfo}
                  user={user}
                  hide={hide}
                />
              );
            }}
          </Query>
        ))
      }
    />
  );
}
