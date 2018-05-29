export const seriesArticleI18n = Object.freeze({
  loadButton: Object.freeze({
    close: 'טען את כל הכתבות בסדרה',
    open: 'סגירת הרשימה',
    ariaText: x => `נוספו ${x} כתבות`,
  }),
  titlePrefix: 'סדרת כתבות: ',
});

export const zoominText = 'הגדל';
export const zoomoutText = 'הקטן';

export const textInputI18n = Object.freeze({
  requiredLong: 'שדה חובה',
  requiredShort: '*',
});

export const tagsElementI18n = Object.freeze({
  prefix: 'תגיות:',
});

export const breadcrumbsI18n = Object.freeze({
  ariaLabel: 'מיקומך באתר',
});

export const navigationI18n = Object.freeze({
  button: 'ניווט',
  additionalMenuItems: Object.freeze({
    sections: Object.freeze([
      Object.freeze({
        name: 'מהדורה מודפסת',
        url: 'https://www.haaretz.co.il/st/inter/Global/dailyedition/today/',
      }),
      Object.freeze({
        name: 'הארץ שלי',
        url: 'https://www.haaretz.co.il/personal-area/haaretz-sheli',
      }),
      Object.freeze({
        name: 'העיתון שלי',
        url: 'https://www.haaretz.co.il/personal-area/my-account',
      }),
    ]),
    promotions: Object.freeze([
      Object.freeze({
        name: 'רכשו מינוי',
        url: 'https://www.haaretz.co.il/promotions-page',
      }),
    ]),
    sites: Object.freeze([
      Object.freeze({
        name: 'haaretz.com',
        url: 'https://www.haaretz.com',
      }),
      Object.freeze({
        name: 'themarker.com',
        url: 'https://www.themarker.com',
      }),
    ]),
  }),
});

export const osakaI18n = Object.freeze({
  nextArticle: 'לכתבה הבאה במדור',
  promotedContent: 'תוכן מקודם',
});

export const commentI18n = Object.freeze({
  tags: Object.freeze({
    editorsPick: 'בחירת העורכים',
    usersPick: 'בחירת הגולשים',
  }),
  buttons: Object.freeze({
    readMoreBtnTxt: 'קרא עוד',
    replyBtnTxt: 'הגב',
    reportAbuseBtnTxt: 'דווח כפוגעני',
  }),
});

export const commentFormI18n = Object.freeze({
  buttons: Object.freeze({
    sendBtnTxt: 'שלח',
    cancelBtnTxt: 'בטל',
    toggleUserBtnText: 'להוספת תגובה מזוהה לחץ כאן',
  }),
  labels: Object.freeze({
    nameLabelTxt: 'שם',
    commentLabelTxt: 'תגובה',
  }),
  notes: Object.freeze({
    nameNoteTxt: 'הזינו שם שיוצג כמחבר התגובה',
    commentNoteTxt:
      'בשליחת תגובה זו הנני מצהיר שהינני מסכים/ה עם תנאי השימוש של אתר הארץ',
  }),
  errorNotes: Object.freeze({
    nameErrorNoteTxt: 'חובה להזין שם',
    commentErrorNoteTxt: 'נא להזין את תוכן התגובה',
  }),
});
export const commentSentI18n = Object.freeze({
  buttons: Object.freeze({
    getNotificationsBtnTxt: 'עדכנו אותי',
    dontGetNotificationsBtnTxt: 'לא תודה',
    closeBtnText: 'סגור',
  }),
  labels: Object.freeze({
    emailLabelTxt: 'דוא"ל',
  }),
  notes: Object.freeze({
    emailNoteTxt: 'הזינו כתובת דוא"ל לקבלת התראות',
  }),
  errorNotes: Object.freeze({
    emailErrorNoteTxt: 'נא להזין כתובת דוא"ל תקינה',
  }),
  texts: Object.freeze({
    commentRecievedBoldText: 'תגובתך נקלטה בהצלחה, ',
    commentRecievedText: 'ותפורסם על פי מדיניות המערכת.',
    commentRecievedTextSecondRow:
      'באפשרותך לקבל התראה בדוא"ל כאשר תגובתך תאושר ותפורסם',
    commentRecievedBoldTextThankYouPage: 'תודה!',
    commentRecievedTextThankYouPage:
      'תגובתך נקלטה בהצלחה ותפורסם על פי מדיניות המערכת',
  }),
});
export const commentsSectionI18n = Object.freeze({
  buttons: Object.freeze({
    loadAllCommentsBtnText: 'טען את כל התגובות',
  }),
  selectItems: Object.freeze({
    dateDescendingItemTxt: 'מהאחרונה לראשונה',
    dateAscendingItemTxt: 'מהראשונה לאחרונה',
    commentRatingItemTxt: 'הצג לפי דירוג',
    editorsPickItemTxt: 'בחירת העורכים',
  }),
  texts: Object.freeze({
    chooseSortMethodText: 'סדרו את התגובות',
  }),
});

export const footerMobileListsI18n = Object.freeze({
  MobileList: [
    Object.freeze({
      text: 'רכשו מנוי',
      link: 'https://www.haaretz.co.il/promotions-page',
    }),
    Object.freeze({
      text: 'בלוגים',
      link: 'https://www.haaretz.co.il/blogs',
    }),
    Object.freeze({
      text: 'תנאי שימוש',
      link: 'https://www.haaretz.co.il/misc/terms-of-use',
    }),
    Object.freeze({
      text: 'צרו קשר',
      link: 'https://www.haaretz.co.il/misc/contact-us',
    }),
    Object.freeze({
      text: 'פרסמו באתר',
      link:
        'https://www.haaretz.co.il/st/c/prod/global/mediaKit/haaretzHeb.html',
    }),
    Object.freeze({
      text: 'שירות למנויים',
      link: 'https://www.haaretz.co.il/personal-area/my-account',
    }),
  ],
  ButtonName: Object.freeze({
    text: 'להורדת האפליקציה',
  }),
  Copyright: Object.freeze({
    text: '© כל הזכויות שמורות',
  }),
});

export const footerDesktopI18n = Object.freeze({
  ExpandedButton: Object.freeze({
    close: 'סגור',
    showMore: 'הצג עוד',
  }),
  Copyright: Object.freeze({
    firstRow:
      'חדשות, ידיעות מהארץ והעולם - הידיעות והחדשות בעיתון הארץ. סקופים, מאמרים, פרשנויות ותחקירי עומק באתר האיכותי בישראל',
    secondRow: '© כל הזכויות שמורות להוצאת עיתון הארץ בע"מ',
  }),
});

export const newsletterI18n = Object.freeze({
  buttons: Object.freeze({
    newsletterConfirmedButton: 'לרשימה המלאה',
  }),
  texts: Object.freeze({
    newsletterConfirmedTitleText: 'תודה שנרשמת',
    newsletterConfirmedText: 'יש לנו דיוורים נוספים שעשויים לעניין אותך',
  }),
});
