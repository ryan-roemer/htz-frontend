<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [NavigationMenu examples](#navigationmenu-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### NavigationMenu examples

```jsx
<div style={{ direction: 'rtl', marginBottom: '300px' }}>
  <NavigationMenu
    menuSections={{
      items: [
        {
          name: 'חדשות',
          url: '/news',
          pages: [
            {
              name: 'בעולם',
              url: '/news/world',
            },
            {
              name: 'חינוך וחברה',
              url: '/news/world',
            },
            {
              name: 'מדיני ביטחוני',
              url: '/news/world',
            },
            {
              name: 'מדע וסביבה',
              url: '/news/world',
            },
            {
              name: 'מזר האוויר',
              url: '/news/world',
            },
            {
              name: 'בריאות',
              url: '/news/world',
            },
            {
              name: 'מקומי',
              url: '/news/world',
            },
            {
              name: 'משפט ופלילים',
              url: '/news/world',
            },
            {
              name: 'פוליטי',
              url: '/news/world',
            },
          ],
        },
        {
          name: 'דעות',
          url: '/opinions',
          pages: [
            {
              name: 'מאמר מערכת',
              url: '/news/world',
            },
            {
              name: 'מכתבים למערכת',
              url: '/news/world',
              pages: [
                {
                  name: 'בעולם',
                  url: '/news/world',
                },
                {
                  name: 'חינוך וחברה',
                  url: '/news/world',
                },
                {
                  name: 'מדיני ביטחוני',
                  url: '/news/world',
                },
                {
                  name: 'מדע וסביבה',
                  url: '/news/world',
                },
                {
                  name: 'מזר האוויר',
                  url: '/news/world',
                },
                {
                  name: 'בריאות',
                  url: '/news/world',
                },
                {
                  name: 'מקומי',
                  url: '/news/world',
                },
                {
                  name: 'משפט ופלילים',
                  url: '/news/world',
                },
                {
                  name: 'פוליטי',
                  url: '/news/world',
                },
                {
                  name: '50 ל-67',
                  url: '/news/world',
                },
              ],
            },
            {
              name: 'קריקטורה יומית',
              url: '/news/world',
            },
          ],
        },
        {
          name: 'ספרים',
          url: '/books',
        },
        {
          name: 'סוף שבוע',
          url: '/weekend',
          pages: [
            {
              name: 'הקצה',
              url: '/news/world',
            },
            {
              name: 'סייד קשוע',
              url: '/news/world',
            },
            {
              name: 'ענייני פנים',
              url: '/news/world',
            },
            {
              name: '20 שאלות',
              url: '/news/world',
            },
            {
              name: 'טיסות נכנסות / טיסות יוצאות',
              url: '/news/world',
            },
            {
              name: 'המילה',
              url: '/news/world',
            },
          ],
        },
      ],
      sites: [
        {
          name: 'haaretz.com',
          url: 'https://www.haaretz.com',
        },
        {
          name: 'themarker.com',
          url: 'https://www.themarker.com',
        },
      ],
      promotions: [
        {
          name: 'רכשו מינוי',
          url: 'https://www.haaretz.co.il/promotions-page',
        },
      ],
    }}
  />
</div>
```
