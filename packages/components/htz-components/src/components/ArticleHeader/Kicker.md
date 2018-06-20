<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Inline kicker](#inline-kicker)
- [Block kicker](#block-kicker)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

A short, catchy word or phrase over a major headline

### Inline kicker

The inline version sits along the headline, as an integral part of it.

```jsx
<div dir="rtl">
  <Kicker
    isBlock={false}
    fontSize={[
      { until: 'm', value: 3 },
      { from: 'm', until: 'l', value: 4 },
      { from: 'l', value: 5 },
    ]}
    text="פרשנות"
  />
</div>
```

### Block kicker

The inline version is positioned independently of the headline.

```jsx
<div dir="rtl">
  <Kicker
    isBlock={true}
    fontSize={[
      { until: 'm', value: 3 },
      { from: 'm', until: 'l', value: 4 },
      { from: 'l', value: 5 },
    ]}
    text="פרשנות"
  />
</div>
```
