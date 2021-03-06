<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [NewsLetter component](#newsletter-component)
  * [**Basic Use**:](#basic-use)
  * [**A NewsLetter with registered user**:](#a-newsletter-with-registered-user)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### NewsLetter component

Can be used to create a NewsLetter to subscribe with existing or non existing users

#### **Basic Use**:

* 'highlight' as default variant
* Setting custom dialog wrapper elements id.
* Required segmentId should passed dynamically from wrapper elements.
* Passing MiscStyles to Newsletter wrapper for better flexible and responsive use.

```jsx
<div dir="rtl">
  <Newsletter
    host="htz"
    icon="htz"
    contentId="7.1234567"
    segmentId={1420800}
    miscStyles={{ maxWidth: '90rem', marginLeft: 'auto', marginRight: 'auto' }}
  />
</div>
```

#### **A NewsLetter with registered user**:

* When the user is logged in(not anonymous user), user's email should be passed to `userEmail` prop.
* Passing variant of 'primary' will dynamically set variants for each Button, TextInput and Newsletter's color.

```jsx
<div dir="rtl">
  <Newsletter
    buttonText="שליחה"
    contentId="7.1234567"
    headlineText="הירשמו עכשיו: סיכום כותרות הבוקר אצלכם במייל "
    host="tm"
    icon="tm"
    segmentId={1420800}
    userEmail="user@test.com"
    variant="primary"
    miscStyles={{ maxWidth: '90rem', marginLeft: 'auto', marginRight: 'auto' }}
  />
</div>
```
