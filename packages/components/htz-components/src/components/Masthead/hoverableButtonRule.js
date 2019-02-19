const normalStyle = theme => ({
  color: theme.color('primary'),
  backgroundColor: 'transparent',
});

const openedStyle = theme => ({
  backgroundColor: theme.color('secondary'),
  color: theme.color('neutral', '-10'),
});

const focusedStyle = theme => ({
  color: theme.color('white'),
  backgroundColor: theme.color('primary'),
  outline: 'none',
});

export default ({ theme, isOpen = false, }) => ({
  transitionProperty: 'all',
  ...(isOpen ? openedStyle(theme) : normalStyle(theme)),

  '&:hover': focusedStyle(theme),
  '&:focus': focusedStyle(theme),

  extend: [
    theme.getTransition(1, 'swiftIn'),
  ],
});
